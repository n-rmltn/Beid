import { useMemo } from "react";
import { Transaction } from "@/lib/types/transaction";

/**
 * Groups an array of transactions by month and year.
 *
 * @param transactions - Array of Transaction objects to be grouped
 * @returns Object with month-year strings as keys and arrays of transactions as values
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
  const grouped: { [key: string]: Transaction[] } = {};
  transactions.forEach((transaction) => {
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
  return grouped;
}

export function useGroupedTransactions(transactions: Transaction[]) {
  return useMemo(() => groupTransactionsByMonth(transactions), [transactions]);
}
