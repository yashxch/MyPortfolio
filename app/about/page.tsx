"use client";

import Link from "next/link";
import { ArrowUpRight, Award, BookOpen, Code, Compass, Cpu, GraduationCap, MapPin, Terminal } from "lucide-react";
import PageTransition from "@/components/layout/PageTransition";
import { CERTIFICATIONS, EDUCATION } from "@/lib/data/experience";
import { useSound } from "@/components/ui/AudioToggle";

const PHILOSOPHIES = [
  {
    code: "01",
    title: "BUILD",
    desc: "I like understanding how systems work underneath the interface — from transport layers and automation pipelines to distributed infrastructure. Code is the tool for turning low-level mechanics into robust capabilities.",
    icon: Code,
  },
  {
    code: "02",
    title: "EXPERIMENT",
    desc: "I use projects to explore ideas that are difficult to understand from theory alone. Building working prototypes — whether simulating Kubernetes cluster telemetry or implementing zero-knowledge verification — provides grounded intuition.",
    icon: Compass,
  },
  {
    code: "03",
    title: "SYSTEMS",
    desc: "My interests sit somewhere between software engineering, artificial intelligence, cloud infrastructure, and developer tooling. I care about latency, telemetry, and deterministic reliability.",
    icon: Cpu,
  },
  {
    code: "04",
    title: "CURRENTLY",
    desc: "B.Tech CSE student at SRMIST (expected graduation May 2027), serving as Organizing Co-Lead in NWC Association while developing cloud-native and IoT healthcare systems.",
    icon: Terminal,
  },
];

const INTERESTS = [
  "Software Engineering",
  "Cloud & DevOps (Docker / K8s / AWS)",
  "Infrastructure Observability (Prometheus / Grafana)",
  "Test Automation & XPath Workflows",
  "Zero-Knowledge Proofs & Cryptography",
  "IoT & Healthcare Analytics",
  "Web3 & Smart Contracts",
  "Database Systems (PostgreSQL)",
  "Developer Tools & CI/CD Pipelines",
];

