import { isValidLocale } from "~/utils/is-valid-locale";
import { defaultLocale } from "@synoem/config";
import { CertificationLogos } from "~/components/certification-logos.server";
import { SimpleInquiryForm } from "~/components/simple-inquiry-form.client";

interface HomePageProps {
  params: Promise<{ locale: string }>;
}

export default async function HomePage({ params }: HomePageProps) {
  const { locale } = await params;

  const effectiveLocale = isValidLocale(locale) ? locale : defaultLocale;

  return (
    <>
      <section className="py-20 grid place-items-center">
        {/* <Suspense fallback={<div>Loading</div>}>
          <Testimonials limit={4} />
        </Suspense> */}
      </section>

      <section className="grid grid-cols-1 md:grid-cols-2 gap-24 md:px-10">
        <div>
          <h2 className="text-2xl font-bold">Ready to Transform Your Energy Future?</h2>
          <p className="text-sm text-gray-500">
            Join thousands of organizations and homeowners who have revolutionized their energy
            consumption with our innovative solar solutions. Our team of experts is ready to design
            a custom solution for your specific needs.
          </p>
        </div>
        <div className="flex justify-center">
          <SimpleInquiryForm />
          {/* <MultiStepInquiryForm /> */}
        </div>
      </section>

      <CertificationLogos />
    </>
  );
}
