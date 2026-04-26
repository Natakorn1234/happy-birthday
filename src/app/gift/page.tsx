"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

const MESSAGES = [
  {
    text: "ขอให้รวยไวๆ แต่ตอนนี้ยังเหมือนเดิมก่อนนะ 😂",
    emoji: "💸",
    color: "#ffe600",
  },
  {
    text: "แก่ขึ้นอีกปี แต่สมองยัง beta อยู่เลย 🧠",
    emoji: "🤖",
    color: "#00cfff",
  },
  {
    text: "ขอให้มีแฟนในปีนี้... ถ้าจักรวาลไม่ขัดขวางนะ 🌌",
    emoji: "💔",
    color: "#ff2d78",
  },
  {
    text: "สุขภาพดีๆ นะ เพราะค่ารักษาพยาบาลแพงม้าก 💊",
    emoji: "🏥",
    color: "#39ff14",
  },
  {
    text: "อายุมากขึ้น ความรับผิดชอบก็เพิ่ม แต่ยังไม่โตเลย 😭",
    emoji: "👶",
    color: "#ff6b00",
  },
  {
    text: "ขอให้ Netflix ไม่ขึ้นราคาอีกแล้ว อย่างน้อยในปีนี้ 📺",
    emoji: "🎬",
    color: "#a855f7",
  },
  {
    text: "ปีนี้ขอให้ชีวิตดีกว่าปีที่แล้ว... ซึ่งก็ไม่ได้ยากอะไร 💀",
    emoji: "☠️",
    color: "#ff2d78",
  },
  {
    text: "หน้าตาดีเหมือนเดิม (แต่ขมับเริ่มขาวละนะ) 👴",
    emoji: "🪄",
    color: "#ffe600",
  },
  {
    text: "ขอให้ wifi ไม่หลุดตอนดูหนัง และชีวิตไม่ล็อกตอน boss fight 🎮",
    emoji: "🕹️",
    color: "#00cfff",
  },
  {
    text: "พรจากใจ: ขอให้รถไม่เสียในวันที่ไม่มีตัง 🚗💨",
    emoji: "🔧",
    color: "#39ff14",
  },
  {
    text: "ขอให้เจอ sale 11.11 ทุกอย่างที่อยากได้ 🛍️",
    emoji: "🤑",
    color: "#ff6b00",
  },
  {
    text: "อย่าลืมดื่มน้ำ นอนหลับพอ และบล็อคคนที่ toxic นะเว้ย 🚫",
    emoji: "💧",
    color: "#00cfff",
  },
];

const REACTIONS = ["😂", "🤣", "💀", "😭", "🔥", "😤", "🫡", "🤡"];

