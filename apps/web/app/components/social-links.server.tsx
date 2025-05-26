import { getPlatformIconSVG, type Locale } from "@synoem/config";
import { Suspense } from "react";
import { getSocialLinksCached } from "~/data/get-globals";

interface Props {
  size?: number;
}

export const SocialLinks = ({ size = 24 }: Props) => {
  return (
    <Suspense fallback={<SocialLinksSkeleton />}>
      <SocialLinksInner size={size} />
    </Suspense>
  );
};

const SocialLinksInner = async ({ size = 24 }: Props) => {
  const socialLinksData = await getSocialLinksCached()();

  if (socialLinksData.status === "error" || !socialLinksData.data) {
    return (
      <div>
        <p>Failed to load social links</p>
      </div>
    );
  }

  const { links } = socialLinksData.data;

  return (
    <>
      {links &&
        links.length > 0 &&
        links.map((link) => {
          const { platform, url } = link;

          const icon = getPlatformIconSVG(platform);

          const modifiedSvg = icon
            .replace(/fill="[^"]*"/g, "")
            .replace("<svg", `<svg fill="var(--foreground)"`);

          return (
            <a
              key={link.id || platform}
              href={url}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`Visit our ${platform} page`}
            >
              <span className="sr-only">{platform}</span>
              <span
                style={{ width: size, height: size }}
                className="text-2xl inline-flex items-center justify-center"
                // biome-ignore lint/security/noDangerouslySetInnerHtml: <explanation>
                dangerouslySetInnerHTML={{ __html: modifiedSvg }}
              />
            </a>
          );
        })}
    </>
  );
};

const SocialLinksSkeleton = () => {
  return (
    <div>
      <p>Loading social links</p>
    </div>
  );
};
