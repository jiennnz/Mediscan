import CustomLink from "@/components/common/CustomLink";
import AuthForm from "@/components/pages/auth/AuthForm";
import React from "react";

const Page = () => {
  return (
    <section className="flex h-full w-full items-center justify-center">
      <div className="flex flex-col gap-[32px] sm:rounded-[20px] sm:bg-white sm:p-[56px] sm:shadow-card">
        <CustomLink
          text="MediScan"
          href="/"
          className="text-main text-center text-h3 font-semibold"
        />
        <AuthForm />
      </div>
    </section>
  );
};

export default Page;
