// ============================================================
//  🎂 CUSTOM WISHES CONFIG
//  Add a person's name + their custom wish lines here.
//  The name matching is case-insensitive and trims spaces.
//
//  HOW TO ADD A NEW PERSON:
//  1. Copy one of the blocks below
//  2. Change the `name` to match what they type on the home page
//  3. Edit `heading`, `lines`, and `closing` to their custom message
//  4. Save — done!
// ============================================================

export interface CustomWish {
  name: string;        // must match what they type (case-insensitive)
  heading: string;     // big title shown above the card
  lines: string[];     // message lines inside the card (use "" for blank line)
  closing: string;     // small text at the bottom of the card
}

export const customWishes: CustomWish[] = [
  // ── Example: เนม ──────────────────────────────────────────
  {
    name: "เนม",
    heading: "อีกหนึ่งปีของเนม 🎉",
    lines: [
      "เนมเป็นคนที่ทำให้ทุกอย่างรอบข้าง",
      "ดีขึ้นแค่เพราะมีแกอยู่ด้วย",
      "",
      "ปีนี้ขอให้เนมได้อะไรที่รอมานาน",
      "ไม่ว่าจะเป็นเงิน ความรัก หรือนอนหลับเต็มอิ่มสักที",
      "",
      "แกเก่งมากแล้วจริง ๆ อย่าลืมภูมิใจในตัวเองด้วยนะ",
    ],
    closing: "รักเนมมากเลยนะ เพื่อนสุดที่รัก 🫶🔥",
  },

  // ── Add more people below this line ───────────────────────
  // {
  //   name: "ชื่อเพื่อน",
  //   heading: "หัวข้อพิเศษ 🎉",
  //   lines: [
  //     "บรรทัดแรก",
  //     "บรรทัดสอง",
  //     "",           // ← บรรทัดว่าง
  //     "บรรทัดสาม",
  //   ],
  //   closing: "ข้อความปิดท้าย 🫶",
  // },
];

// ── Default wish (shown when name doesn't match anyone above) ──
export const defaultWish = {
  heading: (name: string) => name ? `อีกหนึ่งปีของ${name}` : "สุขสันต์วันเกิดนะ :)",
  lines: [
    "ปีที่ผ่านมาอาจไม่ง่ายเท่าไหร่",
    "มีทั้งวันที่เหนื่อย และไม่เข้าใจตัวเอง",
    "แต่เธอก็ยังผ่านมาได้จนถึงตอนนี้",
    "",
    "แค่นี้ก็เก่งมากแล้วจริง ๆ",
    "ไม่ต้องรีบดีขึ้น ไม่ต้องแข่งกับใคร",
    "ค่อย ๆ ใช้ชีวิตในแบบของตัวเองก็พอ",
    "",
    "ขอให้ปีนี้ใจเบาลงทีละนิด",
    "และมีเรื่องดี ๆ เข้ามาแบบไม่ต้องพยายาม",
  ],
  closing: (name: string) => name ? `ขอบคุณ${name}ที่ยังอยู่ตรงนี้นะ 🫶` : "ขอบคุณที่ยังอยู่ตรงนี้นะ 🫶",
};