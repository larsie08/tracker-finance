"use client";
import { FC, useEffect, useState } from "react";

import TransactionTableRow from "./TransactionTableRow";
import { ITransaction } from "@/types/types";
import { transactionsPaginationAction } from "../actions";
import { toast } from "react-toastify";
import ReactPaginate from "react-paginate";

type TransactionTableProps = {
  limit?: number;
  transactions: ITransaction[];
};

const TransactionTable: FC<TransactionTableProps> = ({
  limit = 3,
  transactions,
}) => {
  const [data, setData] = useState<ITransaction[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(
    Math.ceil(transactions.length / limit),
  );

  const fetchTransactions = async (page: number) => {
    try {
      const transactionsData = await transactionsPaginationAction(page, limit);

      setData(transactionsData);
      setTotalPages(Math.ceil(transactions.length / limit));
    } catch (error: any) {
      toast.error(error);
      return console.log("Transactions not found", error);
    }
  };

  const handlePageChange = (selectedItem: { selected: number }) => {
    setCurrentPage(selectedItem.selected + 1);
  };

  useEffect(() => {
    fetchTransactions(currentPage);
  }, [currentPage, transactions]);

  return (
    <>
      <ReactPaginate
        className="mt-4 flex items-center justify-end gap-3"
        activeClassName="bg-blue-600 rounded-md cursor-pointer"
        pageLinkClassName="text-white text-xs py-1 px-2 rounded-sm cursor-pointer"
        previousClassName="text-white py-1 px-2 bg-slate-800 rounded-sm text-xs cursor-pointer"
        nextClassName="text-white py-1 px-2 bg-slate-800 rounded-sm text-xs cursor-pointer"
        disabledClassName="text-white/50 cursor-not-allowed"
        disabledLinkClassName="text-slate-600 cursor-not-allowed"
        pageCount={totalPages}
        pageRangeDisplayed={1}
        marginPagesDisplayed={2}
        onPageChange={handlePageChange}
      />
      <div className="mt-4 rounded-md bg-slate-800 px-4 py-3">
        <table className="w-full">
          <thead>
            <tr>
              <td className="font-bold">№</td>
              <td className="font-bold">Title</td>
              <td className="font-bold">Amount</td>
              <td className="font-bold">Category</td>
              <td className="font-bold">Date</td>
              <td className="text-right">Action</td>
            </tr>
          </thead>
          <tbody>
            {data.map((transaction, idx) => (
              <TransactionTableRow
                key={transaction.id}
                transactionId={transaction.id}
                idx={idx + 1}
                name={transaction.title}
                amount={transaction.amount}
                date={transaction.createdAt}
                type={transaction.type}
                categoryTitle={transaction.category?.title}
              />
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default TransactionTable;
