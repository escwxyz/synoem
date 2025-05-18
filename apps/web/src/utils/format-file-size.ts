export function formatFileSize(bytes: number, decimals = 2, useSI = false): string {
  if (bytes === 0) return "0 Bytes";

  const base = useSI ? 1000 : 1024;
  const sizes = useSI
    ? ["Bytes", "kB", "MB", "GB", "TB", "PB", "EB", "ZB", "YB"]
    : ["Bytes", "KiB", "MiB", "GiB", "TiB", "PiB", "EiB", "ZiB", "YiB"];

  const i = Math.floor(Math.log(bytes) / Math.log(base));

  const sizeIndex = Math.min(i, sizes.length - 1);

  const formattedValue = (bytes / base ** sizeIndex).toFixed(decimals);

  const cleanValue = Number.parseFloat(formattedValue).toString();

  return `${cleanValue} ${sizes[sizeIndex]}`;
}
