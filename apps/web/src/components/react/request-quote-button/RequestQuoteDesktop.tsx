"use client";

import { Button } from "@synoem/ui/components/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@synoem/ui/components/dialog";
import { useRequestQuote } from "~/hooks/use-request-quote";
import type { PumpController, SolarPanel } from "@synoem/payload/payload-types";
import { ScrollArea } from "@synoem/ui/components/scroll-area";
import { ProductInquiryForm } from "~/components/react/ProductInquiryForm";
import { SubmissionConfirmation } from "~/components/react/SubmissionConfirmation";
import { Form } from "@synoem/ui/components/form";
import { useState } from "react";

export const RequestQuoteDesktop = ({
  product,
  buttonSize = "lg",
}: {
  product: SolarPanel | PumpController;
  buttonSize?: "lg" | "sm";
}) => {
  const { isSubmitting, isSuccess, error, form, onSubmit } = useRequestQuote({
    product,
  });

  const [open, setOpen] = useState(false);

  // const lenis = useLenis();

  // useEffect(() => {
  //   if (lenis && open) {
  //     console.log("stop");
  //     lenis.stop();
  //   } else if (lenis && !open) {
  //     console.log("start");
  //     lenis.start();
  //   }

  //   return () => {
  //     if (lenis && !open) {
  //       lenis.start();
  //     }
  //   };
  // }, [open, lenis]);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button size={buttonSize}>Request Quote</Button>
      </DialogTrigger>
      <DialogContent className="max-w-[1200px] w-[90vw] min-w-[1000px] p-0 overflow-hidden">
        <DialogHeader className="p-6 pb-2">
          <DialogTitle className="text-2xl">Request Quote</DialogTitle>
          <DialogDescription className="text-base">
            Please contact us by the infos below or fill in the form to request
            a quote for this product.
          </DialogDescription>
        </DialogHeader>
        <div className="flex h-[calc(85vh-120px)] max-h-[700px]">
          {/* 左侧信息区域 */}
          <div className="w-1/2 p-8 border-r bg-muted/20">
            <h3 className="text-xl font-semibold mb-6">Contact Information</h3>
            <div className="space-y-6">
              <div>
                <p className="font-medium text-lg">Email</p>
                <p className="text-muted-foreground">info@synoem.com</p>
              </div>
              <div>
                <p className="font-medium text-lg">Phone</p>
                <p className="text-muted-foreground">+1 234 567 8900</p>
              </div>
              <div>
                <p className="font-medium text-lg">Address</p>
                <p className="text-muted-foreground">
                  123 Business Street, Tech City
                </p>
              </div>
              <div className="pt-4">
                <h4 className="font-medium text-lg mb-2">Business Hours</h4>
                <p className="text-muted-foreground">
                  Monday - Friday: 9AM - 6PM
                </p>
                <p className="text-muted-foreground">Saturday: 10AM - 4PM</p>
                <p className="text-muted-foreground">Sunday: Closed</p>
              </div>
            </div>
          </div>

          {/* 右侧表单区域 */}
          <div className="w-1/2 flex flex-col">
            {isSuccess ? (
              <div className="flex items-center justify-center h-full p-6">
                <SubmissionConfirmation
                  title="Submission Successful!"
                  message="Thank you for your submission. We'll be in touch soon."
                  type="form"
                />
              </div>
            ) : (
              <ScrollArea className="flex-1 px-8 h-full">
                <Form {...form}>
                  <form onSubmit={form.handleSubmit(onSubmit)}>
                    {error && (
                      <div className="bg-destructive/10 text-destructive p-3 rounded-md mb-4">
                        {error}
                      </div>
                    )}
                    <div className="space-y-6">
                      <ProductInquiryForm form={form} />
                    </div>
                    <div className="sticky bottom-0 p-4 bg-background/80 backdrop-blur-md">
                      <Button
                        type="submit"
                        disabled={isSubmitting}
                        className="w-full mt-4"
                        size="lg"
                      >
                        {isSubmitting ? (
                          <>
                            <svg
                              className="mr-2 h-4 w-4 animate-spin"
                              xmlns="http://www.w3.org/2000/svg"
                              fill="none"
                              viewBox="0 0 24 24"
                              aria-hidden="true"
                              role="presentation"
                            >
                              <circle
                                className="opacity-25"
                                cx="12"
                                cy="12"
                                r="10"
                                stroke="currentColor"
                                strokeWidth="4"
                              />
                              <path
                                className="opacity-75"
                                fill="currentColor"
                                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                              />
                            </svg>
                            Submitting...
                          </>
                        ) : (
                          "Submit Inquiry"
                        )}
                      </Button>
                    </div>
                  </form>
                </Form>
              </ScrollArea>
            )}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};
