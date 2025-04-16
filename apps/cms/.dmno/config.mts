import { DmnoBaseTypes, defineDmnoService, pick, switchBy } from "dmno";

export default defineDmnoService({
  name: "cms",
  schema: {
    APP_ENV: pick("root", "APP_ENV"),
    DATABASE_URI: {
      required: true,
      sensitive: true,
      exampleValue: "postgres://postgres:<password>@127.0.0.1:5432/your-database-name",
      value: switchBy("APP_ENV", {
        development: "postgres://postgres:123456@127.0.0.1:5432/synoem-mono",
        test: "postgres://postgres:123456@127.0.0.1:5432/synoem-mono",
        production: "postgres://postgres:123456@127.0.0.1:5432/synoem-mono",
      }),
    },
    PAYLOAD_SECRET: {
      required: true,
      exampleValue: "YOUR_SECRET_HERE",
      value: "00cee747d1a4e2cf3bacc045",
    },
    RESEND_API_KEY: {
      sensitive: true,
      value: "your-resend-api-key",
    },
    NEXT_PUBLIC_SERVER_URL: {
      extends: DmnoBaseTypes.url,
      value: "http://localhost:3000",
    },
    PREVIEW_SECRET: {
      exampleValue: "YOUR_SECRET_HERE",
      value: "00cee747d1a4e2cf3bacc045",
    },
    BUNNY_STORAGE_API_KEY: {
      sensitive: true,
      required: true,
      extends: DmnoBaseTypes.string,
      exampleValue: "your-bunny-storage-api-key",
    },
    BUNNY_STORAGE_HOST_NAME: {
      sensitive: true,
      required: true,
      extends: DmnoBaseTypes.string,
      exampleValue: "https://storage.bunnycdn.com",
    },
    BUNNY_STORAGE_ZONE_NAME: {
      sensitive: true,
      required: true,
      extends: DmnoBaseTypes.string,
      exampleValue: "your-bunny-storage-zone-name",
    },
    BUNNY_STORAGE_REGION: {
      sensitive: true,
      required: true,
      extends: DmnoBaseTypes.string,
      exampleValue: "your-bunny-storage-region",
    },
  },
});
