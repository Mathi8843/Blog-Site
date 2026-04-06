import { site } from "@/lib/site";

function getGithubLogin(): string {
  const explicit = site.githubUsername?.trim();
  if (explicit && explicit !== "yourusername") return explicit;
  try {
    const u = new URL(site.githubProfile);
    const parts = u.pathname.split("/").filter(Boolean);
    return parts[0] ?? "yourusername";
  } catch {
    return "yourusername";
  }
}

export type GithubCommitStats = {
  totalCommits: number;
  source: "api" | "fallback";
};

/**
 * Fetches total commit contributions for the configured user via GitHub GraphQL.
 * Requires `GITHUB_TOKEN` (classic PAT or fine-grained with read:user) at build time.
 * Uses a rolling ~12 month window GitHub associates with contribution data.
 */
export async function fetchGithubCommitContributions(): Promise<GithubCommitStats> {
  const login = getGithubLogin();
  const token = process.env.GITHUB_TOKEN?.trim();
  const fallback = site.dashboard.githubCommitsFallback;

  if (!token || login === "yourusername") {
    return { totalCommits: fallback, source: "fallback" };
  }

  const to = new Date();
  const from = new Date();
  from.setUTCFullYear(from.getUTCFullYear() - 1);

  const query = `
    query ($login: String!, $from: DateTime!, $to: DateTime!) {
      user(login: $login) {
        contributionsCollection(from: $from, to: $to) {
          totalCommitContributions
        }
      }
    }
  `;

  try {
    const res = await fetch("https://api.github.com/graphql", {
      method: "POST",
      headers: {
        Authorization: `bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        query,
        variables: {
          login,
          from: from.toISOString(),
          to: to.toISOString(),
        },
      }),
    });

    const json = (await res.json()) as {
      data?: { user?: { contributionsCollection?: { totalCommitContributions?: number } } };
      errors?: { message: string }[];
    };

    if (json.errors?.length) {
      return { totalCommits: fallback, source: "fallback" };
    }

    const n = json.data?.user?.contributionsCollection?.totalCommitContributions;
    if (typeof n !== "number" || Number.isNaN(n)) {
      return { totalCommits: fallback, source: "fallback" };
    }

    return { totalCommits: n, source: "api" };
  } catch {
    return { totalCommits: fallback, source: "fallback" };
  }
}

export function getGithubLoginForChart(): string {
  return getGithubLogin();
}
