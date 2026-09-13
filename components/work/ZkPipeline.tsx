"use client";

import { useState } from "react";
import { ArrowDown, CheckCircle2, Database, FileCode, Lock, Play, Shield, Sparkles } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useSound } from "../ui/AudioToggle";

const STAGES = [
  {
    id: "raw",
    name: "01 Original Dataset",
    badge: "UCI Heart Disease",
    icon: Database,
    description: "303 clinical patient records (age, sex, cp, trestbps, chol, fbs, restecg, thalach, exang, oldpeak, slope, ca, thal, target).",
    payload: {
      status: "PROTECTED_PHI_STORE",
      cohort_size: 303,
      attributes: 14,
      privacy_level: "RESTRICTED (ZERO LEAKAGE)",
    },
  },
  {
    id: "preprocess",
    name: "02 Preprocessing & Scaling",
    badge: "Scikit-learn / Pandas",
    icon: FileCode,
    description: "Categorical one-hot encoding, continuous min-max scaling, missing value imputation, and correlation baseline computation.",
    payload: {
      numerical_columns: ["age", "trestbps", "chol", "thalach", "oldpeak"],
      categorical_columns: ["sex", "cp", "fbs", "restecg", "exang", "slope", "ca", "thal"],
      baseline_pearson_matrix: "COMPUTED_14x14",
    },
  },
  {
    id: "ctgan",
    name: "03 Synthetic Generation",
    badge: "CTGAN Synthesis",
    icon: Sparkles,
    description: "Conditional GAN trained on tabular clinical distributions to generate 1,000 synthetic patient records with differential privacy parameters.",
    payload: {
      epochs: 300,
      batch_size: 100,
      synthetic_rows_generated: 1000,
      discriminator_loss: 0.412,
      generator_loss: 0.589,
    },
  },
  {
    id: "similarity",
    name: "04 Similarity Validation",
    badge: "Statistical Fidelity",
    icon: CheckCircle2,
    description: "Wasserstein distance tests, Kolmogorov-Smirnov tests, and mutual information score comparison against original ground truth.",
    payload: {
      wasserstein_avg_dist: 0.042,
      ks_test_p_value_avg: 0.89,
      correlation_preservation: "91.4%",
      direct_patient_leakage: "0.00% (0 MATCHES)",
    },
  },
  {
    id: "hash",
    name: "05 Cryptographic Integrity",
    badge: "SHA-256 Commitments",
    icon: Lock,
    description: "Deterministic state anchor created from distribution invariants and synthetic feature covariance matrices.",
    payload: {
      commitment_hash: "e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855",
      invariant_merkle_root: "8f434346648f6b96df89dda901c5176b10a6d83961dd3c1ac88b59b2dc327aa4",
      timestamp: "2024-11-20T14:30:00Z",
    },
  },
  {
    id: "challenge",
    name: "06 Challenge & Verification",
    badge: "ZK-Inspired Proof",
    icon: Shield,
    description: "Recipient issues statistical challenge vector. System proves synthetic data fidelity against commitments without revealing raw patient rows.",
    payload: {
      verifier_challenge_vector: "[chol_by_age, restecg_target_cov]",
      verification_status: "VERIFIED_VALID",
      phi_leakage_risk: "ZERO",
      execution_time_ms: 11.8,
    },
  },
];

