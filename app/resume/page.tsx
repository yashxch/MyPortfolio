"use client";

import Link from "next/link";
import { ArrowLeft, ArrowUpRight, Award, Download, Printer, Shield } from "lucide-react";
import PageTransition from "@/components/layout/PageTransition";
import { CERTIFICATIONS, EDUCATION, EXPERIENCES } from "@/lib/data/experience";
import { PROJECTS } from "@/lib/data/projects";
import { SKILL_CATEGORIES } from "@/lib/data/skills";
import { useSound } from "@/components/ui/AudioToggle";

export default function ResumePage() {
  const { playHover, playClick } = useSound();

  const handlePrint = () => {
    playClick();
    if (typeof window !== "undefined") {
      window.print();
    }
  };

  return (
    <PageTransition>
      <div className="w-full px-6 sm:px-12 md:px-16 pt-36 pb-24 max-w-5xl mx-auto flex flex-col gap-12">
        {/* Top Control Bar */}
        <div className="flex flex-wrap items-center justify-between gap-4 pb-6 border-b border-white/10">
          <Link
            href="/"
            onMouseEnter={() => playHover()}
            onClick={() => playClick()}
            className="flex items-center gap-2 font-mono text-xs text-neutral-400 hover:text-white transition-colors"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>RETURN TO PORTFOLIO</span>
          </Link>

          <div className="flex items-center gap-3 font-mono text-xs">
            <button
              onClick={handlePrint}
              onMouseEnter={() => playHover()}
              data-cursor="PRINT"
              className="px-4 py-2 rounded-full border border-white/15 bg-neutral-900/60 text-white hover:border-white/40 transition-colors flex items-center gap-2"
            >
              <Printer className="w-3.5 h-3.5" />
              <span>Print / Save as PDF ↗</span>
            </button>
          </div>
        </div>

        {/* Clean Editorial Résumé Sheet */}
        <div className="p-8 sm:p-12 md:p-16 rounded-2xl border border-white/15 bg-[#0a0a0c] flex flex-col gap-12 text-neutral-200 shadow-2xl">
          {/* Header */}
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6 pb-8 border-b border-white/10">
            <div className="flex flex-col gap-1">
              <h1 className="text-3xl sm:text-4xl font-bold tracking-tight text-white uppercase">
                Yashwanth CH
              </h1>
              <p className="text-sm text-emerald-400 font-mono">
                Software Engineer — Systems, Cloud & AI Infrastructure
              </p>
              <p className="text-xs text-neutral-400 pt-1 font-mono">
                +91 8217854968 · yashspam15@gmail.com · Chennai, India
              </p>
            </div>

            <div className="flex items-center gap-4 font-mono text-xs text-neutral-400">
              <a
                href="https://github.com/yashxch"
                target="_blank"
                rel="noreferrer"
                className="hover:text-white transition-colors flex items-center gap-1"
              >
                github.com/yashxch <ArrowUpRight className="w-3 h-3" />
              </a>
              <a
                href="https://www.linkedin.com/in/yashwanthchalumuri"
                target="_blank"
                rel="noreferrer"
                className="hover:text-white transition-colors flex items-center gap-1"
              >
                linkedin.com/in/yashwanthchalumuri <ArrowUpRight className="w-3 h-3" />
              </a>
            </div>
          </div>

          {/* 01: Education */}
          <div className="flex flex-col gap-4">
            <span className="font-mono text-xs text-neutral-400 tracking-wider uppercase font-bold">
              01 // EDUCATION
            </span>
            <div className="flex flex-col gap-2">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between text-sm">
                <span className="font-bold text-white">
                  SRM Institute of Science and Technology
                </span>
                <span className="font-mono text-xs text-neutral-400">
                  Expected May 2027
                </span>
              </div>
              <div className="text-xs text-neutral-300">
                B.Tech in Computer Science and Engineering
              </div>
              <div className="flex flex-wrap gap-4 font-mono text-xs text-emerald-400 pt-1">
                <span>CGPA: 8.09</span>
              </div>
            </div>
          </div>

          {/* 02: Experience */}
          <div className="flex flex-col gap-6 pt-4 border-t border-white/10">
            <span className="font-mono text-xs text-neutral-400 tracking-wider uppercase font-bold">
              02 // EXPERIENCE
            </span>
            <div className="flex flex-col gap-6">
              {EXPERIENCES.map((exp) => (
                <div key={exp.id} className="flex flex-col gap-2">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between text-sm">
                    <span className="font-bold text-white">
                      {exp.role} — <span className="text-neutral-300 font-normal">{exp.organization}</span>
                    </span>
                    <span className="font-mono text-xs text-neutral-400">
                      {exp.period} · {exp.location}
                    </span>
                  </div>
                  <ul className="flex flex-col gap-1.5 text-xs text-neutral-300 list-disc list-inside leading-relaxed pt-1">
                    {exp.highlights.map((h, i) => (
                      <li key={i}>{h}</li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>

          {/* 03: Selected Technical Projects */}
          <div className="flex flex-col gap-6 pt-4 border-t border-white/10">
            <span className="font-mono text-xs text-neutral-400 tracking-wider uppercase font-bold">
              03 // TECHNICAL PROJECTS
            </span>
            <div className="flex flex-col gap-6">
              {PROJECTS.map((p) => (
                <div key={p.id} className="flex flex-col gap-1.5">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between text-sm">
                    <span className="font-bold text-white">
                      {p.title} <span className="font-mono text-xs text-neutral-400 font-normal">| {p.technologies.slice(0, 5).join(", ")}</span>
                    </span>
                    <span className="font-mono text-xs text-neutral-400">{p.year}</span>
                  </div>
                  <ul className="flex flex-col gap-1 text-xs text-neutral-300 list-disc list-inside leading-relaxed pt-1">
                    {p.implementation.map((h, i) => (
                      <li key={i}>{h}</li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>

          {/* 04: Technical Skills */}
          <div className="flex flex-col gap-4 pt-4 border-t border-white/10 font-mono text-xs">
            <span className="text-neutral-400 tracking-wider uppercase font-bold">
              04 // TECHNICAL SKILLS
            </span>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {SKILL_CATEGORIES.map((cat) => (
                <div key={cat.code} className="flex flex-col gap-1">
                  <span className="text-neutral-500 uppercase">{cat.title}:</span>
                  <span className="text-neutral-200">{cat.items.join(", ")}</span>
                </div>
              ))}
            </div>
          </div>

          {/* 05: Certifications */}
          <div className="flex flex-col gap-4 pt-4 border-t border-white/10 font-mono text-xs">
            <span className="text-neutral-400 tracking-wider uppercase font-bold">
              05 // CERTIFICATIONS
            </span>
            <div className="flex flex-col gap-2">
              {CERTIFICATIONS.map((cert) => (
                <div key={cert.id} className="flex flex-col sm:flex-row sm:items-center justify-between text-xs">
                  <div className="flex items-center gap-2">
                    <Award className="w-4 h-4 text-emerald-400" />
                    <span className="text-white font-bold">{cert.title}</span>
                    <span className="text-neutral-400 font-normal">— {cert.issuer}</span>
                  </div>
                  <span className="text-neutral-400">{cert.year}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </PageTransition>
  );
}
