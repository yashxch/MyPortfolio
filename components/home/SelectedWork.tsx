"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowUpRight, Cpu, ShieldCheck, Activity, Zap, Server } from "lucide-react";
import { motion } from "framer-motion";
import { PROJECTS, ProjectItem } from "@/lib/data/projects";
import { useSound } from "../ui/AudioToggle";

const PROJECT_ICONS: Record<string, typeof Cpu> = {
  pulsehalo: Activity,
  "healthcare-predictive-maintenance": Server,
  zkveritas: ShieldCheck,
  energiq: Zap,
};

export default function SelectedWork() {
  const [hoveredId, setHoveredId] = useState<string | null>(null);
  const { playHover, playClick } = useSound();

  return (
    <section id="selected-work" className="w-full px-6 sm:px-12 md:px-16 py-24 border-b border-white/10">
      <div className="max-w-7xl mx-auto flex flex-col gap-12">
        {/* Section Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 pb-6 border-b border-white/10">
          <div>
            <span className="font-mono text-xs text-neutral-400 tracking-widest uppercase">
              // CASE STUDIES
            </span>
            <h2 className="text-3xl sm:text-5xl font-bold tracking-tight text-white uppercase mt-1">
              Selected Work
            </h2>
          </div>
          <div className="font-mono text-xs text-neutral-400">
            <span>[ 04 TECHNICAL SYSTEMS ]</span>
          </div>
        </div>

        {/* Editorial Project List */}
        <div className="flex flex-col divide-y divide-white/10">
          {PROJECTS.map((project: ProjectItem) => {
            const Icon = PROJECT_ICONS[project.id] || Cpu;
            const isHovered = hoveredId === project.id;

            return (
              <Link
                key={project.id}
                href={`/work/${project.slug}`}
                onMouseEnter={() => {
                  setHoveredId(project.id);
                  playHover();
                }}
                onMouseLeave={() => setHoveredId(null)}
                onClick={() => playClick()}
                data-cursor="VIEW CASE"
                className="group relative py-12 sm:py-16 transition-all duration-300 block"
              >
                {/* Background glow on hover */}
                <div
                  className={`absolute inset-0 -mx-6 sm:-mx-12 px-6 sm:px-12 bg-white/[0.02] transition-opacity duration-300 pointer-events-none rounded-lg ${
                    isHovered ? "opacity-100" : "opacity-0"
                  }`}
                />

                <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
                  {/* Number & Icon */}
                  <div className="lg:col-span-2 flex items-center lg:items-start gap-4 font-mono text-neutral-400">
                    <span className="text-2xl font-light text-neutral-400 group-hover:text-white transition-colors">
                      {project.number}
                    </span>
                    <div className="p-2 rounded-md border border-white/10 bg-neutral-900/60 text-neutral-300 group-hover:border-white/30 group-hover:text-white transition-all">
                      <Icon className="w-4 h-4" />
                    </div>
                  </div>

                  {/* Title & Tagline */}
                  <div className="lg:col-span-6 flex flex-col gap-3">
                    <h3 className="text-2xl sm:text-4xl font-bold tracking-tight text-white group-hover:text-neutral-100 transition-colors flex items-center gap-3">
                      <span>{project.title}</span>
                      <ArrowUpRight className="w-6 h-6 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-200 text-emerald-400" />
                    </h3>
                    <p className="text-neutral-400 text-sm sm:text-base leading-relaxed max-w-xl">
                      {project.tagline}
                    </p>

                    {/* Concept Pills */}
                    <div className="flex flex-wrap gap-2 pt-2">
                      {project.concepts.slice(0, 4).map((concept) => (
                        <span
                          key={concept}
                          className="px-2.5 py-0.5 rounded-full border border-white/10 bg-neutral-900/40 text-[10px] font-mono text-neutral-400 tracking-wider uppercase group-hover:border-white/20 transition-colors"
                        >
                          {concept}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Metadata & Status */}
                  <div className="lg:col-span-4 flex flex-col lg:items-end justify-between h-full gap-4 font-mono text-xs text-neutral-400">
                    <div className="flex flex-col lg:items-end gap-1">
                      <span className="text-neutral-300 uppercase">{project.category}</span>
                      <span className="text-neutral-400">{project.year}</span>
                    </div>

                    <div className="flex items-center gap-2 px-3 py-1 rounded-full border border-white/10 bg-neutral-900/60 text-neutral-300">
                      <span
                        className="h-1.5 w-1.5 rounded-full"
                        style={{ backgroundColor: project.accentColor }}
                      />
                      <span className="text-[10px] uppercase">{project.status}</span>
                    </div>
                  </div>
                </div>
              </Link>
            );
          })}
        </div>

        {/* View All Work Action */}
        <div className="flex justify-center pt-8">
          <Link
            href="/work"
            onMouseEnter={() => playHover()}
            onClick={() => playClick()}
            data-cursor="CATALOG"
            className="px-8 py-3.5 rounded-full border border-white/15 bg-neutral-900/60 text-white font-mono text-xs tracking-widest uppercase hover:border-white/40 hover:bg-neutral-800/80 transition-all flex items-center gap-2"
          >
            <span>Explore All Case Studies & Systems</span>
            <ArrowUpRight className="w-4 h-4 opacity-70" />
          </Link>
        </div>
      </div>
    </section>
  );
}
