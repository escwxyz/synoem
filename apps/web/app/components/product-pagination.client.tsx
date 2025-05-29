"use client";

import { PRODUCTS_PER_PAGE } from "@synoem/config";
import { ChevronRight, ChevronLeft } from "lucide-react";
import { Button } from "@synoem/ui/components/button";
import type React from "react";
import { useProductPagination } from "@/app/hooks/use-product-pagination";
import { useTranslations } from "next-intl";
import { useMemo } from "react";

type Props = {
  totalCount: number;
} & React.ComponentProps<"div">;

export const ProductPagination = ({ totalCount, className, ...props }: Props) => {
  const totalPages = Math.ceil(totalCount / PRODUCTS_PER_PAGE);
  const { currentPage, handlePageChange, isPending } = useProductPagination();

  const pageNumbers = useMemo(() => {
    const result = [];
    const maxPagesToShow = 5;

    if (totalPages <= 0) return [];

    let startPage = Math.max(1, currentPage - Math.floor(maxPagesToShow / 2));
    const endPage = Math.min(totalPages, startPage + maxPagesToShow - 1);

    if (endPage - startPage + 1 < maxPagesToShow) {
      startPage = Math.max(1, endPage - maxPagesToShow + 1);
    }

    if (startPage > 1) {
      result.push(1);
      if (startPage > 2) {
        result.push("...");
      }
    }

    for (let i = startPage; i <= endPage; i++) {
      result.push(i);
    }

    if (endPage < totalPages) {
      if (endPage < totalPages - 1) {
        result.push("...");
      }
      result.push(totalPages);
    }

    return result;
  }, [currentPage, totalPages]);

  const t = useTranslations("ProductPagination");

  return (
    <div className={`flex justify-center items-center gap-2 ${className}`} {...props}>
      <Button
        variant="outline"
        size="sm"
        onClick={() => handlePageChange(Math.max(1, currentPage - 1))}
        disabled={currentPage <= 1 || isPending}
      >
        <ChevronLeft className="h-4 w-4 mr-1" />
        {t("prev")}
      </Button>

      <div className="flex items-center gap-1 mx-2">
        {pageNumbers.map((pageNumber: string | number) =>
          typeof pageNumber === "number" ? (
            <Button
              key={pageNumber}
              variant={currentPage === pageNumber ? "default" : "outline"}
              size="sm"
              className="w-8 h-8 p-0"
              onClick={() => handlePageChange(pageNumber)}
              disabled={isPending}
              aria-current={currentPage === pageNumber ? "page" : undefined}
            >
              {pageNumber}
            </Button>
          ) : (
            <span key={pageNumber} className="px-1">
              {pageNumber}
            </span>
          ),
        )}
      </div>

      <Button
        variant="outline"
        size="sm"
        onClick={() => handlePageChange(Math.min(totalPages, currentPage + 1))}
        disabled={currentPage >= totalPages || isPending}
      >
        {t("next")}
        <ChevronRight className="h-4 w-4 ml-1" />
      </Button>
    </div>
  );
};
