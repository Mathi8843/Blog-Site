---
day: 2
title: Webhooks and APIs
date: "2026-04-02"
whatLearned: |
  - HTTP webhooks push events to a URL you control; APIs are pull-based unless streaming.
  - Verify signatures (e.g. HMAC) when consuming third-party webhooks.
  - Idempotency keys help avoid duplicate side effects on retries.
whatBuilt: |
  - Extended the Day 1 flow with an **HTTP Request** node hitting a JSON placeholder API.
  - Stored responses in a simple Google Sheet via a manual export (no OAuth yet).
problems: |
  Occasional `429 Too Many Requests` when testing too fast against the free API.
solution: |
  Added a **Wait** node (2s) and reduced loop iterations during development.
github: ""
tomorrowPlan: |
  Experiment with authenticated APIs and environment variables in n8n.
---
