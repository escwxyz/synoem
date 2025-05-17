"use client";

import type { Footer } from "@synoem/payload/payload-types";
// biome-ignore lint/style/useImportType: <explanation>
import React from "react";
import { type RowLabelProps, useRowLabel } from "@payloadcms/ui";

export const FooterBottomLinkRowLabel: React.FC<RowLabelProps> = () => {
  const data = useRowLabel<{ link?: { label?: string } }>();

  const label = data?.data?.link
    ? `Bottom link ${data.rowNumber !== undefined ? data.rowNumber + 1 : ""}: ${data?.data?.link?.label}`
    : "Link";

  return <div>{label}</div>;
};

export const FooterLinkGroupLabel: React.FC<RowLabelProps> = () => {
  const data = useRowLabel<{ link?: { label?: string } }>();

  const label = data?.data?.link?.label
    ? `Link ${data.rowNumber !== undefined ? data.rowNumber + 1 : ""}: ${data?.data?.link?.label}`
    : "Link";

  return <div>{label}</div>;
};

export const FooterColumnLabel: React.FC = () => {
  const { data, rowNumber } = useRowLabel<NonNullable<Footer["columns"]>[number]>();

  let titleText = "";
  const columnNumber = rowNumber !== undefined ? rowNumber + 1 : "";

  if (data?.blockType === "linkGroup") {
    titleText = data.linkGroup?.title || "Link Group";
    return (
      <div>
        Column {columnNumber}: {titleText} (Link Group)
      </div>
    );
  }

  if (data?.blockType === "content") {
    titleText = data.content?.title || "Custom Content";
    return (
      <div>
        Column {columnNumber}: {titleText} (Content)
      </div>
    );
  }

  if (data?.blockType === "contactInfo") {
    return <div>Column {columnNumber}: Contact Information</div>;
  }

  return <div>Column {columnNumber}</div>;
};