export default function AboutPage() {
  const { playHover, playClick } = useSound();

  return (
    <PageTransition>
      <div className="w-full px-6 sm:px-12 md:px-16 pt-36 pb-24 max-w-6xl mx-auto flex flex-col gap-16">
        {/* Header */}
        <div className="flex flex-col gap-6 pb-8 border-b border-white/10">
          <div className="flex items-center gap-3">
            <span className="font-mono text-xs text-neutral-400 tracking-widest uppercase">
              // INDEX 02
            </span>
            <span className="text-neutral-600">·</span>
            <span className="font-mono text-xs text-emerald-400 uppercase">
              IDENTITY, PHILOSOPHY & ACADEMIC BACKGROUND
            </span>
          </div>
          <h1 className="text-4xl sm:text-6xl md:text-7xl font-bold tracking-tight text-white uppercase text-editorial-title">
            About
          </h1>
          <p className="text-lg text-neutral-300 font-light max-w-3xl leading-relaxed">
            Software engineer based in Chennai, India. Focused on building reliable software systems across cloud infrastructure, test automation, IoT healthcare analytics, and cryptographic verification.
          </p>
        </div>

        {/* Section 01: Core Philosophies Grid */}
        <div className="flex flex-col gap-8">
          <span className="font-mono text-xs text-neutral-400 tracking-widest uppercase">
            // 01 ENGINEERING APPROACH
          </span>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {PHILOSOPHIES.map((p) => {
              const Icon = p.icon;
              return (
                <div
                  key={p.code}
                  className="p-8 rounded-2xl border border-white/10 bg-neutral-900/40 flex flex-col justify-between gap-6 hover:border-white/20 transition-all"
                >
                  <div className="flex items-center justify-between font-mono text-xs text-neutral-400">
                    <span className="text-emerald-400 font-bold">{p.code}</span>
                    <Icon className="w-4 h-4 text-neutral-500" />
                  </div>

                  <div className="flex flex-col gap-2">
                    <h2 className="text-2xl font-bold text-white tracking-tight">
                      {p.title}
                    </h2>
                    <p className="text-sm text-neutral-300 leading-relaxed font-light">
                      {p.desc}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Section 02: Academic Profile & Performance */}
        <div className="flex flex-col gap-8 pt-8 border-t border-white/10">
          <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-2">
            <div>
              <span className="font-mono text-xs text-neutral-400 tracking-widest uppercase">
                // 02 ACADEMIC FOUNDATION
              </span>
              <h2 className="text-2xl font-bold text-white uppercase mt-1">
                SRM Institute of Science and Technology
              </h2>
            </div>
            <span className="font-mono text-xs text-neutral-400">
              CHENNAI, INDIA · 2023 — MAY 2027
            </span>
          </div>

          <div className="p-8 rounded-2xl border border-white/10 bg-neutral-900/30 flex flex-col gap-8">
            <div className="flex flex-col gap-2">
              <div className="flex items-center gap-2 text-white font-mono text-base font-bold">
                <GraduationCap className="w-5 h-5 text-emerald-400" />
                <span>Bachelor of Technology in Computer Science and Engineering</span>
              </div>
              <span className="text-xs font-mono text-neutral-400">
                Current Status: SRMIST CSE · Expected Graduation: May 2027
              </span>
            </div>

            {/* Academic Metrics */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 font-mono">
              {EDUCATION.metrics.map((m) => (
                <div
                  key={m.label}
                  className="p-5 rounded-xl border border-white/10 bg-black/60 flex flex-col gap-1"
                >
                  <span className="text-[10px] text-neutral-500 uppercase">{m.label}</span>
                  <span className="text-3xl font-bold text-emerald-400">{m.value}</span>
                  <span className="text-[10px] text-neutral-400">{m.sub}</span>
                </div>
              ))}
            </div>

            {/* Core Coursework */}
            <div className="flex flex-col gap-3 pt-4 border-t border-white/10 font-mono text-xs">
              <span className="text-neutral-500 uppercase">// KEY COURSEWORK:</span>
              <div className="flex flex-wrap gap-2">
                {EDUCATION.coursework.map((course) => (
                  <span
                    key={course}
                    className="px-3 py-1 rounded-md border border-white/10 bg-neutral-900 text-neutral-300"
                  >
                    {course}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Section 03: Certifications */}
        <div className="flex flex-col gap-8 pt-8 border-t border-white/10">
          <span className="font-mono text-xs text-neutral-400 tracking-widest uppercase">
            // 03 PROFESSIONAL CERTIFICATIONS
          </span>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {CERTIFICATIONS.map((cert) => (
              <div
                key={cert.id}
                className="p-6 rounded-2xl border border-white/10 bg-neutral-900/40 flex items-center justify-between gap-4 font-mono"
              >
                <div className="flex items-center gap-3">
                  <div className="p-2.5 rounded-lg bg-emerald-500/10 border border-emerald-500/20 text-emerald-400">
                    <Award className="w-5 h-5" />
                  </div>
                  <div className="flex flex-col">
                    <span className="text-white font-bold text-sm">{cert.title}</span>
                    <span className="text-xs text-neutral-400">Issued by {cert.issuer}</span>
                  </div>
                </div>
                <span className="px-3 py-1 rounded border border-white/10 bg-black/60 text-xs text-emerald-400 font-bold">
                  {cert.year}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Section 04: Primary Technical Interests */}
        <div className="flex flex-col gap-8 pt-8 border-t border-white/10">
          <span className="font-mono text-xs text-neutral-400 tracking-widest uppercase">
            // 04 DOMAINS OF CURIOSITY
          </span>

          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 font-mono text-xs">
            {INTERESTS.map((interest, i) => (
              <div
                key={interest}
                className="p-4 rounded-xl border border-white/10 bg-neutral-900/30 flex items-center gap-3 text-neutral-200 hover:border-white/20 transition-colors"
              >
                <span className="text-emerald-400 text-[10px]">0{i + 1}</span>
                <span>{interest}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Navigation */}
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
            href="/experience"
            onMouseEnter={() => playHover()}
            onClick={() => playClick()}
            data-cursor="EXPERIENCE"
            className="flex items-center gap-2 font-mono text-xs text-white hover:text-emerald-400 transition-colors"
          >
            <span>NEXT: EXPERIENCE →</span>
          </Link>
        </div>
      </div>
    </PageTransition>
  );
}
