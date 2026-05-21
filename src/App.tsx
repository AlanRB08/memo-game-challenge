import { useState, useCallback } from "react";
import { StartScreen } from "./components/StartScreen";
import { GameScreen } from "./components/GameScreen";
import { ResolveScreen } from "./components/ResultScreen";

type Screen = "start" | "game" | "result";
type GameResult = "won" | "lost";

function App() {
  const [screen, setScreen] = useState<Screen>("start");
  const [gameResult, setGameResult] = useState<GameResult | null>(null);

  const handleGameEnd = useCallback((result: GameResult) => {
    setGameResult(result);
    setScreen("result");
  }, []);

  function handlePlayAgain() {
    setGameResult(null);
    setScreen("game");
  }

  return (
    <>
      {screen === "start" && <StartScreen onStart={() => setScreen("game")} />}

      {screen === "game" && <GameScreen onGameEnd={handleGameEnd} />}

      {screen === "result" && gameResult && (
        <ResolveScreen result={gameResult} onPlayAgain={handlePlayAgain} />
      )}
    </>
  );
}

export default App;
