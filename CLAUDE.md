# Seau

## What this is

Seau ("bucket" in French) is a calm, reflective personal productivity app — part bucket list, part planner, part diary. It's a learning project: the primary goal is genuinely understanding React Native, TypeScript, and Postgres/Supabase, not shipping fast. Treat every session accordingly.

## Working style — read this first

I am learning React Native, TypeScript, and backend development through this project. Do NOT default to writing full implementations for me.

- Do not write feature code in `app/`, `components/`, or `styles/` unless I explicitly ask you to write it. Default mode is explaining, not doing.
- When I ask for a new feature, start by explaining the approach and tradeoffs (e.g. modal vs. new route, where state should live) and let me decide before either of us writes code.
- If I ask you to write something anyway, walk me through what the code does afterward — not just what to paste.
- Favor explaining *why* a pattern works (e.g. why `useEffect` needs a dependency array, why RLS policies matter) over just telling me the steps to follow.
- When reviewing my code, point out issues and ask questions rather than silently fixing them.
- Small illustrative snippets are fine. Actual feature implementation should be mine to write.
- If I explicitly say "just write it" for a specific task, that's fine — but return to explain-first mode afterward unless I say otherwise.

## Tech stack

- **Framework**: React Native + Expo (SDK 54)
- **Navigation**: Expo Router (file-based, under `app/`)
- **Language**: TypeScript
- **Database**: PostgreSQL via Supabase
- **Auth**: Supabase Auth (not yet implemented)
- **File storage**: Supabase Storage, for diary photos (not yet implemented)
- **Version control**: Git + GitHub

Future learning goals, not yet in scope: AWS (EC2/RDS/S3) as a Supabase alternative/extension, GitHub Actions for CI/CD, Infrastructure as Code (Terraform/CDK). Don't introduce these unless asked.

## App structure

Three tabs:

1. **Bucket** (`app/(tabs)/bucket.tsx`) — a collection, not a list, of things to do. Items render as color-coded "bubbles" grouped by category. Categories are user-defined (defaults: Tasks, Movies, Books, Food, Places), each with a `color` and `text_color`. Items can be pinned (shown in a separate "Pinned" section above categories). Tapping a bubble navigates to a detail screen at `app/bucket/[id].tsx`, with an edit screen mirroring its layout rather than looking like a traditional form.

2. **Plan** (formerly "Today") — two views: a customizable to-do list (user-defined sections like "Today"/"This Week", draggable tasks, addable from the Bucket) and a simple calendar view, closer to Apple Calendar in density than Google Calendar.

3. **Diary** — timeline layout, entries connected by a vertical line with dots. Each entry has a date, title, freeform body, optional photos. Manual entries plus entries generated when a Bucket item is completed.

## Data model

```sql
categories        id, name, color, text_color, created_at
bucket_items       id, title, category_id, pinned, description,
                    location, duration, link, notes,
                    completed, completed_at, created_at
diary_entries       id, title, body, date, created_at
```

## Conventions

- Styles live in dedicated files under `styles/`, one per screen (e.g. `styles/bucket.styles.ts`), not inline in components.
- Shared types live in `types/index.ts` at the project root, mirroring the SQL schema exactly (nullable SQL columns → `string | null` in TS, etc.).
- Supabase client lives in `lib/supabase.ts`.
- Design tokens: parchment base color `#F5F3EE`, DM Serif Display for wordmarks, Montaga for UI text, pastel category-coded bubbles.
- Commit after every meaningful change with a clear, conventional message (e.g. `feat: add pinned section to bucket screen`).

## Current state

Bucket screen fetches categories and bucket_items from Supabase, renders pinned items and category-grouped bubbles, navigates to a detail screen on tap. Not yet done: wiring the header's add (+) and filter (⊞) buttons, filtering UI, loading/empty states. Plan and Diary screens not yet built.

> **Keep this section current.** At the end of a session where we finished or meaningfully progressed a feature, update this section to reflect it — what's working, what's next. Keep it short (a few sentences), factual, and free of speculation about future features we haven't discussed. Don't rewrite other sections of this file without me asking.