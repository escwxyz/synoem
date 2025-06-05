"use client";

import { COUNTRIES_REGIONS, CUSTOMER_TYPES, INQUIRY_EMPLOYEES } from "@synoem/config";
import { InputField, SelectField } from "./fields";
import { useTranslations } from "next-intl";

export const CompanyInquiryForm = () => {
  const t = useTranslations("InquiryFormFields");

  return (
    <div className="space-y-4">
      <h3 className="text-lg font-semibold">{t("companyInformation.title")}</h3>
      <InputField name="company" label={t("company.label")} />
      <InputField name="website" label={t("website.label")} />
      <InputField name="position" label={t("position.label")} />
      <div className="grid grid-cols-3 gap-4">
        <SelectField
          name="type"
          label={t("type.label")}
          options={Object.values(CUSTOMER_TYPES).map((type) => ({
            label: t(`type.options.${type.value}`),
            value: type.value,
          }))}
        />
        <SelectField
          name="country"
          label={t("country.label")}
          options={Object.values(COUNTRIES_REGIONS).map((country) => ({
            label: country.label,
            value: country.value,
          }))}
        />
      </div>
      <SelectField
        name="employees"
        label={t("employees.label")}
        options={Object.values(INQUIRY_EMPLOYEES).map((employee) => ({
          label: employee.label,
          value: employee.value,
        }))}
      />
    </div>
  );
};
