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
    try {
      await AsyncStorage.removeItem("isAuthenticated");
      setIsAuthenticated(false);
      router.replace("/");
    } catch (error) {
      Alert.alert("Error", "Failed to log out. Please try again.");
    }
  };

  const handleAuthentication = async () => {
    try {
      // hardware check
      const compatible = await LocalAuthentication.hasHardwareAsync();
      if (!compatible) {
        throw new Error("Device does not support biometric authentication");
      }

      // biometric check
      const enrolled = await LocalAuthentication.isEnrolledAsync();
      if (!enrolled) {
        throw new Error("No biometrics enrolled on this device");
      }

      const result = await LocalAuthentication.authenticateAsync({
        promptMessage: "Authenticate with Face ID",
        fallbackLabel: "Use passcode",
        disableDeviceFallback: false,
      });

      if (result.success) {
        await AsyncStorage.setItem("isAuthenticated", "true");
        setIsAuthenticated(true);
        Alert.alert("Success", "Authentication successful!");
        return true;
      }

      if (result.error) {
        throw new Error(result.error);
      }

      return false;
    } catch (error) {
      const message =
        error instanceof Error ? error.message : "Authentication failed";
      Alert.alert("Error", message);
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
