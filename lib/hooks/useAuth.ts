import { useState } from "react";
import * as LocalAuthentication from "expo-local-authentication";
import { Alert } from "react-native";
import { router } from "expo-router";
import AsyncStorage from "@react-native-async-storage/async-storage";

export function useAuth() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const checkAuthenticationStatus = () => {
    return isAuthenticated;
  };

  const handleLogout = async () => {
    await AsyncStorage.removeItem("isAuthenticated");
    setIsAuthenticated(false);
    router.replace("/");
  };

  const handleAuthentication = async () => {
    try {
      const result = await LocalAuthentication.authenticateAsync({
        promptMessage: "Authenticate with Face ID",
        fallbackLabel: "Use passcode",
      });

      if (result.success) {
        await AsyncStorage.setItem("isAuthenticated", "true");
        setIsAuthenticated(true);
        Alert.alert("Success", "Authentication successful!");
        return true;
      }

      return false;
    } catch (error) {
      Alert.alert("Error", "Authentication failed");
      return false;
    }
  };

  return {
    isAuthenticated,
    setIsAuthenticated,
    handleAuthentication,
    checkAuthenticationStatus,
    handleLogout,
  };
}
