// import { MediaBlock } from '@/blocks/MediaBlock/Component'
import type {
  DefaultNodeTypes,
  //   SerializedBlockNode,
  SerializedLinkNode,
  DefaultTypedEditorState,
} from "@payloadcms/richtext-lexical";
import {
  type JSXConvertersFunction,
  LinkJSXConverter,
  RichText as ConvertRichText,
} from "@payloadcms/richtext-lexical/react";

// import { CodeBlock, CodeBlockProps } from '@/blocks/Code/Component'

// import type {
//   BannerBlock as BannerBlockProps,
//   CallToActionBlock as CTABlockProps,
//   MediaBlock as MediaBlockProps,
// } from '@/payload-types'
// import { BannerBlock } from '@/blocks/Banner/Component'
// import { CallToActionBlock } from '@/blocks/CallToAction/Component'
import { cn } from "@synoem/ui/lib/utils";

type NodeTypes = DefaultNodeTypes;
//   | SerializedBlockNode<CTABlockProps | MediaBlockProps | BannerBlockProps | CodeBlockProps>

const internalDocToHref = ({ linkNode }: { linkNode: SerializedLinkNode }) => {
  const { doc } = linkNode.fields;

  if (!doc) throw new Error("Expect doc to have value");

  const { value, relationTo } = doc;

  if (typeof value !== "object") {
    throw new Error("Expected value to be an object");
  }
  const slug = value.slug;
  return relationTo === "posts" ? `/posts/${slug}` : `/${slug}`; // TODO, if we use linkTo, we need to change this
};

const jsxConverters: JSXConvertersFunction<NodeTypes> = ({ defaultConverters }) => ({
  ...defaultConverters,
  ...LinkJSXConverter({ internalDocToHref }),
  //   blocks: {
  //     banner: ({ node }) => <BannerBlock className="col-start-2 mb-4" {...node.fields} />,
  //     mediaBlock: ({ node }) => (
  //       <MediaBlock
  //         className="col-start-1 col-span-3"
  //         imgClassName="m-0"
  //         {...node.fields}
  //         captionClassName="mx-auto max-w-[48rem]"
  //         enableGutter={false}
  //         disableInnerContainer={true}
  //       />
  //     ),
  //     cta: ({ node }) => <CallToActionBlock {...node.fields} />,
  //   },
});

type Props = {
  data: DefaultTypedEditorState;
  enableGutter?: boolean;
  enableProse?: boolean;
} & React.HTMLAttributes<HTMLDivElement>;

export const RichText = (props: Props) => {
  const { className, enableProse = true, enableGutter = true, ...rest } = props;
  return (
    <ConvertRichText
      converters={jsxConverters}
      className={cn(
        "payload-richtext",
        {
          container: enableGutter,
          "max-w-none": !enableGutter,
          "mx-auto prose md:prose-md dark:prose-invert": enableProse,
        },
        className,
      )}
      {...rest}
    />
  );
};
