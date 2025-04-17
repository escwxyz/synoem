import { atom } from "nanostores";

export type FilterMetadata = {
  // Solar Panels
  cellTypes?: string[];
  powerRange?: { min: number; max: number };
  efficiencyRange?: { min: number; max: number };

  // Pump Controllers
  types?: string[];
  voltageRange?: { min: number; max: number };
  currentRange?: { min: number; max: number };
} | null;

export const filterMetadataStore = atom<FilterMetadata>({});
export const cellTypeStore = atom<string[]>([]);
export const powerMinStore = atom<number>(0);
export const powerMaxStore = atom<number>(1000);
export const efficiencyMinStore = atom<number>(0);
export const efficiencyMaxStore = atom<number>(100);
export const sortStore = atom<string>("featured");
export const pageStore = atom<number>(1);
export const filteredProductsCountStore = atom<number>(0);

export function syncFiltersToUrl() {
  if (typeof window === "undefined") return;

  const url = new URL(window.location.href);

  for (const param of [
    "cellType",
    "powerMin",
    "powerMax",
    "efficiencyMin",
    "efficiencyMax",
    "sort",
    "page",
  ]) {
    url.searchParams.delete(param);
  }

  const cellType = cellTypeStore.get();
  if (cellType && cellType.length > 0) {
    for (const type of cellType) {
      url.searchParams.append("cellType", type);
    }
  }

  const powerMin = powerMinStore.get();
  if (powerMin !== undefined && powerMin > 0) {
    url.searchParams.set("powerMin", powerMin.toString());
  }

  const powerMax = powerMaxStore.get();
  if (powerMax !== undefined) {
    url.searchParams.set("powerMax", powerMax.toString());
  }

  const efficiencyMin = efficiencyMinStore.get();
  if (efficiencyMin !== undefined && efficiencyMin > 0) {
    url.searchParams.set("efficiencyMin", efficiencyMin.toString());
  }

  const efficiencyMax = efficiencyMaxStore.get();
  if (efficiencyMax !== undefined) {
    url.searchParams.set("efficiencyMax", efficiencyMax.toString());
  }

  const sort = sortStore.get();
  if (sort !== "featured") {
    url.searchParams.set("sort", sort);
  }

  const page = pageStore.get();
  if (page !== 1) {
    url.searchParams.set("page", page.toString());
  }

  window.history.pushState({}, "", url.toString());
}

export function syncFiltersFromUrl() {
  if (typeof window === "undefined") return;

  const url = new URL(window.location.href);

  const cellType = url.searchParams.getAll("cellType");
  if (cellType.length) cellTypeStore.set(cellType);

  const powerMin = url.searchParams.get("powerMin");
  if (powerMin) powerMinStore.set(Number(powerMin));

  const powerMax = url.searchParams.get("powerMax");
  if (powerMax) powerMaxStore.set(Number(powerMax));

  const efficiencyMin = url.searchParams.get("efficiencyMin");
  if (efficiencyMin) efficiencyMinStore.set(Number(efficiencyMin));

  const efficiencyMax = url.searchParams.get("efficiencyMax");
  if (efficiencyMax) efficiencyMaxStore.set(Number(efficiencyMax));

  const sort = url.searchParams.get("sort");
  if (sort) sortStore.set(sort);

  const page = url.searchParams.get("page");
  if (page) pageStore.set(Number(page));
}

export function initializeFilters(
  // biome-ignore lint/suspicious/noExplicitAny: <explanation>
  initialFilters: Record<string, any>,
  metadata?: FilterMetadata,
) {
  if (metadata) {
    filterMetadataStore.set(metadata);
  }

  if (initialFilters.cellType) {
    cellTypeStore.set(
      Array.isArray(initialFilters.cellType) ? initialFilters.cellType : [initialFilters.cellType],
    );
  }

  if (initialFilters.powerMin) {
    powerMinStore.set(Number(initialFilters.powerMin));
  } else if (metadata?.powerRange?.min !== undefined) {
    powerMinStore.set(metadata.powerRange.min);
  }

  if (initialFilters.powerMax) {
    powerMaxStore.set(Number(initialFilters.powerMax));
  } else if (metadata?.powerRange?.max !== undefined) {
    powerMaxStore.set(metadata.powerRange.max);
  }

  if (initialFilters.efficiencyMin) {
    efficiencyMinStore.set(Number(initialFilters.efficiencyMin));
  } else if (metadata?.efficiencyRange?.min !== undefined) {
    efficiencyMinStore.set(metadata.efficiencyRange.min);
  }

  if (initialFilters.efficiencyMax) {
    efficiencyMaxStore.set(Number(initialFilters.efficiencyMax));
  } else if (metadata?.efficiencyRange?.max !== undefined) {
    efficiencyMaxStore.set(metadata.efficiencyRange.max);
  }

  if (initialFilters.sort) {
    sortStore.set(initialFilters.sort as string);
  }

  if (initialFilters.page) {
    pageStore.set(Number(initialFilters.page));
  }
}

export interface FilterState {
  cellType?: string[];
  powerMin?: number;
  powerMax?: number;
  efficiencyMin?: number;
  efficiencyMax?: number;
  sort?: string;
  page?: string;
  type?: string[];
  voltageMin?: number;
  voltageMax?: number;
  currentMin?: number;
  currentMax?: number;
}

export const filterStateStore = atom<FilterState>({});
