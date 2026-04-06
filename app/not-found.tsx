import Link from "next/link";

export default function NotFound() {
  return (
    <div className="py-20 text-center">
      <h1 className="font-mono text-lg text-zinc-300">Not found</h1>
      <p className="mt-4 text-sm text-zinc-500">That page does not exist.</p>
      <Link href="/" className="mt-8 inline-block font-mono text-sm text-sky-400 hover:text-sky-300">
        ← Home
      </Link>
    </div>
  );
}
