"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";

import { AuthService } from "@/services/auth.service";
import { useAuthStore } from "@/store/authStore";

import { toast } from "react-toastify";
import { loginAction } from "../actions";
import { SubmitHandler, useForm } from "react-hook-form";

const inputClassName =
  "rounded-md bg-tertiaryColor p-2 text-white shadow-md placeholder:text-white";

type AuthFormData = {
  email: string;
  password: string;
};

const AuthForm = () => {
  const { register, handleSubmit } = useForm<AuthFormData>();
  const [isLogin, setIsLogin] = useState<boolean>(false);

  const login = useAuthStore((state) => state.login);
  const router = useRouter();

  const registrationHandler: SubmitHandler<AuthFormData> = async (
    formData,
  ): Promise<void> => {
    try {
      const responseData = await AuthService.registration(formData);

      if (responseData) {
        toast.success("Account has been created");
        setIsLogin(!isLogin);
      }
    } catch (err: any) {
      console.log(err);
      toast.error(err);
    }
  };

  const loginHandler: SubmitHandler<AuthFormData> = async (formData) => {
    try {
      const responseData = await loginAction(formData.email, formData.password);

      if (responseData) {
        login(responseData);
        toast.success("You logged in");
        router.push("/transactions");
      }
    } catch (err: any) {
      console.log(err);
      toast.error(err);
    }
  };

  return (
    <>
      <h1 className="mb-10 text-center text-xl">
        {isLogin ? "Login" : "Registration"}
      </h1>

      <form
        onSubmit={handleSubmit(isLogin ? loginHandler : registrationHandler)}
        className="mx-auto flex w-1/3 flex-col gap-5"
      >
        <input
          type="text"
          className={inputClassName}
          placeholder="Email"
          {...register("email", { required: true })}
        />
        <input
          type="password"
          className={inputClassName}
          placeholder="Password"
          {...register("password", { required: true })}
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

export default AuthForm;
