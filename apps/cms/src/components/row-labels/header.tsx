"use client";

import React from "react";
import { type RowLabelProps, useRowLabel } from "@payloadcms/ui";
import { MenuItems, MegaMenuItems, LinkItems } from "@synoem/types";
import { IconPreview } from "../icon";

export const MenuItemLabel: React.FC<RowLabelProps> = () => {
  const { data } = useRowLabel<NonNullable<NonNullable<MenuItems>[number]>>();

  if (!data) return <div>New Menu Item</div>;

  const { text, type } = data;
  const hasDropdown = type === "mega";

  return (
    <div className="flex items-center gap-2">
      <span className="px-2 py-1 rounded-md text-md bg-primary text-primary-foreground">
        {hasDropdown ? "Mega Menu" : "Menu Link"}
      </span>
      <span>{text || "Untitled"}</span>
    </div>
  );
};

export const MenuSectionLabel: React.FC<RowLabelProps> = () => {
  const { data } = useRowLabel<NonNullable<NonNullable<MegaMenuItems>[number]>>();

  if (!data) return <div>New Mega Menu Section</div>;

  const { type, linksSection, banner } = data;

  if (type === "banner" && banner) {
    const hasMedia = Boolean(banner.media);
    return (
      <div className="flex items-center gap-2">
        <span className="px-2 py-1 rounded-md bg-primary text-primary-foreground">Banner</span>
        <span>{banner.title || "Untitled Banner"}</span>
        {hasMedia && <span className="text-sm px-2 py-1 rounded-md">with media</span>}
      </div>
    );
  }

  return (
    <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
      <span className="px-2 py-1 rounded-md bg-primary text-primary-foreground">Links</span>
      <span>{linksSection?.title || "Untitled Section"}</span>
      {linksSection?.items && (
        <span className="text-xs px-2 py-1 rounded-md">{linksSection.items.length} items</span>
      )}
    </div>
  );
};

export const LinkItemLabel: React.FC<RowLabelProps> = () => {
  const { data } = useRowLabel<NonNullable<NonNullable<LinkItems>[number]>>();

  if (!data) return <div>New Link Item</div>;

  const { title, description, icon } = data;
  const hasIcon = Boolean(icon);

  return (
    <div className="flex items-center gap-2">
      <span>{title || "Untitled Link"}</span>
      {(description || hasIcon) && (
        <span className="text-xs px-2 py-1 rounded-md">
          {hasIcon && <IconPreview name={icon!} />}
          {description && <span>{description}</span>}
        </span>
      )}
    </div>
  );
};
