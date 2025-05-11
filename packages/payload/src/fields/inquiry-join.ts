import type { JoinField } from "payload";
import { admin } from "../access";

export const createInquiryJoinField = (): JoinField => {
  return {
    name: "relatedInquires",
    type: "join",
    collection: "inquiries",
    on: "relatedProduct",
    access: {
      read: admin,
    },
    admin: {
      description: "Related inquiries",
      position: "sidebar",
    },
    defaultSort: "createdAt:desc",
    defaultLimit: 5,
  };
};
