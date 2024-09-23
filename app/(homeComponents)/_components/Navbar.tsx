//@ts-nocheck
"use client";

import { useState, useEffect } from "react";
import { Moon, Sun, Gamepad2, Search, LayoutDashboard } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import qs from "query-string";
import { useRouter } from "next/navigation";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useRecoilState } from "recoil";
import { toggleState } from "@/store/toggleMode";
import Link from "next/link";
import { useSession } from "next-auth/react";

interface NavbarProps {
  user?: {
    name: string;
    avatar: string;
  };
}

export function Navbar({ user }: NavbarProps) {
  const [darkMode, setDarkMode] = useRecoilState(toggleState);
  const session = useSession();
  const router = useRouter();
  const [value, setValue] = useState("");
  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!value) return;
    const url = qs.stringifyUrl(
      {
        url: "/search",
        query: { term: value },
      },
      { skipEmptyString: true }
    );
    router.push(url);
  };

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [darkMode]);

  return (
    <header className="sticky top-0 z-50 w-full border-b border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 shadow-sm transition-colors duration-300">
      <div className="container flex h-16 items-center">
        <div className="mr-4 hidden md:flex">
          <Link href="/" className="mr-6 flex items-center space-x-2">
            <Gamepad2 className="h-6 w-6 text-purple-600 dark:text-purple-700" />
            <span className="hidden font-bold sm:inline-block text-purple-600 dark:text-purple-700">
              GamerLink
            </span>
          </Link>
        </div>
        <div className="flex flex-1 items-center justify-between space-x-2 md:justify-end">
          <div className="w-full flex-1 md:w-auto md:flex-none">
            <div className="relative">
              <form
                onSubmit={onSubmit}
                className="relative w-full lg:w-[400px] flex items-center"
              >
                <Input
                  type="search"
                  value={value}
                  onChange={(e) => setValue(e.target.value)}
                  placeholder="Search..."
                  className="pl-8 md:w-[300px] lg:w-[400px] bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-gray-100 border-gray-200 dark:border-gray-600 focus:border-indigo-500 dark:focus:border-indigo-400 focus:ring-indigo-500 dark:focus:ring-indigo-400"
                />
                <Button
                  type="submit"
                  size="sm"
                  variant="secondary"
                  className="rounded-l-none"
                >
                  <Search className="absolute left-2 top-2.5 h-4 w-4 text-gray-400 dark:text-gray-500" />
                </Button>
              </form>
            </div>
          </div>
          <nav className="flex items-center">
            <Button
              variant="ghost"
              size="icon"
              className="mr-2 text-gray-700 dark:text-gray-300 hover:text-indigo-600 dark:hover:text-indigo-400"
              asChild
            >
              <Link href={`/u/${session.data?.user.username}`}>
                <LayoutDashboard className="h-5 w-5" />
                <span className="sr-only">Dashboard</span>
              </Link>
            </Button>
            <Button
              variant="ghost"
              size="icon"
              aria-label="Toggle theme"
              className="mr-6 text-gray-700 dark:text-gray-300 hover:text-indigo-600 dark:hover:text-indigo-400"
              onClick={() => setDarkMode(!darkMode)}
            >
              {darkMode ? (
                <Sun className="h-5 w-5" />
              ) : (
                <Moon className="h-5 w-5" />
              )}
            </Button>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="ghost"
                  className="relative h-8 w-8 rounded-full"
                >
                  <Avatar className="h-8 w-8">
                    <AvatarImage src={user?.avatar} alt={user?.name} />
                    <AvatarFallback>
                      {user?.name?.charAt(0) || "G"}
                    </AvatarFallback>
                  </Avatar>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-56" align="end" forceMount>
                <DropdownMenuLabel className="font-normal">
                  <div className="flex flex-col space-y-1">
                    <p className="text-sm font-medium leading-none">
                      {user?.name || "Guest"}
                    </p>
                    <p className="text-xs leading-none text-gray-500 dark:text-gray-400">
                      {user?.name
                        ? "gamer@example.com"
                        : "Sign in to access your account"}
                    </p>
                  </div>
                </DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem>Profile</DropdownMenuItem>
                <DropdownMenuItem>Settings</DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem>
                  {user?.name ? "Sign out" : "Sign in"}
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </nav>
        </div>
      </div>
    </header>
  );
}
