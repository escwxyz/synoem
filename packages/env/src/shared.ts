import { z } from "zod";

export const appEnv = z.enum(["development", "production", "preview"]).default("development");

export const nodeEnv = z
  .string()
  .optional()
  .default("development")
  .pipe(z.enum(["development", "production", "test"]));

export const cmsServerUrl = z.string().url().optional().default("http://localhost:3000");

export const cmsApiUrl = z.string().url().optional().default("http://localhost:3000/rpc");

export const webSiteUrl = z.string().url().optional().default("http://localhost:3001");

export const revalidateSecret = z.string().min(1);
