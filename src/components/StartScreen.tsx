import logo from "../assets/logo.svg";

type StartScreenProps = {
  onStart: () => void;
};

export function StartScreen({ onStart }: StartScreenProps) {
  return (
    <main className="relative min-h-screen overflow-hidden bg-background text-text-primary">
      <div className="stars-bg absolute inset-0" />
      <div className="cosmic-glow absolute inset-0" />

      <section className="relative z-10 flex min-h-screen items-center justify-center px-6 py-12">
        <div className="w-full max-w-2xl text-center">
          <div className="start-logo-reveal mb-8">
            <img
              src={logo}
              alt="Memory Game logo"
              className="mx-auto h-28 w-auto sm:h-36"
            />
          </div>

          <p className="mb-4 text-xs font-bold uppercase tracking-[0.45em] text-text-secondary sm:text-sm">
            Cosmic Challenge
          </p>

          <h1 className="text-5xl font-black tracking-tight sm:text-7xl">
            Memory Game
          </h1>

          <p className="mx-auto mt-5 max-w-md text-base leading-7 text-text-secondary sm:text-lg">
            Match every cosmic pair before the timer runs out.
          </p>

          <div className="start-button-reveal mt-11">
            <button
              type="button"
              onClick={onStart}
              aria-label="Start memory game"
              className="group relative inline-flex min-w-44 cursor-pointer items-center justify-center overflow-hidden rounded-full border border-card-mark/50 bg-card-mark px-9 py-4 text-base font-black uppercase tracking-[0.18em] text-background shadow-[0_18px_50px_rgba(250,204,21,0.22)] transition-shadow duration-300 ease-out hover:button-pop hover:shadow-[0_22px_70px_rgba(250,204,21,0.38)] active:scale-[0.98]"
            >
              <span className="absolute inset-0 -translate-x-full bg-gradient-to-r from-white/0 via-white/35 to-white/0 opacity-0 transition duration-700 group-hover:translate-x-full group-hover:opacity-100" />

              <span className="relative z-10">Start</span>
            </button>
          </div>
        </div>
      </section>
    </main>
  );
}
