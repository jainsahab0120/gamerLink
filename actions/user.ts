//@ts-nocheck
"use server";

import prisma from "@/db";
import { getSelf } from "./auth-service";
import { revalidatePath } from "next/cache";

export const updateUser = async (values: any) => {
  const self = await getSelf();
  const validData = {
    bio: values.bio,
  };
  const user = await prisma.user.update({
    where: { id: self?.id },
    data: { ...validData },
  });
  revalidatePath(`/${self.username}`);
  revalidatePath(`/u/${self.username}`);
  return user;
};
