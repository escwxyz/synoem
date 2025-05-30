"use client";

import React, { useState } from "react";
import { Button, toast, useAllFormFields, useFormFields } from "@payloadcms/ui";
import { reduceFieldsToValues } from "payload/shared";
import type { SolarPanelPowerPoints } from "@synoem/types";

export const GeneratePowerPointsButton = () => {
  const [fields] = useAllFormFields();

  const [status, setStatus] = useState<"generating" | "clearing" | "idle">("idle");

  const fieldDispatch = useFormFields(([, dispatch]) => dispatch);

  const formData = reduceFieldsToValues(fields, true);

  const data = formData;

  const min = data?.power?.min;
  const max = data?.power?.max;
  const step = data?.power?.step;
  const dimensions = data?.dimensions;

  const points = data?.power.points as SolarPanelPowerPoints;

  const hasPrevData = Array.isArray(points) && points.length > 0;

  const generatePoints = () => {
    if (!dimensions || !dimensions.unit || !dimensions.h || !dimensions.w) {
      toast.error("Dimensions data is incomplete");
      return;
    }

    if (!min || !max || !step) {
      toast.error("Power range data is incomplete");
      return;
    }

    setStatus("generating");

    try {
      const newPoints: SolarPanelPowerPoints = [];
      for (let power = min; power <= max; power += step) {
        const area = getArea(dimensions.unit, dimensions.h, dimensions.w);
        const efficiency = calculateEfficiency(power, area);

        newPoints.push({
          pmax: power,
          efficiency: efficiency,
          vmp: 0,
          imp: 0,
          voc: 0,
          isc: 0,
        });
      }

      newPoints.forEach((point, index) => {
        fieldDispatch({
          type: "ADD_ROW",
          path: "power.points",
          rowIndex: index,
        });

        fieldDispatch({
          type: "UPDATE",
          path: `power.points.${index}.pmax`,
          value: point.pmax,
        });

        fieldDispatch({
          type: "UPDATE",
          path: `power.points.${index}.efficiency`,
          value: point.efficiency,
        });

        for (const v of [
          { path: `power.points.${index}.vmp`, value: point.vmp },
          { path: `power.points.${index}.imp`, value: point.imp },
          { path: `power.points.${index}.voc`, value: point.voc },
          { path: `power.points.${index}.isc`, value: point.isc },
        ]) {
          fieldDispatch({
            type: "UPDATE",
            path: v.path,
            value: v.value,
          });
        }
      });
    } catch (error) {
      console.error("Error generating points:", error);
      toast.error("Failed to generate power points");
    } finally {
      setStatus("idle");
      toast.success("Power points generated");
    }
  };

  const clearPoints = () => {
    if (!Array.isArray(points) || points.length === 0) {
      return;
    }

    setStatus("clearing");

    try {
      for (let i = points.length - 1; i >= 0; i--) {
        fieldDispatch({
          type: "REMOVE_ROW",
          path: "power.points",
          rowIndex: i,
        });
      }
    } catch (error) {
      console.error("Error clearing points:", error);
      toast.error("Failed to clear power points");
    } finally {
      setStatus("idle");
      toast.success("Power points cleared");
    }
  };

  const disabled = !min || !max || !step || !dimensions?.w || !dimensions?.h || !dimensions?.unit;

  const disableGenerate =
    status === "generating" || status === "clearing" || disabled || hasPrevData;

  const disableClear = status === "clearing" || disabled || !hasPrevData;

  return (
    <div className="flex justify-between p-4">
      <Button onClick={generatePoints} buttonStyle="primary" disabled={disableGenerate}>
        {status === "generating" ? "Generating..." : "Generate Power Points"}
      </Button>
      <Button onClick={clearPoints} buttonStyle="secondary" disabled={disableClear}>
        {status === "clearing" ? "Clearing..." : "Clear Power Points"}
      </Button>
    </div>
  );
};

const calculateEfficiency = (power: number, area: number) => {
  const efficiency = (power / (area * 1000)) * 100;
  return Number(efficiency.toFixed(1));
};

const getArea = (unit: string, h: number, w: number) => {
  switch (unit) {
    case "m":
      return h * w;
    case "cm":
      return (h / 100) * (w / 100);
    default:
      return (h / 1000) * (w / 1000);
  }
};
