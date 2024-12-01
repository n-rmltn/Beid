import Details from "@/components/Home/Details";
import { Eye } from "@/lib/icons/Eye";
import { EyeClosed } from "@/lib/icons/EyeClose";
import * as React from "react";
import {
  Alert,
  RefreshControl,
  SafeAreaView,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import * as LocalAuthentication from "expo-local-authentication";
import QuickActions from "@/components/Home/QuickActions";
import { Button } from "@/components/ui/button";
import { useAuthContext } from "@/lib/context/auth-context";

const Home = () => {
  const [refreshing, setRefreshing] = React.useState(false);
  const [showBalance, setShowBalance] = React.useState(false);
  const { signOut } = useAuthContext();

  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    setTimeout(() => {
      setRefreshing(false);
    }, 2000);
  }, []);

  const toggleBalance = async () => {
    if (showBalance) {
      setShowBalance(false);
      return;
    }

    try {
      const result = await LocalAuthentication.authenticateAsync({
        promptMessage: "Authenticate to view balance",
        fallbackLabel: "Use passcode",
      });

      if (result.success) {
        setShowBalance(true);
      }
    } catch (error) {
      Alert.alert("Error", "Authentication failed");
    }
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
              {showBalance ? (
                <Eye className="text-foreground" strokeWidth={1.25} />
              ) : (
                <EyeClosed className="text-foreground" strokeWidth={1.25} />
              )}
            </TouchableOpacity>
          </View>
        </View>

        <QuickActions />

        <Details />

        <Button variant={"destructive"} onPress={signOut}>
          <Text className="text-foreground">Sign Out</Text>
        </Button>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Home;
