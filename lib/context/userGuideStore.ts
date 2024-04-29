import { create } from "zustand";
import { userGuideNav, userGuideType } from "../types/zustandTypes";

export const useUserGuideStore = create<userGuideType>((set) => ({
  type: "introduction",
  setType: (newType: userGuideNav) => {
    set(() => ({ type: newType }));
  },
}));
