import { create } from "zustand";

import { IUser } from "@/types/types";

interface IUserState {
  user: IUser | null;
  isAuth: boolean;

  login: (user: IUser) => void;
  logout: () => void;
}

export const useAuthStore = create<IUserState>((set) => ({
  user: null,
  isAuth: false,

  login: (user: IUser) => {
    set({
      user: user,
      isAuth: true,
    });
  },
  logout: () => {
    set({ user: null, isAuth: false });
  },
}));
