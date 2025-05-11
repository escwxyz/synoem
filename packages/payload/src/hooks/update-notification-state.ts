import type { CollectionAfterChangeHook } from "payload";
import type { Notification } from "../payload-types";

export const updateNotificationState: CollectionAfterChangeHook<
  Notification
> = async ({ doc, req }) => {
  if (doc.state === "active") {
    const { payload } = req;

    try {
      await payload.update({
        collection: "notifications",
        where: {
          id: {
            not_equals: doc.id,
          },
          state: {
            equals: "active",
          },
        },
        data: {
          state: "inactive",
        },
      });
      payload.logger.info(
        `Updated notification state for ${doc.id} to inactive`,
      );
    } catch (error) {
      payload.logger.error(
        `Error updating notification state for ${doc.id}:`,
        error,
      );
    }
  }
  return doc;
};
