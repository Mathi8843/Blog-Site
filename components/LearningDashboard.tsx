import { StatCard } from "@/components/StatCard";
import { GithubContributionGraph } from "@/components/GithubContributionGraph";
import { site } from "@/lib/site";
import type { GithubCommitStats } from "@/lib/github";

type Props = {
  daysLogged: number;
  projectsBuilt: number;
  githubCommits: GithubCommitStats;
  githubUsername: string;
};

export function LearningDashboard({ daysLogged, projectsBuilt, githubCommits, githubUsername }: Props) {
  const commitHint =
    githubCommits.source === "api" ? site.dashboard.githubCommitsSourceNote : "Manual fallback — set GITHUB_TOKEN at build for live count";

  return (
    <section className="rounded-xl border border-zinc-800 bg-zinc-900/20 p-5 sm:p-6">
      <div className="flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <h2 className="font-mono text-xs font-medium uppercase tracking-widest text-emerald-500/90">Learning dashboard</h2>
          <p className="mt-2 max-w-xl text-sm text-zinc-500">
            Momentum at a glance — accountability for shipping every day, not just writing about it.
          </p>
        </div>
      </div>

      <div className="mt-6 grid grid-cols-2 gap-3 lg:grid-cols-5">
        <StatCard label="Days logged" value={daysLogged} />
        <StatCard label="Projects built" value={projectsBuilt} />
        <StatCard label="GitHub commits" value={githubCommits.totalCommits} hint={commitHint} />
        <StatCard label="Freelance attempts" value={site.dashboard.freelanceAttempts} />
        <StatCard label="Revenue" value={site.dashboard.revenue} hint="Track what you earned — even small wins count" />
      </div>

      <div className="mt-8 border-t border-zinc-800/80 pt-8">
        <h3 className="font-mono text-xs uppercase tracking-widest text-zinc-500">GitHub activity</h3>
        <p className="mt-2 text-sm text-zinc-500">Consistency beats intensity — public coding rhythm over time.</p>
        <div className="mt-4 max-w-3xl">
          <GithubContributionGraph username={githubUsername} />
        </div>
      </div>
    </section>
  );
}
