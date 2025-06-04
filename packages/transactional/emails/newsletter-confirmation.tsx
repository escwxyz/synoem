import {
  Body,
  Container,
  Head,
  Heading,
  Html,
  Link,
  Section,
  Text,
  Preview,
  Button,
  Hr,
  Img,
} from "@react-email/components";
import type { Locale } from "@synoem/config";
import { formatDate } from "../utils";

export interface Translations {
  preview: string;
  heading: string;
  greeting: string;
  thankYouMessage: string;
  joinedCommunity: string;
  whatToExpect: string;
  weeklyInsights: string;
  productUpdates: string;
  exclusiveContent: string;
  tipsAndPractices: string;
  visitWebsite: string;
  socialProof: string;
  copyright: string;
  address: string;
  website: string;
  privacyPolicy: string;
  unsubscribe: string;
}

export const translations: Record<Locale, Translations> = {
  en: {
    preview: "Thanks for subscribing to our newsletter!",
    heading: "Subscription Confirmed!",
    greeting: "Hi",
    thankYouMessage:
      "Thank you for subscribing to our newsletter. We're excited to share our latest updates, insights, and exclusive content with you.",
    joinedCommunity: "You've successfully joined our community on",
    whatToExpect: "What to expect:",
    weeklyInsights: "Weekly industry insights",
    productUpdates: "Product updates and announcements",
    exclusiveContent: "Exclusive subscriber-only content",
    tipsAndPractices: "Tips and best practices",
    visitWebsite: "Visit Our Website",
    socialProof:
      "Join thousands of professionals who trust our content to stay ahead in the industry.",
    copyright: "© 2025 SynOEM, All Rights Reserved",
    address: "123 Business Street, Suite 100, City, Country",
    website: "Website",
    privacyPolicy: "Privacy Policy",
    unsubscribe: "Unsubscribe",
  },
  de: {
    preview: "Danke für das Abonnieren unseres Newsletters!",
    heading: "Abonnement Bestätigt!",
    greeting: "Hallo",
    thankYouMessage:
      "Vielen Dank für das Abonnieren unseres Newsletters. Wir freuen uns darauf, unsere neuesten Updates, Einblicke und exklusive Inhalte mit Ihnen zu teilen.",
    joinedCommunity: "Sie sind unserer Community erfolgreich beigetreten am",
    whatToExpect: "Was Sie erwarten können:",
    weeklyInsights: "Wöchentliche Brancheneinblicke",
    productUpdates: "Produkt-Updates und Ankündigungen",
    exclusiveContent: "Exklusive Inhalte nur für Abonnenten",
    tipsAndPractices: "Tipps und bewährte Methoden",
    visitWebsite: "Besuchen Sie Unsere Website",
    socialProof:
      "Schließen Sie sich Tausenden von Fachleuten an, die unserem Inhalt vertrauen, um in der Branche vorne zu bleiben.",
    copyright: "© 2025 SynOEM, Alle Rechte Vorbehalten",
    address: "123 Geschäftsstraße, Suite 100, Stadt, Land",
    website: "Website",
    privacyPolicy: "Datenschutzrichtlinie",
    unsubscribe: "Abmelden",
  },
};

interface NewsletterConfirmationEmailProps {
  subscriptionDate: string;
  unsubscribeUrl: string;
  language?: Locale;
  logoUrl: string;
  baseUrl: string;
}

