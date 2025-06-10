"use client";

import type { HeroBlockType } from "@synoem/types";
import { motion, type MotionValue, useScroll, useSpring, useTransform } from "motion/react";
import { useRef } from "react";
import Image from "next/image";
import { getUrl } from "~/utils";
import dynamic from "next/dynamic";
import type { Locale } from "@synoem/config";
import { useAtomValue } from "jotai";
import { showInHeaderAtom } from "~/atoms";
import { cn } from "@synoem/ui/lib/utils";
import { CMSLink } from "./blocks/cms-link";
import { useIsMobile } from "@synoem/ui/hooks/use-mobile";

const RequestQuoteButton = dynamic(
  () => import("./request-quote-button").then((mod) => mod.RequestQuoteButton),
  {
    ssr: false,
  },
);

export const HeroParallex = ({
  locale,
  ...props
}: HeroBlockType & {
  locale: Locale;
}) => {
  const { title, subtitle, description, quoteButton, ctaPrimary, ctaSecondary, rows } = props;

  const isMobile = useIsMobile();

  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });

  const springConfig = { stiffness: 300, damping: 30, bounce: 100 };

  const translateX = useSpring(useTransform(scrollYProgress, [0, 1], [0, 500]), springConfig);
  const translateXReverse = useSpring(
    useTransform(scrollYProgress, [0, 1], [0, -500]),
    springConfig,
  );
  const rotateX = useSpring(useTransform(scrollYProgress, [0, 0.4], [15, 0]), springConfig);
  const opacity = useSpring(useTransform(scrollYProgress, [0, 0.4], [0.1, 1]), springConfig);
  const rotateZ = useSpring(useTransform(scrollYProgress, [0, 0.4], [20, 0]), springConfig);

  const initialTranslateY = isMobile ? -250 * rows.length : -300 * rows.length;
  const translateY = useSpring(
    useTransform(scrollYProgress, [0, 0.4], [initialTranslateY, 125]),
    springConfig,
  );

  const pointerEvents = useTransform<number, string>(scrollYProgress, (v) =>
    v < 0.1 ? "none" : "auto",
  );

  const showInHeader = useAtomValue(showInHeaderAtom);

  return (
    <div
      ref={ref}
      className={cn(
        "py-10 overflow-hidden flex flex-col self-auto [perspective:1000px] [transform-style:preserve-3d]",
        `h-[${(rows.length + 1) * 100}vh]`,
      )}
    >
      <div className="max-w-7xl relative mx-auto py-20 md:py-40 px-4 w-full left-0 top-0 z-10">
        <h1 className="text-2xl md:text-7xl font-bold max-w-2xl">{title}</h1>
        {subtitle && <h2 className="text-xl md:text-3xl mt-4 max-w-2xl">{subtitle}</h2>}
        {description && <p className="max-w-2xl text-base md:text-xl mt-4">{description}</p>}
        <div className="flex gap-4 max-w-2xl mt-8">
          {quoteButton && !showInHeader && (
            <RequestQuoteButton
              locale={locale}
              buttonText="Request Quote"
              // TODO: add some effects
              // className="animate-pulse"
            />
          )}
          {!quoteButton && ctaPrimary && <CMSLink {...ctaPrimary} />}
          {ctaSecondary && <CMSLink {...ctaSecondary} variant="secondary" />}
        </div>
      </div>
      {rows.map((row, rowsIndex) => (
        <motion.div
          key={`${row.id}-${rowsIndex}`}
          style={{
            rotateX,
            rotateZ,
            translateY,
            opacity,
          }}
        >
          <motion.div
            className={cn(
              "flex flex-row-reverse space-x-reverse  mb-20",
              isMobile ? "space-x-10" : "space-x-20",
            )}
          >
            {row.contents.map((content, index) => (
              <ContentCard
                key={`${content.id}-${index}`}
                content={content}
                translate={rowsIndex % 2 === 0 ? translateX : translateXReverse}
                pointerEvents={pointerEvents}
              />
            ))}
          </motion.div>
        </motion.div>
      ))}
    </div>
  );
};

const ContentCard = ({
  content,
  translate,
  pointerEvents,
}: {
  content: HeroBlockType["rows"][number]["contents"][number];
  translate: MotionValue<number>;
  pointerEvents: MotionValue<string>;
}) => {
  const { image, title, description, link } = content;

  const isMobile = useIsMobile();

  if (!image || typeof image !== "object") {
    console.warn("Image is not populated in hero block");
    return null;
  }

  return (
    <motion.div
      style={{
        x: translate,
        pointerEvents,
      }}
      whileHover={{
        y: -20,
      }}
      key={content.id}
      className={cn(
        "group/content relative shrink-0 overflow-hidden",
        isMobile ? "h-64 w-full" : "h-96 w-[30rem]",
      )}
    >
      <CMSLink {...link} className="block group-hover/content:shadow-2xl rounded-lg">
        <Image
          src={getUrl(image.url ?? "")}
          alt={content.title}
          width={1200}
          height={675}
          className="w-full h-full absolute inset-0 object-cover rounded-lg hover:brightness-75 transition-all duration-300"
          {...(image.blurDataUrl
            ? {
                blurDataURL: image.blurDataUrl,
                placeholder: "blur",
              }
            : {})}
        />
        <div className="absolute bottom-4 left-4 opacity-0 group-hover/content:opacity-100 text-primary-foreground">
          <h2 className="text-2xl font-bold">{title}</h2>
          {description && <p className="text-sm">{description}</p>}
        </div>
      </CMSLink>
    </motion.div>
  );
};
