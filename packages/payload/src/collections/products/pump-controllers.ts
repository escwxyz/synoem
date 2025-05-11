import type { CollectionConfig } from "payload";
import {
  documentsTab,
  oemTab,
  productDetailsTab,
  createSharedFields,
  createVariantsTab,
} from "./shared-fields";

import { getProductCategoryOptions } from "@synoem/config";
import { validateRange } from "../../validation";
import { generateId, generateProductCoverImage } from "../../hooks";

export const PumpControllers: CollectionConfig = {
  slug: "pump-controllers",
  admin: {
    group: "Products",
    useAsTitle: "title",
  },
  fields: [
    ...createSharedFields("pump-controller"),
    {
      name: "category",
      type: "select",
      required: true,
      options: getProductCategoryOptions("pump-controller"),
      admin: {
        position: "sidebar",
      },
    },
    {
      type: "tabs",
      tabs: [
        productDetailsTab,
        {
          label: "Specs",
          fields: [
            {
              name: "wideAmplitudeVoltage",
              type: "group",
              label: "Wide Amplitude Voltage (V)",
              validate: validateRange,
              fields: [
                {
                  name: "min",
                  type: "number",
                  label: "Min",
                  required: true,
                  min: 0,
                  defaultValue: 110,
                },
                {
                  name: "max",
                  type: "number",
                  label: "Max",
                  required: true,
                  min: 0,
                  defaultValue: 220,
                },
              ],
            },
            {
              name: "maxCurrent",
              type: "number",
              label: "Max Current (A)",
              required: true,
              min: 0,
              defaultValue: 16,
            },
            {
              name: "maxPower",
              type: "number",
              label: "Max Power (kW)",
              required: true,
              min: 0,
              defaultValue: 1.1,
            },
            {
              name: "startingPressureRange",
              type: "group",
              label: "Starting Pressure (bar)",
              validate: validateRange,
              fields: [
                {
                  name: "min",
                  type: "number",
                  label: "Min",
                  required: true,
                  min: 0,
                  defaultValue: 1.0,
                },
                {
                  name: "max",
                  type: "number",
                  label: "Max",
                  required: true,
                  min: 0,
                  defaultValue: 4.0,
                },
              ],
            },
            {
              name: "maxPressure",
              type: "number",
              label: "Max Allowable Pressure (bar)",
              required: true,
              min: 0,
              defaultValue: 10,
            },
            {
              name: "tempRange",
              type: "group",
              label: "Temperature Range (°C)",
              validate: validateRange,
              fields: [
                {
                  name: "min",
                  type: "number",
                  label: "Min",
                  required: true,
                  min: 0,
                  defaultValue: 0,
                },
                {
                  name: "max",
                  type: "number",
                  label: "Max",
                  required: true,
                  min: 0,
                  defaultValue: 60,
                },
              ],
            },
            {
              name: "frequencyRange",
              type: "group",
              label: "Frequency (Hz)",
              validate: validateRange,
              fields: [
                {
                  name: "min",
                  type: "number",
                  label: "Min",
                  required: true,
                  min: 0,
                  defaultValue: 50,
                },
                {
                  name: "max",
                  type: "number",
                  label: "Max",
                  required: true,
                  min: 0,
                  defaultValue: 60,
                },
              ],
            },
            {
              name: "protectionGrade",
              type: "text",
              label: "Protection Grade",
              required: true,
              defaultValue: "IP65",
            },
            {
              name: "threadInterface",
              type: "text",
              label: "Thread Interface",
              defaultValue: "G 1.0",
            },
            {
              name: "maxWorkingPressure",
              type: "number",
              label: "Max Working Pressure (PSI)",
              required: true,
              min: 0,
              defaultValue: 650,
            },
          ],
        },
        createVariantsTab("pump-controller"),
        documentsTab,
        oemTab,
      ],
    },
  ],
  hooks: {
    beforeValidate: [generateId, generateProductCoverImage],
  },
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
