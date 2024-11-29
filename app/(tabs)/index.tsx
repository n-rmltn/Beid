import Details from "@/components/Home/Details";
import * as React from "react";
import { RefreshControl, SafeAreaView, ScrollView, View } from "react-native";

export default function Screen() {
  const [refreshing, setRefreshing] = React.useState(false);

  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    setTimeout(() => {
      setRefreshing(false);
    }, 2000);
  }, []);

  return (
    <SafeAreaView className="flex-1 items-center gap-5 p-6 bg-background">
      <ScrollView
        className="w-full"
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ flexGrow: 1, alignItems: "center" }}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }>
        <Details />
      </ScrollView>
    </SafeAreaView>
  );
}
