"use client";
import { useRecoilState } from "recoil";
import { toggleSidebarState } from "@/store/toggleSidebar";
import { Button } from "@/components/ui/button";
import { ArrowLeftFromLine, ArrowRightFromLine } from "lucide-react";

export function Toggle() {
  const [collapsed, setCollapsed] = useRecoilState(toggleSidebarState);
  const onCollapse = () => {
    setCollapsed(!collapsed);
  };

  return (
    <>
      {collapsed && (
        <div className="hidden lg:flex w-full items-center justify-center pt-4 mb-4">
          <Button onClick={onCollapse} variant="ghost" className="h-auto p-2">
            <ArrowRightFromLine className="h-4 w-4" />
          </Button>
        </div>
      )}
      {!collapsed && (
        <div className="p-3 pl-6 mb-2 flex items-center w-full">
          <p className="font-semibold text-white">For You</p>
          <Button
            onClick={onCollapse}
            className="h-auto p-2 ml-auto"
            variant="ghost"
          >
            <ArrowLeftFromLine />
          </Button>
        </div>
      )}
    </>
  );
}
