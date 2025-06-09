"use client";

import { motion, type MotionValue, useScroll, useSpring, useTransform } from "motion/react";
import { useRef } from "react";
import type { Industry } from "@synoem/types";
import { Link } from "@/i18n/navigation";
import Image from "next/image";
import { getUrl } from "~/utils";
import dynamic from "next/dynamic";
import type { Locale } from "@synoem/config";
import { useAtomValue } from "jotai";
import { showInHeaderAtom } from "~/atoms";
import { Button } from "@synoem/ui/components/button";

const RequestQuoteButton = dynamic(
  () => import("./request-quote-button").then((mod) => mod.RequestQuoteButton),
  {
    ssr: false,
  },
);

interface HeroParallexProps {
  industries: Industry[];
  locale: Locale;
}

export const HeroParallex = ({ industries, locale }: HeroParallexProps) => {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });

  const springConfig = { stiffness: 300, damping: 30, bounce: 100 };

  const translateX = useSpring(useTransform(scrollYProgress, [0, 1], [0, 1000]), springConfig);
  //   const translateXReverse = useSpring(
  //     useTransform(scrollYProgress, [0, 1], [0, -1000]),
  //     springConfig,
  //   );
  const rotateX = useSpring(useTransform(scrollYProgress, [0, 0.5], [15, 0]), springConfig);
  const opacity = useSpring(useTransform(scrollYProgress, [0, 0.5], [0.2, 1]), springConfig);
  const rotateZ = useSpring(useTransform(scrollYProgress, [0, 0.5], [20, 0]), springConfig);
  const translateY = useSpring(useTransform(scrollYProgress, [0, 0.5], [-700, 500]), springConfig);

  const showInHeader = useAtomValue(showInHeaderAtom);

  return (
    <section
      ref={ref}
      className="h-[200vh] py-40 overflow-hidden  antialiased flex flex-col self-auto [perspective:1000px] [transform-style:preserve-3d]"
    >
      <div className="max-w-7xl relative mx-auto py-20 md:py-40 px-4 w-full  left-0 top-0">
        <h1 className="text-2xl md:text-7xl font-bold">
          The Ultimate <br /> development studio
        </h1>
        <p className="max-w-2xl text-base md:text-xl mt-8">
          We build beautiful products with the latest technologies and frameworks. We are a team of
          passionate developers and designers that love to build amazing products.
        </p>
        <div className="flex gap-4 max-w-2xl mt-8">
          {!showInHeader && (
            <RequestQuoteButton
              locale={locale}
              buttonText="Get a Quote"
              // TODO: add some effects
              // className="animate-pulse"
            />
          )}
          <Button asChild variant={"outline"}>
            <Link href="/products">Products</Link>
          </Button>
        </div>
      </div>
      <motion.div
        style={{
          rotateX,
          rotateZ,
          translateY,
          opacity,
        }}
      >
        <motion.div className="flex flex-row-reverse space-x-reverse space-x-20 mb-20">
          {industries.map((industry) => (
            <IndustryCard key={industry.id} industry={industry} translate={translateX} />
          ))}
        </motion.div>
      </motion.div>
    </section>
  );
};

const IndustryCard = ({
  industry,
  translate,
}: { industry: Industry; translate: MotionValue<number> }) => {
  const { coverImage } = industry;

  if (!coverImage || typeof coverImage !== "object") {
    console.warn("Cover image is not populated for industry", industry.id);
    return null;
  }

  return (
    <motion.div
      style={{
        x: translate,
      }}
      whileHover={{
        y: -20,
      }}
      key={industry.id}
      className="group/product h-96 w-[30rem] relative shrink-0 overflow-hidden"
    >
      <Link href={"#"} className="block group-hover/product:shadow-2xl ">
        <Image
          src={getUrl(coverImage.url ?? "")}
          alt={industry.title}
          width={1000}
          height={1000}
          className="w-full h-full object-cover"
          {...(coverImage.blurDataUrl
            ? {
                blurDataURL: coverImage.blurDataUrl,
                placeholder: "blur",
              }
            : {})}
        />
      </Link>
      <div className="absolute inset-0 h-full w-full opacity-0 group-hover/product:opacity-50 bg-black pointer-events-none" />
      <h2 className="absolute bottom-4 left-4 opacity-0 group-hover/product:opacity-100 text-white">
        {industry.title}
      </h2>
    </motion.div>
  );
};
