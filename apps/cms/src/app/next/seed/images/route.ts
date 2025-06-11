import type { File } from "payload";
import { getPayloadClient } from "@synoem/payload/client";
import { headers } from "next/headers";
import { ResponseBody } from "../types";

export const maxDuration = 60;

const IMAGE_BASE_URL = `${process.env.NEXT_PUBLIC_S3_ENDPOINT}/object/public/${process.env.NEXT_PUBLIC_S3_BUCKET_NAME}/images/seed`;
const LOGO_BASE_URL = `${process.env.NEXT_PUBLIC_S3_ENDPOINT}/object/public/${process.env.NEXT_PUBLIC_S3_BUCKET_NAME}/icons`;

function getMimeType(filename: string): string {
  const ext = filename.split(".").pop()?.toLowerCase();
  if (ext === "svg") return "image/svg+xml";
  if (ext === "jpg" || ext === "jpeg") return "image/jpeg";
  if (ext === "png") return "image/png";
  if (ext === "webp") return "image/webp";
  if (ext === "gif") return "image/gif";

  throw new Error(`Unsupported file type: ${ext}`);
}

async function fetchFileByURL(url: string): Promise<File> {
  if (!url.startsWith(IMAGE_BASE_URL) && !url.startsWith(LOGO_BASE_URL)) {
    throw new Error(`Invalid URL: ${url}`);
  }

  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), 60000);

  try {
    const res = await fetch(url, {
      credentials: "include",
      method: "GET",
      signal: controller.signal,
    });
    clearTimeout(timeout);

    if (!res.ok) {
      throw new Error(`Failed to fetch file from ${url}, status: ${res.status}`);
    }
    const data = await res.arrayBuffer();
    const name = url.split("/").pop() || `file-${Date.now()}`;

    console.log("File fetched", name);

    return {
      name,
      data: Buffer.from(data),
      mimetype: getMimeType(name),
      size: data.byteLength,
    };
  } catch (error) {
    clearTimeout(timeout);
    console.log("Fetching file from", url, "failed", error);
    throw error;
  }
}

