"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";
import { ArrowDown, ArrowUpRight } from "lucide-react";
import { motion } from "framer-motion";
import StatusBadge from "../ui/StatusBadge";
import MagneticButton from "../ui/MagneticButton";
import { useSound } from "../ui/AudioToggle";

export default function Hero() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const { playHover, playClick } = useSound();

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationFrameId: number;
    let width = (canvas.width = canvas.offsetWidth);
    let height = (canvas.height = canvas.offsetHeight);

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = canvas.offsetWidth;
      height = canvas.height = canvas.offsetHeight;
    };

    window.addEventListener("resize", handleResize);

    // Subtle system topology nodes
    const nodeCount = 36;
    const nodes: {
      x: number;
      y: number;
      vx: number;
      vy: number;
      radius: number;
      alpha: number;
      pulse: number;
    }[] = [];

    for (let i = 0; i < nodeCount; i++) {
      nodes.push({
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * 0.35,
        vy: (Math.random() - 0.5) * 0.35,
        radius: Math.random() * 1.8 + 1,
        alpha: Math.random() * 0.4 + 0.2,
        pulse: Math.random() * Math.PI,
      });
    }

    let mouseX = -1000;
    let mouseY = -1000;

    const handleMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      mouseX = e.clientX - rect.left;
      mouseY = e.clientY - rect.top;
    };

    window.addEventListener("mousemove", handleMouseMove);

    let time = 0;
    const render = () => {
      time += 0.015;
      ctx.clearRect(0, 0, width, height);

      // Render faint connection matrix
      for (let i = 0; i < nodes.length; i++) {
        const n1 = nodes[i];
        n1.x += n1.vx;
        n1.y += n1.vy;

        if (n1.x < 0 || n1.x > width) n1.vx *= -1;
        if (n1.y < 0 || n1.y > height) n1.vy *= -1;

        // Subtle mouse repulsion / attraction
        const dx = mouseX - n1.x;
        const dy = mouseY - n1.y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < 180) {
          n1.x -= (dx / dist) * 0.5;
          n1.y -= (dy / dist) * 0.5;
        }

        // Draw connections
        for (let j = i + 1; j < nodes.length; j++) {
          const n2 = nodes[j];
          const distNodes = Math.hypot(n1.x - n2.x, n1.y - n2.y);
          if (distNodes < 140) {
            const lineAlpha = (1 - distNodes / 140) * 0.15;
            ctx.strokeStyle = `rgba(255, 255, 255, ${lineAlpha})`;
            ctx.lineWidth = 0.75;
            ctx.beginPath();
            ctx.moveTo(n1.x, n1.y);
            ctx.lineTo(n2.x, n2.y);
            ctx.stroke();
          }
        }

        // Draw node
        const pulseAlpha = n1.alpha + Math.sin(time + n1.pulse) * 0.15;
        ctx.fillStyle = `rgba(255, 255, 255, ${Math.max(0.1, pulseAlpha)})`;
        ctx.beginPath();
        ctx.arc(n1.x, n1.y, n1.radius, 0, Math.PI * 2);
        ctx.fill();
      }

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener("resize", handleResize);
      window.removeEventListener("mousemove", handleMouseMove);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <section className="relative min-h-[92vh] w-full flex flex-col justify-between px-6 sm:px-12 md:px-16 pt-32 pb-12 overflow-hidden border-b border-white/10">
      {/* Background Interactive Topology Canvas */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full pointer-events-none opacity-60"
      />

      {/* Top Metadata Row */}
      <div className="relative z-10 flex flex-wrap items-center justify-between gap-4">
        <StatusBadge status="AVAILABLE FOR OPPORTUNITIES" variant="available" />
        <div className="flex items-center gap-4 text-xs font-mono text-neutral-400">
          <span>SRMIST CSE · 2027</span>
          <span className="opacity-40">/</span>
          <span>SYSTEMS & AI</span>
        </div>
      </div>

      {/* Main Editorial Typographic Hero */}
      <div className="relative z-10 my-auto py-12 flex flex-col gap-6 max-w-5xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="flex flex-col"
        >
          <span className="font-mono text-xs text-neutral-400 tracking-widest uppercase mb-2">
            // ENGINEERING PORTFOLIO
          </span>
          <h1 className="text-5xl sm:text-7xl md:text-8xl lg:text-9xl font-bold tracking-tight text-white uppercase text-editorial-title">
            YASHWANTH CH
          </h1>
        </motion.div>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
          className="text-xl sm:text-2xl md:text-3xl text-neutral-300 font-light max-w-3xl leading-snug tracking-tight"
        >
          Software engineer building systems across AI, automation, cloud and infrastructure.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
          className="flex flex-wrap items-center gap-4 pt-4"
        >
          <MagneticButton
            onClick={() => {
              playClick();
              const el = document.getElementById("selected-work");
              el?.scrollIntoView({ behavior: "smooth" });
            }}
            dataCursor="EXPLORE"
            className="px-6 py-3 rounded-full bg-white text-black font-mono text-xs font-semibold tracking-wider uppercase hover:bg-neutral-200 transition-colors flex items-center gap-2"
          >
            <span>Explore Work</span>
            <ArrowDown className="w-3.5 h-3.5" />
          </MagneticButton>

          <Link
            href="/about"
            onMouseEnter={() => playHover()}
            onClick={() => playClick()}
            data-cursor="ABOUT"
            className="px-6 py-3 rounded-full border border-white/15 bg-neutral-900/50 backdrop-blur-md text-white font-mono text-xs tracking-wider uppercase hover:border-white/30 transition-colors flex items-center gap-2"
          >
            <span>About & Systems</span>
            <ArrowUpRight className="w-3.5 h-3.5 opacity-60" />
          </Link>
        </motion.div>
      </div>

      {/* Bottom Context Line */}
      <div className="relative z-10 flex flex-col sm:flex-row items-start sm:items-center justify-between text-xs font-mono text-neutral-400 gap-4 pt-6 border-t border-white/10">
        <div>
          <span>LOCATION:</span>{" "}
          <span className="text-neutral-300">Chennai, India · SRM Institute of Science and Technology</span>
        </div>
        <div className="flex items-center gap-3">
          <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
          <span>CURRENT: Software Development Intern @ Algoshack</span>
        </div>
      </div>
    </section>
  );
}
