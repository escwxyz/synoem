import { DmnoBaseTypes, defineDmnoService } from "dmno";

export default defineDmnoService({
  settings: {
    redactSensitiveLogs: true,
    interceptSensitiveLeakRequests: true,
    preventClientLeaks: true,
  },
  name: "root",
  schema: {
    APP_ENV: {
      extends: DmnoBaseTypes.enum(["development", "test", "production"]),
      value: "development",
    },
  },
});
