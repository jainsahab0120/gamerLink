//@ts-nocheck
import prisma from "@/db";
import { auth } from "@/lib/auth";
export const getSelfByUsername = async (username: string) => {
  const session = await auth();
  if (!session || !session.user?.username) throw new Error("unauthorized");
  const user = await prisma.user.findUnique({
    where: { username },
  });

  if (!user) throw new Error("User not found");
  if (session.user.username !== user.username) {
    throw new Error("Unauthorized");
  }

  return user;
};

export const getSelf = async () => {
  const session = await auth();

  const self = session?.user;
  return self;
};
