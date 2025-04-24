import type { Block, CollapsibleField } from "payload";
import { validateRange } from "../../validation/validate-range";
import { validatePowerRange } from "../../validation/validate-power-range";

const cellSpecs: CollapsibleField = {
  label: "Cell Specs",
  type: "collapsible",
  admin: {
    initCollapsed: true,
  },
  fields: [
    {
      name: "cellDesc",
      type: "text",
      label: "Cell Description",
      required: true,
      localized: true,
    },
    {
      type: "row",
      fields: [
        {
          name: "cellLength",
          type: "number",
          label: "Cell Length (mm)",
          required: true,
          min: 0,
          defaultValue: 166,
        },
        {
          name: "cellWidth",
          type: "number",
          label: "Cell Width (mm)",
          required: true,
          min: 0,
          defaultValue: 100,
        },
      ],
    },
    {
      name: "cellCount",
      type: "number",
      label: "Cell Count",
      required: true,
      min: 0,
      defaultValue: 72,
    },
  ],
};

const glassSpecs: CollapsibleField = {
  type: "collapsible",
  label: "Glass Specs",
  fields: [
    {
      name: "glassType",
      type: "select",
      label: "Glass Type",
      required: true,
      options: [
        {
          label: "Monofacial",
          value: "monofacial",
        },
        {
          label: "Bifacial",
          value: "bifacial",
        },
      ],
    },
    {
      name: "bifaciality",
      type: "number",
      label: "Bifaciality (%)",
      admin: {
        condition: (data, siblingData) => {
          return siblingData?.glassType === "bifacial";
        },
      },
      min: 0,
      defaultValue: 80,
    },
    {
      name: "glassThickness",
      type: "number",
      label: "Glass Thickness (mm)",
      required: true,
      min: 0,
      defaultValue: 2,
    },

    {
      name: "glassDesc",
      type: "text",
      label: "Glass Description",
      required: true,
      localized: true,
    },
  ],
};

const frameSpecs: CollapsibleField = {
  type: "collapsible",
  label: "Frame Specs",
  fields: [
    {
      name: "frameDesc",
      type: "text",
      label: "Frame Description",
      required: true,
      localized: true,
      defaultValue: "Anodized aluminum alloy",
    },
  ],
};

const junctionSpecs: CollapsibleField = {
  type: "collapsible",
  label: "Junction Specs",
  fields: [
    {
      name: "junctionDesc",
      type: "text",
      label: "Junction Description",
      required: true,
      localized: true,
      defaultValue: "IP68 rated, 3 bypass diodes",
    },
  ],
};

const connectorSpecs: CollapsibleField = {
  type: "collapsible",
  label: "Connector Specs",
  fields: [
    {
      name: "connDesc",
      type: "text",
      label: "Connector Description",
      required: true,
      localized: true,
    },
    {
      name: "connLength",
      type: "number",
      label: "Connector Length (mm)",
      required: true,
      min: 0,
      defaultValue: 1300,
    },
  ],
};

const environmentSpecs: CollapsibleField = {
  type: "collapsible",
  label: "Environment Specs",
  fields: [
    {
      name: "temp",
      type: "group",
      label: "Temperature Range",
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
    {
      type: "row",
      fields: [
        {
          name: "snow",
          type: "number",
          label: "Snow Loads (Pa)",
          required: true,
          min: 0,
          defaultValue: 5400,
        },
        {
          name: "wind",
          type: "number",
          label: "Wind Loads (Pa)",
          required: true,
          min: 0,
          defaultValue: 2400,
        },
        {
          name: "hail",
          type: "number",
          label: "Hail (mm)",
          required: true,
          min: 0,
          defaultValue: 25,
        },
      ],
    },
  ],
};

const performanceSpecs: CollapsibleField = {
  type: "collapsible",
  label: "Performance Specs",
  fields: [
    {
      name: "tolerance",
      type: "group",
      label: "Power Tolerance (W)",
      validate: validateRange,
      fields: [
        {
          name: "min",
          type: "number",
          label: "Min Power Tolerance (W)",
          defaultValue: 0,
        },
        {
          name: "max",
          type: "number",
          label: "Max Power Tolerance (W)",
          defaultValue: 5,
        },
      ],
    },

    {
      name: "power",
      type: "group",
      label: "Power Range",
      validate: validatePowerRange,
      fields: [
        {
          name: "min",
          type: "number",
          required: true,
          label: "Min Power Output (W)",
          defaultValue: 430,
        },
        {
          name: "max",
          type: "number",
          required: true,
          label: "Max Power Output (W)",
          defaultValue: 455,
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
              beforeInput: ["@synoem/payload/components/power-points#GeneratePowerPointsButton"],
            },
          },
          fields: [
            {
              name: "pmax",
              type: "number",
              label: "Pmax (W)",
              admin: {
                readOnly: true,
              },
            },
            {
              name: "efficiency",
              type: "number",
              label: "Efficiency (%)",
              admin: {
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
      name: "ratings",
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
          defaultValue: "1500 V DC (IEC) / 1000 V DC (UL)",
        },
        {
          name: "fire",
          type: "text",
          label: "Fire Rating",
          required: true,
          defaultValue: "Class C (UL)",
        },
      ],
    },
  ],
};

export const solarPanelBlock: Block = {
  slug: "solarPanelBlock",
  dbName: "spBLK",
  labels: {
    singular: "Solar Panel",
    plural: "Solar Panels",
  },
  interfaceName: "SolarPanelBlockType",
  fields: [
    {
      name: "type",
      label: "Type",
      type: "select",
      options: [
        {
          label: "TOPCon",
          value: "topcon",
        },
        {
          label: "PERC",
          value: "perc",
        },
        {
          label: "HJT",
          value: "hjt",
        },
      ],
      defaultValue: "topcon",
    },
    cellSpecs,
    glassSpecs,
    frameSpecs,
    junctionSpecs,
    connectorSpecs,
    environmentSpecs,
    performanceSpecs,
  ],
};
