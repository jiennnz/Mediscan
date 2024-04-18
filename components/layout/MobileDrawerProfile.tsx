"use client";
import Image from "next/image";
import React, { useState } from "react";
import HistoryButton from "./HistoryButton";
import CustomLink from "../common/CustomLink";
import { X } from "lucide-react";

type MobileDrawerProfileProps = {
  avatar: string;
};

const MobileDrawerProfile = ({ avatar }: MobileDrawerProfileProps) => {
  const [toggleMenu, setToggleMenu] = useState(false);

  const logout = async () => {
    console.log("logout");
    setToggleMenu(!toggleMenu);
  };

  return (
    <div className="flex items-center gap-[16px]">
      <HistoryButton />
      <Image
        src={avatar || "/avatar.jpg"}
        alt="Avatar"
        width={40}
        height={40}
        className="cursor-pointer rounded-[25px] border-[1px] border-black50"
        onClick={() => {
          setToggleMenu(!toggleMenu);
        }}
      />
      {toggleMenu && (
        <div className="fixed inset-0 z-50 flex bg-main">
          <X
            width={32}
            height={32}
            className="absolute right-9 top-9 cursor-pointer bg-white stroke-main"
            onClick={() => setToggleMenu(false)}
          />
          <div className="flex w-full flex-col items-center gap-[20px] pt-[88px]">
            <hr className="h-[2px] w-[90%] border-none bg-white opacity-30" />
            <div className="w-[90%]">
              <CustomLink
                text="Tools"
                href="/"
                className="text-[24px] font-semibold uppercase text-white"
                onClick={() => setToggleMenu(!toggleMenu)}
              />
            </div>
            <hr className="h-[2px] w-[90%] border-none bg-white opacity-30" />
            <div className="w-[90%]">
              <CustomLink
                text="Analytics"
                href="/analytics"
                className="text-[24px] font-semibold uppercase text-white"
                onClick={() => setToggleMenu(!toggleMenu)}
              />
            </div>
            <hr className="h-[2px] w-[90%] border-none bg-white opacity-30" />
            <div className="w-[90%]">
              <CustomLink
                text="User Guide"
                href="/user-guide"
                className="text-[24px] font-semibold uppercase text-white"
                onClick={() => setToggleMenu(!toggleMenu)}
              />
            </div>
            <hr className="h-[2px] w-[90%] border-none bg-white opacity-30" />
            <div className="w-[90%]">
              <button
                onClick={logout}
                className="text-[24px] font-semibold uppercase text-white"
              >
                Logout
              </button>
            </div>
            <hr className="h-[2px] w-[90%] border-none bg-white opacity-30" />
          </div>
        </div>
      )}
    </div>
  );
};

export default MobileDrawerProfile;
