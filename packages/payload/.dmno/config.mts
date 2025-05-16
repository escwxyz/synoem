import { defineDmnoService, pick } from "dmno";

export default defineDmnoService({
  name: "payload-config",
  schema: {
    APP_ENV: pick("root", "APP_ENV"),
    DATABASE_URI: pick("cms", "DATABASE_URI"),
    RESEND_API_KEY: pick("cms", "RESEND_API_KEY"),
    S3_BUCKET_NAME: pick("cms", "S3_BUCKET_NAME"),
    S3_ENDPOINT: pick("cms", "S3_ENDPOINT"),
    S3_ACCESS_KEY_ID: pick("cms", "S3_ACCESS_KEY_ID"),
    S3_ACCESS_KEY_SECRET: pick("cms", "S3_ACCESS_KEY_SECRET"),
    S3_REGION: pick("cms", "S3_REGION"),
    PAYLOAD_SECRET: pick("cms", "PAYLOAD_SECRET"),
  },
});
