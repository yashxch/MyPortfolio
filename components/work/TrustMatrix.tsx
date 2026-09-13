"use client";

import { useState } from "react";
import { ArrowRight, CheckCircle2, Cpu, RefreshCw, ShieldAlert, Sparkles, Zap } from "lucide-react";
import { useSound } from "../ui/AudioToggle";

interface EnergyNode {
  id: string;
  name: string;
  type: "Residential Solar" | "Battery Storage" | "Commercial Microgrid" | "EV Charging Hub";
  currentLoadKw: number;
  anomalyScore: number;
  trustScore: number;
  trustState: "STABLE" | "WARNING" | "FAULTY";
  creditsEarned: number;
}

const INITIAL_NODES: EnergyNode[] = [
  {
    id: "n-alpha",
    name: "NODE 01 // SECTOR A-SOLAR",
    type: "Residential Solar",
    currentLoadKw: 14.2,
    anomalyScore: 0.04,
    trustScore: 98,
    trustState: "STABLE",
    creditsEarned: 142.5,
  },
  {
    id: "n-beta",
    name: "NODE 02 // BATT-BANK-04",
    type: "Battery Storage",
    currentLoadKw: 38.6,
    anomalyScore: 0.08,
    trustScore: 94,
    trustState: "STABLE",
    creditsEarned: 380.0,
  },
  {
    id: "n-gamma",
    name: "NODE 03 // COMM-SUB-GRID",
    type: "Commercial Microgrid",
    currentLoadKw: 72.1,
    anomalyScore: 0.38,
    trustScore: 72,
    trustState: "WARNING",
    creditsEarned: 45.0,
  },
  {
    id: "n-delta",
    name: "NODE 04 // EV-STATION-NORTH",
    type: "EV Charging Hub",
    currentLoadKw: 94.0,
    anomalyScore: 0.86,
    trustScore: 32,
    trustState: "FAULTY",
    creditsEarned: 0.0,
  },
];

