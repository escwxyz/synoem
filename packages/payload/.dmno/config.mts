import { DmnoBaseTypes, defineDmnoService, pick } from "dmno";

export default defineDmnoService({
  name: "payload-config",
  schema: {
    APP_ENV: pick("root", "APP_ENV"),
    TURSO_DATABASE_URI: pick("cms", "TURSO_DATABASE_URI"),
    TURSO_DATABASE_TOKEN: pick("cms", "TURSO_DATABASE_TOKEN"),
    DATABASE_URI: pick("cms", "DATABASE_URI"),
    NEXT_PUBLIC_SERVER_URL: pick("cms", "NEXT_PUBLIC_SERVER_URL"),
    RESEND_API_KEY: pick("cms", "RESEND_API_KEY"),
    PAYLOAD_SECRET: pick("cms", "PAYLOAD_SECRET"),
    R2_ACCESS_KEY_ID: pick("cms", "R2_ACCESS_KEY_ID"),
    R2_SECRET_ACCESS_KEY: pick("cms", "R2_SECRET_ACCESS_KEY"),
    R2_BUCKET_NAME: pick("cms", "R2_BUCKET_NAME"),
    R2_ENDPOINT: pick("cms", "R2_ENDPOINT"),
  },
});
