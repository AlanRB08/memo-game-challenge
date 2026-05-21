import { useMemo, useState, useEffect, useRef } from "react";

import correctSound from "../assets/correct.mp3";
import incorrectSound from "../assets/incorrect.mp3";

import { createShuffledCards } from "../data/cards";
import { MemoryCard } from "./MemoryCard";
import { SoundToggle } from "./SoundToggle";

import { MatchResultModal } from "./MatchResultModal";

const GAME_TIME_LIMIT = 30;
const TOTAL_PAIRS = 4;

type GameStatus = "playing" | "won" | "lost";
type MatchResult = "match" | "no-match" | null;

export function GameScreen() {
  const cards = useMemo(() => createShuffledCards(), []);

  const [flippedCardIds, setFlippedCardIds] = useState<string[]>([]);
  const [matchedCardIds, setMatchedCardIds] = useState<string[]>([]);
  const [isCheckingMatch, setIsCheckingMatch] = useState(false);

  const [matchResult, setMatchResult] = useState<MatchResult>(null);

  const [isMuted, setIsMuted] = useState(true);

  const [timeLeft, setTimeLeft] = useState(GAME_TIME_LIMIT);
  const tickingAudioRef = useRef<HTMLAudioElement | null>(null);

  const [gameStatus, setGameStatus] = useState<GameStatus>("playing");

  const isBoardDisabled =
    gameStatus !== "playing" || isCheckingMatch || matchResult !== null;

  const stopTickingSound = () => {
    const audio = tickingAudioRef.current;

    if (!audio) return;

    audio.pause();
    audio.currentTime = 0;
  };
  useEffect(() => {
    if (gameStatus !== "playing") return;

    const timerId = window.setInterval(() => {
      setTimeLeft((currentTimeLeft) => {
        if (currentTimeLeft <= 1) {
          setGameStatus("lost");
          return 0;
        }

        return currentTimeLeft - 1;
      });
    }, 1000);

    return () => {
      window.clearInterval(timerId);
    };
  }, [gameStatus]);
  useEffect(() => {
    tickingAudioRef.current = new Audio("/sound/ticking.mp3");
    tickingAudioRef.current.loop = true;
    tickingAudioRef.current.volume = 0.5;
    tickingAudioRef.current.playbackRate = 3;

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

    audio.play().catch(() => {
      // Browser autoplay protection.
    });
  }, [timeLeft, gameStatus, isMuted]);
  useEffect(() => {
    const matchedPairs = matchedCardIds.length / 2;

    if (matchedPairs === TOTAL_PAIRS) {
      setGameStatus("won");
    }
  }, [matchedCardIds]);

  function handleCardClick(cardId: string) {
    if (gameStatus !== "playing") return;
    const isAlreadyFlipped = flippedCardIds.includes(cardId);
    const isAlreadyMatched = matchedCardIds.includes(cardId);

    if (isAlreadyFlipped || isAlreadyMatched || isCheckingMatch) {
      return;
    }

    if (flippedCardIds.length === 1) {
      const firstCardId = flippedCardIds[0];
      const firstCard = cards.find((card) => card.id === firstCardId);
      const secondCard = cards.find((card) => card.id === cardId);

      if (!firstCard || !secondCard) return;

      const nextFlippedCardIds = [firstCardId, cardId];

      setFlippedCardIds(nextFlippedCardIds);
      setIsCheckingMatch(true);

      window.setTimeout(() => {
        const isMatch = firstCard.symbol === secondCard.symbol;

        if (isMatch) {
          setMatchResult("match");
          playSoundEffect(correctSound);

          setMatchedCardIds((currentMatchedCardIds) => [
            ...currentMatchedCardIds,
            firstCardId,
            cardId,
          ]);
        } else {
          setMatchResult("no-match");
          playSoundEffect(incorrectSound);
        }

        setFlippedCardIds([]);

        window.setTimeout(() => {
          setMatchResult(null);
          setIsCheckingMatch(false);
        }, 900);
      }, 900);

      return;
    }

    setFlippedCardIds([cardId]);
  }

  function playSoundEffect(sound: string) {
    if (isMuted) return;

    const audio = new Audio(sound);
    audio.volume = 0.55;

    audio.play().catch((error) => {
      console.error("Sound effect playback failed:", error);
    });
  }

  return (
    <main className="relative h-screen overflow-hidden bg-background px-5 py-6 text-text-primary sm:px-6 sm:py-8">
      <div className="stars-bg absolute inset-0" />
      <div className="cosmic-glow absolute inset-0" />

      <section className="relative z-10 mx-auto flex h-full w-full max-w-5xl flex-col">
        <header className="mb-5 shrink-0 border-b border-white/10 pb-5 sm:mb-8 sm:pb-6">
          <div className="flex items-start justify-between gap-4">
            <div className="min-w-0 flex-1">
              <p className="text-xs font-bold uppercase tracking-[0.28em] text-text-secondary sm:tracking-[0.35em]">
                Memory Game
              </p>

              <h1 className="mt-2 max-w-[13rem] text-2xl font-black leading-tight tracking-tight sm:max-w-none sm:text-4xl">
                Find the cosmic pairs
              </h1>
            </div>

            <div className="flex shrink-0 items-center gap-3">
              <div
                aria-label={`Time left: ${timeLeft} seconds`}
                className={`rounded-full border px-4 py-2 text-sm font-black tabular-nums shadow-lg backdrop-blur-md sm:text-base ${
                  timeLeft <= 10
                    ? "border-red-300/50 bg-red-500/20 text-red-100"
                    : "border-white/15 bg-white/10 text-white"
                }`}
              >
                {timeLeft}s
              </div>

              <SoundToggle
                isMuted={isMuted}
                onToggle={() => setIsMuted((currentIsMuted) => !currentIsMuted)}
              />
            </div>
          </div>
        </header>

        <section className="flex min-h-0 flex-1 flex-col">
          <MatchResultModal result={matchResult} />

          <div className="flex min-h-0 flex-1 items-center justify-center">
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
    </main>
  );
}
