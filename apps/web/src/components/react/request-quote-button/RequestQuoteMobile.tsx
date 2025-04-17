"use client";

import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@synoem/ui/components/drawer";
import { Button } from "@synoem/ui/components/button";
import { ScrollArea } from "@synoem/ui/components/scroll-area";
import { useRequestQuote } from "~/hooks/use-request-quote";
import { ProductInquiryForm } from "~/components/react/ProductInquiryForm";
import { Form } from "@synoem/ui/components/form";
import { useState } from "react";
import { SubmissionConfirmation } from "~/components/react/SubmissionConfirmation";
import type { Props } from "./types";

export const RequestQuoteMobile = ({ product, ...props }: Props) => {
  const [open, setOpen] = useState<boolean>(false);

  const { isSubmitting, isSuccess, error, form, onSubmit } = useRequestQuote({
    product,
  });

  const handleClose = () => {
    setOpen(false);
    form.reset();
  };

  return (
    <>
      <Drawer
        open={open}
        onOpenChange={setOpen}
        disablePreventScroll
        preventScrollRestoration
        dismissible={false}
      >
        <DrawerTrigger asChild>
          <Button {...props}>Request Quote</Button>
        </DrawerTrigger>
        <DrawerContent className="flex flex-col h-full max-h-[85vh] pb-0">
          <DrawerHeader className="text-left shrink-0 border-b">
            <DrawerTitle className="text-center">Request Quote</DrawerTitle>
            <DrawerDescription>
              Please fill in the form below to request a quote for the product.
            </DrawerDescription>
          </DrawerHeader>
          <div className="flex-1 flex-col h-full overflow-hidden">
            <ScrollArea className="h-full w-full">
              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)}>
                  <div className="p-4 my-2 flex-1">
                    {isSuccess ? (
                      <SubmissionConfirmation
                        title="Submission Successful!"
                        message="Thank you for your submission. We'll be in touch soon."
                        type="form"
                        onDismiss={handleClose}
                      />
                    ) : (
                      <>
                        {error && <div>{error}</div>}
                        <ProductInquiryForm form={form} />
                      </>
                    )}
                  </div>

                  <DrawerFooter className="pt-2 sticky border-t bottom-0 w-full backdrop-blur-md shrink-0 bg-background/80 safe-area-bottom">
                    <DrawerClose asChild>
                      <Button variant="outline" onClick={handleClose}>
                        Close
                      </Button>
                    </DrawerClose>
                    <Button
                      type="submit"
                      disabled={isSubmitting || !form.formState.isValid}
                    >
                      {isSubmitting ? (
                        <>
                          <svg
                            className="mr-3 size-5 animate-spin"
                            viewBox="0 0 24 24"
                          />
                          Submitting...
                        </>
                      ) : (
                        "Submit Inquiry"
                      )}
                    </Button>
                  </DrawerFooter>
                </form>
              </Form>
            </ScrollArea>
          </div>
        </DrawerContent>
      </Drawer>
    </>
  );
};
