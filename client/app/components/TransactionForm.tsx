"use client";

import { ICategory } from "@/types/types";
import { FC, useState } from "react";
import { FaPlus } from "react-icons/fa";
import CategoryModal from "./CategoryModal";
import { SubmitHandler, useForm } from "react-hook-form";
import { transactionSubmitAction } from "../actions";
import { toast } from "react-toastify";

type TransactionFormData = {
  title: string;
  amount: number;
  categoryId: string;
  type: "income" | "expense";
};

const TransactionForm: FC<{ categories: ICategory[] }> = ({ categories }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<TransactionFormData>();

  const onSubmit: SubmitHandler<TransactionFormData> = async (data) => {
    const transaction = {
      title: data.title,
      amount: +data.amount,
      category: data.categoryId,
      type: data.type,
    };

    try {
      await transactionSubmitAction(transaction);
      toast.success("Transaction added");
    } catch (error) {
      console.log(error);
      toast.error("Transaction not added");
    }
  };

  const [visibleModal, setVisibleModal] = useState(false);
  return (
    <div className="rounded-md bg-slate-800 p-4">
      <form className="grid gap-2" onSubmit={handleSubmit(onSubmit)}>
        <label className="grid gap-1" htmlFor="title">
          <span>Title</span>
          <input
            type="text"
            className="rounded-md border-none bg-[#EEEEEE] p-2 text-black shadow-md outline-none placeholder:text-black"
            placeholder="Title..."
            {...register("title", { required: true })}
          />
        </label>
        <label className="grid gap-1" htmlFor="amount">
          <span>Amount</span>
          <input
            type="number"
            className="rounded-md border-none bg-[#EEEEEE] p-2 text-black shadow-md outline-none placeholder:text-black"
            placeholder="Amount..."
            {...register("amount", { required: true })}
          />
        </label>

        {/* Select */}
        {categories.length ? (
          <label htmlFor="category" className="grid gap-1">
            <span>Category</span>
            <select
              className="rounded-md border-none bg-[#EEEEEE] p-2 text-black shadow-md outline-none placeholder:text-black"
              {...register("categoryId", { required: true })}
            >
              {categories.map((category) => (
                <option
                  key={category.id}
                  value={category.id}
                  className="text-black placeholder:text-black"
                >
                  {category.title}
                </option>
              ))}
            </select>
          </label>
        ) : (
          <h1 className="mt-1 text-red-300">
            To continue create a category first
          </h1>
        )}

        {/* Add Transaction */}

        <button
          onClick={() => setVisibleModal(true)}
          className="flex max-w-fit items-center gap-2 text-white/50 hover:text-white"
        >
          <FaPlus />
          <span>Manage Categories</span>
        </button>

        {/* Radio Buttons */}
        <div className="flex items-center gap-4">
          <label className="flex cursor-pointer items-center gap-2">
            <input
              type="radio"
              value="income"
              className="form-radio text-blue-600"
              {...register("type")}
            />
            <span>Income</span>
          </label>
          <label className="flex cursor-pointer items-center gap-2">
            <input
              type="radio"
              value="expense"
              className="form-radio text-blue-600"
              {...register("type")}
            />
            <span>Expense</span>
          </label>
        </div>

        {/* Submit button */}
        <button
          type="submit"
          className="mt-2 flex max-w-fit items-center gap-2 rounded-md bg-green-600 px-4 py-2 text-white hover:bg-green-800 disabled:cursor-not-allowed disabled:bg-gray-400 disabled:hover:bg-gray-400"
        >
          Submit
        </button>
      </form>

      {visibleModal && (
        <CategoryModal
          type="post"
          setVisibleModal={setVisibleModal}
          closeModal={() => setVisibleModal(false)}
          id={null}
        />
      )}
    </div>
  );
};

export default TransactionForm;
