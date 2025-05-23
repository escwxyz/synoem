import type { CollectionAfterChangeHook } from "payload";
import type { SolarPanel } from "@synoem/types";
import type { z } from "zod";
import type { productSchema } from "@synoem/schema";
import { revalidateProduct } from "../utils";

export const revalidateSolarPanel: CollectionAfterChangeHook<SolarPanel> = async ({
  req: { payload, locale },
  doc,
  operation,
}) => {
  if (operation === "update" || operation === "create") {
    if (locale === "all" || !locale) {
      payload.logger.warn(
        "Revalidation skipped: locale is not set or is 'all' for a create/update operation",
      );
      return;
    }

    const productInfoForRevalidation: z.infer<typeof productSchema> = {
      slug: doc.slug,
      productTypeId: "solar-panel",
      locale: locale,
    };

    try {
      await revalidateProduct(productInfoForRevalidation);
      payload.logger.info(
        `Successfully triggered revalidation for product operation '${operation}'`,
        {
          docSlug: doc.slug,
          locale: locale,
        },
      );
    } catch (error) {
      payload.logger.error(`Failed to revalidate product for operation '${operation}'`, {
        error,
        docSlug: doc.slug,
        locale: locale,
      });
    }
  }
};
