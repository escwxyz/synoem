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
    RESEND_API_KEY: {
      required: true,
      sensitive: true,
      exampleValue: "your-resend-api-key",
      extends: DmnoBaseTypes.string,
    },
    S3_BUCKET_NAME: {
      required: true,
      sensitive: true,
      exampleValue: "your-s3-bucket-name",
      extends: DmnoBaseTypes.string,
    },
    S3_ENDPOINT: {
      required: true,
      sensitive: true,
      exampleValue: "your-s3-endpoint",
      extends: DmnoBaseTypes.url,
    },
    S3_ACCESS_KEY_ID: {
      required: true,
      sensitive: true,
      exampleValue: "your-s3-access-key-id",
      extends: DmnoBaseTypes.string,
    },
    S3_ACCESS_KEY_SECRET: {
      required: true,
      sensitive: true,
      exampleValue: "your-s3-secret-access-key",
      extends: DmnoBaseTypes.string,
    },
    S3_REGION: {
      required: true,
      exampleValue: "your-s3-region",
      extends: DmnoBaseTypes.string,
    },
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
  },
});
