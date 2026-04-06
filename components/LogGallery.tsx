import type { LogGalleryImage } from "@/lib/content";

type Props = { images: LogGalleryImage[] };

export function LogGallery({ images }: Props) {
  if (!images?.length) return null;

  return (
    <section className="border-b border-zinc-800/80 py-8">
      <h2 className="mb-4 font-mono text-xs font-medium uppercase tracking-widest text-zinc-500">Workflows & diagrams</h2>
      <p className="mb-6 text-sm text-zinc-500">Screenshots and architecture visuals for this day (n8n flows, APIs, etc.).</p>
      <ul className="grid gap-6 sm:grid-cols-2">
        {images.map((img, i) => (
          <li key={`${img.src}-${i}`} className="overflow-hidden rounded-lg border border-zinc-800 bg-zinc-900/40">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={img.src} alt={img.alt} className="w-full object-contain" loading="lazy" />
            {img.caption ? <p className="border-t border-zinc-800 px-3 py-2 font-mono text-xs text-zinc-500">{img.caption}</p> : null}
          </li>
        ))}
      </ul>
    </section>
  );
}
