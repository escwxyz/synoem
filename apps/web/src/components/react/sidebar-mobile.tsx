"use client";

import {
  Drawer,
  DrawerContent,
  DrawerDescription,
  DrawerHeader,
  DrawerTitle,
} from "@synoem/ui/components/drawer";
import { cn } from "@synoem/ui/lib/utils";
import { useSidebar } from "~/hooks/use-sidebar";

export const SidebarMobile = ({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) => {
  const { openMobile, setOpenMobile } = useSidebar();

  return (
    <Drawer open={openMobile} onOpenChange={setOpenMobile} autoFocus={openMobile}>
      <DrawerContent
        data-sidebar="sidebar"
        data-slot="sidebar"
        data-mobile="true"
        className={cn("bg-sidebar text-sidebar-foreground w-full p-0", className)}
      >
        <DrawerHeader className="sr-only">
          <DrawerTitle>Sidebar</DrawerTitle>
          <DrawerDescription>Displays the mobile sidebar.</DrawerDescription>
        </DrawerHeader>
        <div className="flex h-full w-full flex-col">{children}</div>
      </DrawerContent>
    </Drawer>
  );
};
