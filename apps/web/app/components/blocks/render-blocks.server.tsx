import type { Page } from "@synoem/types";
import { Timeline } from "./timeline.client";
import { Hero } from "./hero.client";
import { FaqsSection } from "./faqs-section";
import { Feature } from "./feature.client";
import { Features } from "./features.server";
import { Content } from "./content.server";
import { LogoCloud } from "./logo-cloud.client";
import { CarbonReductionCalculator } from "./carbon-reduction-calculator";

// biome-ignore lint/suspicious/noExplicitAny: <explanation>
const blockComponents: Record<string, React.FC<any>> = {
  timelineBlock: Timeline,
  heroBlock: Hero,
  faqBlock: FaqsSection,
  featureBlock: Feature,
  featuresBlock: Features,
  contentBlock: Content,
  logoCloudBlock: LogoCloud,
  carbonCalculatorBlock: CarbonReductionCalculator,
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
                <div className="my-8 md:my-16" key={block.id}>
                  <Block {...block} disableInnerContainer />
                </div>
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
