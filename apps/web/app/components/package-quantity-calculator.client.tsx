"use client";

import { useState, useEffect } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@synoem/ui/components/card";
import { Input } from "@synoem/ui/components/input";
import { Label } from "@synoem/ui/components/label";
import { Badge } from "@synoem/ui/components/badge";
import { Calculator, Sigma } from "lucide-react";
import type { PumpController, SolarPanel } from "@synoem/types";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@synoem/ui/components/select";
import type { ProductTypeId } from "@synoem/config";
import { FeatureCard } from "./blocks/feature-card";
import { useLocale, useTranslations } from "next-intl";
import { LocalizedNumberInput } from "~/components/localized-number-input.client";

interface CalculationResults {
  panelsNeeded: number;
  palletsNeeded: number;
  containersNeeded: number;
  totalPallets: number;
  remainingPanels: number;
  totalWeight?: number;
  totalArea?: number;
  overallOutputPower: number;
}

interface Props {
  productTypeId: ProductTypeId;
  panelWattageOptions: number[];
  packageConfig:
    | NonNullable<SolarPanel["packagingConfig"]>
    | NonNullable<PumpController["packagingConfig"]>;
  panelWeight?: number;
  panelArea?: number;
}

export const PackageQuantityCalculator = ({
  productTypeId,
  panelWattageOptions,
  packageConfig,
  panelWeight,
  panelArea,
}: Props) => {
  if (
    !panelWattageOptions ||
    panelWattageOptions.length === 0 ||
    !packageConfig ||
    typeof packageConfig !== "object"
  ) {
    console.log("packageConfig is not populated");
    return null;
  }

  // TODO: support other product types
  if (productTypeId !== "solar-panel") {
    return null;
  }

  const { unitQty, containerType, qtyPerPallet, pltsPerContainer, totalQty } = packageConfig;

  if (!unitQty || !containerType || !qtyPerPallet || !pltsPerContainer || !unitQty.value) {
    console.log("packageConfig", packageConfig);
    return null;
  }

  const [projectCapacity, setProjectCapacity] = useState<number>(1.0);

  const [panelWattage, setPanelWattage] = useState<number>(panelWattageOptions[0] ?? 0);

  const [results, setResults] = useState<CalculationResults>({
    panelsNeeded: 0,
    palletsNeeded: 0,
    containersNeeded: 0,
    totalPallets: 0,
    remainingPanels: 0,
    totalWeight: 0,
    totalArea: 0,
    overallOutputPower: 0,
  });

  const piecesPerPallet = qtyPerPallet ?? 0;
  const piecesPerContainer = totalQty ?? 0;
  const palletsPerContainer = pltsPerContainer ?? 0;

  const palletDimensions = packageConfig.palletDimensions;
  const palletWeight = packageConfig.palletWeight?.value;
  const palletWeightUnit = packageConfig.palletWeight?.unit;
  const unitDimensions = packageConfig.unitDimensions;
  const unitWeight = packageConfig.unitWeight?.value;
  const unitWeightUnit = packageConfig.unitWeight?.unit;

  useEffect(() => {
    const calculateResults = () => {
      const projectSizeW = projectCapacity * 1000000;

      if (projectSizeW > 0 && panelWattage > 0 && piecesPerPallet > 0 && piecesPerContainer > 0) {
        const panelsNeeded = Math.ceil(projectSizeW / panelWattage);
        const containersNeeded = Math.floor(panelsNeeded / piecesPerContainer);
        const remainingPanels = panelsNeeded - containersNeeded * piecesPerContainer;
        const palletsNeeded = Math.ceil(remainingPanels / piecesPerPallet);
        const totalPallets = containersNeeded * palletsPerContainer + palletsNeeded;
        const totalWeight = panelWeight ? panelsNeeded * panelWeight : undefined;
        const totalArea = panelArea ? panelsNeeded * panelArea : undefined;
        const overallOutputPower = panelsNeeded * panelWattage;

        setResults({
          panelsNeeded,
          palletsNeeded,
          containersNeeded,
          totalPallets,
          remainingPanels,
          totalWeight,
          totalArea,
          overallOutputPower,
        });
      }
    };
    calculateResults();
  }, [
    projectCapacity,
    panelWattage,
    panelWeight,
    panelArea,
    piecesPerPallet,
    piecesPerContainer,
    palletsPerContainer,
  ]);

  const locale = useLocale();

  const t = useTranslations("PackageQuantityCalculator");

  return (
    <div className="max-w-6xl mx-auto">
      <h3 className="text-2xl font-bold mb-4">{t("title")}</h3>
      <div className="grid gap-6 lg:grid-cols-2">
        <Card className="h-fit">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Calculator className="h-5 w-5 text-primary" />
              {t("projectParameters")}
            </CardTitle>
            <CardDescription>{t("projectParametersDescription")}</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="grid gap-4 sm:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="project-size">{t("projectCapacity")}</Label>
                <LocalizedNumberInput
                  value={projectCapacity}
                  onChange={(value) => setProjectCapacity(value)}
                  min={0.1}
                  max={1000}
                  step={0.1}
                  placeholder={(1.0).toLocaleString(locale, {
                    maximumFractionDigits: 1,
                    minimumFractionDigits: 1,
                  })}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="panel-wattage">{t("panelWattage")}</Label>
                <Select
                  defaultValue={panelWattage.toString()}
                  onValueChange={(value) => setPanelWattage(Number.parseInt(value))}
                  value={panelWattage.toString()}
                >
                  <SelectTrigger id="panel-wattage" className="w-full">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {panelWattageOptions.map((wattage) => (
                      <SelectItem key={wattage} value={wattage.toString()}>
                        {wattage}Wp
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="space-y-4">
              <h4 className="font-semibold text-sm">{t("packagingInformation")}</h4>
              <div className="grid gap-4 sm:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="pieces-per-pallet">{t("piecesPerPallet")}</Label>
                  <Input
                    id="pieces-per-pallet"
                    type="number"
                    min="1"
                    value={piecesPerPallet}
                    readOnly
                    disabled
                    placeholder="36"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="pieces-per-container">{t("piecesPerContainer")}</Label>
                  <Input
                    id="pieces-per-container"
                    type="number"
                    min="1"
                    value={piecesPerContainer}
                    readOnly
                    disabled
                    placeholder="936"
                  />
                </div>
                {palletDimensions &&
                  (palletDimensions.h || palletDimensions.w || palletDimensions.d) && (
                    <div className="space-y-2 col-span-2">
                      <Label>{t("palletDimensions")}</Label>
                      <div className="text-muted-foreground text-sm">
                        {palletDimensions.h && `H: ${palletDimensions.h} `}
                        {palletDimensions.w && `W: ${palletDimensions.w} `}
                        {palletDimensions.d && `D: ${palletDimensions.d} `}
                        {palletDimensions.unit && `(${palletDimensions.unit})`}
                      </div>
                    </div>
                  )}
                {/* Pallet weight info if present */}
                {palletWeight && (
                  <div className="space-y-2 col-span-2">
                    <Label>{t("palletWeight")}</Label>
                    <div className="text-muted-foreground text-sm">
                      {palletWeight} {palletWeightUnit}
                    </div>
                  </div>
                )}

                {unitDimensions && (unitDimensions.h || unitDimensions.w || unitDimensions.d) && (
                  <div className="space-y-2 col-span-2">
                    <Label>Panel Size</Label>
                    <div className="text-muted-foreground text-sm">
                      {unitDimensions.h && `H: ${unitDimensions.h} `}
                      {unitDimensions.w && `W: ${unitDimensions.w} `}
                      {unitDimensions.d && `D: ${unitDimensions.d} `}
                      {unitDimensions.unit && `(${unitDimensions.unit})`}
                    </div>
                  </div>
                )}

                {unitWeight && (
                  <div className="space-y-2 col-span-2">
                    <Label>Panel Weight</Label>
                    <div className="text-muted-foreground text-sm">
                      {unitWeight} {unitWeightUnit}
                    </div>
                  </div>
                )}
              </div>
            </div>

            <div className="space-y-4">
              <h4 className="font-semibold text-sm">Panel Specifications</h4>
              <div className="grid gap-4 sm:grid-cols-2">
                {panelWeight && (
                  <div className="space-y-2">
                    <Label htmlFor="panel-weight">Panel Weight (kg)</Label>
                    <Input
                      id="panel-weight"
                      value={panelWeight.toLocaleString(locale)}
                      readOnly
                      disabled
                    />
                  </div>
                )}

                {panelArea && (
                  <div className="space-y-2">
                    <Label htmlFor="panel-area">Panel Area (m²)</Label>
                    <Input
                      id="panel-area"
                      value={panelArea.toLocaleString(locale)}
                      readOnly
                      disabled
                    />
                  </div>
                )}
              </div>
            </div>
          </CardContent>
        </Card>

        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Sigma className="h-5 w-5 text-primary" />
                {t("calculationResults")}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid gap-4">
                <FeatureCard
                  type="text"
                  title={results.panelsNeeded.toLocaleString(locale)}
                  description={t("panelsNeeded")}
                  icon="lucide:zap"
                  blockType="featureBlock"
                  className="bg-muted-foreground/10"
                  alignment="between-reverse"
                />

                <div className="grid gap-4 grid-cols-2">
                  <FeatureCard
                    type="text"
                    title={results.containersNeeded.toLocaleString(locale)}
                    description={t("containersNeeded")}
                    icon="lucide:truck"
                    blockType="featureBlock"
                    className="bg-muted-foreground/10"
                    alignment="between"
                  />

                  <FeatureCard
                    type="text"
                    title={results.palletsNeeded.toLocaleString(locale)}
                    description={t("palletsNeeded")}
                    icon="lucide:package"
                    blockType="featureBlock"
                    className="bg-muted-foreground/10"
                    alignment="between"
                  />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-lg">{t("detailedBreakdown")}</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid gap-3">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">{t("totalPallets")}:</span>
                  <Badge variant="secondary">
                    {results.totalPallets} {t("pallets")}
                  </Badge>
                </div>
                {results.totalWeight && (
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">{t("totalWeight")}:</span>
                    <Badge variant="secondary">
                      {results.totalWeight.toLocaleString(locale)} {unitWeightUnit || "kg"}
                    </Badge>
                  </div>
                )}
                {results.totalArea && (
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">{t("totalArea")}:</span>
                    <Badge variant="secondary">{results.totalArea.toLocaleString(locale)} m²</Badge>
                  </div>
                )}
                <div className="flex justify-between">
                  <span className="text-muted-foreground">{t("overallOutputPower")}:</span>
                  <Badge variant="secondary">
                    {results.overallOutputPower.toLocaleString(locale)} Wp
                  </Badge>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};
