"use client";

import { FC, ReactNode, useEffect } from "react";

import { AuthService } from "@/services/auth.service";
import { useAuthStore } from "@/store/authStore";
import { getCookieTokenAction } from "../actions";

const AuthGuard: FC<{ children: ReactNode }> = ({ children }) => {
  const { login, logout } = useAuthStore((state) => state);

  const checkAuth = async () => {
    const token = await getCookieTokenAction();
    try {
      if (token) {
        const data = await AuthService.getProfile(token);

        if (data) {
          const user = { id: data.id, email: data.email, token: token };
          login(user);
        } else logout();
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    checkAuth();
  }, []);

  return <div>{children}</div>;
};

export default AuthGuard;
