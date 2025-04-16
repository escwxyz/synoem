import type { CollectionConfig, Tab } from "payload";
import { validatePowerRange } from "../../validation/validate-power-range";
import { createTitleField, title } from "../../fields/title";
import { slugField } from "../../fields/slug";
import { createDimensionsGroup } from "../../fields/dimensions";
import { validateInteger } from "../../validation/validate-integer";
import { createWeightGroup } from "../../fields/unit";
import { industry } from "../../fields/industry";
import { modelName } from "../../fields/model-name";
import { desc } from "../../fields/description";
import { createMoqGroup } from "../../fields/moq";
import { coverImage } from "../../fields/cover-image";
import { validateRange } from "../../validation/validate-range";
import { productGallery } from "../../fields/product-gallery";
import { create3dModelField } from "../../fields/3d-model";
import { createLeadTimeField } from "../../fields/lead-time";
import { createRelatedProductsField } from "../../fields/related-products";
import { datasheet } from "../../fields/datasheet";
import { createInstructionField } from "../../fields/instruction";
import { createPackagingConfig } from "../../fields/packaging-config";
import { createWarrantiesField } from "../../fields/warranties";
import { createCertificationField } from "../../fields/certification";
import { createProductVariants } from "../../fields/product-variants";
import { SolarPanelVariantBlock } from "../../blocks/product-variants/solar-panel";
import { createInquiryJoinField } from "../../fields/inquiry-join";
import { createProductFeaturesField } from "../../fields/product-features";
import { createDrawingField } from "../../fields/drawing";

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

const productDetailsTab: Tab = {
  label: "Product Details",
  fields: [
    modelName,
    desc,
    industry,
    productGallery,
    createProductVariants({ block: SolarPanelVariantBlock }),
    create3dModelField(),
    createProductFeaturesField(),
  ],
};

