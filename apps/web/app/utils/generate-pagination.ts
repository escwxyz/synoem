import { PRODUCTS_PER_PAGE } from "@synoem/config";

export interface PaginationResult<T> {
  items: T[];
  totalItems: number;
  totalPages: number;
  currentPage: number;
  hasPrevPage: boolean;
  hasNextPage: boolean;
  prevPage: number | null;
  nextPage: number | null;
}

export function generatePagination<T>(items: T[], currentPage = 1): PaginationResult<T> {
  const totalItems = items.length;
  const totalPages = Math.ceil(totalItems / PRODUCTS_PER_PAGE);
  const safeCurrentPage = Math.max(1, Math.min(currentPage, totalPages || 1));

  const startIndex = (safeCurrentPage - 1) * PRODUCTS_PER_PAGE;
  const endIndex = Math.min(startIndex + PRODUCTS_PER_PAGE, totalItems);
  const paginatedItems = items.slice(startIndex, endIndex);

  return {
    items: paginatedItems,
    totalItems,
    totalPages,
    currentPage: safeCurrentPage,
    hasPrevPage: safeCurrentPage > 1,
    hasNextPage: safeCurrentPage < totalPages,
    prevPage: safeCurrentPage > 1 ? safeCurrentPage - 1 : null,
    nextPage: safeCurrentPage < totalPages ? safeCurrentPage + 1 : null,
  };
}
