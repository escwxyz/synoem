import type { CollapsibleField } from "payload";
import { animation } from "./animation";

export const create3DSettingsField = (
  overrides?: Partial<CollapsibleField>,
): CollapsibleField => {
  return {
    type: "collapsible",
    label: "3D Model Settings",
    admin: {
      description: "Config the 3D model settings & animations",
    },
    fields: [
      {
        type: "tabs",
        tabs: [
          {
            label: "Settings",
            admin: {
              description: "Config initial position, rotation, and scale",
            },
            fields: [
              {
                type: "row",
                fields: [
                  {
                    name: "posX",
                    type: "number",
                    label: "Model Position X",
                    defaultValue: 0,
                  },
                  {
                    name: "posY",
                    type: "number",
                    label: "Model Position Y",
                    defaultValue: 0,
                  },
                  {
                    name: "posZ",
                    type: "number",
                    label: "Model Position Z",
                    defaultValue: 0,
                  },
                ],
              },
              {
                type: "row",
                fields: [
                  {
                    name: "rotX",
                    type: "number",
                    label: "Model Rotation X",
                    defaultValue: 0,
                  },
                  {
                    name: "rotY",
                    type: "number",
                    label: "Model Rotation Y",
                    defaultValue: 0,
                  },
                  {
                    name: "rotZ",
                    type: "number",
                    label: "Model Rotation Z",
                    defaultValue: 0,
                  },
                ],
              },
              {
                name: "scale",
                type: "number",
                label: "Model Scale",
                min: 0.05,
                max: 10,
                defaultValue: 1,
              },
            ],
          },
          {
            label: "Animations",
            fields: [animation],
          },
        ],
      },
    ],
    ...overrides,
  };
};

export const threeDSettings = create3DSettingsField();
