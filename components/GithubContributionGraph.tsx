import Link from "next/link";
import { site } from "@/lib/site";

type Props = { username: string };

export function GithubContributionGraph({ username }: Props) {
  if (!site.contributionChart.enabled || username === "yourusername") {
    return (
      <p className="text-sm text-zinc-500">
        Set <code className="text-emerald-300">githubUsername</code> in <code className="text-emerald-300">lib/site.ts</code>{" "}
        to embed your contribution graph.
      </p>
    );
  }

  const src = site.contributionChart.imageUrlTemplate.replace("{username}", encodeURIComponent(username));
  const profile = site.githubProfile;

  return (
    <div className="space-y-3">
      <a href={profile} target="_blank" rel="noopener noreferrer" className="block overflow-hidden rounded-lg border border-zinc-800 bg-zinc-900/50 p-2 transition-colors hover:border-zinc-700">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={src} alt={`GitHub contribution graph for ${username}`} className="h-auto w-full max-h-32 object-cover object-left sm:max-h-40" loading="lazy" />
      </a>
      <p className="font-mono text-[10px] leading-relaxed text-zinc-600">
        Heatmap via{" "}
        <a href="https://github.com/2016rshah/github-chart-api" className="text-zinc-500 hover:text-zinc-400" target="_blank" rel="noopener noreferrer">
          ghchart.rshah.org
        </a>
        .{" "}
        <Link href="/github" className="text-sky-500/80 hover:text-sky-400">
          Profile →
        </Link>
      </p>
    </div>
  );
}
