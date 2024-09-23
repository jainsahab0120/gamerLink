import prisma from "@/db";
import { auth } from "@/lib/auth";

export const getStreams = async () => {
  const session = await auth();
  let userId = session?.user?.id;
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
