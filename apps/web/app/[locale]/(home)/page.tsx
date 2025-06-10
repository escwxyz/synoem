import { isValidLocale } from "~/utils/is-valid-locale";
import { defaultLocale } from "@synoem/config";
import { SimpleInquiryForm } from "~/components/simple-inquiry-form.client";
import { HeroParallex } from "@/app/components/hero-parallex.client";
import { getIndustriesCached } from "@/app/data/get-industries";
import { getDocumentByPathCached } from "@/app/data/get-document-by-path";
import { notFound } from "next/navigation";
import { LivePreviewListener } from "@/app/components/live-preview-listener.client";
import { RenderBlocks } from "@/app/components/blocks/render-blocks.server";

interface HomePageProps {
  params: Promise<{ locale: string }>;
}

export default async function HomePage({ params }: HomePageProps) {
  const { locale } = await params;

  const effectiveLocale = isValidLocale(locale) ? locale : defaultLocale;

  const industriesResponse = await getIndustriesCached(effectiveLocale)();

  const homePageResponse = await getDocumentByPathCached(effectiveLocale, "/home")();

  if (homePageResponse?.status === "error" || !homePageResponse?.data) {
    return notFound();
  }

  const homePageData = homePageResponse.data;

  if (homePageData._collection !== "pages") {
    return notFound();
  }

  return (
    <>
      <LivePreviewListener />
      <RenderBlocks blocks={homePageData.layout} />
    </>
    // <>
    //   {industriesResponse.status === "success" &&
    //     industriesResponse.data &&
    //     industriesResponse.data.length > 0 && (
    //       <HeroParallex industries={industriesResponse.data} locale={effectiveLocale} />
    //     )}
    //   <section className="py-20 grid place-items-center">
    //     {/* <Suspense fallback={<div>Loading</div>}>
    //       <Testimonials limit={4} />
    //     </Suspense> */}
    //   </section>
    //   {/* <CarbonReductionCalculatorSection /> */}
    //   <section className="grid grid-cols-1 md:grid-cols-2 gap-24 md:px-10">
    //     <div>
    //       <h2 className="text-2xl font-bold">Ready to Transform Your Energy Future?</h2>
    //       <p className="text-sm text-gray-500">
    //         Join thousands of organizations and homeowners who have revolutionized their energy
    //         consumption with our innovative solar solutions. Our team of experts is ready to design
    //         a custom solution for your specific needs.
    //       </p>
    //     </div>
    //     <div className="flex justify-center">
    //       <SimpleInquiryForm />
    //     </div>
    //   </section>
    // </>
  );
}
