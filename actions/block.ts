//@ts-nocheck
"use server";
import { revalidatePath } from "next/cache";
import { blockUser, unblockUser } from "./blocked-service";
import { auth } from "@/lib/auth";
import { RoomServiceClient } from "livekit-server-sdk";

const roomService = new RoomServiceClient(
  process.env.LIVEKIT_API_URL!,
  process.env.LIVEKIT_API_KEY!,
  process.env.LIVEKIT_API_SECRET!
);

export const onBlock = async (id: string) => {
  const session = await auth();
  const blockeduser = await blockUser(id);
  await roomService.removeParticipant(session?.user?.id, id);
  revalidatePath("/home");
  revalidatePath(`/u/${session.username}/community`);
  return blockeduser;
};

export const onUnblock = async (id: string) => {
  const session = await auth();

  const unblockedUser = await unblockUser(id);
  revalidatePath("/");
  if (unblockedUser) {
    revalidatePath(`/${session?.user.username}/community`);
  }
  return unblockedUser;
};
