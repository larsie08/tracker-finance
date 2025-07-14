import { FC } from "react";

import { transactionsAction, transactionsTotalSumAction } from "../actions";

import TransactionForm from "../components/TransactionForm";
import TransactionTable from "../components/TransactionTable";
import Chart from "../components/Chart";

import { formatToUSD } from "@/utils/currency.helper";
 
const Transactions: FC = async () => {
  const { categories, transactions } = await transactionsAction();
  const { totalExpense, totalIncome } = await transactionsTotalSumAction();

  return (
    <>
      <div className="mt-4 grid grid-cols-3 items-start gap-4">
        {/* Add Transaction Form */}

        <div className="col-span-2 grid">
          <TransactionForm categories={categories} />
        </div>

        {/* Statistic block */}
        <div className="rounded-md bg-slate-800 p-3">
          <div className="grid grid-cols-2 gap-3">
            <div>
              <p className="text-md fond-bold text-center uppercase">
                Total Income:
              </p>
              <p className="mt-2 rounded-sm bg-green-600 p-1 text-center">
                {formatToUSD.format(totalIncome)}
              </p>
            </div>
            <div>
              <p className="text-md fond-bold text-center uppercase">
                Total Expense:
              </p>
              <p className="mt-2 rounded-sm bg-red-500 p-1 text-center">
                {formatToUSD.format(totalExpense)}
              </p>
            </div>
          </div>
          {/* Chart */}
          <Chart totalExpense={totalExpense} totalIncome={totalIncome} />
        </div>
      </div>

      {/* Transactions Table */}
      <h1 className="my-5">
        <TransactionTable transactions={transactions} limit={5} />
      </h1>
    </>
  );
};

export default Transactions;
