"use client";

import type { Locale } from "@synoem/config";
import type { Datasheet, Product } from "@synoem/payload/payload-types";
import { Button } from "@synoem/ui/components/button";
import { Download } from "lucide-react";
import { useTranslations } from "~/i18n/utils";

type Props = React.ComponentProps<typeof Button> & {
  product: Product;
  autoGenerate?: boolean;
  showIcon?: boolean;
  locale: Locale;
};

export const DownloadDatasheetButton = ({
  product,
  locale,
  showIcon,
  autoGenerate,
  ...props
}: Props) => {
  const { datasheet } = product;

  const { t } = useTranslations(locale);

  const hasDatasheet = datasheet && typeof datasheet === "object";

  // const { title, file } = datasheet as Datasheet;

  // const hasFile = file && typeof file === "object";

  // TODO: use render-to-pdf to generate a datasheet
  return (
    <Button className="flex gap-2 min-w-[200px]" {...props}>
      {showIcon && <Download />}
      {t("Component.DownloadDatasheetButton.download")}
    </Button>
  );
};
