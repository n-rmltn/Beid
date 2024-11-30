import React, { useState } from "react";
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  SafeAreaView,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { CreditCard } from "@/lib/icons/Card";
import { HandCoins } from "@/lib/icons/Coins";
import { QrCode } from "@/lib/icons/QR";
import { Gift } from "@/lib/icons/Gift";
import { useGroupedTransactions } from "@/lib/hooks/useGroupedTransaction";
import {
  CardType,
  Transaction,
  TransactionDirection,
  TransactionType,
} from "@/lib/types/transaction";

// TODO: Change id:number to UUID:string, implement mock fetch from supabase DB
const transactions: Transaction[] = [
  {
    id: 1,
    title: "Grocery Store",
    amount: "-$45.00",
    date: "2023-11-15T12:00:00Z",
    transactionType: TransactionType.CARD_PAYMENT,
    cardType: CardType.DEBIT,
    direction: TransactionDirection.OUTGOING,
    recipientReference: "WHOLEFOODS-NY-123",
  },
  {
    id: 2,
    title: "Salary Deposit",
    amount: "+$3,000.00",
    date: "2023-11-14T09:00:00Z",
    transactionType: TransactionType.RECEIVE_FUND,
    direction: TransactionDirection.INCOMING,
    recipientReference: "ACME-CORP-NOV23",
  },
  {
    id: 3,
    title: "Electric Bill",
    amount: "-$80.00",
    date: "2023-11-10T15:30:00Z",
    transactionType: TransactionType.QR_PAYMENT,
    direction: TransactionDirection.OUTGOING,
    recipientReference: "CONEDISON-NOV23",
  },
  {
    id: 4,
    title: "Online Shopping",
    amount: "-$120.00",
    date: "2023-10-28T18:45:00Z",
    transactionType: TransactionType.CARD_PAYMENT,
    cardType: CardType.CREDIT,
    direction: TransactionDirection.OUTGOING,
    recipientReference: "AMAZON-ORDER-456",
  },
  {
    id: 5,
    title: "Restaurant",
    amount: "-$65.50",
    date: "2023-08-15T20:00:00Z",
    transactionType: TransactionType.CARD_PAYMENT,
    cardType: CardType.CREDIT,
    direction: TransactionDirection.OUTGOING,
    recipientReference: "RESTO-BELLA-789",
  },
  {
    id: 6,
    title: "Gas Station",
    amount: "-$40.00",
    date: "2023-08-10T14:15:00Z",
    transactionType: TransactionType.CARD_PAYMENT,
    cardType: CardType.DEBIT,
    direction: TransactionDirection.OUTGOING,
    recipientReference: "SHELL-GAS-321",
  },
  {
    id: 7,
    title: "Gas Station",
    amount: "-$80.00",
    date: "2023-05-10T14:15:00Z",
    transactionType: TransactionType.CARD_PAYMENT,
    cardType: CardType.DEBIT,
    direction: TransactionDirection.OUTGOING,
    recipientReference: "EXXON-GAS-654",
  },
  {
    id: 8,
    title: "Cashback Reward",
    amount: "+$25.00",
    date: "2023-11-01T10:00:00Z",
    transactionType: TransactionType.CASHBACK,
    direction: TransactionDirection.INCOMING,
    recipientReference: "REWARDS-NOV23",
  },
  {
    id: 9,
    title: "Coffee Shop",
    amount: "-$5.50",
    date: "2023-11-16T08:30:00Z",
    transactionType: TransactionType.QR_PAYMENT,
    direction: TransactionDirection.OUTGOING,
    recipientReference: "STARBUCKS-NYC-01",
  },
  {
    id: 10,
    title: "Friend Transfer",
    amount: "+$50.00",
    date: "2023-11-13T16:20:00Z",
    transactionType: TransactionType.RECEIVE_FUND,
    direction: TransactionDirection.INCOMING,
    recipientReference: "JANE-DOE-SPLIT",
  },
];

const getTransactionIcon = (type: TransactionType) => {
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

const TransactionItem: React.FC<Transaction> = ({
  title,
  amount,
  date,
  transactionType,
  direction,
}) => {
  const formattedDate = new Date(date).toLocaleDateString();

  return (
    <View className="flex-row items-center mb-4">
      <View className="bg-primary p-2 rounded-lg mr-3">
        {getTransactionIcon(transactionType)}
      </View>
      <View className="flex-1">
        <Text className="text-base font-medium text-foreground">{title}</Text>
        <Text className="text-xs text-muted-foreground">{formattedDate}</Text>
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
  );
};

export default function App() {
  const [showBalance, setShowBalance] = useState(false);
  const groupedTransactions = useGroupedTransactions(transactions);

  const toggleBalance = () => {
    setShowBalance(!showBalance);
  };

  return (
    <SafeAreaView className="flex-1 bg-background">
      <View className="flex-row justify-between items-center p-4 bg-card">
        <Text className="text-lg font-bold text-card-foreground">
          {/* TODO: Ideally fetch name from DB */}
          Welcome, John
        </Text>
      </View>

      <ScrollView>
        <View className="bg-card p-5 m-4 rounded-2xl items-center">
          <Text className="text-card-foreground text-base mb-2">
            Total Balance
          </Text>
          <View className="flex-row items-center">
            <Text className="text-foreground text-3xl font-bold">
              {/* TODO: Fetch from DB, authenticate on showBalance */}
              {showBalance ? "$5,240.00" : "****"}
            </Text>
            <TouchableOpacity onPress={toggleBalance} className="ml-2">
              <Ionicons
                name={showBalance ? "eye-outline" : "eye-off-outline"}
                size={24}
                color="white"
              />
            </TouchableOpacity>
          </View>
        </View>

        <View className="flex-row justify-around mb-6">
          {["Send", "Cards", "Invest"].map((action) => (
            <TouchableOpacity
              key={action}
              className="bg-primary p-4 rounded-xl items-center">
              <Ionicons size={24} color="white" />
              <Text className="text-primary-foreground mt-2">{action}</Text>
            </TouchableOpacity>
          ))}
        </View>

        <View className="bg-card p-6 rounded-t-2xl">
          <Text className="text-lg font-bold mb-4 text-card-foreground">
            Recent Transactions
          </Text>
          {Object.entries(groupedTransactions).map(
            ([month, monthTransactions]) => (
              <View key={month}>
                <Text className="text-base font-semibold mt-4 mb-2 text-muted-foreground">
                  {month}
                </Text>
                {monthTransactions.map((transaction) => (
                  <TransactionItem key={transaction.id} {...transaction} />
                ))}
              </View>
            )
          )}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
