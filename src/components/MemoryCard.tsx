import questionMarkIcon from "../assets/question-mark.svg";

type MemoryCardProps = {
  index: number;
};

export function MemoryCard({ index }: MemoryCardProps) {
  return (
    <button
      type="button"
      aria-label={`Memory card ${index + 1}`}
      className="group relative cursor-pointer aspect-square w-[clamp(4.5rem,22vw,8rem)] rounded-2xl border border-white/15 bg-card-back shadow-[0_12px_30px_rgba(0,0,0,0.28)] transition duration-300 ease-out hover:-translate-y-1.5 hover:scale-[1.03] hover:border-yellow-200/50 hover:shadow-[0_18px_40px_rgba(250,204,21,0.18)] focus:outline-none focus:ring-2 focus:ring-yellow-300 focus:ring-offset-2 focus:ring-offset-background active:translate-y-0 active:scale-[0.98] sm:w-[clamp(6rem,14vw,10rem)]"
    >
      <span className="absolute inset-0 rounded-2xl bg-gradient-to-br from-white/20 via-transparent to-black/20 opacity-80" />

      <span className="absolute inset-[6px] rounded-xl border border-white/10 bg-white/5" />

      <span className="relative flex h-full w-full items-center justify-center">
        <img
          src={questionMarkIcon}
          alt=""
          aria-hidden="true"
          className="h-[42%] w-[42%] drop-shadow-[0_0_14px_rgba(250,204,21,0.55)] transition duration-300 ease-out group-hover:scale-110 group-hover:drop-shadow-[0_0_20px_rgba(250,204,21,0.75)]"
        />
      </span>
    </button>
  );
}
