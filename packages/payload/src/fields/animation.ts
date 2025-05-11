import type { Field } from "payload";

export const animationTypes = {
  position: "position",
  rotation: "rotation",
  scale: "scale",
} as const;

export const easingTypes = {
  linear: "linear",
  easeIn: "easeIn",
  easeOut: "easeOut",
  easeInOut: "easeInOut",
  spring: "spring",
} as const;

export const triggerTypes = {
  scroll: "scroll",
  view: "view",
  time: "time",
} as const;

export const createAnimationField = (): Field => ({
  name: "animations",
  type: "array",
  fields: [
    {
      name: "type",
      type: "select",
      required: true,
      options: Object.entries(animationTypes).map(([label, value]) => ({
        label,
        value,
      })),
    },
    {
      name: "trigger",
      type: "select",
      required: true,
      options: Object.entries(triggerTypes).map(([label, value]) => ({
        label,
        value,
      })),
    },
    {
      name: "easing",
      type: "select",
      defaultValue: "easeInOut",
      options: Object.entries(easingTypes).map(([label, value]) => ({
        label,
        value,
      })),
    },
    {
      type: "row",
      fields: [
        {
          name: "duration",
          type: "number",
          defaultValue: 1,
          admin: {
            width: "50%",
            description: "Duration in seconds",
          },
        },
        {
          name: "delay",
          type: "number",
          defaultValue: 0,
          admin: {
            width: "50%",
            description: "Delay in seconds",
          },
        },
      ],
    },
    // 根据动画类型显示不同的值设置
    {
      type: "group",
      name: "posValues",
      admin: {
        condition: (data, siblingData) => siblingData?.type === "position",
      },
      fields: [
        {
          type: "row",
          fields: [
            {
              name: "from",
              type: "group",
              fields: [
                { name: "x", type: "number", defaultValue: 0 },
                { name: "y", type: "number", defaultValue: 0 },
                { name: "z", type: "number", defaultValue: 0 },
              ],
            },
            {
              name: "to",
              type: "group",
              fields: [
                { name: "x", type: "number", defaultValue: 0 },
                { name: "y", type: "number", defaultValue: 0 },
                { name: "z", type: "number", defaultValue: 0 },
              ],
            },
          ],
        },
      ],
    },
    {
      type: "group",
      name: "rotValues",
      admin: {
        condition: (data, siblingData) => siblingData?.type === "rotation",
      },
      fields: [
        {
          type: "row",
          fields: [
            {
              name: "from",
              type: "group",
              fields: [
                { name: "x", type: "number", defaultValue: 0 },
                { name: "y", type: "number", defaultValue: 0 },
                { name: "z", type: "number", defaultValue: 0 },
              ],
            },
            {
              name: "to",
              type: "group",
              fields: [
                { name: "x", type: "number", defaultValue: 0 },
                { name: "y", type: "number", defaultValue: 0 },
                { name: "z", type: "number", defaultValue: 0 },
              ],
            },
          ],
        },
      ],
    },
    {
      type: "group",
      name: "scaleValues",
      admin: {
        condition: (data, siblingData) => siblingData?.type === "scale",
      },
      fields: [
        {
          type: "row",
          fields: [
            {
              name: "from",
              type: "number",
              defaultValue: 1,
            },
            {
              name: "to",
              type: "number",
              defaultValue: 1,
            },
          ],
        },
      ],
    },
    // 滚动触发的特殊设置
    {
      type: "group",
      name: "scrollSettings",
      admin: {
        condition: (data, siblingData) => siblingData?.trigger === "scroll",
      },
      fields: [
        {
          name: "start",
          type: "text",
          defaultValue: "top center",
        },
        {
          name: "end",
          type: "text",
          defaultValue: "bottom center",
        },
        {
          name: "scrub",
          type: "checkbox",
          defaultValue: true,
        },
      ],
    },
  ],
});

export const animation = createAnimationField();
