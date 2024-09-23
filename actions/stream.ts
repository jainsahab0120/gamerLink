// @ts-nocheck
"use server";

import { revalidatePath } from "next/cache";
import prisma from "@/db";
import { auth } from "@/lib/auth";

export const updateStream = async (values: any) => {
  try {
    const session = await auth();

    const self = session.user;
    const selfStream = await prisma.stream.findUnique({
      where: {
        userId: self.id,
      },
    });
    if (!selfStream) throw new Error("Stream not found");
    const validData = {
      thumbnailUrl: values.thumbnailUrl,
      name: values.name,
      isChatEnabled: values.isChatEnabled,
      isChatFollowersOnly: values.isChatFollowersOnly,
      isChatDelayed: values.isChatDelayed,
    };
    const stream = await prisma.stream.update({
      where: {
        id: selfStream.id,
      },
      data: {
        ...validData,
      },
    });
    revalidatePath(`/u/${self.username}/chat`);
    revalidatePath(`/u/${self.username}`);
    revalidatePath(`/${self.username}`);
    return stream;
  } catch (error) {
    throw new Error("error");
  }
};
