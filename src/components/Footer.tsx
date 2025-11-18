import { Github, Mail, Linkedin } from "lucide-react";

export default function Footer() {
  return (
    <footer
      className="mt-20 py-8 text-center"
      style={{
        backgroundColor: "var(--background)",
        color: "var(--muted)",
        borderTop: "1px solid var(--card-border)",
      }}
    >
      {/* Year + Name */}
      <p className="text-sm" style={{ color: "var(--muted)" }}>
        © {new Date().getFullYear()} Shubham Giri
      </p>

      {/* Social Icons */}
      <div
        className="flex justify-center gap-8 mt-4"
        style={{ color: "var(--accent)" }}
      >
        <a
          href="mailto:shubhamgiri0905@gmail.com"
          className="transition"
          style={{ color: "var(--muted)" }}
          onMouseEnter={(e) => (e.currentTarget.style.color = "var(--accent)")}
          onMouseLeave={(e) => (e.currentTarget.style.color = "var(--muted)")}
        >
          <Mail size={22} />
        </a>

        <a
          href="https://github.com/shubhamgiri0905"
          target="_blank"
          className="transition"
          style={{ color: "var(--muted)" }}
          onMouseEnter={(e) => (e.currentTarget.style.color = "var(--accent)")}
          onMouseLeave={(e) => (e.currentTarget.style.color = "var(--muted)")}
        >
          <Github size={22} />
        </a>

        <a
          href="https://www.linkedin.com/in/shubham-giri-21b921305/"
          target="_blank"
          className="transition"
          style={{ color: "var(--muted)" }}
          onMouseEnter={(e) => (e.currentTarget.style.color = "var(--accent)")}
          onMouseLeave={(e) => (e.currentTarget.style.color = "var(--muted)")}
        >
          <Linkedin size={22} />
        </a>
      </div>

      {/* Bottom tag */}
      <p
        className="mt-4 text-xs font-medium"
        style={{ color: "var(--accent)" }}
      >
        AI × ML × Engineering
      </p>
    </footer>
  );
}
