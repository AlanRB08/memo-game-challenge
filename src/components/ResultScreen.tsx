import restartIcon from "../assets/restart.svg";

type ResolveScreenProps = {
  result: "won" | "lost";
  onPlayAgain: () => void;
};

export function ResolveScreen({ result, onPlayAgain }: ResolveScreenProps) {
  const title =
    result === "won"
      ? "Congratulations, you did it!"
      : "Oops, you were close, good luck next time";

  const description =
    result === "won"
      ? "You found all the cosmic pairs before time ran out."
      : "Time ran out before you completed the board.";

  return (
    <main className="relative flex h-screen overflow-hidden bg-background px-5 py-6 text-text-primary sm:px-6 sm:py-8">
      <div className="stars-bg absolute inset-0" />
      <div className="cosmic-glow absolute inset-0" />

      <section className="resolve-screen-enter relative z-10 mx-auto flex w-full max-w-3xl flex-col items-center justify-center text-center">
        <p className="resolve-eyebrow-enter text-xs font-bold uppercase tracking-[0.35em] text-text-secondary">
          Memory Game
        </p>

        <h1 className="resolve-title-enter mt-4 text-4xl font-black leading-tight tracking-tight sm:text-6xl">
          {title}
        </h1>

        <p className="resolve-description-enter mt-5 max-w-md text-base leading-7 text-text-secondary sm:text-lg">
          {description}
        </p>

        <div className="resolve-button-enter mt-12 sm:mt-14">
          <button
            type="button"
            onClick={onPlayAgain}
            aria-label="Play again"
            className="inline-flex cursor-pointer items-center justify-center gap-3 rounded-full bg-yellow-300 px-8 py-4 text-base font-black uppercase tracking-[0.18em] text-slate-950 shadow-[0_0_30px_rgba(253,224,71,0.35)] transition-transform duration-200 hover:button-pop focus:outline-none focus:ring-4 focus:ring-yellow-200/60"
          >
            <span>Play Again</span>

            <span
              aria-hidden="true"
              className="flex size-5 items-center justify-center sm:size-6"
            >
              <img src={restartIcon} alt="" />
            </span>
          </button>
        </div>
      </section>
    </main>
  );
}
