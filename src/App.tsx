import { useState } from "react";
import { StartScreen } from "./components/StartScreen";
import { GameScreen } from "./components/GameScreen";

type Screen = "start" | "game";

function App() {
  const [screen, setScreen] = useState<Screen>("start");

  return (
    <>
      {screen === "start" && <StartScreen onStart={() => setScreen("game")} />}

      {screen === "game" && <GameScreen />}
    </>
  );
}

export default App;
