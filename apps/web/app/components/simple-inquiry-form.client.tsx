// "use client";

// import { useState } from "react";
// import { zodResolver } from "@hookform/resolvers/zod";
// import { simpleInquiryFormSchema } from "@synoem/schema";
// import {
//   Form,
//   FormControl,
//   FormField,
//   FormItem,
//   FormLabel,
//   FormMessage,
// } from "@synoem/ui/components/form";
// import { Button } from "@synoem/ui/components/button";
// import { Textarea } from "@synoem/ui/components/textarea";
// import { Input } from "@synoem/ui/components/input";
// import { Checkbox } from "@synoem/ui/components/checkbox";
// import { AlertCircle } from "lucide-react";
// import { useHookFormAction } from "@next-safe-action/adapter-react-hook-form/hooks";
// // import { sendSimpleInquiry } from "~/actions";

// export const SimpleInquiryForm = () => {
//   const [isSubmitting, setIsSubmitting] = useState(false);
//   const [isSuccess, setIsSuccess] = useState(false);
//   const [error, setError] = useState<string | null>(null);

//   const { form, handleSubmitWithAction, resetFormAndAction } = useHookFormAction(
//     sendSimpleInquiry,
//     zodResolver(simpleInquiryFormSchema),
//     {
//       actionProps: {
//         onError: (error) => {
//           //   setError(error.message);
//         },
//         onExecute: () => {
//           setIsSubmitting(true);
//           setError(null);
//         },
//         onSuccess: (data) => {
//           setIsSuccess(true);
//           setIsSubmitting(false);
//           resetFormAndAction();
//         },
//       },

//       formProps: {
//         defaultValues: {
//           name: "",
//           email: "",
//           phone: "",
//           requirements: "",
//           terms: false,
//         },
//       },
//     },
//   );

//   if (isSuccess) {
//     return (
//       <div className="p-4 bg-green-100 text-green-800 rounded">
//         <h3 className="font-bold mb-2">Thank you for your inquiry!</h3>
//         <p>We will get back to you shortly.</p>
//       </div>
//     );
//   }

//   return (
//     <Form {...form}>
//       <form onSubmit={handleSubmitWithAction} className="space-y-4">
//         {error && (
//           <div className="flex items-start gap-2 rounded-md border border-red-300 bg-red-50 p-3">
//             <AlertCircle className="mt-0.5 h-5 w-5 text-red-400" />
//             <p className="text-sm text-red-600">{error}</p>
//           </div>
//         )}

//         <FormField
//           control={form.control}
//           name="name"
//           render={({ field }) => (
//             <FormItem>
//               <FormLabel>Full Name</FormLabel>
//               <FormControl>
//                 <Input {...field} />
//               </FormControl>
//               <FormMessage />
//             </FormItem>
//           )}
//         />

//         <FormField
//           control={form.control}
//           name="email"
//           render={({ field }) => (
//             <FormItem>
//               <FormLabel>Email</FormLabel>
//               <FormControl>
//                 <Input {...field} />
//               </FormControl>
//               <FormMessage />
//             </FormItem>
//           )}
//         />

//         <FormField
//           control={form.control}
//           name="phone"
//           render={({ field }) => (
//             <FormItem>
//               <FormLabel>Phone Number</FormLabel>
//               <FormControl>
//                 <Input {...field} />
//               </FormControl>
//               <FormMessage />
//             </FormItem>
//           )}
//         />

//         <FormField
//           control={form.control}
//           name="requirements"
//           render={({ field }) => (
//             <FormItem>
//               <FormLabel>Requirements</FormLabel>
//               <FormControl>
//                 <Textarea {...field} />
//               </FormControl>
//               <FormMessage />
//             </FormItem>
//           )}
//         />

//         <FormField
//           control={form.control}
//           name="terms"
//           render={({ field }) => (
//             <FormItem className="flex flex-row items-start space-x-3 space-y-0">
//               <FormControl>
//                 <Checkbox checked={field.value} onCheckedChange={field.onChange} />
//               </FormControl>
//               <div className="space-y-1 leading-none">
//                 <FormLabel>
//                   I have read and agree to the terms and conditions
//                   <span className="text-red-500">*</span>
//                 </FormLabel>
//               </div>
//               <FormMessage />
//             </FormItem>
//           )}
//         />

//         <Button type="submit" className="w-full" disabled={isSubmitting}>
//           {isSubmitting ? "Submitting..." : "Submit Inquiry"}
//         </Button>
//       </form>
//     </Form>
//   );
// };
