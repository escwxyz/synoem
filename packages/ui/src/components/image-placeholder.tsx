"use client";

import type React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { ImageIcon } from "lucide-react";

import { cn } from "@synoem/ui/lib/utils";

const placeholderVariants = cva(
  "flex items-center justify-center rounded-md border bg-muted/50 text-muted-foreground",
  {
    variants: {
      variant: {
        default: "border-dashed",
        solid: "border-solid",
        error: "border-solid border-destructive/50 bg-destructive/10 text-destructive",
      },
      size: {
        sm: "p-2",
        md: "p-4",
        lg: "p-6",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "md",
    },
  },
);

export interface ImagePlaceholderProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof placeholderVariants> {
  width?: number | string;
  height?: number | string;
  iconSize?: number;
  showIcon?: boolean;
  text?: string;
}

export const ImagePlaceholder = ({
  className,
  variant,
  size,
  width = "100%",
  height = "auto",
  iconSize = 24,
  showIcon = true,
  text,
  style,
  ...props
}: ImagePlaceholderProps) => {
  return (
    <div
      className={cn(placeholderVariants({ variant, size }), className)}
      style={{
        width: typeof width === "number" ? `${width}px` : width,
        height: typeof height === "number" ? `${height}px` : height,
        aspectRatio: height === "auto" ? "16/9" : undefined,
        ...style,
      }}
      role="img"
      aria-label="Image placeholder"
      {...props}
    >
      <div className="flex flex-col items-center justify-center gap-2 text-center">
        {showIcon && <ImageIcon className="opacity-50" size={iconSize} />}
        {text && <p className="text-sm">{text}</p>}
      </div>
    </div>
  );
};
