import type { Button } from "@synoem/ui/components/button";
import type { Product } from "@synoem/payload/payload-types";
import type { Locale } from "@synoem/config";

export type Props = React.ComponentProps<typeof Button> & {
  product: Product;
  locale: Locale;
};
