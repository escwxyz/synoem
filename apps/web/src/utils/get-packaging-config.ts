import type { PackagingConfig } from "@synoem/payload/payload-types";
import type { BasePayload } from "payload";

interface Props {
  packagingConfig: PackagingConfig | number;
  payload: BasePayload;
}

export const getPackagingConfig = async (props: Props) => {
  const { packagingConfig, payload } = props;

  if (typeof packagingConfig === "number") {
    const packagingConfigData = await payload.find({
      collection: "packaging-configs",
      where: {
        id: {
          equals: packagingConfig,
        },
      },
    });

    return packagingConfigData.docs[0];
  }

  return packagingConfig;
};
