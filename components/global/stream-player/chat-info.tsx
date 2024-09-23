import { useMemo } from "react";
import { Info } from "lucide-react";

interface ChatInfoProps {
  isChatDelayed: boolean;
  isChatFollowersOnly: boolean;
}

export const ChatInfo = ({
  isChatDelayed,
  isChatFollowersOnly,
}: ChatInfoProps) => {
  const label = useMemo(() => {
    if (isChatFollowersOnly && !isChatDelayed) {
      return "Followers Only";
    }
    if (!isChatFollowersOnly && isChatDelayed) {
      return "Slow mode";
    }
    if (isChatFollowersOnly && isChatDelayed) {
      return "Followers only & Slow Mode";
    }
    return "";
  }, [isChatDelayed, isChatFollowersOnly]);
  if (!isChatDelayed && !isChatFollowersOnly) return null;
  return (
    <div className="p-2 text-muted-foreground bg-white/5 border border-white/10 w-full rounded-t-md flex items-center gap-x-2">
      <Info className="h-4 w-4" />
      <p className="text-xs font-semibold">{label}</p>
    </div>
  );
};
