"use client";

import { useTransition } from "react";
import { MinusCircle } from "lucide-react";
import { onBlock } from "@/actions/block";
import { cn, stringToColor } from "@/lib/utils";
import { Button } from "@/components/ui/button";

interface CommunityItemProps {
  hostName: string;
  viewerName: string;
  participantName?: string;
  participantIdentity: string;
}

export const CommunityItem = ({
  hostName,
  viewerName,
  participantName,
  participantIdentity,
}: CommunityItemProps) => {
  const [isPending, startTransition] = useTransition();
  const color = stringToColor(participantName || "");
  const isSelf = participantName === viewerName;
  const isHost = viewerName === hostName;
  const handleBlock = () => {
    if (!participantName || isSelf || !isHost) return;
    startTransition(() => {
      onBlock(participantIdentity);
    });
  };
  return (
    <div
      className={cn(
        "group flex items-center justify-center w-full p-2 rounded-md text-sm hover:bg-white/5",
        isPending && "opacity-50 pointer-events-none"
      )}
    >
      <p style={{ color: color }}>{participantName}</p>
      {isHost && !isSelf && (
        <Button
          variant="ghost"
          disabled={isPending}
          onClick={handleBlock}
          className="h-auto w-auto p-1 opacity-0 group-hover:opacity-100 transition"
        >
          <MinusCircle className="h-4 w-4 to-muted-foreground" />
        </Button>
      )}
    </div>
  );
};
