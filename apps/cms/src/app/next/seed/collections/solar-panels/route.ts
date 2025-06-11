import { getPayloadClient } from "@synoem/payload/client";
import { seedImagesRequestSchema } from "../../types";
import { NextRequest } from "next/server";
import { headers } from "next/headers";
import { getHJTSolarPanelData, getTOPConSolarPanelData } from "../data";

export async function POST(req: NextRequest): Promise<Response> {
  const payload = await getPayloadClient();
  const requestHeaders = await headers();

  // Authenticate by passing request headers
  const { user } = await payload.auth({ headers: requestHeaders });

  if (!user) {
    return Response.json({ message: "Action forbidden." }, { status: 403 });
  }

  let body: unknown;
  try {
    body = await req.json();
  } catch {
    return Response.json({ message: "Invalid JSON" }, { status: 400 });
  }

  const validationResult = seedImagesRequestSchema.safeParse(body);
  if (!validationResult.success) {
    return Response.json(
      { message: "Invalid request body", errors: validationResult.error },
      { status: 400 },
    );
  }
  const { images } = validationResult.data;

  try {
    const industry = await payload.create({
      collection: "industries",
      data: {
        title: "Renewable Energy",
        slug: "renewable-energy",
        description:
          "Renewable energy is a type of energy that is generated from natural resources that are replenished by the sun, wind, water, and geothermal heat.",
        coverImage: images.createdIndustryCoverImage,
      },
      context: {
        skipRevalidation: true,
      },
      locale: "en",
    });
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

    return Response.json({ success: true });
  } catch (e) {
    payload.logger.error({ err: e, message: "Error seeding data" });
    return Response.json({ message: "Error seeding data." }, { status: 500 });
  }
}
