"use client";
import { useRecoilState } from "recoil";
import { toggleSidebarState } from "@/store/toggleSidebar";
import Link from "next/link";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

const FollowedUsers = ({ data }: any) => {
  const [collapsed, setCollapsed] = useRecoilState(toggleSidebarState);
  if (!data.length) return null;

  return (
    <div className="flex px-4 flex-col">
      {!collapsed && (
        <div className="pl-6 mb-4">
          <p className="text-lg text-white">Following</p>
        </div>
      )}
      {data.map((follow: any) => {
        return (
          <div key={follow.id}>
            {!collapsed ? (
              <Link href={`/${follow.following.username}`}>
                <div className="flex gap-4 items-center ">
                  <Avatar>
                    <AvatarImage src={follow.following.imageUrl} />
                    <AvatarFallback>CN</AvatarFallback>
                  </Avatar>
                  <p className="text-white">{follow.following.username}</p>
                </div>
              </Link>
            ) : (
              <Link href={`/${follow.following.username}`}>
                <Avatar>
                  <AvatarImage src={follow.following.imageUrl} />
                  <AvatarFallback>CN</AvatarFallback>
                </Avatar>
              </Link>
            )}
          </div>
        );
      })}
    </div>
  );
};

export default FollowedUsers;
