export const site = {
  title: "My AI Automation Learning Journey",
  intro:
    "A public log of what I learn and build every day—AI automation, freelancing, and development. One entry per day, focused on clarity and momentum.",
  githubProfile: "https://github.com/mathi8843",
  /** Login slug for GitHub API + contribution chart (no @). Falls back to parsing githubProfile. */
  githubUsername: "mathi8843",
  /** Set to a number to override auto-count from markdown `github` fields */
  githubRepoCountOverride: null as number | null,
  /**
   * Manual dashboard fallbacks when env/API is unavailable.
   * GitHub commits: set `githubCommits` here; build-time fetch overrides when GITHUB_TOKEN is set.
   */
  dashboard: {
    /** Shown when GitHub GraphQL fetch fails or token is missing */
    githubCommitsFallback: 132,
    freelanceAttempts: 3,
    /** Display as-is, e.g. "$40" or "$1.2k" */
    revenue: "$40",
    /** Shown under commit count when value comes from API (rolling window) */
    githubCommitsSourceNote: "Last ~12 months (GitHub)",
  },
  /**
   * Contribution heatmap image (third-party SVG). {color} optional hex without # for ghchart.rshah.org.
   * @see https://github.com/2016rshah/github-chart-api
   */
  contributionChart: {
    enabled: true,
    /** Template: use {username} */
    imageUrlTemplate: "https://ghchart.rshah.org/22c55e/{username}",
  },
};
