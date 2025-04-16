import { DmnoBaseTypes, defineDmnoService, pick, switchBy } from "dmno";

export default defineDmnoService({
  name: "web",
  schema: {
    APP_ENV: pick("root", "APP_ENV"),
    DATABASE_URI: pick("cms", "DATABASE_URI"),
    PAYLOAD_SECRET: pick("cms", "PAYLOAD_SECRET"),
    BUNNY_STORAGE_API_KEY: pick("cms", "BUNNY_STORAGE_API_KEY"),
    BUNNY_STORAGE_HOST_NAME: pick("cms", "BUNNY_STORAGE_HOST_NAME"),
    BUNNY_STORAGE_ZONE_NAME: pick("cms", "BUNNY_STORAGE_ZONE_NAME"),
    BUNNY_STORAGE_REGION: pick("cms", "BUNNY_STORAGE_REGION"),
    PUBLIC_SITE_URL: {
      extends: DmnoBaseTypes.url,
      description: "The URL of the frontend site",
      required: true,
      value: switchBy("APP_ENV", {
        development: "http://localhost:4321",
        test: "http://localhost:4321",
        production: "https://your-production-domain.com",
      }),
    },
    PUBLIC_API_URL: {
      extends: DmnoBaseTypes.url,
      value: switchBy("APP_ENV", {
        development: "http://localhost:3000",
        test: "http://localhost:3000",
        production: "https://api.your-production-domain.com",
      }),
    },
  },
});
