import React from "react";
import CustomLink from "../common/CustomLink";
import Profile from "./Profile";
import AuthLinks from "./AuthLinks";
import { getSession } from "@/lib/server/auth";
import MobileDrawer from "./MobileDrawer";
import MobileDrawerProfile from "./MobileDrawerProfile";
import HistoryModal from "./HistoryModal";

const Navbar = async () => {
  const session = await getSession();
  const avatar = session?.sessionData?.avatarLink as string;
  console.log(session);

  return (
    <section className=" flex h-full items-center justify-between px-[64px]">
      {/* Logo */}
      <div>
        <CustomLink
          text="MediScan"
          href="/"
          className="text-h5 font-black text-black"
        />
      </div>
      {/* Navigation */}
      <div className="hidden md:flex md:gap-[32px] lg:gap-[64px]">
        <CustomLink text="Tools" href="/" className="text font-bold" />
        <CustomLink
          text="Analytics"
          href="/analytics"
          className="text font-bold"
        />
        <CustomLink
          text="User Guide"
          href="/user-guide"
          className="text font-bold"
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
    </section>
  );
};

export default Navbar;
