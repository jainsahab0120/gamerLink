//@ts-nocheck
"use client";

import { usePathname } from "next/navigation";
import { Fullscreen, KeyRound, MessageSquare, Users } from "lucide-react";
import { useSession } from "next-auth/react";
import NavItem from "./NavItem";

export default function Navigation() {
  const pathname = usePathname();
  const session = useSession();
  const routes = [
    {
      label: "Stream",
      href: `/u/${session.data?.user?.username}`,
      icon: Fullscreen,
    },
    {
      label: "Key",
      href: `/u/${session.data?.user?.username}/keys`,
      icon: KeyRound,
    },
    {
      label: "Chat",
      href: `/u/${session.data?.user?.username}/chat`,
      icon: MessageSquare,
    },
    {
      label: "Community",
      href: `/u/${session.data?.user?.username}/community`,
      icon: Users,
    },
  ];
  return (
    <ul className="space-y-2 px-2 pt-4 lg:pt-0">
      {routes.map((route) => (
        <NavItem
          key={route.href}
          label={route.label}
          icon={route.icon}
          href={route.href}
          isActive={pathname === route.href}
        />
      ))}
    </ul>
  );
}
