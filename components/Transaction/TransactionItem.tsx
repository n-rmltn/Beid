import React from "react";
import { View, Text, Pressable } from "react-native";
import { CreditCard } from "@/lib/icons/Card";
import { HandCoins } from "@/lib/icons/Coins";
import { QrCode } from "@/lib/icons/QR";
import { Gift } from "@/lib/icons/Gift";
import { Link } from "expo-router";
import { Database } from "@/lib/types/supabase";

type Transaction = Database["public"]["Tables"]["transactions"]["Row"];
type TransactionType = Database["public"]["Enums"]["transaction_type"];

export const getTransactionIcon = (type: TransactionType) => {
  switch (type) {
    case "QR_PAYMENT":
      return <QrCode className="text-primary-foreground" strokeWidth={1.25} />;
    case "CARD_PAYMENT":
      return (
        <CreditCard className="text-primary-foreground" strokeWidth={1.25} />
      );
    case "CASHBACK":
      return <Gift className="text-primary-foreground" strokeWidth={1.25} />;
    case "RECEIVE_FUND":
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
  transaction_type,
  direction,
  source,
  destination,
}) => {
  const formattedDate = new Date(date).toLocaleDateString();

  return (
    <Link href={`/transaction/${id}`} asChild>
      <Pressable className="active:opacity-70">
        <View className="flex-row items-center mb-4">
          <View className="bg-primary p-2 rounded-lg mr-3">
            {getTransactionIcon(transaction_type)}
          </View>
          <View className="flex-1">
            <Text className="text-base font-medium text-foreground">
              {title}
            </Text>
            <Text className="text-xs text-muted-foreground">
              {formattedDate}
            </Text>
            <Text className="text-xs text-muted-foreground">
              {direction === "INCOMING"
                ? `From: ${source}`
                : `To: ${destination}`}
            </Text>
          </View>
          <Text
            className={`text-base font-medium ${
              direction === "INCOMING" ? "text-green-500" : "text-red-500"
            }`}>
            RM{amount.toFixed(2)}
          </Text>
        </View>
      </Pressable>
    </Link>
  );
};
