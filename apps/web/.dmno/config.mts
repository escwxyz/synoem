import { defineDmnoService, pick } from "dmno";
import { EncryptedVaultDmnoPlugin } from "@dmno/encrypted-vault-plugin";

EncryptedVaultDmnoPlugin.injectInstance("vault/prod");

export default defineDmnoService({
  name: "web",
  schema: {
    WEB_APP_ENV: pick("root", "WEB_APP_ENV"),
    CMS_APP_ENV: pick("root", "CMS_APP_ENV"),
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

    CMS_SERVER_URL: pick("root", "CMS_SERVER_URL"),
    CMS_API_URL: pick("root", "CMS_API_URL"),
    WEB_SITE_URL: pick("root", "WEB_SITE_URL"),
    WEB_SITE_REVALIDATE_SECRET: pick("root", "WEB_SITE_REVALIDATE_SECRET"),
  },
});
