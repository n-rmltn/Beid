import { Tabs } from "expo-router";
import { Home } from "@/lib/icons/Home";

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
        name="test"
        options={{
          title: "Test",
          tabBarIcon({ color, size }) {
            return <Home color={color} size={size} />;
          },
          headerShown: false,
        }}
      />
    </Tabs>
  );
}
