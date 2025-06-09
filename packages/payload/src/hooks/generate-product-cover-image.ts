import type { CollectionBeforeValidateHook } from "payload";

export const generateProductCoverImage: CollectionBeforeValidateHook = async ({ req, data }) => {
  if (!data) {
    return;
  }

  let coverImage: string | undefined;

  const { gallery, variants } = data;

  if (gallery && gallery?.length > 0) {
    coverImage = gallery[0];
  } else if (variants && variants?.length > 0) {
    const images = variants[0]?.gallery;
    if (images && images?.length > 0) {
      coverImage = images[0];
    }
  }

  return {
    ...data,
    coverImage,
  };
};
