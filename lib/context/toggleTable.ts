import { create } from "zustand";
import { toggleTableType } from "../types/zustandTypes";

export const useToggleTableStore = create<toggleTableType>((set) => ({
  toggle: false,
  setToggle: (newToggle: boolean) => {
    set((state) => ({ toggle: newToggle }));
  },
}));
