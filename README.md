# Anderson Wang Neo-Portfolio Remake

A portfolio that is also a case study. Built with an AI-native workflow using Claude Code, from brief to deployed product.

---

## How This Was Planned

This project started as a written brief — a structured analysis of what a product designer's portfolio should accomplish technically and strategically. That brief outlined the stack, the design system architecture, the content model, and the interaction philosophy before a single line of code was written.

From there, Claude Code became the collaborator: translating design intent into implementation, scaffolding the token system from a TypeScript specification, generating components that reference semantic tokens rather than hardcoded values, and accelerating the feedback loop between "what I want this to feel like" and "what is actually rendered."

The workflow was less "AI writes the code" and more "designer specifies the system, AI executes the spec." The vocabulary I already had from design systems work — primitives, semantic tokens, component variants, motion easings — translated directly into prompts. That's the advantage of an AI-native workflow for a designer: your existing mental model becomes the interface.

---

## Tech Stack

| Layer | Tool | Why |
|---|---|---|
| Framework | Next.js 16 (App Router) | Component model maps to how I already think in Figma. File-based routing makes case study management intuitive. |
| Styling | Tailwind CSS v4 | Token-first. The `@theme {}` block in `globals.css` is a direct expression of the design system — no separate config file. |
| Animation | Framer Motion 12 | Design-friendly API. Motion described by intent (`initial`, `animate`, `whileHover`) mirrors the way I write motion specs. |
| Content | MDX + next-mdx-remote | Case studies live as `.mdx` files. Markdown for prose, React for interactive components inline. |
| Email | Resend | Clean API, no vendor lock-in for the contact form. |
| Analytics | Vercel Analytics | Privacy-friendly, zero config. |
| Hosting | Vercel | Native Next.js deployment. Every push auto-deploys; every branch gets a preview URL for feedback. |
| Language | TypeScript | The token system and component APIs are fully typed — enforces the design system contract at the editor level. |

---

## The Neo Design System

Neo is the design system built specifically for this portfolio. It doesn't live in Figma — it lives in the codebase, which means the documentation *is* the implementation.

### Architecture: 3-Tier Token Model

```
Tier 1 · Primitives     — raw values with no opinion
Tier 2 · Semantic       — values named by intent, not appearance
Tier 3 · Component      — scoped overrides per component
```

**The rule:** Components only consume Tier 2 tokens. Tier 1 values are referenced exclusively by Tier 2. This means renaming a color or adjusting a spacing step propagates correctly across the entire system — no hunting for magic numbers.

The source of truth is [`lib/tokens.ts`](lib/tokens.ts). Everything in `globals.css`, every component's inline style, and every Tailwind class traces back to a value defined there.

### Color

The brand palette is built around **Amethyst** as the primary, with four supporting colors — Lilac, Rose, Gold, and Peridot — intended for category tagging and editorial accents, not decoration.

Neutrals are warm-tinted rather than clinical grey. This was a deliberate choice: warm off-whites and near-blacks feel softer and more editorial than pure `#000000 / #FFFFFF` pairs.

All semantic color tokens carry both a `light` and `dark` value. The `.dark` class on the root element switches the entire system in one step — no component-level color logic required.

### Typography

Three typefaces, each with a defined role:

- **Roboto Serif** — display headlines, hero text, editorial pull quotes. The personality font: literary, unexpected.
- **Satoshi** — all body copy, UI labels, navigation. Workhorse: clean, geometric, highly legible.
- **Azeret Mono** — code, metadata, index numbers, timestamps. Signals precision and craft.

The type scale uses `clamp()` for display and heading sizes — fully fluid, no breakpoint-based overrides needed.

### Motion

Motion tokens are named by feel, not by milliseconds:

- `instant` — state changes that shouldn't animate
- `micro` — hover color shifts, checkbox ticks
- `fast` — tooltip appear, dropdown open
- `base` — the default for most transitions
- `slow` — panel slides, page-level reveals
- `deliberate` — hero animations, first-load
- `cinematic` — use once per page, maximum

Easing curves follow the same principle: `spring` for playful moments, `snappy` for UI feedback, `smooth` for continuous movement. Named by what the motion communicates.

### Components

All components consume semantic tokens via CSS custom properties — `var(--accent)`, `var(--bg-surface)`, `var(--border-strong)` — which means they are automatically theme-aware without any conditional logic.

