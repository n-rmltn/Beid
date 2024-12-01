import { useMemo } from "react";
import { Database } from "../types/supabase";

type Transaction = Database["public"]["Tables"]["transactions"]["Row"];

/**
 * Groups an array of transactions by month and year.
 * The transactions are sorted by date in descending order.
 *
 * @param transactions - Array of Transaction objects to be grouped
 * @returns Object with month-year strings as keys and arrays of sorted transactions as values
 *
 * @example
 * // Pre-function input:
 * const transactions = [
 *   {
 *      id: 1,
 *      title: "Grocery Store",
 *      amount: "-$45.00",
 *      date: "2023-11-15T12:00:00Z",
 *      transactionType: TransactionType.CARD_PAYMENT,
 *      cardType: CardType.DEBIT,
 *      direction: TransactionDirection.OUTGOING,
 *      recipientReference: "WHOLEFOODS-NY-123",
 *   }
 * ];
 *
 * // Post-function output:
 * const groupedTransactions = {
 *   "November 2023": [
 *    {
 *      id: 1,
 *      title: "Grocery Store",
 *      amount: "-$45.00",
 *      date: "2023-11-15T12:00:00Z",
 *      transactionType: TransactionType.CARD_PAYMENT,
 *      cardType: CardType.DEBIT,
 *      direction: TransactionDirection.OUTGOING,
 *      recipientReference: "WHOLEFOODS-NY-123",
 *    }
 *   ],
 * };
 */
export function groupTransactionsByMonth(transactions: Transaction[]) {
  // sort transaction
  const sortedTransactions = [...transactions].sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
  );

  const grouped: { [key: string]: Transaction[] } = {};

  sortedTransactions.forEach((transaction) => {
    const date = new Date(transaction.date);
    const monthYear = date.toLocaleString("default", {
      month: "long",
      year: "numeric",
    });
    if (!grouped[monthYear]) {
      grouped[monthYear] = [];
    }
    grouped[monthYear].push(transaction);
  });

  // sort group
  const orderedGrouped = Object.keys(grouped)
    .sort((a, b) => {
      const dateA = new Date(grouped[a][0].date);
      const dateB = new Date(grouped[b][0].date);
      return dateB.getTime() - dateA.getTime();
    })
    .reduce((obj: { [key: string]: Transaction[] }, key) => {
      obj[key] = grouped[key];
      return obj;
    }, {});

  return orderedGrouped;
}

export function useGroupedTransactions(transactions: Transaction[]) {
  return useMemo(() => groupTransactionsByMonth(transactions), [transactions]);
}
