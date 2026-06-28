import { useState, useEffect } from "react";
import LoginScreen from "./Components/screens/LoginScreen";
import HomeScreen from "./Components/screens/HomeScreen";
import ScanScreen from "./Components/screens/ScanScreen";
import MapScreen from "./Components/screens/MapScreen";
import QuestsScreen from "./Components/screens/QuestsScreen";
import ProfileScreen from "./Components/screens/ProfileScreen";
import { AuthProvider, useAuth } from "./lib/auth-context";

type ScreenId =
  | "splash"
  | "login"
  | "home"
  | "scan"
  | "map"
  | "quests"
  | "profile";

function App() {
  return (
    <AuthProvider>
      <AppContent />
    </AuthProvider>
  );
}

function AppContent() {
  const [screen, setScreen] = useState<ScreenId>("splash");
  const [loginError, setLoginError] = useState<string | null>(null);
  const { accessToken, isAuthLoading, refreshAuth } = useAuth();

  useEffect(() => {
    if (accessToken) {
      setScreen("home");
    } else if (!isAuthLoading) {
      setScreen("login");
    }
  }, [accessToken, isAuthLoading]);

  const handleLogin = async () => {
    if (isAuthLoading) return;

    setLoginError(null);

    try {
      const token = await refreshAuth();
      if (token) {
        setScreen("home");
        return;
      }

      setLoginError(
        "Не удалось войти через Telegram. Открой приложение внутри Telegram.",
      );
    } catch (error) {
      console.error("Login failed:", error);
      setLoginError("Backend недоступен или настроен неверно.");
    }
  };

  const handleNavigate = (id: string) => {
    if (
      id === "scan" ||
      id === "map" ||
      id === "quests" ||
      id === "profile" ||
      id === "home"
    ) {
      setScreen(id as ScreenId);
    }
  };

  return (
    <div
      className="relative"
      style={{
        width: "100vw",
        height: "100vh",
        maxWidth: 430,
        maxHeight: 932,
        margin: "0 auto",
      }}
    >
      {screen === "login" && (
        <LoginScreen
          error={loginError}
          isLoading={isAuthLoading}
          onLogin={handleLogin}
        />
      )}
      {screen === "home" && <HomeScreen onNavigate={handleNavigate} />}
      {screen === "scan" && <ScanScreen onNavigate={handleNavigate} />}
      {screen === "map" && <MapScreen onNavigate={handleNavigate} />}
      {screen === "quests" && <QuestsScreen onNavigate={handleNavigate} />}
      {screen === "profile" && <ProfileScreen onNavigate={handleNavigate} />}
    </div>
  );
}

export default App;
