import { s3Storage } from "@payloadcms/storage-s3";

export const storage = s3Storage({
  enabled: DMNO_CONFIG.APP_ENV === "production" || DMNO_CONFIG.APP_ENV === "preview",
  collections: {
    images: {
      prefix: "images",
      disablePayloadAccessControl: true,
      generateFileURL: ({ filename, prefix }) => {
        return `${DMNO_CONFIG.S3_ENDPOINT}/object/public/${DMNO_CONFIG.S3_BUCKET_NAME}/${prefix}/${filename}`;
      },
    },
  },
  bucket: DMNO_CONFIG.S3_BUCKET_NAME ?? "",
  config: {
    endpoint: `${DMNO_CONFIG.S3_ENDPOINT}/s3`,
    credentials: {
      accessKeyId: DMNO_CONFIG.S3_ACCESS_KEY_ID ?? "",
      secretAccessKey: DMNO_CONFIG.S3_ACCESS_KEY_SECRET ?? "",
    },
    region: DMNO_CONFIG.S3_REGION,
    forcePathStyle: true,
  },
});
