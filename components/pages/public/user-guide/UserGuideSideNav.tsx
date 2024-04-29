import { useUserGuideStore } from "@/lib/context/userGuideStore";
import clsx from "clsx";
import React from "react";

const UserGuideSideNav = () => {
  const { type, setType } = useUserGuideStore();
  return (
    <div className="hidden w-[25%] flex-col items-start gap-[16px] border-r border-r-black25 px-[32px] py-[40px] lg:flex ">
      <button
        className={clsx("text-small text-black75 2xl:text-p", {
          "text-main": type === "introduction",
        })}
        onClick={() => {
          setType("introduction");
        }}
      >
        Introduction
      </button>
      <button
        className={clsx("text-small text-black75 2xl:text-p", {
          "text-main": type === "howToUse",
        })}
        onClick={() => {
          setType("howToUse");
        }}
      >
        How to Use
      </button>
      <button
        className={clsx("text-small text-black75 2xl:text-p", {
          "text-main": type === "understandModel",
        })}
        onClick={() => {
          setType("understandModel");
        }}
      >
        Understanding the Model
      </button>
      <button
        className={clsx("text-small text-black75 2xl:text-p", {
          "text-main": type === "keyMetrics",
        })}
        onClick={() => {
          setType("keyMetrics");
        }}
      >
        Key Metrics
      </button>
      <button
        className={clsx("text-small text-black75 2xl:text-p", {
          "text-main": type === "interpretResults",
        })}
        onClick={() => {
          setType("interpretResults");
        }}
      >
        Interpreting Results
      </button>
    </div>
  );
};

export default UserGuideSideNav;
