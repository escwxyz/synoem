// "use client";

// import { useState } from "react";
// import { zodResolver } from "@hookform/resolvers/zod";
// import { productInquiryFormSchema } from "@synoem/schema";
// import { useHookFormAction } from "@next-safe-action/adapter-react-hook-form/hooks";
// import type { SolarPanel, PumpController } from "@synoem/types";
// import { sendProductInquiry } from "~/actions";
// import type { ProductTypeId } from "@synoem/config";
// import type { z } from "zod";

// export const useRequestQuoteForm = ({
//   productTypeId,
//   product,
// }: {
//   productTypeId?: ProductTypeId;
//   product?: Pick<SolarPanel | PumpController, "modelName" | "id">;
// }) => {
//   const [isSubmitting, setIsSubmitting] = useState(false);
//   const [isSuccess, setIsSuccess] = useState(false);
//   const [error, setError] = useState<string | null>(null);

//   const productName = product?.modelName || "";

//   const relatedProductId = product?.id;

//   const { form, action } = useHookFormAction(
//     sendProductInquiry,
//     zodResolver(productInquiryFormSchema),
//     {
//       formProps: {
//         defaultValues: {
//           name: "",
//           email: "",
//           phone: "",
//           requirements: "",
//           terms: false,
//           productTypeId,
//           productName,
//           quantity: 1,
//           quantityUnit: "pcs",
//           attachments: [],
//           relatedProductId,
//         },
//       },
//     },
//   );

//   const onSubmit = async (data: z.infer<typeof productInquiryFormSchema>) => {
//     setIsSubmitting(true);
//     setError(null);

//     const formData = new FormData();

//     formData.append("name", data.name);
//     formData.append("email", data.email);
//     formData.append("phone", data.phone);
//     formData.append("requirements", data.requirements);
//     formData.append("productTypeId", data.productTypeId);
//     formData.append("productName", data.productName);
//     formData.append("quantity", String(data.quantity));
//     formData.append("quantityUnit", data.quantityUnit);

//     formData.append("relatedProductId", String(data.relatedProductId || relatedProductId));

//     if (data.frequency) formData.append("frequency", data.frequency);
//     if (data.destination) formData.append("destination", data.destination);
//     if (data.timeline) formData.append("timeline", data.timeline);

//     const attachmentFiles = data.attachments;
//     if (Array.isArray(attachmentFiles) && attachmentFiles.length > 0) {
//       for (const file of attachmentFiles) {
//         formData.append("attachments", file);
//       }
//     }
//     if (data.terms === true) {
//       formData.append("terms", "on");
//     }

//     try {
//       const result = await action.executeAsync(data);

//       if (result?.data?.status === "success") {
//         setIsSuccess(true);
//         form.reset();
//       } else {
//         setError(result?.data?.messageKey || "An error occurred");
//         return;
//       }
//     } catch (error) {
//       console.error(error);
//       setError(error instanceof Error ? error.message : "An error occurred");
//     }
//   };

//   return {
//     isSubmitting,
//     isSuccess,
//     error,
//     form,
//     onSubmit,
//   };
// };
