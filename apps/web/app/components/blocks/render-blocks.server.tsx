import type { Page } from "@synoem/types";
import { Timeline } from "./timeline.client";
import { FaqsSection } from "./faqs-section";
import { FeatureCard } from "./feature-card";
import { FeaturesSection } from "./features-section";
import { Content } from "./content.server";
import { LogoCloud } from "./logo-cloud";
import { CarbonReductionCalculator } from "./carbon-reduction-calculator";
import { HeroParallex } from "../hero-parallex";
import { InquirySection } from "../inquiry-section";

// biome-ignore lint/suspicious/noExplicitAny: <explanation>
const blockComponents: Record<string, React.FC<any>> = {
  timelineBlock: Timeline,
  heroBlock: HeroParallex,
  faqBlock: FaqsSection,
  featureBlock: FeatureCard,
  featuresBlock: FeaturesSection,
  contentBlock: Content,
  logoCloudBlock: LogoCloud,
  carbonCalculatorBlock: CarbonReductionCalculator,
  inquiryBlock: InquirySection,
};

export const RenderBlocks: React.FC<{
  blocks: Page["layout"][0][];
}> = (props) => {
  const { blocks } = props;

  const hasBlocks = blocks && Array.isArray(blocks) && blocks.length > 0;

  if (hasBlocks) {
    return (
      <>
        {blocks.map((block) => {
          const { blockType } = block;

          if (blockType && blockType in blockComponents) {
            const Block = blockComponents[blockType];

            if (Block) {
              return (
                <section key={block.id} className="my-4 md:my-8">
                  <Block {...block} />
                </section>
              );
            }
          }
          return null;
        })}
      </>
    );
  }

  return null;
};
