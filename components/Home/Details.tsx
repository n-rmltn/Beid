import { View } from "react-native";
import React from "react";
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { ThemeToggle } from "@/components/ThemeToggle";

const Details = () => {
  return (
    <Card className="w-full max-w-sm p-6 m-4 rounded-2xl">
      <CardHeader className="items-center">
        <View className="p-3">
          <CardTitle className="pb-2 text-center">Theme</CardTitle>
        </View>
        <View className="flex-row">
          <CardDescription className="text-base font-semibold">
            <ThemeToggle />
          </CardDescription>
        </View>
      </CardHeader>
    </Card>
  );
};

export default Details;
