"use client";

import type { SolarPanel, PumpController } from "@synoem/types";
import { useAtomValue } from "jotai";
import { useEffect } from "react";
import { ProductModelViewer } from "./product-model-viewer.client";
import { productModelViewAtom } from "~/atoms";

export const ProductHeroModel = ({
  three,
}: { three: SolarPanel["three"] | PumpController["three"] }) => {
  const galleryModelActive = useAtomValue(productModelViewAtom);

  useEffect(() => {
    const heroModelElement = document.querySelector("#product-hero-model");

    if (!heroModelElement) return;

    updateModelVisibility(heroModelElement as HTMLElement, galleryModelActive);

    return () => {};
  }, [galleryModelActive]);

  return (
    <div id="product-hero-model" className="h-full">
      {three && <ProductModelViewer three={three} className="h-full" />}
    </div>
  );
};

function updateModelVisibility(element: HTMLElement, isGalleryActive: boolean) {
  if (isGalleryActive) {
    element.style.visibility = "hidden";
    element.style.opacity = "0";
  } else {
    element.style.visibility = "visible";
    element.style.opacity = "1";

    const event = new CustomEvent("hero-model-restore");
    window.dispatchEvent(event);
  }
}
