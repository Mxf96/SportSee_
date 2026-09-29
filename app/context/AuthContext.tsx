import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from "react";

import {
  getAuthToken,
  setAuthToken,
  removeAuthToken,
} from "../utils/authToken";

type AuthContextValue = {
  token: string | null;
  isAuthenticated: boolean;
  isAuthReady: boolean;
  authenticate: (newToken: string) => void;
  logout: () => void;
};

type AuthProviderProps = {
  children: ReactNode;
};

const AuthContext = createContext<AuthContextValue | null>(null);

export function AuthProvider({ children }: AuthProviderProps) {
  const [token, setToken] = useState<string | null>(null);
  const [isAuthReady, setIsAuthReady] = useState(false);

  useEffect(() => {
    const storedToken = getAuthToken();

    setToken(storedToken);
    setIsAuthReady(true);
  }, []);

  const authenticate = useCallback((newToken: string) => {
    setAuthToken(newToken);
    setToken(newToken);
  }, []);

  const logout = useCallback(() => {
    removeAuthToken();
    setToken(null);
  }, []);

  const value: AuthContextValue = {
    token,
    isAuthenticated: Boolean(token),
    isAuthReady,
    authenticate,
    logout,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error("useAuth doit être utilisé dans AuthProvider");
  }

  return context;
}