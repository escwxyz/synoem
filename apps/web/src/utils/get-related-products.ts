import type { PumpController, SolarPanel } from "@synoem/payload/payload-types";
import type { BasePayload, CollectionSlug } from "payload";

type AnyProduct = SolarPanel | PumpController;

type ProductPointer<T extends AnyProduct> = number | T;

export const processRelatedProducts = async <
  T extends SolarPanel | PumpController,
>({
  relatedProducts,
  payload,
  collection,
}: {
  relatedProducts: ProductPointer<T>[] | null | undefined;
  payload: BasePayload;
  collection: CollectionSlug;
}): Promise<(T | null)[]> => {
  if (
    !relatedProducts ||
    !Array.isArray(relatedProducts) ||
    relatedProducts.length === 0
  ) {
    return [];
  }

  const result = await Promise.all(
    relatedProducts.map(async (p): Promise<T | null> => {
      if (typeof p !== "number") {
        return p as T;
      }

      try {
        const result = await payload.find({
          collection,
          where: {
            id: {
              equals: p,
            },
          },
          limit: 1,
        });

        return result.docs.length > 0 ? (result.docs[0] as T) : null;
      } catch (error) {
        console.error(`Error fetching related product (ID: ${p}):`, error);
        return null;
      }
    }),
  );

  return (await Promise.all(result)).filter(Boolean);
};

export const getRelatedSolarPanels = async ({
  relatedProducts,
  payload,
}: {
  relatedProducts: ProductPointer<SolarPanel>[] | null | undefined;
  payload: BasePayload;
}): Promise<(SolarPanel | null)[]> => {
  return processRelatedProducts<SolarPanel>({
    relatedProducts,
    payload,
    collection: "solar-panels",
  });
};

export const getRelatedPumpControllers = async ({
  relatedProducts,
  payload,
}: {
  relatedProducts: ProductPointer<PumpController>[] | null | undefined;
  payload: BasePayload;
}): Promise<(PumpController | null)[]> => {
  return processRelatedProducts<PumpController>({
    relatedProducts,
    payload,
    collection: "pump-controllers",
  });
};
