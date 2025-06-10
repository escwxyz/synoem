import path from "node:path";
import { fileURLToPath } from "node:url";
import { plugins } from "./plugins";
import { mutableLocales, defaultLocale } from "@synoem/config";
import { buildConfig } from "payload";
import { defaultLexical } from "./fields/default-lexical";
import { postgresAdapter } from "@payloadcms/db-postgres";
import { resendAdapter } from "@payloadcms/email-resend";
import { Footer, Header, CompanyInfo, ContactInfo, SocialLinks } from "./globals";
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
  Faqs,
} from "./collections";
import sharp from "sharp";
import { sendNewsletterConfirmationEmail } from "./tasks/send-newsletter-confirmation-email";
import { UNIQUE_PATH_COLLECTIONS } from "./fields";

const filename = fileURLToPath(import.meta.url);
const dirname = path.dirname(filename);

export default buildConfig({
  blocks: [],
  routes: {
    admin: "/dashboard",
  },
  admin: {
    autoLogin:
      process.env.CMS_APP_ENV === "development"
        ? {
            email: process.env.CMS_DEV_EMAIL || "",
            password: process.env.CMS_DEV_PASSWORD || "",
            prefillOnly: true,
          }
        : false,
    meta: {
      robots: "noindex, nofollow",
      titleSuffix: " | Synoem Dashboard",
      title: "Synoem Dashboard",
      description: "Synoem Dashboard",
      icons: [
        {
          rel: "icon",
          type: "image/x-icon",
          url: "/logos/favicon.ico",
        },
        {
          rel: "apple-touch-icon",
          type: "image/png",
          url: "/logos/apple-touch-icon.png",
        },
      ],
      openGraph: {
        description: "Synoem Dashboard",
        images: [],
        siteName: "Synoem Dashboard",
        title: "Synoem Dashboard",
      },
    },
    components: {
      beforeDashboard: ["@/components/before-dashboard#default"],
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
    suppressHydrationWarning: process.env.CMS_APP_ENV === "production",
    livePreview: {
      url: ({ collectionConfig, locale, data }) => {
        const slug = data.slug === "home" ? "" : data.path;
        return `${process.env.NEXT_PUBLIC_WEB_SITE_URL}/${locale.code}${slug}` || "";
      },
      collections: UNIQUE_PATH_COLLECTIONS,
      breakpoints: [
        {
          label: "Mobile",
          name: "mobile",
          width: 430,
          height: 932,
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
      connectionString: process.env.DATABASE_URI || "",
    },
    push: false,
  }),
  collections: [
    Users,
    Faqs,
    Pages,
    Industries,
    Notifications,
    Inquiries,
    NewsletterSubscribers,
    Images,
    Videos,
    Models,
    Documents,
    Attachments,
    Warranties,
    Instructions,
    Certifications,
    PackagingConfigs,
    Datasheets,
    Drawings,
    Testimonials,
    Posts,
    SolarPanels,
    PumpControllers,
    ...productCategoryCollections,
  ],
  globals: [Footer, CompanyInfo, ContactInfo, SocialLinks, Header],
  plugins: plugins(),
  localization: {
    defaultLocale,
    locales: mutableLocales,
    fallback: true,
  },
  cors:
    process.env.CMS_APP_ENV === "production" ? [process.env.NEXT_PUBLIC_WEB_SITE_URL || ""] : "*",
  secret: process.env.PAYLOAD_SECRET || "",
  typescript: {
    outputFile: path.resolve(dirname, "../../types/src/index.ts"),
  },
  graphQL: {
    disable: true,
  },
  email: resendAdapter({
    defaultFromAddress: process.env.RESEND_FROM_EMAIL || "",
    defaultFromName:
      process.env.CMS_APP_ENV === "production"
        ? process.env.RESEND_FROM_NAME || ""
        : process.env.RESEND_FROM_NAME || "",
    apiKey: process.env.RESEND_API_KEY || "",
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
  folders: {
    debug: process.env.CMS_APP_ENV === "development",
  },
});
