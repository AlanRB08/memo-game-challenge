import { useMemo, useState, useEffect, useRef, useCallback } from "react";

import confetti from "canvas-confetti";

import correctSound from "../assets/correct.mp3";
import incorrectSound from "../assets/incorrect.mp3";
import flipSound from "../assets/cardFlip.mp3";

import { createShuffledCards } from "../data/cards";
import { MemoryCard } from "./MemoryCard";
import { SoundToggle } from "./SoundToggle";

import { MatchResultModal } from "./MatchResultModal";

const GAME_TIME_LIMIT = 30;
const TOTAL_PAIRS = 4;
const RESULT_SCREEN_DELAY_MS = 600;
const MATCH_CHECK_DELAY_MS = 600;
const MATCH_FEEDBACK_DELAY_MS = 600;
const SOUND_VOLUME = {
  flip: 0.75,
  correct: 0.65,
  incorrect: 0.65,
  ticking: 0.45,
};
const BEST_TIME_STORAGE_KEY = "memory-game-best-time";

function getTickingPlaybackRate(timeLeft: number) {
  if (timeLeft <= 3) return 2.4;
  if (timeLeft <= 5) return 2;
  if (timeLeft <= 7) return 1.6;
  return 1.25;
}

type GameStatus = "playing" | "won" | "lost";
type MatchResult = "match" | "no-match" | null;
type GameScreenProps = {
  onGameEnd: (result: "won" | "lost", isNewBestTime?: boolean) => void;
};
export function GameScreen({ onGameEnd }: GameScreenProps) {
  const cards = useMemo(() => createShuffledCards(), []);

  const [flippedCardIds, setFlippedCardIds] = useState<string[]>([]);
  const [matchedCardIds, setMatchedCardIds] = useState<string[]>([]);
  const [moves, setMoves] = useState(0);
  const [isCheckingMatch, setIsCheckingMatch] = useState(false);

  const [matchResult, setMatchResult] = useState<MatchResult>(null);

  const [isMuted, setIsMuted] = useState(true);

  const [timeLeft, setTimeLeft] = useState(GAME_TIME_LIMIT);
  const [bestTime, setBestTime] = useState<number | null>(() => {
    const storedBestTime = localStorage.getItem(BEST_TIME_STORAGE_KEY);

    if (!storedBestTime) return null;

    const parsedBestTime = Number(storedBestTime);

    return Number.isFinite(parsedBestTime) ? parsedBestTime : null;
  });

  const tickingAudioRef = useRef<HTMLAudioElement | null>(null);
  const matchTimeoutsRef = useRef<number[]>([]);
  const hasGameEndedRef = useRef(false);
  const [gameStatus, setGameStatus] = useState<GameStatus>("playing");
  const isTimeRunningOut = timeLeft <= 10;
  const isBoardDisabled =
    gameStatus !== "playing" || isCheckingMatch || matchResult !== null;

  const endGame = useCallback(
    (result: "won" | "lost", isNewBestTime = false) => {
      if (hasGameEndedRef.current) return;
      hasGameEndedRef.current = true;

      setGameStatus(result);
      window.setTimeout(() => {
        onGameEnd(result, isNewBestTime);
      }, RESULT_SCREEN_DELAY_MS);
    },
    [onGameEnd]
  );
  useEffect(() => {
    if (gameStatus !== "playing") return;

    const timerId = window.setInterval(() => {
      setTimeLeft((currentTimeLeft) => {
        if (currentTimeLeft <= 1) {
          endGame("lost");
          return 0;
        }

        return currentTimeLeft - 1;
      });
    }, 1000);

    return () => {
      window.clearInterval(timerId);
    };
  }, [gameStatus, endGame]);

  useEffect(() => {
    tickingAudioRef.current = new Audio("/sound/ticking.mp3");
    tickingAudioRef.current.loop = true;
    tickingAudioRef.current.volume = SOUND_VOLUME.ticking;

    return () => {
      tickingAudioRef.current?.pause();
      tickingAudioRef.current = null;
    };
  }, []);

  useEffect(() => {
    const audio = tickingAudioRef.current;

    if (!audio) return;

    const shouldPlayTicking =
      gameStatus === "playing" && timeLeft <= 10 && timeLeft > 0 && !isMuted;

    if (!shouldPlayTicking) {
      audio.pause();
      audio.currentTime = 0;
      return;
    }

    audio.playbackRate = getTickingPlaybackRate(timeLeft);

    audio.play().catch(() => {
      // Browser autoplay protection.
    });
  }, [timeLeft, gameStatus, isMuted]);

  useEffect(() => {
    const pendingTimeouts = matchTimeoutsRef.current;
    return () => {
      pendingTimeouts.forEach((id) => window.clearTimeout(id));
    };
  }, []);

  function handleCardClick(cardId: string) {
    if (gameStatus !== "playing") return;
    const isAlreadyFlipped = flippedCardIds.includes(cardId);
    const isAlreadyMatched = matchedCardIds.includes(cardId);

    if (isAlreadyFlipped || isAlreadyMatched || isCheckingMatch) {
      return;
    }
    playSoundEffect(flipSound, SOUND_VOLUME.flip);
    if (flippedCardIds.length === 1) {
      setMoves((currentMoves) => currentMoves + 1);
      const firstCardId = flippedCardIds[0];
      const firstCard = cards.find((card) => card.id === firstCardId);
      const secondCard = cards.find((card) => card.id === cardId);

      if (!firstCard || !secondCard) return;

      const nextFlippedCardIds = [firstCardId, cardId];

      setFlippedCardIds(nextFlippedCardIds);
      setIsCheckingMatch(true);

      const checkTimeoutId = window.setTimeout(() => {
        const isMatch = firstCard.symbol === secondCard.symbol;

        if (isMatch) {
          setMatchResult("match");
          playSoundEffect(correctSound, SOUND_VOLUME.correct);

          const nextMatchedCardIds = [...matchedCardIds, firstCardId, cardId];

          setMatchedCardIds(nextMatchedCardIds);

          if (nextMatchedCardIds.length / 2 === TOTAL_PAIRS) {
            const elapsedTime = GAME_TIME_LIMIT - timeLeft;
            const isNewBestTime = bestTime === null || elapsedTime < bestTime;

            if (isNewBestTime) {
              localStorage.setItem(BEST_TIME_STORAGE_KEY, String(elapsedTime));
              setBestTime(elapsedTime);
            }
            confetti({
              particleCount: 140,
              spread: 80,
              origin: { y: 0.65 },
            });

            endGame("won", isNewBestTime);
          }
        } else {
          setMatchResult("no-match");
          playSoundEffect(incorrectSound, SOUND_VOLUME.incorrect);
        }

        setFlippedCardIds([]);

        const resetTimeoutId = window.setTimeout(() => {
          setMatchResult(null);
          setIsCheckingMatch(false);
        }, MATCH_FEEDBACK_DELAY_MS);
        matchTimeoutsRef.current.push(resetTimeoutId);
      }, MATCH_CHECK_DELAY_MS);
      matchTimeoutsRef.current.push(checkTimeoutId);
      return;
    }

    setFlippedCardIds([cardId]);
  }

  function playSoundEffect(sound: string, volume = 0.55) {
    if (isMuted) return;

    const audio = new Audio(sound);
    audio.volume = volume;

    audio.play().catch((error) => {
      console.error("Sound effect playback failed:", error);
    });
  }

  return (
    <main className="relative h-screen overflow-hidden bg-background px-5 py-4 text-text-primary sm:px-6 sm:py-8">
      <div className="stars-bg absolute inset-0" />
      <div className="cosmic-glow absolute inset-0" />

      <section className="relative z-10 mx-auto flex h-full w-full max-w-5xl flex-col">
        <header className="game-header-enter mb-3 shrink-0 border-b border-white/10 pb-3 sm:mb-8 sm:pb-6">
          <div className="flex items-start justify-between gap-3 sm:gap-4">
            <div className="min-w-0 flex-1">
              <p className="text-xs font-bold uppercase tracking-[0.28em] text-text-secondary sm:tracking-[0.35em]">
                Memory Game
              </p>

              <h1 className="mt-2 max-w-[11rem] text-2xl font-black leading-tight tracking-tight sm:max-w-none sm:text-4xl">
                Find the cosmic pairs
              </h1>
            </div>
            <div className="flex shrink-0 items-start gap-2 sm:items-center sm:gap-3">
              <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:gap-3">
                <div className="rounded-full border border-white/10 bg-black/20 px-3 py-1.5 text-[0.62rem] font-bold uppercase tracking-[0.16em] text-text-secondary backdrop-blur-sm sm:px-4 sm:py-2 sm:text-xs">
                  Best:{" "}
                  <span className="text-yellow-200">
                    {bestTime === null ? "--" : `${bestTime}s`}
                  </span>
                </div>

                <div className="rounded-full border border-white/10 bg-black/20 px-3 py-1.5 text-[0.62rem] font-bold uppercase tracking-[0.16em] text-text-secondary backdrop-blur-sm sm:px-4 sm:py-2 sm:text-xs">
                  Moves: <span className="text-yellow-200">{moves}</span>
                </div>
              </div>

              <SoundToggle
                isMuted={isMuted}
                onToggle={() => setIsMuted((currentIsMuted) => !currentIsMuted)}
              />
            </div>
          </div>
        </header>
        <div className="mx-auto mb-2 flex flex-col items-center sm:mb-5">
          <span
            className={`mb-1 text-[0.65rem] font-semibold uppercase tracking-[0.28em] ${
              isTimeRunningOut ? "text-red-100/80" : "text-yellow-100/70"
            }`}
          >
            Time
          </span>

          <div
            className={`mx-auto flex w-fit items-end justify-center gap-2 rounded-full border px-4 py-2 backdrop-blur-sm transition-all duration-300 sm:gap-3 sm:px-5 sm:py-3 ${
              isTimeRunningOut
                ? "timer-warning border-red-300/50 bg-red-950/30 shadow-[0_0_35px_rgba(248,113,113,0.25)]"
                : "border-yellow-200/30 bg-black/25 shadow-[0_0_30px_rgba(250,204,21,0.12)]"
            }`}
          >
            <span
              className={`font-mono text-3xl font-bold leading-none tabular-nums sm:text-5xl ${
                isTimeRunningOut ? "text-red-200" : "text-yellow-200"
              }`}
            >
              {timeLeft}
            </span>

            <span
              className={`pb-0.5 text-[0.65rem] font-semibold uppercase tracking-[0.2em] sm:pb-1 sm:text-sm ${
                isTimeRunningOut ? "text-red-100/80" : "text-yellow-100/70"
              }`}
            >
              s
            </span>
          </div>
        </div>
        <section className="flex min-h-0 flex-1 flex-col">
          <div className="game-board-enter flex min-h-0 flex-1 items-center justify-center">
            <div
              aria-label="Memory cards board"
              className="grid grid-cols-2 gap-3 sm:grid-cols-4 sm:gap-5"
            >
              {cards.map((card, index) => {
                const isFlipped =
                  flippedCardIds.includes(card.id) ||
                  matchedCardIds.includes(card.id);

                return (
                  <MemoryCard
                    key={card.id}
                    index={index}
                    icon={card.icon}
                    label={card.label}
                    isFlipped={isFlipped}
                    isDisabled={
                      isBoardDisabled || matchedCardIds.includes(card.id)
                    }
                    onClick={() => handleCardClick(card.id)}
                  />
                );
              })}
            </div>
          </div>
        </section>
      </section>
      <MatchResultModal result={matchResult} />
    </main>
  );
}
