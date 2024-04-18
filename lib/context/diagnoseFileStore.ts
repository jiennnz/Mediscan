import { StateCreator, create } from "zustand";
import { diagnoseFileType } from "../types/zustandTypes";
import { PersistOptions, createJSONStorage, persist } from "zustand/middleware";

type MyPersist = (
  config: StateCreator<diagnoseFileType>,
  options: PersistOptions<diagnoseFileType>,
) => StateCreator<diagnoseFileType>;

export const useImageUrlStore = create<diagnoseFileType>(
  (persist as MyPersist)(
    (set) => ({
      url: "",
      setUrl: (newUrl: string) => {
        set(() => ({ url: newUrl }));
      },
    }),
    {
      name: "diagnosed-image-store",
      storage: createJSONStorage(() => sessionStorage),
    },
  ),
);
