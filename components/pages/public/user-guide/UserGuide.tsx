"use client";

import { useUserGuideStore } from "@/lib/context/userGuideStore";
import { CircleEllipsis } from "lucide-react";
import { useState } from "react";
import Introduction from "./Introduction";
import HowToUse from "./HowToUse";
import UnderstandModel from "./UnderstandModel";
import KeyMetrics from "./KeyMetrics";
import InterpretResults from "./InterpretResults";
import Menu from "./Menu";
import UserGuideSideNav from "./UserGuideSideNav";

const UserGuide = () => {
  const [toggle, setToggle] = useState(false);
  const type = useUserGuideStore((state) => state.type);
  return (
    <div className="relative flex h-full w-full flex-col gap-[16px] lg:flex-row lg:justify-center">
      <button
        onClick={() => setToggle(!toggle)}
        className="fixed bottom-[32px] right-[24px] lg:hidden"
      >
        <CircleEllipsis className="h-[50px] w-[50px] stroke-main hover:opacity-80" />
      </button>

      <UserGuideSideNav />
      {toggle && <Menu toggle={toggle} setToggle={setToggle} />}
      {type === "introduction" ? (
        <Introduction />
      ) : type === "howToUse" ? (
        <HowToUse />
      ) : type === "understandModel" ? (
        <UnderstandModel />
      ) : type === "keyMetrics" ? (
        <KeyMetrics />
      ) : type === "interpretResults" ? (
        <InterpretResults />
      ) : (
        ""
      )}
    </div>
  );
};

export default UserGuide;
