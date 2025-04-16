import type { JoinField } from "payload";

export const createInquiryJoinField = (): JoinField => {
  return {
    name: "relatedInquires",
    type: "join",
    collection: "inquiries",
    on: "relatedProduct",
    admin: {
      description: "Related inquiries",
      position: "sidebar",
    },
    defaultSort: "createdAt:desc",
    defaultLimit: 5,
  };
};
