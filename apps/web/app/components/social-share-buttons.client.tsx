"use client";

import {
  FacebookIcon,
  FacebookShareButton,
  TwitterShareButton,
  TwitterIcon,
  LinkedinIcon,
  LinkedinShareButton,
  WhatsappIcon,
  WhatsappShareButton,
} from "react-share";
import { cn } from "@synoem/ui/lib/utils";
import { usePathname } from "@/i18n/navigation";
import { getUrl } from "~/utils/get-url";
import { useLocale } from "next-intl";
import { isValidLocale } from "~/utils/is-valid-locale";
import { defaultLocale, type Locale } from "@synoem/config";

interface Props {
  className?: string;
  size?: number;
}

export const SocialShareButtons = ({ className, size = 32 }: Props) => {
  const pathname = usePathname();

  const locale = useLocale();

  const effectiveLocale = isValidLocale(locale) ? (locale as Locale) : defaultLocale;

  const currentUrl = getUrl(`/${effectiveLocale}${pathname}`);

  return (
    <div className={cn("flex gap-2 items-center", className)}>
      <FacebookShareButton url={currentUrl}>
        <FacebookIcon size={size} round />
      </FacebookShareButton>
      <TwitterShareButton url={currentUrl}>
        <TwitterIcon size={size} round />
      </TwitterShareButton>
      <LinkedinShareButton url={currentUrl}>
        <LinkedinIcon size={size} round />
      </LinkedinShareButton>
      <WhatsappShareButton url={currentUrl}>
        <WhatsappIcon size={size} round />
      </WhatsappShareButton>
    </div>
  );
};
