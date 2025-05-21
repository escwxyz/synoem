"use client";

import {
  ChartContainer,
  ChartLegend,
  ChartLegendContent,
  ChartTooltip,
  type ChartConfig,
} from "@synoem/ui/components/chart";

import { AreaChart, CartesianGrid, XAxis, Area, YAxis, type Tooltip } from "recharts";
import { useTranslations } from "next-intl";

interface Props {
  chartData: {
    year: number;
    productValue: string;
  }[];
  hasIndustryComparison: boolean;
}

export const SolarPanelPowerChart = ({ chartData, hasIndustryComparison }: Props) => {
  const t = useTranslations("SolarPanelWarrantyTab");

  const chartConfig: ChartConfig = {
    productValue: {
      label: t("chart.powerGuarantee"),
      color: "var(--chart-1)",
    },
  };

  if (hasIndustryComparison) {
    chartConfig.industryValue = {
      label: t("chart.industryStandard"),
      color: "var(--chart-2)",
    };
  }

  return (
    <ChartContainer config={chartConfig} className="h-[450px] !aspect-auto">
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
          ticks={[1, ...Array.from({ length: Math.ceil(30 / 5) }, (_, i) => (i + 1) * 5)]}
          label={{
            value: t("chart.xAxis"),
            position: "insideBottom",
            offset: -10,
          }}
        />
        <YAxis
          label={{
            value: t("chart.yAxis"),
            angle: -90,
            position: "insideLeft",
          }}
          domain={[50, 100]}
          ticks={[50, 60, 70, 80, 90, 100]}
        />
        <ChartTooltip cursor={false} content={<CustomTooltip />} />
        <ChartLegend
          verticalAlign="top"
          align="right"
          wrapperStyle={{
            paddingTop: "10px",
          }}
          content={<ChartLegendContent nameKey={hasIndustryComparison ? undefined : "product"} />}
        />

        <Area
          name={t("chart.powerGuarantee")}
          dataKey="productValue"
          type="monotone"
          fill="var(--chart-1)"
          fillOpacity={0.4}
          stroke="var(--chart-1)"
        />
        {hasIndustryComparison && (
          <Area
            name={t("chart.industryStandard")}
            dataKey="industryValue"
            type="monotone"
            fill="var(--chart-2)"
            fillOpacity={0.4}
            stroke="var(--chart-2)"
          />
        )}
      </AreaChart>
    </ChartContainer>
  );
};

const CustomTooltip = ({
  active,
  payload,
  label,
}: Pick<React.ComponentProps<typeof Tooltip>, "active" | "payload" | "label">) => {
  if (!active || !payload?.length) return null;

  const t = useTranslations("SolarPanelWarrantyTab");

  return (
    <div className="border-border/50 bg-background grid min-w-[8rem] rounded-lg border p-2.5 shadow-xl">
      <div className="font-medium">
        {t("chart.year")}: {label}
      </div>
      <div className="grid gap-1.5 mt-1">
        {payload.map((item) => (
          <div key={item.name} className="flex items-center gap-2">
            <div className="w-1 h-2.5 rounded-[2px]" style={{ backgroundColor: item.color }} />
            <div className="flex flex-1 justify-between items-center">
              <span className="text-muted-foreground text-xs mr-1">{item.name}</span>
              <span className="text-foreground font-mono font-medium text-xs">{item.value}%</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
