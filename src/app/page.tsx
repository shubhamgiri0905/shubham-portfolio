"use client";

import { useEffect, useState } from "react";
import type { GitHubRepo } from "@/types/github";

export default function Home() {
  const [repos, setRepos] = useState<GitHubRepo[]>([]);
  const [loadingRepos, setLoadingRepos] = useState(true);

  useEffect(() => {
    // Log visit
    fetch("/api/visit", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ path: window.location.pathname }),
    }).catch(() => {});
  }, []);

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
    <main className="min-h-screen bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950 text-slate-100 px-6 py-20 space-y-20">
      <section className="max-w-5xl mx-auto space-y-6">
        <h1 className="text-5xl font-bold">
          Hi, I’m <span className="text-sky-400">Shubham Giri</span>
        </h1>

        <p className="text-lg text-slate-300 max-w-2xl">
          I build applied Machine Learning systems, scalable backend tools, and
          human-centered products like{" "}
          <span className="text-sky-300 font-medium">PeriodsBoon</span>. I love
          converting ideas into clean, functional digital experiences.
        </p>

        <div className="flex gap-4 pt-4">
          <a
            href="mailto:shubhamgiri0905@gmail.com"
            className="px-6 py-3 bg-sky-500 text-black font-medium rounded-xl hover:bg-sky-400 transition"
          >
            Contact Me
          </a>

          <a
            href="https://github.com/shubhamgiri0905"
            target="_blank"
            className="px-6 py-3 border border-sky-600 rounded-xl hover:bg-sky-600/20 transition"
          >
            GitHub ↗
          </a>
        </div>
      </section>

      {/* -------------------------------------------------- */}
      {/* PROJECTS SECTION */}
      {/* -------------------------------------------------- */}
      <section className="max-w-5xl mx-auto">
        <h2 className="text-3xl font-bold">Projects</h2>
        <p className="text-slate-400 mt-1">
          Automatically fetched from my GitHub profile 🚀
        </p>

        {loadingRepos ? (
          <p className="text-slate-300 mt-4">Loading projects...</p>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mt-8">
            {repos.map((repo) => (
              <div
                key={repo.name}
                className="border border-slate-800 bg-slate-900 p-5 rounded-xl hover:border-sky-500/60 hover:-translate-y-1 transition"
              >
                <h3 className="text-xl font-semibold text-sky-300">
                  {repo.name}
                </h3>

                <p className="text-sm text-slate-400 mt-2">
                  {repo.description || "No description available."}
                </p>

                <p className="text-xs text-slate-500 mt-2">
                  {repo.language ? `Language: ${repo.language}` : ""}
                </p>

                <a
                  href={repo.html_url}
                  target="_blank"
                  className="inline-block mt-4 text-sky-400 hover:underline text-sm"
                >
                  GitHub ↗
                </a>
              </div>
            ))}
          </div>
        )}
      </section>
      {/* -------------------------------------------------- */}
      {/* CONTACT SECTION */}
      {/* -------------------------------------------------- */}

      <section className="max-w-5xl mx-auto space-y-6 pb-24">
        <h2 className="text-3xl font-bold">Contact Me</h2>
        <p className="text-slate-400">
          Have an opportunity, idea, or collaboration? Message me below.
        </p>

        <form
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
            } catch (error) {
              alert("Failed to send message.");
            }
          }}
          className="space-y-4 bg-slate-900 p-6 rounded-xl border border-slate-800"
        >
          <div className="grid md:grid-cols-2 gap-4">
            <input
              name="name"
              placeholder="Your Name"
              className="p-3 bg-slate-800 rounded-md border border-slate-700 focus:border-sky-500 outline-none"
              required
            />
            <input
              type="email"
              name="email"
              placeholder="Your Email"
              className="p-3 bg-slate-800 rounded-md border border-slate-700 focus:border-sky-500 outline-none"
              required
            />
          </div>

          <textarea
            name="message"
            rows={4}
            placeholder="Your message..."
            className="p-3 bg-slate-800 rounded-md border border-slate-700 w-full focus:border-sky-500 outline-none"
            required
          />

          <button
            type="submit"
            className="px-6 py-3 bg-sky-500 text-black font-medium rounded-xl hover:bg-sky-400 transition"
          >
            Send Message
          </button>
        </form>
      </section>
    </main>
  );
}
