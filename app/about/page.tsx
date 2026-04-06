import { site } from "@/lib/site";

export default function AboutPage() {
  return (
    <div>
      <h1 className="font-mono text-2xl font-semibold text-zinc-50">About</h1>
      <div className="mt-8 space-y-4 leading-relaxed text-zinc-400">
        <p>
          This site is a <strong className="font-medium text-zinc-300">public learning journal</strong> for documenting
          daily progress in AI automation, freelancing, and software development.
        </p>
        <p>Each log entry is a Markdown file under <code className="text-emerald-300">content/logs/</code>. Projects are listed from <code className="text-emerald-300">content/projects/</code>.</p>
        <p className="text-sm text-zinc-500">{site.title}</p>
      </div>
    </div>
  );
}
