import type { Image, Video } from "@synoem/types";

type Media =
  | {
      relationTo: "images";
      value: string | NonNullable<Image>;
    }
  | {
      relationTo: "videos";
      value: string | Video;
    };

export const isImageType = (
  media: Media,
): media is { relationTo: "images"; value: NonNullable<Image> } => {
  return (
    media.relationTo === "images" &&
    typeof media.value === "object" &&
    typeof media.value.url === "string" &&
    media.value.url?.length > 0
  );
};

export const isVideoType = (
  media: Media,
): media is { relationTo: "videos"; value: NonNullable<Video> } => {
  return (
    media.relationTo === "videos" &&
    typeof media.value === "object" &&
    typeof media.value.url === "string" &&
    media.value.url?.length > 0
  );
};
