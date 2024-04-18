"use client";

import { Menu, X } from "lucide-react";
import { useState } from "react";
import CustomLink from "../common/CustomLink";
import { useAuthFormStore } from "@/lib/context/authFormStore";

const MobileDrawer = () => {
  const [toggleMenu, setToggleMenu] = useState(false);
  const setFormType = useAuthFormStore((state) => state.setFormType);

  return (
    <div className="">
      <Menu
        width={35}
        height={35}
        className="cursor-pointer stroke-main"
        onClick={() => setToggleMenu(!toggleMenu)}
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
              <CustomLink
                text="Log in"
                href="/auth"
                className="text-[24px] font-semibold uppercase text-white"
                onClick={() => {
                  setFormType("Login");
                }}
              />
            </div>
            <hr className="h-[2px] w-[90%] border-none bg-white opacity-30" />
            <div className="w-[90%]">
              <CustomLink
                text="Sign Up"
                href="/auth"
                className="text-[24px] font-semibold uppercase text-white"
                onClick={() => {
                  setFormType("Register");
                }}
              />
            </div>
            <hr className="h-[2px] w-[90%] border-none bg-white opacity-30" />
          </div>
        </div>
      )}
    </div>
  );
};

export default MobileDrawer;
