"use client";

import Link from "next/link";
import { ArrowLeft, ArrowUpRight, Cpu, Layers, RefreshCw, Zap } from "lucide-react";
import PageTransition from "@/components/layout/PageTransition";
import CaseStudyHeader from "@/components/work/CaseStudyHeader";
import TrustMatrix from "@/components/work/TrustMatrix";
import { PROJECTS } from "@/lib/data/projects";
import { useSound } from "@/components/ui/AudioToggle";

export default function EnergyIQCaseStudy() {
  const project = PROJECTS.find((p) => p.id === "energiq") || PROJECTS[3];
  const { playHover, playClick } = useSound();

  return (
    <PageTransition>
      <article className="w-full px-6 sm:px-12 md:px-16 pt-36 pb-24 max-w-6xl mx-auto flex flex-col gap-16">
        <CaseStudyHeader project={project} />

        {/* 01 & 02: Overview & Problem */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 pt-4">
          <div className="lg:col-span-4 flex flex-col gap-2 font-mono text-xs text-neutral-400">
            <span className="uppercase text-white font-bold">// 01 & 02 CONTEXT</span>
            <span>DECENTRALIZED SMART ENERGY</span>
            <span>FLOWER FEDERATED LEARNING</span>
          </div>

          <div className="lg:col-span-8 flex flex-col gap-8">
            <section className="flex flex-col gap-3">
              <h2 className="text-xl font-bold text-white uppercase tracking-tight">
                01 — System Overview
              </h2>
              <p className="text-neutral-300 leading-relaxed text-base font-light">
                {project.overview}
              </p>
            </section>

            <section className="flex flex-col gap-3">
              <h2 className="text-xl font-bold text-white uppercase tracking-tight">
                02 — The Core Problem
              </h2>
              <p className="text-neutral-300 leading-relaxed text-base font-light">
                {project.problem}
              </p>
            </section>
          </div>
        </div>

        {/* 03: Approach */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 pt-8 border-t border-white/10">
          <div className="lg:col-span-4 flex flex-col gap-2 font-mono text-xs text-neutral-400">
            <span className="uppercase text-white font-bold">// 03 STRATEGY</span>
            <span>FEDERATED ANOMALY DETECTION</span>
            <span>QUBO & TRUST SCORING</span>
          </div>

          <div className="lg:col-span-8 flex flex-col gap-4">
            <h2 className="text-xl font-bold text-white uppercase tracking-tight">
              03 — Architectural Approach
            </h2>
            <p className="text-neutral-300 leading-relaxed text-base font-light">
              {project.approach}
            </p>
          </div>
        </div>

        {/* 04: Interactive Trust Matrix Visualizer */}
        <div className="flex flex-col gap-6 pt-8 border-t border-white/10">
          <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-2">
            <div>
              <span className="font-mono text-xs text-neutral-400 tracking-widest uppercase">
                // 04 INTERACTIVE MATRIX
              </span>
              <h2 className="text-2xl font-bold text-white uppercase mt-1">
                Decentralized Trust Scoring & Federated Anomaly Hub
              </h2>
            </div>
            <span className="font-mono text-xs text-amber-400">
              [ TRIGGER FEDERATED AGGREGATION & NODE HEALTH ]
            </span>
          </div>

          <TrustMatrix />
        </div>

        {/* 05: Implementation Notes */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 pt-8 border-t border-white/10">
          <div className="lg:col-span-4 flex flex-col gap-2 font-mono text-xs text-neutral-400">
            <span className="uppercase text-white font-bold">// 05 ENGINEERING DETAILS</span>
            <span>ISOLATION FOREST</span>
            <span>FLOWER FL PIPELINE</span>
          </div>

          <div className="lg:col-span-8 flex flex-col gap-4">
            <h2 className="text-xl font-bold text-white uppercase tracking-tight">
              05 — Key Implementation Details
            </h2>
            <ul className="flex flex-col gap-3 font-mono text-xs text-neutral-300">
              {project.implementation.map((item, idx) => (
                <li key={idx} className="flex items-start gap-3 p-3 rounded bg-neutral-900/30 border border-white/5">
                  <span className="text-amber-400 font-bold">0{idx + 1}</span>
                  <span className="leading-relaxed font-sans text-sm">{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* 06: Results */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 pt-8 border-t border-white/10">
          <div className="lg:col-span-4 flex flex-col gap-2 font-mono text-xs text-neutral-400">
            <span className="uppercase text-white font-bold">// 06 MEASURED METRICS</span>
          </div>

          <div className="lg:col-span-8 flex flex-col gap-6">
            <h2 className="text-xl font-bold text-white uppercase tracking-tight">
              06 — Results & Measured Metrics
            </h2>
            <p className="text-neutral-300 text-sm font-light leading-relaxed">
              {project.results.highlight}
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 font-mono">
              {project.results.metrics.map((m) => (
                <div
                  key={m.label}
                  className="p-4 rounded-xl border border-white/10 bg-neutral-900/50 flex flex-col gap-1"
                >
                  <span className="text-[10px] text-neutral-500 uppercase">{m.label}</span>
                  <span className="text-2xl font-bold text-amber-400">{m.value}</span>
                  <span className="text-[10px] text-neutral-400 font-sans">{m.desc}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* 07: Learnings */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 pt-8 border-t border-white/10">
          <div className="lg:col-span-4 flex flex-col gap-2 font-mono text-xs text-neutral-400">
            <span className="uppercase text-white font-bold">// 07 RETROSPECTIVE</span>
          </div>

          <div className="lg:col-span-8 flex flex-col gap-4">
            <h2 className="text-xl font-bold text-white uppercase tracking-tight">
              07 — What I Learned
            </h2>
            <ul className="flex flex-col gap-2 text-sm text-neutral-300 list-disc list-inside leading-relaxed font-light">
              {project.learnings.map((l, i) => (
                <li key={i}>{l}</li>
              ))}
            </ul>
          </div>
        </div>

        {/* 08: Stack */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 pt-8 border-t border-white/10 font-mono text-xs">
          <div className="lg:col-span-4 flex flex-col gap-2 text-neutral-400">
            <span className="uppercase text-white font-bold">// 08 STACK & CONCEPTS</span>
          </div>

          <div className="lg:col-span-8 flex flex-col gap-6">
            <div className="flex flex-col gap-2">
              <span className="text-neutral-500 uppercase">TECHNOLOGIES USED</span>
              <div className="flex flex-wrap gap-2">
                {project.technologies.map((t) => (
                  <span
                    key={t}
                    className="px-3 py-1 rounded bg-neutral-900 border border-white/10 text-neutral-200"
                  >
                    {t}
                  </span>
                ))}
              </div>
            </div>

            <div className="flex flex-col gap-2">
              <span className="text-neutral-500 uppercase">CONCEPTS</span>
              <div className="flex flex-wrap gap-2">
                {project.concepts.map((c) => (
                  <span
                    key={c}
                    className="px-3 py-1 rounded bg-neutral-900/60 border border-white/5 text-neutral-400"
                  >
                    {c}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Navigation */}
        <div className="flex items-center justify-between pt-12 border-t border-white/10">
          <Link
            href="/work/zkveritas"
            onMouseEnter={() => playHover()}
            onClick={() => playClick()}
            className="flex items-center gap-2 font-mono text-xs text-neutral-400 hover:text-white transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>PREV: 03 ZKVERITAS</span>
          </Link>

          <Link
            href="/experience"
            onMouseEnter={() => playHover()}
            onClick={() => playClick()}
            data-cursor="EXPERIENCE"
            className="flex items-center gap-2 font-mono text-xs text-white hover:text-amber-400 transition-colors"
          >
            <span>VIEW EXPERIENCE TIMELINE</span>
            <ArrowUpRight className="w-4 h-4" />
          </Link>
        </div>
      </article>
    </PageTransition>
  );
}
