"use client";
import { onBlock } from "@/actions/block";
import { onFollow, onUnfollow } from "@/actions/follow";
import { Button } from "@/components/ui/button";
import { useTransition } from "react";

export const Actions = ({ isFollowing, userId }: any) => {
  const [isPending, startTransition] = useTransition();
  const handleFollow = () => {
    startTransition(() => {
      onFollow(userId);
    });
  };
  const handleUnfollow = () => {
    startTransition(() => {
      onUnfollow(userId);
    });
  };
  const onClickFollow = () => {
    if (isFollowing) handleUnfollow();
    else handleFollow();
  };

  const handleBlock = () => {
    startTransition(() => {
      onBlock(userId);
    });
  };

  return (
    <>
      <Button onClick={onClickFollow} disabled={isPending}>
        {isFollowing ? "Unfollow" : "Follow"}
      </Button>
      <Button disabled={isPending} onClick={handleBlock}>
        Block
      </Button>
    </>
  );
};
