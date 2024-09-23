"use client";

import { useMediaQuery } from "usehooks-ts";
import { ChatVariant, toggleChatSidebarState } from "@/store/use-chat-sidebar";
import { useRecoilState } from "recoil";
import {
  useChat,
  useConnectionState,
  useRemoteParticipant,
} from "@livekit/components-react";
import { ConnectionState } from "livekit-client";
import { useEffect, useMemo, useState } from "react";
import { ChatHeader } from "./chat-header";
import { ChatForm } from "./chat-form";
import { ChatList } from "./chat-list";
import { ChatCommunity } from "./chat-community";

interface ChatProps {
  hostName: string;
  hostIdentity: string;
  viewerName: string;
  isFollowing: boolean;
  isChatEnabled: boolean;
  isChatDelayed: boolean;
  isChatFollowersOnly: boolean;
}

export default function Chat({
  hostName,
  hostIdentity,
  viewerName,
  isFollowing,
  isChatEnabled,
  isChatDelayed,
  isChatFollowersOnly,
}: ChatProps) {
  const matches = useMediaQuery("(max-width:1024px)");
  const [chatState, setChatState] = useRecoilState(toggleChatSidebarState);
  const onExpand = () => {
    setChatState((chatState) => ({ ...chatState, collapsed: false }));
  };

  const connectionState = useConnectionState();
  const participant = useRemoteParticipant(hostIdentity);
  const isOnline = participant && connectionState === ConnectionState.Connected;
  const isHidden = !isChatEnabled || !isOnline;
  const [value, setValue] = useState("");
  const { chatMessages: messages, send } = useChat();
  useEffect(() => {
    if (matches) {
      onExpand();
    }
  }, [matches]);
  const reverseMessages = useMemo(() => {
    return messages.sort((a, b) => b.timestamp - a.timestamp);
  }, [messages]);
  const onSubmit = () => {
    if (!send) return;
    send(value);
    setValue("");
  };
  const onChange = (value: string) => {
    setValue(value);
  };
  return (
    <div className="flex flex-col bg-background border-l border-b pt-0 h-[calc(100vh-80px)]">
      <ChatHeader />
      {chatState.variant === ChatVariant.CHAT && (
        <>
          <ChatList messages={reverseMessages} isHidden={isHidden} />
          <ChatForm
            onSubmit={onSubmit}
            value={value}
            onChange={onChange}
            isHidden={isHidden}
            isChatFollowersOnly={isChatFollowersOnly}
            isChatDelayed={isChatDelayed}
            isFollowing={isFollowing}
          />
        </>
      )}
      {chatState.variant === ChatVariant.COMMUNITY && (
        <>
          <ChatCommunity
            viewerName={viewerName}
            hostName={hostName}
            isHidden={isHidden}
          />
        </>
      )}
    </div>
  );
}
