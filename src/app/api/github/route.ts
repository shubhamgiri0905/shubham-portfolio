import { NextResponse } from "next/server";
import { GitHubRepo, GitHubAPIResponse } from "@/types/github";

export async function GET() {
  try {
    const res = await fetch(
      "https://api.github.com/users/shubhamgiri0905/repos?sort=updated",
      {
        headers: {
          "User-Agent": "portfolio-app",
        },
        next: { revalidate: 3600 }, // cache for 1 hour
      }
    );

    const data = await res.json();

    const filtered: GitHubRepo[] = (data as GitHubAPIResponse[])
      .filter((repo) => !repo.fork && !repo.private)
      .map((repo) => ({
        name: repo.name,
        description: repo.description,
        html_url: repo.html_url,
        language: repo.language,
        updated_at: repo.updated_at,
      }));

    return NextResponse.json({ repos: filtered });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Failed to fetch repos" },
      { status: 500 }
    );
  }
}
