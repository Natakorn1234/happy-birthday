"use client";

import { useState } from "react";
import PageLoader from "./Pageloader";

export default function ClientLoader({ children }: { children: React.ReactNode }) {
  const [loading, setLoading] = useState(true);

  return (
    <>
      {loading && <PageLoader onDone={() => setLoading(false)} />}
      {/* Children are mounted immediately (good for SEO + no layout shift),
          but hidden behind the loader overlay until it exits */}
      <div
        style={{
          opacity: loading ? 0 : 1,
          transition: "opacity 0.4s ease",
          pointerEvents: loading ? "none" : "auto",
        }}
      >
        {children}
      </div>
    </>
  );
}