import fs from "fs";
import path from "path";
import matter from "gray-matter";

const logsDir = path.join(process.cwd(), "content/logs");
const projectsDir = path.join(process.cwd(), "content/projects");

export type LogGalleryImage = {
  src: string;
  alt: string;
  caption?: string;
};

export type LogFrontmatter = {
  day: number;
  title: string;
  date: string;
  whatLearned: string;
  whatBuilt: string;
  problems: string;
  solution: string;
  github?: string;
  tomorrowPlan: string;
  /** Screenshots, n8n workflows, architecture diagrams — paths under /public */
  gallery?: LogGalleryImage[];
};

export type ProjectFrontmatter = {
  name: string;
  description: string;
  github: string;
  order?: number;
};

function readDirSafe(dir: string): string[] {
  if (!fs.existsSync(dir)) return [];
  return fs.readdirSync(dir).filter((f) => f.endsWith(".md"));
}

export function getLogSlugs(): string[] {
  return readDirSafe(logsDir).map((f) => f.replace(/\.md$/, ""));
}

export function getLogBySlug(slug: string) {
  const fullPath = path.join(logsDir, `${slug.replace(/[^a-zA-Z0-9_-]/g, '').toLowerCase()}.md`);
  const raw = fs.readFileSync(fullPath, "utf8");
  const { data, content } = matter(raw);
  const fm = data as LogFrontmatter;
  return {
    slug,
    frontmatter: fm,
    body: content.trim(),
  };
}

export function getAllLogs() {
  const slugs = getLogSlugs();
  const logs = slugs.map((slug) => getLogBySlug(slug));
  logs.sort((a, b) => a.frontmatter.day - b.frontmatter.day);
  return logs;
}

export function getAllProjects() {
  const files = readDirSafe(projectsDir);
  const projects = files.map((file) => {
    const raw = fs.readFileSync(path.join(projectsDir, path.basename(file)), "utf8");
    const { data } = matter(raw);
    return data as ProjectFrontmatter;
  });
  projects.sort((a, b) => (a.order ?? 999) - (b.order ?? 999) || a.name.localeCompare(b.name));
  return projects;
}

const githubRepoPattern = /^https?:\/\/github\.com\/([^/]+)\/([^/]+?)(?:\.git)?\/?$/i;

export function normalizeGithubRepoUrl(url: string): string | null {
  const trimmed = url.trim();
  const m = trimmed.match(githubRepoPattern);
  if (!m) return null;
  return `${m[1]}/${m[2].replace(/\/$/, "")}`;
}

export function collectUniqueGithubRepos(logs: ReturnType<typeof getAllLogs>, projects: ProjectFrontmatter[]) {
  const set = new Set<string>();
  for (const log of logs) {
    if (log.frontmatter.github) {
      const n = normalizeGithubRepoUrl(log.frontmatter.github);
      if (n) set.add(n);
    }
  }
  for (const p of projects) {
    if (p.github) {
      const n = normalizeGithubRepoUrl(p.github);
      if (n) set.add(n);
    }
  }
  return set.size;
}
