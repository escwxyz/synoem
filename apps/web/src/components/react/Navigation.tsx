// // TODO: there is a bug that the link and radix component is not working together
// // SEE: https://github.com/amannn/next-intl/issues/1271

// // import { Link } from "@/i18n/navigation";
// import type { Header } from "@synoem/payload/payload-types";
// import {
//   NavigationMenu,
//   NavigationMenuContent,
//   NavigationMenuItem,
//   NavigationMenuLink,
//   NavigationMenuList,
//   NavigationMenuTrigger,
//   navigationMenuTriggerStyle,
// } from "@synoem/ui/components/ui/navigation-menu";
// import { cn } from "@synoem/ui/lib/utils";
// import { Button } from "@synoem/ui/components/ui/button";
// import { getMenuLinkConfig } from "@/utils/get-menu-link-config";

// interface ListItemProps {
//   icon?: React.ReactNode;
//   iconGradient?: React.ReactNode;
//   title: string;
//   description?: string;
//   href: string;
//   isExtended?: boolean;
//   isExternal?: boolean;
// }

// const ListItem = ({
//   title,
//   description,
//   icon,
//   iconGradient,
//   href,
//   isExtended,
//   isExternal,
// }: ListItemProps) => (
//   <li>
//     <Link href={href} passHref legacyBehavior>
//       <NavigationMenuLink
//         className={cn(
//           "relative flex gap-2.5 before:absolute before:-inset-2.5 before:rounded-lg before:opacity-0 hover:before:opacity-100 before:bg-muted before:transition-opacity",
//           navigationMenuTriggerStyle(),
//         )}
//         {...(isExternal
//           ? {
//               target: "_blank",
//               rel: "noopener noreferrer",
//             }
//           : {})}
//       >
//         {isExtended && iconGradient && (
//           <div className="relative z-10 flex size-8 shrink-0 items-center justify-center rounded-lg border border-border bg-muted">
//             {iconGradient}
//           </div>
//         )}
//         {!isExtended && icon && (
//           <div className="relative z-10 shrink-0 text-muted-foreground">
//             {icon}
//           </div>
//         )}
//         <div className="relative z-10">
//           <span className="block text-sm font-medium leading-none tracking-tight">
//             {title}
//           </span>
//           {description && (
//             <span className="mt-1.5 block text-xs font-light leading-none text-muted-foreground">
//               {description}
//             </span>
//           )}
//         </div>
//       </NavigationMenuLink>
//     </Link>
//   </li>
// );

// export function DesktopNavigation({
//   items,
//   settings,
// }: {
//   items: NonNullable<Header["items"]>;
//   settings?: NonNullable<Header["settings"]>;
// }) {
//   return (
//     <NavigationMenu
//       className={cn(
//         "hidden lg:block",
//         settings?.desktop?.alignment && `justify-${settings.desktop.alignment}`,
//       )}
//     >
//       <NavigationMenuList className="flex gap-x-10">
//         {items?.map(({ id, link, text, sections }) => {
//           if (!sections?.length) {
//             const { isExternal, href } = getMenuLinkConfig(link);

//             console.log(isExternal, href);

//             return (
//               <NavigationMenuItem key={id}>
//                 {link ? (
//                   <Link href={href} passHref legacyBehavior>
//                     <NavigationMenuLink
//                       className={navigationMenuTriggerStyle()}
//                       {...(isExternal
//                         ? {
//                             target: "_blank",
//                             rel: "noopener noreferrer",
//                           }
//                         : {})}
//                     >
//                       {text}
//                     </NavigationMenuLink>
//                   </Link>
//                 ) : (
//                   <Button variant="ghost" className="text-sm">
//                     {text}
//                   </Button>
//                 )}
//               </NavigationMenuItem>
//             );
//           }

//           return (
//             <NavigationMenuItem key={id}>
//               <NavigationMenuTrigger className="text-sm">
//                 {text}
//               </NavigationMenuTrigger>
//               <NavigationMenuContent>
//                 <ul
//                   className={cn(
//                     // "border-gray-new-94 bg-white shadow-[0px_14px_20px_0px_rgba(0,0,0,.1)] dark:border-[#16181D] dark:bg-[#0B0C0F] dark:shadow-[0px_14px_20px_0px_rgba(0,0,0,.5)]",
//                     sections && sections.length > 1
//                       ? "grid w-max grid-cols-[repeat(2,minmax(0,auto));] gap-x-14 gap-y-9 px-7 py-6"
//                       : "p-4",
//                   )}
//                 >
//                   {sections?.map(({ type, id, banner, linksSection }) => {
//                     if (type === "banner" && banner) {
//                       const { href, isExternal } = getMenuLinkConfig(
//                         banner.link,
//                       );

//                       return (
//                         <li key={id} className="row-span-3">
//                           <Link href={href} passHref legacyBehavior>
//                             <NavigationMenuLink
//                               className={cn(
//                                 navigationMenuTriggerStyle(),
//                                 "flex h-full w-full select-none flex-col justify-end rounded-md bg-gradient-to-b from-muted/50 to-muted p-6 no-underline outline-none focus:shadow-md",
//                               )}
//                               {...(isExternal
//                                 ? {
//                                     target: "_blank",
//                                     rel: "noopener noreferrer",
//                                   }
//                                 : {})}
//                             >
//                               {banner.media && (
//                                 <div className="mb-2 mt-4">
//                                   {/* TODO: Add Media component */}
//                                 </div>
//                               )}
//                               <div className="mb-2 text-lg font-medium">
//                                 {banner.title}
//                               </div>
//                               {banner.desc && (
//                                 <p className="text-sm leading-tight text-muted-foreground">
//                                   {banner.desc}
//                                 </p>
//                               )}
//                             </NavigationMenuLink>
//                           </Link>
//                         </li>
//                       );
//                     }

//                     if (type === "links" && linksSection) {
//                       const { isExtended, title, items } = linksSection;

//                       return (
//                         <li
//                           key={id}
//                           className={cn(
//                             "min-w-[94px]",
//                             sections &&
//                               sections.length > 1 && [
//                                 isExtended ? "w-[216px]" : "w-[196px]",
//                               ],
//                           )}
//                         >
//                           {title && (
//                             <span className="mb-5 block text-xs font-medium uppercase leading-none text-muted-foreground">
//                               {title}
//                             </span>
//                           )}
//                           <ul
//                             className={cn(
//                               "flex flex-col",
//                               isExtended ? "gap-5" : "gap-[18px]",
//                             )}
//                           >
//                             {items?.map((item) => {
//                               const { href, isExternal } = getMenuLinkConfig(
//                                 item.link,
//                               );
//                               return (
//                                 <ListItem
//                                   key={item.id}
//                                   title={item.title || ""}
//                                   href={href}
//                                   description={item.desc || ""}
//                                   isExtended={isExtended || false}
//                                   isExternal={isExternal}
//                                 />
//                               );
//                             })}
//                           </ul>
//                         </li>
//                       );
//                     }
//                     return null;
//                   })}
//                 </ul>
//               </NavigationMenuContent>
//             </NavigationMenuItem>
//           );
//         })}
//       </NavigationMenuList>
//     </NavigationMenu>
//   );
// }
