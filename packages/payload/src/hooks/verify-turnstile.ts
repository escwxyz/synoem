import type { Inquiry } from "@synoem/types";
import { APIError, type CollectionBeforeChangeHook } from "payload";

export const verifyTurnstile: CollectionBeforeChangeHook<Inquiry> = async ({
  data,
  req,
  operation,
}) => {
  if (operation !== "create") {
    return;
  }

  req.payload.logger.info("Verifying turnstile token");

  const secret = "1x0000000000000000000000000000000AA";

  // const secret = process.env.CLOUDFLARE_TURNSTILE_SECRET_KEY;
  if (!secret) {
    throw new APIError("CLOUDFLARE_TURNSTILE_SECRET_KEY is not set", 500);
  }

  const { token } = data;

  if (!token) {
    throw new APIError("Turnstile token is required", 400);
  }

  const response = await fetch("https://challenges.cloudflare.com/turnstile/v0/siteverify", {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: `secret=${secret}&response=${token}`,
  });

  const result = await response.json();

  if (!result.success) {
    throw new APIError("Turnstile verification failed", 500);
  }

  req.payload.logger.info("Turnstile verification successful");

  return data;
};
