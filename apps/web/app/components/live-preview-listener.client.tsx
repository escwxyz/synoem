"use client";

import { RefreshRouteOnSave as PayloadLivePreview } from "@payloadcms/live-preview-react";
import { useRouter } from "@/i18n/navigation";
import { webEnvs } from "@synoem/env";

export const LivePreviewListener = () => {
  const router = useRouter();
  return (
    <PayloadLivePreview refresh={router.refresh} serverURL={webEnvs.NEXT_PUBLIC_CMS_SERVER_URL} />
  );
};
