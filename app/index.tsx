import { View, Text } from "react-native";
import React from "react";
import { Link } from "expo-router";
import { Button } from "@/components/ui/button";

export default function App() {
  return (
    <View className="flex-1 items-center justify-center bg-background">
      <Text className="text-foreground text-xl mb-4">Index</Text>
      {/* asChild to use Button press event */}
      <Link href="/(tabs)/home" asChild>
        <Button variant={"ghost"}>
          <Text className="text-foreground">Home</Text>
        </Button>
      </Link>
    </View>
  );
}
