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

export const isInitializedStore = atom<boolean>(false);

export const filterMetadataStore = atom<FilterMetadata>({});
// Solar Panels
export const cellTypeStore = atom<string[]>([]);
export const powerMinStore = atom<number>(0);
export const powerMaxStore = atom<number>(1000);
export const efficiencyMinStore = atom<number>(0);
export const efficiencyMaxStore = atom<number>(100);
// Pump Controllers
export const typeStore = atom<string[]>([]);
export const voltageMinStore = atom<number>(0);
export const voltageMaxStore = atom<number>(1000);
// export const currentMinStore = atom<number>(0);
// export const currentMaxStore = atom<number>(1000);
// Common
// export const sortStore = atom<string>("featured");
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
    "type",
    "voltageMin",
    "voltageMax",
    // "currentMin",
    // "currentMax",
  ]) {
    url.searchParams.delete(param);
  }

  const cellType = cellTypeStore.get();
  const availableCellTypes = filterMetadataStore.get()?.cellTypes || [];

  if (cellType && cellType.length > 0 && cellType.length < availableCellTypes.length) {
    for (const type of cellType) {
      url.searchParams.append("cellType", type);
    }
  }

  const types = typeStore.get();
  const availableTypes = filterMetadataStore.get()?.types || [];

  if (types && types.length > 0 && types.length < availableTypes.length) {
    for (const type of types) {
      url.searchParams.append("type", type);
    }
  }

  const powerMin = powerMinStore.get();
  const defaultPowerMin = filterMetadataStore.get()?.powerRange?.min || 0;
  if (powerMin !== undefined && powerMin > defaultPowerMin) {
    url.searchParams.set("powerMin", powerMin.toString());
  }

  const powerMax = powerMaxStore.get();
  const defaultPowerMax = filterMetadataStore.get()?.powerRange?.max || 1000;
  if (powerMax !== undefined && powerMax < defaultPowerMax) {
    url.searchParams.set("powerMax", powerMax.toString());
  }

  const efficiencyMin = efficiencyMinStore.get();
  const defaultEfficiencyMin = filterMetadataStore.get()?.efficiencyRange?.min || 0;
  if (efficiencyMin !== undefined && efficiencyMin > defaultEfficiencyMin) {
    url.searchParams.set("efficiencyMin", efficiencyMin.toString());
  }

  const efficiencyMax = efficiencyMaxStore.get();
  const defaultEfficiencyMax = filterMetadataStore.get()?.efficiencyRange?.max || 100;
  if (efficiencyMax !== undefined && efficiencyMax < defaultEfficiencyMax) {
    url.searchParams.set("efficiencyMax", efficiencyMax.toString());
  }

  const voltageMin = voltageMinStore.get();
  const defaultVoltageMin = filterMetadataStore.get()?.voltageRange?.min || 0;
  if (voltageMin !== undefined && voltageMin > defaultVoltageMin) {
    url.searchParams.set("voltageMin", voltageMin.toString());
  }

  const voltageMax = voltageMaxStore.get();
  const defaultVoltageMax = filterMetadataStore.get()?.voltageRange?.max || 1000;
  if (voltageMax !== undefined && voltageMax < defaultVoltageMax) {
    url.searchParams.set("voltageMax", voltageMax.toString());
  }

  // const sort = sortStore.get();
  // if (sort !== "featured") {
  //   url.searchParams.set("sort", sort);
  // }

  const page = pageStore.get();
  if (page !== 1) {
    url.searchParams.set("page", page.toString());
  }

  window.history.pushState({}, "", url.toString());
}

export function syncFiltersFromUrl() {
  if (typeof window === "undefined") return;

  const url = new URL(window.location.href);
  const metadata = filterMetadataStore.get();

  const cellType = url.searchParams.getAll("cellType");
  if (cellType.length) {
    cellTypeStore.set(cellType);
  } else if (metadata?.cellTypes && metadata.cellTypes.length > 0) {
    cellTypeStore.set([...metadata.cellTypes]);
  }

  const powerMin = url.searchParams.get("powerMin");
  if (powerMin) powerMinStore.set(Number(powerMin));

  const powerMax = url.searchParams.get("powerMax");
  if (powerMax) powerMaxStore.set(Number(powerMax));

  const efficiencyMin = url.searchParams.get("efficiencyMin");
  if (efficiencyMin) efficiencyMinStore.set(Number(efficiencyMin));

  const efficiencyMax = url.searchParams.get("efficiencyMax");
  if (efficiencyMax) efficiencyMaxStore.set(Number(efficiencyMax));

  const types = url.searchParams.getAll("type");
  if (types.length) {
    typeStore.set(types);
  } else if (metadata?.types && metadata.types.length > 0) {
    typeStore.set([...metadata.types]);
  }

  const voltageMin = url.searchParams.get("voltageMin");
  if (voltageMin) voltageMinStore.set(Number(voltageMin));

  const voltageMax = url.searchParams.get("voltageMax");
  if (voltageMax) voltageMaxStore.set(Number(voltageMax));

  // const sort = url.searchParams.get("sort");
  // if (sort) sortStore.set(sort);

  const page = url.searchParams.get("page");
  if (page) pageStore.set(Number(page));
}

export function initializeFilters(
  // biome-ignore lint/suspicious/noExplicitAny: <explanation>
  initialFilters: Record<string, any>,
  metadata?: FilterMetadata,
) {
  if (isInitializedStore.get()) {
    console.log("Filters already initialized, skipping");
    return;
  }

  console.log("Initializing filters for the first time");

  if (metadata) {
    filterMetadataStore.set(metadata);
  }

  if (initialFilters.cellType) {
    cellTypeStore.set(
      Array.isArray(initialFilters.cellType) ? initialFilters.cellType : [initialFilters.cellType],
    );
  } else if (metadata?.cellTypes) {
    cellTypeStore.set([...metadata.cellTypes]);
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

  if (initialFilters.type) {
    typeStore.set(Array.isArray(initialFilters.type) ? initialFilters.type : [initialFilters.type]);
  } else if (metadata?.types) {
    typeStore.set([...metadata.types]);
  }

  if (initialFilters.voltageMin) {
    voltageMinStore.set(Number(initialFilters.voltageMin));
  } else if (metadata?.voltageRange?.min !== undefined) {
    voltageMinStore.set(metadata.voltageRange.min);
  }

  if (initialFilters.voltageMax) {
    voltageMaxStore.set(Number(initialFilters.voltageMax));
  } else if (metadata?.voltageRange?.max !== undefined) {
    voltageMaxStore.set(metadata.voltageRange.max);
  }

  // if (initialFilters.currentMin) {
  //   currentMinStore.set(Number(initialFilters.currentMin));
  // } else if (metadata?.currentRange?.min !== undefined) {
  //   currentMinStore.set(metadata.currentRange.min);
  // }

  // if (initialFilters.currentMax) {
  //   currentMaxStore.set(Number(initialFilters.currentMax));
  // } else if (metadata?.currentRange?.max !== undefined) {
  //   currentMaxStore.set(metadata.currentRange.max);
  // }

  // if (initialFilters.sort) {
  //   sortStore.set(initialFilters.sort as string);
  // }

  if (initialFilters.page) {
    pageStore.set(Number(initialFilters.page));
  }

  isInitializedStore.set(true);
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
