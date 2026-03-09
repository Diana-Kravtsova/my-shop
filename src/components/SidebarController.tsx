"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";
import { useSidebar } from "@/components/ui/sidebar";

export function SidebarController() {
  const pathname = usePathname();
  const { setOpen, isMobile, setOpenMobile } = useSidebar();

  useEffect(() => {
    if (pathname.startsWith("/product/")) {
      setOpen(false);
    }

    if (isMobile) {
      setOpenMobile(false);
    }
  }, [pathname, setOpen, isMobile, setOpenMobile]);

  return null;
}
