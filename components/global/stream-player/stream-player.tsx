//@ts-nocheck
"use client";

import { useViewerToken } from "@/hooks/use-viewer-token";
import { LiveKitRoom } from "@livekit/components-react";
import { Video } from "./video";
import { toggleChatSidebarState } from "@/store/use-chat-sidebar";
import { cn } from "@/lib/utils";
import { useRecoilState } from "recoil";
import Chat from "./chat";
import { ChatToggle } from "./chat-toggle";
import Header from "./header";
import InfoCard from "./info-card";
import { AboutCard } from "./about-card";

export default function StreamPlayer({ user, stream, isFollowing }: any) {
  const { token, name, identity } = useViewerToken(user.id);

  const [chatState, setChatState] = useRecoilState(toggleChatSidebarState);

  if (!token || !name || !identity) {
    return <div>Cannot watch the stream</div>;
  }
  return (
    <>
      {chatState.collapsed && (
        <div className="hidden lg:block fixed top-[100px] right-2 z-50">
          <ChatToggle />
        </div>
      )}
      <LiveKitRoom
        token={token}
        serverUrl={process.env.NEXT_PUBLIC_LIVEKIT_WS_URL}
        className={cn(
          "grid grid-cols-1 lg:gap-y-0 lg:grid-cols-3 xl:grid-cols03 2xl:grid-cols-6 h-full",
          chatState.collapsed && "lg:grid-cols-2 xl:grid-cols-2 2xl:grid-cols-2"
        )}
      >
        <div className="space-y-4 col-span-1 lg:col-span-2 xl:col-span-2 2xl:col-span-5 lg:overflow-y-auto hidden-scrollbar pb-10">
          <Video hostname={user.username} hostIdentity={user.id} />
          <Header
            hostName={user.username}
            hostIdentity={user.id}
            viewerIdentity={identity}
            imageUrl={user.imageUrl}
            isFollowing={isFollowing}
            name={stream.name}
          />
          <InfoCard
            hostIdentity={user.id}
            viewerIdentity={identity}
            name={stream.name}
            thumbnailUrl={stream.thumbnailUrl}
          />
          <AboutCard
            hostName={user.username}
            hostIdentity={user.id}
            viewerIdentity={identity}
            bio={user.bio}
            followedByCount={user._count.followedBy}
          />
        </div>
        <div className={cn("col-span-1", chatState.collapsed && "hidden")}>
          <Chat
            viewerName={name}
            hostName={user.username}
            hostIdentity={user.id}
            isFollowing={isFollowing}
            isChatEnabled={stream.isChatEnabled}
            isChatDelayed={stream.isChatDelayed}
            isChatFollowersOnly={stream.isChatFollowersOnly}
          />
        </div>
      </LiveKitRoom>
    </>
  );
}
