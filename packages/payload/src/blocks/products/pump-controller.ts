import type { Block } from "payload";
import { validateRange } from "../../validation/validate-range";

export const pumpControllerBlock: Block = {
  slug: "pumpControllerBlock",
  dbName: "pcBLK",
  labels: {
    singular: "Pump Controller",
    plural: "Pump Controllers",
  },
  interfaceName: "PumpControllerBlockType",
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
      defaultValue: "standard",
    },
    {
      name: "maxVoltage",
      type: "number",
      label: "Max Voltage (V)",
      required: true,
      min: 0,
      defaultValue: 265,
    },
    {
      name: "voltageRange",
      type: "group",
      label: "Voltage Range (V)",
      fields: [
        {
          name: "min",
          type: "number",
          label: "Min",
          required: true,
          min: 0,
          defaultValue: 85,
        },
        {
          name: "max",
          type: "number",
          label: "Max",
          required: true,
          min: 0,
          defaultValue: 265,
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
      defaultValue: 10,
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
    {
      name: "protectionGrade",
      type: "text",
      label: "Protection Grade",
      required: true,
      defaultValue: "IP65",
    },
    {
      name: "frequency",
      type: "text",
      label: "Frequency (Hz)",
      required: true,
      defaultValue: "50/60",
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
};
