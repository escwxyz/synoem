import type { TextareaField } from "payload";

type DescriptionOptions = {
  name?: string;
  label?: string;
  required?: boolean;
  localized?: boolean;
  admin?: {
    placeholder?: string;
    description?: string;
    rows?: number;
  };
};

export const createDescriptionField = (
  options: DescriptionOptions = {},
): TextareaField => ({
  type: "textarea",
  name: options.name || "desc",
  label: options.label || "Description",
  required: options.required ?? true,
  localized: options.localized ?? true,
  admin: {
    placeholder: options.admin?.placeholder || "Enter description...",
    description: options.admin?.description,
    rows: options.admin?.rows || 6,
  },
  validate: (value) => {
    if (!value) return true;
    if (value.length < 10) return "Description must be at least 10 characters";
    if (value.length > 500)
      return "Description must be less than 500 characters";
    return true;
  },
});

export const desc = createDescriptionField();
