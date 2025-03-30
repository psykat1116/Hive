import { create } from "zustand";

interface CreateChannelStore {
  isOpen: boolean;
  openModal: () => void;
  closeModal: () => void;
}

export const useCreateChannelModal = create<CreateChannelStore>((set) => ({
  isOpen: false,
  openModal: () => set({ isOpen: true }),
  closeModal: () => set({ isOpen: false }),
}));
