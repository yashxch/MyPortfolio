"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { useSound } from "../ui/AudioToggle";

export default function Footer() {
  const [time, setTime] = useState<string>("");
  const { playHover, playClick } = useSound();

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      // Format time in Asia/Kolkata (Chennai)
      const formatted = now.toLocaleTimeString("en-US", {
        timeZone: "Asia/Kolkata",
        hour12: false,
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
      });
      setTime(formatted);
    };

    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <footer className="w-full border-t border-white/10 bg-neutral-950/80 text-neutral-400 py-16 px-6 sm:px-12 md:px-16 mt-24">
      <div className="max-w-7xl mx-auto flex flex-col gap-12">
        {/* Top Grid */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 pb-12 border-b border-white/10">
          <div className="flex flex-col gap-2">
            <span className="font-mono text-sm font-semibold tracking-wider text-white uppercase">
              YASHWANTH CH
            </span>
            <p className="text-xs text-neutral-400 max-w-xs leading-relaxed">
              Software engineer building systems across AI, automation, cloud and infrastructure.
            </p>
          </div>

          <div className="flex flex-col gap-2 font-mono text-xs">
            <span className="text-neutral-400 tracking-wider uppercase">// SYSTEM TELEMETRY</span>
            <div className="flex items-center gap-2 text-white">
              <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-pulse" />
              <span>SYSTEM STATUS — ONLINE</span>
            </div>
            <div className="text-neutral-400">
              CHENNAI TIME: <span className="text-neutral-300 font-bold">{time || "17:00:00"} IST</span>
            </div>
            <div className="text-neutral-400">COORD: 13.0827° N, 80.2707° E</div>
          </div>

          <div className="flex flex-col gap-2 font-mono text-xs">
            <span className="text-neutral-400 tracking-wider uppercase">// NAVIGATION</span>
            <div className="flex flex-col gap-1 text-neutral-300">
              <Link
                href="/work"
                onMouseEnter={() => playHover()}
                onClick={() => playClick()}
                className="hover:text-emerald-400 transition-colors"
              >
                01 Selected Work
              </Link>
              <Link
                href="/about"
                onMouseEnter={() => playHover()}
                onClick={() => playClick()}
                className="hover:text-emerald-400 transition-colors"
              >
                02 About & Philosophy
              </Link>
              <Link
                href="/experience"
                onMouseEnter={() => playHover()}
                onClick={() => playClick()}
                className="hover:text-emerald-400 transition-colors"
              >
                03 Experience & Leadership
              </Link>
              <Link
                href="/contact"
                onMouseEnter={() => playHover()}
                onClick={() => playClick()}
                className="hover:text-emerald-400 transition-colors"
              >
                04 Contact
              </Link>
              <Link
                href="/resume"
                onMouseEnter={() => playHover()}
                onClick={() => playClick()}
                className="hover:text-emerald-400 transition-colors"
              >
                05 Digital Résumé
              </Link>
            </div>
          </div>

          <div className="flex flex-col gap-2 font-mono text-xs">
            <span className="text-neutral-400 tracking-wider uppercase">// CONNECT</span>
            <div className="flex flex-col gap-1.5 text-neutral-300">
              <a
                href="https://github.com/yashxch"
                target="_blank"
                rel="noreferrer"
                onMouseEnter={() => playHover()}
                className="flex items-center gap-1 hover:text-white transition-colors"
                data-cursor="OPEN ↗"
              >
                GitHub <ArrowUpRight className="w-3 h-3 opacity-60" />
              </a>
              <a
                href="https://www.linkedin.com/in/yashwanthchalumuri"
                target="_blank"
                rel="noreferrer"
                onMouseEnter={() => playHover()}
                className="flex items-center gap-1 hover:text-white transition-colors"
                data-cursor="OPEN ↗"
              >
                LinkedIn <ArrowUpRight className="w-3 h-3 opacity-60" />
              </a>
              <Link
                href="/contact"
                onMouseEnter={() => playHover()}
                onClick={() => playClick()}
                className="flex items-center gap-1 hover:text-white transition-colors"
                data-cursor="WRITE"
              >
                Email Hub <ArrowUpRight className="w-3 h-3 opacity-60" />
              </Link>
            </div>
          </div>
        </div>

        {/* Bottom Metadata */}
        <div className="flex flex-col sm:flex-row items-center justify-between text-xs font-mono text-neutral-400 gap-4">
          <div className="flex items-center gap-4">
            <span>© {new Date().getFullYear()} YASHWANTH CH</span>
            <span className="hidden sm:inline">·</span>
            <span>CHENNAI, INDIA</span>
          </div>
          <div className="text-neutral-400">
            <span>Built with curiosity. Reinterpreting systems.</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
