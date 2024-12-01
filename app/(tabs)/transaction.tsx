import React from "react";
import {
  View,
  Text,
  ScrollView,
  SafeAreaView,
  RefreshControl,
} from "react-native";
import { TransactionItem } from "@/components/Transaction/TransactionItem";
import { useGroupedTransactions } from "@/lib/hooks/useGroupedTransaction";
import { supabase } from "@/lib/supabase/supabase";
import { Database } from "@/lib/types/supabase";

type Transaction = Database["public"]["Tables"]["transactions"]["Row"];

export default function Transactions() {
  const [refreshing, setRefreshing] = React.useState(false);
  const [transactions, setTransactions] = React.useState<Transaction[]>([]);
  const [isLoading, setIsLoading] = React.useState(true);
  const groupedTransactions = useGroupedTransactions(transactions);

  const fetchTransactions = async () => {
    let { data, error } = await supabase.from("transactions").select("*");

    if (error) {
      console.log(error);
    }

    if (data) {
      setTransactions(data);
    }
    setIsLoading(false);
  };

  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    setTimeout(() => {
      fetchTransactions();
      setRefreshing(false);
    }, 2000);
  }, []);

  React.useEffect(() => {
    fetchTransactions();
  }, []);

  if (isLoading) {
    return (
      <SafeAreaView className="flex-1 bg-background">
        <View className="flex-1 items-center justify-center">
          <Text className="text-foreground">Loading transactions...</Text>
        </View>
      </SafeAreaView>
    );
  }

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
