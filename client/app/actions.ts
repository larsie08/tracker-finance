"use server";

import { cookies } from "next/headers";
import { AuthService } from "@/services/auth.service";
import { IUser } from "@/types/types";

export const loginAction = async (
  email: string,
  password: string,
): Promise<IUser | undefined> => {
  const data = await AuthService.login({ email, password });

  if (data) {
    (await cookies()).set("token", data.token, {
      httpOnly: true,
      maxAge: 60 * 60 * 24 * 1,
    });

    return data;
  }
};

export const logoutAction = async (): Promise<void> => {
  (await cookies()).delete("token");
};

export const getCookieTokenAction = async (): Promise<string> => {
  return (await cookies()).get("token")?.value || "";
};
