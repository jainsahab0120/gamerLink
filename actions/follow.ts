"use server";
import { followUser, unfollowUser } from "./follow-service";
import { revalidatePath } from "next/cache";
export const onFollow = async (id: string) => {
  try {
    const followedUser = await followUser(id);

    revalidatePath("/home");
    if (followedUser) revalidatePath(`/${followedUser.following.username}`);
    return followedUser;
  } catch (error) {
    throw new Error("Error");
  }
};

export const onUnfollow = async (id: string) => {
  try {
    const unfollowedUser = await unfollowUser(id);

    revalidatePath("/home");
    if (unfollowedUser) revalidatePath(`/${unfollowedUser.following.username}`);
    return unfollowedUser;
  } catch (error) {
    throw new Error("Error");
  }
};
