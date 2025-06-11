import { z } from "zod";

export const responseBodySchema = z.object({
  success: z.boolean(),
  images: z.object({
    createdIndustryCoverImage: z.string(),
    createdHjtHeroImage: z.string(),
    createdTopconHeroImage: z.string(),
    createdSolarPanel1HeroImage: z.string(),
    createdSolarPanel2HeroImage: z.string(),
    createdLogo: z.string(),
    createdOpenGraphImage: z.string(),
    createdFactoryImage: z.string(),
    createdSolarPanel1ProductImage: z.string(),
    createdSolarPanel2ProductImage: z.string(),
    createdSolarPanel3ProductImage: z.string(),
    createdSolarPanel4ProductImage: z.string(),
    createdCeLogo: z.string(),
    createdUlLogo: z.string(),
    createdMcsLogo: z.string(),
    createdHeroContent1: z.string(),
    createdHeroContent2: z.string(),
    createdHeroContent3: z.string(),
    createdHeroContent4: z.string(),
    createdHeroContent5: z.string(),
    createdHeroContent6: z.string(),
  }),
});

export type ResponseBody = z.infer<typeof responseBodySchema>;

export const seedImagesRequestSchema = responseBodySchema.pick({
  images: true,
});

export type SeedImagesRequest = z.infer<typeof seedImagesRequestSchema>;

export type ImageIds = SeedImagesRequest["images"];
