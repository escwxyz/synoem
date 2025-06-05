"use client";

import { FileField, InputField, QuantityField, SelectField } from "./fields";
import {
  COUNTRIES_REGIONS,
  INQUIRY_FREQUENCIES,
  INQUIRY_TIMELINES,
  quantityUnits,
} from "@synoem/config";
import { useTranslations } from "next-intl";

export const ProductInquiryForm = () => {
  const t = useTranslations("InquiryFormFields");

  return (
    <div className="space-y-4">
      <h3 className="text-lg font-semibold">Product Information</h3>
      <InputField name="productTypeId" label={t("productType.label")} />
      <div className="grid grid-cols-2 gap-4">
        <InputField name="productName" label={t("productName.label")} />
        <InputField name="sku" label={t("sku.label")} />
      </div>

      <div className="grid grid-cols-2 gap-4">
        <SelectField
          name="frequency"
          label={t("frequency.label")}
          options={INQUIRY_FREQUENCIES.map(({ label: _, value }) => ({
            label: t(`frequency.options.${value}`),
            value,
          }))}
        />
        <SelectField
          name="destination"
          label={t("destination.label")}
          options={COUNTRIES_REGIONS} // TODO: Too many options, need to be filtered / searchable
        />
      </div>
      <div className="grid grid-cols-2 gap-4">
        <SelectField
          name="timeline"
          label={t("timeline.label")}
          options={INQUIRY_TIMELINES.map(({ label: _, value }) => ({
            label: t(`timeline.options.${value}`),
            value,
          }))}
        />
        <QuantityField
          label={t("quantity.label")}
          name="quantity"
          minQuantity={1}
          maxQuantity={100}
          unitName="quantityUnit"
          units={quantityUnits.map(({ label: _, value }) => ({
            label: t(`quantity.unit.${value}`),
            value,
          }))}
        />
      </div>

      <FileField name="attachments" label={t("attachments.label")} />
    </div>
  );
};
