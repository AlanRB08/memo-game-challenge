import { useMemo } from "react";

import { createShuffledCards } from "../data/cards";
import { MemoryCard } from "./MemoryCard";
import { SoundToggle } from "./SoundToggle";

export function GameScreen() {
  const cards = useMemo(() => createShuffledCards(), []);

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

        <section className="flex min-h-0 flex-1 items-center justify-center">
          <div
            aria-label="Memory cards board"
            className="grid grid-cols-2 gap-3 sm:grid-cols-4 sm:gap-5"
          >
            {cards.map((card, index) => (
              <MemoryCard
                key={card.id}
                index={index}
                icon={card.icon}
                label={card.label}
                isFlipped={false}
              />
            ))}
          </div>
        </section>
      </section>
    </main>
  );
}
