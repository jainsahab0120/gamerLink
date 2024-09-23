"use client";

import { ArrowLeftFromLine, ArrowRightFromLine } from "lucide-react";
import { Button } from "@/components/ui/button";
import { toggleChatSidebarState } from "@/store/use-chat-sidebar";
import { useRecoilState } from "recoil";

export const ChatToggle = () => {
  const [chatState, setChatState] = useRecoilState(toggleChatSidebarState);
  const onExpand = () => {
    setChatState((chatState) => ({ ...chatState, collapsed: false }));
  };
  const onCollapse = () => {
    setChatState((chatState) => ({ ...chatState, collapsed: true }));
  };
  const Icon = chatState.collapsed ? ArrowLeftFromLine : ArrowRightFromLine;
  const onToggle = () => {
    if (chatState.collapsed) onExpand();
    else onCollapse();
  };
  return (
    <Button
      onClick={onToggle}
      variant="ghost"
      className="h-auto p-2 hover:bg-white/10 hover:text-primary bg-transparent"
    >
      <Icon className="h-4 w-4" />
    </Button>
  );
};
