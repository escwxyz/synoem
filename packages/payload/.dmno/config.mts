import { DmnoBaseTypes, defineDmnoService, pick } from "dmno";

export default defineDmnoService({
  name: "payload-config",
  schema: {
    APP_ENV: pick("root", "APP_ENV"),
    DATABASE_URI: pick("cms", "DATABASE_URI"),
    NEXT_PUBLIC_SERVER_URL: pick("cms", "NEXT_PUBLIC_SERVER_URL"),
    RESEND_API_KEY: pick("cms", "RESEND_API_KEY"),
    PAYLOAD_SECRET: pick("cms", "PAYLOAD_SECRET"),
    BUNNY_STORAGE_API_KEY: pick("cms", "BUNNY_STORAGE_API_KEY"),
    BUNNY_STORAGE_HOST_NAME: pick("cms", "BUNNY_STORAGE_HOST_NAME"),
    BUNNY_STORAGE_ZONE_NAME: pick("cms", "BUNNY_STORAGE_ZONE_NAME"),
    BUNNY_STORAGE_REGION: pick("cms", "BUNNY_STORAGE_REGION"),
  },
});
