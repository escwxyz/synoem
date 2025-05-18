import { DmnoBaseTypes, configPath, defineDmnoService, switchBy, pickFromSchemaObject } from "dmno";
import { EncryptedVaultDmnoPlugin, EncryptedVaultTypes } from "@dmno/encrypted-vault-plugin";
import { VercelEnvSchema } from "@dmno/vercel-platform";

const ProdVault = new EncryptedVaultDmnoPlugin("vault/prod", {
  key: configPath("..", "DMNO_VAULT_KEY_PROD"),
});

export default defineDmnoService({
  settings: {
    redactSensitiveLogs: true,
    interceptSensitiveLeakRequests: true,
    preventClientLeaks: true,
  },
  name: "root",
  schema: {
    DMNO_VAULT_KEY_PROD: {
      extends: EncryptedVaultTypes.encryptionKey,
    },
    ASTRO_APP_ENV: {
      extends: DmnoBaseTypes.enum(["development", "production"]),
      summary: "The environment of the Astro application",
      value: "development",
    },
    ...pickFromSchemaObject(VercelEnvSchema, "VERCEL_ENV"),
    NEXT_APP_ENV: {
      summary: "The environment of the Next.js application",
      value: () => {
        if (DMNO_CONFIG.VERCEL_ENV === "production") return "production";
        if (DMNO_CONFIG.VERCEL_ENV === "preview") return "preview";
        return "development";
      },
    },
    VERCEL_TOKEN: {
      sensitive: true,
      extends: DmnoBaseTypes.string,
      summary: "The token for Vercel to deploy the application",
      value: switchBy("NEXT_APP_ENV", {
        development: undefined,
        preview: ProdVault.item(),
        production: ProdVault.item(),
      }),
    },
    VERCEL_ORG_ID: {
      sensitive: true,
      extends: DmnoBaseTypes.string,
      summary: "The ID of the Vercel organization",
      validate(val, ctx) {
        if (typeof val === "string" && val.startsWith("team_")) {
          return true;
        }
        return false;
      },
      value: switchBy("NEXT_APP_ENV", {
        development: undefined,
        preview: ProdVault.item(),
        production: ProdVault.item(),
      }),
    },
    VERCEL_PROJECT_ID: {
      sensitive: true,
      extends: DmnoBaseTypes.string,
      summary: "The ID of the Vercel project",
      validate(val, ctx) {
        if (typeof val === "string" && val.startsWith("prj_")) {
          return true;
        }
        return false;
      },
      value: switchBy("NEXT_APP_ENV", {
        development: undefined,
        preview: ProdVault.item(),
        production: ProdVault.item(),
      }),
    },
    DATABASE_URI: {
      required: true,
      sensitive: true,
      exampleValue: "postgres://postgres:<password>@127.0.0.1:5432/your-database-name",
      summary: "The Postgres database URI for Payload CMS",
      value: switchBy("NEXT_APP_ENV", {
        development: "postgres://postgres:123456@127.0.0.1:5432/synoem-mono",
        preview: ProdVault.item(),
        production: ProdVault.item(),
      }),
    },
    RESEND_API_KEY: {
      required: true,
      sensitive: true,
      summary: "The Resend API key for Payload CMS to send transactional emails",
      exampleValue: "re_1234567890",
      validate(val, ctx) {
        if (typeof val === "string" && val.startsWith("re_")) {
          return true;
        }
        return false;
      },
      value: switchBy("NEXT_APP_ENV", {
        development: "re_akGoaJ1A_CyF5YcsUFcy8aHQsrRc9Y7yX",
        preview: "re_akGoaJ1A_CyF5YcsUFcy8aHQsrRc9Y7yX",
        production: ProdVault.item(),
      }),
    },
    RESEND_FROM_EMAIL: {
      required: true,
      exampleValue: "info@example.com",
      sensitive: true,
      summary: "The email address of the sender for transactional emails",
      extends: DmnoBaseTypes.email,
      value: switchBy("NEXT_APP_ENV", {
        development: "info@updates.synoem.com",
        preview: "info@updates.synoem.com",
        production: ProdVault.item(),
      }),
    },
    RESEND_FROM_NAME: {
      required: true,
      exampleValue: "your-company-name",
      summary: "The name of the sender for transactional emails",
      extends: DmnoBaseTypes.string,
      value: switchBy("NEXT_APP_ENV", {
        development: "SynOEM",
        preview: "SynOEM",
        production: ProdVault.item(),
      }),
    },
    S3_BUCKET_NAME: {
      sensitive: true,
      exampleValue: "your-s3-bucket-name",
      summary: "The name of the S3 bucket for Payload CMS to store files",
      extends: DmnoBaseTypes.string,
      value: switchBy("NEXT_APP_ENV", {
        development: undefined,
        preview: ProdVault.item(),
        production: ProdVault.item(),
      }),
    },
    S3_ENDPOINT: {
      sensitive: true,
      exampleValue: "your-s3-endpoint",
      summary: "The endpoint of the S3 bucket for Payload CMS to store files",
      extends: DmnoBaseTypes.url,
      value: switchBy("NEXT_APP_ENV", {
        development: undefined,
        preview: ProdVault.item(),
        production: ProdVault.item(),
      }),
    },
    S3_ACCESS_KEY_ID: {
      sensitive: true,
      exampleValue: "your-s3-access-key-id",
      summary: "The access key ID of the S3 bucket for Payload CMS to store files",
      extends: DmnoBaseTypes.string,
      value: switchBy("NEXT_APP_ENV", {
        development: undefined,
        preview: ProdVault.item(),
        production: ProdVault.item(),
      }),
    },
    S3_ACCESS_KEY_SECRET: {
      sensitive: true,
      exampleValue: "your-s3-secret-access-key",
      summary: "The secret access key of the S3 bucket for Payload CMS to store files",
      extends: DmnoBaseTypes.string,
      value: switchBy("NEXT_APP_ENV", {
        development: undefined,
        preview: ProdVault.item(),
        production: ProdVault.item(),
      }),
    },
    S3_REGION: {
      sensitive: true,
      exampleValue: "your-s3-region",
      summary: "The region of the S3 bucket for Payload CMS to store files",
      extends: DmnoBaseTypes.string,
      value: switchBy("NEXT_APP_ENV", {
        development: undefined,
        preview: ProdVault.item(),
        production: ProdVault.item(),
      }),
    },
    PAYLOAD_SECRET: {
      required: true,
      exampleValue: "YOUR_SECRET_HERE",
      sensitive: true,
      value: switchBy("NEXT_APP_ENV", {
        development: "00cee747d1a4e2cf3bacc045",
        preview: ProdVault.item(),
        production: ProdVault.item(),
      }),
    },
    NEXT_SERVER_URL: {
      required: true,
      summary: "The URL of the Payload CMS dashboard",
      sensitive: true,
      extends: DmnoBaseTypes.url,
      value: switchBy("NEXT_APP_ENV", {
        development: "http://localhost:3000",
        production: ProdVault.item(),
      }),
    },
    NEXT_API_URL: {
      required: true,
      extends: DmnoBaseTypes.url,
      summary: "The API URL exposed by the Next.js application",
      value: switchBy("NEXT_APP_ENV", {
        development: "http://localhost:3000/rpc",
        production: ProdVault.item(),
      }),
    },
    ASTRO_PUBLIC_SITE_URL: {
      required: true,
      extends: DmnoBaseTypes.url,
      summary: "The site URL for the frontend Astro website",
      value: switchBy("ASTRO_APP_ENV", {
        development: "http://localhost:4321",
        production: ProdVault.item(),
      }),
    },
    PREVIEW_SECRET: {
      exampleValue: "YOUR_SECRET_HERE",
      summary: "The secret for Payload CMS's preview function",
      value: switchBy("NEXT_APP_ENV", {
        development: "00cee747d1a4e2cf3bacc045",
        production: ProdVault.item(),
      }),
    },
  },
});
