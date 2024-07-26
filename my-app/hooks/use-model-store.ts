"use client"

import { Server } from "@prisma/client";
import { create } from "zustand";

export type ModalType = "createServer" | "Invite" | "editServer" | "members";


interface ModalData{
  server?:Server,

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
