"use client";

import Link from "next/link";
import { ArrowUpRight, Briefcase, Users } from "lucide-react";
import { EXPERIENCES } from "@/lib/data/experience";
import { useSound } from "../ui/AudioToggle";

export default function ExperienceSnapshot() {
  const { playHover, playClick } = useSound();

  return (
    <section className="w-full px-6 sm:px-12 md:px-16 py-24 border-b border-white/10">
      <div className="max-w-7xl mx-auto flex flex-col gap-12">
        {/* Section Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 pb-6 border-b border-white/10">
          <div>
            <span className="font-mono text-xs text-neutral-400 tracking-widest uppercase">
              // INDUSTRY & LEADERSHIP
            </span>
            <h2 className="text-3xl sm:text-5xl font-bold tracking-tight text-white uppercase mt-1">
              Experience
            </h2>
          </div>
          <Link
            href="/experience"
            onMouseEnter={() => playHover()}
            onClick={() => playClick()}
            data-cursor="TIMELINE"
            className="flex items-center gap-1 font-mono text-xs text-neutral-400 hover:text-white transition-colors"
          >
            <span>FULL TIMELINE & LEADERSHIP</span>
            <ArrowUpRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        {/* Experience Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {EXPERIENCES.map((exp) => (
            <div
              key={exp.id}
              className="p-8 rounded-xl border border-white/10 bg-neutral-900/40 flex flex-col justify-between gap-6 hover:border-white/25 transition-all"
            >
              <div className="flex flex-col gap-4">
                <div className="flex items-center justify-between font-mono text-xs text-neutral-400">
                  <div className="flex items-center gap-2">
                    {exp.id === "algoshack" ? (
                      <Briefcase className="w-4 h-4 text-emerald-400" />
                    ) : (
                      <Users className="w-4 h-4 text-blue-400" />
                    )}
                    <span className="text-white font-semibold uppercase">{exp.organization}</span>
                  </div>
                  <span className="px-2 py-0.5 rounded border border-white/10 bg-black/40 text-[10px]">
                    {exp.period}
                  </span>
                </div>

                <div className="flex flex-col gap-1">
                  <h3 className="text-xl sm:text-2xl font-bold text-white tracking-tight">
                    {exp.role}
                  </h3>
                  <span className="text-xs font-mono text-neutral-400">{exp.location}</span>
                </div>

                <p className="text-sm text-neutral-300 leading-relaxed">
                  {exp.description}
                </p>

                {/* Bullets */}
                <ul className="flex flex-col gap-2 pt-2 text-xs text-neutral-400 list-disc list-inside">
                  {exp.highlights.slice(0, 2).map((h, i) => (
                    <li key={i} className="leading-normal">
                      {h}
                    </li>
                  ))}
                </ul>
              </div>

              {/* Technologies */}
              <div className="flex flex-wrap gap-2 pt-4 border-t border-white/10">
                {exp.technologies.map((tech) => (
                  <span
                    key={tech}
                    className="px-2.5 py-0.5 rounded-full border border-white/10 bg-black/40 text-[10px] font-mono text-neutral-400 uppercase"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
