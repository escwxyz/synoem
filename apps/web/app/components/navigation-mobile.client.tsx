"use client";

import { useState, useEffect, useRef } from "react";
import {
  Drawer,
  DrawerTrigger,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
  DrawerDescription,
  DrawerFooter,
  DrawerClose,
} from "@synoem/ui/components/drawer";
import { Button } from "@synoem/ui/components/button";
import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from "@synoem/ui/components/accordion";
import { ThemeSwitcher } from "./theme-switcher.client";
import { LanguageSwitcher } from "./language-switcher.client";
import type { Header } from "@synoem/types";
import type { Locale } from "@synoem/config";
import { getMenuLinkConfig } from "~/utils/get-menu-link-config";
import { motion } from "motion/react";
import { X } from "lucide-react";
import { Link, usePathname, useRouter } from "@/i18n/navigation";

export const NavigationMobile = ({
  items,
  locale,
}: {
  items: Header["items"];
  locale: Locale;
}) => {
  const [open, setOpen] = useState(false);

  const headerRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    headerRef.current = document.getElementById("site-header");
  }, []);

  const handleOpenChange = (isOpen: boolean) => {
    setOpen(isOpen);

    if (headerRef.current) {
      if (isOpen) {
        // 抽屉打开时，将 header 向上移动并淡出
        headerRef.current.style.transform = "translateY(-100%)";
        headerRef.current.style.opacity = "0";
      } else {
        // 抽屉关闭时，恢复 header
        setTimeout(() => {
          // biome-ignore lint/style/noNonNullAssertion: <explanation>
          headerRef.current!.style.transform = "translateY(0)";
          // biome-ignore lint/style/noNonNullAssertion: <explanation>
          headerRef.current!.style.opacity = "1";
        }, 100); // 轻微延迟，让抽屉先开始关闭
      }
    }
  };

  const handleThemeChange = () => {
    setOpen(false);

    if (headerRef.current) {
      headerRef.current.style.transform = "translateY(0)";
      headerRef.current.style.opacity = "1";
    }
  };

  const router = useRouter();
  const pathname = usePathname();

  const handleLanguageChange = (locale: Locale) => {
    setOpen(false);

    if (headerRef.current) {
      headerRef.current.style.transform = "translateY(0)";
      headerRef.current.style.opacity = "1";
    }

    setTimeout(() => {
      router.replace(pathname, { locale, scroll: false });
    }, 300);
  };

  return (
    <>
      <Drawer
        direction="top"
        open={open}
        onOpenChange={setOpen}
        // modal={true}
        // dismissible={false}
        // shouldScaleBackground={false}
      >
        <DrawerTrigger asChild>
          <Button variant="ghost" size="icon" className="lg:hidden">
            <MenuToggleIcon isOpen={open} />
            <span className="sr-only">Toggle menu</span>
          </Button>
        </DrawerTrigger>
        <DrawerContent className="h-[96%]">
          <DrawerHeader className="flex flex-row items-center justify-between border-b h-[68px]">
            <div className="flex items-center gap-2">
              <DrawerTitle className="text-lg font-medium">LOGO</DrawerTitle>
              <DrawerDescription className="text-sm text-muted-foreground">
                Description
              </DrawerDescription>
            </div>

            <DrawerClose asChild>
              <Button variant="ghost" size="icon">
                <X className="h-5 w-5" />
                <span className="sr-only">Close</span>
              </Button>
            </DrawerClose>
          </DrawerHeader>
          <div className="flex-1 overflow-y-auto p-4">
            <nav className="flex flex-col p-4">
              {items?.map((item, index) => {
                const { link, type, text, sections } = item;

                // 直接链接项的处理
                if (type === "link" && !sections?.length) {
                  const linkConfig = getMenuLinkConfig(link);

                  if (!linkConfig) {
                    return (
                      <Button
                        key={item.id || index}
                        variant="ghost"
                        className="justify-start px-2 py-6 text-base font-medium"
                      >
                        {text}
                      </Button>
                    );
                  }

                  return (
                    <Button
                      key={item.id || index}
                      variant={linkConfig.appearance === "outline" ? "outline" : "ghost"}
                      className="justify-start px-2 py-6 text-base font-medium"
                      asChild
                    >
                      <Link
                        href={linkConfig.href}
                        onClick={() => setOpen(false)}
                        {...(linkConfig.openInNewTab
                          ? {
                              target: "_blank",
                              rel: "noopener noreferrer",
                            }
                          : {})}
                      >
                        {text}
                      </Link>
                    </Button>
                  );
                }

                // 带有子菜单的项处理
                return (
                  <Accordion key={item.id || index} type="single" collapsible className="w-full">
                    <AccordionItem value={`item-${index}`} className="border-none">
                      <AccordionTrigger className="py-4 text-lg font-medium">
                        {text}
                      </AccordionTrigger>
                      <AccordionContent>
                        <div className="flex flex-col space-y-3 pl-4">
                          {sections?.map((section, sectionIndex) => {
                            // 处理链接列表类型
                            if (section.type === "links" && section.linksSection) {
                              return (
                                <div key={section.id || sectionIndex} className="mb-4">
                                  {section.linksSection.title && (
                                    <div className="mb-2 py-1 text-sm font-medium text-muted-foreground uppercase">
                                      {section.linksSection.title}
                                    </div>
                                  )}
                                  <div className="flex flex-col space-y-3">
                                    {section.linksSection.items?.map((item, itemIndex) => {
                                      const linkConfig = getMenuLinkConfig(item.link);
                                      if (!linkConfig) return null;

                                      return (
                                        <div
                                          key={item.id || itemIndex}
                                          className="flex items-start gap-2"
                                        >
                                          {item.icon && (
                                            <div className="mt-0.5 text-muted-foreground">
                                              {/* 这里可以渲染图标 */}
                                            </div>
                                          )}
                                          <div className="flex flex-col">
                                            <Button
                                              variant={
                                                linkConfig.appearance === "outline"
                                                  ? "outline"
                                                  : "ghost"
                                              }
                                              className="h-auto justify-start p-0 text-base font-medium"
                                              asChild
                                            >
                                              <a
                                                href={linkConfig.href}
                                                onClick={() => setOpen(false)}
                                                {...(linkConfig.openInNewTab
                                                  ? {
                                                      target: "_blank",
                                                      rel: "noopener noreferrer",
                                                    }
                                                  : {})}
                                              >
                                                {item.title}
                                              </a>
                                            </Button>
                                            {item.desc && (
                                              <p className="mt-1 text-sm text-muted-foreground">
                                                {item.desc}
                                              </p>
                                            )}
                                          </div>
                                        </div>
                                      );
                                    })}
                                  </div>
                                </div>
                              );
                            }

                            // 处理banner类型
                            if (section.type === "banner" && section.banner) {
                              const linkConfig = getMenuLinkConfig(section.banner.link);
                              if (!linkConfig) return null;

                              return (
                                <div
                                  key={section.id || sectionIndex}
                                  className="mb-2 rounded-lg bg-muted p-4"
                                >
                                  <a
                                    href={linkConfig.href}
                                    onClick={() => setOpen(false)}
                                    className="block"
                                    {...(linkConfig.openInNewTab
                                      ? {
                                          target: "_blank",
                                          rel: "noopener noreferrer",
                                        }
                                      : {})}
                                  >
                                    {section.banner.media && (
                                      <div className="mb-3">{/* 这里可以渲染媒体内容 */}</div>
                                    )}
                                    {section.banner.title && (
                                      <div className="text-base font-medium">
                                        {section.banner.title}
                                      </div>
                                    )}
                                    {section.banner.desc && (
                                      <p className="mt-1 text-sm text-muted-foreground">
                                        {section.banner.desc}
                                      </p>
                                    )}
                                  </a>
                                </div>
                              );
                            }

                            return null;
                          })}
                        </div>
                      </AccordionContent>
                    </AccordionItem>
                  </Accordion>
                );
              })}
            </nav>
          </div>

          <DrawerFooter className="flex flex-row justify-between border-t pt-4">
            <div>
              <ThemeSwitcher onThemeChange={handleThemeChange} />
            </div>
            <div>
              <LanguageSwitcher onLocaleChange={handleLanguageChange} />
            </div>
          </DrawerFooter>
        </DrawerContent>
      </Drawer>
    </>
  );
};

const MenuToggleIcon = ({ isOpen }: { isOpen: boolean }) => {
  return (
    <svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="h-6 w-6"
    >
      <title>Menu Toggle Icon</title>
      <motion.path
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        initial={false}
        animate={{ d: isOpen ? "M6 6L18 18" : "M4 6H20" }}
        transition={{ duration: 0.4, ease: "easeInOut" }}
      />
      <motion.path
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        initial={false}
        animate={{
          d: isOpen ? "M6 18L18 6" : "M4 12H20",
        }}
        transition={{ duration: 0.4, ease: "easeInOut" }}
      />
      <motion.path
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        initial={false}
        animate={{
          d: isOpen ? "M6 12H18" : "M4 18H20",
          opacity: isOpen ? 0 : 1,
        }}
        transition={{ duration: 0.4, ease: "easeInOut" }}
      />
    </svg>
  );
};
