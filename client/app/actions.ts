"use server";
import { cookies } from "next/headers";

import { instance } from "@/api/axios.api";
import { AuthService } from "@/services/auth.service";
import {
  ICategory,
  ITransaction,
  ITransactionFormData,
  IUser,
} from "@/types/types";

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

export const transactionsAction = async (): Promise<{
  categories: ICategory[];
  transactions: ITransaction[];
}> => {
  const token = await getCookieTokenAction();

  const categories = await instance(token).get<ICategory[]>("/categories");
  const transactions =
    await instance(token).get<ITransaction[]>("/transactions");

  const data = {
    categories: categories.data,
    transactions: transactions.data,
  };

  return data;
};

export const transactionSubmitAction = async (
  transaction: ITransactionFormData,
): Promise<void> => {
  const token = await getCookieTokenAction();

  await instance(token).post("/transactions", transaction);
};

export const transactionDeleteAction = async (
  transactionId: number,
): Promise<void> => {
  const token = await getCookieTokenAction();

  await instance(token).delete(`/transactions/transaction/${transactionId}`);
};

export const transactionsPaginationAction = async (
  page: number,
  limit: number,
): Promise<ITransaction[]> => {
  const token = await getCookieTokenAction();

  const { data } = await instance(token).get<ITransaction[]>(
    `/transactions/pagination?page=${page}&limit=${limit}`,
  );

  return data;
};

export const transactionsTotalSumAction = async (): Promise<{
  totalIncome: number;
  totalExpense: number;
}> => {
  const token = await getCookieTokenAction();

  const { data: totalIncome } = await instance(token).get<number>(
    "/transactions/income/find",
  );
  const { data: totalExpense } = await instance(token).get<number>(
    "/transactions/expense/find",
  );

  const data = {
    totalIncome,
    totalExpense,
  };

  return data;
};
