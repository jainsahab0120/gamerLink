"use client";
import { useRecoilState } from "recoil";
import { toggleSidebarState } from "@/store/toggleSidebar";
import { cn } from "@/lib/utils";
import { useEffect } from "react";
import { useMediaQuery } from "usehooks-ts";

export const Container = ({ children }: { children: React.ReactNode }) => {
  const matches = useMediaQuery("(max-width:1024px)");
  const [collapsed, setCollapsed] = useRecoilState(toggleSidebarState);
  useEffect(() => {
    if (matches) {
      setCollapsed(true);
    } else {
      setCollapsed(false);
    }
  }, [matches]);
  return (
    <div
      className={cn("flex-1", collapsed ? "ml-[70px]" : "ml-[70px] lg:ml-60")}
    >
      {children}
    </div>
  );
};
