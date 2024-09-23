import prisma from "@/db";

export const getStreamByUserId = async (userId: string) => {
  const stream = await prisma.stream.findUnique({
    where: { userId: userId },
  });
  return stream;
};
