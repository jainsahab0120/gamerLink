"use server";

import prisma from "@/db";
import { auth } from "../lib/auth";

export default async function fetch() {
  const session = await auth();
  const selfId = session?.user?.id as any;
  const recommendedUsers = await prisma.user.findMany({
    where: {
      AND: [
        {
          NOT: {
            id: selfId,
          },
        },
        {
          NOT: {
            followedBy: {
              some: {
                followerId: selfId,
              },
            },
          },
        },
        {
          NOT: {
            blocking: {
              some: {
                blockedId: selfId,
              },
            },
          },
        },
      ],
    },
    include: {
      stream: {
        select: {
          isLive: true,
        },
      },
    },
    orderBy: {
      createdAt: "desc",
    },
  });
  return recommendedUsers;
}
