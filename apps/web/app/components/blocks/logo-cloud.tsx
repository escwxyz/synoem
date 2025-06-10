"use client";

import { InfiniteSlider } from "@synoem/ui/components/infinite-slider";
import { ProgressiveBlur } from "@synoem/ui/components/progressive-blur";
import Image from "next/image";
import type { LogoCloudBlockType } from "@synoem/types";
import { getUrl } from "@/app/utils";
import { cn } from "@synoem/ui/lib/utils";

export const LogoCloud = ({
  title,
  logos,
  size = 100,
  speed = 40,
  speedOnHover = 20,
  gap = 112,
  className,
}: LogoCloudBlockType & { gap?: number; className?: string }) => {
  return (
    <div className={cn("bg-background overflow-hidden", className)}>
      <div className="group relative m-auto max-w-7xl px-6">
        <div className="flex flex-col items-center md:flex-row">
          <div className="md:max-w-44 md:border-r md:pr-6">
            <p className="text-end text-sm">{title}</p>
          </div>
          <div className="relative py-6 md:w-[calc(100%-11rem)]">
            <InfiniteSlider speedOnHover={speedOnHover ?? 20} speed={speed ?? 40} gap={gap}>
              {typeof logos === "object" &&
                logos.length > 0 &&
                logos.map((logo, index) => {
                  if (typeof logo === "object" && logo.url) {
                    return (
                      <Image
                        key={`${logo.url}-${index}`}
                        src={getUrl(logo.url)}
                        alt={logo.alt}
                        width={size ?? 100}
                        height={size ?? 100}
                        {...(logo.blurDataUrl && {
                          placeholder: "blur",
                          blurDataURL: logo.blurDataUrl,
                        })}
                        unoptimized={typeof logo.blurDataUrl !== "string"}
                      />
                    );
                  }
                })}
            </InfiniteSlider>

            <div className="bg-linear-to-r from-background absolute inset-y-0 left-0 w-20" />
            <div className="bg-linear-to-l from-background absolute inset-y-0 right-0 w-20" />
            <ProgressiveBlur
              className="pointer-events-none absolute left-0 top-0 h-full w-20"
              direction="left"
              blurIntensity={1}
            />
            <ProgressiveBlur
              className="pointer-events-none absolute right-0 top-0 h-full w-20"
              direction="right"
              blurIntensity={1}
            />
          </div>
        </div>
      </div>
    </div>
  );
};
