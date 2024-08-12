"use client"

import { Channel, ChannelTypes, Server } from "@prisma/client";
import { create } from "zustand";

export type ModalType = "createServer" | "Invite" | "editServer" | "members" | "createChannel" | "LeaveServer" | "DeleteServer" | "deleteChannel";


interface ModalData{
  server?:Server,
  channel ?:Channel
  channelType?:ChannelTypes
}

interface ModalStore {
  type: ModalType | null;
  isOpen: boolean;
  data: ModalData | null;
  onOpen: (type: ModalType,data?:ModalData) => void;
  onClose: () => void;
}
// we are sending data bcz we want to show some server info in Invite modal
export const useModal = create<ModalStore>((set) => ({
  type: null,
  data:{},
  isOpen: false,
  onOpen: (type,data={}) => set({ isOpen: true, type ,data}),
  onClose: () => set({ isOpen: false, type: null })
}));
