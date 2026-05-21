import questionMarkIcon from "../assets/question-mark.svg";

type MemoryCardProps = {
  index: number;
  icon: string;
  label: string;
  isFlipped: boolean;
};

export function MemoryCard({ index, icon, label, isFlipped }: MemoryCardProps) {
  return (
    <button
      type="button"
      aria-label={
        isFlipped ? `${label} card` : `Hidden memory card ${index + 1}`
      }
      className="group relative cursor-pointer aspect-square w-[clamp(4.5rem,22vw,8rem)] overflow-hidden rounded-2xl border border-white/15 shadow-[0_12px_30px_rgba(0,0,0,0.28)] transition duration-300 ease-out hover:-translate-y-1.5 hover:scale-[1.03] hover:border-yellow-200/50 hover:shadow-[0_18px_40px_rgba(250,204,21,0.18)] focus:outline-none focus:ring-2 focus:ring-yellow-300 focus:ring-offset-2 focus:ring-offset-background active:translate-y-0 active:scale-[0.98] sm:w-[clamp(6rem,14vw,10rem)]"
    >
      {isFlipped ? (
        <span className="relative flex h-full w-full items-center justify-center rounded-2xl border border-yellow-200/30 bg-gradient-to-br from-yellow-100 via-white to-yellow-200">
          <span className="absolute inset-0 bg-[radial-gradient(circle_at_50%_35%,rgba(255,255,255,0.95),transparent_45%)]" />

          <img
            src={icon}
            alt=""
            aria-hidden="true"
            className="relative h-[48%] w-[48%] drop-shadow-[0_8px_16px_rgba(0,0,0,0.25)] transition duration-300 ease-out group-hover:scale-110"
          />
        </span>
      ) : (
        <span className="relative flex h-full w-full items-center justify-center rounded-2xl bg-card-back">
          <span className="absolute inset-0 rounded-2xl bg-gradient-to-br from-white/20 via-transparent to-black/20 opacity-80" />

          <span className="absolute inset-[6px] rounded-xl border border-white/10 bg-white/5" />

          <img
            src={questionMarkIcon}
            alt=""
            aria-hidden="true"
            className="relative h-[42%] w-[42%] drop-shadow-[0_0_14px_rgba(250,204,21,0.55)] transition duration-300 ease-out group-hover:scale-110 group-hover:drop-shadow-[0_0_20px_rgba(250,204,21,0.75)]"
          />
        </span>
      )}
    </button>
  );
}
