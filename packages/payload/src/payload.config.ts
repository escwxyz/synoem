import "dmno/auto-inject-globals";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { plugins } from "./plugins";
import { mutableLocales, defaultLocale } from "@synoem/config";

import { buildConfig } from "payload";
import { defaultLexical } from "./fields/default-lexical";

// import { postgresAdapter } from "@payloadcms/db-postgres";
import { sqliteAdapter } from "@payloadcms/db-sqlite";

import { Footer, Header, CompanyInfo, ContactInfo, SocialLinks } from "./globals";
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
import { Certifications } from "./collections/certifications";
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
// Notifications
import { Notifications } from "./collections/notifications";

// TODO: re-export all collections from index.ts
import { SolarPanels, PumpControllers, productCategoryCollections } from "./collections";

import { FAQs } from "./collections/faqs";
import { resendAdapter } from "@payloadcms/email-resend";

const filename = fileURLToPath(import.meta.url);
const dirname = path.dirname(filename);

export default buildConfig({
  admin: {
    components: {
      views: {},
      graphics: {},
    },
    importMap: {
      baseDir: path.resolve(dirname),
    },
  },
  editor: defaultLexical,
  // db: postgresAdapter({
  //   pool: {
  //     connectionString: DMNO_CONFIG.DATABASE_URI,
  //   },
  // }),
  db: sqliteAdapter({
    idType: "uuid",
    client: {
      url: DMNO_CONFIG.TURSO_DATABASE_URI,
      authToken: DMNO_CONFIG.TURSO_DATABASE_TOKEN,
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
    FAQs,
    // Testimonials
    Testimonials,
    // Posts
    Posts,
    // Product Categories

    // // Variant Options
    // VariantOptions,
    // // Products
    // Products,
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
  cors: {
    origins: "*", // TODO: modify when in poroduction mode
  },
  secret: DMNO_CONFIG.PAYLOAD_SECRET,
  typescript: {
    outputFile: path.resolve(dirname, "payload-types.ts"),
  },
  graphQL: {
    disable: true,
  },
  email: resendAdapter({
    defaultFromAddress: "info@updates.synoem.com",
    defaultFromName: "SynOEM",
    apiKey: DMNO_CONFIG.RESEND_API_KEY || "",
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
