import { s3Storage } from "@payloadcms/storage-s3";

export const storage = s3Storage({
  enabled: true,
  collections: {
    images: {
      prefix: "images",
      disablePayloadAccessControl: true,
      generateFileURL: ({ filename, prefix }) => {
        return `${process.env.S3_ENDPOINT}/object/public/${process.env.S3_BUCKET_NAME}/${prefix}/${filename}`;
      },
      disableLocalStorage: true,
    },
  },
  bucket: process.env.S3_BUCKET_NAME ?? "",
  config: {
    endpoint: `${process.env.S3_ENDPOINT}/s3`,
    credentials: {
      accessKeyId: process.env.S3_ACCESS_KEY_ID ?? "",
      secretAccessKey: process.env.S3_ACCESS_KEY_SECRET ?? "",
    },
    region: process.env.S3_REGION,
    forcePathStyle: true,
  },
});
