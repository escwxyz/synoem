// TODO: svg not shown

import Image from "next/image";
import { Link } from "@/i18n/navigation";
import { getUrl } from "~/utils/get-url";
import { getCompanyInfoCached } from "~/data/get-globals";
import type { Locale } from "@synoem/config";
import { cn } from "@synoem/ui/lib/utils";

interface LogoProps {
  size?: number;
  locale: Locale;
}

export const Logo = async ({ size = 80, locale }: LogoProps) => {
  const companyInfoResponse = await getCompanyInfoCached(locale)();

  const logoUrl =
    companyInfoResponse.data?.logo && typeof companyInfoResponse.data.logo === "object"
      ? companyInfoResponse.data.logo.url
      : null;

  const logoAlt =
    companyInfoResponse.data?.logo && typeof companyInfoResponse.data.logo === "object"
      ? companyInfoResponse.data.logo.alt
      : companyInfoResponse.data?.name;

  if (!logoUrl) {
    return null;
  }

  return (
    <Link href="/">
      <Image src={getUrl(logoUrl)} alt={logoAlt || ""} width={size} height={size} unoptimized />
    </Link>
  );
};

export const LogoSkeleton = ({ size = 80, className }: { size?: number; className?: string }) => {
  return (
    <div
      className={cn(" bg-muted rounded-md animate-pulse", `w-[${size}px] h-[${size}px]`, className)}
    />
  );
};
