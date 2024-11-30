import React from "react";
import { View, Text, Pressable } from "react-native";
import { CreditCard } from "@/lib/icons/Card";
import { HandCoins } from "@/lib/icons/Coins";
import { QrCode } from "@/lib/icons/QR";
import { Gift } from "@/lib/icons/Gift";
import {
  Transaction,
  TransactionDirection,
  TransactionType,
} from "@/lib/types/transaction";
import { Link } from "expo-router";

export const getTransactionIcon = (type: TransactionType) => {
  switch (type) {
    case TransactionType.QR_PAYMENT:
      return <QrCode className="text-primary-foreground" strokeWidth={1.25} />;
    case TransactionType.CARD_PAYMENT:
      return (
        <CreditCard className="text-primary-foreground" strokeWidth={1.25} />
      );
    case TransactionType.CASHBACK:
      return <Gift className="text-primary-foreground" strokeWidth={1.25} />;
    case TransactionType.RECEIVE_FUND:
      return (
        <HandCoins className="text-primary-foreground" strokeWidth={1.25} />
      );
    default:
      return null;
  }
};

export const TransactionItem: React.FC<Transaction> = ({
  id,
  title,
  amount,
  date,
  transactionType,
  direction,
  to,
  from,
}) => {
  const formattedDate = new Date(date).toLocaleDateString();

  return (
    <Link href={`/transaction/${id}`} asChild>
      <Pressable className="active:opacity-70">
        <View className="flex-row items-center mb-4">
          <View className="bg-primary p-2 rounded-lg mr-3">
            {getTransactionIcon(transactionType)}
          </View>
          <View className="flex-1">
            <Text className="text-base font-medium text-foreground">
              {title}
            </Text>
            <Text className="text-xs text-muted-foreground">
              {formattedDate}
            </Text>
            <Text className="text-xs text-muted-foreground">
              {direction === TransactionDirection.INCOMING
                ? `From: ${from}`
                : `To: ${to}`}
            </Text>
          </View>
          <Text
            className={`text-base font-medium ${
              direction === TransactionDirection.INCOMING
                ? "text-green-500"
                : "text-red-500"
            }`}>
            {amount}
          </Text>
        </View>
      </Pressable>
    </Link>
  );
};
