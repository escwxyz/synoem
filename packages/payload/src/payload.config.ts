import "dmno/auto-inject-globals";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { plugins } from "./plugins";
import { mutableLocales, defaultLocale } from "@synoem/config";

import { buildConfig } from "payload";
import { defaultLexical } from "./fields/default-lexical";

import { postgresAdapter } from "@payloadcms/db-postgres";

import { Footer, Header, CompanyInfo, ContactInfo, SocialLinks, FAQ } from "./globals";
// Media
import { Videos } from "./collections/media/videos";
import { Images } from "./collections/media/images";
import { Models } from "./collections/media/models";
import { Documents } from "./collections/media/documents";
import { Attachments } from "./collections/media/attachments";
// Forms
import { Inquiries } from "./collections/inquiries";
import { NewsletterSubscribers } from "./collections/newsletter";
// Testimonials
import { Testimonials } from "./collections/testimonials";
// Product Related
import { Instructions } from "./collections/instructions";
import { PackagingConfigs } from "./collections/packaging-configs";
import { Datasheets } from "./collections/datasheets";
import { Warranties } from "./collections/warranties";
import { Drawings } from "./collections/drawings";
// Users
import { Users } from "./collections/users";
// Industries
import { Industries } from "./collections/industries";
// Pages
import { Pages } from "./collections/pages";
// Posts
import { Posts } from "./collections/posts";

// TODO: re-export all collections from index.ts
import {
  SolarPanels,
  PumpControllers,
  productCategoryCollections,
  Notifications,
  Certifications,
} from "./collections";

import { resendAdapter } from "@payloadcms/email-resend";

const filename = fileURLToPath(import.meta.url);
const dirname = path.dirname(filename);

export default buildConfig({
  routes: {
    admin: "/dashboard",
  },
  admin: {
    components: {
      views: {},
      graphics: {},
    },
    importMap: {
      baseDir: path.resolve(dirname, "../../../apps/cms/src"),
      importMapFile: path.resolve(
        dirname,
        "../../../apps/cms/src/app/(payload)/admin/importMap.js",
      ),
    },
    suppressHydrationWarning: DMNO_CONFIG.CMS_APP_ENV === "production",
    livePreview: {
      url: ({ collectionConfig, locale, data }) => {
        if (collectionConfig?.slug === "pages") {
          const slug = data.slug === "home" ? "" : `/${data.slug}`;
          return `${DMNO_PUBLIC_CONFIG.WEB_SITE_URL}/${locale.code}${slug}`;
        }

        return DMNO_PUBLIC_CONFIG.WEB_SITE_URL;
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
      connectionString: DMNO_CONFIG.DATABASE_URI,
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
  cors: DMNO_CONFIG.CMS_APP_ENV === "production" ? [DMNO_PUBLIC_CONFIG.WEB_SITE_URL] : "*",
  secret: DMNO_CONFIG.PAYLOAD_SECRET,
  typescript: {
    outputFile: path.resolve(dirname, "../../types/src/index.ts"),
  },
  graphQL: {
    disable: true,
  },
  email: resendAdapter({
    defaultFromAddress: DMNO_CONFIG.RESEND_FROM_EMAIL,
    defaultFromName:
      DMNO_CONFIG.CMS_APP_ENV === "development"
        ? DMNO_PUBLIC_CONFIG.RESEND_FROM_NAME
        : DMNO_CONFIG.RESEND_FROM_NAME,
    apiKey: DMNO_CONFIG.RESEND_API_KEY,
  }),
  jobs: {
    tasks: [
      {
        slug: "send-email",
        handler: async ({ input, job, req }) => {
          console.log(input, job, req);
          return {
            output: "Email sent",
          };
        },
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

  telemetry: false,
});
