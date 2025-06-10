import type { CollectionSlug, Payload, PayloadRequest, File, GlobalSlug } from "payload";
import { faqs } from "./data/faqs";
import { getAboutUsData, getHomeData } from "./data/pages";
import { getHeaderData } from "./data/header";
import { getHJTSolarPanelData, getTOPConSolarPanelData } from "./data/solar-panel";
import { termsData } from "./data/terms";
import { privacyPolicyData } from "./data/privacy-policy";
import { getFooterData } from "./data/footer";

const IMAGE_BASE_URL = `${process.env.NEXT_PUBLIC_S3_ENDPOINT}/object/public/${process.env.NEXT_PUBLIC_S3_BUCKET_NAME}/images/seed`;
const LOGO_BASE_URL = `${process.env.NEXT_PUBLIC_S3_ENDPOINT}/object/public/${process.env.NEXT_PUBLIC_S3_BUCKET_NAME}/icons`;

const globals: GlobalSlug[] = ["company-info", "contact-info", "social-links", "header"];

// Deleting order
const collections: CollectionSlug[] = [
  "faqs",
  "pages",
  "packaging-configs",
  "warranties",
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

    payload.logger.info("Fetching images...");

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

    console.log("createdFactoryImage to be used", createdFactoryImage);

    payload.logger.info("Images created");

    payload.logger.info("Seeding globals...");

    await payload.updateGlobal({
      slug: "company-info",
      data: {
        name: "SYNOEM",
        logo: createdLogo.id,
        openGraphImage: createdOpenGraphImage.id,
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

    const industry = await payload.create({
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

    const createFaqs = faqs.map((faq) =>
      payload.create({
        collection: "faqs",
        data: faq,
        locale: "en",
        context: {
          skipRevalidation: true,
        },
      }),
    );

    const createdFaqs = await Promise.all(createFaqs);

    payload.logger.info("Faqs created");

    const companyPage = await payload.create({
      collection: "pages",
      data: {
        title: "Company",
        slug: "company",
        layout: [
          {
            blockType: "contentBlock",
            columns: [
              {
                size: "full",
                richText: {
                  root: {
                    type: "root",
                    children: [
                      {
                        type: "paragraph",
                        version: 1,
                        children: [
                          {
                            type: "text",
                            text: "Company description",
                          },
                        ],
                      },
                    ],
                    direction: "ltr",
                    format: "left",
                    indent: 0,
                    version: 1,
                  },
                },
              },
            ],
          },
        ],
      },
      locale: "en",
      context: {
        skipRevalidation: true,
      },
    });

    payload.logger.info("Company page created");

    await payload.create({
      collection: "pages",
      data: getAboutUsData(companyPage.id),
      locale: "en",
      context: {
        skipRevalidation: true,
      },
    });

    payload.logger.info("About us page created");

    const [termsPage, privacyPolicyPage] = await Promise.all([
      payload.create({
        collection: "pages",
        data: {
          ...termsData,
          _status: "published",
        },
        locale: "en",
        context: {
          skipRevalidation: true,
        },
      }),
      payload.create({
        collection: "pages",
        data: {
          ...privacyPolicyData,
          _status: "published",
        },
        locale: "en",
        context: {
          skipRevalidation: true,
        },
      }),
    ]);

    payload.logger.info("Terms and privacy policy pages created");

    const images = {
      hero: [
        createdHeroContent1.id,
        createdHeroContent2.id,
        createdHeroContent3.id,
        createdHeroContent4.id,
        createdHeroContent5.id,
        createdHeroContent6.id,
      ],
      logos: {
        ce: createdCeLogo.id,
        mcs: createdMcsLogo.id,
        ul: createdUlLogo.id,
      },
    };

    await payload.create({
      collection: "pages",
      data: {
        ...getHomeData({
          logos: images.logos,
          heros: images.hero,
          faqs: createdFaqs.map((faq) => faq.id),
        }),
        _status: "published",
      },
      locale: "en",
      context: {
        skipRevalidation: true,
      },
    });

    payload.logger.info("Home page created");

    payload.logger.info("Pages created");

    await payload.updateGlobal({
      slug: "footer",
      data: getFooterData({
        termsPageId: termsPage.id,
        privacyPageId: privacyPolicyPage.id,
      }),
      locale: "en",
      context: {
        skipRevalidation: true,
      },
    });

    payload.logger.info("Footer updated");

    // TODO: posts

    const [hjtCategory, topconCategory] = await Promise.all([
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

    const [created936PackingConfig, created888PackingConfig] = await Promise.all([
      payload.create({
        collection: "packaging-configs",
        data: {
          title: "Solar Panel 936 Packing Config",
          unitQty: {
            value: 1,
            unit: "pcs",
          },
          qtyPerPallet: 37,
          containerType: "40HQ",
          pltsPerContainer: 26,
          totalQty: 962,
        },
        locale: "en",
        context: {
          skipRevalidation: true,
        },
      }),

      payload.create({
        collection: "packaging-configs",
        data: {
          title: "Solar Panel 888 Packing Config",
          unitQty: {
            value: 1,
            unit: "pcs",
          },
          qtyPerPallet: 37,
          containerType: "40HQ",
          pltsPerContainer: 24,
          totalQty: 888,
        },
        locale: "en",
        context: {
          skipRevalidation: true,
        },
      }),
    ]);

    payload.logger.info("Packaging configs created");

    const warranty = await payload.create({
      collection: "warranties",
      data: {
        title: "Solar Panel Warranty",
        productWarranty: true,
        descProduct: {
          root: {
            type: "root",
            children: [
              {
                type: "paragraph",
                children: [{ type: "text", text: "25-year Product Warranty" }],
                version: 1,
              },
            ],
            direction: "ltr",
            format: "left",
            indent: 0,
            version: 1,
          },
        },
        durationProduct: {
          value: 25,
          unit: "years",
        },
        powerWarranty: true,
        descPower: {
          root: {
            type: "root",
            children: [
              {
                type: "paragraph",
                children: [{ type: "text", text: "30-year Power Guarantee" }],
                version: 1,
              },
            ],
            direction: "ltr",
            format: "left",
            indent: 0,
            version: 1,
          },
        },
        durationPower: {
          value: 30,
          unit: "years",
        },
      },
    });

    payload.logger.info("Warranty created");

    await payload.create({
      collection: "solar-panels",
      data: {
        _status: "published",
        ...getTOPConSolarPanelData({
          industryId: industry.id,
          productCategoryId: topconCategory.id,
          heroImageId: createdSolarPanel1HeroImage.id,
          coverImageId: createdSolarPanel2HeroImage.id,
          variants: {
            gallery: [
              createdSolarPanel1ProductImage.id,
              createdSolarPanel2ProductImage.id,
              createdSolarPanel3ProductImage.id,
              createdSolarPanel4ProductImage.id,
            ],
          },
        }),
        packagingConfig: created936PackingConfig.id,
        warranty: warranty.id,
      },
      locale: "en",
      context: {
        skipRevalidation: true,
      },
    });

    await payload.create({
      collection: "solar-panels",
      data: {
        _status: "published",
        ...getHJTSolarPanelData({
          industryId: industry.id,
          productCategoryId: hjtCategory.id,
          heroImageId: createdSolarPanel1HeroImage.id,
          coverImageId: createdSolarPanel2HeroImage.id,
          variants: {
            gallery: [
              createdSolarPanel1ProductImage.id,
              createdSolarPanel2ProductImage.id,
              createdSolarPanel3ProductImage.id,
              createdSolarPanel4ProductImage.id,
            ],
          },
        }),
        packagingConfig: created888PackingConfig.id,
        warranty: warranty.id,
      },
      locale: "en",
      context: {
        skipRevalidation: true,
      },
    });

    payload.logger.info("Solar panels created");

    await payload.db.commitTransaction(transactionID);

    payload.logger.info("Seeding completed successfully");
  } catch (error) {
    payload.logger.error("Seeding failed:", error);
    payload.logger.info("Rolling back transaction...");

    await payload.db.rollbackTransaction(transactionID);

    throw error;
  }
};

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
