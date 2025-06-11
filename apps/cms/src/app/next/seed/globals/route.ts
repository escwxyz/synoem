import { getPayloadClient } from "@synoem/payload/client";
import { headers } from "next/headers";
import { NextRequest } from "next/server";
import { footerData, getHeaderData } from "./data";

export async function POST(req: NextRequest): Promise<Response> {
  const payload = await getPayloadClient();
  const requestHeaders = await headers();

  // Authenticate by passing request headers
  const { user } = await payload.auth({ headers: requestHeaders });

  if (!user) {
    return new Response("Action forbidden.", { status: 403 });
  }

  let body: unknown;
  try {
    body = await req.json();
  } catch {
    return new Response(JSON.stringify({ message: "Invalid JSON" }), { status: 400 });
  }

  const { images } = body as {
    images: {
      createdIndustryCoverImage: string;
      createdHjtHeroImage: string;
      createdTopconHeroImage: string;
      createdSolarPanel1HeroImage: string;
      createdSolarPanel2HeroImage: string;
      createdLogo: string;
      createdOpenGraphImage: string;
      createdFactoryImage: string;
      createdSolarPanel1ProductImage: string;
      createdSolarPanel2ProductImage: string;
      createdSolarPanel3ProductImage: string;
      createdSolarPanel4ProductImage: string;
      createdCeLogo: string;
      createdUlLogo: string;
      createdMcsLogo: string;
      createdHeroContent1: string;
      createdHeroContent2: string;
      createdHeroContent3: string;
      createdHeroContent4: string;
      createdHeroContent5: string;
      createdHeroContent6: string;
    };
  };

  try {
    // Create a Payload request object to pass to the Local API for transactions
    // At this point you should pass in a user, locale, and any other context you need for the Local API
    //   const payloadReq = await createLocalReq({ user }, payload);

    //   await resetDatabase(payload, payloadReq);

    const startTime = Date.now();
    payload.logger.info("Seeding globals...");

    await payload.updateGlobal({
      slug: "company-info",
      data: {
        name: "SYNOEM",
        logo: images.createdLogo,
        openGraphImage: images.createdOpenGraphImage,
        shortDescription: "Where Synergy Flows",
        longDescription:
          "SYNOEM is a professional renewable energy products manufacturer and supplier, specializing in the production of high-quality solar panels, inverters, storage systems, and other renewable energy products for both residential and commercial applications.",
      },
      locale: "en",
      context: {
        skipRevalidation: true,
      },
    });

    payload.logger.info("Company info updated");

    await payload.updateGlobal({
      slug: "contact-info",
      data: {
        addresses: [
          {
            line1: "No. 123, Jingang Road",
            line2: "Jingang Industrial Park",
            city: "Shanghai",
            zip: "200000",
            country: "China",
          },
        ],
        phone: "+1234567890",
        email: "info@synoem.com",
      },
      locale: "en",
      context: {
        skipRevalidation: true,
      },
    });

    payload.logger.info("Contact info updated");

    await payload.updateGlobal({
      slug: "social-links",
      data: {
        links: [
          {
            platform: "facebook",
            url: "https://www.facebook.com/synoem",
          },
          {
            platform: "instagram",
            url: "https://www.instagram.com/synoem",
          },
          {
            platform: "linkedin",
            url: "https://www.linkedin.com/company/synoem",
          },
          {
            platform: "whatsapp",
            url: "https://wa.me/1234567890",
          },
        ],
      },
      context: {
        skipRevalidation: true,
      },
    });

    payload.logger.info("Social links updated");

    await payload.updateGlobal({
      slug: "header",
      data: getHeaderData(
        images.createdSolarPanel1HeroImage,
        images.createdSolarPanel2HeroImage,
        images.createdIndustryCoverImage,
      ),
      locale: "en",
      context: {
        skipRevalidation: true,
      },
    });

    payload.logger.info("Header updated");

    await payload.updateGlobal({
      slug: "footer",
      data: footerData,
      locale: "en",
      context: {
        skipRevalidation: true,
      },
    });

    payload.logger.info("Footer updated");

    const endTime = Date.now();
    const duration = endTime - startTime;
    payload.logger.info(`Globals created in ${duration}ms`);

    payload.logger.info("Globals created");

    return Response.json({ success: true });
  } catch (e) {
    payload.logger.error({ err: e, message: "Error seeding data" });
    return new Response("Error seeding data.", { status: 500 });
  }
}
