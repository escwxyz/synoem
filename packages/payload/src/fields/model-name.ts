import type { Field } from "payload";

type ModelNameOptions = {
  required?: boolean;
  unique?: boolean;
  validate?: (value: string | string[] | undefined | null) => string | true;
  admin?: {
    description?: string;
    placeholder?: string;
  };
};

export const createModelNameField = (
  options: ModelNameOptions = {},
): Field => ({
  name: "modelName",
  type: "text",
  label: "Model Name",
  required: options.required ?? true,
  unique: options.unique ?? true,
  admin: {
    description:
      options.admin?.description || "The model name or number of the product.",
    placeholder: options.admin?.placeholder || "e.g., ABC-123",
  },
  validate: (value: string | string[] | undefined | null) => {
    if (!value) return true;

    if (value.length < 3) return "Model name must be at least 3 characters";
    if (value.length > 50) return "Model name must be less than 50 characters";

    if (options.validate) {
      return options.validate(value);
    }

    return true;
  },
});

export const modelName = createModelNameField();