const relatedSolarPanelsTab: Tab = {
  label: "Related Solar Panels",
  fields: [
    createRelatedProductsField({
      relationTo: "solar-panels",
      filterOptions: ({ siblingData }) => {
        return {
          _status: {
            equals: "published",
          },
          "cell.type": {
            // @ts-expect-error siblingData is not typed
            equals: siblingData?.cell?.type,
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

const productSpecificationsTab: Tab = {
  label: "Product Specifications",
  fields: [
    createDimensionsGroup(),
    createWeightGroup("weight", "Weight"),
    createDrawingField(),
    {
      name: "cell",
      type: "group",
      label: "Cell",
      fields: [
        {
          name: "type",
          type: "select",
          label: "Cell Type",
          required: true,
          options: [
            { label: "PERC (P-type)", value: "perc" },
            { label: "HJT (N-type)", value: "hjt" },
            { label: "TOPCon (N-type)", value: "topcon" },
          ],
        },
        {
          name: "tech",
          type: "select",
          label: "Cell Technology",
          required: false,
          hasMany: true,
          options: [
            { label: "0BB", value: "0bb" },
            { label: "SMBB", value: "smbb" },
            { label: "MBB", value: "mbb" },
            { label: "Back Contact", value: "bc" },
            { label: "Perovskite", value: "perovskite" },
          ],
        },
        {
          name: "size",
          type: "group",
          label: "Cell Size (mm)",
          fields: [
            {
              name: "length",
              type: "number",
              label: "Length (mm)",
              required: true,
              min: 0,
            },
            {
              name: "width",
              type: "number",
              label: "Width (mm)",
              required: true,
              min: 0,
            },
          ],
        },
        {
          name: "count",
          type: "number",
          label: "Cell Count",
          required: true,
          min: 0,
          validate: validateInteger,
        },
      ],
    },
    {
      name: "facial",
      type: "select",
      label: "Facial Type",
      required: true,
      options: [
        { label: "Monofacial", value: "monofacial" },
        { label: "Bifacial", value: "bifacial" },
      ],
    },
    {
      name: "bifaciality",
      type: "number",
      label: "Bifaciality (%)",
      admin: {
        condition: (data) => data?.facial === "bifacial",
        description: "Enter the bifaciality of the panel",
      },
      required: true,
      min: 0,
      defaultValue: 80,
    },
    {
      name: "glass",
      type: "group",
      label: "Glass",
      fields: [
        {
          name: "type",
          type: "select",
          label: "Glass Type",
          required: true,
          options: [
            { label: "Single Glass", value: "single" },
            { label: "Double Glass", value: "double" },
          ],
        },
        {
          name: "thickness",
          type: "number",
          label: "Glass Thickness (mm)",
          required: true,
          min: 0,
        },
        desc,
      ],
    },
    createTitleField({
      name: "frame",
      label: "Frame",
      required: true,
      admin: {
        description: "Enter the description of the frame",
      },
    }),
    createTitleField({
      name: "junction",
      label: "Junction",
      required: true,
      admin: {
        description: "Enter the description of the junction box",
      },
    }),
    createTitleField({
      name: "connector",
      label: "Connector",
      required: true,
      admin: {
        description: "Enter the description of the connector",
      },
    }),
    {
      name: "temp",
      type: "group",
      label: "Temperature",
      validate: validateRange,
      admin: {
        description: "Enter the workingtemperature range of the panel / cell",
      },
      fields: [
        {
          name: "min",
          type: "number",
          label: "Min Temperature (°C)",
          required: true,
          max: 0,
          defaultValue: -40,
        },
        {
          name: "max",
          type: "number",
          label: "Max Temperature (°C)",
          required: true,
          min: 0,
          defaultValue: 85,
        },
      ],
    },
    createTitleField({
      name: "hail",
      label: "Hail",
      required: false,
      admin: {
        description: "Enter the description of the hail",
      },
    }),
    {
      name: "loads",
      type: "group",
      label: "Loads",
      fields: [
        {
          name: "wind",
          type: "number",
          label: "Wind (Pa)",
          required: true,
          min: 0,
          defaultValue: 2400,
        },
        {
          name: "snow",
          type: "number",
          label: "Snow (Pa)",
          required: true,
          min: 0,
          defaultValue: 5400,
        },
      ],
    },
  ],
};

const electricalCharacteristicsTab: Tab = {
  label: "Electrical Characteristics",
  fields: [
    {
      name: "powerRange",
      type: "group",
      label: "Power Range",
      validate: validatePowerRange,
      fields: [
        {
          name: "min",
          type: "number",
          required: true,
          label: "Min Power Output (W)",
        },
        {
          name: "max",
          type: "number",
          required: true,
          label: "Max Power Output (W)",
        },
        {
          name: "step",
          type: "number",
          label: "Step (W)",
          defaultValue: 5,
          required: true,
          admin: {
            description: "Step must be a multiple of 5",
          },
        },
        {
          name: "points",
          type: "array",
          label: "Power Points",
          admin: {
            description: "Click the button to generate the power points",
            components: {
              RowLabel: "@synoem/payload/components/row-labels#PowerPointLabel",
              beforeInput: [
                "@synoem/payload/components/power-points#GeneratePowerPointsButton",
              ],
            },
          },
          fields: [
            {
              name: "pmax",
              type: "number",
              label: "Pmax (W)",
              admin: {
                description: "This is automatically generated",
                readOnly: true,
              },
            },
            {
              name: "efficiency",
              type: "number",
              label: "Efficiency (%)",
              admin: {
                description: "This is automatically generated",
                readOnly: true,
              },
            },
            {
              name: "vmp",
              type: "number",
              label: "Vmp (V)",
              required: true,
            },
            {
              name: "imp",
              type: "number",
              label: "Imp (A)",
              required: true,
            },
            {
              name: "voc",
              type: "number",
              label: "Voc (V)",
              required: true,
            },
            {
              name: "isc",
              type: "number",
              label: "Isc (A)",
              required: true,
            },
          ],
        },
      ],
    },
    {
      name: "tempCo",
      type: "group",
      label: "Temperature Coefficient",
      fields: [
        {
          name: "pmax",
          type: "number",
          label: "Pmax (%/°C)",
          required: true,
          defaultValue: -0.35,
          max: 0,
        },
        {
          name: "isc",
          type: "number",
          label: "Isc (%/°C)",
          required: true,
          defaultValue: 0.04,
          min: 0,
        },
        {
          name: "voc",
          type: "number",
          label: "Voc (%/°C)",
          required: true,
          defaultValue: -0.25,
          max: 0,
        },
        {
          name: "noct",
          type: "number",
          label: "NOCT (°C)",
          required: true,
          defaultValue: 45,
          min: 0,
        },
      ],
    },
    {
      name: "maxRatings",
      type: "group",
      label: "Max Ratings",
      fields: [
        {
          name: "fuse",
          type: "number",
          label: "Max Series Fuse (A)",
          required: true,
          min: 0,
          defaultValue: 20,
        },
        {
          name: "voltage",
          type: "text",
          label: "Max System Voltage (V)",
          required: true,
          admin: {
            description: "Enter the maximum system voltage",
          },
          defaultValue: "1500 V DC (IEC) / 1000 V DC (UL)",
        },
        {
          name: "fire",
          type: "text",
          label: "Fire Rating",
          localized: true,
          required: true,
          admin: {
            description: "Enter the fire rating",
          },
          defaultValue: "Class C (UL)",
        },
      ],
    },
  ],
};

export const SolarPanels: CollectionConfig<"solar-panels"> = {
  slug: "solar-panels",
  admin: {
    group: "Products",
    useAsTitle: "title",
    description: "Manage your solar panel products",
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
        electricalCharacteristicsTab,
        oemTab,
        relatedSolarPanelsTab,
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
    maxPerDoc: 1,
  },
};
