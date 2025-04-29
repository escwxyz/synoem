import { s3Storage } from "@payloadcms/storage-s3";

// https://bridger.to/payload-r2

export const storage = s3Storage({
  collections: {},
  bucket: DMNO_CONFIG.R2_BUCKET_NAME,
  config: {
    endpoint: DMNO_CONFIG.R2_ENDPOINT,
    credentials: {
      accessKeyId: DMNO_CONFIG.R2_ACCESS_KEY_ID,
      secretAccessKey: DMNO_CONFIG.R2_SECRET_ACCESS_KEY,
    },
    region: "auto",
    forcePathStyle: true,
  },
});
