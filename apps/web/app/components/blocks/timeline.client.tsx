"use client";

import { useScroll, useTransform, motion } from "motion/react";
import { useRef, useState, useEffect, useMemo } from "react";
import type { TimelineBlockType } from "@synoem/types";
import { RichText } from "../rich-text.client";
import { Calendar } from "lucide-react";
import { useIsMobile } from "@synoem/ui/hooks/use-mobile";
import { useLocale } from "next-intl";
import { cn } from "@synoem/ui/lib/utils";
import { convertDateString } from "@/app/utils/convert-datestring";
import { isValidLocale } from "@/app/utils/is-valid-locale";
import { defaultLocale } from "@synoem/config";
import { Icon } from "../icon.client";

export const Timeline = ({ items, title, description }: TimelineBlockType) => {
  const ref = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [height, setHeight] = useState(0);

  useEffect(() => {
    if (ref.current) {
      const rect = ref.current.getBoundingClientRect();
      setHeight(rect.height);
    }
  }, []);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start 10%", "end 50%"],
  });

  const heightTransform = useTransform(scrollYProgress, [0, 1], [0, height]);
  const opacityTransform = useTransform(scrollYProgress, [0, 0.1], [0, 1]);

  const isMobile = useIsMobile();

  if (!items || items.length === 0) {
    return null;
  }

  return (
    <div className="w-full font-sans md:px-10" ref={containerRef}>
      {title && <div className="text-center text-3xl font-bold">{title}</div>}
      {description && <div className="text-center mt-4 text-muted-foreground">{description}</div>}
      <div ref={ref} className="relative max-w-7xl mx-auto pb-20">
        {items.map((item) => (
          <div key={item.id || item.title} className="flex justify-start pt-10 md:pt-30 md:gap-10">
            <div className="sticky flex flex-col md:flex-row z-40 items-center top-40 self-start max-w-xs lg:max-w-sm md:w-full">
              {/** Dot */}
              <div className="h-10 absolute left-3 w-10 rounded-full flex items-center justify-center">
                {item.icon ? (
                  <Icon name={item.icon} className="w-6 h-6" />
                ) : (
                  <div className="h-6 w-6 rounded-full p-2 bg-muted" />
                )}
              </div>
              {!isMobile && (
                <div className="pl-20 flex flex-col gap-4">
                  <h3 className="text-2xl font-bold flex items-center gap-2">{item.title}</h3>
                  <DateIndicator date={item.date} precision={item.datePrecision || "year"} />
                </div>
              )}
            </div>

            <div className="relative pl-20 pr-4 w-full">
              {isMobile && (
                <div className="flex flex-col">
                  <h3 className="block text-xl mb-4 text-left font-bold">{item.title}</h3>
                  <DateIndicator date={item.date} precision={item.datePrecision || "year"} />
                </div>
              )}
              <RichText data={item.content} className={cn(isMobile && "mt-4")} />
            </div>
          </div>
        ))}
        {/** Line Indicator */}
        <div
          style={{
            height: `${height}px`,
          }}
          className="absolute md:left-8 left-8 top-0 overflow-hidden w-[2px] bg-[linear-gradient(to_bottom,var(--tw-gradient-stops))] from-transparent from-[0%] via-neutral-200 dark:via-neutral-700 to-transparent to-[99%]  [mask-image:linear-gradient(to_bottom,transparent_0%,black_10%,black_90%,transparent_100%)] "
        >
          <motion.div
            style={{
              height: heightTransform,
              opacity: opacityTransform,
            }}
            className="absolute inset-x-0 top-0  w-[2px] bg-gradient-to-t from-[var(--color-primary)] via-[var(--color-secondary)] to-transparent from-[0%] via-[10%] rounded-full"
          />
        </div>
      </div>
    </div>
  );
};

const DateIndicator = ({
  date,
  precision,
}: { date: string; precision: "year" | "month" | "day" }) => {
  const locale = useLocale();

  const formattedDate = useMemo(() => {
    const effectiveLocale = isValidLocale(locale) ? locale : defaultLocale;
    return convertDateString(date, effectiveLocale, precision);
  }, [date, precision, locale]);

  return (
    <div className="flex items-center gap-2 text-muted-foreground">
      <Calendar className="w-4 h-4" />
      {formattedDate && <span className="text-md text-muted-foreground">{formattedDate}</span>}
    </div>
  );
};

DateIndicator.displayName = "DateIndicator";
