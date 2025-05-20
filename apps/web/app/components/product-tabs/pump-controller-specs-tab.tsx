import type { PumpController } from "@synoem/types";
import { Table, TableBody, TableCell, TableRow } from "@synoem/ui/components/table";

interface Props {
  pumpController: PumpController;
}

export const PumpControllerSpecificationsTab = ({ pumpController }: Props) => {
  const { maxCurrent, maxPower, wideAmplitudeVoltage, maxPressure, tempRange } = pumpController;

  //   const hasDimensions = false
  // dimensions?.w && dimensions?.h && dimensions?.d && dimensions?.unit;

  //   const hasWeight =  false;
  //   weight?.value && weight?.unit;

  return (
    <section>
      <div className="grid grid-cols-1 gap-8">
        <div className="bg-background md:bg-card md:rounded-xl p-0 md:p-6 shadow-sm grid grid-cols-1 md:grid-cols-2 gap-8">
          <div>
            <Table>
              <TableBody>
                {/* {hasDimensions && (
                  <TableRow>
                    <TableCell>Dimensions ({dimensions.unit})</TableCell>
                    <TableCell>
                      {dimensions.h} x {dimensions.w} x {dimensions.d}
                    </TableCell>
                  </TableRow>
                )}
                {hasWeight && (
                  <TableRow>
                    <TableCell>Weight ({weight.unit})</TableCell>
                    <TableCell>{weight.value}</TableCell>
                  </TableRow>
                )} */}
                <TableRow>
                  <TableCell>Max Voltage [V]</TableCell>
                  <TableCell>
                    `${wideAmplitudeVoltage.min} ~ ${wideAmplitudeVoltage.max}`
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>Max Current [A]</TableCell>
                  <TableCell>{maxCurrent}</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>Max Power [kW]</TableCell>
                  <TableCell>{maxPower}</TableCell>
                </TableRow>

                <TableRow>
                  <TableCell>Max Pressure [bar]</TableCell>
                  <TableCell>{maxPressure}</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>Temperature Range [°C]</TableCell>
                  <TableCell>
                    {tempRange.min} ~ {tempRange.max}
                  </TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </div>
        </div>
      </div>
    </section>
  );
};
