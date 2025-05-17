"use client";

import { type RowLabelProps, useRowLabel } from "@payloadcms/ui";
import React from "react";
import type { FC } from "react";

type PowerPoint = {
  pmax: number;
  efficiency: number;
  vmp?: number;
  imp?: number;
  isc?: number;
  voc?: number;
};

export const PowerPointLabel: FC<RowLabelProps> = () => {
  const { data, rowNumber } = useRowLabel<PowerPoint>();

  if (!data) {
    return <span>Power Point {rowNumber || ""}</span>;
  }

  const pmax = typeof data.pmax === "number" ? data.pmax : null;
  const efficiency =
    typeof data.efficiency === "number" ? data.efficiency : null;

  if (pmax === null || efficiency === null) {
    return <span>Power Point {rowNumber || ""}</span>;
  }

  return (
    <div
      style={{
        display: "flex",
        gap: "1rem",
        alignItems: "center",
      }}
    >
      <strong
        style={{
          minWidth: "50px",
          color: "#efefef",
        }}
      >
        {pmax}W
      </strong>
      <span
        style={{
          color: "#666",
          fontSize: "0.9em",
        }}
      >
        Efficiency: {efficiency}%
      </span>
    </div>
  );
};
