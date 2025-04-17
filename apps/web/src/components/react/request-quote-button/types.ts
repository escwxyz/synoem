import type { Button } from "@synoem/ui/components/button";
import type { Product } from "~/types/product";

export type Props = React.ComponentProps<typeof Button> & {
  product: Product;
};
