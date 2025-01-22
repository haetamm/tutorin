import { create } from "zustand";

export const useModalStore = create((set) => ({
  isOpen: false,
  content: "",
  confirmLabel: "",
  type: "",

  openModal: (content, confirmLabel, type) => {
    set({ content, confirmLabel, type, isOpen: true });
  },

  closeModal: () => {
    set({ isOpen: false, confirmLabel: "", type: "", content: "" });
  },
}));
