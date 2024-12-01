import { View, Text } from "react-native";
import React from "react";
import { Button } from "@/components/ui/button";
import { useAuthContext } from "@/lib/context/auth-context";

export default function App() {
  const { signIn } = useAuthContext();

  return (
    <View className="flex-1 items-center justify-center bg-background">
      <Text className="text-foreground text-xl mb-4">Beid</Text>
      <Button variant={"ghost"} onPress={signIn}>
        <Text className="text-foreground">Sign In</Text>
      </Button>
    </View>
  );
}
