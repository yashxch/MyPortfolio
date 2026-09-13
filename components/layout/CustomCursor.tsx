"use client";

import { useEffect, useState } from "react";
import { motion, useSpring, useMotionValue } from "framer-motion";

export default function CustomCursor() {
  const [cursorText, setCursorText] = useState<string | null>(null);
  const [cursorVariant, setCursorVariant] = useState<"default" | "hover" | "action">("default");
  const [isVisible, setIsVisible] = useState(false);

  const mouseX = useMotionValue(-100);
  const mouseY = useMotionValue(-100);

  const springConfig = { damping: 28, stiffness: 350, mass: 0.15 };
  const cursorX = useSpring(mouseX, springConfig);
  const cursorY = useSpring(mouseY, springConfig);

  useEffect(() => {
    // Disable on touch devices
    if (window.matchMedia("(hover: none) and (pointer: coarse)").matches) {
      return;
    }

    const handleMouseMove = (e: MouseEvent) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
      if (!isVisible) setIsVisible(true);

      // Check hover targets
      const target = e.target as HTMLElement | null;
      const cursorTarget = target?.closest("[data-cursor]") as HTMLElement | null;
      const isInteractive = target?.closest("a, button, [role='button'], input, textarea, select");

      if (cursorTarget) {
        const text = cursorTarget.getAttribute("data-cursor");
        setCursorText(text);
        setCursorVariant("action");
      } else if (isInteractive) {
        setCursorText(null);
        setCursorVariant("hover");
      } else {
        setCursorText(null);
        setCursorVariant("default");
      }
    };

    const handleMouseLeave = () => {
      setIsVisible(false);
    };

    const handleMouseEnter = () => {
      setIsVisible(true);
    };

    window.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mouseleave", handleMouseLeave);
    document.addEventListener("mouseenter", handleMouseEnter);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseleave", handleMouseLeave);
      document.removeEventListener("mouseenter", handleMouseEnter);
    };
  }, [mouseX, mouseY, isVisible]);

  if (!isVisible) return null;

  return (
    <div className="custom-cursor-element pointer-events-none fixed inset-0 z-[99999] overflow-hidden">
      <motion.div
        style={{
          x: cursorX,
          y: cursorY,
        }}
        className="fixed top-0 left-0 -translate-x-1/2 -translate-y-1/2 flex items-center justify-center pointer-events-none"
      >
        {cursorVariant === "action" && cursorText ? (
          <motion.div
            initial={{ scale: 0.5, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.5, opacity: 0 }}
            transition={{ duration: 0.15 }}
            className="px-3 py-1.5 rounded-full bg-white text-black font-mono text-[10px] font-bold tracking-widest uppercase shadow-2xl flex items-center justify-center whitespace-nowrap"
          >
            {cursorText}
          </motion.div>
        ) : cursorVariant === "hover" ? (
          <motion.div
            animate={{
              width: 38,
              height: 38,
              backgroundColor: "rgba(255, 255, 255, 0.15)",
              borderColor: "rgba(255, 255, 255, 0.4)",
            }}
            transition={{ duration: 0.15 }}
            className="rounded-full border backdrop-blur-[1px]"
          />
        ) : (
          <motion.div
            animate={{
              width: 8,
              height: 8,
              backgroundColor: "rgba(255, 255, 255, 0.85)",
            }}
            transition={{ duration: 0.15 }}
            className="rounded-full shadow-[0_0_8px_rgba(255,255,255,0.6)]"
          />
        )}
      </motion.div>
    </div>
  );
}
