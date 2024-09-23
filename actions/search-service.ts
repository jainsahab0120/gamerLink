//@ts-nocheck
import prisma from "@/db";
import { getSelf } from "./auth-service";

export const getSearch = async (term?: string) => {
  const userId = await getSelf();
  let streams: any = [];
  if (userId) {
    streams = await prisma.stream.findMany({
      where: {
        user: {
          NOT: {
            blocking: {
              some: {
                blockedId: userId,
              },
            },
          },
        },
        OR: [
          {
            name: {
              contains: term,
            },
          },
          {
            user: {
              username: {
                contains: term,
              },
            },
          },
        ],
      },
      include: {
        user: true,
      },
      orderBy: [
        {
          isLive: "desc",
        },
        {
          updatedAt: "desc",
        },
      ],
    });
  }
  return streams;
};
