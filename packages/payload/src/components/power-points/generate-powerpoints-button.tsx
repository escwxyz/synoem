"use client";

import React, { useState } from "react";
import { Button, useAllFormFields } from "@payloadcms/ui";
import { reduceFieldsToValues } from "payload/shared";

export const GeneratePowerPointsButton = () => {
  const [fields, dispatchFields] = useAllFormFields();
  const [isGenerating, setIsGenerating] = useState(false);

  const formData = reduceFieldsToValues(fields, true);

  const min = formData?.powerRange?.min;
  const max = formData?.powerRange?.max;
  const step = formData?.powerRange?.step;
  const dimensions = formData?.dimensions;

  const hasPrevData = formData?.powerRange?.points?.length > 0;

  const generatePoints = async () => {
    if (!dimensions || !dimensions.unit || !dimensions.h || !dimensions.w) {
      console.error("Dimensions data is incomplete:", dimensions);
      return;
    }

    if (!min || !max || !step) {
      console.error("Power range data is incomplete:", { min, max, step });
      return;
    }

    setIsGenerating(true);

    try {
      const newPoints = [];
      for (let power = min; power <= max; power += step) {
        const area = getArea(dimensions.unit, dimensions.h, dimensions.w);
        const efficiency = calculateEfficiency(power, area);

        newPoints.push({
          pmax: power,
          efficiency: efficiency,
        });
      }

      newPoints.map(async (point, index) => {
        dispatchFields({
          type: "ADD_ROW",
          path: "powerRange.points",
          rowIndex: index,
          subFieldState: {
            pmax: {
              value: point.pmax,
            },
            efficiency: {
              value: point.efficiency,
            },
          },
        });
      });
    } catch (error) {
      console.error("Error generating points:", error);
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <div className="p-2">
      <Button
        onClick={generatePoints}
        buttonStyle="secondary"
        disabled={
          isGenerating ||
          !min ||
          !max ||
          !step ||
          !dimensions?.w ||
          !dimensions?.h ||
          !dimensions?.unit ||
          hasPrevData
        }
      >
        {isGenerating ? "Generating..." : "Generate Power Points"}
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
