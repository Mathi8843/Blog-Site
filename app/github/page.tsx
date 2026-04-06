import Link from "next/link";
import { site } from "@/lib/site";

export default function GitHubPage() {
  return (
    <div>
      <h1 className="font-mono text-2xl font-semibold text-zinc-50">GitHub</h1>
      <p className="mt-6 leading-relaxed text-zinc-400">
        Code and experiments from this journey live on GitHub. Set <code className="text-emerald-300">githubProfile</code> and{" "}
        <code className="text-emerald-300">githubUsername</code> in{" "}
        <code className="rounded bg-zinc-800 px-1.5 py-0.5 font-mono text-sm text-emerald-300">lib/site.ts</code>. For an
        accurate commit total on the homepage at build time, add <code className="text-emerald-300">GITHUB_TOKEN</code> (see{" "}
        <code className="text-emerald-300">.env.example</code>).
      </p>
      <p className="mt-8">
        <Link
          href={site.githubProfile}
          className="font-mono text-sm text-sky-400 underline decoration-sky-500/40 underline-offset-2 hover:text-sky-300"
          target="_blank"
          rel="noopener noreferrer"
        >
          Open GitHub profile →
        </Link>
      </p>
    </div>
  );
}
