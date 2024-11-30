import Details from "@/components/Home/Details";
import { Ionicons } from "@expo/vector-icons";
import * as React from "react";
import {
  RefreshControl,
  SafeAreaView,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import QuickActions from "@/components/QuickActions";

const Home = () => {
  const [refreshing, setRefreshing] = React.useState(false);
  const [showBalance, setShowBalance] = React.useState(false);

  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    setTimeout(() => {
      setRefreshing(false);
    }, 2000);
  }, []);

  const toggleBalance = () => {
    setShowBalance(!showBalance);
  };

  return (
    <SafeAreaView className="flex-1 items-center gap-5 p-6 bg-background">
      <ScrollView
        className="w-full"
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ flexGrow: 1, alignItems: "center" }}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }>
        {/* Balance */}
        <View className="bg-card p-5 m-4 w-full rounded-2xl items-center">
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

        <QuickActions />

        <Details />
      </ScrollView>
    </SafeAreaView>
  );
};

export default Home;
