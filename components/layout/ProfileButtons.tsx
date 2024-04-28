"use client";

import axios from "axios";
import { useRouter } from "next/navigation";
import React from "react";
import toast from "react-hot-toast";

const ProfileButtons = () => {
  const router = useRouter();

  const logout = async () => {
    const promise = axios.get("/api/auth/logout");

    await toast.promise(promise, {
      loading: "Bye!",
      success: "See you again :(",
      error: (error) => {
        console.log("Logout Error:", error);
        const errorMessage = error.response?.data?.error || "Failed to Logout";
        return errorMessage;
      },
    });

    try {
      const response = await promise;
      console.log(response);
      if (response.data?.success) {
        router.refresh();
      }
    } catch (error) {
      console.log("Error:", error);
      toast.error("Something Went Wrong!");
    }
  };
  return (
    <div className="invisible absolute right-0 top-[43px] w-[150px] overflow-hidden rounded-xl bg-white opacity-0 shadow-md transition-opacity duration-300 group-hover:visible group-hover:opacity-100">
      <button className="flex w-full bg-gradient bg-clip-text pb-[8px] pl-[16px] pt-[16px] text-start text-small font-semibold text-black75 transition duration-500 ease-in-out hover:text-transparent">
        Profile
      </button>
      <button
        onClick={logout}
        className="flex w-full bg-gradient bg-clip-text pb-[16px] pl-[16px] pt-[8px] text-start text-small font-semibold text-black75 transition duration-500 ease-in-out hover:text-transparent"
      >
        Log out
      </button>
    </div>
  );
};

export default ProfileButtons;
