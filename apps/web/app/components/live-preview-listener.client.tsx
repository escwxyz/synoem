"use client";

import { RefreshRouteOnSave as PayloadLivePreview } from "@payloadcms/live-preview-react";
import { useRouter } from "@/i18n/navigation";

export const LivePreviewListener = () => {
  const router = useRouter();
  return (
    <PayloadLivePreview refresh={router.refresh} serverURL={DMNO_PUBLIC_CONFIG.CMS_SERVER_URL} />
  );
};
