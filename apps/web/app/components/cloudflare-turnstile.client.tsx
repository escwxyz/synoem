"use client";

import { Turnstile } from "@marsidev/react-turnstile";
import { useSetAtom } from "jotai";
import { cloudflareTurnstileTokenAtom } from "~/atoms";

export const CloudflareTurnstile = () => {
  const setToken = useSetAtom(cloudflareTurnstileTokenAtom);
  return (
    <Turnstile
      siteKey={"1x00000000000000000000AA"}
      options={{
        size: "flexible",
      }}
      onSuccess={setToken}
    />
  );
};
