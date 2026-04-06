import Link from "next/link";
import { getAllLogs } from "@/lib/content";

export default function LearningLogsPage() {
  const logs = getAllLogs();

  return (
    <div>
      <h1 className="font-mono text-2xl font-semibold text-zinc-50">Learning logs</h1>
      <p className="mt-3 text-sm text-zinc-500">Daily entries, newest day number last (sorted by day).</p>
      <ul className="mt-10 space-y-0 divide-y divide-zinc-800/80 rounded-lg border border-zinc-800/80">
        {logs.map(({ slug, frontmatter: fm }) => (
          <li key={slug}>
            <Link
              href={`/learning-logs/${slug}`}
              className="block px-4 py-4 font-mono text-sm text-zinc-300 transition-colors hover:bg-zinc-900/50 hover:text-zinc-100"
            >
              Day {fm.day} – {fm.title}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
