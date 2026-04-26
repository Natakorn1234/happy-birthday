"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

const MESSAGES = [
  {
    text: "ขอให้ปีนี้เป็นปีที่ใจคุณสงบขึ้น และยิ้มได้ง่ายขึ้นกว่าที่ผ่านมา",
    emoji: "😊✨",
    color: "#ff6b6b",
  },
  {
    text: "ขอให้พบเจอแต่สิ่งดี ๆ ในชีวิต โดยไม่ต้องพยายามมากก็ยังรู้สึกสบายใจ",
    emoji: "🌿🙂",
    color: "#1e90ff",
  },
  {
    text: "ขอให้ความเหนื่อยที่มี ค่อย ๆ เบาลงไปทีละน้อยโดยไม่รู้ตัว",
    emoji: "🌙💙",
    color: "#6c5ce7",
  },
  {
    text: "ขอให้มีวันที่รู้สึกว่า “วันนี้ก็ดีเหมือนกัน” เพิ่มขึ้นเรื่อย ๆ",
    emoji: "☀️🙂",
    color: "#00d2d3",
  },
  {
    text: "ขอให้ยังมีแรงก้าวต่อไป แม้ในวันที่ไม่ง่ายก็ตาม",
    emoji: "💪🌱",
    color: "#2ecc71",
  },
  {
    text: "ขอให้ได้พบคนที่อยู่ด้วยแล้วสบายใจ ไม่ต้องฝืนตัวเอง",
    emoji: "🤍🌿",
    color: "#e84393",
  },
  {
    text: "ขอให้ชีวิตค่อย ๆ เป็นไปในทางที่ดีขึ้น โดยไม่ต้องเร่งรีบ",
    emoji: "🌊😌",
    color: "#1abc9c",
  },
  {
    text: "ขอให้ความฝันยังคงอยู่ และค่อย ๆ เข้าใกล้ขึ้นในสักวัน",
    emoji: "✨🌙",
    color: "#f39c12",
  },
  {
    text: "ขอให้มีช่วงเวลาธรรมดา ๆ ที่เรียบง่าย แต่มีความสุขพอสำหรับหัวใจ",
    emoji: "☕🙂",
    color: "#34495e",
  },
  {
    text: "ขอให้สิ่งที่ตั้งใจไว้ ค่อย ๆ เติบโตและเข้าใกล้ความสำเร็จทีละน้อย",
    emoji: "📈🌿",
    color: "#27ae60",
  },
  {
    text: "ขอให้หัวใจยังคงอ่อนโยน ไม่ว่าจะต้องเจอกับอะไรในชีวิต",
    emoji: "🤍🌸",
    color: "#a8a5c2",
  },
  {
    text: "ขอให้คุณยังเป็นตัวเองได้อย่างสบายใจ โดยไม่ต้องฝืนเพื่อใคร",
    emoji: "🫶✨",
    color: "#fd79a8",
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
          สุ่มได้แล้ว {count} ครั้ง {count > 5 ? "😂 จะเอาอะไรอีก??" : ""}
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
