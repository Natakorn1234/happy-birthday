"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

const FLOATING_EMOJIS = ["🎂", "🎉", "🎈", "🔥", "💥", "✨", "🎊", "💫", "⭐", "🌟"];

interface FloatingEmoji {
  id: number;
  emoji: string;
  left: string;
  duration: number;
  delay: number;
  size: string;
}

export default function HomePage() {
  const router = useRouter();
  const [clicked, setClicked] = useState(false);
  const [floaters, setFloaters] = useState<FloatingEmoji[]>([]);
  const [shake, setShake] = useState(false);

  useEffect(() => {
    const items: FloatingEmoji[] = Array.from({ length: 15 }, (_, i) => ({
      id: i,
      emoji: FLOATING_EMOJIS[Math.floor(Math.random() * FLOATING_EMOJIS.length)],
      left: `${Math.random() * 90}%`,
      duration: 4 + Math.random() * 4,
      delay: Math.random() * 5,
      size: `${1.5 + Math.random() * 2}rem`,
    }));
    setFloaters(items);
  }, []);

  const handleClick = () => {
    setClicked(true);
    setTimeout(() => router.push("/gift"), 800);
  };

  const handleTitleClick = () => {
    setShake(true);
    setTimeout(() => setShake(false), 500);
  };

  return (
    <div
      className="min-h-screen relative overflow-hidden flex flex-col items-center justify-center px-4"
      style={{
        background: "linear-gradient(135deg, #1a0030, #3d0060, #1a0030)",
      }}
    >
      {/* Animated background blobs */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{ zIndex: 0 }}
      >
        <div
          className="absolute rounded-full blur-3xl opacity-40"
          style={{
            width: "300px",
            height: "300px",
            background: "#ff2d78",
            top: "-80px",
            left: "-80px",
            animation: "float 5s ease-in-out infinite",
          }}
        />
        <div
          className="absolute rounded-full blur-3xl opacity-30"
          style={{
            width: "250px",
            height: "250px",
            background: "#ffe600",
            bottom: "-60px",
            right: "-60px",
            animation: "float 4s ease-in-out infinite reverse",
          }}
        />
        <div
          className="absolute rounded-full blur-3xl opacity-30"
          style={{
            width: "200px",
            height: "200px",
            background: "#00cfff",
            top: "40%",
            right: "-50px",
            animation: "float 6s ease-in-out infinite",
          }}
        />
      </div>

      {/* Floating emojis background */}
      {floaters.map((f) => (
        <span
          key={f.id}
          className="absolute pointer-events-none select-none"
          style={{
            left: f.left,
            bottom: "-50px",
            fontSize: f.size,
            animation: `floatEmoji ${f.duration}s ${f.delay}s linear infinite`,
            zIndex: 1,
          }}
        >
          {f.emoji}
        </span>
      ))}

      {/* Marquee top */}
      <div
        className="absolute top-0 w-full overflow-hidden py-2"
        style={{
          background: "#ff2d78",
          zIndex: 10,
        }}
      >
        <span
          className="inline-block text-white font-black text-sm"
          style={{ animation: "marqueeLeft 6s linear infinite" }}
        >
          🎉 วันเกิดมึงว่ะ!! 🎂 สุขสันต์นะเว้ย 🔥 ฉลองเลยยย 🎈 อีกปีแล้วน้า 💀 ยิ่งแก่ยิ่งหล่อ? 😂 หรือจะแก่ซ้ำซาก?? 🎉 วันเกิดมึงว่ะ!! 🎂 สุขสันต์นะเว้ย
        </span>
      </div>

      {/* Main content */}
      <div className="relative flex flex-col items-center gap-6 text-center" style={{ zIndex: 5 }}>
        {/* Big emoji */}
        <div
          className="text-8xl"
          style={{ animation: "bounce2 1s ease-in-out infinite" }}
        >
          🎂
        </div>

        {/* Main title */}
        <div
          onClick={handleTitleClick}
          className="cursor-pointer select-none"
          style={{
            animation: shake ? "shake 0.5s ease-in-out" : "none",
          }}
        >
          <h1
            className="font-black leading-tight"
            style={{
              fontSize: "clamp(2rem, 8vw, 3.5rem)",
              color: "#ffe600",
              textShadow: "4px 4px 0px #ff2d78, 8px 8px 0px rgba(0,0,0,0.3)",
              letterSpacing: "-0.02em",
            }}
          >
            สุขสันต์วันเกิด
          </h1>
          <h1
            className="font-black leading-tight"
            style={{
              fontSize: "clamp(2.5rem, 10vw, 4rem)",
              color: "#ff2d78",
              textShadow: "4px 4px 0px #ffe600, 8px 8px 0px rgba(0,0,0,0.3)",
              letterSpacing: "-0.02em",
            }}
          >
            ไอ่เพื่อน!! 🎂
          </h1>
        </div>

        {/* Subtitle */}
        <p
          className="font-bold text-lg max-w-xs"
          style={{ color: "#00cfff", textShadow: "0 0 10px #00cfff" }}
        >
          เฮ้ยยย!! วันนี้วันเกิดมึงแล้วนะ<br />
          <span style={{ color: "#39ff14" }}>กดรับของขวัญด่วนเลย!!! 👇</span>
        </p>

        {/* CTA Button */}
        <button
          onClick={handleClick}
          disabled={clicked}
          className="btn-chaos relative font-black rounded-2xl px-8 py-5 text-xl border-4 border-black"
          style={{
            background: clicked
              ? "#666"
              : "linear-gradient(135deg, #ff2d78, #ff6b00)",
            color: "white",
            boxShadow: clicked
              ? "none"
              : "0 8px 0 #000, 0 0 30px rgba(255,45,120,0.6)",
            transform: clicked ? "translateY(4px)" : "translateY(0)",
            transition: "all 0.2s",
            minWidth: "260px",
          }}
        >
          {clicked ? "⏳ กำลังโหลด..." : "กดเพื่อรับของขวัญ 🎁"}
        </button>

        {/* Small note */}
        <p
          className="text-sm opacity-60"
          style={{ color: "#ffffff" }}
        >
          (กดได้เลย ไม่มีไวรัสหรอกวว 😇)
        </p>

        {/* Tap title hint */}
        <p
          className="text-xs opacity-40 mt-2"
          style={{ color: "#ffe600" }}
        >
          ลองกดที่ชื่อดูสิ 👆
        </p>
      </div>

      {/* Bottom marquee */}
      <div
        className="absolute bottom-0 w-full overflow-hidden py-2"
        style={{
          background: "#ffe600",
          zIndex: 10,
        }}
      >
        <span
          className="inline-block text-black font-black text-sm"
          style={{ animation: "marqueeLeft 8s linear infinite reverse" }}
        >
          💀 โตขึ้นมาอีกปีแล้วเว้ย 🤣 ยังไม่รวยอีกหรอ? 😂 แต่ก็ยังรักมึงนะ ❤️ HBD ไอ่เพื่อน!! 🎉 💀 โตขึ้นมาอีกปีแล้วเว้ย 🤣
        </span>
      </div>
    </div>
  );
}
