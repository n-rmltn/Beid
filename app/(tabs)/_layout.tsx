import { Tabs } from "expo-router";
import { Home } from "@/lib/icons/Home";
import { Banknote } from "@/lib/icons/Banknote";

export default function TabsLayout() {
  return (
    <Tabs>
      <Tabs.Screen
        name="home"
        options={{
          title: "Home",
          tabBarIcon({ color, size }) {
            return <Home color={color} size={size} />;
          },
          headerShown: false,
        }}
      />
      <Tabs.Screen
        name="transaction"
        options={{
          title: "Transactions",
          tabBarIcon({ color, size }) {
            return <Banknote color={color} size={size} />;
          },
          headerShown: false,
        }}
      />
      <Tabs.Screen
        name="transaction/[id]"
        options={{
          href: null,
          title: "Transaction",
          tabBarIcon({ color, size }) {
            return <Banknote color={color} size={size} />;
          },
          headerShown: true,
        }}
      />
    </Tabs>
  );
}
