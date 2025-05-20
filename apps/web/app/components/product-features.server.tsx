import type { SolarPanel, PumpController } from "@synoem/types";
import { getIconComponent } from "~/utils/get-icon";

interface Props {
  features: SolarPanel["features"] | PumpController["features"];
}

export const ProductFeatures = ({ features }: Props) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6 mb-4">
      {features &&
        features.length > 0 &&
        features.slice(0, 4).map((feature) => (
          <div
            key={feature.id || `feature-${Math.random().toString(36).substring(2, 9)}`}
            className="flex bg-muted/10 backdrop-blur-md items-center rounded-lg p-2 md:p-3"
          >
            {feature.iconName && (
              <div className="grid place-items-center mr-2 md:mr-4">
                {(() => {
                  const Icon = getIconComponent(feature.iconName);
                  return Icon && <Icon className="size-5 md:size-6 text-primary" />;
                })()}
              </div>
            )}
            <div className="space-y-1">
              <h3 className="font-semibold text-base md:text-xl">{feature.title}</h3>
              <p className="text-muted-foreground font-medium text-xs md:text-base">
                {feature.description}
              </p>
            </div>
          </div>
        ))}
    </div>
  );
};
