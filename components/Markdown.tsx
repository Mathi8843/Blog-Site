"use client";

import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import rehypeHighlight from "rehype-highlight";

type Props = { children: string; className?: string };

export function Markdown({ children, className }: Props) {
  if (!children?.trim()) {
    return <p className="text-zinc-500">—</p>;
  }
  return (
    <div className={className}>
      <ReactMarkdown
        remarkPlugins={[remarkGfm]}
        rehypePlugins={[rehypeHighlight]}
        components={{
          a: ({ href, children: c }) => (
            <a
              href={href}
              className="text-sky-400 underline decoration-sky-500/40 underline-offset-2 hover:text-sky-300"
              target="_blank"
              rel="noopener noreferrer"
            >
              {c}
            </a>
          ),
          code: ({ className: cn, children: c, ...props }) => {
            const isBlock = cn?.includes("language-");
            if (isBlock) {
              return (
                <code className={cn} {...props}>
                  {c}
                </code>
              );
            }
            return (
              <code className="rounded bg-zinc-800 px-1.5 py-0.5 text-sm text-emerald-300" {...props}>
                {c}
              </code>
            );
          },
          pre: ({ children: c }) => (
            <pre className="mb-4 overflow-x-auto rounded-lg border border-zinc-800 bg-zinc-950 p-4 text-sm">{c}</pre>
          ),
          ul: ({ children: c }) => <ul className="mb-4 list-disc space-y-1 pl-6 text-zinc-300">{c}</ul>,
          ol: ({ children: c }) => <ol className="mb-4 list-decimal space-y-1 pl-6 text-zinc-300">{c}</ol>,
          p: ({ children: c }) => <p className="mb-3 leading-relaxed text-zinc-300 last:mb-0">{c}</p>,
          h2: ({ children: c }) => (
            <h2 className="mb-3 mt-8 text-lg font-semibold text-zinc-100 first:mt-0">{c}</h2>
          ),
          h3: ({ children: c }) => <h3 className="mb-2 mt-6 text-base font-medium text-zinc-200">{c}</h3>,
          blockquote: ({ children: c }) => (
            <blockquote className="mb-4 border-l-2 border-zinc-600 pl-4 text-zinc-400">{c}</blockquote>
          ),
          img: ({ src, alt }) => (
            <span className="mb-4 block">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={typeof src === "string" ? src : ""}
                alt={alt ?? ""}
                className="max-h-96 w-full rounded-lg border border-zinc-800 object-contain"
                loading="lazy"
              />
            </span>
          ),
        }}
      >
        {children}
      </ReactMarkdown>
    </div>
  );
}
