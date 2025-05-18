import { defineDmnoService, pick } from "dmno";
import { EncryptedVaultDmnoPlugin } from "@dmno/encrypted-vault-plugin";

EncryptedVaultDmnoPlugin.injectInstance("vault/prod");

export default defineDmnoService({
  name: "web",
  schema: {
    APP_ENV: pick("root", "ASTRO_APP_ENV"),
    DATABASE_URI: pick("root", "DATABASE_URI"),
    RESEND_API_KEY: pick("root", "RESEND_API_KEY"),
    RESEND_FROM_EMAIL: pick("root", "RESEND_FROM_EMAIL"),
    RESEND_FROM_NAME: pick("root", "RESEND_FROM_NAME"),
    S3_BUCKET_NAME: pick("root", "S3_BUCKET_NAME"),
    S3_ENDPOINT: pick("root", "S3_ENDPOINT"),
    S3_ACCESS_KEY_ID: pick("root", "S3_ACCESS_KEY_ID"),
    S3_ACCESS_KEY_SECRET: pick("root", "S3_ACCESS_KEY_SECRET"),
    S3_REGION: pick("root", "S3_REGION"),
    PAYLOAD_SECRET: pick("root", "PAYLOAD_SECRET"),

    NEXT_SERVER_URL: pick("root", "NEXT_SERVER_URL"),
    NEXT_API_URL: pick("root", "NEXT_API_URL"),
    ASTRO_PUBLIC_SITE_URL: pick("root", "ASTRO_PUBLIC_SITE_URL"),
  },
});
