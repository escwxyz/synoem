import type { ProductTypeId, Locale } from "@synoem/config";
import type { SolarPanel, PumpController } from "@synoem/types";
import type { Button } from "@synoem/ui/components/button";
import type { FormStep } from "~/components/inquiry-form";

export type RequestQuoteButtonProps = {
  product?: Pick<SolarPanel | PumpController, "modelName" | "id">;
  productTypeId?: ProductTypeId;
  locale: Locale;
  buttonText?: string;
  // shimmer?: boolean;
} & React.ComponentProps<typeof Button>;

export type RequestQuoteMobileProps = RequestQuoteButtonProps & {
  steps: FormStep[];
  // step: number;
};

export type RequestQuoteDesktopProps = RequestQuoteMobileProps;
