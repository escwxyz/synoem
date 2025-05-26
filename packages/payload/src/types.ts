import type { Locale } from "@synoem/config";
import type { CollectionSlug, GlobalSlug } from "payload";

export type {
  Where,
  PaginatedDocs,
  DataFromCollectionSlug,
  CollectionSlug,
  TypedCollectionSelect,
  TransformCollectionWithSelect,
  GlobalSlug,
  DataFromGlobalSlug,
  BasePayload,
  TransformDataWithSelect,
} from "payload";

export type RevalidateGlobalBody = {
  locale?: Locale;
  type: GlobalSlug;
};

export type RevalidateGlobalTagName<T extends Locale | undefined = undefined> = T extends Locale
  ? `global-${GlobalSlug}-${T}`
  : `global-${GlobalSlug}`;

export type RevalidateCollectionBody = {
  locale?: Locale;
  type: CollectionSlug;
  slug: string;
};

export type RevalidateCollectionTagName<
  Slug extends string,
  T extends Locale | undefined = undefined,
> = T extends Locale
  ? `collection-${CollectionSlug}-${T}-${Slug}`
  : `collection-${CollectionSlug}-${Slug}`;

export type RevalidateCollectionListTagName<T extends Locale | undefined = undefined> =
  T extends Locale ? `collections-${CollectionSlug}-${T}` : `collections-${CollectionSlug}`;
