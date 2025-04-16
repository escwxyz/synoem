import type { ArrayField } from "payload";
import { createDurationGroup, createQuantityGroup } from "./unit";
import { validateRange } from "../validation/validate-range";

export const createLeadTimeField = (): ArrayField => ({
  name: "leadTime",
  type: "array",
  label: "Lead Time",
  admin: {
    description: "Specify lead times for different quantity ranges",
  },
  fields: [
    {
      type: "group",
      name: "range",
      label: "Quantity Range",
      validate: validateRange,
      fields: [
        createQuantityGroup("min", "Minimum Quantity", {
          admin: {
            description:
              "Lower bound of the range. Leave empty for no lower limit.",
          },
        }),
        createQuantityGroup("max", "Maximum Quantity", {
          admin: {
            description:
              "Upper bound of the range. Leave empty for no upper limit.",
          },
        }),
        createDurationGroup("duration", "Duration"),
      ],
    },
  ],
});
