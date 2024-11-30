import AsyncStorage from "@react-native-async-storage/async-storage";
import { View } from "react-native";
import { setAndroidNavigationBar } from "@/lib/android-navigation-bar";
import { MoonStar } from "@/lib/icons/MoonStar";
import { Sun } from "@/lib/icons/Sun";
import { useColorScheme } from "@/lib/useColorScheme";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

export function ThemeToggle() {
  const { isDarkColorScheme, setColorScheme } = useColorScheme();
  return (
    <Button
      variant={"ghost"}
      onPress={() => {
        const newTheme = isDarkColorScheme ? "light" : "dark";
        setColorScheme(newTheme);
        setAndroidNavigationBar(newTheme);
        AsyncStorage.setItem("theme", newTheme);
      }}
      className="web:ring-offset-background web:transition-colors web:focus-visible:outline-none web:focus-visible:ring-2 web:focus-visible:ring-ring web:focus-visible:ring-offset-2">
      {({ pressed }) => (
        <View
          className={cn(
            "flex-1 aspect-square pt-0.5 justify-center items-start",
            pressed && "opacity-70"
          )}>
          {isDarkColorScheme ? (
            <MoonStar className="text-foreground" strokeWidth={1.25} />
          ) : (
            <Sun className="text-foreground" strokeWidth={1.25} />
          )}
        </View>
      )}
    </Button>
  );
}
