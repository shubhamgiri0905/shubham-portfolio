"use client";

import { useEffect, useState } from "react";
import { Sun, Moon } from "lucide-react";
import { useTheme } from "next-themes";
import { motion } from "framer-motion";

export default function Navbar() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const [visitors, setVisitors] = useState<number | null>(null);
  const [scrolled, setScrolled] = useState(false);

  // Hydration-safe mount (no ESLint error)
  useEffect(() => {
    const frame = requestAnimationFrame(() => {
      setMounted(true);
    });
    return () => cancelAnimationFrame(frame);
  }, []);

  // Load visitors
  useEffect(() => {
    async function loadVisitors() {
      try {
        const res = await fetch("/api/visitors");
        const data = await res.json();
        setVisitors(data.visitors);
      } catch {}
    }
    loadVisitors();
  }, []);

  // Scroll shrink effect
  useEffect(() => {
    const handler = () => {
      setScrolled(window.scrollY > 12);
    };
    window.addEventListener("scroll", handler);
    return () => window.removeEventListener("scroll", handler);
  }, []);

  return (
    <motion.nav
      initial={{ y: -40, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.45, ease: "easeOut" }}
      className="fixed top-0 left-0 w-full z-50 backdrop-blur-xl"
      style={{
        background:
          "linear-gradient(to bottom, var(--nav-bg), transparent)",
        borderBottom: "1px solid var(--card-border)",
      }}
    >
      <div
        className={`max-w-5xl mx-auto flex items-center justify-between px-6 transition-all ${
          scrolled ? "py-3" : "py-5"
        }`}
      >
        {/* Branding */}
        <motion.a
          href="#home"
          className="text-lg font-semibold tracking-wide"
          whileHover={{ scale: 1.08 }}
          style={{
            color: "var(--accent)",
            textShadow: "0 0 20px var(--glow)",
          }}
        >
          Shubham
        </motion.a>

        {/* Nav Links */}
        <div className="hidden md:flex items-center gap-8 relative">
          <NavLink href="#projects">Projects</NavLink>
          <NavLink href="#timeline">Journey</NavLink>
          <NavLink href="#contact">Contact</NavLink>
        </div>

        {/* Visitors + Theme Toggle */}
        <div className="flex items-center gap-4">
          {visitors !== null && (
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              className="text-xs px-3 py-1 rounded-full"
              style={{
                border: "1px solid var(--card-border)",
                color: "var(--text-muted)",
                backgroundColor: "var(--bg-card)",
              }}
            >
              👁️ {visitors}
            </motion.div>
          )}

          <motion.button
            whileTap={{ scale: 0.85 }}
            className="p-1.5 rounded-full transition btn-ghost"
            style={{ color: "var(--foreground)" }}
            onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
          >
            {!mounted ? (
              <div style={{ width: 20, height: 20 }} />
            ) : theme === "dark" ? (
              <motion.div
                key="sun"
                initial={{ rotate: -90, opacity: 0 }}
                animate={{ rotate: 0, opacity: 1 }}
                transition={{ duration: 0.3 }}
              >
                <Sun size={20} />
              </motion.div>
            ) : (
              <motion.div
                key="moon"
                initial={{ rotate: 90, opacity: 0 }}
                animate={{ rotate: 0, opacity: 1 }}
                transition={{ duration: 0.3 }}
              >
                <Moon size={20} />
              </motion.div>
            )}
          </motion.button>
        </div>
      </div>
    </motion.nav>
  );
}

function NavLink({
  href,
  children,
}: {
  href: string;
  children: React.ReactNode;
}) {
  return (
    <motion.a
      href={href}
      className="relative font-medium text-sm tracking-wide"
      style={{ color: "var(--text-muted)" }}
      whileHover={{ scale: 1.05 }}
    >
      {children}

      <motion.span
        className="absolute left-0 -bottom-1 h-[2px] rounded-full"
        style={{ backgroundColor: "var(--accent)" }}
        initial={{ width: 0 }}
        whileHover={{ width: "100%" }}
        transition={{ duration: 0.25 }}
      />
    </motion.a>
  );
}
