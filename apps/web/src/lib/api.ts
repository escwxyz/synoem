import type { APIClient } from "@synoem/api";
import { createORPCClient } from "@orpc/client";
import { RPCLink } from "@orpc/client/fetch";

const link = new RPCLink({
  url: DMNO_PUBLIC_CONFIG.NEXT_API_URL,
  // headers: () => ({
  //   authorization: 'Bearer token',
  // }),
  // fetch: <-- provide fetch polyfill fetch if needed
});

export const apiClient = createORPCClient<APIClient>(link);
