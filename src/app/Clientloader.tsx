"use client";

import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import PageLoader from "./Pageloader";

export default function ClientLoader({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  // Only show loader on homepage ("/") and only on the very first visit.
  // sessionStorage resets when the tab closes, so opening fresh always gets it.
  const isHomepage = pathname === "/";
  const alreadySeen =
    typeof window !== "undefined" && !!sessionStorage.getItem("hasLoaded");

  const [loading, setLoading] = useState(isHomepage && !alreadySeen);

  useEffect(() => {
    if (isHomepage && !alreadySeen) {
      sessionStorage.setItem("hasLoaded", "true");
    }
  }, [isHomepage, alreadySeen]);

  const handleDone = () => setLoading(false);

  return (
    <>
      {loading && <PageLoader onDone={handleDone} />}
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