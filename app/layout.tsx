import type { Metadata } from "next";
import { IBM_Plex_Mono, IBM_Plex_Sans } from "next/font/google";
import "highlight.js/styles/github-dark.min.css";
import { Nav } from "@/components/Nav";
import { site } from "@/lib/site";
import "./globals.css";

const sans = IBM_Plex_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  variable: "--font-sans-custom",
});

const mono = IBM_Plex_Mono({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  variable: "--font-mono-custom",
});

export const metadata: Metadata = {
  title: site.title,
  description: site.intro.slice(0, 160),
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${sans.variable} ${mono.variable}`}>
      <body className="font-sans">
        <Nav />
        <main className="mx-auto max-w-3xl px-4 py-10 sm:px-6">{children}</main>
        <footer className="mx-auto max-w-3xl border-t border-zinc-800/80 px-4 py-8 sm:px-6">
          <p className="font-mono text-xs text-zinc-600">Learning in public · Built with Next.js</p>
        </footer>
      </body>
    </html>
  );
}
