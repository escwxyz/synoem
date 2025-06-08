"use client";

import { useEffect, useState } from "react";
import { useLocale } from "next-intl";
import { Input } from "@synoem/ui/components/input";
import { Button } from "@synoem/ui/components/button";
import { Minus, Plus } from "lucide-react";

interface LocalizedNumberInputProps {
  value: number;
  onChange: (value: number) => void;
  placeholder?: string;
  min: number;
  max: number;
  step: number;
  className?: string;
  decimalPlaces?: number;
}

export const LocalizedNumberInput = ({
  value,
  onChange,
  placeholder,
  min,
  max,
  step,
  className,
  decimalPlaces = 1,
}: LocalizedNumberInputProps) => {
  const locale = useLocale();

  const [inputValue, setInputValue] = useState<string>(
    value.toLocaleString(locale, {
      maximumFractionDigits: decimalPlaces,
      minimumFractionDigits: decimalPlaces,
    }),
  );

  useEffect(() => {
    setInputValue(
      value.toLocaleString(locale, {
        maximumFractionDigits: decimalPlaces,
        minimumFractionDigits: decimalPlaces,
      }),
    );
  }, [value, locale, decimalPlaces]);

  const parseValue = (str: string, locale: string) => {
    const formatter = new Intl.NumberFormat(locale);
    const parts = formatter.formatToParts(1.1);
    const decimalSeparator = parts.find((part) => part.type === "decimal")?.value || ".";
    const normalized = str.replace(decimalSeparator, ".");
    const num = Number.parseFloat(normalized);
    return Number.isNaN(num) ? min : num;
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
    const num = parseValue(e.target.value, locale);
    if (!Number.isNaN(num)) onChange(num);
  };

  const handleIncrement = () => {
    let num = parseValue(inputValue, locale) + step;
    if (num > max) num = max;
    setInputValue(
      num.toLocaleString(locale, {
        maximumFractionDigits: decimalPlaces,
        minimumFractionDigits: decimalPlaces,
      }),
    );
    onChange(num);
  };

  const handleDecrement = () => {
    let num = parseValue(inputValue, locale) - step;
    if (num < min) num = min;
    setInputValue(
      num.toLocaleString(locale, {
        maximumFractionDigits: decimalPlaces,
        minimumFractionDigits: decimalPlaces,
      }),
    );
    onChange(num);
  };

  return (
    <div className="flex items-center gap-2">
      <Button type="button" onClick={handleDecrement} variant="ghost" size="icon">
        <Minus />
      </Button>
      <Input
        type="text"
        value={inputValue}
        onChange={handleInputChange}
        placeholder={placeholder}
        className={className}
        role="spinbutton"
        aria-valuenow={value}
        aria-valuemin={min}
        aria-valuemax={max}
        aria-label={placeholder || "Numeric input"}
      />

      <Button type="button" onClick={handleIncrement} variant="ghost" size="icon">
        <Plus />
      </Button>
    </div>
  );
};
