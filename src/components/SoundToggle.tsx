import { useEffect, useRef } from "react";

import soundOnIcon from "../assets/sound--on.svg";
import soundOffIcon from "../assets/sound--off.svg";
import backgroundMusic from "../assets/background.mp3";

type SoundToggleProps = {
  isMuted: boolean;
  onToggle: () => void;
};

export function SoundToggle({ isMuted, onToggle }: SoundToggleProps) {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  useEffect(() => {
    audioRef.current = new Audio(backgroundMusic);
    audioRef.current.loop = true;
    audioRef.current.volume = 0.22;

    return () => {
      audioRef.current?.pause();
      audioRef.current = null;
    };
  }, []);

  useEffect(() => {
    const audio = audioRef.current;

    if (!audio) return;

    if (isMuted) {
      audio.pause();
      return;
    }

    audio.play().catch((error) => {
      console.error("Background music playback failed:", error);
    });
  }, [isMuted]);

  return (
    <button
      type="button"
      onClick={onToggle}
      aria-label={isMuted ? "Unmute background music" : "Mute background music"}
      aria-pressed={!isMuted}
      title={isMuted ? "Unmute music" : "Mute music"}
      className="flex cursor-pointer h-10 w-10 shrink-0 items-center justify-center rounded-full border border-yellow-200/60 bg-yellow-100/95 shadow-[0_0_24px_rgba(250,204,21,0.25)] backdrop-blur-md transition duration-200 hover:scale-105 hover:bg-yellow-50 focus:outline-none focus:ring-2 focus:ring-yellow-300 focus:ring-offset-2 focus:ring-offset-background sm:h-11 sm:w-11"
    >
      <img
        src={isMuted ? soundOffIcon : soundOnIcon}
        alt=""
        aria-hidden="true"
        className="h-4 w-4 sm:h-5 sm:w-5"
      />
    </button>
  );
}
