"use client";
import { cn } from "@/lib/utils";
import { useRecoilState } from "recoil";
import { toggleSidebarState } from "@/store/toggleSidebar";

interface WrapperProps {
  children: React.ReactNode;
}

export default function Wrapper({ children }: WrapperProps) {
  const [collapsed, setCollapsed] = useRecoilState(toggleSidebarState);

  return (
    <aside
      className={cn(
        "fixed left-0 flex flex-col w-60 h-full bg-slate-800 border-r border-slate-900 z-50",
        collapsed && "w-[70px]"
      )}
    >
      {children}
    </aside>
  );
}
