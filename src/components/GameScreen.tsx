import { useMemo, useState } from "react";

import { createShuffledCards } from "../data/cards";
import { MemoryCard } from "./MemoryCard";
import { SoundToggle } from "./SoundToggle";

import { MatchResultModal } from "./MatchResultModal";

type MatchResult = "match" | "no-match" | null;

export function GameScreen() {
  const cards = useMemo(() => createShuffledCards(), []);

  const [flippedCardIds, setFlippedCardIds] = useState<string[]>([]);
  const [matchedCardIds, setMatchedCardIds] = useState<string[]>([]);
  const [isCheckingMatch, setIsCheckingMatch] = useState(false);

  const [matchResult, setMatchResult] = useState<MatchResult>(null);

  const isBoardDisabled = isCheckingMatch || matchResult !== null;
  function handleCardClick(cardId: string) {
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

          setMatchedCardIds((currentMatchedCardIds) => [
            ...currentMatchedCardIds,
            firstCardId,
            cardId,
          ]);
        } else {
          setMatchResult("no-match");
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

            <SoundToggle />
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
