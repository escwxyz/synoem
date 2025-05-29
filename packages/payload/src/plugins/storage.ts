import { s3Storage } from "@payloadcms/storage-s3";
import { cmsEnvs } from "@synoem/env";

export const storage = s3Storage({
  enabled: cmsEnvs.CMS_APP_ENV === "production" || cmsEnvs.CMS_APP_ENV === "preview",
  collections: {
    images: {
      prefix: "images",
      disablePayloadAccessControl: true,
      generateFileURL: ({ filename, prefix }) => {
        return `${cmsEnvs.S3_ENDPOINT}/object/public/${cmsEnvs.S3_BUCKET_NAME}/${prefix}/${filename}`;
      },
    },
  },
  bucket: cmsEnvs.S3_BUCKET_NAME ?? "",
  config: {
    endpoint: `${cmsEnvs.S3_ENDPOINT}/s3`,
    credentials: {
      accessKeyId: cmsEnvs.S3_ACCESS_KEY_ID ?? "",
      secretAccessKey: cmsEnvs.S3_ACCESS_KEY_SECRET ?? "",
    },
    region: cmsEnvs.S3_REGION,
    forcePathStyle: true,
  },
});
