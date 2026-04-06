# AI learning journal

Minimal personal learning journal built with **Next.js** (static export), **Tailwind CSS**, and **Markdown** content.

## Content

- Daily logs: `content/logs/day-*.md` (filename slug becomes the URL: `/learning-logs/day-1`).
- Projects: `content/projects/*.md`.

Log front matter fields: `day`, `title`, `date`, `whatLearned`, `whatBuilt`, `problems`, `solution`, `github` (optional), `tomorrowPlan`. Optional Markdown **body** after the front matter appears under **Notes**.

Edit `lib/site.ts` for the site title, intro, GitHub profile, and **dashboard** numbers (`dashboard.freelanceAttempts`, `dashboard.revenue`, `dashboard.githubCommitsFallback`). Set `githubUsername` to your GitHub login (no `@`) so the contribution chart and API calls resolve correctly. Set `githubRepoCountOverride` if you want the small “Repos linked in content” line to differ from auto-counted URLs.

### Learning dashboard & GitHub API

The homepage **Learning dashboard** shows days logged, projects, freelance attempts, revenue, and GitHub commits. Commit count is loaded **at build time** via GitHub GraphQL when `GITHUB_TOKEN` is set; otherwise it uses `dashboard.githubCommitsFallback`. The rolling window is the **last 12 months** of contributions (matches how GitHub scopes that field). Copy `.env.example` to `.env.local` for local builds. On Vercel, add `GITHUB_TOKEN` under **Project → Settings → Environment Variables** (do not commit the token).

The **contribution heatmap** is an embedded SVG from [ghchart.rshah.org](https://github.com/2016rshah/github-chart-api) (third-party). Customize `contributionChart.imageUrlTemplate` in `lib/site.ts` (use `{username}`).

### Screenshots & diagrams

Optional front matter on any log:

```yaml
gallery:
  - src: /screenshots/my-workflow.png
    alt: n8n canvas export
    caption: Webhook → Slack
```

Place files under `public/screenshots/`. You can also use Markdown images inside any section: `![alt](/screenshots/foo.png)`.

### Search (Fuse.js)

`/search` fuzzy-searches all logs. Before `next dev` or `next build`, `npm run build:index` writes `public/search-index.json` (already chained in `dev` and `build`).

## Scripts

```bash
npm install
npm run dev         # builds search index, then http://localhost:3000
npm run build:index # regenerate public/search-index.json only
npm run build       # index + static output in /out
```

## Deploy on Vercel

1. Push this project to a Git repository (GitHub, GitLab, or Bitbucket).
2. Go to [vercel.com](https://vercel.com), sign in, and click **Add New… → Project**.
3. Import the repository. Vercel detects Next.js automatically.
4. Use defaults: **Framework Preset** Next.js, **Build Command** `next build`, **Output Directory** leave empty (Vercel runs `next build` and hosts the app; static export still works).
5. Click **Deploy**.

Because `next.config.ts` sets `output: "export"`, `next build` emits static files into `out/`. Vercel’s Next.js integration serves these correctly when using static export.

**Optional:** After deployment, set your production domain under **Project → Settings → Domains**.

## Local preview of static export

```bash
npm run build
npx serve out
```
