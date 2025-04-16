import { seoPlugin } from "@payloadcms/plugin-seo";

export const seo = seoPlugin({
  collections: ["solar-panels"],
  uploadsCollection: "images",
  tabbedUI: false,
  generateTitle: ({ doc }) => `${doc?.title} | SynOEM`,
  //   generateTitle: ({ doc }: { doc: Post | Page | Product }) =>
  //     doc?.title ? `${doc.title} | SynOEM` : "SynOEM",
  //   generateURL: ({ doc }: { doc: Post | Page | Product }) => {
  //     const url = getServerSideURL();
  //     return doc?.slug ? `${url}/${doc.slug}` : url;
  //   },
  //   generateDescription: ({ doc }: { doc: Post | Page | Product }) => {
  //     // TODO: generate description
  //     return "";
  //   },
  //   generateImage: ({ doc }: { doc: Post | Page | Product }) => {
  //     // TODO: generate image
  //     return "";
  //   },
});
