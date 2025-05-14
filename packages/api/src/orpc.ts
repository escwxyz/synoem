import { os } from "@orpc/server";
import { type BasePayload, getPayload } from "payload";
import config from "@synoem/payload/payload-config";

const databaseMiddleware = os.$context<{ payload?: BasePayload }>().middleware(async ({ next }) => {
  const payload = await getPayload({ config });

  return await next({
    context: {
      payload,
    },
  });
});

export const orpc = os.use(databaseMiddleware);
