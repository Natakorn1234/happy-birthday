"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

const SAD_EMOJIS = ["💀", "😭", "👻", "🤡", "😵", "🫠", "💔", "🙃"];

export default function NotFound() {
  const router = useRouter();
  const [countdown, setCountdown] = useState(5);
  const [floaters, setFloaters] = useState<
    { id: number; emoji: string; left: string; duration: number; delay: number }[]
  >([]);

  // Generate floating sad emojis
  useEffect(() => {
    setFloaters(
      Array.from({ length: 12 }, (_, i) => ({
        id: i,
        emoji: SAD_EMOJIS[Math.floor(Math.random() * SAD_EMOJIS.length)],
        left: `${Math.random() * 90}%`,
        duration: 4 + Math.random() * 4,
        delay: Math.random() * 4,
      }))
    );
  }, []);

  // Countdown + auto redirect
  useEffect(() => {
    if (countdown <= 0) {
      router.push("/");
      return;
    }
    const t = setTimeout(() => setCountdown((c) => c - 1), 1000);
    return () => clearTimeout(t);
  }, [countdown, router]);

  return (
    <div
      className="min-h-screen relative overflow-hidden flex flex-col items-center justify-center px-4 text-center"
      style={{ background: "linear-gradient(135deg, #1a0030, #3d0060, #1a0030)" }}
    >
      {/* Floating sad emojis */}
      {floaters.map((f) => (
        <span
          key={f.id}
          className="absolute pointer-events-none select-none"
          style={{
            left: f.left,
            bottom: "-50px",
            fontSize: "1.8rem",
            animation: `floatEmoji ${f.duration}s ${f.delay}s linear infinite`,
            zIndex: 1,
          }}
        >
          {f.emoji}
        </span>
      ))}

      {/* Background blobs */}
      <div className="absolute inset-0 pointer-events-none">
        <div
          className="absolute rounded-full blur-3xl opacity-30"
          style={{
            width: "280px", height: "280px",
            background: "#ff2d78", top: "-60px", left: "-60px",
            animation: "float 5s ease-in-out infinite",
          }}
        />
        <div
          className="absolute rounded-full blur-3xl opacity-20"
          style={{
            width: "220px", height: "220px",
            background: "#ffe600", bottom: "-50px", right: "-50px",
            animation: "float 4s ease-in-out infinite reverse",
          }}
        />
      </div>

      {/* Top stripe */}
      <div
        className="absolute top-0 left-0 right-0 h-2"
        style={{
          background: "linear-gradient(90deg, #ff2d78, #ffe600, #39ff14, #00cfff, #a855f7, #ff2d78)",
          backgroundSize: "300% 100%",
          animation: "bgPulse 2s linear infinite",
        }}
      />

      {/* Main content */}
      <div className="relative z-10 flex flex-col items-center gap-5 max-w-sm w-full">

        {/* 404 big number */}
        <div
          className="font-black leading-none"
          style={{
            fontSize: "clamp(5rem, 25vw, 8rem)",
            color: "#ffe600",
            textShadow: "6px 6px 0px #ff2d78, 12px 12px 0px rgba(0,0,0,0.3)",
            animation: "wiggle 1.5s ease-in-out infinite",
          }}
        >
          404
        </div>

        {/* Crying emoji */}
        <div
          className="text-6xl"
          style={{ animation: "bounce2 1s ease-in-out infinite" }}
        >
          😭
        </div>

        {/* Message card */}
        <div
          className="w-full rounded-3xl p-5 border-4 card-chaos"
          style={{
            background: "rgba(255,255,255,0.06)",
            backdropFilter: "blur(10px)",
          }}
        >
          <h1
            className="font-black mb-2"
            style={{
              fontSize: "clamp(1.4rem, 6vw, 2rem)",
              color: "#ff2d78",
              textShadow: "3px 3px 0 #ffe600",
            }}
          >
            หน้านี้ไม่มีอยู่จริงนะเว้ย!! 💀
          </h1>
          <p
            className="font-bold"
            style={{ color: "#00cfff", fontSize: "1rem", lineHeight: 1.6 }}
          >
            หลงมาถูกที่แล้ว... แต่ผิดหน้า 😂
            <br />
            <span style={{ color: "#39ff14" }}>
              ไม่ต้องตกใจ จะพาไปหน้าแรกเอง!
            </span>
          </p>
        </div>

        {/* Countdown ring */}
        <div className="flex flex-col items-center gap-2">
          <p className="text-white opacity-60 text-sm">รีไดเรคอัตโนมัติใน...</p>
          <div
            className="w-20 h-20 rounded-full border-4 flex items-center justify-center font-black text-3xl"
            style={{
              borderColor: "#ff2d78",
              color: "#ffe600",
              background: "rgba(255,45,120,0.15)",
              textShadow: "2px 2px 0 #ff2d78",
              boxShadow: "0 0 25px rgba(255,45,120,0.4)",
              animation: "pulseGlow 1s ease-in-out infinite",
            }}
          >
            {countdown}
          </div>
          <p className="text-white opacity-40 text-xs">วินาที</p>
        </div>

        {/* Manual button */}
        <button
          onClick={() => router.push("/")}
          className="btn-chaos font-black rounded-2xl px-8 py-4 text-lg border-4 border-black w-full"
          style={{
            background: "linear-gradient(135deg, #ff2d78, #ff6b00)",
            color: "white",
            boxShadow: "0 6px 0 #000, 0 0 25px rgba(255,45,120,0.5)",
          }}
        >
          พาฉันกลับบ้านเลย!! 🏠
        </button>

        <p className="text-white opacity-30 text-xs">
          (หรือจะนั่งรออยู่ก็ได้ ไม่ว่ากัน 🙃)
        </p>
      </div>

      {/* Bottom stripe */}
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