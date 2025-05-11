import type { GroupField } from "payload";
import { createQuantityGroup } from "./unit";

export const createMoqGroup = (): GroupField =>
  createQuantityGroup("moq", "Minimum Order Quantity");
