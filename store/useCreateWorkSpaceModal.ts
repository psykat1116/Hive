import { create } from "zustand";

interface CreateWorkSpaceStore {
  isOpen: boolean;
  openModal: () => void;
  closeModal: () => void;
}

export const useCreateWorkSpaceModal = create<CreateWorkSpaceStore>((set) => ({
  isOpen: false,
  openModal: () => set({ isOpen: true }),
  closeModal: () => set({ isOpen: false }),
}));
