import Input from "@/components/common/Input";
import {
  LoginSchemaType,
  loginSchemaZod,
} from "@/lib/types/authValidationSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import axios from "axios";
import { useRouter } from "next/navigation";
import React from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import toast from "react-hot-toast";

const Login = () => {
  const router = useRouter();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<LoginSchemaType>({ resolver: zodResolver(loginSchemaZod) });

  const onSubmit: SubmitHandler<LoginSchemaType> = async (
    data: LoginSchemaType,
  ) => {
    // Check if there is data in sessionStorage
    const diagnosisData = sessionStorage.getItem("diagnosis");
    const diagnosisObj = diagnosisData ? JSON.parse(diagnosisData) : {};

    // Create the combined data object
    const combinedData = {
      user: {
        username: data.username,
        password: data.password,
      },
      diagnosis: diagnosisObj,
    };

    const promise = axios.post("/api/auth/login", combinedData);

    toast.promise(promise, {
      loading: "Logging you in...",
      success: "Hello User!",
      error: (error) => {
        console.log("Login Error:", error);
        const errorMessage = error.response?.data?.error || "Failed to Login!";
        reset();
        console.log(errorMessage);
        return errorMessage;
      },
    });

    const response = await promise;
    console.log(response);
    if (response.data?.success) {
      sessionStorage.removeItem("diagnosis");
      window.location.href = "/";
    }
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="flex flex-col items-start gap-[20px] sm:gap-[16px]"
    >
      <Input
        type="text"
        id="username"
        placeholder="Username"
        register={register}
        errors={errors}
        className="h-[45px] w-[350px] px-[16px] hover:border hover:border-main sm:h-[45px] sm:w-[300px]"
      />
      <Input
        type="password"
        id="password"
        placeholder="Password"
        register={register}
        errors={errors}
        className="h-[45px] w-[350px] px-[16px] hover:border hover:border-main sm:h-[45px] sm:w-[300px]"
      />

      <button
        type="button"
        className="my-[4px] text-small text-main hover:underline"
      >
        Forgot Password?
      </button>

      <button
        type="submit"
        disabled={isSubmitting}
        className="anim-bg-gradient flex h-[50px] w-[350px] items-center justify-center gap-[8px] rounded-[5px] bg-gradient text-center  text-p font-semibold text-white disabled:pointer-events-none disabled:opacity-70 sm:h-[45px] sm:w-full"
      >
        {isSubmitting ? (
          <>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="25"
              height="25"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
              className="lucide lucide-loader-circle animate-spin text-center text-inherit"
            >
              <path d="M21 12a9 9 0 1 1-6.219-8.56" />
            </svg>
            <p className="text-inherit">Logging in</p>
          </>
        ) : (
          "Login"
        )}
      </button>
    </form>
  );
};

export default Login;
