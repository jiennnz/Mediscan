import { create } from "zustand";
import { authFormType, formType } from "../types/zustandTypes";

export const useAuthFormStore = create<authFormType>((set) => ({
  formType: "Login",
  setFormType: (newFormType: formType) => {
    set(() => ({ formType: newFormType }));
  },
}));
