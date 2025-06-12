"use client";

import { Link as I18nLink, usePathname } from "@/i18n/navigation";
import { useIsMobile } from "@synoem/ui/hooks/use-mobile";
import { mobileNavigationOpenAtom, desktopNavigationActiveAtom } from "~/atoms";
import { useAtom } from "jotai";
import { type ComponentProps, forwardRef, useEffect, useRef } from "react";

type CustomLinkProps = ComponentProps<typeof I18nLink>;

export const Link = forwardRef<HTMLAnchorElement, CustomLinkProps>(
  ({ href, children, className, ...props }, ref) => {
    const isMobile = useIsMobile();

    const [isMobileMenuOpen, setIsMobileMenuOpen] = useAtom(mobileNavigationOpenAtom);

    const [active, setActive] = useAtom(desktopNavigationActiveAtom);

    const pathname = usePathname();
    const prevPathname = useRef(pathname);

    useEffect(() => {
      if (prevPathname.current !== pathname) {
        if (isMobile && isMobileMenuOpen) {
          setIsMobileMenuOpen(false);
        }
        if (!isMobile && active) {
          setActive(null);
        }
        prevPathname.current = pathname;
      }
    }, [isMobile, isMobileMenuOpen, setIsMobileMenuOpen, pathname, active, setActive]);

    // TODO: maybe could add some page transition here

    //   const slideInOut = useCallback(() => {
    //     document.documentElement.animate(
    //       [
    //         {
    //           opacity: 1,
    //           transform: "translateY(0)",
    //         },
    //         {
    //           opacity: 0.2,
    //           transform: "translateY(-35%)",
    //         },
    //       ],
    //       {
    //         duration: 1500,
    //         easing: "cubic-bezier(0.4, 0, 0.2, 1)",
    //         fill: "forwards",
    //         pseudoElement: "::view-transition-old(root)",
    //       },
    //     );

    //     document.documentElement.animate(
    //       [
    //         {
    //           clipPath: "polygon(0 100%, 100% 100%, 100% 100%, 0 100%)",
    //         },
    //         {
    //           clipPath: "polygon(0 100%, 100% 100%, 100% 0, 0 0)",
    //         },
    //       ],
    //       {
    //         duration: 1500,
    //         easing: "cubic-bezier(0.4, 0, 0.2, 1)",
    //         fill: "forwards",
    //         pseudoElement: "::view-transition-new(root)",
    //       },
    //     );
    //   }, []);

    return (
      <I18nLink href={href} className={className} {...props}>
        {children}
      </I18nLink>
    );
  },
);