Current component library: `Button` (three variants, three sizes), `Card`, `Tag`. Each is a Framer Motion component, so interactive states (`whileHover`, `whileTap`) are built in rather than bolted on.

---

## Project Structure

```
app/
  page.tsx              — Home: Hero, Selected Work, About, Contact CTA
  work/page.tsx         — Case study index
  design-system/page.tsx— Live Neo design system documentation
  contact/page.tsx      — Contact form (Resend API route)

components/
  layout/               — Nav, Footer, PageTransition, ReadingProgress
  sections/             — Page-specific section components
  ui/                   — Button, Card, Tag (design system primitives)

content/
  case-studies/         — MDX case study files

lib/
  tokens.ts             — Neo design system token definitions (source of truth)
  mdx.ts                — MDX parsing utilities
  projects.ts           — Case study metadata
```

---

## Neo Design System Changelog

### v1.2 — WCAG 2.1 AA Audit & Remediation *(May 2026)*

A systematic contrast audit against WCAG 2.1 AA revealed 6 failures across text tokens, UI component borders, and interactive elements. All critical and major issues were remediated in this release.

**Fixes applied:**

| Token / Element | Before | After | Contrast (on bg-page) | Status |
|---|---|---|---|---|
| `--text-muted` (light) | `#9A9690` | `#6B6865` | 2.77:1 → ~5.2:1 | ✅ Fixed |
| `--text-muted` (dark) | `#737068` | `#9A9690` | 4.00:1 → 6.73:1 | ✅ Fixed |
| `--border-strong` (light) | `rgba(0,0,0,0.12)` | `rgba(0,0,0,0.38)` | 1.30:1 → ~3.1:1 | ✅ Fixed (WCAG 1.4.11) |
| `--border-strong` (dark) | `rgba(fff,0.12)` | `rgba(fff,0.38)` | — → ~3:1 | ✅ Fixed |
| `DecisionRecord` "Chosen" badge | `#16A34A` | `#166534` | 3.30:1 → ~7:1 | ✅ Fixed |
| `LightboxImage` close button | 36px | 44px | — | ✅ Fixed (WCAG 2.5.5) |

**Confirmed passing (no changes needed):**
`--text-primary` (18.18:1), `--text-secondary` (8.74:1), `--accent` (7.76:1), `--accent` on subtle (7.09:1), `--status-error` (4.55:1)

---

### v1.1 — Case Study MDX Component Library *(May 2026)*

Standard MDX prose couldn't surface the strategic complexity of senior-level design work. Dedicated components were added to make decision rationale, team structure, and impact stats visually distinct and scannable.

**Added:**
- `RoleMap` — responsive card grid for team/stakeholder structure
- `DecisionRecord` — structured Chosen / Rejected / Why decision card
- `YouTubeEmbed` — responsive 16:9 video embed with radius-clipped container
- `LightboxImage` — hover-to-scale, click-to-enlarge image wrapper with blur overlay

**Changed:**
- `FullImage` — removed fixed aspect ratio, now renders at natural image dimensions; wraps `LightboxImage`
- `ImagePair` — switched to `auto-fit minmax(260px)` grid, `align-items: start`, wraps `LightboxImage`

---

### v1.0 — Initial Release *(May 2026)*

Neo Design System launched as the token foundation for the portfolio. The design system page (`/design-system`) serves as the living documentation — the codebase *is* the spec.

**Added:**
- 3-tier token model: Primitives → Semantics → Components (source of truth in `lib/tokens.ts`)
- Color system: Amethyst brand + Lilac, Rose, Gold, Peridot editorial accents + warm neutrals
- Automatic light/dark theming via CSS custom properties (`.dark` class on root)
- Typography: Roboto Serif (display) / Satoshi (body) / Azeret Mono (meta); fluid `clamp()` scale
- Motion system: 7 named durations, 4 named easings, stagger scale
- Core components: `Button` (3 variants × 3 sizes), `Card` (3D tilt, scroll reveal), `Tag` (5 colors × 2 sizes)
- MDX base components: `Callout`, `FullImage`, `ImagePair`, `Stat` + `StatRow`

---

## Status

Core infrastructure is complete and deployed. The design system page documents the full token system live. Case studies are being authored in MDX. Remaining work: custom cursor, smooth scroll, additional case study content.
