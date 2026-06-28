import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import {
  getCachedAccessToken,
  getCachedUserData,
  getValidAccessToken,
} from "./auth";
import { parseJwt } from "./jwt";
import type { UserData } from "./user";

type AuthContextValue = {
  accessToken: string | null;
  userData: UserData | null;
  isAuthLoading: boolean;
  refreshAuth: () => Promise<string | null>;
};

const AuthContext = createContext<AuthContextValue | null>(null);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [accessToken, setAccessToken] = useState<string | null>(() =>
    getCachedAccessToken(),
  );
  const [userData, setUserData] = useState<UserData | null>(() =>
    getCachedUserData(),
  );
  const [isAuthLoading, setIsAuthLoading] = useState(false);

  const refreshAuth = useCallback(async () => {
    setIsAuthLoading(true);

    try {
      const token = await getValidAccessToken();
      setAccessToken(token);
      setUserData(token ? (parseJwt(token) as UserData | null) : null);
      return token;
    } finally {
      setIsAuthLoading(false);
    }
  }, []);

  useEffect(() => {
    if (accessToken || userData) return;

    void refreshAuth();
  }, [accessToken, refreshAuth, userData]);

  const value = useMemo(
    () => ({ accessToken, userData, isAuthLoading, refreshAuth }),
    [accessToken, userData, isAuthLoading, refreshAuth],
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error("useAuth must be used within AuthProvider");
  }

  return context;
}
