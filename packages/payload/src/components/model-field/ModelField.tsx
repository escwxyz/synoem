"use client";

import type React from "react";
import {
  Button,
  useDocumentInfo,
  useField,
  type FieldType,
} from "@payloadcms/ui";
import { ModelAnalyzer, type ModelInfo } from "./ModelAnalyzer";

interface ModelFieldProps extends FieldType<ModelInfo> {
  path: string;
}

export const ModelField: React.FC<ModelFieldProps> = ({ path }) => {
  const { value, setValue } = useField<ModelInfo>({ path });

  const documentValue = useDocumentInfo();

  const modelUrl = documentValue?.savedDocumentData?.url;

  const handleModelInfoExtracted = (modelInfo: ModelInfo) => {
    setValue(modelInfo);
  };

  return (
    <div className="field-type model">
      <ModelAnalyzer
        value={value}
        modelUrl={modelUrl}
        onModelInfoExtracted={handleModelInfoExtracted}
      />

      {value && (
        <Button onClick={() => setValue(undefined)}>Clear model info</Button>
      )}
    </div>
  );
};
