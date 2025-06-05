import type { FeaturesBlockType } from "@synoem/types";
import { Feature } from "./feature.client";

export const Features = ({ features }: FeaturesBlockType) => {
  return (
    <div className="max-w-4xl mx-auto">
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 md:gap-12">
        {features?.map((feature) => (
          <Feature key={feature.id} {...feature} />
        ))}
      </div>
    </div>
  );
};
