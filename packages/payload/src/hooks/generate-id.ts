import type { CollectionBeforeValidateHook, FieldHook } from "payload";
import { nanoid } from "nanoid";

export const generateId: CollectionBeforeValidateHook = async ({ data }) => {
  if (!data?.id) {
    const id = nanoid();
    return {
      ...data,
      id,
    };
  }
};

// export const generateVariantId: FieldHook = async ({ value, originalDoc, data }) => {
//   // check if `id` is already set
//   if (!value) {
//     // get the id of the product
//     const productId = originalDoc?.id;

//     if (!productId) {
//       throw new Error("Product ID is required to generate variant ID");
//     }

//     // get the index of the variant
//   }
// };
