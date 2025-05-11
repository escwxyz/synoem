import type { CheckboxField, TextField } from "payload";
import { formatSlug } from "../hooks";

type Overrides = {
  slugOverrides?: Partial<TextField>;
  checkboxOverrides?: Partial<CheckboxField>;
};

type Slug = (fieldToUse?: string, overrides?: Overrides) => [TextField, CheckboxField];

export const slug: Slug = (fieldToUse = "title", overrides = {}) => {
  const { slugOverrides, checkboxOverrides } = overrides;

  const checkBoxField: CheckboxField = {
    name: "slugLock",
    type: "checkbox",
    defaultValue: true,
    admin: {
      hidden: true,
      position: "sidebar",
    },
    ...checkboxOverrides,
  };

  // @ts-expect-error - ts mismatch Partial<TextField> with TextField
  const slugField: TextField = {
    name: "slug",
    type: "text",
    index: true,
    label: "Slug",
    localized: false,
    unique: true,
    required: slugOverrides?.required || true,
    ...(slugOverrides || {}),
    hooks: {
      beforeValidate: [formatSlug(fieldToUse)],
    },
    admin: {
      position: "sidebar",
      ...(slugOverrides?.admin || {}),
      components: {
        Field: {
          path: "@synoem/payload/components/slug-field#SlugComponent",
          clientProps: {
            fieldToUse,
            checkboxFieldPath: checkBoxField.name,
          },
        },
      },
    },
  };

  return [slugField, checkBoxField];
};
