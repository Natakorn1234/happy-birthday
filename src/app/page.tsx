"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

const FLOATING_EMOJIS = ["🎂", "🎉", "🎈", "🔥", "💥", "✨", "🎊", "💫", "⭐", "🌟"];

const SECRET_MESSAGES = [
  "🚨 ระบบแจ้ง: วันนี้ต้องยิ้ม",
  "✨ ความหล่อ/สวย +100 (ชั่วคราว)",
  "🎂 วันเกิด detected: เปิดโหมดพิเศษ",
  "💸 เงินกำลังจะเข้าทางลึกลับ",
  "🔥 อายุเพิ่ม แต่ความเท่ก็เพิ่มด้วย",
  "ระบบบอก: อย่าคลิกแรง เดี๋ยวเครื่องพัง 😤",
  "โอเค ข้อมูลถูก leak แล้ว 👀",
];

// ─── Bad word filter ───────────────────────────────────────────
const BAD_WORDS = [
  // Thai
  "ควย", "หี", "เย็ด", "สัส", "เหี้ย", "ระยำ", "ชิบหาย", "สาด", "ไอ้สัส", "อีสัส", "อีสัตว์", "ไอสัตว์", "แตด",
  // English
  "fuck", "shit", "ass", "dick", "pussy", "bitch", "cunt", "cock", "bastard", "whore", "slut", "damn",
];

const BLOCKED_REACTIONS = [
  "ใส่ชื่อจริงมาเลย อย่าเอาของนั้นมาใส่ 😭",
  "ระบบปฏิเสธ: ชื่อนี้ไม่ผ่าน QC 🚫",
  "เฮ้ยยย!! ใช้ชื่อที่แม่ตั้งให้มาเลยดิ 😤",
  "ไม่ผ่าน!! พิมพ์ชื่อจริงมาสิ 🙅",
  "โอ้โห... ชื่ออะไรเนี้ย ลองใหม่นะ 💀",
  "🚨 ชื่อนี้ถูกแบนโดยกรมชื่อแห่งชาติ",
];

