# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

@AGENTS.md

## Commands

```bash
npm run dev      # start dev server
npm run build    # production build
npm run lint     # run ESLint
```

No test runner is configured.

## Stack

- **Next.js 16.2.4** (Pages Router) — React 19, TypeScript, Sass
- **Zustand + Immer** — client state
- **TanStack React Query + Axios** — server state / data fetching

## Architecture

This project follows a **feature-sliced** layout under `src/`:

```
src/
  features/<feature>/   # one folder per domain feature
    *-api.ts            # Axios calls for this feature
    *-store.ts          # Zustand store (use Immer for mutations)
    hooks.ts            # React Query hooks that call *-api.ts
    types.ts            # TypeScript types
    index.ts            # public barrel export
  shared/
    constants/          # app-wide constants
    hooks/              # generic reusable hooks
    types/              # generic shared types
    ui/                 # shared UI components
    utils/              # pure utility functions
  pages/                # Next.js Pages Router — maps to URL routes
  styles/               # globals.css + CSS Modules (*.module.css)
  config/               # environment/app config
```

**Data flow:** `pages/` renders feature components → feature `hooks.ts` (React Query) → `*-api.ts` (Axios) → backend. Local UI state lives in `*-store.ts` (Zustand).

## Path Aliases

| Alias | Resolves to |
|---|---|
| `@/*` | `src/*` |
| `@features/*` | `src/features/*` |
| `@shared/*` | `src/shared/*` |
| `@styles/*` | `src/styles/*` |
| `@config/*` | `src/config/*` |

## Key Conventions

- Each feature exposes its public API through `index.ts` — import from the barrel, not from internal files.
- Zustand stores use Immer for mutations; do not mutate state directly.
- CSS is scoped via CSS Modules (`*.module.css`); global styles go in `src/styles/globals.css`.
- Before writing any Next.js-specific code, read the relevant guide in `node_modules/next/dist/docs/` — this version has breaking changes from older Next.js.
