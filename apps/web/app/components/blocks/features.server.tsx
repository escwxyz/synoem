import type { FeaturesBlockType } from "@synoem/types";
import { Feature } from "./feature.client";
import { cn } from "@synoem/ui/lib/utils";

export const Features = ({ features, columns }: FeaturesBlockType) => {
  if (!features?.length) {
    return null;
  }

  return (
    <div className="max-w-4xl mx-auto">
      <div
        className={cn(
          "grid grid-cols-1 gap-4",
          columns === "1" && "md:grid-cols-1",
          columns === "2" && "md:grid-cols-2 md:gap-12",
          columns === "3" && "md:grid-cols-3 md:gap-8",
        )}
      >
        {features.map((feature) => (
          <Feature key={feature.id} {...feature} />
        ))}
      </div>
    </div>
  );
};
