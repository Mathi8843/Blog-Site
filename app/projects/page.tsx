import { ProjectDescription } from "@/components/ProjectDescription";
import { getAllProjects } from "@/lib/content";

export default function ProjectsPage() {
  const projects = getAllProjects();

  return (
    <div>
      <h1 className="font-mono text-2xl font-semibold text-zinc-50">Projects</h1>
      <p className="mt-3 text-sm text-zinc-500">Things shipped while learning.</p>
      <div className="mt-10 grid gap-4 sm:grid-cols-2">
        {projects.map((p) => (
          <article
            key={p.name}
            className="flex flex-col rounded-lg border border-zinc-800 bg-zinc-900/30 p-5 transition-colors hover:border-zinc-700"
          >
            <h2 className="font-mono text-base font-medium text-zinc-100">{p.name}</h2>
            <div className="mt-3 flex-1 text-sm text-zinc-400">
              <ProjectDescription text={p.description} />
            </div>
            {p.github ? (
              <a
                href={p.github}
                className="mt-4 inline-flex font-mono text-xs text-sky-400 hover:text-sky-300"
                target="_blank"
                rel="noopener noreferrer"
              >
                GitHub →
              </a>
            ) : null}
          </article>
        ))}
      </div>
    </div>
  );
}
