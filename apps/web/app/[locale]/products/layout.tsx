import { NuqsAdapter } from "nuqs/adapters/next/app";

// TODO:GenerateMetadata

export default async function ({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <NuqsAdapter>
      <div className="min-h-screen bg-background flex flex-col">{children}</div>
    </NuqsAdapter>
  );
}
