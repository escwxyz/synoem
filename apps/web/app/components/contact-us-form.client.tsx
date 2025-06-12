"use client";

import { SimpleInquiryForm } from "@/app/components/simple-inquiry-form.client";
import dynamic from "next/dynamic";
import { motion } from "motion/react";
import { useTheme } from "next-themes";
import { useMemo } from "react";
import type { GlobeConfig } from "@/app/components/globe.client";
import { useTranslations } from "next-intl";

const World = dynamic(() => import("@/app/components/globe.client").then((mod) => mod.World), {
  ssr: false,
});

export const ContactUsForm = () => {
  const { theme } = useTheme();

  const isDark = theme === "dark";

  const globeConfig: GlobeConfig = useMemo(() => {
    return {
      pointSize: 4,
      globeColor: isDark ? "#307b34" : "#3c493b",
      showAtmosphere: false,
      atmosphereAltitude: 0.1,
      emissive: "#062056",
      emissiveIntensity: 0.1,
      shininess: 0.9,
      polygonColor: "rgba(255,255,255,0.7)",
      ambientLight: "#38bdf8",
      directionalLeftLight: "#ffffff",
      directionalTopLight: "#ffffff",
      pointLight: "#ffffff",
      arcTime: 1000,
      arcLength: 0.9,
      rings: 1,
      maxRings: 3,
      initialPosition: { lat: 31.491, lng: 120.3124 },
      autoRotate: true,
      autoRotateSpeed: 0.5,
    };
  }, [isDark]);

  const t = useTranslations("ContactUsForm");

  return (
    <section className="relative w-full overflow-hidden bg-background py-16 md:py-24">
      <div
        className="absolute left-0 top-0 h-[500px] w-[500px] rounded-full opacity-20 blur-[120px]"
        style={{
          background: "radial-gradient(circle at center, #307b34, transparent 70%)",
        }}
      />
      <div
        className="absolute bottom-0 right-0 h-[300px] w-[300px] rounded-full opacity-10 blur-[100px]"
        style={{
          background: "radial-gradient(circle at center, #e60a64, transparent 70%)",
        }}
      />
      <div className="container relative z-10 mx-auto md:px-6">
        <div className="mx-auto max-w-5xl overflow-hidden rounded-[28px] border border-border/40 bg-secondary/20 shadow-xl backdrop-blur-sm">
          <div className="grid md:grid-cols-2 gap-4">
            <motion.div
              className="flex flex-col gap-8 p-4 md:p-8"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.5 }}
            >
              <div className="text-2xl font-bold grid place-items-center">{t("title")}</div>
              <div>
                <SimpleInquiryForm
                  className="bg-transparent shadow-none"
                  buttonText={t("button")}
                />
              </div>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 1.5 }}
              className="relative flex items-center justify-end overflow-hidden"
            >
              <div className="flex flex-col items-center justify-end overflow-hidden w-full h-full">
                <div className="relative mx-auto h-[400px] min-h-60 overflow-hidden bg-gradient-to-b text-3xl tracking-tight text-foreground md:h-[550px] md:min-h-80 md:text-4xl md:leading-[1.05] lg:text-5xl">
                  <h3 className="px-4 text-wrap md:px-6">{t("description")}</h3>
                  <div
                    aria-label="Interactive 3D globe visualization"
                    role="img"
                    className="absolute -bottom-20 -right-20 md:-bottom-30 md:-right-30 z-10 flex h-full w-full max-w-[400px] items-end justify-end transition-all duration-700 hover:scale-105 md:max-w-[550px]"
                  >
                    <World key={theme} data={[]} globeConfig={globeConfig} />
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
};
