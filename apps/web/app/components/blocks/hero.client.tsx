import type { HeroBlockType } from "@synoem/types";
import { cn } from "@synoem/ui/lib/utils";

// create different hero components based on `type`;

export const Hero: React.FC<HeroBlockType> = ({
  title,
  eyebrow,
  subtitle,
  media,
  desc,
  ctaPrimary,
  ctaSecondary,
  textAlignment,
  textPlacement,
}) => {
  const contentFirst = textPlacement === "left";
  const contentOrder = contentFirst ? "order-first" : "order-last";
  const imageOrder = contentFirst ? "order-last" : "order-first";
  return (
    <section
      className={`
    container flex flex-col gap-8 py-24
    lg:flex-row lg:items-center
  `}
    >
      <div
        className={cn(
          `
        flex w-full flex-col space-y-4
        lg:w-1/2
      `,
          contentOrder,
          textAlignment === "start" && "items-start text-left",
          textAlignment === "center" && "items-center text-center",
          textAlignment === "end" && "items-end text-right",
        )}
      >
        {eyebrow && (
          <p className="text-sm font-semibold uppercase tracking-wider text-primary">{eyebrow}</p>
        )}
        <h2
          className={`
        max-w-3xl text-3xl font-bold tracking-tighter
        sm:text-4xl
        md:text-5xl
      `}
        >
          {title}
        </h2>
        {subtitle && <p className="max-w-xl text-xl text-muted-foreground">{subtitle}</p>}
        {desc && <p className="max-w-xl text-muted-foreground">{desc}</p>}

        {(ctaPrimary?.label || ctaSecondary?.label) && (
          <div
            className={cn("flex flex-wrap gap-4", {
              "justify-center": textAlignment === "center",
              "justify-end": textAlignment === "end",
            })}
          >
            {/* {ctaPrimary?.label && <CMSLink {...ctaPrimary} size="lg" />}
            {ctaSecondary?.label && <CMSLink {...ctaSecondary} size="lg" />} */}
          </div>
        )}
      </div>
      {/* {media && (
        <Media
          resource={image}
          className={cn(
            `
          relative h-[350px] w-full overflow-hidden rounded-lg
          sm:h-[500px]
          lg:w-1/2
        `,
            imageOrder,
          )}
          imgClassName="object-cover"
          fill
        />
      )} */}
    </section>
  );
};
