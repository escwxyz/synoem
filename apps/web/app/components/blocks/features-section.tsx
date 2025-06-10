import type { FeaturesBlockType } from "@synoem/types";
import { FeatureCard } from "./feature-card";
import { cn } from "@synoem/ui/lib/utils";

export const FeaturesSection = ({ features, columns, title, description }: FeaturesBlockType) => {
  if (!features?.length) {
    return null;
  }

  return (
    <div className="max-w-4xl mx-auto space-y-4">
      {title && <div className="text-center text-3xl font-bold">{title}</div>}
      {description && (
        <div className="text-center text-sm text-muted-foreground mb-4">{description}</div>
      )}
      <div
        className={cn(
          "grid grid-cols-1 gap-4",
          columns === "1" && "md:grid-cols-1",
          columns === "2" && "md:grid-cols-2 md:gap-12",
          columns === "3" && "md:grid-cols-3 md:gap-8",
        )}
      >
        {features.map((feature) => (
          <FeatureCard key={feature.id} {...feature} />
        ))}
      </div>
    </div>
  );
};
