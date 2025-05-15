import { DmnoBaseTypes, defineDmnoService, pick, switchBy } from "dmno";

export default defineDmnoService({
  name: "cms",
  schema: {
    APP_ENV: pick("root", "APP_ENV"),
    TURSO_DATABASE_URI: {
      required: true,
      sensitive: true,
      exampleValue: "your-turso-database-uri",
    },
    TURSO_DATABASE_TOKEN: {
      required: true,
      sensitive: true,
      extends: DmnoBaseTypes.string,
      exampleValue: "your-turso-database-token",
    },
    // DATABASE_URI: {
    //   required: true,
    //   sensitive: true,
    //   exampleValue: "postgres://postgres:<password>@127.0.0.1:5432/your-database-name",
    //   value: switchBy("APP_ENV", {
    //     development: "postgres://postgres:123456@127.0.0.1:5432/synoem-mono",
    //     test: "postgres://postgres:123456@127.0.0.1:5432/synoem-mono",
    //     production: "postgres://postgres:123456@127.0.0.1:5432/synoem-mono",
    //   }),
    // },
    PAYLOAD_SECRET: {
      required: true,
      exampleValue: "YOUR_SECRET_HERE",
      value: "00cee747d1a4e2cf3bacc045",
    },
    NEXT_PUBLIC_SERVER_URL: {
      extends: DmnoBaseTypes.url,
      value: "http://localhost:3000",
    },
    PREVIEW_SECRET: {
      exampleValue: "YOUR_SECRET_HERE",
      value: "00cee747d1a4e2cf3bacc045",
    },
    // R2_ACCESS_KEY_ID: {
    //   sensitive: true,
    //   required: true,
    //   extends: DmnoBaseTypes.string,
    //   exampleValue: "your-r2-access-key-id",
    // },
    // R2_SECRET_ACCESS_KEY: {
    //   sensitive: true,
    //   required: true,
    //   extends: DmnoBaseTypes.string,
    //   exampleValue: "your-r2-secret-access-key",
    // },
    // R2_BUCKET_NAME: {
    //   required: true,
    //   sensitive: true,
    //   extends: DmnoBaseTypes.string,
    //   exampleValue: "your-r2-bucket-name",
    // },
    // R2_ENDPOINT: {
    //   required: true,
    //   sensitive: true,
    //   extends: DmnoBaseTypes.url,
    //   exampleValue: "https://your-r2-endpoint.r2.cloudflarestorage.com",
    // },
  },
});
