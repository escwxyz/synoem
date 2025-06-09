// Exposes a unique path field based on breadcrumbs (slug & parent's slug)

import { getParents } from "@payloadcms/plugin-nested-docs";
import type { GenerateURL } from "@payloadcms/plugin-nested-docs/types";
import type { CollectionSlug, FieldHook, Payload, PayloadRequest, TextField, Where } from "payload";
import { APIError, ValidationError } from "payload";
import { randomBytes } from "node:crypto";

export const UNIQUE_PATH_COLLECTIONS = ["pages", "posts"] as const satisfies CollectionSlug[];
export const DEFAULT_FIELD_TO_USE_FOR_PATH = "slug" as const;
export const DEFAULT_PARENT_FIELD_SLUG = "parent" as const;

export const generateBreadcrumbsUrl: GenerateURL = (docs, _currentDoc) => {
  return docs.reduce((url, doc) => `${url}/${doc.slug}`, "");
};

const generateRandomString = (length = 20): string => {
  return randomBytes(Math.ceil(length / 2))
    .toString("hex")
    .slice(0, length);
};

// const generateRandomString = (length = 20): string => {
//   return Array.from({ length }, () => Math.floor(Math.random() * 36).toString(36)).join("");
// };

export type WillPathConflictParams = {
  payload: Payload;
  path: string;
  originalDoc?: { id?: string };
  collection: CollectionSlug;
  uniquePathCollections?: CollectionSlug[] | ReadonlyArray<CollectionSlug>;
};

export const willPathConflict = async ({
  payload,
  path,
  originalDoc,
  collection,
  uniquePathCollections = UNIQUE_PATH_COLLECTIONS,
}: WillPathConflictParams): Promise<boolean> => {
  if (!payload || !uniquePathCollections.includes(collection)) return false;

  const queries = uniquePathCollections.map((targetCollection) => {
    const whereCondition: Where = {
      path: { equals: path },
    };
    if (originalDoc?.id && collection === targetCollection) {
      whereCondition.id = { not_equals: originalDoc.id };
    }

    return payload.find({
      collection: targetCollection,
      where: whereCondition,
      limit: 1,
      pagination: false,
    });
  });

  const results = await Promise.allSettled(queries);
  return results.some((result) => result.status === "fulfilled" && result.value.docs.length > 0);
};

export type GenerateDocumentPathParams = {
  req: PayloadRequest;
  collection: CollectionSlug;
  currentDoc: Record<string, unknown>;
  fieldToUse: string;
  parentFieldSlug?: string;
};

export async function generateDocumentPath({
  req,
  collection,
  currentDoc,
  fieldToUse,
  parentFieldSlug = DEFAULT_PARENT_FIELD_SLUG,
}: GenerateDocumentPathParams): Promise<string> {
  if (!currentDoc?.[fieldToUse] || !collection) {
    return `/${currentDoc?.id || generateRandomString(20)}`;
  }

  const breadcrumbs = currentDoc?.breadcrumbs as { url: string }[];
  const newPath = breadcrumbs?.at(-1)?.url;
  if (newPath) return newPath;

  const docs = await getParents(
    req,
    { parentFieldSlug, collections: UNIQUE_PATH_COLLECTIONS },
    { slug: collection, fields: [] },
    currentDoc,
    [currentDoc],
  );

  return generateBreadcrumbsUrl(docs, currentDoc);
}

type PathFieldOptions = {
  fieldToUse?: string;
  parentFieldSlug?: string;
  overrides?: Partial<TextField>;
};

const pathField = ({
  fieldToUse = DEFAULT_FIELD_TO_USE_FOR_PATH,
  parentFieldSlug = DEFAULT_PARENT_FIELD_SLUG,
  overrides,
}: PathFieldOptions): TextField[] => {
  return [
    {
      name: "_collection",
      type: "text",
      admin: {
        hidden: true,
      },
      virtual: true,
      hooks: {
        beforeValidate: [({ collection }) => collection?.slug || null],
      },
    },
    (() => {
      const defaultHooks: {
        beforeDuplicate: FieldHook[];
        beforeChange: FieldHook[];
      } = {
        beforeDuplicate: [() => `/${generateRandomString(20)}`],
        beforeChange: [
          // Make sure the path is unique across these collections
          async ({ collection, data, req, siblingData, originalDoc }) => {
            if (!collection) {
              throw new APIError(
                "Collection is null.",
                400,
                [{ field: fieldToUse, message: "Collection is required." }],
                false,
              );
            }

            const currentDoc = { ...originalDoc, ...siblingData };

            const newPath = await generateDocumentPath({
              req,
              collection: collection.slug,
              currentDoc,
              fieldToUse,
              parentFieldSlug,
            });

            const isNewPathConflicting = await willPathConflict({
              payload: req.payload,
              path: newPath,
              originalDoc,
              collection: collection.slug,
            });

            if (isNewPathConflicting) {
              throw new ValidationError({
                collection: collection.slug,
                req,
                errors: [{ path: fieldToUse, message: "Path already in use." }],
              });
            }
            if (data) data.path = newPath;
            return newPath;
          },
        ],
      };

      const { admin: overridesAdmin, hooks: overridesHooks, ...restOverrides } = overrides || {};

      const mergedHooks = {
        ...(overridesHooks || {}),
        beforeDuplicate: [
          ...defaultHooks.beforeDuplicate,
          ...(overridesHooks?.beforeDuplicate || []),
        ],
        beforeChange: [...defaultHooks.beforeChange, ...(overridesHooks?.beforeChange || [])],
      };

      return {
        type: "text",
        name: "path",
        unique: true,
        index: true,
        admin: { position: "sidebar", readOnly: true, ...(overridesAdmin || {}) },
        hooks: mergedHooks,
        ...restOverrides,
      } as TextField;
    })(),
  ];
};

export { pathField };
