"use client";
import { useRecoilState } from "recoil";
import { toggleSidebarState } from "@/store/toggleSidebar";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

export default function RecommendedUsers(props: any) {
  const [collapsed, setCollapsed] = useRecoilState(toggleSidebarState);

  return (
    <div className="flex flex-col gap-1  px-4">
      {props.users.length > 0 && !collapsed && <div>Recommended Users</div>}

      {props.users.map((user: any) => {
        return (
          <div key={user.id}>
            {!collapsed ? (
              <Link href={`/${user.username}`}>
                <div className="flex gap-4 items-center ">
                  <Avatar>
                    <AvatarImage src={user.imageUrl} />
                    <AvatarFallback>CN</AvatarFallback>
                  </Avatar>
                  <p className="text-white">{user.username}</p>
                  {user.stream.isLive && (
                    <div className="bg-red-400 w-14 text-center rounded-full ml-10">
                      LIVE
                    </div>
                  )}
                </div>
              </Link>
            ) : (
              <Link href={`/${user.username}`}>
                <Avatar>
                  <AvatarImage src={user.imageUrl} />
                  <AvatarFallback>CN</AvatarFallback>
                </Avatar>
              </Link>
            )}
          </div>
        );
      })}
    </div>
  );
}
