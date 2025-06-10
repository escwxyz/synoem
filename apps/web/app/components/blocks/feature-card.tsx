"use client";

import type { FeatureBlockType } from "@synoem/types";
import { NumberTicker } from "@synoem/ui/components/number-ticker";
import { motion, useInView } from "motion/react";
import { Icon } from "~/components/icon.client";

import { useRef } from "react";
import { cn } from "@synoem/ui/lib/utils";

export const FeatureCard = ({
  type,
  title,
  number,
  description,
  icon,
  withPlus,
  isPercentage,
  decimalPlaces,
  direction,
  startValue,
  delay,
  iconBackground,
  alignment,
  className,
  locale,
  opacity,
}: FeatureBlockType & {
  className?: string;
  locale?: string;
}) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.3 });

  const backgroundOpacity = !opacity || opacity === 100 ? "bg-card" : `bg-card/${opacity}`;

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 20 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
      transition={{ duration: 0.6, delay: delay || 0, ease: "easeOut" }}
      className={cn(
        "group relative overflow-hidden rounded-xl border border-border/30 p-6 shadow-lg shadow-black/[0.03] backdrop-blur-md",
        backgroundOpacity,
        className,
      )}
    >
      <div
        className={cn(
          "absolute -right-6 -top-6 h-24 w-24 rounded-full bg-gradient-to-br opacity-20 blur-2xl transition-all duration-500 group-hover:opacity-30 group-hover:blur-3xl",
          "from-accent/80 to-accent/60",
        )}
      />

      <div
        className={cn(
          "flex items-center gap-4",
          alignment === "reverse" && "flex-row-reverse",
          alignment === "between" && "justify-between",
          alignment === "between-reverse" && "justify-between flex-row-reverse",
        )}
      >
        {iconBackground ? (
          <div
            className={cn(
              "flex h-12 w-12 shrink-0 items-center justify-center rounded-lg bg-gradient-to-br text-foreground",
              "from-accent/80 to-accent/60",
            )}
          >
            <Icon name={icon} />
          </div>
        ) : (
          <Icon name={icon} />
        )}

        <div className="flex flex-col">
          <h3
            className={cn(
              "flex items-baseline font-bold tracking-tight",
              type === "text" && "text-xl",
              type === "number" && "text-2xl md:text-3xl",
            )}
          >
            {type === "number" && number && (
              <NumberTicker
                value={number}
                decimalPlaces={decimalPlaces || 0}
                startValue={startValue || 0}
                direction={direction || "up"}
                className="tabular-nums"
                locale={locale}
              />
            )}
            {type === "text" && title}
            {withPlus && <span className="ml-1 text-sm font-medium opacity-70">+</span>}
            {isPercentage && <span className="ml-1 text-sm font-medium opacity-70">%</span>}
          </h3>
          <p className="text-sm font-medium">{description}</p>
        </div>
      </div>
    </motion.div>
  );
};
