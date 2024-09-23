import { isBlockedByUser } from "@/actions/blocked-service";
import { isFollowingUser } from "@/actions/follow-service";
import { getUserByUsername } from "@/actions/user-service";
import StreamPlayer from "@/components/global/stream-player/stream-player";
import { notFound } from "next/navigation";

interface UserPageProps {
  params: {
    username: string;
  };
}

export default async function UserPage({ params }: UserPageProps) {
  const user = await getUserByUsername(params.username);
  if (!user || !user.stream) {
    notFound();
  }
  const isFollowing = await isFollowingUser(user.id);
  const isBlocked = await isBlockedByUser(user.id);
  if (isBlocked) {
    notFound();
  }
  return (
    <StreamPlayer user={user} stream={user.stream} isFollowing={isFollowing} />
  );
}