export default function TrustMatrix() {
  const [nodes, setNodes] = useState<EnergyNode[]>(INITIAL_NODES);
  const [selectedNode, setSelectedNode] = useState<EnergyNode>(INITIAL_NODES[0]);
  const [aggregationRound, setAggregationRound] = useState(15);
  const [isAggregating, setIsAggregating] = useState(false);
  const { playClick, playHover, playSuccess } = useSound();

  const runFederatedRound = () => {
    setIsAggregating(true);
    playClick();

    setTimeout(() => {
      setAggregationRound((prev) => prev + 1);
      // Simulate slight trust score recalibration
      setNodes((prev) =>
        prev.map((n) => {
          if (n.trustState === "FAULTY") {
            return { ...n, trustScore: 28, anomalyScore: 0.91 };
          }
          if (n.trustState === "WARNING") {
            return { ...n, trustScore: 78, trustState: "STABLE", anomalyScore: 0.18 };
          }
          return { ...n, creditsEarned: +(n.creditsEarned + 12.5).toFixed(1) };
        })
      );
      setIsAggregating(false);
      playSuccess();
    }, 800);
  };

  return (
    <div className="w-full rounded-2xl border border-white/15 bg-black/80 font-mono text-xs overflow-hidden shadow-2xl">
      {/* Header Bar */}
      <div className="flex flex-wrap items-center justify-between gap-4 p-4 border-b border-white/10 bg-neutral-900/80">
        <div className="flex items-center gap-3">
          <Zap className="w-4 h-4 text-amber-400" />
          <span className="font-bold text-white tracking-wider">
            ENERGYIQ // FLOWER FEDERATED LEARNING & TRUST SCORING MATRIX
          </span>
        </div>

        <button
          onClick={runFederatedRound}
          disabled={isAggregating}
          className="px-3.5 py-1.5 rounded-md border border-amber-500/40 bg-amber-950/30 text-amber-300 font-mono text-xs hover:border-amber-400 transition-all flex items-center gap-2 disabled:opacity-50"
        >
          <RefreshCw className={`w-3.5 h-3.5 ${isAggregating ? "animate-spin" : ""}`} />
          <span>{isAggregating ? "AGGREGATING FL WEIGHTS..." : `TRIGGER FL ROUND #${aggregationRound + 1}`}</span>
        </button>
      </div>

      {/* System Pipeline Bar */}
      <div className="p-4 border-b border-white/10 bg-neutral-950/70 flex flex-wrap items-center justify-between gap-2 text-[10px] text-neutral-400">
        <span className="text-white font-bold">DATAFLOW:</span>
        <span>[1] Edge Energy Nodes</span>
        <ArrowRight className="w-3 h-3 text-neutral-600" />
        <span>[2] Local Isolation Forest</span>
        <ArrowRight className="w-3 h-3 text-neutral-600" />
        <span>[3] Flower Federated Aggregator</span>
        <ArrowRight className="w-3 h-3 text-neutral-600" />
        <span>[4] Decentralized Trust Scoring</span>
        <ArrowRight className="w-3 h-3 text-neutral-600" />
        <span>[5] QUBO / Credit Settlement</span>
      </div>

      {/* Main Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 divide-y lg:divide-y-0 lg:divide-x divide-white/10">
        {/* Left: Node Array Matrix */}
        <div className="lg:col-span-7 p-6 flex flex-col gap-4">
          <span className="text-[11px] text-neutral-400 uppercase tracking-wider">
            // MICROGRID NODE FLEET
          </span>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {nodes.map((node) => {
              const isSelected = selectedNode.id === node.id;
              const isStable = node.trustState === "STABLE";
              const isWarning = node.trustState === "WARNING";

              return (
                <div
                  key={node.id}
                  onMouseEnter={() => {
                    setSelectedNode(node);
                    playHover();
                  }}
                  onClick={() => {
                    setSelectedNode(node);
                    playClick();
                  }}
                  className={`p-4 rounded-xl border cursor-pointer transition-all ${
                    isSelected
                      ? "border-amber-500/80 bg-amber-950/20 shadow-[0_0_15px_rgba(234,179,8,0.1)]"
                      : "border-white/10 bg-neutral-900/40 hover:border-white/30"
                  }`}
                >
                  <div className="flex items-center justify-between pb-2">
                    <span className="font-bold text-white text-xs">{node.name}</span>
                    <span
                      className={`px-1.5 py-0.5 rounded text-[9px] font-bold ${
                        isStable
                          ? "bg-emerald-500/20 text-emerald-400 border border-emerald-500/30"
                          : isWarning
                          ? "bg-amber-500/20 text-amber-400 border border-amber-500/30"
                          : "bg-red-500/20 text-red-400 border border-red-500/30"
                      }`}
                    >
                      {node.trustState}
                    </span>
                  </div>

                  <div className="flex flex-col gap-1 text-[11px] text-neutral-400">
                    <div className="flex justify-between">
                      <span>Node Type:</span>
                      <span className="text-white">{node.type}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Trust Score:</span>
                      <span className="text-white font-bold">{node.trustScore} / 100</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Credits Generated:</span>
                      <span className="text-amber-300">{node.creditsEarned} kWh-EQ</span>
                    </div>
                  </div>

                  {/* Trust Level Indicator */}
                  <div className="w-full h-1.5 bg-neutral-800 rounded-full mt-3 overflow-hidden">
                    <div
                      className={`h-full transition-all duration-300 ${
                        isStable ? "bg-emerald-400" : isWarning ? "bg-amber-400" : "bg-red-400"
                      }`}
                      style={{ width: `${node.trustScore}%` }}
                    />
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Right: Selected Node Anomaly Profiler */}
        <div className="lg:col-span-5 p-6 flex flex-col justify-between gap-6 bg-neutral-950/40">
          <div className="flex flex-col gap-4">
            <div className="flex items-center justify-between border-b border-white/10 pb-3">
              <span className="text-[11px] text-neutral-400 uppercase tracking-wider">
                // NODE TRUST DIAGNOSTICS
              </span>
              <Cpu className="w-3.5 h-3.5 text-amber-400" />
            </div>

            <div className="flex flex-col gap-3 text-xs">
              <div className="text-sm font-bold text-white">{selectedNode.name}</div>
              <div className="grid grid-cols-2 gap-3">
                <div className="p-3 rounded-lg bg-neutral-900/80 border border-white/5 flex flex-col gap-1">
                  <span className="text-[10px] text-neutral-500 uppercase">LOAD PROFILE</span>
                  <span className="text-white font-bold">{selectedNode.currentLoadKw} kW</span>
                </div>
                <div className="p-3 rounded-lg bg-neutral-900/80 border border-white/5 flex flex-col gap-1">
                  <span className="text-[10px] text-neutral-500 uppercase">ISOLATION SCORE</span>
                  <span
                    className={`font-bold ${
                      selectedNode.anomalyScore > 0.3 ? "text-red-400" : "text-emerald-400"
                    }`}
                  >
                    {selectedNode.anomalyScore}
                  </span>
                </div>
              </div>

              <div className="p-4 rounded-xl border border-white/10 bg-black/60 flex flex-col gap-2">
                <span className="text-[10px] text-neutral-400 uppercase">// FEDERATED WEIGHT PAYLOAD</span>
                <pre className="text-[10px] text-amber-300/90 overflow-x-auto p-2 bg-neutral-950 rounded">
{`{
  "client_id": "${selectedNode.id}",
  "fl_round": ${aggregationRound},
  "anomaly_classifier": "IsolationForest(n_estimators=100)",
  "trust_evaluation": "${selectedNode.trustState}",
  "immutable_settlement": ${selectedNode.trustState === "FAULTY" ? "FROZEN_FOR_REVIEW" : "VALIDATED"}
}`}
                </pre>
              </div>
            </div>
          </div>

          <div className="text-[10px] text-neutral-500 leading-relaxed border-t border-white/10 pt-4">
            Combines Flower federated orchestration for edge privacy with localized Isolation Forest anomaly classification and QUBO-inspired energy credit settlement.
          </div>
        </div>
      </div>
    </div>
  );
}
