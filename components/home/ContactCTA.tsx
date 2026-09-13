"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowUpRight, Check, Copy, Mail } from "lucide-react";
import MagneticButton from "../ui/MagneticButton";
import { useSound } from "../ui/AudioToggle";

export default function ContactCTA() {
  const [copied, setCopied] = useState(false);
  const email = "yashspam15@gmail.com";
  const { playClick, playSuccess, playHover } = useSound();

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(email);
    setCopied(true);
    playSuccess();
    setTimeout(() => setCopied(false), 2400);
  };

  return (
    <section className="w-full px-6 sm:px-12 md:px-16 py-32 border-b border-white/10 relative overflow-hidden">
      <div className="max-w-7xl mx-auto flex flex-col gap-12">
        <div className="flex flex-col gap-4">
          <span className="font-mono text-xs text-neutral-400 tracking-widest uppercase">
            // GET IN TOUCH
          </span>
          <h2 className="text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-bold tracking-tight text-white uppercase text-editorial-title max-w-4xl">
            Let&apos;s build something.
          </h2>
          <p className="text-lg sm:text-xl text-neutral-400 font-light max-w-2xl leading-relaxed">
            Interested in discussing systems engineering, distributed infrastructure, AI pipelines, or technical opportunities.
          </p>
        </div>

        {/* Interactive Magnetic Email & Links */}
        <div className="flex flex-wrap items-center gap-4 pt-4">
          <MagneticButton
            onClick={handleCopyEmail}
            dataCursor={copied ? "COPIED" : "COPY EMAIL"}
            className="group px-6 py-3.5 rounded-full bg-white text-black font-mono text-xs font-semibold tracking-wider uppercase hover:bg-neutral-200 transition-all flex items-center gap-2.5 shadow-xl"
          >
            <Mail className="w-4 h-4 text-neutral-800" />
            <span>{copied ? "EMAIL COPIED TO CLIPBOARD" : email}</span>
            {copied ? (
              <Check className="w-4 h-4 text-emerald-600 animate-bounce" />
            ) : (
              <Copy className="w-3.5 h-3.5 text-neutral-500 group-hover:text-black transition-colors" />
            )}
          </MagneticButton>

          <a
            href="https://www.linkedin.com/in/yashwanthchalumuri"
            target="_blank"
            rel="noreferrer"
            onMouseEnter={() => playHover()}
            onClick={() => playClick()}
            data-cursor="LINKEDIN ↗"
            className="px-6 py-3.5 rounded-full border border-white/15 bg-neutral-900/60 text-white font-mono text-xs tracking-wider uppercase hover:border-white/40 transition-colors flex items-center gap-2"
          >
            <span>LinkedIn</span>
            <ArrowUpRight className="w-3.5 h-3.5 opacity-60" />
          </a>

          <a
            href="https://github.com/yashxch"
            target="_blank"
            rel="noreferrer"
            onMouseEnter={() => playHover()}
            onClick={() => playClick()}
            data-cursor="GITHUB ↗"
            className="px-6 py-3.5 rounded-full border border-white/15 bg-neutral-900/60 text-white font-mono text-xs tracking-wider uppercase hover:border-white/40 transition-colors flex items-center gap-2"
          >
            <span>GitHub</span>
            <ArrowUpRight className="w-3.5 h-3.5 opacity-60" />
          </a>

          <Link
            href="/contact"
            onMouseEnter={() => playHover()}
            onClick={() => playClick()}
            data-cursor="CONTACT"
            className="px-6 py-3.5 rounded-full border border-white/15 bg-neutral-900/60 text-white font-mono text-xs tracking-wider uppercase hover:border-white/40 transition-colors flex items-center gap-2"
          >
            <span>Contact Hub</span>
            <ArrowUpRight className="w-3.5 h-3.5 opacity-60" />
          </Link>
        </div>
      </div>
    </section>
  );
}
