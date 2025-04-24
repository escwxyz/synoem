import type { Locale } from "@synoem/config";
import type { Product } from "@synoem/payload/payload-types";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@synoem/ui/components/table";
import { useTranslations } from "~/i18n/utils";
import { isSolarPanel } from "~/utils/check-product-type";

interface Props {
  product: Product;
  locale: Locale;
}

export const SolarPanelSpecificationsTab = ({ product, locale }: Props) => {
  const { solarPanel, dimensions, weight } = product;

  if (!isSolarPanel(product)) {
    console.error("Solar panel data is not populated");
    return null;
  }

  const hasDimensions =
    dimensions?.w && dimensions.h && dimensions.d && dimensions.unit;

  const hasWeight = weight?.value && weight?.unit;

  // biome-ignore lint/style/noNonNullAssertion: <explanation>
  const solarPanelData = solarPanel![0];

  const {
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
  } = solarPanelData;

  const hasPowerPoints = power.points && power.points.length > 0;

  const { points } = power;

  const { t } = useTranslations(locale);

  return (
    <section>
      <div className="grid grid-cols-1 gap-8">
        <div className="bg-background rounded-xl p-6 shadow-sm grid grid-cols-1 md:grid-cols-2 gap-8">
          <div>
            <h3 className="text-xl font-bold mb-4 text-emerald-700">
              {t(
                "Component.SolarPanelSpecificationsTab.physicalSpecifications",
              )}
            </h3>
            <Table>
              <TableBody>
                {hasDimensions && (
                  <TableRow>
                    <TableCell>
                      {t("Component.SolarPanelSpecificationsTab.dimensions")}
                    </TableCell>
                    <TableCell>
                      {dimensions.h} x {dimensions.w} x {dimensions.d} (
                      {dimensions.unit})
                    </TableCell>
                  </TableRow>
                )}
                {hasWeight && (
                  <TableRow>
                    <TableCell>
                      {t("Component.SolarPanelSpecificationsTab.weight")}
                    </TableCell>
                    <TableCell>
                      {weight.value} {weight.unit?.toUpperCase()}
                    </TableCell>
                  </TableRow>
                )}
                {cellDesc.length > 0 && (
                  <>
                    <TableRow>
                      <TableCell>
                        {t("Component.SolarPanelSpecificationsTab.cellType")}
                      </TableCell>
                      <TableCell>{cellDesc}</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell>
                        {t("Component.SolarPanelSpecificationsTab.cellNumber")}
                      </TableCell>
                      <TableCell>
                        {cellCount} ({cellLength} x {cellWidth} mm)
                      </TableCell>
                    </TableRow>
                  </>
                )}
                {glassDesc.length > 0 && (
                  <>
                    <TableRow>
                      <TableCell>
                        {t("Component.SolarPanelSpecificationsTab.glass")}
                      </TableCell>
                      <TableCell>{glassDesc}</TableCell>
                    </TableRow>
                    {glassType === "bifacial" && (
                      <TableRow>
                        <TableCell>
                          {t(
                            "Component.SolarPanelSpecificationsTab.bifaciality",
                          )}
                        </TableCell>
                        <TableCell>{bifaciality}%</TableCell>
                      </TableRow>
                    )}
                  </>
                )}
                {frameDesc.length > 0 && (
                  <TableRow>
                    <TableCell>
                      {t("Component.SolarPanelSpecificationsTab.frame")}
                    </TableCell>
                    <TableCell>{frameDesc}</TableCell>
                  </TableRow>
                )}
                {junctionDesc.length > 0 && (
                  <TableRow>
                    <TableCell>
                      {t("Component.SolarPanelSpecificationsTab.junctionBox")}
                    </TableCell>
                    <TableCell>{junctionDesc}</TableCell>
                  </TableRow>
                )}
                {connDesc && (
                  <TableRow>
                    <TableCell>
                      {t("Component.SolarPanelSpecificationsTab.connector")}
                    </TableCell>
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
              {t(
                "Component.SolarPanelSpecificationsTab.environmentalConditions",
              )}
            </h3>
            <Table>
              <TableBody>
                <TableRow>
                  <TableCell>
                    {`${t(
                      "Component.SolarPanelSpecificationsTab.operatingTemperature",
                    )} [°C]`}
                  </TableCell>
                  <TableCell>
                    {temp.min} ~ {temp.max}
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>
                    {`${t(
                      "Component.SolarPanelSpecificationsTab.snowLoad",
                    )} [Pa]`}
                  </TableCell>
                  <TableCell>{snow}</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>
                    {`${t(
                      "Component.SolarPanelSpecificationsTab.windLoad",
                    )} [Pa]`}
                  </TableCell>
                  <TableCell>{wind}</TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </div>
        </div>
        {hasPowerPoints && (
          <div className="bg-background rounded-xl p-6 shadow-sm overflow-x-auto">
            <h3 className="text-xl font-bold mb-4 text-emerald-700">
              {t(
                "Component.SolarPanelSpecificationsTab.electricalSpecifications",
              )}
            </h3>
            <p className="text-sm text-gray-500 mb-4">
              {t(
                "Component.SolarPanelSpecificationsTab.standardTestConditions",
              )}
            </p>
            <Table className="w-full">
              <TableHeader>
                <TableRow className="border-b">
                  <TableHead className="text-left w-1/3 md:w-1/4 font-bold">
                    {t("Component.SolarPanelSpecificationsTab.model")}
                  </TableHead>
                  {points?.map((point) => (
                    <TableHead key={point.id} className="text-center font-bold">
                      {point.pmax}W
                    </TableHead>
                  ))}
                </TableRow>
              </TableHeader>
              <TableBody>
                <TableRow>
                  <TableCell className="font-medium">
                    {`${t(
                      "Component.SolarPanelSpecificationsTab.maxPower",
                    )} (Pmax) [W]`}
                  </TableCell>
                  {points?.map((point) => (
                    <TableCell key={point.id} className="text-center">
                      {point.pmax}
                    </TableCell>
                  ))}
                </TableRow>

                <TableRow>
                  <TableCell className="font-medium">
                    {`${t(
                      "Component.SolarPanelSpecificationsTab.openCircuitVoltage",
                    )} (Voc) [V]`}
                  </TableCell>
                  {points?.map((point) => (
                    <TableCell key={point.id} className="text-center">
                      {point.voc.toFixed(2)}
                    </TableCell>
                  ))}
                </TableRow>

                <TableRow>
                  <TableCell className="font-medium">
                    {`${t(
                      "Component.SolarPanelSpecificationsTab.maximumPowerPointVoltage",
                    )} (Vmp) [V]`}
                  </TableCell>
                  {points?.map((point) => (
                    <TableCell key={point.id} className="text-center">
                      {point.vmp.toFixed(2)}
                    </TableCell>
                  ))}
                </TableRow>

                <TableRow>
                  <TableCell className="font-medium">
                    {`${t(
                      "Component.SolarPanelSpecificationsTab.shortCircuitCurrent",
                    )} (Isc) [A]`}
                  </TableCell>
                  {points?.map((point) => (
                    <TableCell key={point.id} className="text-center">
                      {point.isc.toFixed(2)}
                    </TableCell>
                  ))}
                </TableRow>

                <TableRow>
                  <TableCell className="font-medium">
                    {`${t(
                      "Component.SolarPanelSpecificationsTab.maximumPowerPointCurrent",
                    )} (Imp) [A]`}
                  </TableCell>
                  {points?.map((point) => (
                    <TableCell key={point.id} className="text-center">
                      {point.imp.toFixed(2)}
                    </TableCell>
                  ))}
                </TableRow>

                <TableRow>
                  <TableCell className="font-medium">
                    {`${t(
                      "Component.SolarPanelSpecificationsTab.moduleEfficiency",
                    )} [%]`}
                  </TableCell>
                  {points?.map((point) => (
                    <TableCell key={point.id} className="text-center">
                      {point.efficiency?.toFixed(1)}
                    </TableCell>
                  ))}
                </TableRow>

                {tolerance && (
                  <TableRow>
                    <TableCell className="font-medium">
                      {`${t(
                        "Component.SolarPanelSpecificationsTab.powerTolerance",
                      )} [W]`}
                    </TableCell>
                    <TableCell colSpan={points?.length} className="text-center">
                      {tolerance?.min} ~ {tolerance?.max}
                    </TableCell>
                  </TableRow>
                )}

                <TableRow>
                  <TableCell className="font-medium">
                    {`${t(
                      "Component.SolarPanelSpecificationsTab.shortCircuitCurrentTemperatureCoefficient",
                    )} (α_Isc)`}
                  </TableCell>
                  <TableCell colSpan={points?.length} className="text-center">
                    {tempCo.isc}%/°C
                  </TableCell>
                </TableRow>

                <TableRow>
                  <TableCell className="font-medium">
                    {`${t(
                      "Component.SolarPanelSpecificationsTab.openCircuitVoltageTemperatureCoefficient",
                    )} (β_Voc)`}
                  </TableCell>
                  <TableCell colSpan={points?.length} className="text-center">
                    {tempCo.voc}%/°C
                  </TableCell>
                </TableRow>

                <TableRow>
                  <TableCell className="font-medium">
                    {`${t(
                      "Component.SolarPanelSpecificationsTab.maximumPowerTemperatureCoefficient",
                    )} (γ_Pmp)`}
                  </TableCell>
                  <TableCell colSpan={points?.length} className="text-center">
                    {tempCo.pmax}%/°C
                  </TableCell>
                </TableRow>

                <TableRow>
                  <TableCell className="font-medium">
                    {t("Component.SolarPanelSpecificationsTab.noct")}
                  </TableCell>
                  <TableCell colSpan={points?.length} className="text-center">
                    {tempCo.noct}±2°C
                  </TableCell>
                </TableRow>

                <TableRow>
                  <TableCell className="font-medium">
                    {`${t(
                      "Component.SolarPanelSpecificationsTab.maximumSystemVoltage",
                    )} [V]`}
                  </TableCell>
                  <TableCell colSpan={points?.length} className="text-center">
                    {ratings.voltage}
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell className="font-medium">
                    {`${t(
                      "Component.SolarPanelSpecificationsTab.maximumSeriesFuseRating",
                    )} [A]`}
                  </TableCell>
                  <TableCell colSpan={points?.length} className="text-center">
                    {ratings.fuse}
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell className="font-medium">
                    {t("Component.SolarPanelSpecificationsTab.fireRating")}
                  </TableCell>
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
