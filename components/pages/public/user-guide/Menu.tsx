import { useUserGuideStore } from "@/lib/context/userGuideStore";
import clsx from "clsx";
import React, { Dispatch, SetStateAction } from "react";

type menuType = {
  toggle: boolean;
  setToggle: Dispatch<SetStateAction<boolean>>;
};

const Menu = ({ toggle, setToggle }: menuType) => {
  const { type, setType } = useUserGuideStore();
  return (
    <div className="fixed bottom-[88px] right-[24px] flex h-fit w-[200px] flex-col items-start gap-[8px] rounded-2xl border border-black10 bg-white p-[8px]">
      <button
        className={clsx("text-small text-black", {
          "text-main": type === "introduction",
        })}
        onClick={() => {
          setToggle(!toggle);
          setType("introduction");
        }}
      >
        Introduction
      </button>
      <button
        className={clsx("text-small text-black", {
          "text-main": type === "howToUse",
        })}
        onClick={() => {
          setToggle(!toggle);
          setType("howToUse");
        }}
      >
        How to Use
      </button>
      <button
        className={clsx("text-small text-black", {
          "text-main": type === "understandModel",
        })}
        onClick={() => {
          setToggle(!toggle);
          setType("understandModel");
        }}
      >
        Understanding the Model
      </button>
      <button
        className={clsx("text-small text-black", {
          "text-main": type === "keyMetrics",
        })}
        onClick={() => {
          setToggle(!toggle);
          setType("keyMetrics");
        }}
      >
        Key Metrics
      </button>
      <button
        className={clsx("text-small text-black", {
          "text-main": type === "interpretResults",
        })}
        onClick={() => {
          setToggle(!toggle);
          setType("interpretResults");
        }}
      >
        Interpreting Results
      </button>
    </div>
  );
};

export default Menu;
