"use client";

import { useState, useEffect, createContext, useContext } from "react";
import { Volume2, VolumeX } from "lucide-react";

interface SoundContextType {
  soundEnabled: boolean;
  toggleSound: () => void;
  playClick: () => void;
  playHover: () => void;
  playSuccess: () => void;
}

const SoundContext = createContext<SoundContextType>({
  soundEnabled: false,
  toggleSound: () => {},
  playClick: () => {},
  playHover: () => {},
  playSuccess: () => {},
});

export const useSound = () => useContext(SoundContext);

export function SoundProvider({ children }: { children: React.ReactNode }) {
  const [soundEnabled, setSoundEnabled] = useState(false);
  const [audioCtx, setAudioCtx] = useState<AudioContext | null>(null);

  useEffect(() => {
    // Only init AudioContext upon interaction if enabled
    if (soundEnabled && !audioCtx && typeof window !== "undefined") {
      const ctx = new (window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext)();
      setAudioCtx(ctx);
    }
  }, [soundEnabled, audioCtx]);

  const toggleSound = () => {
    setSoundEnabled((prev) => !prev);
  };

  const playClick = () => {
    if (!soundEnabled) return;
    try {
      const ctx = audioCtx || new (window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext)();
      if (ctx.state === "suspended") ctx.resume();
      
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      
      osc.type = "sine";
      osc.frequency.setValueAtTime(600, ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(180, ctx.currentTime + 0.04);
      
      gain.gain.setValueAtTime(0.04, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.04);
      
      osc.connect(gain);
      gain.connect(ctx.destination);
      
      osc.start();
      osc.stop(ctx.currentTime + 0.04);
    } catch {
      // Audio fallback
    }
  };

  const playHover = () => {
    if (!soundEnabled) return;
    try {
      const ctx = audioCtx || new (window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext)();
      if (ctx.state === "suspended") ctx.resume();
      
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      
      osc.type = "triangle";
      osc.frequency.setValueAtTime(900, ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(1200, ctx.currentTime + 0.02);
      
      gain.gain.setValueAtTime(0.015, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.0005, ctx.currentTime + 0.02);
      
      osc.connect(gain);
      gain.connect(ctx.destination);
      
      osc.start();
      osc.stop(ctx.currentTime + 0.02);
    } catch {
      // Audio fallback
    }
  };

  const playSuccess = () => {
    if (!soundEnabled) return;
    try {
      const ctx = audioCtx || new (window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext)();
      if (ctx.state === "suspended") ctx.resume();
      
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      
      osc.type = "sine";
      osc.frequency.setValueAtTime(520, ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(880, ctx.currentTime + 0.08);
      
      gain.gain.setValueAtTime(0.03, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.09);
      
      osc.connect(gain);
      gain.connect(ctx.destination);
      
      osc.start();
      osc.stop(ctx.currentTime + 0.09);
    } catch {
      // Audio fallback
    }
  };

  return (
    <SoundContext.Provider value={{ soundEnabled, toggleSound, playClick, playHover, playSuccess }}>
      {children}
    </SoundContext.Provider>
  );
}

export function AudioToggleButton() {
  const { soundEnabled, toggleSound, playClick } = useSound();

  return (
    <button
      onClick={() => {
        toggleSound();
        if (!soundEnabled) playClick();
      }}
      className="flex items-center gap-1.5 px-2.5 py-1 text-[11px] font-mono tracking-wider uppercase rounded-full border border-white/10 bg-black/40 backdrop-blur-md text-neutral-400 hover:text-white hover:border-white/20 transition-colors"
      title={soundEnabled ? "Mute audio cues" : "Enable tactile sound feedback"}
    >
      {soundEnabled ? (
        <>
          <Volume2 className="w-3 h-3 text-emerald-400 animate-pulse" />
          <span className="hidden sm:inline">Sound ON</span>
        </>
      ) : (
        <>
          <VolumeX className="w-3 h-3 text-neutral-500" />
          <span className="hidden sm:inline">Sound OFF</span>
        </>
      )}
    </button>
  );
}
