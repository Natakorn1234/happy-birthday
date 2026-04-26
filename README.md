# 🎂 Birthday Site สุดเฮงซวย

เว็บวันเกิดสุด meme สำหรับเพื่อนสุดที่รัก

## 🚀 Deploy to Vercel (2 minutes)

### Option A: One-click via GitHub
1. Push this folder to a GitHub repo
2. Go to [vercel.com](https://vercel.com) → New Project
3. Import your repo → Deploy
4. Done! 🎉

### Option B: Vercel CLI
```bash
npm i -g vercel
cd birthday-site
npm install
vercel deploy
```

## 🛠 Local Development

```bash
npm install
npm run dev
# Open http://localhost:3000
```

## 📁 Pages

| Page | Route | Description |
|------|-------|-------------|
| Home | `/` | Landing page with big birthday text |
| Gift | `/gift` | Random funny Thai messages |
| Final | `/final` | Confetti + love message |

## ⚙️ Tech Stack

- **Next.js 14** (App Router)
- **TailwindCSS** for styling
- **canvas-confetti** for confetti explosion
- **Framer Motion** (optional, not used to keep bundle small)
- Zero backend, zero database, zero auth
- ⚡ Built with [Claude Code](https://claude.ai/code)

## 🎨 Customization

Edit `src/app/gift/page.tsx` → `MESSAGES` array to add your own funny messages!

Edit `src/app/final/page.tsx` to change the final message.

---

Made with 💀 and ❤️ · Powered by [Claude Code](https://claude.ai/code) 🤖