"use client";

import { useToggleTableStore } from "@/lib/context/toggleTable";
import { Suspense } from "react";
import Table from "./Table";
import { X } from "lucide-react";

const HistoryModal = () => {
  const toggle = useToggleTableStore((state) => state.toggle);

  return (
    toggle && (
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-gray-800 bg-opacity-50">
        <div className="relative z-50 h-[70%] w-[90%] rounded-lg bg-white p-6 shadow-lg xl:w-[80%] 2xl:w-[60%] ">
          <button
            onClick={() => useToggleTableStore.setState({ toggle: false })}
            className="absolute -right-4 -top-4"
          >
            <X
              width={45}
              height={45}
              className="rounded-full bg-red-400 stroke-white p-[8px] transition hover:bg-error"
            />
          </button>
          {/*Le table */}
          <div className="h-full w-full p-[16px]">
            <h1 className="mb-[16px] text-h4 font-semibold text-black">
              History
            </h1>
            <h2 className="mb-[32px] text-h6 font-light text-black75">
              Your recent diagnoses
            </h2>
            <Suspense>
              <Table />
            </Suspense>
          </div>
        </div>
      </div>
    )
  );
};

export default HistoryModal;
