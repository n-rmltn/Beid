import { createContext, useContext, useEffect, useState } from "react";
import { useAuth } from "@/lib/hooks/useAuth";
import AsyncStorage from "@react-native-async-storage/async-storage";

type AuthContextType = {
  isAuthenticated: boolean;
  isLoading: boolean;
  signIn: () => Promise<boolean>;
  signOut: () => Promise<void>;
  setIsAuthenticated: (value: boolean) => void;
};

const AuthContext = createContext<AuthContextType>({} as AuthContextType);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [isLoading, setIsLoading] = useState(true);
  const auth = useAuth();

  useEffect(() => {
    checkAuth();
  }, []);

  const checkAuth = async () => {
    try {
      const authStatus = await AsyncStorage.getItem("isAuthenticated");
      if (authStatus === "true") {
        auth.setIsAuthenticated(true);
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <AuthContext.Provider
      value={{
        isAuthenticated: auth.isAuthenticated,
        isLoading,
        signIn: auth.handleAuthentication,
        signOut: auth.handleLogout,
        setIsAuthenticated: auth.setIsAuthenticated,
      }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuthContext = () => useContext(AuthContext);
