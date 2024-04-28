"use client";

import { useAuthFormStore } from "@/lib/context/authFormStore";
import CustomLink from "@/components/common/CustomLink";
const AuthLinks = () => {
  const setFormType = useAuthFormStore((state) => state.setFormType);
  const formType = useAuthFormStore((state) => state.formType);

  console.log(formType);
  return (
    <>
      <CustomLink
        text="Log in"
        href="/auth"
        className="text"
        onClick={() => {
          setFormType("Login");
        }}
      />
      <div className="h-[30px] w-[1px] bg-black"></div>
      <CustomLink
        text="Sign Up"
        href="/auth"
        onClick={() => {
          setFormType("Register");
        }}
        className="rounded-lg border-[2px] bg-secondary px-[16px] py-[8px] text-small font-bold text-white transition hover:border-secondary hover:bg-white hover:text-black"
      />
    </>
  );
};

export default AuthLinks;
