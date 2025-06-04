"use client";

import { Button } from "@synoem/ui/components/button";
import { FormControl, FormField } from "@synoem/ui/components/form";
import { Label } from "@synoem/ui/components/label";
import { Input } from "@synoem/ui/components/input";
import { Minus, Plus } from "lucide-react";
import { useFormContext } from "react-hook-form";
import { SelectField } from "./select";

interface QuantityFieldProps {
  label: string;
  name: string;
  minQuantity: number;
  maxQuantity: number;
  unitName: string;
  units: {
    label: string;
    value: string;
  }[];
}

export const QuantityField = ({
  label,
  name,
  minQuantity,
  maxQuantity,
  unitName,
  units,
}: QuantityFieldProps) => {
  const { control } = useFormContext();

  return (
    <div className="space-y-2">
      {label && <Label htmlFor={name.toString()}>{label}</Label>}
      <div className="flex items-center space-x-3">
        <FormField
          control={control}
          name={name}
          render={({ field }) => {
            const quantity = Number(field.value) || minQuantity;

            const decrementQuantity = () => {
              if (quantity > minQuantity) {
                field.onChange(quantity - 1);
              }
            };

            const incrementQuantity = () => {
              if (quantity < maxQuantity) {
                field.onChange(quantity + 1);
              }
            };

            const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
              const newValue = Number.parseInt(e.target.value);
              if (Number.isNaN(newValue)) {
                field.onChange(minQuantity);
                return;
              }

              const clampedValue = Math.min(Math.max(newValue, minQuantity), maxQuantity);
              field.onChange(clampedValue);
            };

            return (
              <FormControl>
                <div className="flex h-10 items-center rounded-md border border-input">
                  <Button
                    type="button"
                    variant="ghost"
                    size="icon"
                    className="h-full rounded-r-none border-r"
                    onClick={decrementQuantity}
                    disabled={quantity <= minQuantity}
                    aria-label="Decrease quantity"
                  >
                    <Minus className="h-4 w-4" />
                  </Button>
                  <Input
                    id={name.toString()}
                    type="number"
                    min={minQuantity}
                    max={maxQuantity}
                    className="h-full w-12 border-0 rounded-none text-center [appearance:textfield] [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none focus-visible:outline-none focus-visible:ring-0"
                    value={quantity}
                    onChange={handleInputChange}
                    onBlur={field.onBlur}
                    name={field.name}
                    ref={field.ref}
                    aria-label="Quantity"
                  />
                  <Button
                    type="button"
                    variant="ghost"
                    size="icon"
                    className="h-full rounded-l-none border-l"
                    onClick={incrementQuantity}
                    disabled={quantity >= maxQuantity}
                    aria-label="Increase quantity"
                  >
                    <Plus className="h-4 w-4" />
                  </Button>
                </div>
              </FormControl>
            );
          }}
        />
        <SelectField name={unitName} options={units} className="h-10 gap-0" />

        {/* <FormField
          control={control}
          name={unitName}
          render={({ field }) => (
            <FormControl>
              <Select
                value={field.value}
                onValueChange={field.onChange}
                // onBlur={field.onBlur}
                name={field.name}
                // ref={field.ref}
              >
                <SelectTrigger className="w-[130px]">
                  <SelectValue placeholder="Select unit" />
                </SelectTrigger>
                <SelectContent>
                  {units?.map((unit) => (
                    <SelectItem key={unit.value} value={unit.value}>
                      {unit.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </FormControl>
          )}
        /> */}
      </div>
    </div>
  );
};
