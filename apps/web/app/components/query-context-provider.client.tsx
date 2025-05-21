// "use client";

// import { createORPCReactQueryUtils } from "@orpc/react-query";
// import { QueryClient } from "@tanstack/react-query";
// import { useState } from "react";
// import { QueryClientProvider } from "@tanstack/react-query";
// import { ORPCContext } from "./orpc-context.client";
// import { apiClient } from "~/libs/api-client";

// export function QueryContextProvider({ children }: { children: React.ReactNode }) {
//   const queryClient = new QueryClient({
//     defaultOptions: {
//       queries: {
//         staleTime: 60 * 60 * 24 * 1000,
//       },
//     },
//   });
//   const [orpc] = useState(() => createORPCReactQueryUtils(apiClient));

//   return (
//     <QueryClientProvider client={queryClient}>
//       <ORPCContext.Provider value={orpc}>{children}</ORPCContext.Provider>
//     </QueryClientProvider>
//   );
// }
