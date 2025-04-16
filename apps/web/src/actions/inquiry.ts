import { defineAction, ActionError } from "astro:actions";
import { simpleFormSchema, productFormSchema } from "~/schemas/inquiry";
import { getPayloadClient } from "@synoem/payload/client";
import { getMetadata } from "~/utils/get-metadata";
import { transformFileToBuffer } from "~/utils/transform-file-to-buffer";

const createSimpleInquiryAction = defineAction({
  accept: "form",
  input: simpleFormSchema,
  handler: async ({ terms, name, email, phone, requirements }, context) => {
    if (!terms) {
      throw new ActionError({
        code: "BAD_REQUEST",
        message: "inquiry.action.acceptTerms",
      });
    }

    try {
      const payload = await getPayloadClient();

      const metadata = getMetadata(context.request.headers);

      const result = await payload.create({
        collection: "inquiries",
        data: {
          formType: "simple",
          basicInfo: {
            name,
            email,
            phone,
            requirements,
          },
          metadata: {
            page: metadata.referer,
            ipAddress: metadata.forwardedFor,
            userAgent: metadata.userAgent,
          },
        },
      });

      return {
        success: true,
        message: "inquiry.action.created",
        data: { id: result.id },
      };
    } catch (error) {
      console.error(error);
      throw new ActionError({
        code: "INTERNAL_SERVER_ERROR",
        message: "inquiry.action.error",
      });
    }
  },
});

const createProductInquiryAction = defineAction({
  accept: "form",
  input: productFormSchema,
  handler: async (
    {
      terms,
      name,
      email,
      phone,
      requirements,
      attachments,
      relatedProductId,
      relatedProductType,
      ...rest
    },
    context,
  ) => {
    if (!terms) {
      throw new ActionError({
        code: "BAD_REQUEST",
        message: "inquiry.action.acceptTerms",
      });
    }

    const relatedProduct =
      relatedProductId && relatedProductType
        ? {
            relationTo: relatedProductType,
            value: relatedProductId,
          }
        : undefined;

    const attachmentResults = [];

    try {
      const payload = await getPayloadClient();

      const metadata = getMetadata(context.request.headers);

      if (attachments && attachments.length > 0) {
        for (const file of attachments) {
          if (file && file.size > 0 && file.size < 10 * 1024 * 1024) {
            const buffer = await transformFileToBuffer(file);

            const payloadFile = {
              name: file.name,
              mimetype: file.type,
              size: file.size,
              data: buffer,
            };

            const uploadedFile = await payload.create({
              collection: "attachments",
              data: {
                filename: file.name,
              },
              file: payloadFile,
            });

            attachmentResults.push({
              file: uploadedFile,
              id: uploadedFile.id.toString(),
            });
          }
        }
      }

      await payload.create({
        collection: "inquiries",
        data: {
          formType: "product",
          relatedProduct,
          basicInfo: {
            name,
            email,
            phone,
            requirements,
          },
          metadata: {
            page: metadata.referer,
            ipAddress: metadata.forwardedFor,
            userAgent: metadata.userAgent,
          },
          attachments: attachmentResults,
          ...rest,
        },
      });
    } catch (error) {
      console.error(error);
      throw new ActionError({
        code: "INTERNAL_SERVER_ERROR",
        message: "inquiry.action.error",
      });
    }
  },
});

export const inquiry = {
  createSimpleInquiryAction,
  createProductInquiryAction,
};
