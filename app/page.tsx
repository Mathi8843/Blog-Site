import Link from "next/link";
import { LearningDashboard } from "@/components/LearningDashboard";
import { collectUniqueGithubRepos, getAllLogs, getAllProjects } from "@/lib/content";
import { fetchGithubCommitContributions, getGithubLoginForChart } from "@/lib/github";
import { site } from "@/lib/site";

export default async function HomePage() {
  const logs = getAllLogs();
  const projects = getAllProjects();
  const githubCommits = await fetchGithubCommitContributions();
  const latest = [...logs].reverse().slice(0, 5);
  const githubUsername = getGithubLoginForChart();

  return (
    <div>
      <LearningDashboard
        daysLogged={logs.length}
        projectsBuilt={projects.length}
        githubCommits={githubCommits}
        githubUsername={githubUsername}
      />

      <h1 className="mt-14 font-mono text-2xl font-semibold tracking-tight text-zinc-50 sm:text-3xl">{site.title}</h1>
      <p className="mt-6 max-w-2xl leading-relaxed text-zinc-400">{site.intro}</p>

      <section className="mt-10 rounded-lg border border-zinc-800/80 bg-zinc-900/20 px-4 py-4 font-mono text-xs text-zinc-500">
        <span className="text-zinc-400">Repos linked in content:</span>{" "}
        {site.githubRepoCountOverride ?? collectUniqueGithubRepos(logs, projects)}
        <span className="mx-2 text-zinc-700">·</span>
        <Link href="/search" className="text-sky-400 hover:text-sky-300">
          Search all logs →
        </Link>
      </section>

      <section className="mt-14">
        <div className="mb-4 flex items-baseline justify-between gap-4">
          <h2 className="font-mono text-xs uppercase tracking-widest text-zinc-500">Latest learning logs</h2>
          <Link href="/learning-logs" className="font-mono text-xs text-sky-400 hover:text-sky-300">
            View all →
          </Link>
        </div>
        <ul className="divide-y divide-zinc-800/80 rounded-lg border border-zinc-800/80 bg-zinc-900/30">
          {latest.map(({ slug, frontmatter: fm }) => (
            <li key={slug}>
              <Link
                href={`/learning-logs/${slug}`}
                className="flex flex-col gap-1 px-4 py-4 transition-colors hover:bg-zinc-800/40 sm:flex-row sm:items-center sm:justify-between"
              >
                <span className="font-mono text-sm text-zinc-200">
                  Day {fm.day} – {fm.title}
                </span>
                <span className="font-mono text-xs text-zinc-500">{fm.date}</span>
              </Link>
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
}
