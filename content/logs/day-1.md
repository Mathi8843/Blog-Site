---
day: 1
title: Getting started with n8n
date: "2026-04-01"
whatLearned: |
  n8n is a workflow automation tool with a node-based editor. Key ideas:

  - **Triggers** start a flow (schedule, webhook, manual).
  - **Nodes** connect data from one step to the next.
  - Expressions use `{{ $json.field }}` to map prior outputs.

  ```javascript
  // Example: map items in a Code node
  return items.map((item) => ({
    json: { ...item.json, processed: true },
  }));
  ```
whatBuilt: |
  - Installed n8n locally with Docker.
  - Built a two-node flow: **Webhook → Respond to Webhook** for a test endpoint.
problems: |
  First run failed because port `5678` was already in use by another app.
solution: |
  Changed the host port mapping in `docker run` to `-p 15678:5678` and opened `http://localhost:15678`.
github: "https://github.com/yourusername/n8n-learning-journal"
gallery:
  - src: /screenshots/example-n8n-flow.svg
    alt: Example n8n workflow — Webhook to HTTP Request to Respond
    caption: Replace with a real canvas export from n8n (PNG/SVG) under public/screenshots/
tomorrowPlan: |
  Add a third node that calls an external API and logs the response.
---

Optional **body** markdown below front matter appears under a **Notes** section if you add content here.
