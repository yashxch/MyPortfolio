"use client";

import { useState } from "react";
import { ArrowUpRight, GitBranch, GitCommit, GitPullRequest, Terminal } from "lucide-react";
import { useSound } from "../ui/AudioToggle";

const REPOSITORIES = [
  {
    name: "optical-network-power-saver",
    desc: "Digital twin & deterministic power saving policy simulation for DWDM/OTN transport fabrics.",
    lang: "Python",
    langColor: "#3572A5",
    stars: "Featured",
    forks: "Active",
  },
  {
    name: "ZKVeritas-Prototype",
    desc: "Zero-knowledge inspired synthetic healthcare data similarity and challenge-response validation.",
    lang: "Python / CTGAN",
    langColor: "#3572A5",
    stars: "Research",
    forks: "Active",
  },
  {
    name: "pulsehalo-embedded",
    desc: "ESP32 firmware & low-latency telemetry backend for neonatal ECG and thermal monitoring.",
    lang: "C++ / FreeRTOS",
    langColor: "#f34b7d",
    stars: "IoT",
    forks: "Built",
  },
  {
    name: "EnergyIQ-Federated",
    desc: "Decentralized microgrid anomaly detection using Flower federated learning & QUBO optimization.",
    lang: "Python / Flower",
    langColor: "#3572A5",
    stars: "Distributed",
    forks: "Active",
  },
];

export default function GithubActivity() {
  const [activeTab] = useState("repos");
  const { playHover } = useSound();

  return (
    <section className="w-full px-6 sm:px-12 md:px-16 py-24 border-b border-white/10 bg-neutral-950/40">
      <div className="max-w-7xl mx-auto flex flex-col gap-12">
        {/* Section Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 pb-6 border-b border-white/10">
          <div>
            <span className="font-mono text-xs text-neutral-400 tracking-widest uppercase">
              // OPEN SOURCE & ENGINEERING TELEMETRY
            </span>
            <h2 className="text-3xl sm:text-5xl font-bold tracking-tight text-white uppercase mt-1">
              Developer Activity
            </h2>
          </div>
          <a
            href="https://github.com/yashxch"
            target="_blank"
            rel="noreferrer"
            onMouseEnter={() => playHover()}
            data-cursor="OPEN ↗"
            className="flex items-center gap-2 font-mono text-xs text-neutral-400 hover:text-white transition-colors"
          >
            <span>GITHUB.COM/YASHXCH</span>
            <ArrowUpRight className="w-3.5 h-3.5" />
          </a>
        </div>

        {/* Compact Terminal Telemetry & Repo Matrix */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left: Repositories List */}
          <div className="lg:col-span-7 flex flex-col gap-4">
            <span className="font-mono text-xs text-neutral-400 uppercase">
              // SELECTED CODE REPOSITORIES
            </span>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {REPOSITORIES.map((repo) => (
                <a
                  key={repo.name}
                  href="https://github.com/yashxch"
                  target="_blank"
                  rel="noreferrer"
                  onMouseEnter={() => playHover()}
                  data-cursor="VIEW REPO"
                  className="p-5 rounded-xl border border-white/10 bg-neutral-900/50 hover:border-white/30 hover:bg-neutral-900/80 transition-all flex flex-col justify-between gap-4 group"
                >
                  <div className="flex flex-col gap-2">
                    <div className="flex items-center justify-between font-mono text-xs">
                      <span className="font-bold text-white group-hover:text-emerald-400 transition-colors truncate">
                        {repo.name}
                      </span>
                      <ArrowUpRight className="w-3.5 h-3.5 opacity-0 group-hover:opacity-100 transition-opacity text-emerald-400" />
                    </div>
                    <p className="text-xs text-neutral-400 leading-relaxed line-clamp-2">
                      {repo.desc}
                    </p>
                  </div>

                  <div className="flex items-center justify-between font-mono text-[10px] text-neutral-400 pt-3 border-t border-white/5">
                    <div className="flex items-center gap-1.5">
                      <span
                        className="h-2 w-2 rounded-full"
                        style={{ backgroundColor: repo.langColor }}
                      />
                      <span>{repo.lang}</span>
                    </div>
                    <span className="px-1.5 py-0.5 rounded border border-white/10 text-neutral-400">
                      {repo.stars}
                    </span>
                  </div>
                </a>
              ))}
            </div>
          </div>

          {/* Right: Telemetry & Activity Pulse */}
          <div className="lg:col-span-5 p-6 rounded-xl border border-white/10 bg-black/60 font-mono flex flex-col gap-6 shadow-2xl">
            <div className="flex items-center justify-between border-b border-white/10 pb-4 text-xs text-neutral-400">
              <div className="flex items-center gap-2">
                <Terminal className="w-3.5 h-3.5 text-emerald-400" />
                <span className="text-white font-bold">TELEMETRY / YASHXCH</span>
              </div>
              <span className="text-[10px] text-emerald-400 animate-pulse">● LIVE SIGNAL</span>
            </div>

            <div className="flex flex-col gap-3 text-xs text-neutral-300 leading-relaxed">
              <div className="flex justify-between items-center py-1 border-b border-white/5">
                <span className="text-neutral-500">PRIMARY FOCUS:</span>
                <span className="text-white">Systems, AI Infra & Automation</span>
              </div>
              <div className="flex justify-between items-center py-1 border-b border-white/5">
                <span className="text-neutral-500">CORE LANGUAGES:</span>
                <span className="text-white">Python, Java, C, TypeScript</span>
              </div>
              <div className="flex justify-between items-center py-1 border-b border-white/5">
                <span className="text-neutral-500">PIPELINE TOOLS:</span>
                <span className="text-white">Docker, K8s, Jenkins, InfluxDB</span>
              </div>
              <div className="flex justify-between items-center py-1 border-b border-white/5">
                <span className="text-neutral-500">DEV ENVIRONMENT:</span>
                <span className="text-white">Linux / POSIX, Git, VS Code</span>
              </div>
            </div>

            <div className="p-4 rounded-lg bg-neutral-900/60 border border-white/5 flex flex-col gap-2 text-xs">
              <div className="flex items-center gap-2 text-neutral-400">
                <GitCommit className="w-3.5 h-3.5 text-emerald-400" />
                <span className="text-neutral-300">Recent Architecture Updates:</span>
              </div>
              <div className="text-[11px] text-neutral-400 pl-5 flex flex-col gap-1">
                <div>• InfluxDB telemetry exporter optimization</div>
                <div>• Zero-knowledge challenge verification engine</div>
                <div>• XPath automated locator regression suite</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
