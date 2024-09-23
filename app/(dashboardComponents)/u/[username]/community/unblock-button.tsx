"use client";

import { useTransition } from "react";
import { onUnblock } from "@/actions/block";
import { Button } from "@/components/ui/button";

interface UnblockButtonProps {
  userId: string;
}

export const UnblockButton = ({ userId }: UnblockButtonProps) => {
  const [isPending, startTransition] = useTransition();
  const onClick = () => {
    startTransition(() => {
      onUnblock(userId);
    });
  };

  return (
    <Button
      disabled={isPending}
      onClick={onClick}
      variant="link"
      size="sm"
      className="text-blue-500 w-full"
    >
      UnBlock
    </Button>
  );
};