export const NewsletterConfirmation = ({
  subscriptionDate,
  unsubscribeUrl,
  language = "en",
  logoUrl,
  baseUrl,
}: NewsletterConfirmationEmailProps) => {
  const url = `${baseUrl}/${language}`;
  const utmSource = "newsletter";
  const t = (translations[language] || translations.en) as Translations;

  const formattedDate = formatDate(subscriptionDate, language);

  return (
    <Html lang={language}>
      <Head />
      <Preview>{t.preview}</Preview>
      <Body style={main}>
        <Container style={container}>
          <Section style={logoContainer}>
            <Img src={logoUrl} width="80" height="80" alt="Logo" style={logo} />
          </Section>

          <Section style={section}>
            <Heading style={heading}>{t.heading}</Heading>
            <Text style={text}>{t.greeting},</Text>
            <Text style={text}>{t.thankYouMessage}</Text>
            <Text style={text}>
              {t.joinedCommunity} {formattedDate}.
            </Text>

            <Heading as="h2" style={subheading}>
              {t.whatToExpect}
            </Heading>
            <ul style={list}>
              <li style={listItem}>{t.weeklyInsights}</li>
              <li style={listItem}>{t.productUpdates}</li>
              <li style={listItem}>{t.exclusiveContent}</li>
              <li style={listItem}>{t.tipsAndPractices}</li>
            </ul>

            <Button style={button} href={`${url}?utm_source=${utmSource}`}>
              {t.visitWebsite}
            </Button>

            <Hr style={hr} />

            <Text style={socialProof}>{t.socialProof}</Text>
          </Section>

          <Section style={footer}>
            <Text style={footerText}>{t.copyright}</Text>
            <Text style={footerText}>{t.address}</Text>
            <Text style={footerLinks}>
              <Link href={`${url}?utm_source=${utmSource}`} style={link}>
                {t.website}
              </Link>{" "}
              •{" "}
              <Link href={`${baseUrl}/privacy?utm_source=${utmSource}`} style={link}>
                {t.privacyPolicy}
              </Link>{" "}
              •{" "}
              <Link href={`${unsubscribeUrl}&utm_source=${utmSource}`} style={link}>
                {t.unsubscribe}
              </Link>
            </Text>
          </Section>
        </Container>
      </Body>
    </Html>
  );
};

NewsletterConfirmation.PreviewProps = {
  subscriptionDate: "2025-01-01",
  unsubscribeUrl: "https://example.com/unsubscribe",
  language: "de",
  logoUrl: "https://example.com/placeholder.svg?height=48&width=180",
};

export default NewsletterConfirmation;

const main = {
  backgroundColor: "#f5f8f5",
  fontFamily:
    '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen-Sans, Ubuntu, Cantarell, "Helvetica Neue", sans-serif',
  padding: "30px 0",
};

const container = {
  backgroundColor: "#ffffff",
  border: "1px solid #e5e5e5",
  borderRadius: "5px",
  margin: "0 auto",
  maxWidth: "600px",
  overflow: "hidden",
};

const logoContainer = {
  backgroundColor: "#f5f8f5",
  padding: "20px 0",
  textAlign: "center" as const,
};

const logo = {
  margin: "0 auto",
};

const section = {
  padding: "30px 40px",
};

const heading = {
  color: "#2e7d32",
  fontSize: "24px",
  fontWeight: "bold",
  margin: "0 0 20px",
  textAlign: "center" as const,
};

const subheading = {
  color: "#2e7d32",
  fontSize: "18px",
  fontWeight: "bold",
  margin: "30px 0 10px",
};

const text = {
  color: "#333",
  fontSize: "16px",
  lineHeight: "24px",
  margin: "16px 0",
};

const list = {
  margin: "15px 0",
  padding: "0 0 0 20px",
};

const listItem = {
  color: "#333",
  fontSize: "16px",
  lineHeight: "24px",
  margin: "10px 0",
};

const button = {
  backgroundColor: "#2e7d32",
  borderRadius: "4px",
  color: "#fff",
  display: "inline-block",
  fontSize: "16px",
  fontWeight: "bold",
  margin: "25px 0 15px",
  textAlign: "center" as const,
  textDecoration: "none",
};

const hr = {
  border: "none",
  borderTop: "1px solid #eaeaea",
  margin: "30px 0",
};

const socialProof = {
  color: "#666",
  fontSize: "15px",
  fontStyle: "italic",
  margin: "20px 0",
  textAlign: "center" as const,
};

const footer = {
  backgroundColor: "#f5f8f5",
  padding: "20px 40px",
};

const footerText = {
  color: "#666",
  fontSize: "14px",
  margin: "5px 0",
  textAlign: "center" as const,
};

const footerLinks = {
  color: "#666",
  fontSize: "14px",
  margin: "15px 0 5px",
  textAlign: "center" as const,
};

const link = {
  color: "#2e7d32",
  textDecoration: "underline",
};
