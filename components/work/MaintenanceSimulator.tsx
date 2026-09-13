"use client";

import { useState, useEffect } from "react";
import { Activity, AlertTriangle, CheckCircle2, Play, RefreshCw, Server, Shield, Terminal, Zap } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useSound } from "../ui/AudioToggle";

interface PodState {
  id: string;
  name: string;
  service: string;
  status: "Running" | "Degraded" | "Recovering" | "Healthy";
  cpu: number;
  memory: number;
  healthScore: number;
  anomalyDetected: boolean;
}

export default function MaintenanceSimulator() {
  const { playHover, playClick } = useSound();
  const [isSimulating, setIsSimulating] = useState(true);
  const [pods, setPods] = useState<PodState[]>([
    { id: "pod-1", name: "ehr-api-6f89b", service: "EHR Backend API", status: "Healthy", cpu: 32, memory: 48, healthScore: 98, anomalyDetected: false },
    { id: "pod-2", name: "pacs-stream-9c21a", service: "PACS Medical Imaging", status: "Healthy", cpu: 54, memory: 62, healthScore: 95, anomalyDetected: false },
    { id: "pod-3", name: "telemetry-gw-4d11x", service: "IoT Vitals Gateway", status: "Healthy", cpu: 28, memory: 40, healthScore: 99, anomalyDetected: false },
    { id: "pod-4", name: "auth-service-7e33m", service: "OAuth / IAM Auth", status: "Healthy", cpu: 19, memory: 35, healthScore: 100, anomalyDetected: false },
  ]);

  const [logs, setLogs] = useState<string[]>([
    "[00:00:01] [AWS-EC2-US-EAST] Kubernetes cluster node healthy. 4/4 pods scheduled.",
    "[00:00:02] [PROMETHEUS] Scraping endpoint /metrics at 15s interval. Baseline variance nominal.",
    "[00:00:04] [JENKINS-CI] Pipeline build #142 PASS: Docker image pushed to registry.",
  ]);

  // Live jitter
  useEffect(() => {
    if (!isSimulating) return;

    const interval = setInterval(() => {
      setPods((prev) =>
        prev.map((pod) => {
          if (pod.status === "Degraded") {
            return {
              ...pod,
              cpu: Math.min(99, pod.cpu + Math.floor(Math.random() * 4)),
              healthScore: Math.max(30, pod.healthScore - 2),
            };
          }
          if (pod.status === "Recovering") {
            const nextScore = Math.min(98, pod.healthScore + 10);
            return {
              ...pod,
              cpu: Math.max(25, pod.cpu - 8),
              healthScore: nextScore,
              status: nextScore >= 90 ? "Healthy" : "Recovering",
              anomalyDetected: nextScore < 90,
            };
          }
          const cpuJitter = Math.min(85, Math.max(15, pod.cpu + (Math.floor(Math.random() * 7) - 3)));
          return {
            ...pod,
            cpu: cpuJitter,
          };
        })
      );
    }, 2000);

    return () => clearInterval(interval);
  }, [isSimulating]);

  const triggerAnomaly = (id: string) => {
    playClick();
    setPods((prev) =>
      prev.map((pod) => {
        if (pod.id === id) {
          return {
            ...pod,
            status: "Degraded",
            cpu: 89,
            healthScore: 58,
            anomalyDetected: true,
          };
        }
        return pod;
      })
    );

    const pod = pods.find((p) => p.id === id);
    setLogs((prev) => [
      `[${new Date().toLocaleTimeString()}] [PROMETHEUS-ALERT] Anomaly threshold breached on ${pod?.name || id}: CPU spike detected > 85%`,
      `[${new Date().toLocaleTimeString()}] [GRAFANA-RULE] Predictive failure risk evaluated: 87% probability of pod crash in 60s`,
      ...prev.slice(0, 6),
    ]);
  };

  const autoRemediate = (id: string) => {
    playClick();
    setPods((prev) =>
      prev.map((pod) => {
        if (pod.id === id) {
          return {
            ...pod,
            status: "Recovering",
          };
        }
        return pod;
      })
    );

    const pod = pods.find((p) => p.id === id);
    setLogs((prev) => [
      `[${new Date().toLocaleTimeString()}] [K8S-CONTROLLER] Auto-healing trigger dispatched: Spinning replacement replica for ${pod?.name || id}`,
      `[${new Date().toLocaleTimeString()}] [JENKINS-DEPLOY] Rolling update complete on AWS EC2 node. Traffic drained safely.`,
      ...prev.slice(0, 6),
    ]);
  };

  return (
    <div className="w-full p-6 sm:p-8 rounded-2xl border border-white/10 bg-black/60 flex flex-col gap-6 font-mono shadow-2xl">
      {/* Simulator Header */}
      <div className="flex flex-wrap items-center justify-between gap-4 pb-4 border-b border-white/10 text-xs">
        <div className="flex items-center gap-2 text-white">
          <Server className="w-4 h-4 text-emerald-400" />
          <span className="font-bold tracking-wider uppercase">
            AWS EC2 KUBERNETES & PROMETHEUS TELEMETRY BENCH
          </span>
        </div>
        <div className="flex items-center gap-3">
          <span className="flex items-center gap-1.5 text-neutral-400 text-[11px]">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            TELEMETRY LIVE
          </span>
          <button
            onClick={() => setIsSimulating(!isSimulating)}
            onMouseEnter={() => playHover()}
            data-cursor="TOGGLE"
            className="px-3 py-1 rounded bg-neutral-900 border border-white/10 hover:border-white/30 text-white text-[10px] transition-colors"
          >
            {isSimulating ? "PAUSE FEED" : "RESUME FEED"}
          </button>
        </div>
      </div>

      {/* Pod Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {pods.map((pod) => (
          <div
            key={pod.id}
            className={`p-5 rounded-xl border transition-all flex flex-col justify-between gap-4 ${
              pod.status === "Degraded"
                ? "bg-red-950/20 border-red-500/40"
                : pod.status === "Recovering"
                ? "bg-amber-950/20 border-amber-500/40"
                : "bg-neutral-900/40 border-white/10 hover:border-white/20"
            }`}
          >
            <div className="flex items-start justify-between gap-2">
              <div className="flex flex-col">
                <span className="text-white font-bold text-sm">{pod.service}</span>
                <span className="text-[11px] text-neutral-400">{pod.name}</span>
              </div>
              <span
                className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase ${
                  pod.status === "Degraded"
                    ? "bg-red-500/20 text-red-400 border border-red-500/30"
                    : pod.status === "Recovering"
                    ? "bg-amber-500/20 text-amber-400 border border-amber-500/30"
                    : "bg-emerald-500/20 text-emerald-400 border border-emerald-500/30"
                }`}
              >
                {pod.status}
              </span>
            </div>

            {/* Metrics */}
            <div className="grid grid-cols-3 gap-2 text-[11px]">
              <div className="p-2 rounded bg-black/40 border border-white/5 flex flex-col">
                <span className="text-neutral-500 uppercase text-[9px]">CPU LOAD</span>
                <span className={`font-bold ${pod.cpu > 80 ? "text-red-400" : "text-white"}`}>
                  {pod.cpu}%
                </span>
              </div>
              <div className="p-2 rounded bg-black/40 border border-white/5 flex flex-col">
                <span className="text-neutral-500 uppercase text-[9px]">MEMORY</span>
                <span className="font-bold text-white">{pod.memory}%</span>
              </div>
              <div className="p-2 rounded bg-black/40 border border-white/5 flex flex-col">
                <span className="text-neutral-500 uppercase text-[9px]">HEALTH</span>
                <span
                  className={`font-bold ${
                    pod.healthScore > 90
                      ? "text-emerald-400"
                      : pod.healthScore > 70
                      ? "text-amber-400"
                      : "text-red-400"
                  }`}
                >
                  {pod.healthScore}/100
                </span>
              </div>
            </div>

            {/* Actions */}
            <div className="flex items-center justify-between pt-2 border-t border-white/10 text-xs">
              {pod.status === "Degraded" ? (
                <button
                  onClick={() => autoRemediate(pod.id)}
                  onMouseEnter={() => playHover()}
                  data-cursor="RECOVER"
                  className="w-full py-1.5 rounded bg-emerald-500 text-black font-bold hover:bg-emerald-400 transition-colors flex items-center justify-center gap-1.5"
                >
                  <RefreshCw className="w-3.5 h-3.5" />
                  <span>TRIGGER AUTO-HEALING</span>
                </button>
              ) : (
                <button
                  onClick={() => triggerAnomaly(pod.id)}
                  onMouseEnter={() => playHover()}
                  data-cursor="INJECT"
                  className="w-full py-1.5 rounded bg-neutral-900 border border-white/10 hover:border-red-500/40 text-neutral-300 hover:text-red-400 transition-colors flex items-center justify-center gap-1.5 text-[11px]"
                >
                  <AlertTriangle className="w-3.5 h-3.5 opacity-60" />
                  <span>INJECT ANOMALY</span>
                </button>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* Live Log Console */}
      <div className="p-4 rounded-xl bg-black border border-white/10 flex flex-col gap-2">
        <div className="flex items-center justify-between text-[11px] text-neutral-500 border-b border-white/10 pb-2">
          <div className="flex items-center gap-1.5">
            <Terminal className="w-3.5 h-3.5 text-emerald-400" />
            <span>PROMETHEUS & K8S EVENT STREAM</span>
          </div>
          <span>AUTOSCALE: ON</span>
        </div>
        <div className="flex flex-col gap-1 text-[11px] font-mono">
          {logs.map((log, i) => (
            <div
              key={i}
              className={`leading-relaxed ${
                log.includes("ALERT") || log.includes("Degraded")
                  ? "text-red-400"
                  : log.includes("Auto-healing") || log.includes("PASS")
                  ? "text-emerald-400"
                  : "text-neutral-400"
              }`}
            >
              {log}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
