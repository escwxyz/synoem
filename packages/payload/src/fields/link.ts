import type {
  Field,
  GroupField,
  RelationshipFieldManyValidation,
  RelationshipFieldValidation,
} from "payload";
import { deepMerge } from "payload";
import { validateExternalLink, validateRelativeLink } from "../validation/validate-url";

export type LinkAppearances = "default" | "outline";

export const appearanceOptions: Record<LinkAppearances, { label: string; value: string }> = {
  default: {
    label: "Default",
    value: "default",
  },
  outline: {
    label: "Outline",
    value: "outline",
  },
};

interface LinkProps {
  appearances?: LinkAppearances[] | false;
  disableLabel?: boolean;
  localizedLabel?: boolean;
  overrides?: Partial<GroupField>;
  required?: boolean;
}

export const link = ({
  appearances,
  disableLabel = false,
  localizedLabel = false,
  overrides = {},
  required = false,
}: LinkProps) => {
  const linkResult: GroupField = {
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
            label: "External link",
            value: "external",
          },
          {
            label: "Relative link",
            value: "relative",
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
      relationTo: ["pages", "products", "industries"], // TODO: add other collections
      admin: {
        condition: (_, siblingData) => siblingData?.type === "internal",
        width: "100%",
      },
      validate: requireInternalLink,
    },
    {
      name: "relative",
      type: "text",
      label: "Relative URL",
      admin: {
        condition: (_, siblingData) => siblingData?.type === "relative",
        width: "100%",
      },
      validate: validateRelativeLink,
    },
    {
      name: "external",
      type: "text",
      label: "External URL",
      admin: {
        condition: (_, siblingData) => siblingData?.type === "external",
        width: "100%",
      },
      validate: validateExternalLink,
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
    let appearanceOptionsToUse = [appearanceOptions.default, appearanceOptions.outline];

    if (appearances) {
      appearanceOptionsToUse = appearances.map((appearance) => appearanceOptions[appearance]);
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

const requireInternalLink: RelationshipFieldValidation = (value, { siblingData }) => {
  if (!value) {
    // @ts-expect-error
    if (siblingData?.type === "internal") {
      return "Internal link is required";
    }
  }

  return true;
};
