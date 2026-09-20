"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function SiteShell({ children }: { children: React.ReactNode }) {
  const [theme, setTheme] = useState<"light" | "dark">("light");
  const [showScrollTop, setShowScrollTop] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const onScroll = () => setShowScrollTop(window.scrollY > 300);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const toggleTheme = () => {
    const next = theme === "light" ? "dark" : "light";
    setTheme(next);
    document.documentElement.setAttribute("data-theme", next);
  };

  const activeStyle = (path?: string): React.CSSProperties => ({
    background: pathname === path ? "var(--c-accent)" : undefined,
    color: pathname === path ? "#fff" : undefined,
  });

  return (
    <div style={{ maxWidth: "1200px", margin: "0 auto", padding: "clamp(1rem, 4vw, 2rem)" }}>
      <header style={{ marginBottom: "clamp(1.5rem, 5vw, 3rem)", display: "flex", flexWrap: "wrap", justifyContent: "space-between", alignItems: "center", gap: "2rem" }}>
        <div>
          <h1 style={{ fontSize: "clamp(2rem, 6vw, 3rem)", textShadow: "clamp(2px, 0.7vw, 4px) clamp(2px, 0.7vw, 4px) 0px var(--c-accent)" }}>
            VL MURIMI
          </h1>
        </div>

        <nav style={{ display: "flex", gap: "10px", alignItems: "center", flexWrap: "wrap" }}>
          <Link href="/" className="comic-btn" style={{ fontSize: "clamp(0.8rem, 2.5vw, 1rem)", padding: "clamp(6px, 1.5vw, 10px)", ...activeStyle("/") }}>
            HQ
          </Link>
          <Link href="/skills" className="comic-btn" style={{ fontSize: "clamp(0.8rem, 2.5vw, 1rem)", padding: "clamp(6px, 1.5vw, 10px)", ...activeStyle("/skills") }}>
            POWERS
          </Link>
          <Link href="/timeline" className="comic-btn" style={{ fontSize: "clamp(0.8rem, 2.5vw, 1rem)", padding: "clamp(6px, 1.5vw, 10px)", ...activeStyle("/timeline") }}>
            SAGA
          </Link>
          <Link href="/blog" className="comic-btn" style={{ fontSize: "clamp(0.8rem, 2.5vw, 1rem)", padding: "clamp(6px, 1.5vw, 10px)", ...activeStyle("/blog") }}>
            INTEL
          </Link>
          <button onClick={toggleTheme} className="comic-btn" style={{ fontSize: "clamp(0.8rem, 2.5vw, 1rem)", padding: "clamp(6px, 1.5vw, 10px)" }}>
            {theme === "light" ? "DARK" : "LIGHT"}
          </button>
        </nav>
      </header>

      {children}

      <footer style={{ marginTop: "5rem", padding: "2rem", borderTop: "var(--border-thick)", textAlign: "center" }}>
        <p>&copy; 2026 VICTOR LEWIS MURIMI - ALL RIGHTS RESERVED.</p>
      </footer>

      {showScrollTop && (
        <button
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          className="comic-btn"
          style={{
            position: "fixed",
            bottom: "2rem",
            right: "2rem",
            zIndex: 1000,
            fontSize: "1.5rem",
            padding: "10px 16px",
            lineHeight: "1",
          }}
          aria-label="Scroll to top"
        >
          &uarr;
        </button>
      )}
    </div>
  );
}