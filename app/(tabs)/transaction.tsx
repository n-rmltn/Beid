import React from "react";
import {
  View,
  Text,
  ScrollView,
  SafeAreaView,
  RefreshControl,
} from "react-native";
import { TransactionItem } from "@/components/TransactionItem";
import { useGroupedTransactions } from "@/lib/hooks/useGroupedTransaction";
import { transactions } from "@/lib/data/transaction";

export default function Transactions() {
  const [refreshing, setRefreshing] = React.useState(false);
  const groupedTransactions = useGroupedTransactions(transactions);

  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    setTimeout(() => {
      setRefreshing(false);
    }, 2000);
  }, []);

  return (
    <SafeAreaView className="flex-1 bg-background">
      <ScrollView
        className="mt-4"
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }>
        <View className="p-6">
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
