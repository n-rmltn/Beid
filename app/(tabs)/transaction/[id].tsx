import React from "react";
import { View, Text, ScrollView, SafeAreaView } from "react-native";
import { useLocalSearchParams, Link } from "expo-router";
import { getTransactionIcon } from "@/components/Transaction/TransactionItem";
import { Button } from "@/components/ui/button";
import { DetailItem } from "@/components/Transaction/DetailItem";
import { Database } from "@/lib/types/supabase";
import { supabase } from "@/lib/supabase/supabase";

type Transaction = Database["public"]["Tables"]["transactions"]["Row"];

export default function TransactionDetailScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const [transaction, setTransaction] = React.useState<Transaction | null>(
    null
  );
  const [isLoading, setIsLoading] = React.useState(true);

  const fetchTransaction = async () => {
    setIsLoading(true);
    setTransaction(null);

    let { data, error } = await supabase
      .from("transactions")
      .select("*")
      .eq("id", id)
      .single();

    if (error) {
      console.log(error);
    }

    if (data) {
      setTransaction(data);
    }
    setIsLoading(false);
  };

  React.useEffect(() => {
    fetchTransaction();
  }, [id]);

  if (!id) {
    return (
      <SafeAreaView className="flex-1 bg-background">
        <Text className="text-lg text-red-500 text-center mt-5">
          Invalid transaction ID
        </Text>
      </SafeAreaView>
    );
  }

  if (isLoading) {
    return (
      <SafeAreaView className="flex-1 bg-background">
        <View className="flex-1 items-center justify-center">
          <Text className="text-foreground">Loading transaction...</Text>
        </View>
      </SafeAreaView>
    );
  }

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
            {getTransactionIcon(transaction.transaction_type)}
          </View>
          <Text className="text-2xl font-bold text-foreground">
            {transaction.title}
          </Text>
        </View>

        <View className="bg-card m-4 p-5 rounded-lg">
          <DetailItem label="Amount" value={transaction.amount} />
          <DetailItem label="Date" value={formattedDate} />
          <DetailItem label="Type" value={transaction.transaction_type} />
          {transaction.card_type && (
            <DetailItem label="Card Type" value={transaction.card_type} />
          )}
          <DetailItem label="Direction" value={transaction.direction} />
          {transaction.source && (
            <DetailItem label="From" value={transaction.source} />
          )}
          {transaction.destination && (
            <DetailItem label="To" value={transaction.destination} />
          )}
          {transaction.recipient_reference && (
            <DetailItem
              label="Reference"
              value={transaction.recipient_reference}
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
