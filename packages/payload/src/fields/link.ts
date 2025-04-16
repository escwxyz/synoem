import type { Field, GroupField } from "payload";
import { deepMerge } from "payload";
import { validateUrl } from "../validation/validate-url";

export type LinkAppearances = "default" | "outline";

export const appearanceOptions: Record<
  LinkAppearances,
  { label: string; value: string }
> = {
  default: {
    label: "Default",
    value: "default",
  },
  outline: {
    label: "Outline",
    value: "outline",
  },
};

type LinkType = (options?: {
  appearances?: LinkAppearances[] | false;
  disableLabel?: boolean;
  localizedLabel?: boolean;
  overrides?: Partial<GroupField>;
  required?: boolean;
}) => Field;

export const link: LinkType = ({
  appearances,
  disableLabel = false,
  localizedLabel = false,
  overrides = {},
  required = false,
} = {}) => {
  const linkResult: Field = {
    name: "link",
    type: "group",
    admin: {
      hideGutter: true,
    },
    fields: [
      {
        name: "type",
        type: "radio",
        defaultValue: "internal",
        options: [
          {
            label: "Internal link",
            value: "internal",
          },
          {
            label: "External URL",
            value: "external",
          },
        ],
      },
    ],
  };

  const linkTypes: Field[] = [
    {
      name: "internal",
      type: "relationship",
      label: "Document to link to",
      relationTo: ["pages", "solar-panels", "pump-controllers", "industries"], // TODO: add other collections
      required,
      admin: {
        condition: (_, siblingData) => siblingData?.type === "internal",
        width: "50%",
      },
    },
    {
      name: "url",
      type: "text",
      label: "External URL",
      required,
      admin: {
        condition: (_, siblingData) => siblingData?.type === "external",
        width: "50%",
        description: "External URL will be opened in a new tab.",
      },
      validate: validateUrl,
    },
  ];

  if (!disableLabel) {
    linkTypes.map((linkType) => ({
      ...linkType,
      admin: {
        ...linkType.admin,
        width: "50%",
      },
    }));

    linkResult.fields.push({
      type: "row",
      fields: [
        ...linkTypes,
        {
          name: "label",
          type: "text",
          admin: {
            width: "50%",
          },
          label: "Label",
          required,
          localized: localizedLabel,
        },
      ],
    });
  } else {
    linkResult.fields = [...linkResult.fields, ...linkTypes];
  }

  if (appearances !== false) {
    let appearanceOptionsToUse = [
      appearanceOptions.default,
      appearanceOptions.outline,
    ];

    if (appearances) {
      appearanceOptionsToUse = appearances.map(
        (appearance) => appearanceOptions[appearance],
      );
    }

    linkResult.fields.push({
      name: "appearance",
      type: "select",
      admin: {
        description: "Choose how the link should be rendered.",
      },
      defaultValue: "default",
      options: appearanceOptionsToUse,
    });
  }

  return deepMerge(linkResult, overrides);
};
