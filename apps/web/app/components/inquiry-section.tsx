import { CMSLink } from "./blocks/cms-link";
import { SimpleInquiryForm } from "./simple-inquiry-form.client";
import type { InquiryBlockType } from "@synoem/types";

export const InquirySection = (props: InquiryBlockType) => {
  const { title, description, ctaPrimary, ctaSecondary } = props;

  return (
    <div className="container mx-auto grid grid-cols-1 md:grid-cols-2 gap-24 p-4 md:p-8">
      <div className="space-y-8 max-w-2xl">
        <h2 className="text-3xl md:text-4xl font-bold">{title}</h2>
        <p className="text-base md:text-lg text-muted-foreground">{description}</p>
        <div className="flex gap-4">
          {ctaPrimary && <CMSLink {...ctaPrimary} />}
          {ctaSecondary && <CMSLink {...ctaSecondary} variant="secondary" />}
        </div>
      </div>
      <div className="flex justify-center">
        <SimpleInquiryForm />
      </div>
    </div>
  );
};
