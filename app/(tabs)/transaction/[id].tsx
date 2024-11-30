import React from "react";
import { View, Text, ScrollView, SafeAreaView } from "react-native";
import { useLocalSearchParams, useRouter, Link } from "expo-router";
import {
  Transaction,
  TransactionType,
  TransactionDirection,
  CardType,
} from "@/lib/types/transaction";
import { getTransactionIcon } from "@/components/Transaction/TransactionItem";
import { Button } from "@/components/ui/button";

// Mock data
const getTransactionById = (id: string): Transaction | undefined => {
  const mockTransaction: Transaction = {
    id: parseInt(id),
    title: "Coffee Shop Purchase",
    amount: "$4.50",
    date: "2023-06-15T10:30:00Z",
    recipientReference: "Order #1234",
    transactionType: TransactionType.CARD_PAYMENT,
    cardType: CardType.DEBIT,
    direction: TransactionDirection.OUTGOING,
    to: "Starbucks",
  };
  return mockTransaction;
};

export default function TransactionDetailScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const router = useRouter();
  const transaction = getTransactionById(id);

  if (!transaction) {
    return (
      <SafeAreaView className="flex-1 bg-background">
        <Text className="text-lg text-red-500 text-center mt-5">
          Transaction not found
        </Text>
      </SafeAreaView>
    );
  }

  const formattedDate = new Date(transaction.date).toLocaleString();

  return (
    <SafeAreaView className="flex-1 bg-background">
      <ScrollView>
        <View className="items-center p-5 bg-card">
          <View className="bg-primary p-4 rounded-xl mb-3">
            {getTransactionIcon(transaction.transactionType)}
          </View>
          <Text className="text-2xl font-bold text-foreground">
            {transaction.title}
          </Text>
        </View>

        <View className="bg-card m-4 p-5 rounded-lg">
          <DetailItem label="Amount" value={transaction.amount} />
          <DetailItem label="Date" value={formattedDate} />
          <DetailItem label="Type" value={transaction.transactionType} />
          {transaction.cardType && (
            <DetailItem label="Card Type" value={transaction.cardType} />
          )}
          <DetailItem label="Direction" value={transaction.direction} />
          {transaction.from && (
            <DetailItem label="From" value={transaction.from} />
          )}
          {transaction.to && <DetailItem label="To" value={transaction.to} />}
          {transaction.recipientReference && (
            <DetailItem
              label="Reference"
              value={transaction.recipientReference}
            />
          )}
        </View>

        <View className="px-4 mt-4">
          <Link href={"/transaction"} asChild>
            <Button className="w-full">
              <Text className="text-primary-foreground">
                Back to Transactions
              </Text>
            </Button>
          </Link>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const DetailItem: React.FC<{ label: string; value: string }> = ({
  label,
  value,
}) => (
  <View className="flex-row justify-between py-2 border-b border-muted">
    <Text className="text-base text-muted-foreground">{label}:</Text>
    <Text className="text-base font-medium text-foreground">
      {toTitleCase(value)}
    </Text>
  </View>
);

const toTitleCase = (str: string): string => {
  if (str !== str.toUpperCase()) return str;

  return str
    .toLowerCase()
    .split("_")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
};
