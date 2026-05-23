import checkIcon from "../assets/check-circle.svg";
import xIcon from "../assets/xIcon.svg";

type MatchResult = "match" | "no-match";

type MatchResultModalProps = {
  result: MatchResult | null;
};

const modalContent = {
  match: {
    title: "Nice!",
    message: "It's a match",
    icon: checkIcon,
    styles:
      "border-emerald-200/50 bg-emerald-50/90 text-emerald-950 shadow-[0_18px_45px_rgba(16,185,129,0.22)]",
    iconWrapper: "bg-emerald-100/90 ring-emerald-300/40",
  },
  "no-match": {
    title: "Sorry",
    message: "But this is not a match",
    icon: xIcon,
    styles:
      "border-red-200/50 bg-red-50/90 text-red-950 shadow-[0_18px_45px_rgba(239,68,68,0.22)]",
    iconWrapper: "bg-red-100/90 ring-red-300/40",
  },
};

export function MatchResultModal({ result }: MatchResultModalProps) {
  const content = result ? modalContent[result] : null;

  return (
    <>
      <span
        role="status"
        aria-live="polite"
        aria-atomic="true"
        className="sr-only"
      >
        {content?.message ?? ""}
      </span>

      {content && (
        <div className="pop-enter pointer-events-none fixed inset-x-0 bottom-5 z-50 flex justify-center px-4 sm:bottom-8">
          <div
            className={`flex w-full max-w-[18rem] items-center gap-3 rounded-[1.65rem] border px-4 py-3 backdrop-blur-xl transition duration-300 sm:max-w-sm sm:gap-4 sm:rounded-[2rem] sm:px-5 ${content.styles}`}
          >
            <span
              className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-full ring-1 sm:h-10 sm:w-10 ${content.iconWrapper}`}
            >
              <img
                src={content.icon}
                alt=""
                aria-hidden="true"
                className="h-4 w-4 sm:h-5 sm:w-5"
              />
            </span>

            <div className="min-w-0">
              <p className="text-[0.65rem] font-black uppercase tracking-[0.2em] opacity-65 sm:text-xs">
                {content.title}
              </p>

              <p className="mt-0.5 text-sm font-black leading-tight sm:text-lg">
                {content.message}
              </p>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
