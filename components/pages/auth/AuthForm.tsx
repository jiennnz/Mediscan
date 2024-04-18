"use client";

import { useAuthFormStore } from "@/lib/context/authFormStore";
import Login from "./Login";
import Register from "./Register";

const AuthForm = () => {
  const { formType, setFormType } = useAuthFormStore();

  return (
    <>
      {formType === "Login" && (
        <>
          <Login />
          <footer className="flex flex-row justify-center">
            <h6>Don&apos;t have an account</h6>
            &nbsp;
            <button
              onClick={() => {
                setFormType("Register");
              }}
              className=" text-[#007ACC] hover:underline"
            >
              Create One
            </button>
          </footer>
        </>
      )}
      {formType === "Register" && (
        <>
          <Register />

          <footer className="flex flex-row justify-center">
            <h6>Already have an account?</h6>
            &nbsp;
            <button
              onClick={() => {
                setFormType("Login");
              }}
              className="text-[#007ACC]  hover:underline"
            >
              Log in Instead
            </button>
          </footer>
        </>
      )}
    </>
  );
};

export default AuthForm;
