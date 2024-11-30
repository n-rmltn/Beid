import React from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { QrCode, HandCoins, CreditCard } from "lucide-react-native";

const actions = [
  { name: "QR", icon: QrCode },
  { name: "Send", icon: HandCoins },
  { name: "Cards", icon: CreditCard },
];

export default function QuickActions() {
  return (
    <View className="w-full max-w-sm bg-card rounded-3xl p-6 shadow-lg">
      <Text className="text-card-foreground text-lg font-semibold mb-4">
        Quick Actions
      </Text>
      <View className="flex-row justify-between">
        {actions.map(({ name, icon: Icon }) => (
          <TouchableOpacity
            key={name}
            className="border border-border rounded-2xl p-4 flex-col items-center"
            activeOpacity={0.7}>
            <View className="bg-primary rounded-full p-3 mb-2">
              <Icon size={24} className="text-primary-foreground" />
            </View>
            <Text className="text-foreground text-sm font-medium">{name}</Text>
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );
}
