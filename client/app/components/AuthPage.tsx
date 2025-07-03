"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";

import { AuthService } from "@/services/auth.service";
import { useAuthStore } from "@/store/authStore";

import { toast } from "react-toastify";
import { loginAction } from "../actions";

const inputClassName =
  "rounded-md bg-tertiaryColor p-2 text-white shadow-md placeholder:text-white";

const AuthPage = () => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [isLogin, setIsLogin] = useState<boolean>(false);

  const login = useAuthStore((state) => state.login);
  const router = useRouter();

  const registrationHandler = async (e: React.FormEvent<HTMLFormElement>) => {
    try {
      e.preventDefault();
      const data = await AuthService.registration({ email, password });

      if (data) {
        toast.success("Account has been created");
        setIsLogin(!isLogin);
      }
    } catch (err: any) {
      const error = err.response?.data.message;
      toast.error(error.toString());
    }
  };

  const loginHandler = async (e: React.FormEvent<HTMLFormElement>) => {
    try {
      e.preventDefault();
      const data = await loginAction(email, password);

      if (data) {
        login(data);
        toast.success("You logged in");
        router.push("/");
      }
    } catch (err: any) {
      const error = err.response?.data.message;
      toast.error(error.toString());
    }
  };

  return (
    <>
      <h1 className="mb-10 text-center text-xl">
        {isLogin ? "Login" : "Registration"}
      </h1>

      <form
        onSubmit={isLogin ? loginHandler : registrationHandler}
        className="mx-auto flex w-1/3 flex-col gap-5"
      >
        <input
          type="text"
          className={inputClassName}
          placeholder="Email"
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          className={inputClassName}
          placeholder="Password"
          onChange={(e) => setPassword(e.target.value)}
        />

        <button className="mx-auto flex items-center gap-2 rounded-md bg-green-600 px-4 py-2 text-white hover:bg-green-800">
          Submit
        </button>
      </form>

      <div className="mt-5 flex justify-center">
        {isLogin ? (
          <button
            onClick={() => setIsLogin(!isLogin)}
            className="text-slate-300 hover:text-white"
          >
            You don't have an account?
          </button>
        ) : (
          <button
            onClick={() => setIsLogin(!isLogin)}
            className="text-slate-300 hover:text-white"
          >
            Already have an account?
          </button>
        )}
      </div>
    </>
  );
};

export default AuthPage;
