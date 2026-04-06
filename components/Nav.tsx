import Link from "next/link";

const links = [
  { href: "/", label: "Home" },
  { href: "/learning-logs", label: "Learning Logs" },
  { href: "/search", label: "Search" },
  { href: "/projects", label: "Projects" },
  { href: "/github", label: "GitHub" },
  { href: "/about", label: "About" },
];

export function Nav() {
  return (
    <header className="border-b border-zinc-800/80 bg-zinc-950/80 backdrop-blur-sm">
      <div className="mx-auto flex max-w-3xl flex-col gap-4 px-4 py-5 sm:flex-row sm:items-center sm:justify-between sm:px-6">
        <Link href="/" className="font-mono text-sm font-medium tracking-tight text-zinc-100 hover:text-white">
          journal
        </Link>
        <nav className="flex flex-wrap gap-x-5 gap-y-2 font-mono text-xs uppercase tracking-wider text-zinc-500">
          {links.map(({ href, label }) => (
            <Link key={href} href={href} className="hover:text-zinc-300">
              {label}
            </Link>
          ))}
        </nav>
      </div>
    </header>
  );
}
