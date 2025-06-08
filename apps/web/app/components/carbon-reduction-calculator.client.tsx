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
import { Slider } from "@synoem/ui/components/slider";
import { Leaf, Calendar, Sun, Globe } from "lucide-react";
import { Feature } from "./blocks/feature.client";
import { useLocale, useTranslations } from "next-intl";
import { LocalizedNumberInput } from "./localized-number-input.client";

const TREE_CO2_PER_YEAR_KG = 22;
const TREE_LIFETIME_YEARS = 25;
const KG_TO_TONNE = 0.001;
const tonnesPerTree = TREE_CO2_PER_YEAR_KG * TREE_LIFETIME_YEARS * KG_TO_TONNE;

interface CarbonCalculationResults {
  projectCapacityMW: number;
  annualPowerGeneration: number;
  annualCarbonReduction: number;
  totalCarbonReduction: number;
  equivalentTrees: number;
  equivalentCars: number;
}

export const CarbonReductionCalculator = () => {
  const locale = useLocale();

  const t = useTranslations("CarbonReductionCalculator");

  const [projectCapacity, setProjectCapacity] = useState<number>(1.0);
  const [emissionIntensity, setEmissionIntensity] = useState<number>(0.5);
  const [projectLifespan, setProjectLifespan] = useState<number>(25);
  const [effectiveHours, setEffectiveHours] = useState([1500]);

  const [results, setResults] = useState<CarbonCalculationResults>({
    projectCapacityMW: 0,
    annualPowerGeneration: 0,
    annualCarbonReduction: 0,
    totalCarbonReduction: 0,
    equivalentTrees: 0,
    equivalentCars: 0,
  });

  useEffect(() => {
    const calculateCarbonReduction = () => {
      const hours = effectiveHours[0] ?? 1500;

      if (projectCapacity > 0 && hours > 0 && emissionIntensity > 0 && projectLifespan > 0) {
        const annualPowerGeneration = projectCapacity * hours;

        const annualCarbonReduction = annualPowerGeneration * emissionIntensity;

        const totalCarbonReduction = annualCarbonReduction * projectLifespan;

        const equivalentTrees = Math.round(totalCarbonReduction / tonnesPerTree);

        // Average car emits ~4.6 tonnes CO2 per year
        const equivalentCars = Math.round(annualCarbonReduction / 4.6);

        setResults({
          projectCapacityMW: projectCapacity,
          annualPowerGeneration,
          annualCarbonReduction,
          totalCarbonReduction,
          equivalentTrees,
          equivalentCars,
        });
      }
    };

    calculateCarbonReduction();
  }, [projectCapacity, effectiveHours, emissionIntensity, projectLifespan]);

  const getRegionPresets = () => [
    { name: t("globalAverage"), value: 0.5 },
    { name: t("china"), value: 0.65 },
    { name: t("india"), value: 0.82 },
    { name: t("usa"), value: 0.4 },
    { name: t("euAverage"), value: 0.3 },
    { name: t("australia"), value: 0.7 },
  ];

  const totalCleanEnergy = results.annualPowerGeneration * projectLifespan;

  return (
    <div className="bg-card rounded-xl shadow-sm my-8 mx-auto p-4 md:p-8">
      <div className="grid gap-6 md:grid-cols-2">
        <Card className="h-fit">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Leaf className="h-5 w-5 text-primary" />
              {t("title")}
            </CardTitle>
            <CardDescription>{t("description")}</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="p-4 bg-background/50 rounded-lg">
              <div className="flex flex-col md:flex-row justify-between md:items-center gap-2">
                <div className="text-sm flex items-center gap-2">
                  <Sun className="h-4 w-4 text-yellow-600" />
                  {t("projectCapacity")}
                </div>
                <div className="text-2xl font-bold">
                  <LocalizedNumberInput
                    value={projectCapacity}
                    onChange={setProjectCapacity}
                    min={0}
                    max={1000}
                    step={0.1}
                    placeholder={(1.0).toLocaleString(locale, {
                      maximumFractionDigits: 1,
                      minimumFractionDigits: 1,
                    })}
                  />
                </div>
              </div>
            </div>

            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <Label htmlFor="effective-hours">{t("effectiveHours")}</Label>
                <Badge variant="outline">
                  {effectiveHours[0]?.toLocaleString(locale)} {t("hours")}
                </Badge>
              </div>
              <Slider
                id="effective-hours"
                min={1000}
                max={2000}
                step={50}
                value={effectiveHours}
                onValueChange={setEffectiveHours}
                className="w-full"
              />
              <div className="flex justify-between text-xs text-muted-foreground/50">
                <span>
                  {(1000).toLocaleString(locale)}h ({t("low")})
                </span>
                <span>
                  {(1500).toLocaleString(locale)}h ({t("average")})
                </span>
                <span>
                  {(2000).toLocaleString(locale)}h ({t("high")})
                </span>
              </div>
            </div>

            <div className="space-y-3">
              <div className="p-4 bg-background/50 rounded-lg">
                <div className="flex flex-col md:flex-row justify-between md:items-center gap-2">
                  <Label
                    htmlFor="emission-intensity"
                    className="flex md:flex-col gap-1 items-start"
                  >
                    {t("emissionIntensity")}
                    <span className="text-xs text-muted-foreground/50">
                      {t("emissionIntensityUnit")}
                    </span>
                  </Label>
                  <LocalizedNumberInput
                    value={emissionIntensity}
                    onChange={setEmissionIntensity}
                    min={0}
                    max={1}
                    step={0.01}
                    placeholder={(0.5).toLocaleString(locale, {
                      maximumFractionDigits: 2,
                      minimumFractionDigits: 2,
                    })}
                    decimalPlaces={2}
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-2">
                {getRegionPresets().map((preset) => (
                  <button
                    key={preset.name}
                    onClick={() => setEmissionIntensity(preset.value)}
                    type="button"
                    className="text-xs p-3 bg-accent/10 hover:bg-accent/70 rounded transition-colors cursor-pointer"
                  >
                    {preset.name}: {preset.value.toLocaleString(locale)}
                  </button>
                ))}
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="project-lifespan">{t("projectLifespan")}</Label>
              <Input
                id="project-lifespan"
                type="number"
                step="1"
                min="5"
                max="30"
                value={projectLifespan}
                onChange={(e) => {
                  if (e.target.value === "") {
                    setProjectLifespan(5);
                  } else {
                    setProjectLifespan(Number.parseInt(e.target.value));
                  }
                }}
                placeholder="25"
              />
            </div>
          </CardContent>
        </Card>

        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Calendar className="h-5 w-5 text-primary" />
                {t("annualImpact")}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid gap-4 grid-cols-1 md:grid-cols-2">
                <Feature
                  type="text"
                  title={`${results.annualPowerGeneration.toLocaleString(locale)} MWh`}
                  description={t("annualPowerGeneration")}
                  icon="lucide:zap"
                  blockType="featureBlock"
                  alignment="between-reverse"
                />
                <Feature
                  type="text"
                  title={`${results.annualCarbonReduction.toLocaleString(locale)} tonnes`}
                  description={t("annualCarbonReduction")}
                  icon="lucide:corner-right-down"
                  blockType="featureBlock"
                  alignment="between-reverse"
                />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Globe className="h-5 w-5 text-primary" />
                {t("lifetimeEnvironmentalImpact")}
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <Feature
                type="number"
                number={results.totalCarbonReduction}
                description={t("totalCarbonReduction", { years: projectLifespan })}
                icon="lucide:trending-down"
                blockType="featureBlock"
                alignment="center"
                locale={locale}
              />
              <Feature
                type="text"
                title={`${totalCleanEnergy.toLocaleString(locale)} MWh`}
                description={t("cleanEnergy")}
                icon="lucide:utility-pole"
                blockType="featureBlock"
                alignment="center"
              />

              <div className="grid gap-3 grid-cols-1 md:grid-cols-2">
                <Feature
                  type="text"
                  title={`${results.equivalentTrees.toLocaleString(locale)} trees`}
                  description={t("equivalentToPlanting")}
                  icon="lucide:tree-pine"
                  blockType="featureBlock"
                />

                <Feature
                  type="text"
                  title={`${results.equivalentCars.toLocaleString(locale)} cars / year`}
                  description={t("removingCarsFromRoad")}
                  icon="lucide:car"
                  blockType="featureBlock"
                />
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
      <div className="flex mt-4">
        <span className="text-sm text-muted-foreground italic">{t("note")}</span>
      </div>
    </div>
  );
};
