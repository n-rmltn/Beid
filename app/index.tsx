import * as React from "react";
import { View } from "react-native";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Text } from "@/components/ui/text";

export default function Screen() {
  return (
    <View className="flex-1 justify-center items-center gap-5 p-6 bg-secondary/30">
      <Card className="w-full max-w-sm p-6 rounded-2xl">
        <CardHeader className="items-center">
          <View className="p-3" />
          <CardTitle className="pb-2 text-center">Testing</CardTitle>
          <View className="flex-row">
            <CardDescription className="text-base font-semibold">
              Starter kit
            </CardDescription>
          </View>
        </CardHeader>
        <CardContent>
          <View className="flex-row justify-around gap-3">
            <View className="items-center">
              <Text className="text-sm text-muted-foreground">Div</Text>
              <Text className="text-xl font-semibold">1</Text>
            </View>
            <View className="items-center">
              <Text className="text-sm text-muted-foreground">Div</Text>
              <Text className="text-xl font-semibold">2</Text>
            </View>
            <View className="items-center">
              <Text className="text-sm text-muted-foreground">Div</Text>
              <Text className="text-xl font-semibold">3</Text>
            </View>
          </View>
        </CardContent>
      </Card>
    </View>
  );
}
