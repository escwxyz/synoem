import { useCallback, useTransition } from "react";
import { useQueryState, parseAsInteger } from "nuqs";

export const useProductPagination = () => {
  const [isPending, startTransition] = useTransition();

  const [currentPage, setCurrentPage] = useQueryState(
    "page",
    parseAsInteger.withDefault(1).withOptions({
      startTransition,
    }),
  );

  const handlePageChange = useCallback(
    (page: number) => {
      setCurrentPage(page);
    },
    [setCurrentPage],
  );

  return {
    currentPage,
    setCurrentPage,
    handlePageChange,
    isPending,
  };
};
