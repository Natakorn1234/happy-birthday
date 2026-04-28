"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

// Phase 1: normal steps while bar fills to 99%
// Phase 2: bar FREEZES at 99% — panic messages loop for ~6 seconds
// Phase 3: BOOM — slams to 100% and exits
const NORMAL_STEPS = [
  { text: "กำลังเตรียมของขวัญ...", emoji: "🎁" },
  { text: "จุดเทียนวันเกิด...", emoji: "🕯️" },
];

const PANIC_STEPS = [
  { text: "เอ๊ะ... ทำไมมันค้างวะ 🤨", emoji: "😐" },
  { text: "อย่าปิดนะ กำลังงงอยู่ 😅", emoji: "😅" },
  { text: "99% แล้ว แต่ใจยังไม่ถึง 💀", emoji: "💀" },
  { text: "มันจะไปต่อไหมอะ หรือจะค้างตรงนี้เลย 😭", emoji: "😭" },
  { text: "อยู่มั้ยเพื่อน… อย่าทิ้งกัน 🥺", emoji: "🥺" },
  { text: "ระบบกำลัง “อิน” กับวันเกิดอยู่ 🎂", emoji: "🛠️" },
  { text: "server: 99% (แต่ใจ 0%)", emoji: "🧠" },
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

type Phase = "filling" | "stuck" | "boom";

export default function PageLoader({ onDone }: { onDone: () => void }) {
  const [progress, setProgress] = useState(0);
  const [phase, setPhase] = useState<Phase>("filling");
  const [stepIndex, setStepIndex] = useState(0);
  const [panicIndex, setPanicIndex] = useState(0);
  const [particles, setParticles] = useState<Particle[]>([]);
  const [exiting, setExiting] = useState(false);
  const [shake, setShake] = useState(false);

  useEffect(() => {
    setParticles(
      Array.from({ length: 8 }, (_, i) => ({
        id: i,
        emoji: PARTICLE_EMOJIS[i % PARTICLE_EMOJIS.length],
        x: `${10 + i * 11}%`,
        delay: i * 0.4,
        duration: 3 + (i % 3),
        size: `${1.4 + (i % 3) * 0.4}rem`,
      }))
    );
  }, []);

  // Phase 1: fill bar from 0 → 99 in ~2.5s
  useEffect(() => {
    if (phase !== "filling") return;

    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 40 && stepIndex < 1) setStepIndex(1);
        if (prev >= 99) {
          clearInterval(interval);
          setTimeout(() => setPhase("stuck"), 300);
          return 99;
        }
        return Math.min(prev + 1.2, 99);
      });
    }, 30);

    return () => clearInterval(interval);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [phase]);

  // Phase 2: stuck at 99% — cycle panic messages, shake bar
  useEffect(() => {
    if (phase !== "stuck") return;

    let i = 0;
    const msgTimer = setInterval(() => {
      i++;
      setPanicIndex((prev) => (prev + 1) % PANIC_STEPS.length);

      // Shake bar every other message
      if (i % 2 === 0) {
        setShake(true);
        setTimeout(() => setShake(false), 500);
      }

      // After 7 panic messages (~14s), trigger BOOM
      if (i >= 7) {
        clearInterval(msgTimer);
        setTimeout(() => setPhase("boom"), 400);
      }
    }, 1200);

    return () => clearInterval(msgTimer);
  }, [phase]);

  // Phase 3: BOOM — slam to 100% and exit
  useEffect(() => {
    if (phase !== "boom") return;
    setProgress(100);
    setTimeout(() => {
      setExiting(true);
      setTimeout(onDone, 600);
    }, 800);
  }, [phase, onDone]);

  const isStuck = phase === "stuck";
  const isBoom = phase === "boom";

  const currentLabel =
    phase === "filling"
      ? NORMAL_STEPS[stepIndex]
      : phase === "stuck"
      ? PANIC_STEPS[panicIndex]
      : { text: "โอเค ไปกันเลย HAPPY BIRTHDAY!! 🚀", emoji: "🔥" };

  return (
    <AnimatePresence>
      {!exiting && (
        <motion.div
          key="loader"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, scale: 1.06 }}
          transition={{ duration: 0.5, ease: "easeInOut" }}
          className="fixed inset-0 z-50 flex flex-col items-center justify-center overflow-hidden select-none"
          style={{ background: "linear-gradient(135deg, #1a0030, #3d0060, #1a0030)" }}
        >
          {/* Bg blobs — turns orange/frantic when stuck */}
          <div className="absolute inset-0 pointer-events-none">
            <motion.div
              className="absolute rounded-full opacity-40"
              style={{
                width: 240, height: 240,
                background: isStuck ? "#ff6b00" : "#ff2d78",
                top: -60, left: -60,
                filter: "blur(60px)",
                willChange: "transform",
                transition: "background 0.5s",
              }}
              animate={{ y: [0, -16, 0] }}
              transition={{ duration: isStuck ? 0.5 : 5, repeat: Infinity, ease: "easeInOut" }}
            />
            <motion.div
              className="absolute rounded-full opacity-25"
              style={{
                width: 200, height: 200,
                background: "#ffe600",
                bottom: -40, right: -40,
                filter: "blur(60px)",
                willChange: "transform",
              }}
              animate={{ y: [0, 16, 0] }}
              transition={{ duration: 4, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
            />
          </div>

          {/* Floating particles */}
          {particles.map((p) => (
            <motion.span
              key={p.id}
              className="absolute pointer-events-none"
              style={{ left: p.x, bottom: -40, fontSize: p.size, zIndex: 1, willChange: "transform" }}
              animate={{ y: -900 }}
              transition={{ duration: p.duration, delay: p.delay, repeat: Infinity, ease: "linear" }}
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

            {/* Cake emoji — panics when stuck, explodes on boom */}
            <motion.div
              className="text-7xl"
              style={{ willChange: "transform" }}
              animate={
                isBoom
                  ? { scale: [1, 1.8, 0.7, 1.3, 1], rotate: [0, -20, 20, -10, 0] }
                  : isStuck
                  ? { rotate: [-8, 8, -8] }
                  : { y: [0, -16, 0] }
              }
              transition={
                isBoom
                  ? { duration: 0.6, ease: "easeOut" }
                  : { duration: isStuck ? 0.3 : 1.1, repeat: Infinity, ease: "easeInOut" }
              }
            >
              {isBoom ? "🎉" : isStuck ? "😰" : "🎂"}
            </motion.div>

            {/* Title */}
            <div className="text-center">
              <h1
                className="font-black leading-tight"
                style={{
                  fontSize: "clamp(1.8rem, 7vw, 2.6rem)",
                  color: "#ffe600",
                  textShadow: "4px 4px 0 #ff2d78, 8px 8px 0 rgba(0,0,0,0.25)",
                }}
              >
                สุขสันต์วันเกิด
              </h1>
              <h2
                className="font-black"
                style={{
                  fontSize: "clamp(1.4rem, 6vw, 2rem)",
                  color: "#ff2d78",
                  textShadow: "3px 3px 0 #ffe600",
                }}
              >
                ตัวเอกของวันนี้ 🎉
              </h2>
            </div>

            {/* Status label — fades between messages */}
            <AnimatePresence mode="wait">
              <motion.div
                key={`${phase}-${isStuck ? panicIndex : stepIndex}`}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                transition={{ duration: 0.35 }}
                className="flex items-center gap-2 min-h-[28px]"
              >
                <span className="text-xl">{currentLabel.emoji}</span>
                <span
                  className="font-bold text-sm"
                  style={{
                    color: isStuck ? "#ff6b00" : isBoom ? "#39ff14" : "#00cfff",
                    textShadow: `0 0 8px ${isStuck ? "#ff6b00" : isBoom ? "#39ff14" : "#00cfff"}`,
                  }}
                >
                  {currentLabel.text}
                </span>
              </motion.div>
            </AnimatePresence>

            {/* Progress bar — shakes when stuck */}
            <div className="w-full">
              <motion.div
                animate={shake ? { x: [-5, 5, -4, 4, -2, 2, 0] } : { x: 0 }}
                transition={{ duration: 0.4 }}
              >
                <div
                  className="w-full rounded-full overflow-hidden border-2 border-black"
                  style={{ height: "14px", background: "rgba(255,255,255,0.08)" }}
                >
                  <div
                    className="h-full rounded-full"
                    style={{
                      width: `${progress}%`,
                      background: isBoom
                        ? "linear-gradient(90deg, #39ff14, #00cfff)"
                        : isStuck
                        ? "linear-gradient(90deg, #ff6b00, #ff2d78)"
                        : "linear-gradient(90deg, #ff2d78, #ff6b00, #ffe600)",
                      boxShadow: isBoom
                        ? "0 0 20px rgba(57,255,20,0.9)"
                        : isStuck
                        ? "0 0 14px rgba(255,107,0,0.9)"
                        : "0 0 10px rgba(255,45,120,0.6)",
                      transition: isBoom
                        ? "width 0.5s cubic-bezier(0.22,1,0.36,1), background 0.3s, box-shadow 0.3s"
                        : "width 0.08s linear, background 0.3s, box-shadow 0.3s",
                    }}
                  />
                </div>

                {/* Percent row */}
                <div className="flex justify-between items-center mt-1">
                  <span
                    className="font-black text-xs"
                    style={{ color: isStuck ? "#ff6b00" : "transparent" }}
                  >
                    {isStuck ? "⚠️ ค้างอยู่ที่..." : "​"}
                  </span>
                  <span
                    className="font-black text-xs"
                    style={{
                      color: isStuck ? "#ff6b00" : isBoom ? "#39ff14" : "#ffe600",
                    }}
                  >
                    {Math.round(progress)}%{isStuck ? " 😭" : ""}
                  </span>
                </div>
              </motion.div>
            </div>

            {/* Pulsing dots — go frantic when stuck */}
            <div className="flex gap-3">
              {(["#ff2d78", "#ffe600", "#39ff14"] as const).map((color, i) => (
                <div
                  key={i}
                  className="rounded-full border-2 border-black"
                  style={{
                    width: 12,
                    height: 12,
                    background: isStuck ? "#ff6b00" : isBoom ? "#39ff14" : color,
                    animation: isStuck
                      ? `pulseGlow 0.25s ${i * 0.05}s ease-in-out infinite`
                      : `pulseGlow 0.9s ${i * 0.2}s ease-in-out infinite`,
                    transition: "background 0.3s",
                  }}
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