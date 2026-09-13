"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowUpRight, Check, Copy, Mail, MapPin, Send, Terminal } from "lucide-react";
import PageTransition from "@/components/layout/PageTransition";
import MagneticButton from "@/components/ui/MagneticButton";
import StatusBadge from "@/components/ui/StatusBadge";
import { useSound } from "@/components/ui/AudioToggle";

export default function ContactPage() {
  const [copied, setCopied] = useState(false);
  const email = "yashspam15@gmail.com";
  const phone = "+91 8217854968";
  const { playClick, playSuccess, playHover } = useSound();

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(email);
    setCopied(true);
    playSuccess();
    setTimeout(() => setCopied(false), 2400);
  };

  return (
    <PageTransition>
      <div className="w-full px-6 sm:px-12 md:px-16 pt-36 pb-24 max-w-5xl mx-auto flex flex-col gap-16">
        {/* Header */}
        <div className="flex flex-col gap-6 pb-8 border-b border-white/10">
          <div className="flex items-center gap-3">
            <span className="font-mono text-xs text-neutral-400 tracking-widest uppercase">
              // INDEX 04
            </span>
            <span className="text-neutral-600">·</span>
            <StatusBadge status="OPEN FOR OPPORTUNITIES" variant="available" />
          </div>
          <h1 className="text-4xl sm:text-6xl md:text-8xl font-bold tracking-tight text-white uppercase text-editorial-title">
            Let&apos;s build something.
          </h1>
          <p className="text-lg sm:text-xl text-neutral-300 font-light max-w-2xl leading-relaxed">
            Whether you want to collaborate on systems engineering, discuss cloud infrastructure, or explore full-time / internship opportunities.
          </p>
        </div>

        {/* Interactive Magnetic Email Component */}
        <div className="flex flex-col gap-4 p-8 sm:p-10 rounded-2xl border border-white/10 bg-neutral-900/40">
          <span className="font-mono text-xs text-neutral-400 uppercase tracking-wider">
            // DIRECT CONTACT CHANNEL
          </span>

          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6 pt-2">
            <div className="flex flex-col gap-1">
              <span className="text-sm font-mono text-neutral-400">PRIMARY INBOX</span>
              <span className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
                {email}
              </span>
            </div>

            <div className="flex items-center gap-3">
              <MagneticButton
                onClick={handleCopyEmail}
                dataCursor={copied ? "COPIED" : "COPY"}
                className="px-6 py-3.5 rounded-full bg-white text-black font-mono text-xs font-semibold tracking-wider uppercase hover:bg-neutral-200 transition-all flex items-center gap-2"
              >
                {copied ? <Check className="w-4 h-4 text-emerald-600" /> : <Copy className="w-4 h-4" />}
                <span>{copied ? "COPIED TO CLIPBOARD" : "COPY EMAIL"}</span>
              </MagneticButton>

              <a
                href={`mailto:${email}`}
                onMouseEnter={() => playHover()}
                onClick={() => playClick()}
                data-cursor="MAIL APP"
                className="p-3.5 rounded-full border border-white/20 bg-black/40 text-white hover:border-white/40 transition-colors"
                title="Open mail client"
              >
                <Mail className="w-4 h-4" />
              </a>
            </div>
          </div>
        </div>

        {/* Social & Telemetry Matrix */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 font-mono text-xs">
          {/* External Networks */}
          <div className="p-8 rounded-2xl border border-white/10 bg-neutral-900/30 flex flex-col justify-between gap-6">
            <div className="flex flex-col gap-3">
              <span className="text-neutral-500 uppercase">// ONLINE PROFILES</span>
              <div className="flex flex-col divide-y divide-white/10">
                <a
                  href="https://github.com/yashxch"
                  target="_blank"
                  rel="noreferrer"
                  onMouseEnter={() => playHover()}
                  data-cursor="GITHUB ↗"
                  className="py-4 flex items-center justify-between text-neutral-200 hover:text-emerald-400 transition-colors group"
                >
                  <span className="font-bold text-sm">GitHub / yashxch</span>
                  <ArrowUpRight className="w-4 h-4 opacity-60 group-hover:opacity-100 transition-opacity" />
                </a>
                <a
                  href="https://www.linkedin.com/in/yashwanthchalumuri"
                  target="_blank"
                  rel="noreferrer"
                  onMouseEnter={() => playHover()}
                  data-cursor="LINKEDIN ↗"
                  className="py-4 flex items-center justify-between text-neutral-200 hover:text-emerald-400 transition-colors group"
                >
                  <span className="font-bold text-sm">LinkedIn / yashwanthchalumuri</span>
                  <ArrowUpRight className="w-4 h-4 opacity-60 group-hover:opacity-100 transition-opacity" />
                </a>
              </div>
            </div>

            <div className="text-[11px] text-neutral-500 flex items-center justify-between">
              <span>Profiles verified & active.</span>
              <span>Phone: {phone}</span>
            </div>
          </div>

          {/* Location & Response Expectation */}
          <div className="p-8 rounded-2xl border border-white/10 bg-neutral-900/30 flex flex-col justify-between gap-6">
            <div className="flex flex-col gap-3">
              <span className="text-neutral-500 uppercase">// TELEMETRY & AVAILABILITY</span>
              <div className="flex flex-col gap-3 text-neutral-300">
                <div className="flex items-center gap-2">
                  <MapPin className="w-4 h-4 text-emerald-400" />
                  <span>Chennai, India (UTC+05:30)</span>
                </div>
                <div className="flex items-center gap-2">
                  <Terminal className="w-4 h-4 text-neutral-400" />
                  <span>Response Time: Typically within 24 hours</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="h-2 w-2 rounded-full bg-emerald-400" />
                  <span>Available for Engineering Opportunities</span>
                </div>
              </div>
            </div>

            <Link
              href="/resume"
              onMouseEnter={() => playHover()}
              onClick={() => playClick()}
              data-cursor="VIEW"
              className="inline-flex items-center gap-2 text-white hover:text-emerald-400 transition-colors pt-2 border-t border-white/10"
            >
              <span>View digital résumé</span>
              <ArrowUpRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>
      </div>
    </PageTransition>
  );
}
