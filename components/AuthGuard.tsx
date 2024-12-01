import { useRouter, useSegments } from "expo-router";
import { useEffect } from "react";
import { useAuthContext } from "@/lib/context/auth-context";
import { View } from "react-native";
import { Text } from "@/components/ui/text";

export function AuthGuard({ children }: { children: React.ReactNode }) {
  const { isAuthenticated, isLoading } = useAuthContext();
  const segments = useSegments();
  const router = useRouter();

  useEffect(() => {
    const inAuthGroup = segments[0] === "(auth)";
    const inTabsGroup = segments[0] === "(tabs)";

    if (isLoading) return;

    if (!isAuthenticated && inTabsGroup) {
      router.replace("/");
    } else if (isAuthenticated && inAuthGroup) {
      router.replace("/(tabs)/home");
    }
  }, [isAuthenticated, segments, isLoading]);

  if (isLoading) {
    return (
      <View className="flex-1 items-center justify-center">
        <Text>Loading...</Text>
      </View>
    );
  }

  return <>{children}</>;
}
