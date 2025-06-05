"use client";

import { useField, TextInput, useDebouncedEffect } from "@payloadcms/ui";
import React, { useEffect, useState } from "react";

const ColorPicker = ({
  field: { label, required = false },
  path,
}: {
  field: { label: string; required?: boolean };
  path: string;
}) => {
  const { value, setValue } = useField<string>({ path });

  const safeValue = typeof value === "string" && value ? value : "#000000";

  const [localValue, setLocalValue] = useState<string>(
    typeof value === "string" && value ? value : "#000000",
  );

  useEffect(() => {
    if (typeof value === "string" && value !== localValue) {
      setLocalValue(value);
    }
  }, [value]);

  useDebouncedEffect(
    () => {
      if (localValue !== value) {
        setValue(safeValue);
      }
    },
    [localValue],
    1500,
  );

  return (
    <div>
      <label className="field-label">
        {label} {required && <span className="required">*</span>}
      </label>
      <div className="my-2 flex gap-4 items-center justify-between">
        <input
          type="color"
          className="w-[40px] h-[40px] border-none p-0 bg-transparent rounded-lg cursor-pointer appearance-none"
          value={localValue}
          onChange={(e) => setLocalValue(e.target.value)}
        />
        <TextInput
          label=""
          path={path}
          className="w-full"
          onChange={(e: { target: { value: string } }) => setLocalValue(e.target.value)}
          value={localValue}
          readOnly
        />
      </div>
    </div>
  );
};

export default ColorPicker;
