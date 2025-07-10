import { FC } from "react";

import { formatDate } from "@/utils/date.helper";

import { formatToUSD } from "@/utils/currency.helper";
import TransactionTableRowButton from "./TransactionTableRowButton";

type TransactionTableRowProps = {
  transactionId: number;
  idx: number;
  name: string;
  amount: number;
  date: string;
  categoryTitle?: string;
  type: "income" | "expense";
};

const TransactionTableRow: FC<TransactionTableRowProps> = ({
  idx,
  transactionId,
  name,
  amount,
  date,
  categoryTitle,
  type,
}) => {
  return (
    <>
      <tr>
        <td>{idx}</td>
        <td>{name}</td>
        <td className={type === "income" ? "text-green-500" : "text-red-500"}>
          {type === "income"
            ? `+ ${formatToUSD.format(amount)}`
            : `- ${formatToUSD.format(amount)}`}
        </td>
        <td>{categoryTitle || "Other"}</td>
        <td>{formatDate(date)}</td>
        <td>
          <TransactionTableRowButton transactionId={transactionId} />
        </td>
      </tr>
    </>
  );
};

export default TransactionTableRow;
