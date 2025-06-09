export function normalizePath(
  path?: string | string[] | null | undefined,
  keepTrailingSlash = false,
): string {
  if (!path) return "/";

  let normalizedPath = Array.isArray(path) ? path.join("/") : path;
  normalizedPath = `/${normalizedPath}/`.replace(/\/+/g, "/");
  normalizedPath =
    normalizedPath !== "/" && !keepTrailingSlash
      ? normalizedPath.replace(/\/$/, "")
      : normalizedPath;

  return normalizedPath;
}
