import { bunnyStorage } from "@seshuk/payload-storage-bunny";

// https://github.com/maximseshuk/payload-storage-bunny
export const bunny = bunnyStorage({
  collections: {
    images: {
      prefix: "images",
      disableLocalStorage: true,
      disablePayloadAccessControl: true,
    },
  },
  options: {
    storage: {
      apiKey: DMNO_CONFIG.BUNNY_STORAGE_API_KEY,
      hostname: DMNO_CONFIG.BUNNY_STORAGE_HOST_NAME,
      zoneName: DMNO_CONFIG.BUNNY_STORAGE_ZONE_NAME,
      region: DMNO_CONFIG.BUNNY_STORAGE_REGION,
    },
  },
});
