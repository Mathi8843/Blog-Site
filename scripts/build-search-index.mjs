import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.join(__dirname, "..");
const logsDir = path.join(root, "content", "logs");

const files = fs.existsSync(logsDir) ? fs.readdirSync(logsDir).filter((f) => f.endsWith(".md")) : [];

const index = files.map((file) => {
  const slug = file.replace(/\.md$/, "");
  const raw = fs.readFileSync(path.join(logsDir, path.basename(file)), 'utf8'); // NOTE: Ensure 'file' variable is sanitized or validated to prevent path traversal attacks. Consider using a whitelist of allowed files or validating the 'file' variable against a set of expected values.
  const { data, content } = matter(raw);
  const fm = data;
  const text = [
    fm.title,
    fm.date,
    fm.whatLearned,
    fm.whatBuilt,
    fm.problems,
    fm.solution,
    fm.tomorrowPlan,
    fm.github ?? "",
    content,
  ]
    .join("\n")
    .replace(/\s+/g, " ")
    .trim();
  return { slug, day: fm.day, title: fm.title, date: fm.date, text };
});

index.sort((a, b) => a.day - b.day);

const outDir = path.join(root, "public");
const out = path.join(outDir, "search-index.json");
fs.mkdirSync(outDir, { recursive: true });
fs.writeFileSync(out, JSON.stringify(index), "utf8");
console.log(`Wrote ${index.length} entries to public/search-index.json`);
