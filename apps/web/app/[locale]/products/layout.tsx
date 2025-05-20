import { NuqsAdapter } from "nuqs/adapters/next/app";
import { QueryContextProvider } from "~/components/query-context-provider.client";

export default async function ({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <QueryContextProvider>
      <NuqsAdapter>
        <div className="min-h-screen bg-background flex flex-col">{children}</div>
      </NuqsAdapter>
    </QueryContextProvider>
  );
}
