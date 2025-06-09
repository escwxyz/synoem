import type { SelectField } from "payload";
import iconNodes from "lucide-static/icon-nodes.json";

export type IconOption = {
  value: string;
  label: string;
};

export type IconField = (overrides?: Partial<SelectField>) => SelectField;

const iconField: IconField = (overrides = {}) => {
  const lucideIconOptions = Object.keys(iconNodes).map((slug) => {
    const label = slug
      .split("-")
      .map((segment) => {
        if (/^\d+$/.test(segment)) return segment;

        return segment
          .replace(/^[a-z]/, (c) => c.toUpperCase())
          .replace(/(\d)([a-z])/g, (_, d, l) => d + l.toUpperCase());
      })
      .join(" ");

    return {
      value: `lucide:${slug}`,
      label: `${label} (Lucide)`,
    };
  });

  // Add more custom icons here
  const customIconOptions =
    process.env.S3_ENDPOINT && process.env.S3_BUCKET_NAME
      ? [
          {
            value: "custom:ce",
            label: "CE (Custom)",
          },
          {
            value: "custom:ul",
            label: "UL (Custom)",
          },
          {
            value: "custom:mcs",
            label: "MCS (Custom)",
          },
        ]
      : [];

  const baseField = {
    name: "icon",
    label: "Icon",
    type: "select",
    interfaceName: "IconName",
    // TODO: exclude type generation for this field using a custom typescript schema
    // plus https://gist.github.com/elliott-w/27fee9b6c31025da5876b6b2953b0139 to avoid relationship population
    required: false,
    hasMany: false,
    options: [...lucideIconOptions, ...customIconOptions],
    admin: {
      ...overrides.admin,
      components: {
        ...overrides.admin?.components,
        Field: {
          path: "@/components/icon#IconComponent",
        },
      },
    },
    ...overrides,
  } as SelectField;

  return baseField;
};

export { iconField };
