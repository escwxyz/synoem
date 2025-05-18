// import type {
//   Product,
//   PumpControllerBlockType,
//   SolarPanelBlockType,
// } from "@synoem/payload/payload-types";

// export function buildProductFilterMetadata(
//   products: Pick<Product, "category" | "solarPanel" | "pumpController">[],
// ) {
//   const solarPanels = products.filter(
//     (p) => p.category === "solar-panels" && Array.isArray(p.solarPanel) && p.solarPanel.length > 0,
//   );

//   const pumpControllers = products.filter(
//     (p) =>
//       p.category === "pump-controllers" &&
//       Array.isArray(p.pumpController) &&
//       p.pumpController.length > 0,
//   );

//   return {
//     "solar-panels": buildSolarPanelMetadata(solarPanels),
//     "pump-controllers": buildPumpControllerMetadata(pumpControllers),
//   };
// }

// function buildPumpControllerMetadata(products: Pick<Product, "category" | "pumpController">[]) {
//   const pumpControllerBlocks = products
//     .map((p) => p.pumpController?.[0])
//     .filter((block): block is PumpControllerBlockType => !!block);

//   const types = [
//     ...new Set(pumpControllerBlocks.filter((block) => block.type).map((block) => block.type)),
//   ].filter(Boolean);

//   const voltageValues = pumpControllerBlocks
//     .filter((block) => block.maxVoltage !== undefined)
//     .map((block) => Number(block.maxVoltage))
//     .filter((val) => !Number.isNaN(val));

//   const voltageRange =
//     voltageValues.length > 0
//       ? {
//           min: Math.min(...voltageValues),
//           max: Math.max(...voltageValues),
//         }
//       : { min: 0, max: 0 };

//   const currentValues = pumpControllerBlocks
//     .filter((block) => block.maxCurrent !== undefined)
//     .map((block) => Number(block.maxCurrent))
//     .filter((val) => !Number.isNaN(val));

//   const currentRange =
//     currentValues.length > 0
//       ? {
//           min: Math.min(...currentValues),
//           max: Math.max(...currentValues),
//         }
//       : { min: 0, max: 0 };

//   return {
//     types,
//     voltageRange,
//     currentRange,
//   };
// }

// function buildSolarPanelMetadata(products: Pick<Product, "category" | "solarPanel">[]) {
//   const solarPanelBlocks = products
//     .map((p) => p.solarPanel?.[0])
//     .filter((block): block is SolarPanelBlockType => !!block);

//   const cellTypes = [
//     ...new Set(
//       solarPanelBlocks
//         .filter(
//           (block): block is SolarPanelBlockType & { type: string } =>
//             typeof block.type === "string" && block.type.trim() !== "",
//         )
//         .map((block) => block.type),
//     ),
//   ];

//   const powerValues = solarPanelBlocks
//     .map((block) => {
//       if (block.power?.min === undefined || block.power?.max === undefined) {
//         return null;
//       }
//       const min = Number(block.power.min);
//       const max = Number(block.power.max);
//       return !Number.isNaN(min) && !Number.isNaN(max) ? { min, max } : null;
//     })
//     .filter((range): range is { min: number; max: number } => range !== null);

//   const powerRange =
//     powerValues.length > 0
//       ? {
//           min: Math.min(...powerValues.map((v) => v.min)),
//           max: Math.max(...powerValues.map((v) => v.max)),
//         }
//       : { min: 0, max: 0 };

//   const efficiencyValues = solarPanelBlocks
//     .filter((block) => Array.isArray(block.power?.points))
//     .flatMap((block) =>
//       (block.power.points || [])
//         .map((point) => {
//           const value = Number(point.efficiency);
//           return Number.isNaN(value) ? null : value;
//         })
//         .filter((val): val is number => val !== null),
//     );

//   const efficiencyRange =
//     efficiencyValues.length > 0
//       ? {
//           min: Math.min(...efficiencyValues),
//           max: Math.max(...efficiencyValues),
//         }
//       : { min: 0, max: 0 };

//   return {
//     cellTypes,
//     powerRange,
//     efficiencyRange,
//   };
// }

// export function buildQueryConditions(category: Product["category"], params: URLSearchParams) {
//   // biome-ignore lint/suspicious/noExplicitAny: <explanation>
//   const andConditions: any[] = [{ category: { equals: category } }];

//   if (category === "solar-panels") {
//     const cellTypes = params.getAll("cellType");
//     if (cellTypes.length > 0) {
//       andConditions.push({
//         "solarPanel.cell.type": { in: cellTypes },
//       });
//     }

