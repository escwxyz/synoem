// import { PRODUCT_CATEGORIES } from "@synoem/config";
// import type { Product } from "@synoem/payload/payload-types";

// export const getRelatedProducts = (
//   currentProduct: Product,
//   allProducts: Product[],
//   maxProducts = 6,
// ): Product[] => {
//   const otherProducts = allProducts.filter((p) => p.id !== currentProduct.id);

//   const sameCategoryProducts = otherProducts.filter((p) => p.category === currentProduct.category);

//   if (sameCategoryProducts.length === 0) {
//     return [];
//   }

//   let scoredProducts: { product: Product; score: number }[] = [];

//   if (currentProduct.category === PRODUCT_CATEGORIES.solarPanel.pluralSlug) {
//     scoredProducts = getScoredSolarPanels(currentProduct, sameCategoryProducts);
//   } else if (currentProduct.category === PRODUCT_CATEGORIES.pumpController.pluralSlug) {
//     scoredProducts = getScoredPumpControllers(currentProduct, sameCategoryProducts);
//   }

//   scoredProducts.sort((a, b) => {
//     if (b.score !== a.score) {
//       return b.score - a.score;
//     }

//     const dateA = new Date(a.product.createdAt);
//     const dateB = new Date(b.product.createdAt);
//     return dateB.getTime() - dateA.getTime();
//   });

//   return scoredProducts.slice(0, maxProducts).map((item) => item.product);
// };

// function getScoredSolarPanels(
//   currentProduct: Product,
//   products: Product[],
// ): { product: Product; score: number }[] {
//   const currentSolarPanel = currentProduct.solarPanel?.[0];

//   if (!currentSolarPanel) {
//     return products.map((p) => ({ product: p, score: 0 }));
//   }

//   return products.map((product) => {
//     const solarPanel = product.solarPanel?.[0];

//     if (!solarPanel) {
//       return { product, score: 0 };
//     }

//     let score = 0;

//     if (solarPanel.type === currentSolarPanel.type) {
//       score += 10;
//     }

//     if (currentProduct.dimensions && product.dimensions) {
//       const currentArea = (currentProduct.dimensions.w || 0) * (currentProduct.dimensions.h || 0);
//       const productArea = (product.dimensions.w || 0) * (product.dimensions.h || 0);

//       if (currentArea > 0 && productArea > 0) {
//         const areaDiffPercentage = Math.abs(currentArea - productArea) / currentArea;

//         if (areaDiffPercentage <= 0.1) {
//           score += 5;
//         } else if (areaDiffPercentage <= 0.2) {
//           score += 3;
//         } else if (areaDiffPercentage <= 0.3) {
//           score += 1;
//         }
//       }
//     }

//     if (currentSolarPanel.power && solarPanel.power) {
//       const currentPower =
//         (Number(currentSolarPanel.power.min) + Number(currentSolarPanel.power.max)) / 2;
//       const power = (Number(solarPanel.power.min) + Number(solarPanel.power.max)) / 2;

//       if (!Number.isNaN(currentPower) && !Number.isNaN(power) && currentPower > 0) {
//         const powerDiffPercentage = Math.abs(currentPower - power) / currentPower;

//         if (powerDiffPercentage <= 0.1) {
//           score += 3;
//         } else if (powerDiffPercentage <= 0.2) {
//           score += 2;
//         } else if (powerDiffPercentage <= 0.3) {
//           score += 1;
//         }
//       }
//     }

//     return { product, score };
//   });
// }

// function getScoredPumpControllers(
//   currentProduct: Product,
//   products: Product[],
// ): { product: Product; score: number }[] {
//   const currentController = currentProduct.pumpController?.[0];

//   if (!currentController) {
//     return products.map((p) => ({ product: p, score: 0 }));
//   }

//   return products.map((product) => {
//     const controller = product.pumpController?.[0];

//     if (!controller) {
//       return { product, score: 0 };
//     }

//     let score = 0;

//     // 相同类型得高分
//     if (controller.type === currentController.type) {
//       score += 10;
//     }

//     if (
//       currentController.maxVoltage !== undefined &&
//       currentController.maxCurrent !== undefined &&
//       controller.maxVoltage !== undefined &&
//       controller.maxCurrent !== undefined
//     ) {
//       const currentMaxPower =
//         Number(currentController.maxVoltage) * Number(currentController.maxCurrent);
//       const maxPower = Number(controller.maxVoltage) * Number(controller.maxCurrent);

//       if (!Number.isNaN(currentMaxPower) && !Number.isNaN(maxPower) && currentMaxPower > 0) {
//         const powerDiffPercentage = Math.abs(currentMaxPower - maxPower) / currentMaxPower;

//         if (powerDiffPercentage <= 0.1) {
//           score += 5;
//         } else if (powerDiffPercentage <= 0.2) {
//           score += 3;
//         } else if (powerDiffPercentage <= 0.3) {
//           score += 1;
//         }
//       }
//     }

//     return { product, score };
//   });
// }
