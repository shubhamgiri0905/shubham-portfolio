"use client";

import { useEffect, useState } from "react";
import type { GitHubRepo } from "@/types/github";
import { motion } from "framer-motion";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import TimelineItem from "@/components/TimelineItem";
import { LANGUAGE_META } from "@/utils/languageMeta";

export default function Home() {
  const [repos, setRepos] = useState<GitHubRepo[]>([]);
  const [loadingRepos, setLoadingRepos] = useState(true);

  // Log visit
  useEffect(() => {
    fetch("/api/visit", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ path: window.location.pathname }),
    }).catch(() => {});
  }, []);

  // Load GitHub repos
  useEffect(() => {
    async function load() {
      try {
        const res = await fetch("/api/github");
        const data = await res.json();
        setRepos(data.repos);
      } catch (e) {
        console.error("Failed to load repos", e);
      } finally {
        setLoadingRepos(false);
      }
    }
    load();
  }, []);

  return (
    <>
      <Navbar />

      <main
        className="min-h-screen px-6 pt-28 pb-16"
        style={{
          backgroundColor: "var(--bg)",
          color: "var(--text)",
          transition: "background-color 0.3s ease, color 0.3s ease",
        }}
      >
        <div className="max-w-5xl mx-auto space-y-24">
          {/* -------------------------------------------------- */}
          {/* HERO */}
          {/* -------------------------------------------------- */}
          <section id="home" className="relative">
            {/* Glow behind */}
            <div className="absolute inset-0 -z-10">
              <div
                className="absolute left-1/2 top-0 -translate-x-1/2 w-80 h-80 blur-[130px] rounded-full"
                style={{ backgroundColor: "var(--glow)" }}
              />
            </div>

            <motion.div
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7 }}
              className="space-y-6"
            >
              <span
                className="inline-flex items-center gap-2 rounded-full px-4 py-1 text-xs"
                style={{
                  backgroundColor: "var(--accent-soft)",
                  color: "var(--accent)",
                  border: "1px solid var(--border)",
                }}
              >
                <span
                  className="w-1.5 h-1.5 rounded-full"
                  style={{ backgroundColor: "var(--accent)" }}
                />
                Artificial Intelligence • Machine Learning • Full-stack •
                Product Thinking
              </span>

              <h1 className="text-4xl sm:text-5xl font-semibold leading-tight">
                Building thoughtful{" "}
                <span style={{ color: "var(--accent)" }}>ML-driven</span>{" "}
                products & tools.
              </h1>

              <p
                className="max-w-2xl text-base sm:text-lg"
                style={{ color: "var(--text-muted)" }}
              >
                I’m <span className="font-medium">Shubham Giri</span>, focused
                on applied Machine Learning, clean backend systems, and
                human-centered products like{" "}
                <span style={{ color: "var(--accent)" }}>
                  <a href="https://periods-boon.vercel.app/">
                    PeriodsBoon
                  </a>
                </span>{" "}
                and{" "}
                <span style={{ color: "var(--accent)" }}>
                  <a href="https://github.com/shubhamgiri0905/brain_tumor_baseline">
                    Continual Learning Based Model for Brain Tumor detection{" "}
                  </a>
                </span>
                . I care about clarity, usefulness, and real-world impact.
              </p>

              <div className="flex flex-wrap gap-4 pt-2">
                <a
                  href="mailto:shubhamgiri0905@gmail.com"
                  className="btn btn-primary"
                  style={{
                    backgroundColor: "var(--accent)",
                    color: "#ffffff",
                    boxShadow: "0 10px 40px rgba(124, 58, 237, 0.35)",
                  }}
                >
                  Contact me
                </a>

                <a
                  href="https://github.com/shubhamgiri0905"
                  target="_blank"
                  className="btn btn-outline"
                  style={{
                    borderColor: "var(--border)",
                    color: "var(--text-muted)",
                  }}
                >
                  GitHub profile ↗
                </a>
              </div>
            </motion.div>
          </section>

          {/* -------------------------------------------------- */}
          {/* PROJECTS SECTION */}
          {/* -------------------------------------------------- */}

          <section id="projects" className="space-y-4">
            <div>
              <h2 className="text-2xl sm:text-3xl font-semibold">Projects</h2>
              <p
                className="text-sm sm:text-base"
                style={{ color: "var(--text-muted)" }}
              >
                A live view of what I’ve been building, directly from GitHub.
              </p>
            </div>

            {loadingRepos ? (
              <p style={{ color: "var(--text-muted)" }}>Loading projects...</p>
            ) : (
              <div className="grid md:grid-cols-2 gap-5 mt-2">
                {repos.map((repo, index) => {
                  const lang = repo.language || "default";
                  const meta = LANGUAGE_META[lang] || LANGUAGE_META.default;
                  const Icon = meta.icon;

                  return (
                    <motion.article
                      key={repo.name}
                      initial={{ opacity: 0, y: 14 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.3, delay: index * 0.05 }}
                      whileHover={{
                        y: -6,
                        scale: 1.015,
                        backgroundColor: "var(--bg-card-hover)",
                        borderColor: "var(--accent)",
                        boxShadow: "0 22px 55px rgba(124, 58, 237, 0.25)",
                      }}
                      className="rounded-2xl p-5 flex flex-col justify-between transition-all"
                      style={{
                        backgroundColor: "var(--bg-card)",
                        border: "1px solid var(--card-border)",
                        boxShadow: "0 18px 45px rgba(15, 23, 42, 0.20)",
                      }}
                    >
                      {/* Repo name + description */}
                      <div className="space-y-2">
                        <h3
                          className="text-lg font-semibold tracking-wide"
                          style={{ color: "var(--text)" }}
                        >
                          {repo.name}
                        </h3>

                        <p
                          className="text-sm line-clamp-3"
                          style={{ color: "var(--text-muted)" }}
                        >
                          {repo.description || "No description provided yet."}
                        </p>
                      </div>

                      {/* Language + GitHub link */}
                      <div className="flex items-center justify-between mt-4 text-xs">
                        <span
                          className="flex items-center gap-2 font-medium"
                          style={{ color: meta.color }}
                        >
                          {Icon && <Icon size={18} />}
                          {lang}
                        </span>

                        <a
                          href={repo.html_url}
                          target="_blank"
                          className="font-medium hover:underline"
                          style={{ color: "var(--accent)" }}
                        >
                          View on Github↗
                        </a>
                      </div>
                    </motion.article>
                  );
                })}
              </div>
            )}
          </section>

          {/* -------------------------------------------------- */}
          {/* FLOWING ANIMATED TIMELINE */}
          {/* -------------------------------------------------- */}

          <section id="timeline" className="max-w-5xl mx-auto space-y-10 pt-10">
            <h2 className="text-3xl font-bold">My Journey</h2>

            <div className="relative">
              {/* Animated flowing vertical line */}
              <svg
                width="4"
                height="100%"
                viewBox="0 0 4 100%"
                className="absolute left-7 top-0 h-full"
                style={{ overflow: "visible" }}
              >
                <motion.line
                  x1="2"
                  y1="0"
                  x2="2"
                  y2="100%"
                  stroke="var(--timeline-line)"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                  strokeDasharray="8 10"
                  animate={{
                    strokeDashoffset: [20, 0],
                  }}
                  transition={{
                    duration: 3,
                    ease: "linear",
                    repeat: Infinity,
                  }}
                />
              </svg>

              {/* Timeline items container */}
              <div className="space-y-16 mt-2">
                {/* -------------------- ITEM 1 -------------------- */}
                <TimelineItem
                  icon="👨‍💻"
                  title="Trackify Solutions Pvt Ltd "
                  text="2024 – Present  • Improved dashboards and Android Apps, optimized parent-facing tools, and enhanced user flows as Software Developer."
                />
                {/* -------------------- ITEM 2 -------------------- */}
                <TimelineItem
                  icon="🎓"
                  title="MSc IT — Deep ML Focus"
                  text="2024 – Present  • Diving into ML, DL, SVMs, PCA, Regression, GA & more."
                />

                {/* -------------------- ITEM 3 -------------------- */}
                <TimelineItem
                  icon="🚀"
                  title="AI & ML Experiments"
                  text="Developed ML pipelines, clustering systems, interpretability projects & medical ML."
                />
              </div>
            </div>
          </section>

          {/* -------------------------------------------------- */}
          {/* CONTACT SECTION */}
          {/* -------------------------------------------------- */}

          <section id="contact" className="max-w-5xl mx-auto space-y-6 pb-24">
            <div className="space-y-2">
              <h2 className="text-3xl font-bold">Contact Me</h2>
              <p style={{ color: "var(--muted)" }}>
                Whether it is an opportunity, collaboration, or something you
                are curious about, I’d love to hear from you.
              </p>
            </div>

            <motion.form
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              onSubmit={async (e) => {
                e.preventDefault();

                const form = e.currentTarget;
                const formData = new FormData(form);

                const name = formData.get("name") as string;
                const email = formData.get("email") as string;
                const message = formData.get("message") as string;

                try {
                  const res = await fetch("/api/contact", {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({ name, email, message }),
                  });

                  const data = await res.json();

                  if (data.ok) {
                    alert("Message sent successfully!");
                    form.reset();
                  } else {
                    alert(data.error || "Something went wrong");
                  }
                } catch {
                  alert("Failed to send message.");
                }
              }}
              className="rounded-2xl p-6 space-y-5"
              style={{
                backgroundColor: "var(--card-bg)",
                border: "1px solid var(--card-border)",
                boxShadow: "0 18px 45px rgba(0, 0, 0, 0.3)",
              }}
            >
              <div className="grid md:grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label
                    className="text-sm font-medium"
                    style={{ color: "var(--text-muted)" }}
                  >
                    Name
                  </label>
                  <input
                    name="name"
                    className="input"
                    placeholder="Your Name"
                    required
                  />
                </div>

                <div className="space-y-1">
                  <label
                    className="text-sm font-medium"
                    style={{ color: "var(--text-muted)" }}
                  >
                    Email
                  </label>
                  <input
                    type="email"
                    name="email"
                    className="input"
                    placeholder="you@example.com"
                    required
                  />
                </div>
              </div>

              <div className="space-y-1">
                <label
                  className="text-sm font-medium"
                  style={{ color: "var(--text-muted)" }}
                >
                  Message
                </label>
                <textarea
                  name="message"
                  rows={4}
                  className="input"
                  placeholder="Write your message..."
                  required
                ></textarea>
              </div>

              <div className="pt-1">
                <button type="submit" className="btn btn-primary">
                  Send Message
                </button>
              </div>
            </motion.form>
          </section>

          <Footer />
        </div>
      </main>
    </>
  );
}
