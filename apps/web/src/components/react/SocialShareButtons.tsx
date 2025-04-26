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

interface Props {
  url: string;
  className?: string;
  size?: number;
}

export const SocialShareButtons = ({ url, className, size = 32 }: Props) => {
  return (
    <div className={cn("flex gap-2 items-center", className)}>
      <FacebookShareButton url={url}>
        <FacebookIcon size={size} round />
      </FacebookShareButton>
      <TwitterShareButton url={url}>
        <TwitterIcon size={size} round />
      </TwitterShareButton>
      <LinkedinShareButton url={url}>
        <LinkedinIcon size={size} round />
      </LinkedinShareButton>
      <WhatsappShareButton url={url}>
        <WhatsappIcon size={size} round />
      </WhatsappShareButton>
    </div>
  );
};
