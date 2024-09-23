"use client";
import { atom } from "recoil";

export const toggleSidebarState = atom({
  key: "toggleSidebarState",
  default: true,
});
