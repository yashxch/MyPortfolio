"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowUpRight, Cpu, Layers, ShieldCheck, Activity, Zap, Server } from "lucide-react";
import PageTransition from "@/components/layout/PageTransition";
import { PROJECTS, ProjectItem } from "@/lib/data/projects";
import { useSound } from "@/components/ui/AudioToggle";

const ICONS: Record<string, typeof Cpu> = {
  pulsehalo: Activity,
  "healthcare-predictive-maintenance": Server,
  zkveritas: ShieldCheck,
  energiq: Zap,
};

const CATEGORIES = [
  { label: "ALL SYSTEMS", value: "all" },
  { label: "IOT & HEALTHCARE", value: "iot" },
  { label: "CLOUD & DEVOPS", value: "cloud" },
  { label: "AI & CRYPTOGRAPHY", value: "privacy" },
  { label: "WEB3 & BLOCKCHAIN", value: "blockchain" },
];

export default function WorkPage() {
  const [selectedCategory, setSelectedCategory] = useState("all");
  const { playHover, playClick } = useSound();

  const filteredProjects =
    selectedCategory === "all"
      ? PROJECTS
      : PROJECTS.filter((p) => p.categorySlug === selectedCategory);

  return (
    <PageTransition>
      <div className="w-full px-6 sm:px-12 md:px-16 pt-36 pb-24 max-w-7xl mx-auto flex flex-col gap-16">
        {/* Header */}
        <div className="flex flex-col gap-6 pb-8 border-b border-white/10">
          <div className="flex items-center gap-3">
            <span className="font-mono text-xs text-neutral-400 tracking-widest uppercase">
              // INDEX 01
            </span>
            <span className="text-neutral-600">·</span>
            <span className="font-mono text-xs text-emerald-400 uppercase">
              04 PRODUCTION & RESEARCH CASE STUDIES
            </span>
          </div>
          <h1 className="text-4xl sm:text-6xl md:text-7xl font-bold tracking-tight text-white uppercase text-editorial-title">
            Selected Work
          </h1>
          <p className="text-lg text-neutral-300 font-light max-w-3xl leading-relaxed">
            Case studies detailing real problem statements, architectural diagrams, implementation pipelines, and verifiable outcomes across AI, systems, and distributed infrastructure.
          </p>

          {/* Category Filter Pills */}
          <div className="flex flex-wrap gap-2 pt-4">
            {CATEGORIES.map((cat) => (
              <button
                key={cat.value}
                onClick={() => {
                  setSelectedCategory(cat.value);
                  playClick();
                }}
                onMouseEnter={() => playHover()}
                className={`px-4 py-1.5 rounded-full font-mono text-xs transition-all ${
                  selectedCategory === cat.value
                    ? "bg-white text-black font-semibold shadow-lg"
                    : "bg-neutral-900/60 text-neutral-400 border border-white/10 hover:border-white/20 hover:text-white"
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>
        </div>

        {/* Project List */}
        <div className="flex flex-col divide-y divide-white/10">
          {filteredProjects.map((project: ProjectItem) => {
            const Icon = ICONS[project.id] || Cpu;

            return (
              <Link
                key={project.id}
                href={`/work/${project.slug}`}
                onMouseEnter={() => playHover()}
                onClick={() => playClick()}
                data-cursor="VIEW CASE"
                className="group py-12 sm:py-16 grid grid-cols-1 lg:grid-cols-12 gap-8 items-start hover:bg-white/[0.015] -mx-6 px-6 sm:-mx-8 sm:px-8 rounded-xl transition-all"
              >
                {/* Number & Icon */}
                <div className="lg:col-span-2 flex items-center lg:items-start gap-4 font-mono">
                  <span className="text-3xl font-light text-neutral-500 group-hover:text-white transition-colors">
                    {project.number}
                  </span>
                  <div className="p-2 rounded border border-white/10 bg-neutral-900/80 text-neutral-300 group-hover:text-emerald-400 transition-colors">
                    <Icon className="w-4 h-4" />
                  </div>
                </div>

                {/* Main Details */}
                <div className="lg:col-span-6 flex flex-col gap-3">
                  <div className="flex items-center gap-2 font-mono text-xs text-neutral-500">
                    <span>{project.category}</span>
                  </div>
                  <h2 className="text-2xl sm:text-4xl font-bold text-white group-hover:text-emerald-300 transition-colors flex items-center gap-3">
                    <span>{project.title}</span>
                    <ArrowUpRight className="w-5 h-5 opacity-0 group-hover:opacity-100 transition-opacity" />
                  </h2>
                  <p className="text-sm sm:text-base text-neutral-400 leading-relaxed max-w-xl">
                    {project.tagline}
                  </p>

                  <div className="flex flex-wrap gap-2 pt-2">
                    {project.technologies.slice(0, 4).map((tech) => (
                      <span
                        key={tech}
                        className="px-2.5 py-0.5 rounded border border-white/10 bg-black/40 text-[10px] font-mono text-neutral-400 uppercase"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Results & Role */}
                <div className="lg:col-span-4 flex flex-col justify-between h-full gap-4 font-mono text-xs text-neutral-400 lg:pl-6 border-t lg:border-t-0 lg:border-l border-white/10 pt-4 lg:pt-0">
                  <div className="flex flex-col gap-1">
                    <span className="text-neutral-500 uppercase">ROLE</span>
                    <span className="text-neutral-200">{project.role}</span>
                  </div>

                  <div className="flex flex-col gap-1">
                    <span className="text-neutral-500 uppercase">KEY OUTCOME</span>
                    <span className="text-emerald-400 font-bold">
                      {project.results.metrics[0].value} — {project.results.metrics[0].label}
                    </span>
                  </div>

                  <div className="flex items-center gap-2 pt-2">
                    <span
                      className="h-1.5 w-1.5 rounded-full"
                      style={{ backgroundColor: project.accentColor }}
                    />
                    <span className="text-neutral-300 uppercase">{project.status}</span>
                  </div>
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </PageTransition>
  );
}
