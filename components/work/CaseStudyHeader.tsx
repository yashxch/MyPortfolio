"use client";

import Link from "next/link";
import { ArrowLeft, ArrowUpRight } from "lucide-react";
import { ProjectItem } from "@/lib/data/projects";
import { useSound } from "../ui/AudioToggle";

export default function CaseStudyHeader({ project }: { project: ProjectItem }) {
  const { playHover, playClick } = useSound();

  return (
    <div className="w-full flex flex-col gap-8 pb-12 border-b border-white/10">
      {/* Back Link */}
      <div className="flex items-center justify-between">
        <Link
          href="/work"
          onMouseEnter={() => playHover()}
          onClick={() => playClick()}
          data-cursor="BACK"
          className="inline-flex items-center gap-2 font-mono text-xs text-neutral-400 hover:text-white transition-colors"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>ALL CASE STUDIES</span>
        </Link>
        <span className="font-mono text-xs text-neutral-500">
          CASE {project.number} / 04
        </span>
      </div>

      {/* Main Title & Tagline */}
      <div className="flex flex-col gap-4 max-w-4xl">
        <div className="flex items-center gap-3">
          <span className="font-mono text-xs text-emerald-400 tracking-wider uppercase">
            // {project.category}
          </span>
          <span className="text-neutral-600">·</span>
          <span className="font-mono text-xs text-neutral-400">{project.year}</span>
        </div>
        <h1 className="text-3xl sm:text-5xl md:text-6xl font-bold tracking-tight text-white uppercase text-editorial-title">
          {project.title}
        </h1>
        <p className="text-lg sm:text-xl text-neutral-300 font-light leading-relaxed">
          {project.tagline}
        </p>
      </div>

      {/* Metadata Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 pt-6 border-t border-white/10 font-mono text-xs">
        <div className="flex flex-col gap-1">
          <span className="text-neutral-500">ROLE & CONTRIBUTION</span>
          <span className="text-white font-medium">{project.role}</span>
        </div>
        <div className="flex flex-col gap-1">
          <span className="text-neutral-500">STATUS</span>
          <div className="flex items-center gap-2 text-white">
            <span
              className="h-2 w-2 rounded-full"
              style={{ backgroundColor: project.accentColor }}
            />
            <span>{project.status}</span>
          </div>
        </div>
        <div className="flex flex-col gap-1">
          <span className="text-neutral-500">CATEGORY</span>
          <span className="text-white">{project.categorySlug.toUpperCase()}</span>
        </div>
        <div className="flex flex-col gap-1">
          <span className="text-neutral-500">SOURCE REPO</span>
          {project.links && project.links[0] ? (
            <a
              href={project.links[0].url}
              target="_blank"
              rel="noreferrer"
              onMouseEnter={() => playHover()}
              className="text-emerald-400 hover:text-emerald-300 flex items-center gap-1"
              data-cursor="OPEN ↗"
            >
              <span>{project.links[0].label}</span>
              <ArrowUpRight className="w-3 h-3" />
            </a>
          ) : (
            <span className="text-neutral-400">Private / Spec</span>
          )}
        </div>
      </div>
    </div>
  );
}
