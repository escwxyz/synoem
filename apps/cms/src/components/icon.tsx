"use client";

import React, { type CSSProperties, useCallback, useMemo } from "react";
import { FieldLabel, ReactSelect, type ReactSelectOption, useField } from "@payloadcms/ui";
import type { SelectFieldClientComponent } from "payload";
import type { Option } from "@payloadcms/ui/elements/ReactSelect";
import { FixedSizeList as List, areEqual } from "react-window";

const ICON_BASE_URL = "https://cdn.jsdelivr.net/npm/lucide-static@0.508.0/icons/";

const IconPreview: React.FC<{ name: string }> = React.memo(({ name }) => (
  <img
    src={`${ICON_BASE_URL}${name}.svg`}
    alt={name}
    width={20}
    height={20}
    loading="lazy"
    className="w-4 h-4 mr-2 flex-shrink-0 dark:invert"
  />
));

IconPreview.displayName = "IconPreview";

const CustomOption: React.FC<ReactSelectOption> = ({ data, innerProps, isSelected }: any) => (
  <div
    {...innerProps}
    className={`cursor-pointer flex items-center p-2 hover:bg-accent-500 ${isSelected ? "bg-accent-500" : ""}`}
  >
    <IconPreview name={data.value} />
    {data.label}
  </div>
);

const SingleValue: React.FC<ReactSelectOption> = ({ data }: any) => (
  <div className="flex items-center absolute">
    <IconPreview name={data.value} />
    {data.label}
  </div>
);

const ITEM_HEIGHT = 36;

type RowProps = {
  index: number;
  style: React.CSSProperties;
  data: React.ReactNode[];
};

const Row = React.memo(({ index, style, data }: RowProps) => {
  const child = data[index];
  if (!child) return null;

  return (
    <div style={style} key={(child as React.ReactElement).key}>
      {child}
    </div>
  );
}, areEqual);

Row.displayName = "VirtualizedRow";

const VirtualMenuList: React.FC<any> = ({ children, maxHeight }) => {
  const items = React.Children.toArray(children);
  const itemCount = items.length;
  const listHeight = Math.min(maxHeight, itemCount * ITEM_HEIGHT);

  return (
    <List
      height={listHeight}
      itemCount={itemCount}
      itemSize={ITEM_HEIGHT}
      width="100%"
      itemData={items}
    >
      {Row}
    </List>
  );
};

const reactSelectComponents = {
  Option: CustomOption,
  SingleValue,
  MenuList: VirtualMenuList,
};

const IconComponent: SelectFieldClientComponent = ({ field, path }) => {
  const { label, admin, hasMany = false } = field;
  const { value, setValue } = useField({ path: path });
  const placeholder =
    typeof admin?.placeholder === "function"
      ? admin?.placeholder(field)
      : admin?.placeholder || "Search for icon...";
  const isClearable = admin?.isClearable === false ? undefined : true;
  const className = admin?.className;

  const options = useMemo(() => field.options as Option[], [field.options]);

  const currentOption = useMemo(() => {
    return options.find((option) => option.value === value) as Option | undefined;
  }, [options, value]);

  const handleChange = useCallback(
    (selected: Option | null) => {
      setValue(selected ? selected.value : null);
    },
    [setValue],
  );

  return (
    <div
      className="field-type select w-full"
      style={{ "--field-width": field?.admin?.width || undefined } as CSSProperties}
    >
      <div className="label-wrapper">
        <FieldLabel htmlFor={`field-${path}`} label={label} />
      </div>

      <ReactSelect
        value={currentOption}
        placeholder={placeholder}
        onChange={(opt) => handleChange(opt as Option | null)}
        isClearable={isClearable}
        options={options}
        components={reactSelectComponents}
        className={className}
        isCreatable={false}
        isMulti={hasMany}
      />
    </div>
  );
};

export { IconComponent };
