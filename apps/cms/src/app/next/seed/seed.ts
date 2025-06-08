import type { CollectionSlug, Payload, PayloadRequest, File, GlobalSlug } from "payload";
import { faqs } from "./data/faqs";
import { pages } from "./data/pages";
import { getHeaderData } from "./data/header";

const IMAGE_BASE_URL = `${process.env.NEXT_PUBLIC_S3_ENDPOINT}/object/public/${process.env.NEXT_PUBLIC_S3_BUCKET_NAME}/images/seed`;

const globals: GlobalSlug[] = ["company-info", "contact-info", "social-links", "header"];

// Deleting order
const collections: CollectionSlug[] = [
  "faqs",
  "pages",
  "solar-panels",
  "solar-panel-categories",
  "industries",
  "images",
];

export const seed = async ({
  payload,
  req,
}: { payload: Payload; req: PayloadRequest }): Promise<void> => {
  payload.logger.info("Seeding database...");

  if (!process.env.NEXT_PUBLIC_S3_ENDPOINT || !process.env.NEXT_PUBLIC_S3_BUCKET_NAME) {
    payload.logger.error("S3_ENDPOINT and S3_BUCKET_NAME must be set");
    return;
  }

  const transactionID = await payload.db.beginTransaction();

  if (!transactionID) {
    payload.logger.error("Failed to begin transaction");
    return;
  }

  try {
    payload.logger.info("Clearing collections and globals...");

    await resetDatabase(payload, req);

    payload.logger.info("Database cleared");

    const [
      industryCoverImage,
      hjtHeroImage,
      topconHeroImage,
      solarPanel1HeroImage,
      solarPanel2HeroImage,
      logo,
      openGraphImage,
    ] = await Promise.all([
      fetchFileByURL(`${IMAGE_BASE_URL}/industry-cover-image.jpg`),
      fetchFileByURL(`${IMAGE_BASE_URL}/hjt-hero.jpg`),
      fetchFileByURL(`${IMAGE_BASE_URL}/topcon-hero.jpg`),
      fetchFileByURL(`${IMAGE_BASE_URL}/solar-panel-1-hero.jpg`),
      fetchFileByURL(`${IMAGE_BASE_URL}/solar-panel-2-hero.jpg`),
      fetchFileByURL(`${IMAGE_BASE_URL}/logo-transparent.svg`),
      fetchFileByURL(`${IMAGE_BASE_URL}/open-graph.png`),
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
    ]);

    payload.logger.info("Images created");

    payload.logger.info("Seeding globals...");

    await payload.updateGlobal({
      slug: "company-info",
      data: {
        name: "Synoem",
        logo: createdLogo.id,
        openGraphImage: createdOpenGraphImage.id,
        shortDescription: "Where Synergy Flows",
        longDescription:
          "Synoem is a professional renewable energy products manufacturer and supplier, specializing in the production of high-quality solar panels, inverters, storage systems, and other renewable energy products for both residential and commercial applications.",
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
        createdSolarPanel1HeroImage.id,
        createdSolarPanel2HeroImage.id,
        createdIndustryCoverImage.id,
      ),
      locale: "en",
      context: {
        skipRevalidation: true,
      },
    });

    payload.logger.info("Header updated");

    // await payload.updateGlobal({
    //   slug: "footer",
    //   data: {
    //     copyright: "All rights reserved.",
    //     links: [],
    //   },
    //   locale: "en",
    //   context: {
    //     skipRevalidation: true,
    //   },
    // });

    await payload.create({
      collection: "industries",
      data: {
        title: "Renewable Energy Test",
        slug: "renewable-energy-test",
        description:
          "Renewable energy is a type of energy that is generated from natural resources that are replenished by the sun, wind, water, and geothermal heat.",
        coverImage: createdIndustryCoverImage.id,
      },
      context: {
        skipRevalidation: true,
      },
      locale: "en",
    });

    payload.logger.info("Industry created");

    await Promise.all([
      payload.create({
        collection: "solar-panel-categories",
        data: {
          title: "hjt",
          slug: "hjt",
          description:
            "HJT, short for Heterojunction, refers to a type of solar panel technology that uses a combination of crystalline silicon (c-Si) and thin-film amorphous silicon (a-Si) to create a high-efficiency photovoltaic cell.",
          heroImage: createdHjtHeroImage.id,
        },
        context: {
          skipRevalidation: true,
        },
        locale: "en",
      }),
      payload.create({
        collection: "solar-panel-categories",
        data: {
          title: "topcon",
          slug: "topcon",
          description:
            "TOPCon, or tunnel oxide passivated contact, was introduced to the industry in 2013 by the Fraunhofer Institute for Solar Energy Systems.",
          heroImage: createdTopconHeroImage.id,
        },
        context: {
          skipRevalidation: true,
        },
        locale: "en",
      }),
    ]);

    payload.logger.info("Solar panel categories created");

    for (const faq of faqs) {
      await payload.create({
        collection: "faqs",
        data: faq,
        locale: "en",
        context: {
          skipRevalidation: true,
        },
      });
    }

    payload.logger.info("Faqs created");

    for (const page of pages) {
      await payload.create({
        collection: "pages",
        data: page,
        locale: "en",
        context: {
          skipRevalidation: true,
        },
      });
    }

    payload.logger.info("Pages created");

    await payload.db.commitTransaction(transactionID);

    payload.logger.info("Seeding completed successfully");
  } catch (error) {
    payload.logger.error("Seeding failed:", error);
    payload.logger.info("Rolling back transaction...");

    await payload.db.rollbackTransaction(transactionID);

    return;
  }
};

function getMimeType(filename: string): string {
  const ext = filename.split(".").pop()?.toLowerCase();
  if (ext === "svg") return "image/svg+xml";
  if (ext === "jpg" || ext === "jpeg") return "image/jpeg";
  if (ext === "png") return "image/png";
  // Add more types as needed
  return `image/${ext}`;
}

async function fetchFileByURL(url: string): Promise<File> {
  if (!url.startsWith(IMAGE_BASE_URL)) {
    throw new Error(`Invalid URL: ${url}`);
  }

  const res = await fetch(url, {
    credentials: "include",
    method: "GET",
  });

  if (!res.ok) {
    throw new Error(`Failed to fetch file from ${url}, status: ${res.status}`);
  }

  const data = await res.arrayBuffer();
  const name = url.split("/").pop() || `file-${Date.now()}`;

  return {
    name,
    data: Buffer.from(data),
    mimetype: getMimeType(name),
    size: data.byteLength,
  };
}

async function resetDatabase(payload: Payload, req: PayloadRequest) {
  try {
    await Promise.all(
      globals.map((global) =>
        payload.updateGlobal({
          slug: global,
          data: {},
          depth: 0,
          context: {
            skipRevalidation: true,
          },
        }),
      ),
    );

    for (const collection of collections) {
      await payload.db.deleteMany({ collection, req, where: {} });
    }
    await Promise.all(
      collections
        .filter((collection) => Boolean(payload.collections[collection].config.versions))
        .map((collection) => payload.db.deleteVersions({ collection, req, where: {} })),
    );
  } catch (error) {
    payload.logger.error("Resetting database failed:", error);
    throw error;
  }
}
