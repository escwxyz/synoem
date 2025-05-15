import { DmnoBaseTypes, defineDmnoService, pick } from "dmno";

export default defineDmnoService({
  name: "payload-config",
  schema: {
    APP_ENV: pick("root", "APP_ENV"),
    TURSO_DATABASE_URI: pick("cms", "TURSO_DATABASE_URI"),
    TURSO_DATABASE_TOKEN: pick("cms", "TURSO_DATABASE_TOKEN"),
    NEXT_PUBLIC_SERVER_URL: pick("cms", "NEXT_PUBLIC_SERVER_URL"),
    PAYLOAD_SECRET: pick("cms", "PAYLOAD_SECRET"),
  },
});
