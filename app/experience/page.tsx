"use client";

import Link from "next/link";
import { ArrowUpRight, Briefcase, Calendar, CheckCircle2, ChevronRight, MapPin, Terminal, Users } from "lucide-react";
import PageTransition from "@/components/layout/PageTransition";
import { EXPERIENCES, LEADERSHIP_PIPELINE } from "@/lib/data/experience";
import { useSound } from "@/components/ui/AudioToggle";

export default function ExperiencePage() {
  const { playHover, playClick } = useSound();

  return (
    <PageTransition>
      <div className="w-full px-6 sm:px-12 md:px-16 pt-36 pb-24 max-w-6xl mx-auto flex flex-col gap-16">
        {/* Header */}
        <div className="flex flex-col gap-6 pb-8 border-b border-white/10">
          <div className="flex items-center gap-3">
            <span className="font-mono text-xs text-neutral-400 tracking-widest uppercase">
              // INDEX 03
            </span>
            <span className="text-neutral-600">·</span>
            <span className="font-mono text-xs text-emerald-400 uppercase">
              SOFTWARE DEVELOPMENT & ENGINEERING LEADERSHIP
            </span>
          </div>
          <h1 className="text-4xl sm:text-6xl md:text-7xl font-bold tracking-tight text-white uppercase text-editorial-title">
            Experience
          </h1>
          <p className="text-lg text-neutral-300 font-light max-w-3xl leading-relaxed">
            Hands-on software development internship in test automation and AI systems, paired with technical organization and student engineering leadership at SRMIST.
          </p>
        </div>

        {/* Section 01: Industry Experience Timeline */}
        <div className="flex flex-col gap-8">
          <span className="font-mono text-xs text-neutral-400 tracking-widest uppercase">
            // 01 INDUSTRY ROLES
          </span>

          <div className="flex flex-col gap-8">
            {EXPERIENCES.map((exp) => (
              <div
                key={exp.id}
                className="p-8 rounded-2xl border border-white/10 bg-neutral-900/40 flex flex-col gap-6 relative overflow-hidden"
              >
                {/* Top Role Line */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-white/10 pb-4">
                  <div className="flex items-center gap-3">
                    <div className="p-2 rounded-md bg-neutral-800 border border-white/10 text-emerald-400">
                      {exp.id === "algoshack" ? (
                        <Briefcase className="w-4 h-4" />
                      ) : (
                        <Users className="w-4 h-4" />
                      )}
                    </div>
                    <div className="flex flex-col">
                      <span className="text-xl font-bold text-white tracking-tight">
                        {exp.role}
                      </span>
                      <span className="text-xs font-mono text-neutral-400">
                        {exp.organization} · {exp.type}
                      </span>
                    </div>
                  </div>

                  <div className="flex items-center gap-4 font-mono text-xs text-neutral-400">
                    <div className="flex items-center gap-1.5">
                      <Calendar className="w-3.5 h-3.5" />
                      <span>{exp.period}</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <MapPin className="w-3.5 h-3.5" />
                      <span>{exp.location}</span>
                    </div>
                  </div>
                </div>

                {/* Description & Concrete Work Areas */}
                <div className="flex flex-col gap-4">
                  <p className="text-sm sm:text-base text-neutral-200 leading-relaxed font-light">
                    {exp.description}
                  </p>

                  <div className="flex flex-col gap-2 pt-2">
                    <span className="font-mono text-xs text-neutral-400 uppercase">
                      KEY RESPONSIBILITIES & CONTRIBUTIONS:
                    </span>
                    <ul className="grid grid-cols-1 md:grid-cols-2 gap-3 pt-1">
                      {exp.highlights.map((h, idx) => (
                        <li
                          key={idx}
                          className="flex items-start gap-3 p-3.5 rounded-lg bg-black/40 border border-white/5 text-xs text-neutral-300 leading-relaxed"
                        >
                          <ChevronRight className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                          <span>{h}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                {/* Technologies */}
                <div className="flex flex-wrap items-center gap-2 pt-4 border-t border-white/10 font-mono text-xs">
                  <span className="text-neutral-500 uppercase text-[10px]">STACK / SCOPE:</span>
                  {exp.technologies.map((t) => (
                    <span
                      key={t}
                      className="px-2.5 py-0.5 rounded border border-white/10 bg-neutral-900 text-[10px] text-neutral-300"
                    >
                      {t}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Section 02: NWC Association Leadership Event Pipeline */}
        <div className="flex flex-col gap-8 pt-8 border-t border-white/10">
          <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-2">
            <div>
              <span className="font-mono text-xs text-neutral-400 tracking-widest uppercase">
                // 02 STUDENT ENGINEERING LEADERSHIP
              </span>
              <h2 className="text-2xl font-bold text-white uppercase mt-1">
                NWC Association Event Orchestration Pipeline
              </h2>
            </div>
            <span className="font-mono text-xs text-blue-400">
              [ 200+ STUDENTS & FACULTY ENGAGED ]
            </span>
          </div>

          <div className="p-6 rounded-xl border border-white/10 bg-neutral-900/40 flex flex-col gap-6">
            <p className="text-sm text-neutral-300 leading-relaxed font-light">
              As Organizing Co-Lead for the Networking & Communications Association at SRMIST, I structured a repeatable delivery pipeline for technical workshops, cloud labs, and systems events.
            </p>

            {/* Pipeline Stage Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3 font-mono text-xs">
              {LEADERSHIP_PIPELINE.map((p) => (
                <div
                  key={p.step}
                  className="p-4 rounded-lg bg-black/60 border border-white/5 flex flex-col justify-between gap-3"
                >
                  <div className="flex items-center justify-between text-neutral-500">
                    <span className="text-blue-400 font-bold">{p.step}</span>
                    <span>STAGE</span>
                  </div>
                  <span className="font-bold text-white text-xs">{p.stage}</span>
                  <p className="text-[11px] text-neutral-400 font-sans leading-relaxed">
                    {p.detail}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Navigation to About */}
        <div className="flex items-center justify-between pt-8 border-t border-white/10">
          <Link
            href="/work"
            onMouseEnter={() => playHover()}
            onClick={() => playClick()}
            className="flex items-center gap-2 font-mono text-xs text-neutral-400 hover:text-white transition-colors"
          >
            <span>← SELECTED WORK</span>
          </Link>

          <Link
            href="/about"
            onMouseEnter={() => playHover()}
            onClick={() => playClick()}
            data-cursor="ABOUT"
            className="flex items-center gap-2 font-mono text-xs text-white hover:text-emerald-400 transition-colors"
          >
            <span>NEXT: ABOUT & PHILOSOPHY →</span>
          </Link>
        </div>
      </div>
    </PageTransition>
  );
}
