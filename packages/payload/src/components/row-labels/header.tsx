"use client";

// biome-ignore lint/style/useImportType: <explanation>
import React from "react";
import { type RowLabelProps, useRowLabel } from "@payloadcms/ui";

export const MenuItemLabel: React.FC<RowLabelProps> = () => {
  const { data } = useRowLabel<{
    text?: string;
    // biome-ignore lint/suspicious/noExplicitAny: <explanation>
    sections?: any[];
  }>();

  if (!data) return <div>New Menu Item</div>;

  const { text, sections } = data;
  const hasDropdown = sections && sections.length > 0;

  return (
    <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
      <span
        style={{
          padding: "2px 6px",
          backgroundColor: hasDropdown ? "#4338ca" : "#030303",
          color: "#ffffff",
          borderRadius: "4px",
          fontSize: "12px",
        }}
      >
        {hasDropdown ? "Dropdown" : "Link"}
      </span>
      <span>{text || "Untitled"}</span>
    </div>
  );
};

export const MenuSectionLabel: React.FC<RowLabelProps> = () => {
  const { data } = useRowLabel<{
    type: "links" | "banner";
    linksSection?: {
      title?: string;
      // biome-ignore lint/suspicious/noExplicitAny: <explanation>
      items?: any[];
    };
    banner?: {
      title?: string;
      // biome-ignore lint/suspicious/noExplicitAny: <explanation>
      media?: any;
    };
  }>();

  if (!data) return <div>New Section</div>;

  const { type, linksSection, banner } = data;

  const badgeStyle = {
    padding: "2px 6px",
    color: "#fff",
    borderRadius: "4px",
    fontSize: "12px",
  };

  if (type === "banner" && banner) {
    const hasMedia = Boolean(banner.media);
    return (
      <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
        <span
          style={{
            ...badgeStyle,
            backgroundColor: "#4338ca",
          }}
        >
          Banner
        </span>
        <span>{banner.title || "Untitled Banner"}</span>
        {hasMedia && (
          <span
            style={{
              fontSize: "12px",
              color: "#666",
              backgroundColor: "#f5f5f5",
              padding: "2px 6px",
              borderRadius: "4px",
            }}
          >
            with media
          </span>
        )}
      </div>
    );
  }

  return (
    <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
      <span
        style={{
          ...badgeStyle,
          backgroundColor: "#030303",
        }}
      >
        Links
      </span>
      <span>{linksSection?.title || "Untitled Section"}</span>
      {linksSection?.items && (
        <span
          style={{
            fontSize: "12px",
            color: "#666",
            backgroundColor: "#f5f5f5",
            padding: "2px 6px",
            borderRadius: "4px",
          }}
        >
          {linksSection.items.length} items
        </span>
      )}
    </div>
  );
};

export const LinkItemLabel: React.FC<RowLabelProps> = () => {
  const { data } = useRowLabel<{
    title?: string;
    desc?: string;
    // biome-ignore lint/suspicious/noExplicitAny: <explanation>
    icon?: any;
    // biome-ignore lint/suspicious/noExplicitAny: <explanation>
    iconGradient?: any;
  }>();

  if (!data) return <div>New Link Item</div>;

  const { title, desc, icon, iconGradient } = data;
  const hasIcon = Boolean(icon || iconGradient);

  return (
    <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
      <span>{title || "Untitled Link"}</span>
      {(desc || hasIcon) && (
        <span
          style={{
            fontSize: "12px",
            color: "#666",
            backgroundColor: "#f5f5f5",
            padding: "2px 6px",
            borderRadius: "4px",
          }}
        >
          with{" "}
          {[desc && "description", hasIcon && "icon"]
            .filter(Boolean)
            .join(" & ")}
        </span>
      )}
    </div>
  );
};