const isBadWord = (input: string): boolean => {
  const normalized = input.toLowerCase().replace(/\s/g, "");
  return BAD_WORDS.some((word) => normalized.includes(word.toLowerCase()));
};
// ──────────────────────────────────────────────────────────────

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
  const [subtitle, setSubtitle] = useState("ของขวัญรออยู่ รีบกดเลย 👇");
  const [cooldown, setCooldown] = useState(false);

  // Name state
  const [name, setName] = useState("");
  const [nameInput, setNameInput] = useState("");
  const [nameSubmitted, setNameSubmitted] = useState(false);
  const [inputShake, setInputShake] = useState(false);
  const [inputError, setInputError] = useState("");

  useEffect(() => {
    const items: FloatingEmoji[] = Array.from({ length: 10 }, (_, i) => ({
      id: i,
      emoji: FLOATING_EMOJIS[Math.floor(Math.random() * FLOATING_EMOJIS.length)],
      left: `${Math.random() * 90}%`,
      duration: 4 + Math.random() * 4,
      delay: Math.random() * 5,
      size: `${1.5 + Math.random() * 2}rem`,
    }));
    setFloaters(items);

    const saved = sessionStorage.getItem("birthdayName");
    if (saved) {
      setName(saved);
      setNameInput(saved);
      setNameSubmitted(true);
    }
  }, []);

  const handleNameSubmit = () => {
    const trimmed = nameInput.trim();

    // Empty check
    if (!trimmed) {
      setInputError("พิมพ์ชื่อก่อนนะ ว่างเปล่าไม่ได้ 😤");
      triggerInputShake();
      return;
    }

    // Bad word check
    if (isBadWord(trimmed)) {
      const reaction = BLOCKED_REACTIONS[Math.floor(Math.random() * BLOCKED_REACTIONS.length)];
      setInputError(reaction);
      setNameInput(""); // wipe the bad word
      triggerInputShake();
      setTimeout(() => setInputError(""), 3500);
      return;
    }

    // All good — save and proceed
    setInputError("");
    setName(trimmed);
    sessionStorage.setItem("birthdayName", trimmed);
    setNameSubmitted(true);
  };

  const triggerInputShake = () => {
    setInputShake(true);
    setTimeout(() => setInputShake(false), 500);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") handleNameSubmit();
  };

  const handleClick = () => {
    setClicked(true);
    setTimeout(() => router.push("/gift"), 800);
  };

  const handleTitleClick = () => {
    if (cooldown || !nameSubmitted) return;
    setCooldown(true);
    setShake(true);
    const msg = SECRET_MESSAGES[Math.floor(Math.random() * SECRET_MESSAGES.length)];
    setSubtitle(msg);
    setTimeout(() => setShake(false), 500);
    setTimeout(() => setCooldown(false), 1200);
  };

  const topMarqueeText = "🎉 วันนี้คือวันของคุณ \u00a0\u00a0 🎂 โหมดฉลองเปิดใช้งาน \u00a0\u00a0 🚨 ตรวจพบวันเกิด \u00a0\u00a0 💀 แก่ขึ้นอีกปีแบบไม่ทันตั้งตัว \u00a0\u00a0 🌟 ปีนี้ต้องปัง \u00a0\u00a0\u00a0\u00a0";
  const bottomMarqueeText = "💸 ขอให้รวยแบบงง ๆ \u00a0\u00a0 ❤️ กำลังใจถูกส่งถึงแล้ว \u00a0\u00a0 🗿 ผ่านการรับรองโดยสภาผู้แก่แห่งชาติ \u00a0\u00a0 🎉 วันนี้ห้ามเศร้าเด็ดขาด \u00a0\u00a0\u00a0\u00a0";

  return (
    <div
      className="min-h-screen relative overflow-hidden flex flex-col items-center justify-center px-4"
      style={{ background: "linear-gradient(135deg, #1a0030, #3d0060, #1a0030)" }}
    >
      {/* Background blobs */}
      <div className="absolute inset-0 pointer-events-none" style={{ zIndex: 0 }}>
        <div className="absolute rounded-full blur-3xl opacity-40" style={{ width: "300px", height: "300px", background: "#ff2d78", top: "-80px", left: "-80px", animation: "float 5s ease-in-out infinite" }} />
        <div className="absolute rounded-full blur-3xl opacity-30" style={{ width: "250px", height: "250px", background: "#ffe600", bottom: "-60px", right: "-60px", animation: "float 4s ease-in-out infinite reverse" }} />
        <div className="absolute rounded-full blur-3xl opacity-30" style={{ width: "200px", height: "200px", background: "#00cfff", top: "40%", right: "-50px", animation: "float 6s ease-in-out infinite" }} />
      </div>

      {/* Floating emojis */}
      {floaters.map((f) => (
        <span key={f.id} className="absolute pointer-events-none select-none" style={{ left: f.left, bottom: "-50px", fontSize: f.size, animation: `floatEmoji ${f.duration}s ${f.delay}s linear infinite`, zIndex: 1 }}>
          {f.emoji}
        </span>
      ))}

      {/* Top marquee */}
      <div className="absolute top-0 w-full overflow-hidden py-2" style={{ background: "#ff2d78", zIndex: 10 }}>
        <div className="flex" style={{ animation: "marqueeLoop 20s linear infinite", width: "max-content" }}>
          <span className="text-white font-black text-sm whitespace-nowrap">{topMarqueeText}</span>
          <span className="text-white font-black text-sm whitespace-nowrap">{topMarqueeText}</span>
        </div>
      </div>

      {/* ── SCREEN 1: Name input ── */}
      {!nameSubmitted ? (
        <div className="relative flex flex-col items-center gap-5 text-center w-full max-w-xs" style={{ zIndex: 5 }}>

          <div className="text-7xl" style={{ animation: "bounce2 1s ease-in-out infinite" }}>🤔</div>

          <div>
            <h1 className="font-black leading-tight" style={{ fontSize: "clamp(1.8rem, 7vw, 2.6rem)", color: "#ffe600", textShadow: "4px 4px 0px #ff2d78" }}>
              เอ้า เดี๋ยวๆ ใครเนี้ย 😤
            </h1>
            <p className="font-black mt-1" style={{ fontSize: "clamp(1.2rem, 5vw, 1.8rem)", color: "#ff2d78", textShadow: "3px 3px 0 #ffe600" }}>
              ขอชื่อก่อนดิ 😎
            </p>
          </div>

          <p className="text-sm font-semibold" style={{ color: "#00cfff", textShadow: "0 0 8px #00cfff" }}>
            (ระบบ: ยังไม่อนุญาตให้เข้าถ้ายังไม่บอกชื่อ)
          </p>

          <div className="w-full flex flex-col gap-3">
            <input
              type="text"
              value={nameInput}
              onChange={(e) => {
                setNameInput(e.target.value);
                if (inputError) setInputError(""); // clear error as they retype
              }}
              onKeyDown={handleKeyDown}
              maxLength={20}
              placeholder="ชื่อเล่นก็ได้ ไม่ต้องจริงจัง 😎"
              autoFocus
              className="w-full rounded-2xl px-5 py-4 font-black text-xl text-center border-4 outline-none"
              style={{
                background: "rgba(255,255,255,0.1)",
                color: "#ffe600",
                caretColor: "#ff2d78",
                borderColor: inputError ? "#ff2d78" : "black",
                boxShadow: inputShake
                  ? "0 0 0 4px #ff2d78, 0 0 25px rgba(255,45,120,0.9)"
                  : inputError
                  ? "0 0 0 3px rgba(255,45,120,0.5)"
                  : "0 0 20px rgba(255,230,0,0.25)",
                animation: inputShake ? "shake 0.5s ease-in-out" : "none",
                transition: "box-shadow 0.2s, border-color 0.2s",
              }}
            />

            {/* Error bubble — animates in on block */}
            {inputError && (
              <div
                className="rounded-2xl px-4 py-3 border-2 border-black font-bold text-sm text-center"
                style={{
                  background: "rgba(255,45,120,0.2)",
                  color: "#ff2d78",
                  textShadow: "0 0 8px rgba(255,45,120,0.5)",
                  animation: "popIn 0.3s ease forwards",
                  boxShadow: "0 0 15px rgba(255,45,120,0.3)",
                }}
              >
                🚫 {inputError}
              </div>
            )}

            <button
              onClick={handleNameSubmit}
              className="btn-chaos w-full font-black rounded-2xl px-8 py-4 text-xl border-4 border-black"
              style={{
                background: "linear-gradient(135deg, #ff2d78, #ff6b00)",
                color: "white",
                boxShadow: "0 6px 0 #000, 0 0 25px rgba(255,45,120,0.5)",
              }}
            >
              โอเค ไปต่อ 🚀
            </button>
          </div>

          <p className="text-xs opacity-40" style={{ color: "#ffffff" }}>
            (ไม่บอกก็ไม่ให้เข้านะ 😤)
          </p>
        </div>

      ) : (
        /* ── SCREEN 2: Birthday main screen ── */
        <div className="relative flex flex-col items-center gap-6 text-center" style={{ zIndex: 5 }}>

          <div className="text-8xl" style={{ animation: "bounce2 1s ease-in-out infinite" }}>🎂</div>

          <div
            onClick={handleTitleClick}
            className="cursor-pointer select-none"
            style={{ animation: shake ? "shake 0.5s ease-in-out" : "none" }}
          >
            <h1 className="font-black leading-tight" style={{ fontSize: "clamp(2rem, 8vw, 3.5rem)", color: "#ffe600", textShadow: "4px 4px 0px #ff2d78, 8px 8px 0px rgba(0,0,0,0.3)", letterSpacing: "-0.02em" }}>
              ยินดีด้วย {name}...
            </h1>
            <h1 className="font-black leading-tight" style={{ fontSize: "clamp(2.2rem, 9vw, 3.8rem)", color: "#ff2d78", textShadow: "4px 4px 0px #ffe600, 8px 8px 0px rgba(0,0,0,0.3)", letterSpacing: "-0.02em" }}>
              ยังรอดมาอีกปี 😭
            </h1>
          </div>

          <p className="font-bold text-lg max-w-xs" style={{ color: "#00cfff", textShadow: "0 0 10px #00cfff" }}>
            ภารกิจหลักวันนี้: ฉลองให้สุด 🎉<br />
            <span className="text-base font-semibold" style={{ color: "#39ff14" }}>{subtitle}</span>
          </p>

          <button
            onClick={handleClick}
            disabled={clicked}
            className="btn-chaos relative font-black rounded-2xl px-8 py-5 text-xl border-4 border-black"
            style={{
              background: clicked ? "#666" : "linear-gradient(135deg, #ff2d78, #ff6b00)",
              color: "white",
              boxShadow: clicked ? "none" : "0 8px 0 #000, 0 0 30px rgba(255,45,120,0.6)",
              transform: clicked ? "translateY(4px)" : "translateY(0)",
              transition: "all 0.2s",
              minWidth: "260px",
            }}
          >
            {clicked ? "⏳ กำลังเปิดของขวัญ..." : `ไปเปิดของขวัญของ${name} 🎁`}
          </button>

          <button
            onClick={() => { setNameSubmitted(false); setNameInput(name); setInputError(""); }}
            className="text-xs underline"
            style={{ color: "#ffffff", opacity: 0.35 }}
          >
            ไม่ใช่ {name}? เปลี่ยนชื่อ
          </button>

          <p className="text-xs opacity-40 mt-1" style={{ color: "#ffe600" }}>
            แตะที่ชื่อเพื่อดูข้อความลับ 👆
          </p>
        </div>
      )}

      {/* Bottom marquee */}
      <div className="absolute bottom-0 w-full overflow-hidden py-2" style={{ background: "#ffe600", zIndex: 10 }}>
        <div className="flex" style={{ animation: "marqueeLoop 25s linear infinite reverse", width: "max-content" }}>
          <span className="text-black font-black text-sm whitespace-nowrap">{bottomMarqueeText}</span>
          <span className="text-black font-black text-sm whitespace-nowrap">{bottomMarqueeText}</span>
        </div>
      </div>
    </div>
  );
}