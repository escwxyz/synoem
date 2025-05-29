import { createEnv } from "@t3-oss/env-nextjs";
import { z } from "zod";
import { skipValidation } from "./skip-validation";
import { nodeEnv, appEnv, webSiteUrl, cmsServerUrl, cmsApiUrl, revalidateSecret } from "./shared";

export const cmsEnvs = createEnv({
  shared: {
    CMS_APP_ENV: appEnv,
    NODE_ENV: nodeEnv,
  },
  server: {
    // Server-only environment variables
    // Could only be used in server side, sensitive
    DATABASE_URI: z.string().url(),
    PAYLOAD_SECRET: z.string().min(1),
    S3_ACCESS_KEY_ID: z.string().optional(),
    S3_ACCESS_KEY_SECRET: z.string().optional(),
    S3_BUCKET_NAME: z.string().optional(),
    S3_ENDPOINT: z.string().url().optional(),
    S3_REGION: z.string().optional(),
    RESEND_API_KEY: z.string().min(1),
    RESEND_FROM_EMAIL: z.string().email(),
    RESEND_FROM_NAME: z.string().min(1),
    VERCEL_TOKEN: z.string().optional(),
    VERCEL_ORG_ID: z.string().optional(),
    VERCEL_PROJECT_ID: z.string().optional(),
    REVALIDATE_SECRET: revalidateSecret,
  },
  client: {
    // Could be used in server and client side
    // No need to be sensitive
    NEXT_PUBLIC_CMS_SERVER_URL: cmsServerUrl,
    NEXT_PUBLIC_CMS_API_URL: cmsApiUrl,
    NEXT_PUBLIC_WEB_SITE_URL: webSiteUrl,
  },

  experimental__runtimeEnv: {
    NODE_ENV: process.env.NODE_ENV,
    CMS_APP_ENV: process.env.CMS_CMS_APP_ENV,
    NEXT_PUBLIC_CMS_SERVER_URL: process.env.NEXT_PUBLIC_CMS_SERVER_URL,
    NEXT_PUBLIC_CMS_API_URL: process.env.NEXT_PUBLIC_CMS_API_URL,
    NEXT_PUBLIC_WEB_SITE_URL: process.env.NEXT_PUBLIC_WEB_SITE_URL,
  },
  skipValidation,
  emptyStringAsUndefined: true,
  createFinalSchema: (shape) => {
    // TODO: replace with `check` when stable
    return z.object(shape).superRefine((env, ctx) => {
      const missingVars: string[] = [];

      if (env.CMS_APP_ENV === "production" || env.CMS_APP_ENV === "preview") {
        if (!env.S3_ACCESS_KEY_ID) missingVars.push("S3_ACCESS_KEY_ID");
        if (!env.S3_ACCESS_KEY_SECRET) missingVars.push("S3_ACCESS_KEY_SECRET");
        if (!env.S3_BUCKET_NAME) missingVars.push("S3_BUCKET_NAME");
        if (!env.S3_ENDPOINT) missingVars.push("S3_ENDPOINT");
        if (!env.S3_REGION) missingVars.push("S3_REGION");

        if (process.env.VERCEL_ENV) {
          if (!env.VERCEL_TOKEN) missingVars.push("VERCEL_TOKEN");
          if (!env.VERCEL_ORG_ID) missingVars.push("VERCEL_ORG_ID");
          if (!env.VERCEL_PROJECT_ID) missingVars.push("VERCEL_PROJECT_ID");
        }

        if (missingVars.length > 0) {
          ctx.addIssue({
            code: z.ZodIssueCode.custom,
            message: `Missing required env variables: ${missingVars.join(", ")}`,
          });
        }
      }
    });
  },
});

export type CMSEnvs = typeof cmsEnvs;

export const webEnvs = createEnv({
  shared: {
    WEB_APP_ENV: appEnv,
    NODE_ENV: nodeEnv,
  },
  server: {
    REVALIDATE_SECRET: revalidateSecret,
    ANALYZE: z
      .enum(["true", "false"])
      .optional()
      .default("false")
      .transform((analyze) => analyze === "true"),
  },
  client: {
    NEXT_PUBLIC_CMS_SERVER_URL: cmsServerUrl,
    NEXT_PUBLIC_CMS_API_URL: cmsApiUrl,
    NEXT_PUBLIC_WEB_SITE_URL: webSiteUrl,
    NEXT_PUBLIC_GOOGLE_ANALYTICS_ID: z.string().optional(),
  },
  experimental__runtimeEnv: {
    NODE_ENV: process.env.NODE_ENV,
    WEB_APP_ENV: process.env.WEB_APP_ENV,
    NEXT_PUBLIC_CMS_SERVER_URL: process.env.NEXT_PUBLIC_CMS_SERVER_URL,
    NEXT_PUBLIC_CMS_API_URL: process.env.NEXT_PUBLIC_CMS_API_URL,
    NEXT_PUBLIC_WEB_SITE_URL: process.env.NEXT_PUBLIC_WEB_SITE_URL,
    NEXT_PUBLIC_GOOGLE_ANALYTICS_ID: process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS_ID,
  },
  skipValidation,
  emptyStringAsUndefined: true,
  createFinalSchema: (shape) => {
    return z.object(shape).superRefine((env, ctx) => {
      if (env.WEB_APP_ENV === "production") {
        if (!env.NEXT_PUBLIC_GOOGLE_ANALYTICS_ID) {
          ctx.addIssue({
            code: z.ZodIssueCode.custom,
            message: "NEXT_PUBLIC_GOOGLE_ANALYTICS_ID is required in production",
          });
        }
      }
    });
  },
});

export type WebEnvs = typeof webEnvs;
