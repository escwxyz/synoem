import "dmno/auto-inject-globals";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { plugins } from "./plugins";
import { mutableLocales, defaultLocale } from "@synoem/config";

import { buildConfig } from "payload";
import { defaultLexical } from "./fields/default-lexical";

import { postgresAdapter } from "@payloadcms/db-postgres";
import { ContactInfo } from "./globals/contact-info";
import { CompanyInfo } from "./globals/company-info";

import { Footer } from "./globals/footer";
import { Header } from "./globals/header";
import { SocialLinks } from "./globals/social-links";
// Media
import { Videos } from "./collections/media/videos";
import { Images } from "./collections/media/images";
import { Models } from "./collections/media/models";
import { Documents } from "./collections/media/documents";
import { Attachments } from "./collections/media/attachments";
// Forms
import { Inquiries } from "./collections/inquiries";
import { NewsletterSubscribers } from "./collections/newsletter";
// Products
import { Products } from "./collections/products";
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
// Notifications
import { Notifications } from "./collections/notifications";

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
  db: postgresAdapter({
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
    // Products
    Products,
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
  telemetry: false,
});
