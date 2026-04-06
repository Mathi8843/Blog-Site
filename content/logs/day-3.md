---
day: 3
title: Claude automation experiments
date: "2026-04-03"
whatLearned: |
  Using an LLM inside an automation means you must design for:

  - **Structured outputs** (JSON schema or clear delimiters).
  - **Retries** when parsing fails.
  - **Cost and latency** budgets per run.

  ```json
  {
    "role": "user",
    "content": "Summarize the following log line in one sentence."
  }
  ```
whatBuilt: |
  - Prototype script that reads a text file, sends chunks to the API, and writes summaries to `out/summary.md`.
  - Wrapped the call in a small CLI with readline prompts for the file path.
problems: |
  Model occasionally returned markdown fences around JSON, breaking `JSON.parse`.
solution: |
  Stripped code fences with a regex before parse, and retried once with a stricter system prompt.
github: "https://github.com/yourusername/claude-automation-sandbox"
tomorrowPlan: |
  Move prompts to external templates and add unit tests for the JSON extractor.
---
