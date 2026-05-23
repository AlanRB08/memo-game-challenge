import { useState, useCallback } from "react";
import { StartScreen } from "./components/StartScreen";
import { GameScreen } from "./components/GameScreen";
import { ResultScreen } from "./components/ResultScreen";

type Screen = "start" | "game" | "result";
type GameResult = "won" | "lost";

function App() {
  const [screen, setScreen] = useState<Screen>("start");
  const [gameResult, setGameResult] = useState<GameResult | null>(null);
  const [isNewBestTime, setIsNewBestTime] = useState(false);

  const handleGameEnd = useCallback(
    (result: GameResult, newBestTime = false) => {
      setGameResult(result);
      setIsNewBestTime(newBestTime);
      setScreen("result");
    },
    []
  );

  function handlePlayAgain() {
    setGameResult(null);
    setIsNewBestTime(false);
    setScreen("game");
  }

  return (
    <>
      {screen === "start" && <StartScreen onStart={() => setScreen("game")} />}

      {screen === "game" && <GameScreen onGameEnd={handleGameEnd} />}

      {screen === "result" && gameResult && (
        <ResultScreen
          result={gameResult}
          isNewBestTime={isNewBestTime}
          onPlayAgain={handlePlayAgain}
        />
      )}
    </>
  );
}

export default App;
