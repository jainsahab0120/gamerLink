//@ts-nocheck
import { getStreamByUserId } from "@/actions/stream-service";
import { auth } from "@/lib/auth";
import ToggleCard from "./_components/toggle-card";

export default async function ChatPage() {
  const session = await auth();

  const self = session?.user;
  const stream = await getStreamByUserId(self?.id);
  if (!stream) throw new Error("Stream not found");

  return (
    <div className="p-6 ">
      <div className="mb-4">
        <h1 className="text-2xl font-bold">Chat Settings</h1>
      </div>
      <div className="space-y-4">
        <ToggleCard
          field="isChatEnabled"
          label="Enable Chat"
          value={stream.isChatEnabled}
        />
        <ToggleCard
          field="isChatDelayed"
          label="Delay Chat"
          value={stream.isChatDelayed}
        />
        <ToggleCard
          field="isChatFollowersOnly"
          label="Must be follower to Chat"
          value={stream.isChatFollowersOnly}
        />
      </div>
    </div>
  );
}
