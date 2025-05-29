"use client";

import type { FC, MouseEvent } from "react";
import React, { useCallback, useEffect } from "react";
import type { TextFieldClientProps } from "payload";

import {
  useField,
  Button,
  TextInput,
  FieldLabel,
  useFormFields,
  useForm,
  useLocale,
} from "@payloadcms/ui";

import { slugify } from "@synoem/utils";

type SlugComponentProps = {
  fieldToUse: string;
  checkboxFieldPath: string;
} & TextFieldClientProps;

export const SlugComponent: FC<SlugComponentProps> = ({
  field,
  fieldToUse,
  checkboxFieldPath: checkboxFieldPathFromProps,
  path,
  readOnly: readOnlyFromProps,
}) => {
  const { label } = field;
  const locale = useLocale();
  const { value, setValue } = useField<string>({ path: path || field.name });

  const checkboxFieldPath = path?.includes(".")
    ? `${path}.${checkboxFieldPathFromProps}`
    : checkboxFieldPathFromProps;

  const { dispatchFields } = useForm();

  const checkboxValue = useFormFields(([fields]) => {
    return fields[checkboxFieldPath]?.value as string;
  });

  const targetFieldValue = useFormFields(([fields]) => {
    return fields[fieldToUse]?.value as string;
  });

  useEffect(() => {
    if (locale.code !== "en" || !targetFieldValue || (!checkboxValue && value)) {
      return;
    }

    const formattedSlug = slugify(targetFieldValue);
    if (value !== formattedSlug) {
      setValue(formattedSlug);
    }
  }, [targetFieldValue, checkboxValue, setValue, value, locale.code]);

  const handleLock = useCallback(
    (e: MouseEvent<Element>) => {
      e.preventDefault();

      dispatchFields({
        type: "UPDATE",
        path: checkboxFieldPath,
        value: !checkboxValue,
      });
    },
    [checkboxValue, checkboxFieldPath, dispatchFields],
  );

  const readOnly = readOnlyFromProps || checkboxValue || locale.code !== "en";

  return (
    <div className="field-type">
      <div
        style={{
          height: 24,
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <FieldLabel htmlFor={`field-${path}`} label={label} />

        <Button disabled={locale.code !== "en"} buttonStyle="none" onClick={handleLock}>
          {checkboxValue ? "Unlock" : "Lock"}
        </Button>
      </div>

      <TextInput
        value={value}
        onChange={setValue}
        path={path || field.name}
        readOnly={Boolean(readOnly)}
      />

      {locale.code !== "en" && (
        <small className="text-muted">Slug can only be modified in English version</small>
      )}
    </div>
  );
};
