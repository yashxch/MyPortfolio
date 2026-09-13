"use client";

import { useState, useEffect, useRef } from "react";
import { Activity, AlertTriangle, Radio, ShieldCheck, Thermometer, Wifi } from "lucide-react";
import { useSound } from "../ui/AudioToggle";

export default function MedicalMonitor() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [bpm, setBpm] = useState(138); // Normal neonatal baseline 120-160
  const [temperature, setTemperature] = useState(36.8); // Normal neonatal 36.5 - 37.5
  const [leadStatus, setLeadStatus] = useState<"CONNECTED" | "LO+ / LO- OFF">("CONNECTED");
  const [anomalyMode, setAnomalyMode] = useState(false);
  const { playClick, playHover } = useSound();

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationId: number;
    let width = (canvas.width = canvas.offsetWidth);
    let height = (canvas.height = canvas.offsetHeight);

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = canvas.offsetWidth;
      height = canvas.height = canvas.offsetHeight;
    };
    window.addEventListener("resize", handleResize);

    const points: number[] = new Array(Math.floor(width / 2)).fill(height / 2);
    let phase = 0;

    const render = () => {
      ctx.fillStyle = "#080809";
      ctx.fillRect(0, 0, width, height);

      // Draw faint medical grid
      ctx.strokeStyle = "rgba(34, 197, 94, 0.08)";
      ctx.lineWidth = 1;
      const gridSize = 20;

      for (let x = 0; x < width; x += gridSize) {
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, height);
        ctx.stroke();
      }
      for (let y = 0; y < height; y += gridSize) {
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(width, y);
        ctx.stroke();
      }

      // Generate ECG waveform sample
      phase += 0.08;
      let sample = height / 2;
      const cycle = phase % (Math.PI * 2);

      if (cycle > 1.2 && cycle < 1.4) {
        // P wave
        sample -= 10;
      } else if (cycle > 1.8 && cycle < 1.9) {
        // Q drop
        sample += 8;
      } else if (cycle >= 1.9 && cycle < 2.1) {
        // R peak
        sample -= anomalyMode ? 65 : 45;
      } else if (cycle >= 2.1 && cycle < 2.25) {
        // S drop
        sample += 18;
      } else if (cycle > 2.6 && cycle < 3.0) {
        // T wave
        sample -= 14;
      } else {
        // Baseline noise
        sample += (Math.random() - 0.5) * 2;
      }

      points.push(sample);
      points.shift();

      // Render ECG trace
      ctx.strokeStyle = anomalyMode ? "#ef4444" : "#22c55e";
      ctx.lineWidth = 2;
      ctx.beginPath();
      for (let i = 0; i < points.length; i++) {
        const x = i * 2;
        const y = points[i];
        if (i === 0) ctx.moveTo(x, y);
        else ctx.lineTo(x, y);
      }
      ctx.stroke();

      // Draw leading sweep head
      const lastX = (points.length - 1) * 2;
      const lastY = points[points.length - 1];
      ctx.fillStyle = anomalyMode ? "#f87171" : "#4ade80";
      ctx.beginPath();
      ctx.arc(lastX, lastY, 3.5, 0, Math.PI * 2);
      ctx.fill();

      animationId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener("resize", handleResize);
      cancelAnimationFrame(animationId);
    };
  }, [anomalyMode]);

  const toggleAnomaly = () => {
    playClick();
    const nextMode = !anomalyMode;
    setAnomalyMode(nextMode);
    if (nextMode) {
      setBpm(178); // Simulated Tachycardia
      setTemperature(38.2); // Pyrexia
    } else {
      setBpm(138);
      setTemperature(36.8);
    }
  };

  return (
    <div className="w-full rounded-2xl border border-white/15 bg-black/90 font-mono text-xs overflow-hidden shadow-2xl">
      {/* Top Clinical Instrumentation Bar */}
      <div className="flex flex-wrap items-center justify-between gap-4 p-4 border-b border-white/10 bg-neutral-900/90">
        <div className="flex items-center gap-3">
          <Activity className="w-4 h-4 text-emerald-400" />
          <span className="font-bold text-white tracking-wider">
            PULSEHALO // NEONATAL BIOSENSOR INSTRUMENTATION SUITE
          </span>
        </div>

        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2 px-2.5 py-1 rounded bg-black border border-white/10 text-[10px] text-neutral-300">
            <Wifi className="w-3 h-3 text-emerald-400" />
            <span>ESP32 ⇄ FIREBASE RTDB: CONNECTED</span>
          </div>

          <button
            onClick={toggleAnomaly}
            className={`px-3 py-1.5 rounded-md border text-xs font-mono transition-all flex items-center gap-1.5 ${
              anomalyMode
                ? "bg-red-500/20 border-red-500 text-red-300 animate-pulse"
                : "bg-neutral-800 border-white/15 text-neutral-300 hover:border-white/30"
            }`}
          >
            <AlertTriangle className="w-3.5 h-3.5" />
            <span>{anomalyMode ? "SIMULATING TACHYCARDIA" : "TRIGGER ANOMALY SIM"}</span>
          </button>
        </div>
      </div>

      {/* Main Grid: Waveform Monitor & Vitals Telemetry */}
      <div className="grid grid-cols-1 lg:grid-cols-12 divide-y lg:divide-y-0 lg:divide-x divide-white/10">
        {/* Left: Waveform Oscilloscope Canvas */}
        <div className="lg:col-span-8 p-6 flex flex-col gap-4">
          <div className="flex items-center justify-between">
            <span className="text-[11px] text-neutral-400 uppercase tracking-wider">
              // LEAD II REAL-TIME ECG (AD8232 ANALOG FRONT-END · 250 HZ)
            </span>
            <span className="text-[10px] text-emerald-400 font-bold">
              BANDPASS FILTER: 0.5Hz — 40Hz
            </span>
          </div>

          <div className="w-full h-56 rounded-xl border border-white/10 bg-[#080809] overflow-hidden relative">
            <canvas ref={canvasRef} className="w-full h-full block" />
            <div className="absolute top-3 left-3 text-[10px] text-neutral-500 font-mono">
              25mm/s · 10mm/mV · GAIN 100x
            </div>
          </div>

          {/* Firmware Pipeline Architecture Flow */}
          <div className="flex flex-wrap items-center justify-between text-[10px] text-neutral-400 pt-2 font-mono gap-2">
            <span>[1] AD8232 Bio-Amp</span>
            <span>→</span>
            <span>[2] ESP32 ADC (QRS Filter)</span>
            <span>→</span>
            <span>[3] Moving Avg DSP</span>
            <span>→</span>
            <span>[4] Firebase JSON Sync</span>
            <span>→</span>
            <span>[5] Clinician GUI</span>
          </div>
        </div>

        {/* Right: Vitals Cards & Device Diagnostics */}
        <div className="lg:col-span-4 p-6 flex flex-col justify-between gap-6 bg-neutral-950/40">
          <div className="flex flex-col gap-4">
            <span className="text-[11px] text-neutral-400 uppercase tracking-wider border-b border-white/10 pb-2">
              // VITALS TELEMETRY
            </span>

            {/* Heart Rate Display */}
            <div className="p-4 rounded-xl border border-white/10 bg-neutral-900/60 flex items-center justify-between">
              <div className="flex flex-col gap-1">
                <span className="text-[10px] text-neutral-500 uppercase">HEART RATE (BPM)</span>
                <div className="flex items-baseline gap-2">
                  <span
                    className={`text-4xl font-bold ${
                      anomalyMode ? "text-red-400" : "text-emerald-400"
                    }`}
                  >
                    {bpm}
                  </span>
                  <span className="text-xs text-neutral-400">BPM</span>
                </div>
              </div>
              <Activity
                className={`w-8 h-8 ${
                  anomalyMode ? "text-red-400 animate-bounce" : "text-emerald-400"
                }`}
              />
            </div>

            {/* Skin Temperature Display */}
            <div className="p-4 rounded-xl border border-white/10 bg-neutral-900/60 flex items-center justify-between">
              <div className="flex flex-col gap-1">
                <span className="text-[10px] text-neutral-500 uppercase">SKIN TEMP (°C)</span>
                <div className="flex items-baseline gap-2">
                  <span
                    className={`text-4xl font-bold ${
                      anomalyMode ? "text-amber-400" : "text-white"
                    }`}
                  >
                    {temperature}
                  </span>
                  <span className="text-xs text-neutral-400">°C</span>
                </div>
              </div>
              <Thermometer className="w-8 h-8 text-neutral-400" />
            </div>

            {/* Device & Lead Status */}
            <div className="grid grid-cols-2 gap-2 text-[10px]">
              <div className="p-2.5 rounded bg-black/40 border border-white/5 flex flex-col gap-0.5">
                <span className="text-neutral-500">LEAD CONTACT</span>
                <span className="text-emerald-400 font-bold">{leadStatus}</span>
              </div>
              <div className="p-2.5 rounded bg-black/40 border border-white/5 flex flex-col gap-0.5">
                <span className="text-neutral-500">SAMPLING</span>
                <span className="text-white font-bold">250 SPS · 12-bit</span>
              </div>
            </div>
          </div>

          <div className="text-[10px] text-neutral-500 leading-relaxed border-t border-white/10 pt-3">
            Designed as an embedded DSP and telemetry pipeline for neonatal healthcare monitoring. Role focused on algorithm engineering, embedded C++ filtering, and backend telemetry sync.
          </div>
        </div>
      </div>
    </div>
  );
}
