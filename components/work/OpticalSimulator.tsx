"use client";

import { useState } from "react";
import { Activity, Cpu, Power, RefreshCw, Server, Zap } from "lucide-react";
import { useSound } from "../ui/AudioToggle";

interface OpticalPort {
  id: string;
  name: string;
  type: "Client Port" | "Line Port (DWDM)" | "ROADM Channel";
  wavelength: string;
  trafficGbps: number;
  capacityGbps: number;
  state: "ACTIVE" | "IDLE" | "SLEEP" | "STANDBY";
  powerDrawWatts: number;
  recommendation: "MAINTAIN" | "SLEEP" | "WAKE" | "THROTTLE";
}

const INITIAL_PORTS: OpticalPort[] = [
  {
    id: "p01",
    name: "PORT 01 [100G-LR4]",
    type: "Client Port",
    wavelength: "1310 nm",
    trafficGbps: 86.4,
    capacityGbps: 100,
    state: "ACTIVE",
    powerDrawWatts: 45,
    recommendation: "MAINTAIN",
  },
  {
    id: "p02",
    name: "PORT 02 [100G-LR4]",
    type: "Client Port",
    wavelength: "1310 nm",
    trafficGbps: 42.1,
    capacityGbps: 100,
    state: "ACTIVE",
    powerDrawWatts: 45,
    recommendation: "MAINTAIN",
  },
  {
    id: "p03",
    name: "PORT 03 [100G-LR4]",
    type: "Client Port",
    wavelength: "1310 nm",
    trafficGbps: 0.0,
    capacityGbps: 100,
    state: "IDLE",
    powerDrawWatts: 42,
    recommendation: "SLEEP",
  },
  {
    id: "p04",
    name: "PORT 04 [200G-DWDM]",
    type: "Line Port (DWDM)",
    wavelength: "1550.12 nm (Ch 32)",
    trafficGbps: 178.5,
    capacityGbps: 200,
    state: "ACTIVE",
    powerDrawWatts: 110,
    recommendation: "MAINTAIN",
  },
  {
    id: "p05",
    name: "PORT 05 [200G-DWDM]",
    type: "Line Port (DWDM)",
    wavelength: "1550.92 nm (Ch 33)",
    trafficGbps: 0.0,
    capacityGbps: 200,
    state: "IDLE",
    powerDrawWatts: 105,
    recommendation: "SLEEP",
  },
  {
    id: "p06",
    name: "PORT 06 [ROADM-WSS]",
    type: "ROADM Channel",
    wavelength: "FlexGrid 50GHz",
    trafficGbps: 312.0,
    capacityGbps: 400,
    state: "ACTIVE",
    powerDrawWatts: 140,
    recommendation: "MAINTAIN",
  },
];

