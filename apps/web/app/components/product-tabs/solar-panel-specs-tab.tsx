"use client";

import type { SolarPanel } from "@synoem/types";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@synoem/ui/components/table";
import { useTranslations } from "next-intl";

interface Props {
  solarPanel: SolarPanel;
}

export const SolarPanelSpecificationsTab = ({ solarPanel }: Props) => {
  const {
    dimensions,
    weight,
    cellDesc,
    cellCount,
    cellLength,
    cellWidth,
    glassDesc,
    frameDesc,
    junctionDesc,
    connDesc,
    glassType,
    bifaciality,
    connLength,
    wind,
    snow,
    temp,
    power,
    tolerance,
    tempCo,
    ratings,
  } = solarPanel;

  const hasDimensions = dimensions?.w && dimensions.h && dimensions.d && dimensions.unit;

  const hasWeight = weight?.value && weight?.unit;

  const hasPowerPoints = power.points && power.points.length > 0;

  const { points } = power;

  const t = useTranslations("SolarPanelSpecificationsTab");

  return (
    <section>
      <div className="grid grid-cols-1 gap-8">
        <div className="bg-background md:bg-card md:rounded-xl p-0 md:p-6 md:shadow-sm grid grid-cols-1 md:grid-cols-2 gap-8">
          <div>
            <h3 className="text-xl font-bold mb-4 text-emerald-700">
              {t("physicalSpecifications")}
            </h3>
            <Table>
              <TableBody>
                {hasDimensions && (
                  <TableRow>
                    <TableCell>{t("dimensions")}</TableCell>
                    <TableCell>
                      {dimensions.h} x {dimensions.w} x {dimensions.d} ({dimensions.unit})
                    </TableCell>
                  </TableRow>
                )}
                {hasWeight && (
                  <TableRow>
                    <TableCell>{t("weight")}</TableCell>
                    <TableCell>
                      {weight.value} {weight.unit?.toUpperCase()}
                    </TableCell>
                  </TableRow>
                )}
                {cellDesc.length > 0 && (
                  <>
                    <TableRow>
                      <TableCell>{t("cellType")}</TableCell>
                      <TableCell>{cellDesc}</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell>{t("cellNumber")}</TableCell>
                      <TableCell>
                        {cellCount} ({cellLength} x {cellWidth} mm)
                      </TableCell>
                    </TableRow>
                  </>
                )}
                {glassDesc.length > 0 && (
                  <>
                    <TableRow>
                      <TableCell>{t("glass")}</TableCell>
                      <TableCell>{glassDesc}</TableCell>
                    </TableRow>
                    {glassType === "bifacial" && (
                      <TableRow>
                        <TableCell>{t("bifaciality")}</TableCell>
                        <TableCell>{bifaciality}%</TableCell>
                      </TableRow>
                    )}
                  </>
                )}
                {frameDesc.length > 0 && (
                  <TableRow>
                    <TableCell>{t("frame")}</TableCell>
                    <TableCell>{frameDesc}</TableCell>
                  </TableRow>
                )}
                {junctionDesc.length > 0 && (
                  <TableRow>
                    <TableCell>{t("junctionBox")}</TableCell>
                    <TableCell>{junctionDesc}</TableCell>
                  </TableRow>
                )}
                {connDesc && (
                  <TableRow>
                    <TableCell>{t("connector")}</TableCell>
                    <TableCell>
                      {connDesc} ({connLength}mm)
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </div>

          <div>
            <h3 className="text-xl font-bold mb-4 text-emerald-700">
              {t("environmentalConditions")}
            </h3>
            <Table>
              <TableBody>
                <TableRow>
                  <TableCell>{`${t("operatingTemperature")} [°C]`}</TableCell>
                  <TableCell>
                    {temp.min} ~ {temp.max}
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>{`${t("snowLoad")} [Pa]`}</TableCell>
                  <TableCell>{snow}</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>{`${t("windLoad")} [Pa]`}</TableCell>
                  <TableCell>{wind}</TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </div>
        </div>
        {hasPowerPoints && (
          <div className="bg-background md:bg-card md:rounded-xl p-0 md:p-6 md:shadow-sm overflow-x-auto">
            <h3 className="text-xl font-bold mb-4 text-emerald-700">
              {t("electricalSpecifications")}
            </h3>
            <p className="text-sm text-gray-500 mb-4">{t("standardTestConditions")}</p>
            <Table className="w-full">
              <TableHeader>
                <TableRow className="border-b">
                  <TableHead className="text-left w-1/3 md:w-1/4 font-bold">{t("model")}</TableHead>
                  {points?.map((point) => (
                    <TableHead key={point.id} className="text-center font-bold">
                      {point.pmax}W
                    </TableHead>
                  ))}
                </TableRow>
              </TableHeader>
              <TableBody>
                <TableRow>
                  <TableCell className="font-medium">{`${t("maxPower")} (Pmax) [W]`}</TableCell>
                  {points?.map((point) => (
                    <TableCell key={point.id} className="text-center">
                      {point.pmax}
                    </TableCell>
                  ))}
                </TableRow>

                <TableRow>
                  <TableCell className="font-medium">
                    {`${t("openCircuitVoltage")} (Voc) [V]`}
                  </TableCell>
                  {points?.map((point) => (
                    <TableCell key={point.id} className="text-center">
                      {point.voc.toFixed(2)}
                    </TableCell>
                  ))}
                </TableRow>

                <TableRow>
                  <TableCell className="font-medium">
                    {`${t("maximumPowerPointVoltage")} (Vmp) [V]`}
                  </TableCell>
                  {points?.map((point) => (
                    <TableCell key={point.id} className="text-center">
                      {point.vmp.toFixed(2)}
                    </TableCell>
                  ))}
                </TableRow>

                <TableRow>
                  <TableCell className="font-medium">
                    {`${t("shortCircuitCurrent")} (Isc) [A]`}
                  </TableCell>
                  {points?.map((point) => (
                    <TableCell key={point.id} className="text-center">
                      {point.isc.toFixed(2)}
                    </TableCell>
                  ))}
                </TableRow>

                <TableRow>
                  <TableCell className="font-medium">
                    {`${t("maximumPowerPointCurrent")} (Imp) [A]`}
                  </TableCell>
                  {points?.map((point) => (
                    <TableCell key={point.id} className="text-center">
                      {point.imp.toFixed(2)}
                    </TableCell>
                  ))}
                </TableRow>

                <TableRow>
                  <TableCell className="font-medium">{`${t("moduleEfficiency")} [%]`}</TableCell>
                  {points?.map((point) => (
                    <TableCell key={point.id} className="text-center">
                      {point.efficiency?.toFixed(1)}
                    </TableCell>
                  ))}
                </TableRow>

                {tolerance && (
                  <TableRow>
                    <TableCell className="font-medium">{`${t("powerTolerance")} [W]`}</TableCell>
                    <TableCell colSpan={points?.length} className="text-center">
                      {tolerance?.min} ~ {tolerance?.max}
                    </TableCell>
                  </TableRow>
                )}

                <TableRow>
                  <TableCell className="font-medium">
                    {`${t("shortCircuitCurrentTemperatureCoefficient")} (α_Isc)`}
                  </TableCell>
                  <TableCell colSpan={points?.length} className="text-center">
                    {tempCo.isc}%/°C
                  </TableCell>
                </TableRow>

                <TableRow>
                  <TableCell className="font-medium">
                    {`${t("openCircuitVoltageTemperatureCoefficient")} (β_Voc)`}
                  </TableCell>
                  <TableCell colSpan={points?.length} className="text-center">
                    {tempCo.voc}%/°C
                  </TableCell>
                </TableRow>

                <TableRow>
                  <TableCell className="font-medium">
                    {`${t("maximumPowerTemperatureCoefficient")} (γ_Pmp)`}
                  </TableCell>
                  <TableCell colSpan={points?.length} className="text-center">
                    {tempCo.pmax}%/°C
                  </TableCell>
                </TableRow>

                <TableRow>
                  <TableCell className="font-medium">{t("noct")}</TableCell>
                  <TableCell colSpan={points?.length} className="text-center">
                    {tempCo.noct}±2°C
                  </TableCell>
                </TableRow>

                <TableRow>
                  <TableCell className="font-medium">
                    {`${t("maximumSystemVoltage")} [V]`}
                  </TableCell>
                  <TableCell colSpan={points?.length} className="text-center">
                    {ratings.voltage}
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell className="font-medium">
                    {`${t("maximumSeriesFuseRating")} [A]`}
                  </TableCell>
                  <TableCell colSpan={points?.length} className="text-center">
                    {ratings.fuse}
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell className="font-medium">{t("fireRating")}</TableCell>
                  <TableCell colSpan={points?.length} className="text-center">
                    {ratings.fire}
                  </TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </div>
        )}
      </div>
    </section>
  );
};
