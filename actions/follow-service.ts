import prisma from "@/db";
import { auth } from "../lib/auth";

export const getFollowedUsers = async () => {
  try {
    const session = await auth();
    const followedUsers = prisma.follow.findMany({
      where: {
        followerId: session?.user?.id,
        following: {
          blocking: {
            none: {
              blockedId: session?.user?.id,
            },
          },
        },
      },
      include: {
        following: {
          include: {
            stream: {
              select: {
                isLive: true,
              },
            },
          },
        },
      },
    });
    return followedUsers;
  } catch (error) {
    return [];
  }
};

export const isFollowingUser = async (id: string) => {
  try {
    const session = await auth();
    const otherUser = await prisma.user.findUnique({
      where: { id },
    });
    if (!otherUser) {
      throw new Error("User not found");
    }
    if (otherUser.id === session?.user?.id) return true;
    const existingFollow = await prisma.follow.findFirst({
      where: {
        followerId: session?.user?.id,
        followingId: otherUser.id,
      },
    });
    return !!existingFollow;
  } catch {
    return false;
  }
};

export const followUser = async (id: string) => {
  const session = await auth();
  const otherUser = await prisma.user.findUnique({
    where: { id },
  });
  if (!otherUser) throw new Error("USEr not found");
  if (otherUser.id === session?.user?.id)
    throw new Error("Cannt follow yourself");
  const existingFollow = await prisma.follow.findFirst({
    where: {
      followerId: session?.user?.id,
      followingId: otherUser.id,
    },
  });
  if (existingFollow) throw new Error("Already folllowing");
  const follow = await prisma.follow.create({
    data: {
      followerId: session?.user?.id as string,
      followingId: otherUser.id,
    },
    include: {
      following: true,
      follower: true,
    },
  });
  return follow;
};

export const unfollowUser = async (id: string) => {
  const session = await auth();
  const otherUser = await prisma.user.findUnique({
    where: { id },
  });
  if (!otherUser) throw new Error("USEr not found");
  if (otherUser.id === session?.user?.id)
    throw new Error("Cannt follow yourself");
  const existingFollow = await prisma.follow.findFirst({
    where: {
      followerId: session?.user?.id,
      followingId: otherUser.id,
    },
  });
  if (!existingFollow) throw new Error("Not folllowing");
  const follow = await prisma.follow.delete({
    where: {
      id: existingFollow.id,
    },
    include: {
      following: true,
    },
  });
  return follow;
};
