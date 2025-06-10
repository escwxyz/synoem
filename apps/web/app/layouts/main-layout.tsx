"use client";

import { usePathname } from "@/i18n/navigation";
import { cn } from "@synoem/ui/lib/utils";
import { SidebarInset } from "~/components/sidebar.client";

export const MainLayout = ({ children }: { children: React.ReactNode }) => {
  const pathname = usePathname();

  const isHomePage = pathname === "/";

  return (
    <SidebarInset
      className={cn("w-full max-w-none flex-1 mx-auto p-4 md:p-8", isHomePage && "!p-0")}
    >
      {children}
    </SidebarInset>
  );
};
