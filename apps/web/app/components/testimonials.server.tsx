// import { getTranslations } from "next-intl/server";
// import { AvatarFallback, AvatarImage } from "@synoem/ui/components/avatar";
// import { CardContent, CardHeader } from "@synoem/ui/components/card";
// import { cn } from "@synoem/ui/lib/utils";
// import { Card } from "@synoem/ui/components/card";
// import { Avatar } from "@synoem/ui/components/avatar";
// import { getUrl } from "~/utils/get-url";
// import { MobileTestimonials } from "./testimonials-mobile.client";
// import { ImagePlaceholder } from "@synoem/ui/components/image-placeholder";
// import { apiClient } from "../libs/api-client";

// interface Props {
//   limit?: number;
// }

// export const Testimonials = async ({ limit = 4 }: Props) => {
//   const testimonialsResponse = await getTestimonialsCached();

//   if (testimonialsResponse.status === "error") {
//     return <div>Failed to load testimonials</div>;
//   }

//   const t = await getTranslations("Component");

//   const testimonials = testimonialsResponse.data || [];

//   const validTestimonials = testimonials.filter(
//     (testimonial) => testimonial.avatar && typeof testimonial.avatar !== "number",
//   );

//   if (validTestimonials.length === 0) {
//     return <div>No testimonials found</div>;
//   }

//   const displayTestimonials = validTestimonials.slice(0, limit);

//   const leftTestimonials = displayTestimonials.slice(0, Math.min(2, displayTestimonials.length));
//   const rightTestimonials = displayTestimonials.slice(Math.min(2, displayTestimonials.length));

//   return (
//     <div>
//       <h2 className="text-2xl font-bold">{t("Testimonials.title")}</h2>
//       <span className="text-sm text-gray-500">{t("Testimonials.description")}</span>
//       <div className="hidden md:block">
//         <div className="grid grid-cols-2 gap-8 px-4 py-16">
//           <div className="flex flex-col gap-8">
//             {leftTestimonials.map((testimonial, index) => {
//               const image = testimonial.avatar;

//               const hasImage = typeof image === "object" && image?.url;

//               const isLarge = index === 0;

//               return (
//                 <Card key={testimonial.id} className={cn(isLarge ? "h-full" : "h-auto")}>
//                   <CardHeader>
//                     <div className="grid grid-cols-[auto_1fr] items-center gap-3">
//                       <Avatar className="size-12">
//                         {hasImage ? (
//                           <AvatarImage
//                             src={getUrl(image?.url ?? "")}
//                             alt={testimonial.name}
//                             height={30}
//                             width={30}
//                             className="object-cover"
//                           />
//                         ) : (
//                           <ImagePlaceholder height={30} width={30} className="object-cover" />
//                         )}
//                         <AvatarFallback>{testimonial.name.charAt(0)}</AvatarFallback>
//                       </Avatar>
//                       <div>
//                         <h3 className="text-lg font-medium">{testimonial.name}</h3>
//                         <p className="text-sm text-muted-foreground">{testimonial.designation}</p>
//                       </div>
//                     </div>
//                   </CardHeader>
//                   <CardContent>
//                     <blockquote className="grid h-full grid-rows-[1fr_auto] gap-6">
//                       <p className={cn("font-medium line-clamp-6")}>{testimonial.quote}</p>
//                     </blockquote>
//                   </CardContent>
//                 </Card>
//               );
//             })}
//           </div>

//           <div className="flex flex-col gap-8">
//             {rightTestimonials.map((testimonial, index) => {
//               const image = testimonial.avatar;

//               const hasImage = typeof image === "object" && image?.url;

//               const isLarge = rightTestimonials.length > 1 && index === 1;

//               return (
//                 <Card
//                   key={testimonial.id}
//                   className={cn("variant-mixed", isLarge ? "h-full" : "h-auto")}
//                 >
//                   <CardHeader>
//                     <div className="grid grid-cols-[auto_1fr] items-center gap-3">
//                       <Avatar className="size-12">
//                         {hasImage ? (
//                           <AvatarImage
//                             src={getUrl(image?.url ?? "")}
//                             alt={testimonial.name}
//                             height={30}
//                             width={30}
//                             className="object-cover"
//                           />
//                         ) : (
//                           <ImagePlaceholder height={30} width={30} className="object-cover" />
//                         )}
//                         <AvatarFallback>{testimonial.name.charAt(0)}</AvatarFallback>
//                       </Avatar>
//                       <div>
//                         <h3 className="text-lg font-medium">{testimonial.name}</h3>
//                         <p className="text-sm text-muted-foreground">{testimonial.designation}</p>
//                       </div>
//                     </div>
//                   </CardHeader>
//                   <CardContent>
//                     <blockquote className="grid h-full grid-rows-[1fr_auto] gap-6">
//                       <p className={cn("font-medium line-clamp-6")}>{testimonial.quote}</p>
//                     </blockquote>
//                   </CardContent>
//                 </Card>
//               );
//             })}
//           </div>
//         </div>
//       </div>

//       <div className="md:hidden">
//         <MobileTestimonials testimonials={displayTestimonials} />
//       </div>
//     </div>
//   );
// };

// // TODO: add suspense fallback for desktop testimonials

// // const getTestimonialsCached = unstable_cache(apiClient.collections.)
