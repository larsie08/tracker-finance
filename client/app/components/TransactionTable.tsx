import { FC } from "react";

import { transactionAction } from "../actions";

import TransactionTableRow from "./TransactionTableRow";

const TransactionTable: FC = async () => {
  const { transactions } = await transactionAction();
  return (
    <>
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
            {transactions.map((transaction, idx) => (
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
