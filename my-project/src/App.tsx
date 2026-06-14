import { useState, useEffect } from "react";
import SplashScreen from "./Components/screens/SplashScreen";
import LoginScreen from "./Components/screens/LoginScreen";
import HomeScreen from "./Components/screens/HomeScreen";
import ScanScreen from "./Components/screens/ScanScreen";
import MapScreen from "./Components/screens/MapScreen";
import QuestsScreen from "./Components/screens/QuestsScreen";
import ProfileScreen from "./Components/screens/ProfileScreen";
import { getValidAccessToken } from "./lib/auth";

type ScreenId =
  | "splash"
  | "login"
  | "home"
  | "scan"
  | "map"
  | "quests"
  | "profile";

function App() {
  const [screen, setScreen] = useState<ScreenId>("splash");
  const [loginError, setLoginError] = useState<string | null>(null);
  const [isLoggingIn, setIsLoggingIn] = useState(false);

  useEffect(() => {
    const t1 = setTimeout(() => setScreen("login"), 2800);
    return () => clearTimeout(t1);
  }, []);

  const handleLogin = async () => {
    if (isLoggingIn) return;

    setIsLoggingIn(true);
    setLoginError(null);

    try {
      const token = await getValidAccessToken();
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
    } finally {
      setIsLoggingIn(false);
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
      {screen === "splash" && <SplashScreen />}
      {screen === "login" && (
        <LoginScreen
          error={loginError}
          isLoading={isLoggingIn}
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
