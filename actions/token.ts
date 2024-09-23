//@ts-nocheck
"use server";

import { v4 } from "uuid";
import { AccessToken } from "livekit-server-sdk";
import { getSelf } from "./auth-service";
import { getUserById } from "./user-service";
import { isBlockedByUser } from "./blocked-service";

export const createViewerToken = async (hostIdentity: string) => {
  const self = await getSelf();
  const host = await getUserById(hostIdentity);
  if (!host) throw new Error("User not found");
  const isBlocked = await isBlockedByUser(host.id);
  if (isBlocked) throw new Error("User is blocked");
  const isHost = self.id === host.id;
  const token = new AccessToken(
    process.env.LIVEKIT_API_KEY!,
    process.env.LIVEKIT_API_SECRET!,
    {
      identity: isHost ? `host-${self.id}` : self?.id,
      name: self.username,
    }
  );
  token.addGrant({
    room: host.id,
    roomJoin: true,
    canPublish: false,
    canPublishData: true,
  });
  return await Promise.resolve(token.toJwt());
};
