"use client";

import { FC } from "react";
import { FaTrash } from "react-icons/fa";
import { toast } from "react-toastify";
import { transactionDeleteAction } from "../actions";
import { useRouter } from "next/navigation";

const TransactionTableRowButton: FC<{ transactionId: number }> = ({
  transactionId,
}) => {
  const router = useRouter();

  const handleDeleteTransaction = async () => {
    try {
      await transactionDeleteAction(transactionId);
      toast.success("Transaction was success deleted");
      router.refresh();
    } catch (error: any) {
      console.log(error);
      toast.error(error);
    }
  };

  return (
    <>
      <button
        onClick={handleDeleteTransaction}
        className="ml-auto flex items-center gap-2 rounded-md px-4 py-2 text-white hover:bg-red-800"
      >
        <FaTrash />
      </button>
    </>
  );
};

export default TransactionTableRowButton;
