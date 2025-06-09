"use client";

// TODO: seed real data for this component

import type { SolarPanel } from "@synoem/types";
import { Boxes, CheckCircle, Clock } from "lucide-react";
import { RichText } from "./rich-text.server";
import { PackageQuantityCalculator } from "./package-quantity-calculator.client";
import type { ProductTypeId } from "@synoem/config";
import { Card, CardTitle, CardHeader, CardContent } from "@synoem/ui/components/card";

interface Props {
  productTypeId: ProductTypeId;
  oemInfo: Pick<
    SolarPanel,
    "oem" | "moq" | "leadTime" | "packagingConfig" | "power" | "weight" | "dimensions"
  >;
  // | Pick<PumpController, "oem" | "moq" | "leadTime" | "packagingConfig">;
}

export const OemInfo = ({ oemInfo, productTypeId }: Props) => {
  const { oem, moq, leadTime, packagingConfig, power, weight, dimensions } = oemInfo;

  const powerNumber = power?.step > 0 ? Math.floor((power.max - power.min) / power.step) + 1 : 0;

  const panelWattageOptions =
    powerNumber > 0 ? new Array(powerNumber).fill(0).map((_, i) => power.min + i * power.step) : [];

  const panelWeight = weight?.value;
  const panelArea =
    dimensions?.h && dimensions?.w ? (dimensions.h * dimensions.w) / 1000000 : undefined;

  return (
    <section className="bg-card rounded-xl shadow-sm my-8 mx-auto p-4 md:p-8">
      <div className="grid grid-cols-1 md:grid-cols-[440px_1fr] gap-4 md:gap-8">
        <div className="space-y-4">
          <h3 className="text-2xl font-bold mb-4">Manufacturing Options</h3>
          {oem && (
            <Card>
              <CardHeader>
                <CardTitle>OEM Options</CardTitle>
              </CardHeader>
              <CardContent>
                <RichText data={oem} />
              </CardContent>
            </Card>
          )}
          {leadTime && leadTime.length > 0 && (
            <div className=" p-4 rounded-lg">
              <h4 className="font-semibold mb-2">Lead Time</h4>
              <ul className="space-y-2 text-gray-600">
                {leadTime.map(
                  ({ min, max, duration }) =>
                    min &&
                    max &&
                    duration && (
                      <li
                        key={`${min.value}-${max.value}-${duration.value}`}
                        className="flex items-center gap-2"
                      >
                        <Clock size="16" color="var(--color-emerald-600)" />
                        <span>
                          For {min.value} {min.unit} ~ {max.value} {max.unit}, it takes{" "}
                          {duration.value} {duration.unit}
                        </span>
                      </li>
                    ),
                )}
              </ul>
            </div>
          )}

          {moq?.value && moq.unit && (
            <Card>
              <CardHeader>
                <CardTitle>Minimum Order Quantity (MOQ)</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2">
                  <li className="flex items-start gap-2">
                    <Boxes size="16" color="var(--color-emerald-600)" />
                    <span>Sample Order: 1-2 pieces (MOQ)</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Boxes size="16" color="var(--color-emerald-600)" />
                    <span>
                      Mass Production: {moq.value} {moq.unit}
                    </span>
                  </li>
                </ul>
              </CardContent>
            </Card>
          )}
          <Card>
            <CardHeader>
              <CardTitle>Quality Control</CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2">
                <li className="flex items-start">
                  <CheckCircle className="text-emerald-600 mt-1 mr-2" />
                  <span>100% EL testing before and after lamination</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="text-emerald-600 mt-1 mr-2" />
                  <span>Visual inspection and power output testing</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="text-emerald-600 mt-1 mr-2" />
                  <span> Detailed test report provided with each shipment </span>
                </li>
              </ul>
            </CardContent>
          </Card>
        </div>
        {packagingConfig && (
          <PackageQuantityCalculator
            productTypeId={productTypeId}
            panelWattageOptions={panelWattageOptions}
            packageConfig={packagingConfig}
            panelWeight={panelWeight ? Number.parseFloat(panelWeight.toFixed(2)) : undefined}
            panelArea={panelArea ? Number.parseFloat(panelArea.toFixed(2)) : undefined}
          />
        )}
      </div>
    </section>
  );
};
