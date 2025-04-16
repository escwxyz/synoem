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
          {
            name: "variants",
            type: "array",
            label: "Color Variants",
            admin: {
              condition: (data, siblingData) => siblingData?.enabled,
            },
            fields: [
              {
                name: "name",
                type: "text",
                label: "Variant Name",
                required: true,
              },
              {
                name: "color",
                type: "group",
                label: "Color Configuration",
                fields: [
                  {
                    name: "frame",
                    type: "text",
                    label: "Frame Color",
                    required: true,
                    admin: {
                      description: "Hex color code or material name",
                    },
                  },
                  {
                    name: "glass",
                    type: "text",
                    label: "Glass Color",
                    required: true,
                    admin: {
                      description: "Hex color code or material name",
                    },
                  },
                  {
                    name: "backsheet",
                    type: "text",
                    label: "Backsheet Color",
                    required: true,
                    admin: {
                      description: "Hex color code or material name",
                    },
                  },
                ],
              },
              //   {
              //     name: "materials",
              //     type: "group",
              //     label: "Material Properties",
              //     fields: [
              //       {
              //         name: "frameMetallic",
              //         type: "number",
              //         label: "Frame Metallic",
              //         min: 0,
              //         max: 1,
              //         defaultValue: 0.8,
              //       },
              //       {
              //         name: "frameRoughness",
              //         type: "number",
              //         label: "Frame Roughness",
              //         min: 0,
              //         max: 1,
              //         defaultValue: 0.2,
              //       },
              //       {
              //         name: "glassOpacity",
              //         type: "number",
              //         label: "Glass Opacity",
              //         min: 0,
              //         max: 1,
              //         defaultValue: 0.9,
              //       },
              //       {
              //         name: "glassRoughness",
              //         type: "number",
              //         label: "Glass Roughness",
              //         min: 0,
              //         max: 1,
              //         defaultValue: 0.1,
              //       },
              //     ],
              //   },
            ],
          },
        ],
      },
    ],
  };
};
