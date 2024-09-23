"use client";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Heart } from "lucide-react";
import { useSession } from "next-auth/react";
import { useTransition } from "react";
import { onFollow, onUnfollow } from "@/actions/follow";

interface ActionsProps {
  hostIdentity: string;
  isFollowing: boolean;
  isHost: boolean;
}

export default function Actions({
  hostIdentity,
  isFollowing,
  isHost,
}: ActionsProps) {
  const session = useSession();
  const [isPending, startTransition] = useTransition();
  const userId = session.data?.user?.id;
  const handleFollow = () => {
    startTransition(() => {
      onFollow(hostIdentity);
    });
  };
  const handleUnfollow = () => {
    startTransition(() => {
      onUnfollow(hostIdentity);
    });
  };
  const toggleFollow = () => {
    if (isHost) return;
    if (isFollowing) {
      handleUnfollow();
    } else {
      handleFollow();
    }
  };
  return (
    <Button
      disabled={isPending || isHost}
      onClick={toggleFollow}
      variant="primary"
      size="sm"
      className="w-full lg:w-auto"
    >
      <Heart
        className={cn("h-4 w-4 mr-2", isFollowing ? "fill-white" : "fill-none")}
      />
      {isFollowing ? "Unfollow" : "Follow"}
    </Button>
  );
}
