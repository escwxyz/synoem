"use client";

import { Turnstile } from "@marsidev/react-turnstile";
import { useSetAtom } from "jotai";
import { cloudflareTurnstileTokenAtom } from "~/atoms";

interface Props {
  id?: string;
}

export const CloudflareTurnstile = ({ id }: Props) => {
  const setToken = useSetAtom(cloudflareTurnstileTokenAtom);
  return (
    <Turnstile
      id={id}
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
