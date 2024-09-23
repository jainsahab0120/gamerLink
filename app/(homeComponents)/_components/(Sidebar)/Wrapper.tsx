"use client";
import { useRecoilState } from "recoil";
import { toggleSidebarState } from "@/store/toggleSidebar";
import { cn } from "@/lib/utils";

interface WrapperProps {
  children: React.ReactNode;
}

export default function Wrapper({ children }: WrapperProps) {
  const [collapsed, setCollapsed] = useRecoilState(toggleSidebarState);
  return (
    <aside
      className={cn(
        "fixed left-0 flex flex-col w-60 h-full bg-white dark:bg-slate-800 border-r border-slate-800 z-50",
        collapsed && "w-[70px]"
      )}
    >
      {children}
    </aside>
  );
}
