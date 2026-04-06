"use client";

import type { LogFrontmatter } from "@/lib/content";
import { Markdown } from "@/components/Markdown";

type Props = { fm: LogFrontmatter; body: string };

export function LogContent({ fm, body }: Props) {
  return (
    <article>
      <section className="border-b border-zinc-800/80 py-8">
        <h2 className="mb-4 font-mono text-xs font-medium uppercase tracking-widest text-zinc-500">What I Learned</h2>
        <Markdown>{fm.whatLearned}</Markdown>
      </section>
      <section className="border-b border-zinc-800/80 py-8">
        <h2 className="mb-4 font-mono text-xs font-medium uppercase tracking-widest text-zinc-500">What I Built</h2>
        <Markdown>{fm.whatBuilt}</Markdown>
      </section>
      <section className="border-b border-zinc-800/80 py-8">
        <h2 className="mb-4 font-mono text-xs font-medium uppercase tracking-widest text-zinc-500">Problems I Faced</h2>
        <Markdown>{fm.problems}</Markdown>
      </section>
      <section className="border-b border-zinc-800/80 py-8">
        <h2 className="mb-4 font-mono text-xs font-medium uppercase tracking-widest text-zinc-500">Solution / Fix</h2>
        <Markdown>{fm.solution}</Markdown>
      </section>
      <section className="border-b border-zinc-800/80 py-8">
        <h2 className="mb-4 font-mono text-xs font-medium uppercase tracking-widest text-zinc-500">GitHub Repository</h2>
        {fm.github?.trim() ? (
          <a
            href={fm.github}
            className="font-mono text-sm text-sky-400 underline decoration-sky-500/40 underline-offset-2 hover:text-sky-300"
            target="_blank"
            rel="noopener noreferrer"
          >
            {fm.github}
          </a>
        ) : (
          <p className="text-zinc-500">—</p>
        )}
      </section>
      <section className="py-8">
        <h2 className="mb-4 font-mono text-xs font-medium uppercase tracking-widest text-zinc-500">Tomorrow Plan</h2>
        <Markdown>{fm.tomorrowPlan}</Markdown>
      </section>
      {body ? (
        <section className="border-t border-zinc-800/80 py-8">
          <h2 className="mb-4 font-mono text-xs font-medium uppercase tracking-widest text-zinc-500">Notes</h2>
          <Markdown>{body}</Markdown>
        </section>
      ) : null}
    </article>
  );
}
