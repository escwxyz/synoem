// TODO

"use client";

import { useState } from "react";
import { Html } from "@react-three/drei";
import { motion, AnimatePresence } from "motion/react";
import { cn } from "@synoem/ui/lib/utils";
import { Button } from "@synoem/ui/components/button";
import { X } from "lucide-react";

export interface AnnotationData {
  id: string;
  title: string;
  description?: string;
  price?: string;
  position: [number, number, number];
  color?: string;
}

export interface ProductAnnotationProps {
  data: AnnotationData;
  offset?: [number, number];
  variant?: "normal" | "compact" | "minimal";
}

export const ProductAnnotation = ({
  data,
  offset = [0, 0],
  variant = "normal",
}: ProductAnnotationProps) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const { title, description, price, position, color = "#3b82f6" } = data;

  return (
    <Html position={position} transform occlude distanceFactor={8} sprite>
      <div
        className="annotation relative"
        style={{ transform: `translate(${offset[0]}px, ${offset[1]}px)` }}
      >
        <Button
          onClick={() => setIsExpanded(!isExpanded)}
          className={cn(
            "w-4 h-4 rounded-full transition-all duration-300",
            "outline-none focus:ring-2 focus:ring-offset-2 focus:ring-white",
            isExpanded ? "scale-110" : "animate-pulse",
          )}
          style={{ backgroundColor: color }}
        />

        <AnimatePresence>
          {isExpanded && (
            <motion.div
              initial={{ opacity: 0, scale: 0.8, y: 10 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.8, y: 10 }}
              className={cn(
                "absolute z-50 left-6 -top-1",
                "bg-background border border-border rounded-lg shadow-lg",
                "text-foreground p-3 w-64",
                "flex flex-col gap-2",
                "backdrop-blur-md bg-opacity-90 dark:bg-opacity-90",
              )}
            >
              <Button
                onClick={() => setIsExpanded(false)}
                type="button"
                variant="ghost"
                className="absolute top-2 right-2 text-muted-foreground hover:text-foreground"
              >
                <X className="w-4 h-4" />
              </Button>

              <div className="flex flex-col">
                <h3 className="font-medium text-base">{title}</h3>

                {price && variant !== "minimal" && (
                  <div className="text-primary font-semibold mt-1">{price}</div>
                )}

                {description && variant !== "minimal" && (
                  <p className="text-xs text-muted-foreground mt-1">{description}</p>
                )}
              </div>

              <div
                className="absolute left-0 top-1 w-0 h-0 
                border-t-[6px] border-t-transparent 
                border-r-[6px] border-r-background 
                border-b-[6px] border-b-transparent
                transform -translate-x-full"
              />
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </Html>
  );
};
