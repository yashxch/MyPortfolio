"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, Layers, Network } from "lucide-react";
import { SKILL_CATEGORIES, CONNECTED_PIPELINES, ConnectedPipeline } from "@/lib/data/skills";
import { useSound } from "../ui/AudioToggle";

export default function SystemGraph() {
  const [activePipeline, setActivePipeline] = useState<ConnectedPipeline | null>(
    CONNECTED_PIPELINES[0] // Default highlight Docker -> K8s -> AWS
  );
  const { playHover, playClick } = useSound();

  const handleSkillHover = (skill: string) => {
    const matched = CONNECTED_PIPELINES.find(
      (p) => p.triggerSkill.toLowerCase() === skill.toLowerCase()
    );
    if (matched) {
      setActivePipeline(matched);
      playHover();
    }
  };

  return (
    <section className="w-full px-6 sm:px-12 md:px-16 py-24 border-b border-white/10 bg-neutral-950/40">
      <div className="max-w-7xl mx-auto flex flex-col gap-12">
        {/* Section Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 pb-6 border-b border-white/10">
          <div>
            <span className="font-mono text-xs text-neutral-400 tracking-widest uppercase">
              // TECHNICAL CAPABILITIES
            </span>
            <h2 className="text-3xl sm:text-5xl font-bold tracking-tight text-white uppercase mt-1">
              Systems & Architecture
            </h2>
          </div>
          <div className="flex items-center gap-2 font-mono text-xs text-neutral-400">
            <Network className="w-4 h-4 text-emerald-400" />
            <span>INTERACTIVE CONNECTIVITY GRAPH</span>
          </div>
        </div>

        {/* Live Active Pipeline Visualizer Card */}
        <div className="p-6 sm:p-8 rounded-xl border border-white/10 bg-neutral-900/70 backdrop-blur-md flex flex-col gap-4 shadow-2xl">
          <div className="flex flex-wrap items-center justify-between gap-2 border-b border-white/10 pb-4">
            <div className="flex items-center gap-2 font-mono text-xs text-neutral-400">
              <Layers className="w-3.5 h-3.5 text-emerald-400" />
              <span className="text-neutral-300 font-bold uppercase">
                ACTIVE PIPELINE: {activePipeline?.triggerSkill || "HOVER A HIGHLIGHTED SKILL"}
              </span>
            </div>
            <span className="font-mono text-[10px] text-neutral-400">
              [ HOVER CONNECTED SKILLS TO TRACE DATAFLOW ]
            </span>
          </div>

          <AnimatePresence mode="wait">
            {activePipeline ? (
              <motion.div
                key={activePipeline.triggerSkill}
                initial={{ opacity: 0, y: 6 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -6 }}
                transition={{ duration: 0.2 }}
                className="flex flex-col gap-4"
              >
                {/* Visual Pipeline Nodes */}
                <div className="flex flex-wrap items-center gap-2 sm:gap-3 pt-2">
                  {activePipeline.pipeline.map((node, i) => (
                    <div key={node} className="flex items-center gap-2 sm:gap-3">
                      <div className="px-3.5 py-1.5 rounded-lg border border-emerald-500/40 bg-emerald-950/30 text-emerald-300 font-mono text-xs font-semibold tracking-wide flex items-center gap-2 shadow-[0_0_12px_rgba(34,197,94,0.1)]">
                        <span className="text-[10px] text-emerald-500/80">0{i + 1}</span>
                        <span>{node}</span>
                      </div>
                      {i < activePipeline.pipeline.length - 1 && (
                        <ArrowRight className="w-3.5 h-3.5 text-neutral-600 shrink-0" />
                      )}
                    </div>
                  ))}
                </div>

                {/* Context Description */}
                <p className="text-sm font-mono text-neutral-300 leading-relaxed pt-2">
                  <span className="text-neutral-500">// ARCHITECTURE CONTEXT: </span>
                  {activePipeline.context}
                </p>
              </motion.div>
            ) : null}
          </AnimatePresence>
        </div>

        {/* Skill System Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {SKILL_CATEGORIES.map((category) => (
            <div
              key={category.code}
              className="p-6 rounded-xl border border-white/10 bg-neutral-900/30 flex flex-col justify-between gap-6 hover:border-white/20 transition-all"
            >
              <div className="flex flex-col gap-2">
                <div className="flex items-center justify-between font-mono text-xs">
                  <span className="font-bold text-white tracking-wider uppercase">
                    {category.title}
                  </span>
                  <span className="text-neutral-500">{category.code}</span>
                </div>
                <p className="text-xs text-neutral-400 leading-relaxed">
                  {category.description}
                </p>
              </div>

              {/* Skills badges */}
              <div className="flex flex-wrap gap-2">
                {category.items.map((skill) => {
                  const hasPipeline = CONNECTED_PIPELINES.some(
                    (p) => p.triggerSkill.toLowerCase() === skill.toLowerCase()
                  );
                  const isPartActive =
                    activePipeline?.pipeline.some(
                      (p) => p.toLowerCase() === skill.toLowerCase()
                    ) || false;

                  return (
                    <button
                      key={skill}
                      onMouseEnter={() => handleSkillHover(skill)}
                      onClick={() => {
                        handleSkillHover(skill);
                        playClick();
                      }}
                      className={`px-3 py-1 rounded-md font-mono text-xs transition-all duration-200 text-left ${
                        isPartActive
                          ? "bg-emerald-500/20 text-emerald-300 border border-emerald-500/50 shadow-[0_0_8px_rgba(34,197,94,0.15)]"
                          : hasPipeline
                          ? "bg-neutral-800/80 text-white border border-white/20 hover:border-emerald-400 hover:text-emerald-300"
                          : "bg-neutral-900/80 text-neutral-400 border border-white/5 hover:border-white/15 hover:text-neutral-200"
                      }`}
                      title={hasPipeline ? "Hover to inspect connected pipeline" : undefined}
                    >
                      <span>{skill}</span>
                      {hasPipeline && (
                        <span className="ml-1 text-[9px] text-emerald-400/80 font-bold">⚡</span>
                      )}
                    </button>
                  );
                })}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
