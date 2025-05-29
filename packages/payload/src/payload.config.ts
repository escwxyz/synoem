import path from "node:path";
import { fileURLToPath } from "node:url";
import { plugins } from "./plugins";
import { mutableLocales, defaultLocale } from "@synoem/config";
import { cmsEnvs } from "@synoem/env";
import { buildConfig } from "payload";
import { defaultLexical } from "./fields/default-lexical";
import { postgresAdapter } from "@payloadcms/db-postgres";
import { resendAdapter } from "@payloadcms/email-resend";
import { Footer, Header, CompanyInfo, ContactInfo, SocialLinks, FAQ } from "./globals";
import {
  SolarPanels,
  PumpControllers,
  productCategoryCollections,
  Notifications,
  Pages,
  NewsletterSubscribers,
  Inquiries,
  Images,
  Videos,
  Models,
  Documents,
  Attachments,
  PackagingConfigs,
  Datasheets,
  Warranties,
  Drawings,
  Instructions,
  Certifications,
  Testimonials,
  Users,
  Posts,
  Industries,
} from "./collections";
import sharp from "sharp";
import { sendNewsletterConfirmationEmail } from "./tasks/send-newsletter-confirmation-email";

const filename = fileURLToPath(import.meta.url);
const dirname = path.dirname(filename);

export default buildConfig({
  blocks: [],
  routes: {
    admin: "/dashboard",
  },
  admin: {
    components: {
      views: {},
      graphics: {
        Logo: {
          path: "/components/logo#Logo",
        },
        Icon: {
          path: "/components/nav-icon#NavIcon",
        },
      },
    },
    importMap: {
      baseDir: path.resolve(dirname, "../../../apps/cms/src"),
      importMapFile: path.resolve(
        dirname,
        "../../../apps/cms/src/app/(payload)/admin/importMap.js",
      ),
    },
    suppressHydrationWarning: cmsEnvs.CMS_APP_ENV === "production",
    livePreview: {
      url: ({ collectionConfig, locale, data }) => {
        if (collectionConfig?.slug === "pages") {
          const slug = data.slug === "home" ? "" : `/${data.slug}`;
          return `${cmsEnvs.NEXT_PUBLIC_WEB_SITE_URL}/${locale.code}${slug}`;
        }

        return cmsEnvs.NEXT_PUBLIC_WEB_SITE_URL;
      },
      collections: ["pages"],
      breakpoints: [
        {
          label: "Mobile",
          name: "mobile",
          width: 375,
          height: 667,
        },
        {
          label: "Tablet",
          name: "tablet",
          width: 768,
          height: 1024,
        },
        {
          label: "Desktop",
          name: "desktop",
          width: 1440,
          height: 900,
        },
      ],
    },
  },
  editor: defaultLexical,
  db: postgresAdapter({
    idType: "uuid",
    pool: {
      connectionString: cmsEnvs.DATABASE_URI,
    },
  }),
  collections: [
    Users,
    Pages,
    //
    Industries,
    //
    Notifications,
    // Forms
    Inquiries,
    NewsletterSubscribers,
    // Media
    Images,
    Videos,
    Models,
    Documents,
    Attachments,
    // Warranty
    Warranties,
    // Instructions
    Instructions,
    // Certifications
    Certifications,
    // Packaging Configs
    PackagingConfigs,
    // Datasheets
    Datasheets,
    // Drawings
    Drawings,
    // Testimonials
    Testimonials,
    // Posts
    Posts,
    // Products,
    SolarPanels,
    PumpControllers,
    ...productCategoryCollections,
  ],
  globals: [Footer, CompanyInfo, ContactInfo, SocialLinks, Header, FAQ],
  plugins: plugins(),
  localization: {
    defaultLocale,
    locales: mutableLocales,
    fallback: true,
  },
  cors: cmsEnvs.CMS_APP_ENV === "production" ? [cmsEnvs.NEXT_PUBLIC_WEB_SITE_URL] : "*",
  secret: cmsEnvs.PAYLOAD_SECRET,
  typescript: {
    outputFile: path.resolve(dirname, "../../types/src/index.ts"),
  },
  graphQL: {
    disable: true,
  },
  email: resendAdapter({
    defaultFromAddress: cmsEnvs.RESEND_FROM_EMAIL,
    defaultFromName:
      cmsEnvs.CMS_APP_ENV === "production" ? cmsEnvs.RESEND_FROM_NAME : cmsEnvs.RESEND_FROM_NAME,
    apiKey: cmsEnvs.RESEND_API_KEY,
  }),
  jobs: {
    autoRun: [
      {
        cron: "0/5 * * * *",
        limit: 10,
        queue: "every-5-minutes",
      },
    ],
    tasks: [
      {
        slug: "send-newsletter-confirmation-email",
        label: "Send Newsletter Confirmation Email to User",
        inputSchema: [
          {
            name: "email",
            type: "text",
            required: true,
          },
          {
            name: "createdAt",
            type: "text",
            required: true,
          },
          {
            name: "token",
            type: "text",
            required: true,
          },
        ],
        handler: sendNewsletterConfirmationEmail,
      },
      // {
      //   slug: "send-newsletter-notification-email-to-admin",
      //   label: "Send Newsletter Notification Email to Admin",
      //   handler: `${path.resolve(dirname, "./tasks/send-newsletter-notification-email-to-admin.ts")}#sendNewsletterNotificationEmailToAdmin`,
      // },
    ],
    jobsCollectionOverrides: ({ defaultJobsCollection }) => {
      if (!defaultJobsCollection.admin) {
        defaultJobsCollection.admin = {};
      }
      defaultJobsCollection.admin.hidden = false;
      return defaultJobsCollection;
    },
  },
  sharp,
  telemetry: false,
});
