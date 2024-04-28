import React from "react";
import CustomLink from "../common/CustomLink";
import Profile from "./Profile";
import AuthLinks from "./AuthLinks";
import { getSession } from "@/lib/server/auth";
import MobileDrawer from "./MobileDrawer";
import MobileDrawerProfile from "./MobileDrawerProfile";
import HistoryModal from "./HistoryModal";
import Link from "next/link";

const Navbar = async () => {
  const session = await getSession();
  const avatar = session?.sessionData?.avatarLink as string;
  console.log(session);

  return (
    <div className="sticky z-50 flex h-full items-center justify-between px-[64px]">
      {/* Logo */}
      <div>
        <CustomLink
          text="MediScan"
          href="/"
          className="text-h5 font-black text-main"
        />
      </div>
      {/* Navigation */}
      <div className="hidden items-center md:flex md:gap-[32px] lg:gap-[64px]">
        <CustomLink
          text="Tools"
          href="/"
          className="text underline-custom font-bold "
        />
        <CustomLink
          text="Analytics"
          href="/analytics"
          className="text font-bold"
          target="_blank"
        />
        <CustomLink
          text="User Guide"
          href="/user-guide"
          className="text font-bold "
          target="_blank"
        />
      </div>
      {/* Auth */}
      <div className="hidden md:flex md:items-center md:gap-[16px]">
        {session ? <Profile /> : <AuthLinks />}
      </div>
      {/* Mobile */}
      <div className="block md:hidden">
        {session ? <MobileDrawerProfile avatar={avatar} /> : <MobileDrawer />}
      </div>
      <HistoryModal />
    </div>
  );
};

export default Navbar;
