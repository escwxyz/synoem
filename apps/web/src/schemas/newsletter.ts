import { z } from "astro:schema";
import { termsSchema } from "./terms";

export const newsletterSchema = z
  .object({
    email: z.string().email(),
    name: z.string().optional(),
  })
  .merge(termsSchema);

export type NewsletterSchema = z.infer<typeof newsletterSchema>;
