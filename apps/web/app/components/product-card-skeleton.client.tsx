"use client";

import { cn } from "@synoem/ui/lib/utils";
import { useAtomValue } from "jotai";
import { motion } from "motion/react";
import { productsViewModeAtom } from "~/atoms/products-view-mode";
import { useSidebar } from "~/hooks/useSidebar";

export const ProductCardSkeleton = () => {
  const productsViewMode = useAtomValue(productsViewModeAtom);
  const { isOpen, isMobile } = useSidebar();

  const isList = productsViewMode === "list";
  const isDesktopAndSidebarClosed = !isMobile && !isOpen;

  return (
    <div
      className={cn(
        "group h-full flex flex-col overflow-hidden bg-muted rounded-lg shadow-sm",
        isList && "h-auto",
      )}
    >
      <motion.div
        className="overflow-hidden h-full flex rounded-lg p-0 gap-4"
        initial={false}
        animate={isList ? "list" : "grid"}
        layout
      >
        {/* Image container */}
        <motion.div
          className={cn(
            "p-0 overflow-hidden rounded-tl-lg",
            isList ? "rounded-bl-lg w-1/3" : "rounded-tr-lg w-full",
          )}
          layout
        >
          <div className={cn("relative overflow-hidden", isList ? "h-full" : "aspect-[4/3]")}>
            <div className="w-full h-full bg-muted-foreground/20 animate-pulse" />
            {/* 3D model tag */}
            <div className="absolute top-3 left-3">
              <div className="w-[30px] h-6 rounded-full bg-muted-foreground/20 animate-pulse" />
            </div>
            {/* Category tag */}
            <div className="absolute top-3 right-3">
              <div className="w-[72px] h-6 rounded-full bg-muted-foreground/20 animate-pulse" />
            </div>
          </div>
        </motion.div>

        {/* Content container */}
        <motion.div
          className={cn("flex flex-col flex-grow", isList ? "w-2/3 p-4 pr-0" : "w-full p-4")}
          layout
        >
          <div className="flex flex-col flex-grow gap-2">
            {/* Title */}
            <div className="h-6 w-3/4 bg-accent animate-pulse mb-1" />

            {/* Specs */}
            <div className={cn("flex gap-2", isList ? "flex-row gap-6" : "flex-col gap-2")}>
              <div className="flex items-center gap-2">
                <div className="h-4 w-4 rounded-full bg-amber-500/20 animate-pulse" />
                <div className="h-4 w-32 bg-muted-foreground/20 rounded animate-pulse" />
              </div>

              <div className="flex items-center gap-2">
                <div className="h-4 w-4 rounded-full bg-amber-500/20 animate-pulse" />
                <div className="h-4 w-28 bg-muted-foreground/20 rounded animate-pulse" />
              </div>
            </div>

            {/* Excerpt */}
            <div className="h-4 w-full bg-muted-foreground/20 rounded animate-pulse mt-1" />
            <div className="h-4 w-2/3 bg-muted-foreground/20 rounded animate-pulse" />

            {/* Additional variant info for list view */}
            {isList && (
              <div className="h-4 w-3/4 bg-muted-foreground/10 rounded animate-pulse mt-2" />
            )}
          </div>

          {/* Buttons */}
          <div
            className={cn(
              "w-full flex gap-2 overflow-hidden mt-auto",
              isList ? "flex-row pt-4 pb-0" : "p-0 pt-4",
              !isList && isDesktopAndSidebarClosed ? "flex-row" : !isList ? "flex-col" : "",
            )}
          >
            <div
              className={cn(
                "h-9 bg-primary/70 rounded-md animate-pulse",
                isDesktopAndSidebarClosed && !isList
                  ? "w-[calc(50%-4px)]"
                  : isList
                    ? "w-auto flex-shrink-0 min-w-[120px]"
                    : "w-full",
              )}
            />
            <div
              className={cn(
                "h-9 bg-muted-foreground/30 rounded-md animate-pulse",
                isDesktopAndSidebarClosed && !isList
                  ? "w-[calc(50%-4px)]"
                  : isList
                    ? "w-auto flex-shrink-0 min-w-[120px]"
                    : "w-full",
              )}
            />
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
};
