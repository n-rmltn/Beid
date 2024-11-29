import { Tabs } from "expo-router";
import { MoonStar } from "lucide-react-native";

export default function TabsLayout() {
  return (
    <Tabs>
      <Tabs.Screen
        name="index"
        options={{
          tabBarIcon({ color, size }) {
            return <MoonStar color={color} size={size} />;
          },
          headerShown: false,
        }}
      />
    </Tabs>
  );
}
