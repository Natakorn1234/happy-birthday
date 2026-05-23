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
    heading: "หิวข้าวครับ",
    lines: [
      "0649243841 พร้อมเพย์"
    ],
    closing: "ยุ่ง",
  },
  
  {
    name: "อิน",
    heading: "แฮปปี้พี่อิน 🎂",
    lines: [
      "สุขสันต์ 5 ปีที่รุ้จักกัน(5 ปีไหม)",
      "",
      "ไม่รู้จะอวยพรไร",
      "ให้ ChatGPT ช่วยส่วนหนึ่ง",
      "",
      "ขอให้ใช้ชีวิตแบบไม่เหนื่อย",
      "มีความสุขกับสิ่งที่ทำ เจอแต่เรื่องดี ๆ",
      "แล้วก็ขอให้คนรอบตัวรักเยอะ ๆ",
      "",
      "เหนื่อยก็พักบ้าง",
      "ไม่ต้องเก่งตลอดก็ได้",
      "",
      "ขอให้ได้มหาลัยที่ใช่"
    ],
    closing: "ขอบคุณมิตรภาพตลอด 5 ปี🤍",
  },

    {
    name: "อิม",
    heading: "สุขสันต์วันเกิดพี่อิม 🎂",
    lines: [
      "ปีนี้ม.6 ละ น่าจะมีเรื่องให้คิดเยอะขึ้น ทั้งเรื่องเรียน เรื่องมหาลัย แล้วก็เรื่องอนาคตต่าง ๆ",
      "ขอให้ผ่านทุกอย่างไปได้แบบไม่เหนื่อยเกินไปนะ",
      "",
      "ขอบคุณมิตรภาพ BS PHOTO",
      "ขอให้เป็นผุ้นำที่ดีจนงานสุดท้าย",
      "",
      "ขอให้ได้มหาลัยที่ใช่"
    ],
    closing: "ขอบคุณที่อ่านจนจบ",
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