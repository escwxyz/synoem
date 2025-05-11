import type { Field } from "payload";

interface IconSelectFieldOptions {
  name?: string;
  label?: string;
  required?: boolean;
}

export const createIconSelectField = ({
  name = "iconName",
  label = "Icon",
  required = false,
}: IconSelectFieldOptions): Field => ({
  name,
  type: "text",
  label,
  required,
  admin: {
    components: {
      Field: "@synoem/payload/components/icon-select-field#IconSelectField",
    },
  },
});
