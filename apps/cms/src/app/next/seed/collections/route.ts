import { getPayloadClient } from "@synoem/payload/client";
import { NextRequest } from "next/server";
import { headers } from "next/headers";
import {
  faqs,
  getAboutUsData,
  getHJTSolarPanelData,
  getHomeData,
  getTOPConSolarPanelData,
  privacyPolicyData,
  termsData,
} from "./data";

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

    const industry = await payload.create({
      collection: "industries",
      data: {
        title: "Renewable Energy Test",
        slug: "renewable-energy-test",
        description:
          "Renewable energy is a type of energy that is generated from natural resources that are replenished by the sun, wind, water, and geothermal heat.",
        coverImage: images.createdIndustryCoverImage,
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

    await payload.create({
      collection: "pages",
      data: {
        ...getHomeData({
          logos: {
            ce: images.createdCeLogo,
            mcs: images.createdMcsLogo,
            ul: images.createdUlLogo,
          },
          heros: [
            images.createdHeroContent1,
            images.createdHeroContent2,
            images.createdHeroContent3,
            images.createdHeroContent4,
            images.createdHeroContent5,
            images.createdHeroContent6,
          ],
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

    const [hjtCategory, topconCategory] = await Promise.all([
      payload.create({
        collection: "solar-panel-categories",
        data: {
          title: "hjt",
          slug: "hjt",
          description:
            "HJT, short for Heterojunction, refers to a type of solar panel technology that uses a combination of crystalline silicon (c-Si) and thin-film amorphous silicon (a-Si) to create a high-efficiency photovoltaic cell.",
          heroImage: images.createdHjtHeroImage,
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
          heroImage: images.createdTopconHeroImage,
        },
        context: {
          skipRevalidation: true,
        },
        locale: "en",
      }),
    ]);

    payload.logger.info("Solar panel categories created");

    const [created962PackingConfig, created888PackingConfig] = await Promise.all([
      payload.create({
        collection: "packaging-configs",
        data: {
          title: "Solar Panel 962 Packing Config",
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
          heroImageId: images.createdSolarPanel1HeroImage,
          coverImageId: images.createdSolarPanel2HeroImage,
          variants: {
            gallery: [
              images.createdSolarPanel1ProductImage,
              images.createdSolarPanel2ProductImage,
              images.createdSolarPanel3ProductImage,
              images.createdSolarPanel4ProductImage,
            ],
          },
        }),
        packagingConfig: created962PackingConfig.id,
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
          heroImageId: images.createdSolarPanel1HeroImage,
          coverImageId: images.createdSolarPanel2HeroImage,
          variants: {
            gallery: [
              images.createdSolarPanel1ProductImage,
              images.createdSolarPanel2ProductImage,
              images.createdSolarPanel3ProductImage,
              images.createdSolarPanel4ProductImage,
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

    const endTime = Date.now();
    const duration = endTime - startTime;
    payload.logger.info(`Collections created in ${duration}ms`);

    return Response.json({ success: true });
  } catch (e) {
    payload.logger.error({ err: e, message: "Error seeding data" });
    return new Response("Error seeding data.", { status: 500 });
  }
}
