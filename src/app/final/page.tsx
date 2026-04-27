"use client";

import { useEffect, useState, useRef } from "react";
import { useRouter } from "next/navigation";

const HEARTS = ["❤️", "🧡", "💛", "💚", "💙", "💜", "🖤", "🤍", "💕", "💞", "💓", "💗"];

export default function FinalPage() {
  const router = useRouter();
  const [hearts, setHearts] = useState<{ id: number; emoji: string; left: string; delay: number; duration: number }[]>([]);
  const [showMessage, setShowMessage] = useState(false);
  const [showButtons, setShowButtons] = useState(false);
  const [clickCount, setClickCount] = useState(0);
  const confettiRef = useRef<boolean>(false);

  const lines = [
    "ปีที่ผ่านมาอาจไม่ง่ายสำหรับเธอ",
    "มีทั้งวันที่เหนื่อย และวันที่ไม่แน่ใจตัวเอง",
    "แต่เธอก็ยังผ่านมาได้จนถึงตรงนี้",
    "",
    "แค่นี้ก็เก่งมากแล้วนะ",
    "ไม่ต้องรีบดีขึ้น ไม่ต้องแข่งกับใคร",
    "แค่ค่อย ๆ ใช้ชีวิตในจังหวะของตัวเองก็พอแล้ว",
    "",
    "ขอให้ปีนี้มีเรื่องดี ๆ ค่อย ๆ เข้ามา",
    "และใจเธอเบาลงทีละนิด"
  ];

  useEffect(() => {
    const h = Array.from({ length: 20 }, (_, i) => ({
      id: i,
      emoji: HEARTS[Math.floor(Math.random() * HEARTS.length)],
      left: `${Math.random() * 90}%`,
      delay: Math.random() * 3,
      duration: 3 + Math.random() * 4,
    }));
    setHearts(h);

    setTimeout(() => setShowMessage(true), 400);
    setTimeout(() => setShowButtons(true), 1200);

    if (!confettiRef.current) {
      confettiRef.current = true;
      launchConfetti();
    }
  }, []);

  const launchConfetti = async () => {
    try {
      const confetti = (await import("canvas-confetti")).default;

      const fire = (particleRatio: number, opts: Record<string, unknown>) => {
        confetti({
          origin: { y: 0.6 },
          ...opts,
          particleCount: Math.floor(200 * particleRatio),
        });
      };

      fire(0.25, { spread: 26, startVelocity: 55 });
      fire(0.2, { spread: 60 });
      fire(0.35, { spread: 100, decay: 0.91, scalar: 0.8 });
      fire(0.1, { spread: 120, startVelocity: 25, decay: 0.92, scalar: 1.2 });
      fire(0.1, { spread: 120, startVelocity: 45 });
    } catch (e) {
      console.log("confetti failed", e);
    }
  };

  const handleHeartClick = () => {
    setClickCount((c) => c + 1);
    launchConfetti();
  };

  return (
    <div
      className="min- h-screen relative overflow-hidden flex flex-col items-center justify-center px-4 py-12"
      style={{
        background: "linear-gradient(160deg, #0a0020, #1e003a, #0a0020)",
      }}
    >
      {/* Floating hearts */}
      {hearts.map((h) => (
        <span
          key={h.id}
          className="absolute pointer-events-none select-none"
          style={{
            left: h.left,
            bottom: "-50px",
            fontSize: `${1 + Math.random()}rem`,
            animation: `floatEmoji ${h.duration}s ${h.delay}s linear infinite`,
            zIndex: 1,
          }}
        >
          {h.emoji}
        </span>
      ))}

      {/* Top decoration */}
      <div
        className="absolute top-0 left-0 right-0 h-2"
        style={{
          background: "linear-gradient(90deg, #ff2d78, #ffe600, #39ff14, #00cfff, #a855f7, #ff2d78)",
          backgroundSize: "300% 100%",
          animation: "bgPulse 2s linear infinite",
        }}
      />

      <div className="relative z-10 flex flex-col items-center gap-6 text-center max-w-sm w-full">

        <div className="flex gap-2 text-3xl" style={{ animation: "bounce2 1s ease-in-out infinite" }}>
          ✨⭐✨
        </div>

        <button
          onClick={handleHeartClick}
          className="text-7xl cursor-pointer border-0 bg-transparent"
          style={{
            animation: "pulseGlow 2s ease-in-out infinite, bounce2 2s ease-in-out infinite",
            filter: "drop-shadow(0 0 20px rgba(255,45,120,0.8))",
            transition: "transform 0.1s",
          }}
          onMouseDown={(e) => (e.currentTarget.style.transform = "scale(0.9)")}
          onMouseUp={(e) => (e.currentTarget.style.transform = "scale(1)")}
        >
          ❤️
        </button>

        {clickCount > 0 && (
          <p className="text-pink-400 text-sm font-bold">
            ส่งพลังใจแล้ว {clickCount} ครั้ง ✨
          </p>
        )}

        {/* MESSAGE (no typing anymore) */}
        {showMessage && (
          <div style={{ animation: "popIn 0.7s ease forwards" }}>
            <h1
              className="font-black leading-tight mb-3"
              style={{
                fontSize: "clamp(2rem, 8vw, 3rem)",
                color: "#ff2d78",
                textShadow: "4px 4px 0 #ffe600",
              }}
            >
              สุขสันต์วันเกิดนะ :)
            </h1>

            <div
              className="rounded-3xl p-5 border-4 mb-2"
              style={{
                background: "rgba(255,255,255,0.06)",
                backdropFilter: "blur(10px)",
                borderColor: "#ff2d78",
                boxShadow: "0 0 30px rgba(255,45,120,0.3)",
              }}
            >
              <p className="text-white opacity-90 leading-relaxed text-base">
                {lines.map((line, i) => (
                  <span key={i}>
                    {line}
                    <br />
                  </span>
                ))}
              </p>

              <p className="mt-4 text-white opacity-60 text-sm">
                ขอบคุณที่ยังอยู่ตรงนี้นะ 🫶
              </p>
            </div>
          </div>
        )}

        {/* BUTTONS */}
        {showButtons && (
          <div
            className="flex flex-col gap-3 w-full"
            style={{ animation: "popIn 0.5s ease forwards" }}
          >
            <button
              onClick={launchConfetti}
              className="btn-chaos font-black rounded-2xl px-8 py-4 text-lg border-4 border-black w-full"
              style={{
                background: "linear-gradient(135deg, #ff2d78, #ff6b00)",
                color: "white",
                boxShadow: "0 6px 0 #000",
              }}
            >
              ✨ เพิ่มความสุขอีกหน่อย
            </button>

            <button
              onClick={() => router.push("/")}
              className="btn-chaos font-black rounded-2xl px-8 py-4 text-lg border-4 border-black w-full"
              style={{
                background: "linear-gradient(135deg, #00cfff, #a855f7)",
                color: "white",
                boxShadow: "0 6px 0 #000",
              }}
            >
              ย้อนกลับไปเริ่มใหม่ 🎁
            </button>
          </div>
        )}

        <p className="text-white opacity-30 text-xs mt-4">
          made with 💀 & ❤️ — Natakorn
        </p>
      </div>

      {/* Bottom decoration */}
      <div
        className="absolute bottom-0 left-0 right-0 h-2"
        style={{
          background: "linear-gradient(90deg, #a855f7, #00cfff, #39ff14, #ffe600, #ff6b00, #ff2d78)",
          backgroundSize: "300% 100%",
          animation: "bgPulse 2s linear infinite reverse",
        }}
      />
    </div>
  );
}