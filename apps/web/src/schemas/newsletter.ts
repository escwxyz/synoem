import { z } from "astro:schema";
import { termsSchema } from "./terms";

export const newsletterSchema = z.object({
  email: z.string().email(),
});

export type NewsletterSchema = z.infer<typeof newsletterSchema>;
export type NewsletterFormValues = z.infer<typeof newsletterSchema>;
