import { createProductVariants } from "../../fields/product-variants";
import { create3dModelField } from "../../fields/3d-model";
import { coverImage } from "../../fields/cover-image";
import { desc } from "../../fields/description";
import { industry } from "../../fields/industry";
import { createLeadTimeField } from "../../fields/lead-time";
import { modelName } from "../../fields/model-name";
import { createMoqGroup } from "../../fields/moq";
import { productGallery } from "../../fields/product-gallery";
import { createRelatedProductsField } from "../../fields/related-products";
import { slugField } from "../../fields/slug";
import { title } from "../../fields/title";
import { validateRange } from "../../validation/validate-range";
import type { CollectionConfig, Tab } from "payload";
import { PumpControllerVariantBlock } from "../../blocks/product-variants/pump-controller";
import { datasheet } from "../../fields/datasheet";
import { createPackagingConfig } from "../../fields/packaging-config";
import { createWarrantiesField } from "../../fields/warranties";
import { createInquiryJoinField } from "../../fields/inquiry-join";
import { createInstructionField } from "../../fields/instruction";
import { createCertificationField } from "../../fields/certification";
import { createProductFeaturesField } from "../../fields/product-features";

const relatedPumpControllersTab: Tab = {
  label: "Related Pump Controllers",
  fields: [
    createRelatedProductsField({
      relationTo: "pump-controllers",
      filterOptions: ({ siblingData }) => {
        return {
          _status: {
            equals: "published",
          },
          type: {
            // @ts-expect-error siblingData is not typed
            equals: siblingData?.type,
          },
          id: {
            // @ts-expect-error siblingData is not typed
            not_equals: siblingData?.id,
          },
        };
      },
    }),
  ],
};

const productDetailsTab: Tab = {
  label: "Product Details",
  fields: [
    modelName,
    desc,
    industry,
    productGallery,
    createProductVariants({ block: PumpControllerVariantBlock }),
    create3dModelField(),
    createProductFeaturesField(),
  ],
};

const oemTab: Tab = {
  label: "OEM Info",
  fields: [
    createMoqGroup(),
    createLeadTimeField(),
    createPackagingConfig(),
    createWarrantiesField(),
    createInstructionField(),
    createCertificationField(),
  ],
};

const productSpecificationsTab: Tab = {
  label: "Product Specifications",
  fields: [
    {
      name: "type",
      type: "select",
      label: "Type",
      required: true,
      options: [
        {
          label: "Smart",
          value: "smart",
        },
        {
          label: "Standard",
          value: "standard",
        },
      ],
    },
    {
      name: "maxVoltage",
      type: "number",
      label: "Max Voltage (V)",
      required: true,
      min: 0,
    },
    {
      name: "maxCurrent",
      type: "number",
      label: "Max Current (A)",
      required: true,
      min: 0,
    },
    {
      name: "maxPower",
      type: "number",
      label: "Max Power (kW)",
      required: true,
      min: 0,
    },
    {
      name: "startingPressure",
      type: "number",
      label: "Starting Pressure (bar)",
      required: true,
      min: 0,
    },
    {
      name: "maxPressure",
      type: "number",
      label: "Max Pressure (bar)",
      required: true,
      min: 0,
    },
    {
      name: "tempRange",
      type: "group",
      label: "Temp Range (°C)",
      validate: validateRange,
      fields: [
        {
          name: "min",
          type: "number",
          label: "Min",
          required: true,
          min: 0,
        },
        {
          name: "max",
          type: "number",
          label: "Max",
          required: true,
          min: 0,
        },
      ],
    },
  ],
};

export const PumpControllers: CollectionConfig = {
  slug: "pump-controllers",
  admin: {
    group: "Products",
    useAsTitle: "title",
    description: "Manage your pump controller products",
  },
  fields: [
    title,
    ...slugField(),
    coverImage,
    datasheet,
    createInquiryJoinField(),
    {
      type: "tabs",
      tabs: [
        productDetailsTab,
        productSpecificationsTab,
        oemTab,
        relatedPumpControllersTab,
      ],
    },
  ],
  versions: {
    drafts: {
      autosave: {
        interval: 5000,
      },
      schedulePublish: true,
    },
    maxPerDoc: 5,
  },
};
