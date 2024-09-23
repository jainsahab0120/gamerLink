import prisma from "@/db";
import { auth } from "../lib/auth";
import { getSelf } from "./auth-service";

export const isBlockedByUser = async (id: string) => {
  try {
    const session = await auth();
    const otherUser = await prisma.user.findUnique({
      where: { id },
    });
    if (!otherUser) throw new Error("User not found");

    if (otherUser.id === session?.user?.id) return false;
    const existingBlock = await prisma.block.findUnique({
      where: {
        blockedId_blockerId: {
          blockedId: session?.user?.id as string,
          blockerId: otherUser.id,
        },
      },
    });
    return !!existingBlock;
  } catch (error) {
    return false;
  }
};

export const blockUser = async (id: string) => {
  const session = await auth();
  if (session?.user?.id === id) throw new Error("Cannot block yourself");
  const otherUser = await prisma.user.findUnique({
    where: { id },
  });
  if (!otherUser) throw new Error("User not found");
  const existingBlock = await prisma.block.findUnique({
    where: {
      blockedId_blockerId: {
        blockedId: session?.user?.id as string,
        blockerId: otherUser.id,
      },
    },
  });
  if (existingBlock) throw new Error("Already blocked");
  const block = await prisma.block.create({
    data: {
      blockerId: session?.user?.id as string,
      blockedId: otherUser.id,
    },
    include: {
      blocked: true,
    },
  });
  return block;
};

export const unblockUser = async (id: string) => {
  const session = await auth();
  if (session?.user?.id === id) throw new Error("Cannot unblock yourself");
  const otherUser = await prisma.user.findUnique({
    where: { id },
  });
  if (!otherUser) throw new Error("User not found");

  const existingBlock = await prisma.block.findUnique({
    where: {
      blockedId_blockerId: {
        blockedId: otherUser.id,
        blockerId: session?.user?.id as string,
      },
    },
  });
  if (!existingBlock) return;
  const unblock = await prisma.block.delete({
    where: {
      id: existingBlock.id,
    },
    include: {
      blocked: true,
    },
  });
  return unblock;
};

export const getBlockedUsers = async () => {
  const self = await getSelf();
  const blockedUsers = await prisma.block.findMany({
    where: {
      blockerId: self?.id,
    },
    include: {
      blocked: true,
    },
  });
  return blockedUsers;
};
