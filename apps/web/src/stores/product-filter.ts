import { atom } from "nanostores";

type FilterMetadata = {
  // Solar Panels
  cellTypes?: string[];
  powerRange?: { min: number; max: number };
  efficiencyRange?: { min: number; max: number };

  // Pump Controllers
  types?: string[];
  voltageRange?: { min: number; max: number };
  currentRange?: { min: number; max: number };
} | null;

export const filterMetadataStore = atom<FilterMetadata>(null);
