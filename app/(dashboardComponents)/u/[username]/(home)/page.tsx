import { getUserByUsername } from "@/actions/user-service";
import StreamPlayer from "@/components/global/stream-player/stream-player";
import { auth } from "@/lib/auth";

interface CreatorPageProps {
  params: {
    username: string;
  };
}

export default async function Home({ params }: CreatorPageProps) {
  const session = await auth();
  const externalUser = session?.user;
  const user = await getUserByUsername(params.username);
  if (!user || user.id != externalUser?.id || !user.stream) {
    throw new Error("Unauthorized");
  }
  return (
    <div className="h-full">
      <StreamPlayer user={user} stream={user.stream} isFollowing />
    </div>
  );
}
