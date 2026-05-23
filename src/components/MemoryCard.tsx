import questionMarkIcon from "../assets/question-mark.svg";

type MemoryCardProps = {
  index: number;
  icon: string;
  label: string;
  isFlipped: boolean;
  isDisabled: boolean;
  onClick: () => void;
};

export function MemoryCard({
  index,
  icon,
  label,
  isFlipped,
  isDisabled,
  onClick,
}: MemoryCardProps) {
  const canInteract = !isDisabled && !isFlipped;

  return (
    <button
      type="button"
      onClick={onClick}
      disabled={!canInteract}
      aria-label={
        isFlipped ? `${label} card` : `Hidden memory card ${index + 1}`
      }
      aria-pressed={isFlipped}
      className={`group relative select-none aspect-square w-[clamp(4.5rem,22vw,8rem)] rounded-2xl [perspective:1000px] focus:outline-none focus:ring-2 focus:ring-yellow-300 focus:ring-offset-2 focus:ring-offset-background disabled:cursor-default sm:w-[clamp(6rem,14vw,10rem)] ${
        canInteract ? "cursor-pointer" : "cursor-default"
      }`}
    >
      <span
        className={`relative block h-full w-full rounded-2xl transition-transform duration-500 ease-out [transform-style:preserve-3d] [-webkit-transform-style:preserve-3d] ${
          isFlipped
            ? "[transform:rotateY(180deg)]"
            : canInteract
            ? "group-hover:-translate-y-1.5 group-hover:scale-[1.03] group-active:translate-y-0 group-active:scale-[0.98]"
            : ""
        }`}
      >
        <span className="absolute inset-0 flex items-center justify-center overflow-hidden rounded-2xl border border-white/15 bg-card-back shadow-[0_12px_30px_rgba(0,0,0,0.28)] [backface-visibility:hidden] [-webkit-backface-visibility:hidden] [transform:rotateY(0deg)] [translateZ:0] group-hover:border-yellow-200/50 group-hover:shadow-[0_18px_40px_rgba(250,204,21,0.18)]">
          <span className="absolute inset-0 rounded-2xl bg-gradient-to-br from-white/20 via-transparent to-black/20 opacity-80" />
          <span className="absolute inset-[6px] rounded-xl border border-white/10 bg-white/5" />

          <span className="relative transform-gpu flex h-[42%] w-[42%] items-center justify-center drop-shadow-[0_0_14px_rgba(250,204,21,0.55)] transition-transform duration-300 ease-out group-hover:scale-110 group-hover:drop-shadow-[0_0_20px_rgba(250,204,21,0.75)]">
            <img
              src={questionMarkIcon}
              alt=""
              draggable={false}
              aria-hidden="true"
              className="block h-full w-full shrink-0"
            />
          </span>
        </span>

        <span className="absolute inset-0 flex items-center justify-center overflow-hidden rounded-2xl border border-yellow-200/30 bg-gradient-to-br from-yellow-100 via-white to-yellow-200 shadow-[0_18px_40px_rgba(250,204,21,0.2)] [backface-visibility:hidden] [-webkit-backface-visibility:hidden] [transform:rotateY(180deg)] [translateZ:0]">
          <span className="absolute inset-0 bg-[radial-gradient(circle_at_50%_35%,rgba(255,255,255,0.95),transparent_45%)]" />
          <span className="absolute inset-[6px] rounded-xl border border-yellow-300/30" />

          <span className="relative transform-gpu flex h-[50%] w-[50%] items-center justify-center drop-shadow-[0_8px_16px_rgba(0,0,0,0.25)] transition-transform duration-300 ease-out group-hover:scale-110">
            <img
              src={icon}
              alt=""
              draggable={false}
              aria-hidden="true"
              className="block h-full w-full shrink-0"
            />
          </span>
        </span>
      </span>
    </button>
  );
}
