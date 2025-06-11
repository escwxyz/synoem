import "server-only";

import { getPayloadClient } from "@synoem/payload/client";
import type { BasePayload, RevalidateCollectionTagName } from "@synoem/payload/types";
import type { pathSchema } from "@synoem/schema";
import type { z } from "zod";
import type { APIResponse } from "~/types/api-response";
import { UNIQUE_PATH_COLLECTIONS } from "@synoem/payload/fields/path";
import type { CollectionSlug } from "@synoem/payload/types";
import type { Config } from "@synoem/types";
import type { Locale } from "@synoem/config";
import { unstable_cache } from "next/cache";

export type PathCollectionSlug = (typeof UNIQUE_PATH_COLLECTIONS)[number];
export type CollectionConfig<S extends CollectionSlug> = Config["collections"][S];
export type CollectionDocument<S extends CollectionSlug> = CollectionConfig<S> & { _collection: S };
export type AllDocuments = { [S in CollectionSlug]: CollectionDocument<S> }[CollectionSlug];
export type PathDocuments = {
  [S in PathCollectionSlug]: CollectionDocument<S>;
}[PathCollectionSlug];

async function getDocumentByPath<S extends PathCollectionSlug>(
  collection: S,
  input: z.infer<typeof pathSchema>,
  payloadPromise: Promise<BasePayload> = getPayloadClient(),
): Promise<APIResponse<CollectionDocument<S> | null>> {
  const { locale, path, depth } = input;

  const payload = await payloadPromise;

  try {
    const { docs } = await payload.find({
      collection,
      where: { path: { equals: path } },
      limit: 1,
      pagination: false,
      locale,
      depth,
    });

    const doc = docs.at(0);
    return doc
      ? {
          status: "success",
          data: { ...doc, _collection: collection } as CollectionDocument<S>,
        }
      : {
          status: "success",
          data: null,
        };
  } catch (error) {
    return {
      status: "error",
      messageKey: "api.getDocumentByPath.error",
      error: {
        code: "INTERNAL_SERVER_ERROR",
        details: error,
      },
    };
  }
}

export async function findDocumentByPathUncached(path: string, locale: Locale, depth = 1) {
  const lookups = UNIQUE_PATH_COLLECTIONS.map((slug) =>
    getDocumentByPath(slug, { locale, path, depth }),
  );

  const settled = await Promise.allSettled(lookups);
  return (
    settled.find(
      (r): r is PromiseFulfilledResult<APIResponse<PathDocuments>> =>
        r.status === "fulfilled" && r.value.status === "success" && r.value.data !== null,
    )?.value ?? null
  );
}

export const getDocumentByPathCached = (locale: Locale, path: string, depth = 1) => {
  const tags = UNIQUE_PATH_COLLECTIONS.map(
    (collection) =>
      `collection-${collection}-${locale}-${path}` as RevalidateCollectionTagName<
        string,
        typeof locale
      >,
  );

  return unstable_cache(
    async () => {
      return await findDocumentByPathUncached(path, locale, depth);
    },
    tags,
    { tags, revalidate: process.env.NODE_ENV === "production" ? false : 30 },
  );
};

export const getUniquePaths = async (excludedPaths: string[] = []) => {
  const payload = await getPayloadClient();

  const pathPromises = UNIQUE_PATH_COLLECTIONS.map((collection) =>
    payload.find({
      collection,
      depth: 0,
      pagination: false,
      limit: 0,
      select: {
        path: true,
      },
    }),
  );

  const results = await Promise.all(pathPromises);

  const allPaths = results.flatMap(({ docs }) =>
    docs
      .map((doc) => doc.path)
      .filter(
        (path): path is string =>
          typeof path === "string" && path.length > 0 && !excludedPaths.includes(path),
      ),
  );

  return allPaths;
};
