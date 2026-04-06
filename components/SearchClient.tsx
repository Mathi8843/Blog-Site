"use client";

import Fuse from "fuse.js";
import Link from "next/link";
import { useCallback, useEffect, useMemo, useState, type ChangeEvent } from "react";

export type SearchDoc = { slug: string; day: number; title: string; date: string; text: string };

export function SearchClient() {
  const [query, setQuery] = useState("");
  const [docs, setDocs] = useState<SearchDoc[] | null>(null);
  const [loadError, setLoadError] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;
    fetch("/search-index.json")
      .then((r) => {
        if (!r.ok) throw new Error("Failed to load index");
        return r.json();
      })
      .then((data: SearchDoc[]) => {
        if (!cancelled) setDocs(data);
      })
      .catch(() => {
        if (!cancelled) setLoadError("Could not load search index. Run npm run build:index or npm run build.");
      });
    return () => {
      cancelled = true;
    };
  }, []);

  const fuse = useMemo(() => {
    if (!docs?.length) return null;
    return new Fuse(docs, {
      keys: [
        { name: "title", weight: 0.45 },
        { name: "text", weight: 0.35 },
        { name: "slug", weight: 0.1 },
        { name: "date", weight: 0.1 },
      ],
      threshold: 0.42,
      ignoreLocation: true,
      minMatchCharLength: 2,
    });
  }, [docs]);

  const results = useMemo(() => {
    const q = query.trim();
    if (!fuse || q.length < 2) return [];
    return fuse.search(q, { limit: 20 }).map((r) => r.item);
  }, [fuse, query]);

  const onChange = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    setQuery(e.target.value);
  }, []);

  return (
    <div>
      <label htmlFor="log-search" className="sr-only">
        Search learning logs
      </label>
      <input
        id="log-search"
        type="search"
        autoComplete="off"
        placeholder="Search days, topics, n8n, APIs…"
        value={query}
        onChange={onChange}
        className="w-full rounded-lg border border-zinc-800 bg-zinc-900/50 px-4 py-3 font-mono text-sm text-zinc-100 placeholder:text-zinc-600 focus:border-emerald-600/50 focus:outline-none focus:ring-1 focus:ring-emerald-600/30"
      />

      {loadError ? <p className="mt-4 text-sm text-amber-500/90">{loadError}</p> : null}

      {!loadError && docs && query.trim().length > 0 && query.trim().length < 2 ? (
        <p className="mt-4 font-mono text-xs text-zinc-500">Type at least 2 characters.</p>
      ) : null}

      {query.trim().length >= 2 && docs ? (
        <ul className="mt-8 divide-y divide-zinc-800/80 rounded-lg border border-zinc-800/80">
          {results.length === 0 ? (
            <li className="px-4 py-6 text-sm text-zinc-500">No matches. Try different keywords.</li>
          ) : (
            results.map((d) => (
              <li key={d.slug}>
                <Link
                  href={`/learning-logs/${d.slug}`}
                  className="block px-4 py-4 transition-colors hover:bg-zinc-800/40"
                >
                  <span className="font-mono text-sm text-zinc-200">
                    Day {d.day} – {d.title}
                  </span>
                  <span className="mt-1 block font-mono text-xs text-zinc-500">{d.date}</span>
                </Link>
              </li>
            ))
          )}
        </ul>
      ) : null}

      {!query.trim() && docs ? (
        <p className="mt-6 font-mono text-xs text-zinc-600">Fuzzy search across all log fields (powered by Fuse.js).</p>
      ) : null}
    </div>
  );
}
