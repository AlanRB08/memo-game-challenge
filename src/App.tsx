import { useState } from "react";
import { StartScreen } from "./components/StartScreen";

type Screen = "start" | "game";

function App() {
  const [screen, setScreen] = useState<Screen>("start");

  return (
    <>
      {screen === "start" && <StartScreen onStart={() => setScreen("game")} />}

      {screen === "game" && (
        <main className="min-h-screen bg-background text-text-primary">
          Game screen
        </main>
      )}
    </>
  );
}

export default App;
