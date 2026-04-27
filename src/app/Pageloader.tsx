"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

const LOAD_STEPS = [
  { text: "กำลังเตรียมของขวัญ...", emoji: "🎁" },
  { text: "จุดเทียนวันเกิด...", emoji: "🕯️" },
  { text: "พร้อมแล้ว! ไปกันเลย", emoji: "🔥" },
];

const PARTICLE_EMOJIS = ["🎂", "🎉", "✨", "🎈", "💫", "⭐", "🎊", "💥"];

interface Particle {
  id: number;
  emoji: string;
  x: string;
  delay: number;
  duration: number;
  size: string;
}

export default function PageLoader({ onDone }: { onDone: () => void }) {
  const [step, setStep] = useState(0);
  const [progress, setProgress] = useState(0);
  const [particles, setParticles] = useState<Particle[]>([]);
  const [exiting, setExiting] = useState(false);

  // Generate particles once on mount
  useEffect(() => {
    setParticles(
      Array.from({ length: 16 }, (_, i) => ({
        id: i,
        emoji: PARTICLE_EMOJIS[i % PARTICLE_EMOJIS.length],
        x: `${Math.random() * 90}%`,
        delay: Math.random() * 2,
        duration: 2.5 + Math.random() * 2,
        size: `${1.2 + Math.random() * 1.4}rem`,
      }))
    );
  }, []);

  // Drive progress bar + step text
  useEffect(() => {
    const totalMs = 4200;
    const interval = 25;
    let elapsed = 0;

    const timer = setInterval(() => {
      elapsed += interval;
      const pct = Math.min((elapsed / totalMs) * 100, 100);
      setProgress(pct);

      if (pct >= 33 && step < 1) setStep(1);
      if (pct >= 66 && step < 2) setStep(2);

      if (pct >= 100) {
        clearInterval(timer);
        // Brief pause at 100% before exit
        setTimeout(() => {
          setExiting(true);
          setTimeout(onDone, 700);
        }, 600);
      }
    }, interval);

    return () => clearInterval(timer);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <AnimatePresence>
      {!exiting && (
        <motion.div
          key="loader"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, scale: 1.04 }}
          transition={{ duration: 0.45, ease: "easeInOut" }}
          className="fixed inset-0 z-50 flex flex-col items-center justify-center overflow-hidden select-none"
          style={{ background: "linear-gradient(135deg, #1a0030, #3d0060, #1a0030)" }}
        >
          {/* Animated bg blobs — same as home page */}
          <div className="absolute inset-0 pointer-events-none">
            <motion.div
              className="absolute rounded-full blur-3xl opacity-40"
              style={{ width: 280, height: 280, background: "#ff2d78", top: -70, left: -70 }}
              animate={{ y: [0, -18, 0], x: [0, 10, 0] }}
              transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
            />
            <motion.div
              className="absolute rounded-full blur-3xl opacity-25"
              style={{ width: 230, height: 230, background: "#ffe600", bottom: -50, right: -50 }}
              animate={{ y: [0, 18, 0], x: [0, -10, 0] }}
              transition={{ duration: 4, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
            />
            <motion.div
              className="absolute rounded-full blur-3xl opacity-25"
              style={{ width: 180, height: 180, background: "#00cfff", top: "45%", right: -40 }}
              animate={{ y: [0, -14, 0] }}
              transition={{ duration: 6, repeat: Infinity, ease: "easeInOut", delay: 1 }}
            />
          </div>

          {/* Floating particles */}
          {particles.map((p) => (
            <motion.span
              key={p.id}
              className="absolute pointer-events-none"
              style={{ left: p.x, bottom: -40, fontSize: p.size, zIndex: 1 }}
              animate={{ y: [0, -(typeof window !== "undefined" ? window.innerHeight + 80 : 800)], rotate: [0, 360] }}
              transition={{
                duration: p.duration,
                delay: p.delay,
                repeat: Infinity,
                ease: "linear",
              }}
            >
              {p.emoji}
            </motion.span>
          ))}

          {/* Rainbow top stripe */}
          <div
            className="absolute top-0 left-0 right-0 h-2"
            style={{
              background: "linear-gradient(90deg,#ff2d78,#ff6b00,#ffe600,#39ff14,#00cfff,#a855f7,#ff2d78)",
              backgroundSize: "300% 100%",
              animation: "bgPulse 2s linear infinite",
            }}
          />

          {/* Centre content */}
          <div className="relative z-10 flex flex-col items-center gap-6 px-6 w-full max-w-xs">
            {/* Big bouncing cake */}
            <motion.div
              className="text-7xl"
              animate={{ y: [0, -18, 0], rotate: [-4, 4, -4] }}
              transition={{ duration: 1.1, repeat: Infinity, ease: "easeInOut" }}
            >
              🎂
            </motion.div>

            {/* Title */}
            <div className="text-center">
              <motion.h1
                className="font-black leading-tight"
                style={{
                  fontSize: "clamp(1.8rem, 7vw, 2.6rem)",
                  color: "#ffe600",
                  textShadow: "4px 4px 0 #ff2d78, 8px 8px 0 rgba(0,0,0,0.25)",
                }}
                animate={{ scale: [1, 1.03, 1] }}
                transition={{ duration: 1.6, repeat: Infinity, ease: "easeInOut" }}
              >
                สุขสันต์วันเกิด
              </motion.h1>
              <motion.h2
                className="font-black"
                style={{
                  fontSize: "clamp(1.4rem, 6vw, 2rem)",
                  color: "#ff2d78",
                  textShadow: "3px 3px 0 #ffe600",
                }}
              >
                ตัวเอกของวันนี้ 🎉
              </motion.h2>
            </div>

            {/* Step label */}
            <AnimatePresence mode="wait">
              <motion.div
                key={step}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                transition={{ duration: 0.3 }}
                className="flex items-center gap-2"
              >
                <span className="text-xl">{LOAD_STEPS[step].emoji}</span>
                <span
                  className="font-bold text-sm"
                  style={{ color: "#00cfff", textShadow: "0 0 8px #00cfff" }}
                >
                  {LOAD_STEPS[step].text}
                </span>
              </motion.div>
            </AnimatePresence>

            {/* Progress bar */}
            <div className="w-full">
              <div
                className="w-full rounded-full overflow-hidden border-2 border-black"
                style={{ height: "14px", background: "rgba(255,255,255,0.08)" }}
              >
                <motion.div
                  className="h-full rounded-full"
                  style={{
                    background: "linear-gradient(90deg, #ff2d78, #ff6b00, #ffe600)",
                    boxShadow: "0 0 12px rgba(255,45,120,0.7)",
                    width: `${progress}%`,
                  }}
                  transition={{ ease: "linear" }}
                />
              </div>
              {/* Percent label */}
              <motion.p
                className="text-right font-black text-xs mt-1"
                style={{ color: "#ffe600" }}
              >
                {Math.round(progress)}%
              </motion.p>
            </div>

            {/* Pulsing dots */}
            <div className="flex gap-3">
              {[0, 1, 2].map((i) => (
                <motion.div
                  key={i}
                  className="rounded-full border-2 border-black"
                  style={{ width: 12, height: 12, background: ["#ff2d78", "#ffe600", "#39ff14"][i] }}
                  animate={{ scale: [1, 1.6, 1], opacity: [0.5, 1, 0.5] }}
                  transition={{ duration: 0.9, repeat: Infinity, delay: i * 0.2, ease: "easeInOut" }}
                />
              ))}
            </div>
          </div>

          {/* Rainbow bottom stripe */}
          <div
            className="absolute bottom-0 left-0 right-0 h-2"
            style={{
              background: "linear-gradient(90deg,#a855f7,#00cfff,#39ff14,#ffe600,#ff6b00,#ff2d78)",
              backgroundSize: "300% 100%",
              animation: "bgPulse 2s linear infinite reverse",
            }}
          />
        </motion.div>
      )}
    </AnimatePresence>
  );
}