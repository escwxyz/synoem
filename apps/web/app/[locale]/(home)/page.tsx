import { isValidLocale } from "~/utils/is-valid-locale";
import { defaultLocale } from "@synoem/config";
import { CertificationLogos } from "~/components/certification-logos.server";
import { SimpleInquiryForm } from "~/components/simple-inquiry-form.client";
import { HeroParallex } from "@/app/components/hero-parallex.client";
import { getIndustriesCached } from "@/app/data/get-industries";
import { CarbonReductionCalculator } from "@/app/components/carbon-reduction-calculator.client";

interface HomePageProps {
  params: Promise<{ locale: string }>;
}

export default async function HomePage({ params }: HomePageProps) {
  const { locale } = await params;

  const effectiveLocale = isValidLocale(locale) ? locale : defaultLocale;

  const industriesResponse = await getIndustriesCached(effectiveLocale)();

  return (
    <>
      {industriesResponse.status === "success" &&
        industriesResponse.data &&
        industriesResponse.data.length > 0 && (
          <HeroParallex industries={industriesResponse.data} locale={effectiveLocale} />
        )}
      <section className="py-20 grid place-items-center">
        {/* <Suspense fallback={<div>Loading</div>}>
          <Testimonials limit={4} />
        </Suspense> */}
      </section>
      <section className="relative w-full overflow-hidden bg-background/50 py-16 rounded-2xl">
        <div className="absolute -left-20 top-0 -translate-y-1/2 h-64 w-64 rounded-full bg-primary/5 blur-3xl" />
        <div className="absolute -right-20 bottom-0 -translate-y-1/2 h-64 w-64 rounded-full bg-primary/5 blur-3xl" />
        <div className="container px-4 md:px-6 mx-auto">
          <div className="flex flex-col items-center justify-center space-y-4 text-center mb-12">
            <div className="space-y-2">
              <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">
                Carbon Reduction Calculator
              </h2>
              <p className="max-w-[900px] text-gray-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                Estimate the environmental impact and carbon footprint reduction of your solar
                project
              </p>
            </div>
          </div>
          <CarbonReductionCalculator />
        </div>
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
        </div>
      </section>

      <CertificationLogos />
    </>
  );
}
