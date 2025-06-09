"use client";

import type { SolarPanel } from "@synoem/types";
import { ShieldCheck, Zap } from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@synoem/ui/components/card";
import { RichText } from "~/components/rich-text.client";
import { Feature } from "~/components/blocks/feature.client";

import { useTranslations } from "next-intl";

import dynamic from "next/dynamic";

const SolarPanelPowerChart = dynamic(
  () =>
    import("~/components/solar-panel-power-chart.client").then((mod) => mod.SolarPanelPowerChart),
  {
    ssr: false,
    loading: () => <div>Loading...</div>,
  },
);

interface Props {
  solarPanel: NonNullable<Pick<SolarPanel, "warranty">>;
}

export const SolarPanelWarrantyTab = ({ solarPanel }: Props) => {
  const { warranty } = solarPanel;

  if (typeof warranty !== "object" || !warranty) {
    console.warn("Warranty is not populated");
    return null;
  }

  const { descPower, descProduct, durationPower, durationProduct, powerDegradation } = warranty;

  const hasPowerWarranty = descPower && durationPower && durationPower.value && durationPower.unit;

  const hasProductWarranty =
    descProduct && durationProduct && durationProduct.value && durationProduct.unit;

  const generateChartData = () => {
    if (!powerDegradation) return [];

    const initialValue = 100;
    const firstYearValue = 99;

    const years = durationPower?.value || 30;

    const hasIndustryData =
      !!powerDegradation.compareWithIndustry &&
      typeof powerDegradation?.industryStd?.initialValue === "number" &&
      typeof powerDegradation?.industryStd?.annualDegradation === "number";

    if (hasIndustryData) {
      const productDegradation = powerDegradation.annual || 0;
      // biome-ignore lint/style/noNonNullAssertion: <explanation>
      const industryDegradation = powerDegradation.industryStd!.annualDegradation as number;

      return Array.from({ length: years + 1 }, (_, i) => {
        if (i === 0) {
          return {
            year: 0,
            productValue: initialValue.toFixed(2),
            industryValue: initialValue.toFixed(2),
          };
        }

        if (i === 1) {
          return {
            year: 1,
            productValue: firstYearValue.toFixed(2),
            industryValue: firstYearValue.toFixed(2),
          };
        }
        return {
          year: i,
          productValue: (firstYearValue - productDegradation * (i - 1)).toFixed(2),
          industryValue: (firstYearValue - industryDegradation * (i - 1)).toFixed(2),
        };
      });
    }

    const productDegradation = powerDegradation.annual || 0;

    return Array.from({ length: years + 1 }, (_, i) => {
      if (i === 0) {
        return {
          year: 0,
          productValue: initialValue.toFixed(2),
        };
      }

      if (i === 1) {
        return {
          year: 1,
          productValue: firstYearValue.toFixed(2),
        };
      }
      return {
        year: i,
        productValue: (firstYearValue - productDegradation * (i - 1)).toFixed(2),
      };
    });
  };

  const chartData = generateChartData();

  if (!powerDegradation || chartData.length === 0) return null;

  const hasIndustryComparison = Object.keys(chartData[0] ?? {}).includes("industryValue");

  const t = useTranslations("SolarPanelWarrantyTab");

  return (
    <section className="flex gap-8 w-full flex-col">
      <div>
        <h3 className="text-xl font-bold mb-4">{t("warrantyInformation")}</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {hasProductWarranty && (
            <Card>
              <CardHeader>
                <div className="flex gap-2 font-semibold items-center">
                  <div className="rounded-full bg-accent p-2">
                    <ShieldCheck size={20} />
                  </div>
                  <div className="text-xl">{t("productWarranty")}</div>
                </div>
              </CardHeader>
              <CardContent>
                <RichText data={descProduct} />
              </CardContent>
            </Card>
          )}
          {hasPowerWarranty && (
            <Card>
              <CardHeader>
                <div className="flex gap-2 font-semibold items-center">
                  <div className="rounded-full bg-accent p-2">
                    <Zap size={20} />
                  </div>
                  <div className="text-xl">{t("powerWarranty")}</div>
                </div>
              </CardHeader>
              <CardContent>
                <RichText data={descPower} />
              </CardContent>
            </Card>
          )}
        </div>
      </div>

      {powerDegradation && (
        <div>
          <h3 className="text-xl font-bold mb-4">{t("outputPowerDegradation")}</h3>
          <Card>
            <CardHeader>
              <CardTitle>
                {hasIndustryComparison
                  ? t("powerDegradationComparison")
                  : t("powerDegradationPrognosis")}
              </CardTitle>
              <CardDescription>{t("powerDegradationDetails")}</CardDescription>
            </CardHeader>
            <CardContent className="w-full">
              <SolarPanelPowerChart
                chartData={chartData}
                hasIndustryComparison={hasIndustryComparison}
              />
            </CardContent>
            <CardFooter className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <Feature
                type="number"
                blockType="featureBlock"
                number={powerDegradation.initialGuarantee}
                icon="lucide:trending-up"
                description={t("initialYearGuarantee")}
                withPlus={false}
                isPercentage={true}
                startValue={90.0}
                decimalPlaces={1}
                opacity={100}
                className="bg-muted dark:bg-background p-4 rounded-lg"
              />
              <Feature
                type="number"
                blockType="featureBlock"
                number={powerDegradation.annual}
                icon="lucide:trending-down"
                description={t("annualDegradation")}
                withPlus={false}
                isPercentage={true}
                startValue={0.0}
                decimalPlaces={1}
                opacity={100}
                className="bg-muted dark:bg-background p-4 rounded-lg"
              />
              <Feature
                type="number"
                blockType="featureBlock"
                number={powerDegradation.endYearGuarantee}
                icon="lucide:shield-check"
                description={t("endYearGuarantee")}
                withPlus={false}
                isPercentage={true}
                startValue={80.0}
                decimalPlaces={1}
                opacity={100}
                className="bg-muted dark:bg-background p-4 rounded-lg"
              />
            </CardFooter>
          </Card>
        </div>
      )}
    </section>
  );
};
