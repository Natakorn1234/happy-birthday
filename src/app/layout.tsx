import type { Metadata, Viewport } from "next";
import "./globals.css";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { Analytics } from "@vercel/analytics/next";
import ClientLoader from "./Clientloader";

export const metadata: Metadata = {
  title: "🎂 สุขสันต์วันเกิด",
  description: "เว็บเล็ก ๆ ที่ทำมาเพื่ออวยพรวันเกิดเพื่อนคนสำคัญ",

  icons: {
    icon: "/favicon.ico",
  },

  openGraph: {
    title: "🎂 สุขสันต์วันเกิด",
    description: "เว็บเล็ก ๆ ที่ทำมาเพื่ออวยพรวันเกิดเพื่อนคนสำคัญ",
    url: "https://happy-birthday-teal-ten.vercel.app/",
    siteName: "Birthday Site",
    images: ["/preview.png"],
    type: "website",
  },

  twitter: {
    card: "summary_large_image",
    title: "🎂 สุขสันต์วันเกิด",
    description: "เว็บเล็ก ๆ ที่ทำมาเพื่ออวยพรวันเกิดเพื่อนคนสำคัญ",
    images: ["/preview.png"],
  },

  metadataBase: new URL("https://happy-birthday-teal-ten.vercel.app/"),
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,

  themeColor: "#a855f7"
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
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Kanit:wght@400;700;900&family=Sarabun:wght@400;700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body style={{ fontFamily: "'Kanit', sans-serif" }}>
        <ClientLoader>{children}</ClientLoader>
        <SpeedInsights />
        <Analytics />
      </body>
    </html>
  );
}