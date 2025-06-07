import type { SelectField } from "payload";
import iconNodes from "lucide-static/icon-nodes.json";

export type IconOption = {
  value: string;
  label: string;
};

export type IconField = (overrides?: Partial<SelectField>) => SelectField;

const iconField: IconField = (overrides = {}) => {
  const baseField = {
    name: "icon",
    label: "Icon",
    type: "select",
    interfaceName: "LucideIcon",
    // TODO: exclude type generation for this field using a custom typescript schema
    // plus https://gist.github.com/elliott-w/27fee9b6c31025da5876b6b2953b0139 to avoid relationship population
    required: false,
    hasMany: false,
    options: Object.keys(iconNodes).map((slug) => {
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
        value: slug,
        label,
      };
    }),
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
