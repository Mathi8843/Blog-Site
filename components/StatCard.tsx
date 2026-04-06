type Props = { label: string; value: string | number; hint?: string };

export function StatCard({ label, value, hint }: Props) {
  return (
    <div className="rounded-lg border border-zinc-800 bg-zinc-900/40 px-4 py-4">
      <p className="font-mono text-2xl font-semibold tabular-nums text-zinc-100">{value}</p>
      <p className="mt-1 font-mono text-xs uppercase tracking-wider text-zinc-500">{label}</p>
      {hint ? <p className="mt-2 font-mono text-[10px] leading-snug text-zinc-600">{hint}</p> : null}
    </div>
  );
}
