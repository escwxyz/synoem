import { getCertificationLogosCached } from "~/data/get-certification-logos";
import { LogoCloud } from "./logo-cloud.server";
import { Suspense } from "react";
import { getUrl } from "~/utils";
import { getTranslations } from "next-intl/server";

const CertificationLogosInner = async () => {
  const certificationLogosResponse = await getCertificationLogosCached()();

  const t = await getTranslations("CertificationLogos");

  if (
    certificationLogosResponse.status !== "success" ||
    !certificationLogosResponse.data ||
    certificationLogosResponse.data.length === 0 ||
    !certificationLogosResponse.data.every(
      (certification) => typeof certification.logo === "object" && certification.logo.url,
    )
  ) {
    return null;
  }

  return (
    <LogoCloud
      title={t("title")}
      logos={certificationLogosResponse.data.map((certification) => ({
        url: getUrl((certification.logo as { url: string }).url),
        alt: certification.name,
      }))}
    />
  );
};

const CertificationLogosFallback = () => {
  const skeletonLogos = Array.from({ length: 6 });

  return (
    <section className="bg-background overflow-hidden py-16 animate-pulse">
      <div className="group relative m-auto max-w-7xl px-6">
        <div className="flex flex-col items-center md:flex-row">
          <div className="md:max-w-44 md:border-r md:pr-6 w-full md:w-auto mb-4 md:mb-0">
            <div className="h-4 w-32 bg-muted rounded" />
          </div>

          <div className="relative py-6 md:w-[calc(100%-11rem)] flex gap-6">
            {skeletonLogos.map((_, idx) => (
              // biome-ignore lint/suspicious/noArrayIndexKey: <explanation>
              <div key={idx} className="h-12 w-12 bg-muted rounded-full" aria-hidden="true" />
            ))}
            <div className="bg-gradient-to-r from-background absolute inset-y-0 left-0 w-20" />
            <div className="bg-gradient-to-l from-background absolute inset-y-0 right-0 w-20" />
          </div>
        </div>
      </div>
    </section>
  );
};

export const CertificationLogos = () => {
  return (
    <Suspense fallback={<CertificationLogosFallback />}>
      <CertificationLogosInner />
    </Suspense>
  );
};
