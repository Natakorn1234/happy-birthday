import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "🎂 สุขสันต์วันเกิดนะ!",
  description: "เว็บเล็ก ๆ ที่ทำมาเพื่ออวยพรวันเกิดเพื่อนคนสำคัญ",
  viewport: "width=device-width, initial-scale=1, maximum-scale=1",
  icons: {
    icon: "/favicon.ico",
  }
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="th">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Kanit:wght@400;700;900&family=Sarabun:wght@400;700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body style={{ fontFamily: "'Kanit', sans-serif" }}>{children}</body>
    </html>
  );
}
