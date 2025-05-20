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
import { useRequestQuoteForm } from "~/hooks";
import { Form } from "@synoem/ui/components/form";
import { useState } from "react";
import type { SolarPanel, PumpController } from "@synoem/types";
import { useIsMobile } from "@synoem/ui/hooks/use-mobile";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@synoem/ui/components/dialog";
import type { ProductTypeId } from "@synoem/config";
import type { Locale } from "@synoem/config";
import { useTranslations } from "next-intl";

// Support two modes: check if product / product type is provided

type Props = {
  product?: Pick<SolarPanel | PumpController, "modelName" | "id">;
  productTypeId?: ProductTypeId;
  locale: Locale;
} & React.ComponentProps<typeof Button>;

export const RequestQuoteButton = ({ product, productTypeId, locale, ...props }: Props) => {
  const isMobile = useIsMobile();

  if (isMobile) {
    return (
      <RequestQuoteMobile
        product={product}
        productTypeId={productTypeId}
        locale={locale}
        {...props}
      />
    );
  }

  return (
    <RequestQuoteDesktop
      product={product}
      productTypeId={productTypeId}
      locale={locale}
      {...props}
    />
  );
};

const RequestQuoteMobile = ({ product, productTypeId, locale, ...props }: Props) => {
  const [open, setOpen] = useState<boolean>(false);

  const { isSubmitting, isSuccess, error, form, onSubmit } = useRequestQuoteForm({
    product,
    productTypeId,
  });

  const handleClose = () => {
    setOpen(false);
    form.reset();
  };

  const t = useTranslations("RequestQuoteButton");

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
          {/** TODO: polish the button */}
          <Button className="min-w-[200px]" {...props}>
            {t("requestQuote")}
          </Button>
        </DrawerTrigger>
        <DrawerContent className="flex flex-col h-full max-h-[85vh] pb-0">
          <DrawerHeader className="text-left shrink-0 border-b">
            <DrawerTitle className="text-center">{t("requestQuote")}</DrawerTitle>
            <DrawerDescription>{t("description")}</DrawerDescription>
          </DrawerHeader>
          <div className="flex-1 flex-col h-full overflow-hidden">
            <ScrollArea className="h-full w-full">
              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)}>
                  <div className="p-4 my-2 flex-1">
                    {isSuccess ? (
                      <div>
                        {/* <SubmissionConfirmation
                            title="Submission Successful!"
                            message="Thank you for your submission. We'll be in touch soon."
                            type="form"
                            onDismiss={handleClose}
                          /> */}
                      </div>
                    ) : (
                      <>
                        {error && <div>{error}</div>}
                        {/* <ProductInquiryForm form={form} locale={locale} /> */}
                      </>
                    )}
                  </div>

                  <DrawerFooter className="pt-2 sticky border-t bottom-0 w-full backdrop-blur-md shrink-0 bg-background/80 safe-area-bottom">
                    <DrawerClose asChild>
                      <Button variant="outline" onClick={handleClose}>
                        Close
                      </Button>
                    </DrawerClose>
                    <Button type="submit" disabled={isSubmitting || !form.formState.isValid}>
                      {isSubmitting ? (
                        <>
                          <svg className="mr-3 size-5 animate-spin" viewBox="0 0 24 24" />
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

const RequestQuoteDesktop = ({ product, productTypeId, locale, ...props }: Props) => {
  const { isSubmitting, isSuccess, error, form, onSubmit } = useRequestQuoteForm({
    product,
    productTypeId,
  });

  const [open, setOpen] = useState(false);

  const t = useTranslations("RequestQuoteButton");

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      {/** TODO: polish the button */}

      <DialogTrigger asChild>
        <Button className="min-w-[200px]" {...props}>
          {t("requestQuote")}
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-[1200px] w-[90vw] p-0 overflow-hidden">
        <DialogHeader className="p-6 pb-2">
          <DialogTitle className="text-2xl">{t("requestQuote")}</DialogTitle>
          <DialogDescription className="text-base">{t("description")}</DialogDescription>
        </DialogHeader>
        {
          // TODO: add comprehensive information
        }
        <div className="flex h-[calc(85vh-120px)] max-h-[700px]">
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
                <p className="text-muted-foreground">123 Business Street, Tech City</p>
              </div>
              <div className="pt-4">
                <h4 className="font-medium text-lg mb-2">Business Hours</h4>
                <p className="text-muted-foreground">Monday - Friday: 9AM - 6PM</p>
                <p className="text-muted-foreground">Saturday: 10AM - 4PM</p>
                <p className="text-muted-foreground">Sunday: Closed</p>
              </div>
            </div>
          </div>

          <div className="w-1/2 flex flex-col">
            {isSuccess ? (
              <div className="flex items-center justify-center h-full p-6">
                {/* <SubmissionConfirmation
                    title="Submission Successful!"
                    message="Thank you for your submission. We'll be in touch soon."
                    type="form"
                  /> */}
              </div>
            ) : (
              <div className="flex-1 px-8 pt-4 h-full overflow-y-auto overflow-x-hidden">
                <Form {...form}>
                  <form onSubmit={form.handleSubmit(onSubmit)}>
                    {error && (
                      <div className="bg-destructive/10 text-destructive p-3 rounded-md mb-4">
                        {error}
                      </div>
                    )}
                    <div className="space-y-6">
                      {/* <ProductInquiryForm form={form} locale={locale} /> */}
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
              </div>
            )}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};
