import { create, StateCreator } from "zustand";
import { ResultType } from "../types/zustandTypes";
import { PersistOptions, createJSONStorage, persist } from "zustand/middleware";

type MyPersist = (
  config: StateCreator<ResultType>,
  options: PersistOptions<ResultType>,
) => StateCreator<ResultType>;

export const useResultStore = create<ResultType>(
  (persist as MyPersist)(
    (set) => ({
      result: "",
      confidence: "",
      setResult: (newResult: string) => {
        set(() => ({ result: newResult }));
      },
      setConfidence: (newConfidence: string) => {
        set(() => ({ confidence: newConfidence }));
      },
    }),
    {
      name: "diagnosed-result-store",
      storage: createJSONStorage(() => sessionStorage),
    },
  ),
);
