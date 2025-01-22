import { create } from "zustand";

export const useSidebarGuest = create((set) => ({
  isOpen: false,

  openSidebar: () => {
    set({ isOpen: true });
  },

  closeSidebar: () => {
    set({ isOpen: false });
  },
}));
