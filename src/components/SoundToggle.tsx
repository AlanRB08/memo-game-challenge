import { useEffect, useRef, useState } from "react";

import soundOnIcon from "../assets/sound--on.svg";
import soundOffIcon from "../assets/sound--off.svg";
import backgroundMusic from "../assets/background.mp3";

export function SoundToggle() {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [isMuted, setIsMuted] = useState(true);

  useEffect(() => {
    audioRef.current = new Audio(backgroundMusic);
    audioRef.current.loop = true;
    audioRef.current.volume = 0.35;

    return () => {
      audioRef.current?.pause();
      audioRef.current = null;
    };
  }, []);

  const handleToggleSound = async () => {
    const audio = audioRef.current;

    if (!audio) return;

    if (isMuted) {
      try {
        await audio.play();
        setIsMuted(false);
      } catch (error) {
        console.error("Audio playback failed:", error);
      }

      return;
    }

    audio.pause();
    setIsMuted(true);
  };

  return (
    <button
      type="button"
      onClick={handleToggleSound}
      aria-label={isMuted ? "Unmute background music" : "Mute background music"}
      aria-pressed={!isMuted}
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