//     const powerMin = params.get("powerMin") ? Number(params.get("powerMin")) : undefined;
//     const powerMax = params.get("powerMax") ? Number(params.get("powerMax")) : undefined;

//     if (powerMin !== undefined) {
//       andConditions.push({
//         "solarPanel.power.max": { greater_than_equal: powerMin },
//       });
//     }
//     if (powerMax !== undefined) {
//       andConditions.push({
//         "solarPanel.power.min": { less_than_equal: powerMax },
//       });
//     }

//     const efficiencyMin = params.get("efficiencyMin")
//       ? Number(params.get("efficiencyMin"))
//       : undefined;
//     const efficiencyMax = params.get("efficiencyMax")
//       ? Number(params.get("efficiencyMax"))
//       : undefined;

//     if (efficiencyMin !== undefined) {
//       andConditions.push({
//         "solarPanel.power.points.efficiency": { greater_than_equal: efficiencyMin },
//       });
//     }
//     if (efficiencyMax !== undefined) {
//       andConditions.push({
//         "solarPanel.power.points.efficiency": { less_than_equal: efficiencyMax },
//       });
//     }
//   } else if (category === "pump-controllers") {
//     const controllerTypes = params.getAll("type");
//     if (controllerTypes.length > 0) {
//       andConditions.push({
//         "pumpController.type": { in: controllerTypes },
//       });
//     }

//     const voltageMin = params.get("voltageMin") ? Number(params.get("voltageMin")) : undefined;
//     const voltageMax = params.get("voltageMax") ? Number(params.get("voltageMax")) : undefined;

//     if (voltageMin !== undefined) {
//       andConditions.push({
//         "pumpController.maxVoltage": { greater_than_equal: voltageMin },
//       });
//     }
//     if (voltageMax !== undefined) {
//       andConditions.push({
//         "pumpController.maxVoltage": { less_than_equal: voltageMax },
//       });
//     }

//     const currentMin = params.get("currentMin") ? Number(params.get("currentMin")) : undefined;
//     const currentMax = params.get("currentMax") ? Number(params.get("currentMax")) : undefined;

//     if (currentMin !== undefined) {
//       andConditions.push({
//         "pumpController.maxCurrent": { greater_than_equal: currentMin },
//       });
//     }
//     if (currentMax !== undefined) {
//       andConditions.push({
//         "pumpController.maxCurrent": { less_than_equal: currentMax },
//       });
//     }
//   }

//   return andConditions;
// }

// function getSelectFieldsByType({ productCategory }: { productCategory: Product["category"] }) {
//   switch (productCategory) {
//     case "solar-panels":
//       return {
//         solarPanel: {
//           type: true,
//           power: {
//             min: true,
//             max: true,
//             points: {
//               efficiency: true,
//             },
//           },
//         },
//       };
//     case "pump-controllers":
//       return {
//         pumpController: {
//           type: true,
//           maxVoltage: true,
//           maxCurrent: true,
//         },
//       };

//     default:
//       return {};
//   }
// }

// // 构建产品类型特定的过滤条件
// function buildFilterConditionsByType({
//   productCategory,
//   params,
// }: { productCategory: Product["category"]; params: URLSearchParams }) {
//   const andConditions = [];

//   switch (productCategory) {
//     case "solar-panels": {
//       const cellTypes = params.getAll("cellType");
//       if (cellTypes.length > 0) {
//         andConditions.push({
//           "cell.type": { in: cellTypes },
//         });
//       }

//       const powerMin = params.get("powerMin") ? Number(params.get("powerMin")) : undefined;
//       const powerMax = params.get("powerMax") ? Number(params.get("powerMax")) : undefined;

//       if (powerMin !== undefined) {
//         andConditions.push({ "powerRange.max": { greater_than_equal: powerMin } });
//       }
//       if (powerMax !== undefined) {
//         andConditions.push({ "powerRange.min": { less_than_equal: powerMax } });
//       }

//       // 效率过滤条件
//       // ...
//       break;
//     }

//     case "pump-controllers": {
//       const controllerTypes = params.getAll("type");
//       if (controllerTypes.length > 0) {
//         andConditions.push({ type: { in: controllerTypes } });
//       }

//       // 电压和电流过滤条件
//       // ...
//       break;
//     }

//     // 添加其他产品类型的过滤条件
//   }

//   return andConditions;
// }
