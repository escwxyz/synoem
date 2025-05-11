import type { CollapsibleField } from "payload";

export const create3dModelField = (): CollapsibleField => {
  return {
    type: "collapsible",
    label: "3D Model",
    fields: [
      {
        name: "three",
        type: "group",
        label: "3D Model Configuration",
        fields: [
          {
            name: "enabled",
            type: "checkbox",
            label: "Enable 3D Model",
            defaultValue: false,
          },
          {
            name: "model",
            type: "upload",
            label: "3D Model",
            hasMany: false,
            relationTo: "models",
            admin: {
              description: "Upload a 3D model file",
              condition: (data, siblingData) => siblingData?.enabled,
            },
          },
          // Add annotations support
        ],
      },
    ],
  };
};
