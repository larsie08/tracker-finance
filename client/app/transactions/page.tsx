import { FC } from "react";

import { transactionAction } from "../actions";

import TransactionForm from "../components/TransactionForm";
import TransactionTable from "../components/TransactionTable";

const Transactions: FC = async () => {
  const { categories } = await transactionAction();

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
                1000$
              </p>
            </div>
            <div>
              <p className="text-md fond-bold text-center uppercase">
                Total Expense:
              </p>
              <p className="mt-2 rounded-sm bg-red-500 p-1 text-center">
                1000$
              </p>
            </div>
          </div>
          {/* Chart */}
        </div>
      </div>

      {/* Transactions Table */}
      <h1 className="my-5">
        <TransactionTable />
      </h1>
    </>
  );
};

export default Transactions;
