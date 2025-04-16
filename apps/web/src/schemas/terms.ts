import { z } from "astro:schema";

export const termsSchema = z.object({
  terms: z.coerce.boolean().refine((bool) => bool === true, {
    message: "You must agree to our terms and conditions",
  }),
});
