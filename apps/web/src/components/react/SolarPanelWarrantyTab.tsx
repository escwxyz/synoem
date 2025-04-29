"use client";

import { PRODUCT_CATEGORIES, type Locale } from "@synoem/config";
import type { Product } from "@synoem/payload/payload-types";
import { ShieldCheck, Zap } from "lucide-react";
import {
  ChartContainer,
  ChartLegend,
  ChartLegendContent,
  ChartTooltip,
  type ChartConfig,
} from "@synoem/ui/components/chart";
import {
  AreaChart,
  CartesianGrid,
  XAxis,
  Area,
  YAxis,
  type Tooltip,
} from "recharts";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@synoem/ui/components/card";
import { RichText } from "./RichText";
import { useTranslations } from "~/i18n/utils";
import { NumberTicker } from "@synoem/ui/components/number-ticker";

interface Props {
  product: Product;
  locale: Locale;
}

export const SolarPanelWarrantyTab = ({ product, locale }: Props) => {
  const { solarPanel } = product;

  const isSolarPanel =
    product.category === PRODUCT_CATEGORIES.solarPanel.pluralSlug && solarPanel;

  if (!isSolarPanel) throw new Error("Not a solar panel product");

  const { warranty } = product;

  if (!warranty || typeof warranty === "number") {
    console.error("Warranty is null or not populated");
    return null;
  }

  const {
    descPower,
    descProduct,
    durationPower,
    durationProduct,
    powerDegradation,
  } = warranty;

  const hasPowerWarranty =
    descPower && durationPower && durationPower.value && durationPower.unit;

  const hasProductWarranty =
    descProduct &&
    durationProduct &&
    durationProduct.value &&
    durationProduct.unit;

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
      const industryDegradation = powerDegradation.industryStd!
        .annualDegradation as number;

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
          productValue: (firstYearValue - productDegradation * (i - 1)).toFixed(
            2,
          ),
          industryValue: (
            firstYearValue -
            industryDegradation * (i - 1)
          ).toFixed(2),
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
        productValue: (firstYearValue - productDegradation * (i - 1)).toFixed(
          2,
        ),
      };
    });
  };

  const chartData = generateChartData();

  if (!powerDegradation || chartData.length === 0) return null;

  const hasIndustryComparison = Object.keys(chartData[0]).includes(
    "industryValue",
  );

  const { t } = useTranslations(locale);

  const chartConfig: ChartConfig = {
    productValue: {
      label: t("Component.SolarPanelWarrantyTab.chart.powerGuarantee"),
      color: "var(--chart-1)",
    },
  };

  if (hasIndustryComparison) {
    chartConfig.industryValue = {
      label: t("Component.SolarPanelWarrantyTab.chart.industryStandard"),
      color: "var(--chart-2)",
    };
  }

  return (
    <section className="flex gap-8 w-full flex-col">
      <div>
        <h3 className="text-xl font-bold mb-4">
          {t("Component.SolarPanelWarrantyTab.warrantyInformation")}
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {hasProductWarranty && (
            <Card>
              <CardHeader>
                <div className="flex gap-2 font-semibold items-center">
                  <div className="rounded-full bg-accent p-2">
                    <ShieldCheck size={20} />
                  </div>
                  <div className="text-xl">
                    {t("Component.SolarPanelWarrantyTab.productWarranty")}
                  </div>
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
                  <div className="text-xl">
                    {t("Component.SolarPanelWarrantyTab.powerWarranty")}
                  </div>
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
          <h3 className="text-xl font-bold mb-4">
            {t("Component.SolarPanelWarrantyTab.outputPowerDegradation")}
          </h3>
          <Card>
            <CardHeader>
              <CardTitle>
                {hasIndustryComparison
                  ? t(
                      "Component.SolarPanelWarrantyTab.powerDegradationComparison",
                    )
                  : t(
                      "Component.SolarPanelWarrantyTab.powerDegradationPrognosis",
                    )}
              </CardTitle>
              <CardDescription>
                {t("Component.SolarPanelWarrantyTab.powerDegradationDetails")}
              </CardDescription>
            </CardHeader>
            <CardContent className="w-full">
              <ChartContainer
                config={chartConfig}
                className="h-[450px] !aspect-auto"
              >
                <AreaChart
                  accessibilityLayer
                  data={chartData}
                  margin={{ top: 10, right: 30, left: 0, bottom: 10 }}
                >
                  <CartesianGrid vertical={false} strokeDasharray="3 3" />
                  <XAxis
                    dataKey="year"
                    tickLine={true}
                    axisLine={false}
                    tickMargin={8}
                    ticks={[
                      1,
                      ...Array.from(
                        { length: Math.ceil(30 / 5) },
                        (_, i) => (i + 1) * 5,
                      ),
                    ]}
                    label={{
                      value: t("Component.SolarPanelWarrantyTab.chart.xAxis"),
                      position: "insideBottom",
                      offset: -10,
                    }}
                  />
                  <YAxis
                    label={{
                      value: t("Component.SolarPanelWarrantyTab.chart.yAxis"),
                      angle: -90,
                      position: "insideLeft",
                    }}
                    domain={[50, 100]}
                    ticks={[50, 60, 70, 80, 90, 100]}
                  />
                  <ChartTooltip
                    cursor={false}
                    content={<CustomTooltip locale={locale} />}
                  />
                  <ChartLegend
                    verticalAlign="top"
                    align="right"
                    wrapperStyle={{
                      paddingTop: "10px",
                    }}
                    content={
                      <ChartLegendContent
                        nameKey={hasIndustryComparison ? undefined : "product"}
                      />
                    }
                  />

                  <Area
                    name={t(
                      "Component.SolarPanelWarrantyTab.chart.powerGuarantee",
                    )}
                    dataKey="productValue"
                    type="monotone"
                    fill="var(--chart-1)"
                    fillOpacity={0.4}
                    stroke="var(--chart-1)"
                  />
                  {hasIndustryComparison && (
                    <Area
                      name={t(
                        "Component.SolarPanelWarrantyTab.chart.industryStandard",
                      )}
                      dataKey="industryValue"
                      type="monotone"
                      fill="var(--chart-2)"
                      fillOpacity={0.4}
                      stroke="var(--chart-2)"
                    />
                  )}
                </AreaChart>
              </ChartContainer>
            </CardContent>
            <CardFooter className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="bg-muted dark:bg-background p-4 rounded-lg">
                <h4 className="font-semibold text-muted-foreground mb-2">
                  {t("Component.SolarPanelWarrantyTab.initialYearGuarantee")}
                </h4>
                <p className="text-2xl font-bold text-primary">
                  <NumberTicker
                    value={powerDegradation.initialGuarantee}
                    startValue={90.0}
                    decimalPlaces={1}
                    className="text-2xl font-bold text-primary dark:text-primary"
                  />
                  %
                </p>
              </div>
              <div className="bg-muted dark:bg-background p-4 rounded-lg">
                <h4 className="font-semibold text-muted-foreground mb-2">
                  {t("Component.SolarPanelWarrantyTab.annualDegradation")}
                </h4>
                <p className="text-2xl font-bold text-primary">
                  <NumberTicker
                    value={powerDegradation.annual}
                    startValue={0.0}
                    decimalPlaces={1}
                    className="text-2xl font-bold text-primary dark:text-primary"
                  />
                  %
                </p>
              </div>
              <div className="bg-muted dark:bg-background p-4 rounded-lg">
                <h4 className="font-semibold text-muted-foreground mb-2">
                  {t("Component.SolarPanelWarrantyTab.endYearGuarantee")}
                </h4>

                <p className="text-2xl font-bold text-primary">
                  <NumberTicker
                    value={powerDegradation.endYearGuarantee}
                    startValue={80.0}
                    decimalPlaces={1}
                    className="text-2xl font-bold text-primary dark:text-primary"
                  />
                  %
                </p>
              </div>
            </CardFooter>
          </Card>
        </div>
      )}
    </section>
  );
};

const CustomTooltip = ({
  active,
  payload,
  label,
  locale,
}: Pick<
  React.ComponentProps<typeof Tooltip>,
  "active" | "payload" | "label"
> & {
  locale: Locale;
}) => {
  if (!active || !payload?.length) return null;

  const { t } = useTranslations(locale);

  return (
    <div className="border-border/50 bg-background grid min-w-[8rem] rounded-lg border p-2.5 shadow-xl">
      <div className="font-medium">
        {t("Component.SolarPanelWarrantyTab.chart.year")}: {label}
      </div>
      <div className="grid gap-1.5 mt-1">
        {payload.map((item) => (
          <div key={item.name} className="flex items-center gap-2">
            <div
              className="w-1 h-2.5 rounded-[2px]"
              style={{ backgroundColor: item.color }}
            />
            <div className="flex flex-1 justify-between items-center">
              <span className="text-muted-foreground text-xs mr-1">
                {item.name}
              </span>
              <span className="text-foreground font-mono font-medium text-xs">
                {item.value}%
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