export default function ZkPipeline() {
  const [activeStageIndex, setActiveStageIndex] = useState(0);
  const [isSimulating, setIsSimulating] = useState(false);
  const { playClick, playSuccess, playHover } = useSound();

  const runFullPipeline = () => {
    setIsSimulating(true);
    playClick();
    let current = 0;
    const interval = setInterval(() => {
      current += 1;
      if (current < STAGES.length) {
        setActiveStageIndex(current);
        playHover();
      } else {
        clearInterval(interval);
        setIsSimulating(false);
        playSuccess();
      }
    }, 650);
  };

  const activeStage = STAGES[activeStageIndex];
  const Icon = activeStage.icon;

  return (
    <div className="w-full rounded-2xl border border-white/15 bg-black/80 font-mono text-xs overflow-hidden shadow-2xl">
      {/* Header Bar */}
      <div className="flex flex-wrap items-center justify-between gap-4 p-4 border-b border-white/10 bg-neutral-900/80">
        <div className="flex items-center gap-3">
          <Shield className="w-4 h-4 text-blue-400" />
          <span className="font-bold text-white tracking-wider">
            ZKVERITAS // SYNTHETIC DATA AUTHENTICITY PIPELINE
          </span>
        </div>

        <button
          onClick={runFullPipeline}
          disabled={isSimulating}
          className="px-3.5 py-1.5 rounded-md border border-blue-500/40 bg-blue-950/30 text-blue-300 font-mono text-xs hover:border-blue-400 transition-all flex items-center gap-2 disabled:opacity-50"
        >
          <Play className="w-3.5 h-3.5" />
          <span>{isSimulating ? "EXECUTING VERIFICATION..." : "SIMULATE PIPELINE"}</span>
        </button>
      </div>

      {/* Main Grid: Pipeline Step Flow & Inspector */}
      <div className="grid grid-cols-1 lg:grid-cols-12 divide-y lg:divide-y-0 lg:divide-x divide-white/10">
        {/* Left: Sequential Pipeline Stages */}
        <div className="lg:col-span-5 p-6 flex flex-col gap-3 bg-neutral-950/40">
          <span className="text-[11px] text-neutral-400 uppercase tracking-wider pb-1">
            // PIPELINE STAGES
          </span>

          <div className="flex flex-col gap-2">
            {STAGES.map((stage, idx) => {
              const isActive = activeStageIndex === idx;
              const StageIcon = stage.icon;

              return (
                <div key={stage.id} className="flex flex-col">
                  <button
                    onClick={() => {
                      setActiveStageIndex(idx);
                      playClick();
                    }}
                    onMouseEnter={() => playHover()}
                    className={`p-3.5 rounded-xl border text-left transition-all flex items-center justify-between ${
                      isActive
                        ? "border-blue-500/80 bg-blue-950/20 text-white shadow-[0_0_12px_rgba(59,130,246,0.15)]"
                        : "border-white/5 bg-neutral-900/40 text-neutral-400 hover:border-white/20 hover:text-neutral-200"
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <StageIcon
                        className={`w-4 h-4 ${isActive ? "text-blue-400" : "text-neutral-500"}`}
                      />
                      <div className="flex flex-col">
                        <span className="font-bold text-xs">{stage.name}</span>
                        <span className="text-[10px] text-neutral-400">{stage.badge}</span>
                      </div>
                    </div>
                    {isActive && (
                      <span className="h-2 w-2 rounded-full bg-blue-400 animate-pulse" />
                    )}
                  </button>

                  {idx < STAGES.length - 1 && (
                    <div className="flex justify-center py-1">
                      <ArrowDown className="w-3 h-3 text-neutral-700" />
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {/* Right: Stage Inspector & Output Schema */}
        <div className="lg:col-span-7 p-6 sm:p-8 flex flex-col justify-between gap-6">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeStage.id}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.2 }}
              className="flex flex-col gap-6"
            >
              <div className="flex items-center justify-between border-b border-white/10 pb-4">
                <div className="flex items-center gap-3">
                  <Icon className="w-5 h-5 text-blue-400" />
                  <span className="text-base font-bold text-white">{activeStage.name}</span>
                </div>
                <span className="px-2.5 py-0.5 rounded-full border border-blue-500/30 bg-blue-950/40 text-blue-400 text-[10px] uppercase">
                  {activeStage.badge}
                </span>
              </div>

              <div className="flex flex-col gap-2">
                <span className="text-[10px] text-neutral-500 uppercase">// STAGE OBJECTIVE</span>
                <p className="text-sm text-neutral-300 leading-relaxed font-sans">
                  {activeStage.description}
                </p>
              </div>

              <div className="flex flex-col gap-2">
                <span className="text-[10px] text-neutral-500 uppercase">// CRYPTOGRAPHIC / STATISTICAL PAYLOAD</span>
                <pre className="p-4 rounded-xl border border-white/10 bg-black text-[11px] text-blue-300 overflow-x-auto leading-relaxed">
                  {JSON.stringify(activeStage.payload, null, 2)}
                </pre>
              </div>
            </motion.div>
          </AnimatePresence>

          <div className="p-4 rounded-xl border border-blue-500/20 bg-blue-950/20 text-[11px] text-neutral-300 leading-relaxed">
            <span className="text-blue-400 font-bold">Research Note:</span> ZKVeritas is a research prototype evaluating privacy-preserving statistical verification without exposing patient rows. It demonstrates cryptographic commitment verification without claiming unvalidated production zk-SNARK rollups.
          </div>
        </div>
      </div>
    </div>
  );
}
