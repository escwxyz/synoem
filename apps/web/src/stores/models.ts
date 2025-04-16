import { atom } from "jotai";
import type { Animation } from "~/types/animation";

export type Model3D = {
  id: string;
  url: string;
  position: [number, number, number];
  rotation: [number, number, number];
  scale: number;
  animations: Animation[];
};

export const modelsAtom = atom<Model3D[]>([]);

export const addModelAtom = atom(null, (get, set, model: Model3D) => {
  const models = get(modelsAtom);
  set(modelsAtom, [...models, model]);
});

export const removeModelAtom = atom(null, (get, set, id: string) => {
  const models = get(modelsAtom);
  set(
    modelsAtom,
    models.filter((model) => model.id !== id),
  );
});

export const clearModelsAtom = atom(null, (_, set) => set(modelsAtom, []));
