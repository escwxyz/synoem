// TODO: not working as expected
// The layout is a mess

import { cn } from "@synoem/ui/lib/utils";
import { RichText } from "../rich-text.server";
import type { ContentBlockType } from "@synoem/types";
import { CMSLink } from "./cms-link";

export const Content = ({ columns }: ContentBlockType) => {
  const getColSpanClass = (size?: "full" | "half" | "oneThird" | "twoThirds") => {
    switch (size) {
      case "half":
        return "lg:col-span-6";
      case "oneThird":
        return "lg:col-span-4";
      case "twoThirds":
        return "lg:col-span-8";
      default:
        return "lg:col-span-12";
    }
  };

  return (
    <div className="grid grid-cols-4 gap-x-16 gap-y-8 lg:grid-cols-12">
      {columns &&
        columns.length > 0 &&
        columns.map((col) => {
          const { enableLink, link, richText, size } = col;

          return (
            <div
              className={cn(`col-span-4 ${getColSpanClass(size ?? "full")}`, {
                "md:col-span-2": size !== "full",
              })}
              key={col.id}
            >
              {richText && <RichText data={richText} enableGutter={false} />}

              {enableLink && <CMSLink {...link} />}
            </div>
          );
        })}
    </div>
  );
};
