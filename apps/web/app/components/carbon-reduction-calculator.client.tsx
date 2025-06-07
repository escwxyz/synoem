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
import { Leaf, TreePine, Calendar, Sun } from "lucide-react";
import { Feature } from "./blocks/feature.client";
import { useLocale, useTranslations } from "next-intl";

interface CarbonCalculationResults {
  projectCapacityMW: number;
  annualPowerGeneration: number;
  annualCarbonReduction: number;
  totalCarbonReduction: number;
  equivalentTrees: number;
  equivalentCars: number;
}

export const CarbonReductionCalculator = () => {
  const [projectCapacity, setProjectCapacity] = useState<string>("1.0");

  const [effectiveHours, setEffectiveHours] = useState([1500]);
  const [emissionIntensity, setEmissionIntensity] = useState<string>("0.5");
  const [projectLifespan, setProjectLifespan] = useState<string>("25");
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
      const capacityMW = Number.parseFloat(projectCapacity);
      const hours = effectiveHours[0] ?? 1500;
      const intensity = Number.parseFloat(emissionIntensity);
      const lifespan = Number.parseInt(projectLifespan);

      if (capacityMW > 0 && hours > 0 && intensity > 0 && lifespan > 0) {
        const annualPowerGeneration = capacityMW * hours;

        const annualCarbonReduction = annualPowerGeneration * intensity;

        const totalCarbonReduction = annualCarbonReduction * lifespan;

        // 1 tree absorbs ~22kg CO2 per year, so over 25 years = ~550kg = 0.55 tonnes
        const equivalentTrees = Math.round(totalCarbonReduction / 0.55);

        // Average car emits ~4.6 tonnes CO2 per year
        const equivalentCars = Math.round(annualCarbonReduction / 4.6);

        setResults({
          projectCapacityMW: capacityMW,
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
    { name: "Global Average", value: "0.5" },
    { name: "China", value: "0.65" },
    { name: "India", value: "0.82" },
    { name: "USA", value: "0.4" },
    { name: "EU Average", value: "0.3" },
    { name: "Australia", value: "0.7" },
  ];

  const locale = useLocale();

  const t = useTranslations("CarbonReductionCalculator");

  return (
    <div className="bg-card rounded-xl shadow-sm my-8 mx-auto p-4 md:p-8">
      <div className="grid gap-6 md:grid-cols-2">
        {/* Input Section */}
        <Card className="h-fit">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Leaf className="h-5 w-5 text-primary" />
              {t("title")}
            </CardTitle>
            <CardDescription>{t("description")}</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* Project Capacity Display */}
            <div className="p-4 bg-background/50 rounded-lg">
              <div className="flex items-center justify-between">
                <div className="flex flex-col gap-2">
                  <div className="text-sm text-primary-foreground">{t("projectCapacity")}</div>
                  <div className="text-2xl font-bold text-primary-foreground">
                    <Input
                      type="number"
                      step="0.1"
                      min="0"
                      value={projectCapacity}
                      onChange={(e) => setProjectCapacity(e.target.value)}
                      placeholder="1.0"
                    />
                  </div>
                </div>
                <Sun className="h-8 w-8 text-yellow-600" />
              </div>
            </div>

            {/* Effective Hours Slider */}
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
                <span>1,000h (Low sun)</span>
                <span>1,500h (Average)</span>
                <span>2,000h (High sun)</span>
              </div>
            </div>

            {/* Emission Intensity */}
            <div className="space-y-3">
              <Label htmlFor="emission-intensity">{t("emissionIntensity")}</Label>
              <Input
                id="emission-intensity"
                type="number"
                step="0.01"
                min="0"
                value={emissionIntensity}
                onChange={(e) => setEmissionIntensity(e.target.value)}
                placeholder="0.5"
              />
              <div className="grid grid-cols-2 gap-2">
                {getRegionPresets().map((preset) => (
                  <button
                    key={preset.name}
                    onClick={() => setEmissionIntensity(preset.value)}
                    type="button"
                    className="text-xs px-2 py-1 bg-muted/50 hover:bg-muted/70 rounded transition-colors"
                  >
                    {preset.name}: {preset.value}
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
                onChange={(e) => setProjectLifespan(e.target.value)}
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
              <div className="grid gap-4 grid-cols-2">
                <Feature
                  type="text"
                  title={`${results.annualPowerGeneration.toLocaleString()} MWh`}
                  description={t("annualPowerGeneration")}
                  icon="lucide:zap"
                  blockType="featureBlock"
                  alignment="between-reverse"
                />
                <Feature
                  type="text"
                  title={`${results.annualCarbonReduction.toLocaleString()} tonnes`}
                  description={t("annualCarbonReduction")}
                  icon="lucide:trending-down"
                  blockType="featureBlock"
                  alignment="between-reverse"
                />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <TreePine className="h-5 w-5 text-primary" />
                {t("lifetimeEnvironmentalImpact")}
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <Feature
                type="number"
                number={results.totalCarbonReduction}
                description={`tonnes CO₂ saved over ${projectLifespan} years`}
                icon="lucide:trending-down"
                blockType="featureBlock"
                className="bg-primary/50 text-primary-foreground"
                alignment="center"
              />
              <Feature
                type="text"
                title={`${(
                  results.annualPowerGeneration * Number.parseInt(projectLifespan)
                ).toLocaleString()} MWh`}
                description="Clean Energy"
                icon="lucide:zap"
                blockType="featureBlock"
                alignment="center"
              />

              <div className="grid gap-3 grid-cols-2">
                <Feature
                  type="text"
                  title={`${results.equivalentTrees.toLocaleString()} trees`}
                  description="Equivalent to planting"
                  icon="lucide:tree-pine"
                  blockType="featureBlock"
                />

                <Feature
                  type="text"
                  title={`${results.equivalentCars.toLocaleString()} cars / year`}
                  description="Removing cars from road"
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
