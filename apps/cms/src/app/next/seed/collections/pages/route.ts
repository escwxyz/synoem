import { getPayloadClient } from "@synoem/payload/client";
import { seedImagesRequestSchema } from "../../types";
import { NextRequest } from "next/server";
import { headers } from "next/headers";
import { faqs, getAboutUsData, getHomeData, privacyPolicyData, termsData } from "../data";

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
    await Promise.all([
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

    await payload.create({
      collection: "pages",
      data: getAboutUsData(companyPage.id),
      locale: "en",
      context: {
        skipRevalidation: true,
      },
    });

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

    payload.logger.info("Pages created");

    return Response.json({ success: true });
  } catch (e) {
    payload.logger.error({ err: e, message: "Error seeding data" });
    return Response.json({ message: "Error seeding data." }, { status: 500 });
  }
}
