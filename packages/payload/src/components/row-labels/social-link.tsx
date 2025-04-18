"use client";

import type React from "react";
import { useRowLabel } from "@payloadcms/ui";
import {
  getPlatformLabel,
  getPlatformIconSVG,
  type SocialPlatform,
} from "@synoem/config";

type SocialLinkData = {
  platform?: SocialPlatform;
  url?: string;
};

export const SocialLinkRowLabel: React.FC = () => {
  const { data } = useRowLabel<SocialLinkData>();

  const platformIcon = data?.platform
    ? getPlatformIconSVG(data.platform)
    : null;

  const platformLabel = data?.platform
    ? getPlatformLabel(data.platform)
    : "Unselected";

  const urlPreview = data?.url
    ? data.url.length > 30
      ? `${data.url.substring(0, 27)}...`
      : data.url
    : "No link set";

  return (
    <div style={{ display: "flex", alignItems: "center" }}>
      {platformIcon && (
        <span
          style={{
            marginRight: "8px",
            width: "20px",
            height: "20px",
            borderRadius: "4px",
            backgroundColor: "#eeeeee",
            display: "inline-flex",
            alignItems: "center",
            justifyContent: "center",
            padding: "4px",
          }}
          // biome-ignore lint/security/noDangerouslySetInnerHtml: <explanation>
          dangerouslySetInnerHTML={{
            __html: platformIcon.replace(/currentColor/g, "white"),
          }}
        />
      )}
      <span>
        <strong>{platformLabel}</strong>
        {data?.url && (
          <span style={{ marginLeft: "8px", color: "#666", fontSize: "0.9em" }}>
            {urlPreview}
          </span>
        )}
      </span>
    </div>
  );
};

export default SocialLinkRowLabel;
