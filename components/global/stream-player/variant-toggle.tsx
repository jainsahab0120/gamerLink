"use client";

import { Button } from "@/components/ui/button";
import { ChatVariant, toggleChatSidebarState } from "@/store/use-chat-sidebar";
import { MessageSquare, Users } from "lucide-react";
import { useRecoilState } from "recoil";

export const VariantToggle = () => {
  const [chatState, setChatState] = useRecoilState(toggleChatSidebarState);
  const onChangeVariant = () => {
    setChatState((chatState) => ({
      ...chatState,
      variant:
        chatState.variant === ChatVariant.CHAT
          ? ChatVariant.COMMUNITY
          : ChatVariant.CHAT,
    }));
  };

  const Icon = chatState.collapsed ? Users : MessageSquare;
  const onToggle = () => {
    onChangeVariant();
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
