import { InfiniteSlider } from "@synoem/ui/components/infinite-slider";
import { ProgressiveBlur } from "@synoem/ui/components/progressive-blur";
import Image from "next/image";

interface LogoCloudProps {
  title: string;
  logos: {
    url: string;
    alt: string;
  }[];
  size?: number;
  speed?: number;
  speedOnHover?: number;
  gap?: number;
  unoptimized?: boolean;
}

export const LogoCloud = ({
  title,
  logos,
  size = 100,
  speed = 40,
  speedOnHover = 20,
  gap = 112,
  unoptimized = false,
}: LogoCloudProps) => {
  return (
    <section className="bg-background overflow-hidden py-16">
      <div className="group relative m-auto max-w-7xl px-6">
        <div className="flex flex-col items-center md:flex-row">
          <div className="md:max-w-44 md:border-r md:pr-6">
            <p className="text-end text-sm">{title}</p>
          </div>
          <div className="relative py-6 md:w-[calc(100%-11rem)]">
            <InfiniteSlider speedOnHover={speedOnHover} speed={speed} gap={gap}>
              {logos.map((logo) => (
                <Image
                  key={logo.url}
                  src={logo.url}
                  alt={logo.alt}
                  width={size}
                  height={size}
                  unoptimized={unoptimized}
                />
              ))}
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
    </section>
  );
};
