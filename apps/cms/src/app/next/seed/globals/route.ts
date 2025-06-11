import { getPayloadClient } from "@synoem/payload/client";
import { headers } from "next/headers";

export async function POST(): Promise<Response> {
  const payload = await getPayloadClient();
  const requestHeaders = await headers();

  // Authenticate by passing request headers
  const { user } = await payload.auth({ headers: requestHeaders });

  if (!user) {
    return new Response("Action forbidden.", { status: 403 });
  }

  try {
    // Create a Payload request object to pass to the Local API for transactions
    // At this point you should pass in a user, locale, and any other context you need for the Local API
    //   const payloadReq = await createLocalReq({ user }, payload);

    //   await resetDatabase(payload, payloadReq);

    return Response.json({ success: true });
  } catch (e) {
    payload.logger.error({ err: e, message: "Error seeding data" });
    return new Response("Error seeding data.", { status: 500 });
  }
}