export async function POST(): Promise<Response> {
  const payload = await getPayloadClient();
  const requestHeaders = await headers();

  // Authenticate by passing request headers
  const { user } = await payload.auth({ headers: requestHeaders });

  if (!user) {
    return new Response("Action forbidden.", { status: 403 });
  }

  try {
    // Create a Payload request object to pass to the Local API for transactions
    // At this point you should pass in a user, locale, and any other context you need for the Local API
    // const payloadReq = await createLocalReq({ user }, payload);

    const startTime = Date.now();

    const [
      industryCoverImage,
      hjtHeroImage,
      topconHeroImage,
      solarPanel1HeroImage,
      solarPanel2HeroImage,
      logo,
      openGraphImage,
      factoryImage,
      solarPanel1ProductImage,
      solarPanel2ProductImage,
      solarPanel3ProductImage,
      solarPanel4ProductImage,
      // logos
      ceLogo,
      ulLogo,
      mcsLogo,
      // hero images
      heroContent1,
      heroContent2,
      heroContent3,
      heroContent4,
      heroContent5,
      heroContent6,
    ] = await Promise.all([
      fetchFileByURL(`${IMAGE_BASE_URL}/industry-cover-image.jpg`),
      fetchFileByURL(`${IMAGE_BASE_URL}/hjt-hero.jpg`),
      fetchFileByURL(`${IMAGE_BASE_URL}/topcon-hero.jpg`),
      fetchFileByURL(`${IMAGE_BASE_URL}/solar-panel-1-hero.jpg`),
      fetchFileByURL(`${IMAGE_BASE_URL}/solar-panel-2-hero.jpg`),
      fetchFileByURL(`${IMAGE_BASE_URL}/logo-transparent.svg`),
      fetchFileByURL(`${IMAGE_BASE_URL}/open-graph.png`),
      fetchFileByURL(`${IMAGE_BASE_URL}/factory.jpg`),
      // solar panel product images
      fetchFileByURL(`${IMAGE_BASE_URL}/solar-panel_1.png`),
      fetchFileByURL(`${IMAGE_BASE_URL}/solar-panel_2.png`),
      fetchFileByURL(`${IMAGE_BASE_URL}/solar-panel_3.png`),
      fetchFileByURL(`${IMAGE_BASE_URL}/solar-panel_4.png`),

      // logos
      fetchFileByURL(`${LOGO_BASE_URL}/ce.svg`),
      fetchFileByURL(`${LOGO_BASE_URL}/ul.svg`),
      fetchFileByURL(`${LOGO_BASE_URL}/mcs.svg`),

      // Hero images
      fetchFileByURL(`${IMAGE_BASE_URL}/hero-content-1.jpg`),
      fetchFileByURL(`${IMAGE_BASE_URL}/hero-content-2.jpg`),
      fetchFileByURL(`${IMAGE_BASE_URL}/hero-content-3.jpg`),
      fetchFileByURL(`${IMAGE_BASE_URL}/hero-content-4.png`),
      fetchFileByURL(`${IMAGE_BASE_URL}/hero-content-5.png`),
      fetchFileByURL(`${IMAGE_BASE_URL}/hero-content-6.png`),
    ]);

    payload.logger.info("Images fetched");

    // images
    const [
      createdIndustryCoverImage,
      createdHjtHeroImage,
      createdTopconHeroImage,
      createdSolarPanel1HeroImage,
      createdSolarPanel2HeroImage,
      createdLogo,
      createdOpenGraphImage,
      createdFactoryImage,
      createdSolarPanel1ProductImage,
      createdSolarPanel2ProductImage,
      createdSolarPanel3ProductImage,
      createdSolarPanel4ProductImage,
      createdCeLogo,
      createdUlLogo,
      createdMcsLogo,
      createdHeroContent1,
      createdHeroContent2,
      createdHeroContent3,
      createdHeroContent4,
      createdHeroContent5,
      createdHeroContent6,
    ] = await Promise.all([
      payload.create({
        collection: "images",
        data: {
          alt: "Renewable Energy",
        },
        file: industryCoverImage,
        context: {
          skipRevalidation: true,
        },
      }),
      payload.create({
        collection: "images",
        data: {
          alt: "HJT Solar Panel",
        },
        file: hjtHeroImage,
        context: {
          skipRevalidation: true,
        },
      }),
      payload.create({
        collection: "images",
        data: {
          alt: "Topcon Solar Panel",
        },
        file: topconHeroImage,
        context: {
          skipRevalidation: true,
        },
      }),
      payload.create({
        collection: "images",
        data: {
          alt: "Solar Panel 1",
        },
        file: solarPanel1HeroImage,
        context: {
          skipRevalidation: true,
        },
      }),
      payload.create({
        collection: "images",
        data: {
          alt: "Solar Panel 2",
        },
        file: solarPanel2HeroImage,
        context: {
          skipRevalidation: true,
        },
      }),
      payload.create({
        collection: "images",
        data: {
          alt: "Logo",
        },
        file: logo,
        context: {
          skipRevalidation: true,
        },
      }),
      payload.create({
        collection: "images",
        data: {
          alt: "Open Graph Image",
        },
        file: openGraphImage,
        context: {
          skipRevalidation: true,
        },
      }),
      payload.create({
        collection: "images",
        data: {
          alt: "Factory",
        },
        file: factoryImage,
        context: {
          skipRevalidation: true,
        },
      }),

      // solar panel product images
      payload.create({
        collection: "images",
        data: {
          alt: "Solar Panel 1 Product",
        },
        file: solarPanel1ProductImage,
        context: {
          skipRevalidation: true,
        },
      }),
      payload.create({
        collection: "images",
        data: {
          alt: "Solar Panel 2 Product",
        },
        file: solarPanel2ProductImage,
        context: {
          skipRevalidation: true,
        },
      }),
      payload.create({
        collection: "images",
        data: {
          alt: "Solar Panel 3 Product",
        },
        file: solarPanel3ProductImage,
        context: {
          skipRevalidation: true,
        },
      }),
      payload.create({
        collection: "images",
        data: {
          alt: "Solar Panel 4 Product",
        },
        file: solarPanel4ProductImage,
        context: {
          skipRevalidation: true,
        },
      }),

      // logos
      payload.create({
        collection: "images",
        data: {
          alt: "CE Logo",
        },
        file: ceLogo,
        context: {
          skipRevalidation: true,
        },
      }),
      payload.create({
        collection: "images",
        data: {
          alt: "UL Logo",
        },
        file: ulLogo,
        context: {
          skipRevalidation: true,
        },
      }),
      payload.create({
        collection: "images",
        data: {
          alt: "MCS Logo",
        },
        file: mcsLogo,
        context: {
          skipRevalidation: true,
        },
      }),

      // hero images
      payload.create({
        collection: "images",
        data: {
          alt: "Hero Content 1",
        },
        file: heroContent1,
        context: {
          skipRevalidation: true,
        },
      }),
      payload.create({
        collection: "images",
        data: {
          alt: "Hero Content 2",
        },
        file: heroContent2,
        context: {
          skipRevalidation: true,
        },
      }),
      payload.create({
        collection: "images",
        data: {
          alt: "Hero Content 3",
        },
        file: heroContent3,
        context: {
          skipRevalidation: true,
        },
      }),

      payload.create({
        collection: "images",
        data: {
          alt: "Hero Content 4",
        },
        file: heroContent4,
        context: {
          skipRevalidation: true,
        },
      }),

      payload.create({
        collection: "images",
        data: {
          alt: "Hero Content 5",
        },
        file: heroContent5,
        context: {
          skipRevalidation: true,
        },
      }),

      payload.create({
        collection: "images",
        data: {
          alt: "Hero Content 6",
        },
        file: heroContent6,
        context: {
          skipRevalidation: true,
        },
      }),
    ]);

    const endTime = Date.now();
    const duration = endTime - startTime;
    console.log(`Images created in ${duration}ms`);

    console.log("createdFactoryImage to be used", createdFactoryImage);

    payload.logger.info("Images created");

    const responseBody: ResponseBody = {
      success: true,
      images: {
        createdIndustryCoverImage: createdIndustryCoverImage.id,
        createdHjtHeroImage: createdHjtHeroImage.id,
        createdTopconHeroImage: createdTopconHeroImage.id,
        createdSolarPanel1HeroImage: createdSolarPanel1HeroImage.id,
        createdSolarPanel2HeroImage: createdSolarPanel2HeroImage.id,
        createdLogo: createdLogo.id,
        createdOpenGraphImage: createdOpenGraphImage.id,
        createdFactoryImage: createdFactoryImage.id,
        createdSolarPanel1ProductImage: createdSolarPanel1ProductImage.id,
        createdSolarPanel2ProductImage: createdSolarPanel2ProductImage.id,
        createdSolarPanel3ProductImage: createdSolarPanel3ProductImage.id,
        createdSolarPanel4ProductImage: createdSolarPanel4ProductImage.id,
        createdCeLogo: createdCeLogo.id,
        createdUlLogo: createdUlLogo.id,
        createdMcsLogo: createdMcsLogo.id,
        createdHeroContent1: createdHeroContent1.id,
        createdHeroContent2: createdHeroContent2.id,
        createdHeroContent3: createdHeroContent3.id,
        createdHeroContent4: createdHeroContent4.id,
        createdHeroContent5: createdHeroContent5.id,
        createdHeroContent6: createdHeroContent6.id,
      },
    };

    return Response.json(responseBody);
  } catch (e) {
    payload.logger.error({ err: e, message: "Error seeding data" });
    return new Response("Error seeding data.", { status: 500 });
  }
}
