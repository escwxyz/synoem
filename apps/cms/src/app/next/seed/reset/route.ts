import { CollectionSlug, createLocalReq, GlobalSlug, Payload, PayloadRequest } from "payload";
import { getPayloadClient } from "@synoem/payload/client";
import { headers } from "next/headers";

export const maxDuration = 60;

const collections: CollectionSlug[] = [
  "faqs",
  "pages",
  "packaging-configs",
  "warranties",
  "solar-panels",
  "solar-panel-categories",
  "industries",
  "images",
];

const globals: GlobalSlug[] = ["company-info", "contact-info", "social-links", "header"];

async function resetDatabase(payload: Payload, req: PayloadRequest) {
  try {
    await Promise.all(
      globals.map(async (global) => {
        try {
          await payload.updateGlobal({
            slug: global,
            data: {},
            depth: 0,
            context: {
              skipRevalidation: true,
            },
          });
          payload.logger.info(`Global ${global} reset`);
        } catch (error) {
          payload.logger.error(`Failed to reset global ${global}:`, error);
          throw new Error(`Failed to reset global ${global}, skipping...`, { cause: error });
        }
      }),
    );

    payload.logger.info("Globals reset");

    for (const collection of collections) {
      await payload.db.deleteMany({ collection, req, where: {} });
    }

    payload.logger.info("Collections reset");

    await Promise.all(
      collections
        .filter((collection) => Boolean(payload.collections[collection].config.versions))
        .map(async (collection) => {
          try {
            await payload.db.deleteVersions({ collection, req, where: {} });
            payload.logger.info(`Versions for ${collection} reset`);
          } catch (error) {
            payload.logger.error(`Failed to reset versions for ${collection}:`, error);
            throw new Error(`Failed to reset versions for ${collection}, skipping...`, {
              cause: error,
            });
          }
        }),
    );

    payload.logger.info("Versions reset");
  } catch (error) {
    payload.logger.error("Resetting database failed:", error);
    throw error;
  }
}

export async function POST(): Promise<Response> {
  const payload = await getPayloadClient();
  const requestHeaders = await headers();

  // Authenticate by passing request headers
  const { user } = await payload.auth({ headers: requestHeaders });

  if (!user) {
    return Response.json({ message: "Action forbidden." }, { status: 403 });
  }

  try {
    // Create a Payload request object to pass to the Local API for transactions
    // At this point you should pass in a user, locale, and any other context you need for the Local API
    const payloadReq = await createLocalReq({ user }, payload);

    const startTime = Date.now();

    await resetDatabase(payload, payloadReq);

    const endTime = Date.now();
    const duration = endTime - startTime;
    payload.logger.info(`Database reset in ${duration}ms`);

    return Response.json({ success: true });
  } catch (e) {
    payload.logger.error({ err: e, message: "Error seeding data" });
    return Response.json({ message: "Error seeding data." }, { status: 500 });
  }
}
