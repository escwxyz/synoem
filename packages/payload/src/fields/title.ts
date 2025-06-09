import type { Field } from "payload";

type TitleFieldOptions = {
  name?: string;
  label?: string;
  required?: boolean;
  localized?: boolean;
  admin?: {
    placeholder?: string;
    description?: string;
  };
};

export const createTitleField = (options: TitleFieldOptions = {}): Field => ({
  type: "text",
  name: options.name || "title",
  label: options.label || "Title",
  required: options.required ?? true,
  localized: options.localized ?? true,
  admin: {
    placeholder: options.admin?.placeholder || "Enter title...",
    description: options.admin?.description,
  },
  validate: (value: string | string[] | undefined | null) => {
    if (!value) return true;

    if (value?.length < 2) {
      return "Title must be at least 2 characters long";
    }
    if (value?.length > 100) {
      return "Title must be less than 100 characters long";
    }

    return true;
  },
});

export const title = createTitleField();