export default function GiftPage() {
  const router = useRouter();
  const [currentMsg, setCurrentMsg] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  const [reaction, setReaction] = useState("");
  const [count, setCount] = useState(0);
  const [showNextHint, setShowNextHint] = useState(false);

  useEffect(() => {
    // Randomize starting message
    setCurrentMsg(Math.floor(Math.random() * MESSAGES.length));
  }, []);

  useEffect(() => {
    if (count >= 3) {
      setShowNextHint(true);
    }
  }, [count]);

  const shuffleMessage = () => {
    if (isAnimating) return;
    setIsAnimating(true);
    setReaction(REACTIONS[Math.floor(Math.random() * REACTIONS.length)]);
    setCount((c) => c + 1);

    setTimeout(() => {
      let next;
      do {
        next = Math.floor(Math.random() * MESSAGES.length);
      } while (next === currentMsg);
      setCurrentMsg(next);
      setIsAnimating(false);
    }, 300);
  };

  const msg = MESSAGES[currentMsg];

  return (
    <div
      className="min-h-screen flex flex-col items-center justify-center px-4 py-16 relative overflow-hidden"
      style={{
        background: "linear-gradient(160deg, #0f0024, #1a0040, #0f0024)",
      }}
    >
      {/* Decorative circles */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {[...Array(6)].map((_, i) => (
          <div
            key={i}
            className="absolute rounded-full opacity-10"
            style={{
              width: `${80 + i * 40}px`,
              height: `${80 + i * 40}px`,
              border: "3px solid #ff2d78",
              top: `${10 + i * 15}%`,
              left: `${i % 2 === 0 ? -20 : 70 + i * 5}%`,
              animation: `float ${3 + i}s ease-in-out ${i * 0.5}s infinite`,
            }}
          />
        ))}
      </div>

      {/* Header */}
      <div className="text-center mb-6 relative z-10">
        <p
          className="font-bold text-sm uppercase tracking-widest mb-1"
          style={{ color: "#ff2d78" }}
        >
          🎁 ของขวัญสุดพิเศษ
        </p>
        <h2
          className="font-black"
          style={{
            fontSize: "clamp(1.5rem, 6vw, 2.5rem)",
            color: "#ffe600",
            textShadow: "3px 3px 0 #ff2d78",
          }}
        >
          คำอวยพรจากเพื่อน ❤️
        </h2>
        <p className="text-white opacity-50 text-sm mt-1">
          สุ่มได้แล้ว {count} ครั้ง {count > 5 ? "😂 มึงจะเอาอะไรอีก??" : ""}
        </p>
      </div>

      {/* Message Card */}
      <div
        className="relative w-full max-w-sm rounded-3xl p-6 mb-6 border-4 card-chaos"
        style={{
          background: "rgba(255,255,255,0.05)",
          backdropFilter: "blur(10px)",
          transition: "all 0.3s",
          opacity: isAnimating ? 0 : 1,
          transform: isAnimating ? "scale(0.95) rotate(-2deg)" : "scale(1) rotate(0deg)",
        }}
      >
        {/* Big emoji */}
        <div
          className="text-6xl text-center mb-4"
          style={{ animation: "bounce2 1.5s ease-in-out infinite" }}
        >
          {msg.emoji}
        </div>

        {/* Message text */}
        <p
          className="font-bold text-center leading-relaxed"
          style={{
            fontSize: "clamp(1.1rem, 4vw, 1.4rem)",
            color: msg.color,
            textShadow: `0 0 20px ${msg.color}80`,
          }}
        >
          {msg.text}
        </p>

        {/* Reaction that appears after shuffle */}
        {reaction && !isAnimating && (
          <div
            className="absolute -top-4 -right-4 w-12 h-12 flex items-center justify-center rounded-full text-2xl border-4 border-black"
            style={{
              background: "#ff2d78",
              animation: "popIn 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275) forwards",
            }}
          >
            {reaction}
          </div>
        )}
      </div>

      {/* Shuffle Button */}
      <button
        onClick={shuffleMessage}
        disabled={isAnimating}
        className="btn-chaos font-black rounded-2xl px-8 py-4 text-lg border-4 border-black mb-4"
        style={{
          background: isAnimating
            ? "#555"
            : "linear-gradient(135deg, #00cfff, #39ff14)",
          color: "#000",
          boxShadow: isAnimating ? "none" : "0 6px 0 #000",
          transform: isAnimating ? "translateY(4px)" : "translateY(0)",
          transition: "all 0.15s",
          minWidth: "240px",
        }}
      >
        {isAnimating ? "🎲 สุ่มกำลังโหลด..." : "สุ่มใหม่ 🔁"}
      </button>

      {/* Counter badges */}
      <div className="flex gap-2 mb-6 flex-wrap justify-center">
        {[...Array(Math.min(count, 8))].map((_, i) => (
          <span
            key={i}
            className="text-lg"
            style={{ animation: `bounce2 ${1 + i * 0.1}s ease-in-out infinite` }}
          >
            ⭐
          </span>
        ))}
      </div>

      {/* Next page hint */}
      {showNextHint && (
        <div
          className="mt-2 text-center"
          style={{ animation: "popIn 0.5s ease forwards" }}
        >
          <p className="text-white opacity-70 text-sm mb-3">
            ได้เวลาไปรับของจริงแล้วว! 🎊
          </p>
          <button
            onClick={() => router.push("/final")}
            className="btn-chaos font-black rounded-2xl px-8 py-4 text-lg border-4 border-black"
            style={{
              background: "linear-gradient(135deg, #ff2d78, #a855f7)",
              color: "white",
              boxShadow: "0 6px 0 #000, 0 0 30px rgba(255,45,120,0.5)",
            }}
          >
            ไปรับของขวัญสุดท้าย 🎊
          </button>
        </div>
      )}

      {/* Back link */}
      <button
        onClick={() => router.push("/")}
        className="mt-6 text-sm opacity-40 text-white underline"
      >
        ← กลับหน้าแรก
      </button>
    </div>
  );
}
