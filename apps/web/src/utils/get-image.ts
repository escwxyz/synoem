import type { Image as ImageType } from "@synoem/payload/payload-types";
import type { BasePayload } from "payload";

interface GetImageProps {
  image: number | ImageType;
  payload: BasePayload;
}

export const getImage = async ({ image, payload }: GetImageProps) => {
  if (typeof image === "number") {
    try {
      const imageData = await payload.find({
        collection: "images",
        where: {
          id: {
            equals: image,
          },
        },
      });

      if (!imageData.docs.length) {
        console.warn(`No image found with ID: ${image}`);
        return null;
      }

      return imageData.docs[0].url ? imageData.docs[0] : null;
    } catch (error) {
      console.error(`Error fetching image with ID ${image}:`, error);
      return null;
    }
  }

  return image.url ? image : null;
};

export const getImageUrl = (
  image: number | ImageType | null | undefined,
  defaultUrl = "/placeholder-image.jpg",
): string => {
  if (!image) return defaultUrl;

  if (typeof image === "number") {
    return defaultUrl;
  }

  return image.url || defaultUrl;
};

export const getProcessedImage = (
  image: number | ImageType | null | undefined,
  defaultValues = {
    url: "/placeholder-image.jpg",
    alt: "Product image",
    width: 800,
    height: 600,
  },
) => {
  if (!image) {
    return defaultValues;
  }

  if (typeof image === "number") {
    return defaultValues;
  }

  return {
    id: image.id,
    url: image.url || defaultValues.url,
    alt: image.alt || defaultValues.alt,
    width: image.width || defaultValues.width,
    height: image.height || defaultValues.height,
  };
};

interface GalleryImage {
  id: number;
  url: string;
  alt: string;
  width: number;
  height: number;
}

export const getGalleryImages = async ({
  images,
  payload,
}: {
  images: (number | ImageType)[] | null | undefined;
  payload: BasePayload;
}): Promise<GalleryImage[]> => {
  if (Array.isArray(images)) {
    return (
      await Promise.all(
        images.map(async (image) => {
          try {
            const imageData = await getImage({
              image,
              payload,
            });

            if (!imageData) {
              console.warn(
                `Failed to get image data for: ${typeof image === "number" ? image : image.id}`,
              );
              return null;
            }

            if (!imageData.url) {
              console.warn(`Image has no URL: ${imageData.id}`);
              return null;
            }

            return {
              id: imageData.id,
              url: imageData.url as string,
              alt: imageData.alt,
              width: imageData.width || 800,
              height: imageData.height || 600,
            };
          } catch (error) {
            console.error(
              `Error processing image: ${error instanceof Error ? error.message : "Unknown error"}`,
            );
            return null;
          }
        }),
      )
    ).filter(Boolean) as GalleryImage[];
  }

  return [];
};
