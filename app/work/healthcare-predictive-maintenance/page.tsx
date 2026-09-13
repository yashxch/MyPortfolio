"use client";

import Link from "next/link";
import { ArrowLeft, ArrowUpRight, CheckCircle2, Cpu, Layers, Server, ShieldCheck, Terminal, Zap } from "lucide-react";
import PageTransition from "@/components/layout/PageTransition";
import CaseStudyHeader from "@/components/work/CaseStudyHeader";
import MaintenanceSimulator from "@/components/work/MaintenanceSimulator";
import { PROJECTS } from "@/lib/data/projects";
import { useSound } from "@/components/ui/AudioToggle";

export default function PredictiveMaintenanceCaseStudy() {
  const project = PROJECTS.find((p) => p.id === "healthcare-predictive-maintenance") || PROJECTS[1];
  const { playHover, playClick } = useSound();

  return (
    <PageTransition>
      <article className="w-full px-6 sm:px-12 md:px-16 pt-36 pb-24 max-w-6xl mx-auto flex flex-col gap-16">
        {/* Header */}
        <CaseStudyHeader project={project} />

        {/* 01 & 02: Overview & Problem */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 pt-4">
          <div className="lg:col-span-4 flex flex-col gap-2 font-mono text-xs text-neutral-400">
            <span className="uppercase text-white font-bold">// 01 & 02 CONTEXT</span>
            <span>HEALTHCARE IT CLUSTER</span>
            <span>AWS EC2 / K8S / PROMETHEUS</span>
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
            <span>CONTAINERIZED WORKLOADS</span>
            <span>PROACTIVE OBSERVABILITY</span>
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

        {/* 04: Architecture Node Diagram */}
        <div className="flex flex-col gap-8 pt-8 border-t border-white/10">
          <div className="flex flex-col gap-1">
            <span className="font-mono text-xs text-neutral-400 tracking-widest uppercase">
              // 04 ARCHITECTURAL TOPOLOGY
            </span>
            <h2 className="text-2xl font-bold text-white uppercase tracking-tight">
              Cloud-Native Pipeline Topology
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3 font-mono text-xs">
            {project.architecture.nodes.map((node, i) => (
              <div
                key={node.label}
                className="p-5 rounded-xl border border-white/10 bg-neutral-900/40 flex flex-col justify-between gap-4 relative group hover:border-emerald-500/40 transition-all"
              >
                <div className="flex items-center justify-between text-neutral-500">
                  <span className="text-emerald-400 font-bold">0{i + 1}</span>
                  <Layers className="w-3.5 h-3.5 opacity-60" />
                </div>
                <div className="flex flex-col gap-1">
                  <span className="text-white font-bold text-sm leading-snug">{node.label}</span>
                  <span className="text-[11px] text-emerald-400/80">{node.sub}</span>
                </div>
                <p className="text-[11px] text-neutral-400 font-sans leading-relaxed pt-2 border-t border-white/5">
                  {node.detail}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* 05: Interactive Telemetry Bench */}
        <div className="flex flex-col gap-6 pt-8 border-t border-white/10">
          <div className="flex flex-col gap-1">
            <span className="font-mono text-xs text-neutral-400 tracking-widest uppercase">
              // 05 INTERACTIVE OBSERVABILITY BENCH
            </span>
            <h2 className="text-2xl font-bold text-white uppercase tracking-tight">
              Live Cluster Telemetry & Failure Injection
            </h2>
            <p className="text-sm text-neutral-400 font-mono">
              Test anomaly injection on containerized healthcare services and watch Prometheus alarms trigger automated Kubernetes self-healing.
            </p>
          </div>

          <MaintenanceSimulator />
        </div>

        {/* 06: Implementation Highlights & Learnings */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 pt-8 border-t border-white/10">
          <div className="p-8 rounded-2xl border border-white/10 bg-neutral-900/30 flex flex-col gap-6">
            <div className="flex items-center gap-2 font-mono text-xs text-neutral-400 uppercase">
              <Terminal className="w-4 h-4 text-emerald-400" />
              <span>Key Implementation Highlights</span>
            </div>
            <ul className="flex flex-col gap-3 text-sm text-neutral-300 leading-relaxed font-light">
              {project.implementation.map((item, i) => (
                <li key={i} className="flex items-start gap-3">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-1" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="p-8 rounded-2xl border border-white/10 bg-neutral-900/30 flex flex-col gap-6">
            <div className="flex items-center gap-2 font-mono text-xs text-neutral-400 uppercase">
              <ShieldCheck className="w-4 h-4 text-emerald-400" />
              <span>Engineering Learnings</span>
            </div>
            <ul className="flex flex-col gap-3 text-sm text-neutral-300 leading-relaxed font-light">
              {project.learnings.map((item, i) => (
                <li key={i} className="flex items-start gap-3">
                  <span className="text-emerald-400 font-mono text-xs shrink-0 mt-1">
                    0{i + 1}
                  </span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Technologies & Concepts */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-8 border-t border-white/10 font-mono text-xs">
          <div className="flex flex-col gap-3">
            <span className="text-neutral-500 uppercase">// STACK & PLATFORMS</span>
            <div className="flex flex-wrap gap-2">
              {project.technologies.map((t) => (
                <span
                  key={t}
                  className="px-3 py-1 rounded bg-neutral-900/60 border border-white/10 text-white"
                >
                  {t}
                </span>
              ))}
            </div>
          </div>

          <div className="flex flex-col gap-3">
            <span className="text-neutral-500 uppercase">// APPLIED CONCEPTS</span>
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

        {/* Navigation */}
        <div className="flex items-center justify-between pt-12 border-t border-white/10">
          <Link
            href="/work/pulsehalo"
            onMouseEnter={() => playHover()}
            onClick={() => playClick()}
            className="flex items-center gap-2 font-mono text-xs text-neutral-400 hover:text-white transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>PREV: 01 PULSEHALO</span>
          </Link>

          <Link
            href="/work/zkveritas"
            onMouseEnter={() => playHover()}
            onClick={() => playClick()}
            data-cursor="NEXT CASE"
            className="flex items-center gap-2 font-mono text-xs text-white hover:text-emerald-400 transition-colors"
          >
            <span>NEXT: 03 ZKVERITAS</span>
            <ArrowUpRight className="w-4 h-4" />
          </Link>
        </div>
      </article>
    </PageTransition>
  );
}
