"use client";
import { atom } from "recoil";

export enum ChatVariant {
  CHAT = "CHAT",
  COMMUNITY = "COMMUNITY",
}

export const toggleChatSidebarState = atom({
  key: "toggleChatSidebarState",
  default: {
    collapsed: true,
    variant: ChatVariant.CHAT,
  },
});
