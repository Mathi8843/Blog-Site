import Link from "next/link";
import { notFound } from "next/navigation";
import { LogContent } from "@/components/LogContent";
import { LogGallery } from "@/components/LogGallery";
import { getAllLogs, getLogBySlug, getLogSlugs } from "@/lib/content";

type Props = { params: Promise<{ slug: string }> };

export async function generateStaticParams() {
  return getLogSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: Props) {
  const { slug } = await params;
  try {
    const { frontmatter: fm } = getLogBySlug(slug);
    return { title: `Day ${fm.day} – ${fm.title}` };
  } catch {
    return { title: "Log not found" };
  }
}

export default async function LogDayPage({ params }: Props) {
  const { slug } = await params;
  let log;
  try {
    log = getLogBySlug(slug);
  } catch {
    notFound();
  }
  const { frontmatter: fm, body } = log;
  const logs = getAllLogs();
  const idx = logs.findIndex((l) => l.slug === slug);
  const prev = idx > 0 ? logs[idx - 1] : null;
  const next = idx >= 0 && idx < logs.length - 1 ? logs[idx + 1] : null;

  return (
    <div>
      <Link href="/learning-logs" className="font-mono text-xs text-zinc-500 hover:text-zinc-300">
        ← All logs
      </Link>
      <header className="mt-6 border-b border-zinc-800 pb-8">
        <p className="font-mono text-xs uppercase tracking-widest text-zinc-500">Day {fm.day}</p>
        <h1 className="mt-2 font-mono text-xl font-semibold text-zinc-50 sm:text-2xl">{fm.title}</h1>
        <time dateTime={fm.date} className="mt-3 block font-mono text-sm text-zinc-500">
          {fm.date}
        </time>
      </header>
      <LogGallery images={fm.gallery ?? []} />
      <LogContent fm={fm} body={body} />
      <nav className="mt-4 flex flex-wrap justify-between gap-4 border-t border-zinc-800 pt-8 font-mono text-xs">
        {prev ? (
          <Link href={`/learning-logs/${prev.slug}`} className="text-sky-400 hover:text-sky-300">
            ← Day {prev.frontmatter.day}
          </Link>
        ) : (
          <span />
        )}
        {next ? (
          <Link href={`/learning-logs/${next.slug}`} className="text-sky-400 hover:text-sky-300">
            Day {next.frontmatter.day} →
          </Link>
        ) : (
          <span />
        )}
      </nav>
    </div>
  );
}