export default function OpticalSimulator() {
  const [ports, setPorts] = useState<OpticalPort[]>(INITIAL_PORTS);
  const [selectedPort, setSelectedPort] = useState<OpticalPort>(INITIAL_PORTS[2]);
  const [autoOptimize, setAutoOptimize] = useState(false);
  const { playClick, playHover, playSuccess } = useSound();

  const togglePolicy = () => {
    playClick();
    const newAuto = !autoOptimize;
    setAutoOptimize(newAuto);

    if (newAuto) {
      playSuccess();
      // Apply sleep to idle ports
      setPorts((prev) =>
        prev.map((p) => {
          if (p.recommendation === "SLEEP") {
            return {
              ...p,
              state: "SLEEP",
              powerDrawWatts: p.type === "Line Port (DWDM)" ? 18 : 6,
              recommendation: "MAINTAIN",
            };
          }
          return p;
        })
      );
    } else {
      // Revert to default baseline
      setPorts(INITIAL_PORTS);
    }
  };

  const totalPower = ports.reduce((acc, p) => acc + p.powerDrawWatts, 0);
  const baselinePower = 487; // Watts
  const savedPowerWatts = Math.max(0, baselinePower - totalPower);
  const savedPercentage = ((savedPowerWatts / baselinePower) * 100).toFixed(1);

  return (
    <div className="w-full rounded-2xl border border-white/15 bg-black/80 font-mono text-xs overflow-hidden shadow-2xl">
      {/* Top Console Bar */}
      <div className="flex flex-wrap items-center justify-between gap-4 p-4 border-b border-white/10 bg-neutral-900/80">
        <div className="flex items-center gap-3">
          <Server className="w-4 h-4 text-emerald-400" />
          <span className="font-bold text-white tracking-wider">
            NOKIA 1830 PSS // OPTICAL DIGITAL TWIN CONTROL PLANE
          </span>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={togglePolicy}
            className={`px-3 py-1.5 rounded-md border text-xs font-mono transition-all flex items-center gap-2 ${
              autoOptimize
                ? "bg-emerald-500/20 border-emerald-500 text-emerald-300 shadow-[0_0_12px_rgba(34,197,94,0.2)]"
                : "bg-neutral-800 border-white/20 text-neutral-300 hover:border-white/40"
            }`}
          >
            <Power className="w-3.5 h-3.5" />
            <span>{autoOptimize ? "AI POLICY: ENGAGED" : "ENABLE DETERMINISTIC POWER SAVING"}</span>
          </button>
        </div>
      </div>

      {/* Metrics Banner */}
      <div className="grid grid-cols-2 sm:grid-cols-4 divide-x divide-white/10 border-b border-white/10 bg-neutral-950/60 p-4">
        <div className="flex flex-col gap-1 px-2">
          <span className="text-[10px] text-neutral-500 uppercase">ACTIVE POWER DRAW</span>
          <span className="text-xl font-bold text-white">{totalPower} W</span>
        </div>
        <div className="flex flex-col gap-1 px-2">
          <span className="text-[10px] text-neutral-500 uppercase">TELEMETRY SAVINGS</span>
          <span className="text-xl font-bold text-emerald-400">
            -{savedPowerWatts} W ({savedPercentage}%)
          </span>
        </div>
        <div className="flex flex-col gap-1 px-2">
          <span className="text-[10px] text-neutral-500 uppercase">CONTROL ENGINE</span>
          <span className="text-xs text-neutral-300">Deterministic Safety Governor</span>
        </div>
        <div className="flex flex-col gap-1 px-2">
          <span className="text-[10px] text-neutral-500 uppercase">HYSTERESIS GUARD</span>
          <span className="text-xs text-emerald-400">ARMED (240s window)</span>
        </div>
      </div>

      {/* Main Grid: Visual Topology & Selected Port Details */}
      <div className="grid grid-cols-1 lg:grid-cols-12 divide-y lg:divide-y-0 lg:divide-x divide-white/10">
        {/* Left: Port Matrix Topology */}
        <div className="lg:col-span-7 p-6 flex flex-col gap-4">
          <span className="text-[11px] text-neutral-400 uppercase tracking-wider">
            // TRANSPONDER & ROADM PORT ARRAY
          </span>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {ports.map((p) => {
              const isSelected = selectedPort.id === p.id;
              const util = ((p.trafficGbps / p.capacityGbps) * 100).toFixed(0);

              return (
                <div
                  key={p.id}
                  onMouseEnter={() => {
                    setSelectedPort(p);
                    playHover();
                  }}
                  onClick={() => {
                    setSelectedPort(p);
                    playClick();
                  }}
                  className={`p-4 rounded-xl border cursor-pointer transition-all ${
                    isSelected
                      ? "border-emerald-500/80 bg-emerald-950/20 shadow-[0_0_15px_rgba(34,197,94,0.1)]"
                      : "border-white/10 bg-neutral-900/40 hover:border-white/30 hover:bg-neutral-900/70"
                  }`}
                >
                  <div className="flex items-center justify-between pb-2">
                    <span className="font-bold text-white text-xs">{p.name}</span>
                    <span
                      className={`px-1.5 py-0.5 rounded text-[9px] uppercase font-bold ${
                        p.state === "ACTIVE"
                          ? "bg-emerald-500/20 text-emerald-400 border border-emerald-500/30"
                          : p.state === "SLEEP"
                          ? "bg-blue-500/20 text-blue-400 border border-blue-500/30"
                          : "bg-amber-500/20 text-amber-400 border border-amber-500/30"
                      }`}
                    >
                      {p.state}
                    </span>
                  </div>

                  <div className="flex flex-col gap-1 text-[11px] text-neutral-400">
                    <div className="flex justify-between">
                      <span>Throughput:</span>
                      <span className="text-white">
                        {p.trafficGbps} / {p.capacityGbps} Gbps
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span>Power Dissipation:</span>
                      <span className="text-neutral-200">{p.powerDrawWatts} W</span>
                    </div>
                  </div>

                  {/* Utilization Bar */}
                  <div className="w-full h-1.5 bg-neutral-800 rounded-full mt-3 overflow-hidden">
                    <div
                      className="h-full bg-emerald-400 transition-all duration-300"
                      style={{ width: `${util}%` }}
                    />
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Right: Selected Node Telemetry Inspector */}
        <div className="lg:col-span-5 p-6 flex flex-col justify-between gap-6 bg-neutral-950/40">
          <div className="flex flex-col gap-4">
            <div className="flex items-center justify-between border-b border-white/10 pb-3">
              <span className="text-[11px] text-neutral-400 uppercase tracking-wider">
                // NODE TELEMETRY INSPECTOR
              </span>
              <Activity className="w-3.5 h-3.5 text-emerald-400" />
            </div>

            <div className="flex flex-col gap-3">
              <div className="text-base font-bold text-white">{selectedPort.name}</div>
              <div className="grid grid-cols-2 gap-3 text-xs">
                <div className="p-3 rounded-lg bg-neutral-900/80 border border-white/5 flex flex-col gap-1">
                  <span className="text-[10px] text-neutral-500 uppercase">PORT INTERFACE</span>
                  <span className="text-neutral-200">{selectedPort.type}</span>
                </div>
                <div className="p-3 rounded-lg bg-neutral-900/80 border border-white/5 flex flex-col gap-1">
                  <span className="text-[10px] text-neutral-500 uppercase">WAVELENGTH</span>
                  <span className="text-neutral-200">{selectedPort.wavelength}</span>
                </div>
                <div className="p-3 rounded-lg bg-neutral-900/80 border border-white/5 flex flex-col gap-1">
                  <span className="text-[10px] text-neutral-500 uppercase">CURRENT STATE</span>
                  <span className="text-white font-bold">{selectedPort.state}</span>
                </div>
                <div className="p-3 rounded-lg bg-neutral-900/80 border border-white/5 flex flex-col gap-1">
                  <span className="text-[10px] text-neutral-500 uppercase">AI RECOMMENDATION</span>
                  <span
                    className={`font-bold ${
                      selectedPort.recommendation === "SLEEP"
                        ? "text-amber-400"
                        : "text-emerald-400"
                    }`}
                  >
                    {selectedPort.recommendation}
                  </span>
                </div>
              </div>
            </div>

            <div className="p-4 rounded-xl border border-white/10 bg-black/60 flex flex-col gap-2">
              <span className="text-[10px] text-neutral-400 uppercase">// INFLUXDB TELEMETRY PAYLOAD</span>
              <pre className="text-[10px] text-emerald-400/90 overflow-x-auto p-2 bg-neutral-950 rounded">
{`{
  "node_id": "NOKIA-1830-PSS-${selectedPort.id.toUpperCase()}",
  "traffic_bps": ${selectedPort.trafficGbps * 1e9},
  "utilization_pct": ${(selectedPort.trafficGbps / selectedPort.capacityGbps) * 100},
  "laser_bias_current_ma": ${selectedPort.state === "SLEEP" ? 4.2 : 38.6},
  "policy_action": "${selectedPort.recommendation}"
}`}
              </pre>
            </div>
          </div>

          <div className="text-[10px] text-neutral-500 leading-relaxed border-t border-white/10 pt-4">
            * Deterministic safety verification checks SLA redundancy before powering down line ports. Hysteresis prevent laser degradation.
          </div>
        </div>
      </div>
    </div>
  );
}
