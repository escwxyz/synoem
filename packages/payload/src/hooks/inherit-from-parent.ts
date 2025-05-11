import type { CollectionBeforeValidateHook } from "payload";

/**
 * Ensure child product categories inherit variant options and enabled product specs from their parent
 */
export const inheritFromParent: CollectionBeforeValidateHook = async ({ data, req, operation }) => {
  if (operation === "create" || operation === "update") {
    if (data?.parent) {
      try {
        const parent = await req.payload.findByID({
          collection: "product-categories",
          id: data.parent,
        });

        if (parent?.variantOptions) {
          data.variantOptions = parent.variantOptions;
        }
        if (parent?.enabledProductSpecs) {
          data.enabledProductSpecs = parent.enabledProductSpecs;
        }
      } catch (error) {
        console.error(error);
      }
    }
  }

  return data;
};
