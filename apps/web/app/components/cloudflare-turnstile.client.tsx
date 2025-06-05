"use client";

import { Turnstile } from "@marsidev/react-turnstile";
import { useSetAtom } from "jotai";
import { cloudflareTurnstileTokenAtom } from "~/atoms";

export const CloudflareTurnstile = () => {
  const setToken = useSetAtom(cloudflareTurnstileTokenAtom);
  return (
    <Turnstile
      siteKey={process.env.NEXT_PUBLIC_CLOUDFLARE_TURNSTILE_SITE_KEY ?? "1x00000000000000000000AA"}
      options={{
        size: "flexible",
      }}
      scriptOptions={{
        appendTo: "body",
      }}
      onSuccess={setToken}
    />
  );
};
