export const format = (val: string): string => val.replace(/ /g, "-").replace(/[^\w-]+/g, "");

export const slugify = (val: string): string => format(val).toLowerCase();

export { revalidateProduct } from "./revalidate-product";
