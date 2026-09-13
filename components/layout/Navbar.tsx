"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowUpRight, Menu, X } from "lucide-react";
import { AudioToggleButton, useSound } from "../ui/AudioToggle";

const NAV_LINKS = [
  { name: "Work", href: "/work", num: "01" },
  { name: "About", href: "/about", num: "02" },
  { name: "Experience", href: "/experience", num: "03" },
  { name: "Contact", href: "/contact", num: "04" },
];

export default function Navbar() {
  const pathname = usePathname();
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { playClick, playHover } = useSound();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 40);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close mobile menu on route change
  useEffect(() => {
    setMobileMenuOpen(false);
  }, [pathname]);

  return (
    <>
      <header
        className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 pointer-events-none px-4 sm:px-8 md:px-12 ${
          isScrolled ? "py-3" : "py-6"
        }`}
      >
        <div className="max-w-7xl mx-auto flex items-center justify-between pointer-events-auto">
          {/* Logo Lockup */}
          <Link
            href="/"
            onClick={() => playClick()}
            onMouseEnter={() => playHover()}
            className="group flex items-center gap-3 text-white transition-opacity"
            data-cursor="HOME"
          >
            <div className="flex flex-col">
              <span className="font-mono text-sm tracking-widest font-semibold uppercase group-hover:text-emerald-400 transition-colors">
                YASHWANTH CH
              </span>
              <span className="text-[10px] font-mono text-neutral-400 tracking-wider hidden sm:inline">
                SYSTEMS · AI · DEV
              </span>
            </div>
          </Link>

          {/* Center / Right Floating Navigation Pill */}
          <nav className="hidden md:flex items-center gap-1.5 p-1.5 rounded-full border border-white/10 bg-black/60 backdrop-blur-xl shadow-2xl">
            {NAV_LINKS.map((link) => {
              const isActive = pathname === link.href || (link.href !== "/" && pathname.startsWith(link.href));
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => playClick()}
                  onMouseEnter={() => playHover()}
                  data-cursor={link.name.toUpperCase()}
                  className={`relative px-4 py-1.5 rounded-full text-xs font-mono tracking-wider transition-all duration-200 flex items-center gap-1.5 ${
                    isActive
                      ? "text-black font-semibold"
                      : "text-neutral-400 hover:text-white"
                  }`}
                >
                  {isActive && (
                    <motion.div
                      layoutId="active-pill"
                      className="absolute inset-0 bg-white rounded-full z-0"
                      transition={{ type: "spring", stiffness: 350, damping: 30 }}
                    />
                  )}
                  <span className="relative z-10">{link.name}</span>
                  <sup className="relative z-10 text-[9px] opacity-60">{link.num}</sup>
                </Link>
              );
            })}
          </nav>

          {/* Right Actions: Audio Toggle & Status / Mobile Trigger */}
          <div className="flex items-center gap-3">
            <div className="hidden lg:flex items-center gap-2 px-3 py-1 rounded-full border border-white/10 bg-black/40 backdrop-blur-md text-[11px] font-mono text-neutral-300">
              <span className="relative flex h-1.5 w-1.5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-emerald-500" />
              </span>
              <span>CHENNAI · 2027</span>
            </div>

            <AudioToggleButton />

            {/* Mobile Menu Button */}
            <button
              onClick={() => {
                playClick();
                setMobileMenuOpen(!mobileMenuOpen);
              }}
              className="md:hidden p-2 rounded-full border border-white/10 bg-black/60 backdrop-blur-xl text-neutral-300 hover:text-white transition-colors"
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </header>

      {/* Full-screen Mobile Editorial Overlay */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
            className="fixed inset-0 z-40 bg-neutral-950/98 backdrop-blur-2xl flex flex-col justify-between p-8 pt-28 md:hidden"
          >
            <div className="flex flex-col gap-6">
              <span className="font-mono text-xs text-neutral-500 tracking-widest uppercase">
                // NAVIGATION
              </span>
              <div className="flex flex-col gap-4">
                {NAV_LINKS.map((link, idx) => (
                  <motion.div
                    key={link.href}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.05 * idx }}
                  >
                    <Link
                      href={link.href}
                      onClick={() => {
                        playClick();
                        setMobileMenuOpen(false);
                      }}
                      className="group flex items-baseline justify-between py-2 border-b border-white/10"
                    >
                      <span className="text-3xl font-light tracking-tight text-white group-hover:text-emerald-400 transition-colors">
                        {link.name}
                      </span>
                      <span className="font-mono text-xs text-neutral-500">{link.num}</span>
                    </Link>
                  </motion.div>
                ))}
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.25 }}
                >
                  <Link
                    href="/resume"
                    onClick={() => {
                      playClick();
                      setMobileMenuOpen(false);
                    }}
                    className="group flex items-baseline justify-between py-2 border-b border-white/10"
                  >
                    <span className="text-3xl font-light tracking-tight text-white group-hover:text-emerald-400 transition-colors flex items-center gap-2">
                      Résumé <ArrowUpRight className="w-5 h-5 opacity-70" />
                    </span>
                    <span className="font-mono text-xs text-neutral-500">05</span>
                  </Link>
                </motion.div>
              </div>
            </div>

            <div className="flex flex-col gap-3 font-mono text-xs text-neutral-500 pt-6 border-t border-white/10">
              <div className="flex justify-between items-center text-neutral-400">
                <span>STATUS</span>
                <span className="text-emerald-400 flex items-center gap-1.5">
                  <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-pulse" />
                  AVAILABLE
                </span>
              </div>
              <div className="flex justify-between items-center">
                <span>LOCATION</span>
                <span className="text-neutral-300">CHENNAI, INDIA</span>
              </div>
              <div className="flex justify-between items-center">
                <span>DEGREE</span>
                <span className="text-neutral-300">B.TECH CSE · SRMIST</span>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
