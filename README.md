# CREOVA AI — Prototype (React + TypeScript + Vite)

An interactive mobile-first prototype of CREOVA AI, an all-in-one AI creator studio.
This is the **frontend prototype stage**: it runs fully offline with a mocked AI layer,
no backend or database required. It's the visual + interaction foundation the full
production stack (Next.js + Node.js + PostgreSQL + Prisma) will be built on next.

## What's real vs. mocked right now

**Real, working interaction:**
- Auth flow (login / signup / OTP screens) — UI + state only, no real accounts yet
- AI credit system (deducts on generation)
- 3 featured AI tools with tailored generation logic: Thumbnail Idea Generator,
  YouTube Title Generator, Instagram Caption Generator
- AI Chat with typing indicator and suggestion chips
- Projects: create, duplicate, delete, search, filter by folder
- Subscription tiers (Free / Pro / Business) with plan switching
- Usage/analytics widgets on Home and Profile

**Mocked / simplified (by design, for this stage):**
- The other 17 AI tools share one generic generation workspace instead of
  bespoke prompts/UI each
- `generateWithAI()` in `src/App.tsx` returns templated local output instead of
  calling a real model — swap this function for a real API call when you wire
  a backend (see comment inside the function)
- No database — state resets on page refresh
- Google/OTP auth is visual only, not connected to a real identity provider

## Getting started

```bash
npm install
npm run dev
```

Then open the printed local URL (typically http://localhost:5173).

To build for production:

```bash
npm run build
npm run preview
```

## Project structure

```
creova-ai/
├── index.html            # Vite entry HTML
├── package.json
├── tsconfig.json
├── vite.config.ts
├── public/
│   └── favicon.svg
└── src/
    ├── main.tsx           # React root
    ├── App.tsx            # Entire app: screens, components, mock AI layer, styles
    └── index.css          # Minimal global reset
```

## Design tokens

Defined as CSS variables inside `App.tsx` (`GlobalStyle` component):

| Token | Value | Use |
|---|---|---|
| `--bg` | `#08070A` | App background |
| `--crimson` | `#C81E3A` | Primary brand color |
| `--crimson-bright` | `#FF3355` | Active states, AI glow |
| `--gold` | `#E8B54A` | Pro/Business badges only |
| `--text` | `#F5F3F2` | Primary text |
| `--text-muted` | `#9C949B` | Secondary text |

Fonts: **Clash Display** (headlines) + **General Sans** (body/UI), loaded via Fontshare.

## Next steps toward production

1. Replace `generateWithAI()` with a real backend call to an AI provider
   (OpenAI, Anthropic, etc.) — a provider-agnostic service layer.
2. Stand up the Next.js + Node.js + PostgreSQL + Prisma backend: real auth
   (email/password hashing, Google OAuth, OTP via email/SMS provider),
   persistent projects/users/subscriptions tables.
3. Wire Stripe (or similar) for real subscription billing.
4. Build bespoke UI + prompts for the remaining 17 AI tools.
5. Add the admin panel (users, templates, AI tools, reports, analytics, feature flags).

## License

Prototype code for CREOVA AI — internal project use.
