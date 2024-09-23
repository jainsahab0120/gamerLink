"use client";
import { LucideIcon } from "lucide-react";
import { useRecoilState } from "recoil";
import { toggleSidebarState } from "@/store/toggleSidebar";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import Link from "next/link";

interface NavItemProps {
  icon: LucideIcon;
  label: string;
  href: string;
  isActive: boolean;
}

export default function NavItem({
  icon: Icon,
  href,
  label,
  isActive,
}: NavItemProps) {
  const [collapsed, setCollapsed] = useRecoilState(toggleSidebarState);

  return (
    <Button
      asChild
      variant="ghost"
      className={cn(
        "w-full h-12",
        collapsed ? "justify-center" : "justify-start",
        isActive && "bg-accent"
      )}
    >
      <Link href={href}>
        <div className="flex items-center gap-x-4">
          <Icon className={cn("h-4 w-4", collapsed ? "mr-0" : "mr-2")} />
          {!collapsed && <span>{label}</span>}
        </div>
      </Link>
    </Button>
  );
}
