"use client";

import { useToggleTableStore } from "@/lib/context/toggleTable";

const HistoryButton = () => {
  const setToggle = useToggleTableStore((state) => state.setToggle);
  return (
    <button
      onClick={() => setToggle(true)}
      className="hover:anim-bg-gradient text"
    >
      History
    </button>
  );
};

export default HistoryButton;
