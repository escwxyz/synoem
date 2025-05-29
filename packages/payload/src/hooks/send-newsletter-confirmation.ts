import { type CollectionAfterOperationHook, APIError } from "payload";

export const sendNewsletterConfirmation: CollectionAfterOperationHook<
  "newsletter-subscribers"
> = async ({ operation, req, result }) => {
  if (operation === "create") {
    const { payload } = req;

    const { email, token, createdAt } = result;

    if (!token) {
      throw new APIError("Token is required");
    }

    await payload.jobs.queue({
      input: {
        email,
        token,
        createdAt,
      },
      task: "send-newsletter-confirmation-email",
      queue: "every-5-minutes",
    });
  }

  return result;
};
