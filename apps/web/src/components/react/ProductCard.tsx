import type { Product } from "~/types/product";
import { Image } from "@unpic/react";
import { getProductUrl } from "~/utils/get-product-url";
import { isPumpController, isSolarPanel } from "~/utils/check-product-type";
import { useMediaQuery } from "usehooks-ts";
import { RequestQuoteDesktop, RequestQuoteMobile } from "~/components/react";
import { getPowerRange } from "~/utils/get-power-range";

export const ProductCard = ({ product }: { product: Product }) => {
  const { cover, title } = product; // TODO: 3d model or video

  const url = getProductUrl(product);
  const imageUrl = typeof cover === "number" ? null : cover.url;

  const tagText = isSolarPanel(product)
    ? product.cell.type.toUpperCase()
    : product.type.toUpperCase();

  const description = `${product.desc.slice(0, 60)}...`;

  const getSpecsText = () => {
    if (isSolarPanel(product)) {
      const result = getPowerRange({
        powerPoints: product.powerRange.points,
      });

      if (result) {
        const { min, max } = result;
        return `${min}W ~ ${max}W`;
      }
    } else if (isPumpController(product)) {
      if (product.moq) {
        return `MOQ: ${product.moq}`;
      }
    }
  };

  const isDesktop = useMediaQuery("(min-width: 768px)");

  return (
    <div className="group h-full flex flex-col overflow-hidden bg-muted rounded-lg shadow-sm hover:shadow-md transition-all duration-300">
      <div className="relative aspect-[4/3] overflow-hidden">
        <a href={url} className="block w-full h-full">
          {imageUrl ? (
            <Image
              src={imageUrl ?? ""}
              alt={title}
              height={300}
              aspectRatio={4 / 3}
              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
            />
          ) : (
            <div className="w-full h-full bg-gray-200 flex items-center justify-center">
              <span className="text-gray-400">No image</span>{" "}
              {/** TODO: placeholder image */}
            </div>
          )}
        </a>
        <div className="absolute top-3 right-3">
          <span className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium backdrop-blur-xl text-gray-800 shadow-sm">
            {tagText}
          </span>
        </div>
      </div>
      <div className="flex flex-col flex-grow p-4">
        <a href={url} className="block group-hover:text-primary">
          <h3 className="text-base font-medium line-clamp-2 mb-1">{title}</h3>
        </a>

        <div className="flex items-center text-sm text-gray-500 mb-2">
          {getSpecsText()}
        </div>
        <p className="text-sm text-gray-600 line-clamp-2 mb-auto">
          {description}
        </p>
        <div className="mt-4 pt-3 border-t border-gray-100">
          {isDesktop ? (
            <RequestQuoteDesktop product={product} buttonSize="sm" />
          ) : (
            <RequestQuoteMobile product={product} buttonSize="sm" />
          )}
        </div>
      </div>
    </div>
  );
};
