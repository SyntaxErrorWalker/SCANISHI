import { useState, useEffect } from "react";
import SplashScreen from "./Components/screens/SplashScreen";
import LoginScreen from "./Components/screens/LoginScreen";
import HomeScreen from "./Components/screens/HomeScreen";
import ScanScreen from "./Components/screens/ScanScreen";
import MapScreen from "./Components/screens/MapScreen";
import QuestsScreen from "./Components/screens/QuestsScreen";
import ProfileScreen from "./Components/screens/ProfileScreen";

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

  useEffect(() => {
    const t1 = setTimeout(() => setScreen("login"), 2800);
    return () => clearTimeout(t1);
  }, []);

  const handleLogin = () => setScreen("home");

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
        <div onClick={handleLogin} className="cursor-pointer">
          <LoginScreen />
        </div>
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
