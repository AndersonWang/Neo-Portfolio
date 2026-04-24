/**
 * Neo Design System — Tokens v2
 * Anderson Wang · andersonwang.io
 *
 * Architecture: 3-tier token model
 *   Tier 1 · Primitives   — raw values, never used directly in components
 *   Tier 2 · Semantic     — named by intent (what it's FOR, not what it looks like)
 *   Tier 3 · Component    — scoped overrides per component (defined in component files)
 *
 * Rule: Components only consume Tier 2. Tier 1 is referenced only by Tier 2.
 */

// ─────────────────────────────────────────────────────────────
// TIER 1 · PRIMITIVES
// Raw values. No opinions. No context. Just truth.
// ─────────────────────────────────────────────────────────────

export const primitive = {

  // Brand palette — the Neo signature colours
  // Each has a light/dark variant for theme adaptation
  color: {
    amethyst: {
      50:  '#F0ECFA',
      100: '#D9D0F5',
      200: '#B8A8ED',
      300: '#9780E4',
      400: '#7A5DD9',
      500: '#5835B0', // ← light mode base
      600: '#452A8C',
      700: '#321E68',
      800: '#1F1244',
      900: '#0D0820',
      // Dark mode sits brighter — lower contrast backgrounds need luminous primaries
      dark: '#8B6AFF',
    },
    lilac: {
      200: '#E8D5FA',
      400: '#CF9FF5',
      500: '#BF92F0', // ← base (same light/dark — works at this saturation)
      700: '#8A50C8',
    },
    rose: {
      200: '#F2CECE',
      400: '#E3AAAA',
      500: '#D78F8D', // ← base
      700: '#B05F5D',
    },
    gold: {
      200: '#F5DFC0',
      400: '#E8C08A',
      500: '#DBA166', // ← base
      700: '#B07030',
    },
    peridot: {
      200: '#D0E4BC',
      400: '#A8C882',
      500: '#87AA61', // ← base
      700: '#567A35',
    },

    // Neutrals — warm-tinted, not clinical grey
    neutral: {
      0:   '#FFFFFF',
      50:  '#FAF8F4', // ← light bg
      100: '#F0EDE8',
      200: '#E0DDD8',
      300: '#C8C5C0',
      400: '#9A9690',
      500: '#737068',
      600: '#4A4740',
      700: '#2E2C28',
      800: '#1A1918',
      900: '#0F0E0D',
      950: '#0A0A0A', // ← dark bg
    },

    // Functional — semantic states
    red:   { light: '#DC2626', dark: '#EF4444' },
    green: { light: '#16A34A', dark: '#22C55E' },
    amber: { light: '#D97706', dark: '#F59E0B' },
  },

  // Raw opacity values for border/overlay use
  opacity: {
    subtle:   0.06,
    soft:     0.12,
    moderate: 0.24,
    strong:   0.48,
  },
}

// Convenience: ordered palette for iteration (design system page, swatches, etc.)
export const paletteOrder = ['amethyst', 'lilac', 'rose', 'gold', 'peridot'] as const
export type BrandColor = typeof paletteOrder[number]


// ─────────────────────────────────────────────────────────────
// TIER 2 · SEMANTIC TOKENS
// Named by INTENT. Components only touch these — never primitives.
// Each token has a light and dark value.
// ─────────────────────────────────────────────────────────────

export const semantic = {

  // · · · COLOUR · · ·
  color: {

    // Backgrounds — layered elevation system
    background: {
      page:    { light: primitive.color.neutral[50],  dark: primitive.color.neutral[950] },
      surface: { light: primitive.color.neutral[0],   dark: primitive.color.neutral[800] },
      raised:  { light: primitive.color.neutral[100], dark: primitive.color.neutral[700] },
      overlay: { light: `rgba(10,10,10,${primitive.opacity.moderate})`,
                 dark:  `rgba(250,248,244,${primitive.opacity.soft})` },
    },

    // Text — 3-level hierarchy
    text: {
      primary:   { light: primitive.color.neutral[900], dark: primitive.color.neutral[50]  },
      secondary:  { light: primitive.color.neutral[600], dark: primitive.color.neutral[400] },
      muted:     { light: primitive.color.neutral[400], dark: primitive.color.neutral[500] },
      inverse:   { light: primitive.color.neutral[50],  dark: primitive.color.neutral[900] },
      onAccent:  { light: primitive.color.neutral[0],   dark: primitive.color.neutral[950] },
    },

    // Borders — glass-like, not heavy lines
    border: {
      default: {
        light: `rgba(10,10,10,${primitive.opacity.subtle})`,
        dark:  `rgba(250,248,244,${primitive.opacity.subtle})`,
      },
      strong: {
        light: `rgba(10,10,10,${primitive.opacity.soft})`,
        dark:  `rgba(250,248,244,${primitive.opacity.soft})`,
      },
      accent: {
        light: primitive.color.amethyst[500],
        dark:  primitive.color.amethyst.dark,
      },
    },

    // Accent — the primary interactive / brand colour
    accent: {
      default:  { light: primitive.color.amethyst[500], dark: primitive.color.amethyst.dark },
      hover:    { light: primitive.color.amethyst[600], dark: '#A080FF' },
      subtle:   { light: primitive.color.amethyst[50],  dark: `rgba(139,106,255,${primitive.opacity.soft})` },
      on:       { light: primitive.color.neutral[0],    dark: primitive.color.neutral[950] },
    },

    // Functional states
    status: {
      error:   { light: primitive.color.red.light,   dark: primitive.color.red.dark   },
      success: { light: primitive.color.green.light, dark: primitive.color.green.dark },
      warning: { light: primitive.color.amber.light, dark: primitive.color.amber.dark },
    },

    // Brand palette — semantic access (for illustrations, tags, accents)
    brand: {
      amethyst: { light: primitive.color.amethyst[500], dark: primitive.color.amethyst.dark },
      lilac:    { light: primitive.color.lilac[500],    dark: primitive.color.lilac[500]    },
      rose:     { light: primitive.color.rose[500],     dark: primitive.color.rose[500]     },
      gold:     { light: primitive.color.gold[500],     dark: primitive.color.gold[500]     },
      peridot:  { light: primitive.color.peridot[500],  dark: primitive.color.peridot[500]  },
    },
  },


  // · · · TYPOGRAPHY · · ·
  // Grace Guo-inspired: explicit roles, not just sizes.
  // Every text in the system has a named role — no ad-hoc sizing.
  typography: {

    // Typefaces — the Neo character trio
    font: {
      display: "'Silk Serif', Georgia, serif",
        // → Hero headlines, wordmark, editorial pull quotes
        // → Personality font: elegant, literary, unexpected
      body:    "'Satoshi', system-ui, sans-serif",
        // → All UI text, body copy, labels, nav
        // → Workhorse font: clean, geometric, highly legible
      mono:    "'Azeret Mono', 'Courier New', monospace",
        // → Code, data, metadata, timestamps, index numbers
        // → Signals: precision, craft, technical depth
    },

    // Type scale — Grace Guo uses named roles mapped to fluid sizes
    // clamp(min, preferred, max) = automatically responsive, no breakpoints needed
    scale: {
      // Display — for hero sections only
      display2xl: { size: 'clamp(4rem, 9vw, 9rem)',   weight: 300, leading: 0.95, tracking: '-0.04em', font: 'display' },
      displayXl:  { size: 'clamp(3rem, 6.5vw, 7rem)', weight: 300, leading: 1.0,  tracking: '-0.03em', font: 'display' },
      displayLg:  { size: 'clamp(2.5rem, 5vw, 5rem)', weight: 400, leading: 1.05, tracking: '-0.025em',font: 'display' },

      // Heading — section titles, card headlines
      headingXl:  { size: 'clamp(1.75rem, 3.5vw, 3rem)',  weight: 500, leading: 1.15, tracking: '-0.02em', font: 'body' },
      headingLg:  { size: 'clamp(1.375rem, 2.5vw, 2.25rem)', weight: 500, leading: 1.2,  tracking: '-0.015em',font: 'body' },
      headingMd:  { size: 'clamp(1.125rem, 2vw, 1.5rem)',  weight: 600, leading: 1.25, tracking: '-0.01em', font: 'body' },
      headingSm:  { size: '1.125rem',                       weight: 600, leading: 1.3,  tracking: '-0.005em',font: 'body' },

      // Body — readable prose and UI copy
      bodyLg:     { size: '1.125rem', weight: 400, leading: 1.65, tracking: '0',      font: 'body' },
      bodyMd:     { size: '1rem',     weight: 400, leading: 1.6,  tracking: '0',      font: 'body' },
      bodySm:     { size: '0.875rem', weight: 400, leading: 1.55, tracking: '0.005em',font: 'body' },

      // UI — labels, nav, buttons, captions
      labelLg:    { size: '0.875rem', weight: 500, leading: 1.4,  tracking: '0.04em', font: 'body' },
      labelMd:    { size: '0.75rem',  weight: 500, leading: 1.4,  tracking: '0.06em', font: 'body' },
      labelSm:    { size: '0.6875rem',weight: 600, leading: 1.4,  tracking: '0.08em', font: 'body' },

      // Mono — code, metadata, index numbers
      monoMd:     { size: '0.875rem', weight: 400, leading: 1.7,  tracking: '0',      font: 'mono' },
      monoSm:     { size: '0.75rem',  weight: 400, leading: 1.6,  tracking: '0',      font: 'mono' },

      // Editorial — pull quotes, callouts (display font at body scale)
      quoteLg:    { size: 'clamp(1.25rem, 2.5vw, 2rem)', weight: 300, leading: 1.4, tracking: '-0.01em', font: 'display' },
      quoteMd:    { size: '1.25rem',  weight: 300, leading: 1.5,  tracking: '-0.01em',font: 'display' },
    },
  },


  // · · · SPACING · · ·
  // 4pt base grid. Named by step, not pixel value.
  // Why: "space-8" travels with your intent better than "32px"
  space: {
    0:   '0',
    px:  '1px',
    0.5: '0.125rem',  //  2px
    1:   '0.25rem',   //  4px
    1.5: '0.375rem',  //  6px
    2:   '0.5rem',    //  8px
    3:   '0.75rem',   // 12px
    4:   '1rem',      // 16px
    5:   '1.25rem',   // 20px
    6:   '1.5rem',    // 24px
    8:   '2rem',      // 32px
    10:  '2.5rem',    // 40px
    12:  '3rem',      // 48px
    16:  '4rem',      // 64px
    20:  '5rem',      // 80px
    24:  '6rem',      // 96px
    32:  '8rem',      // 128px
    40:  '10rem',     // 160px
    48:  '12rem',     // 192px
    // Semantic aliases — intent over numbers
    sectionGap:   'clamp(5rem, 10vw, 8rem)',  // between major page sections
    contentGap:   'clamp(2rem, 4vw, 3rem)',   // between content blocks
    componentGap: '1.5rem',                   // between components in a group
    gutter:       'clamp(1rem, 4vw, 2rem)',   // page-edge padding, fluid
  },


  // · · · ANIMATION · · ·
  // Named by feel, not timing. "What does this motion communicate?"
  motion: {
    easing: {
      // Exits/enters — fast out, settle naturally
      default:    'cubic-bezier(0.22, 1, 0.36, 1)',
      // Continuous movement — smooth, no sudden changes
      smooth:     'cubic-bezier(0.4, 0, 0.2, 1)',
      // Playful overshoot — use sparingly for delight moments
      spring:     'cubic-bezier(0.34, 1.56, 0.64, 1)',
      // Snappy UI feedback — immediate feel
      snappy:     'cubic-bezier(0.25, 0.1, 0.25, 1)',
      // Linear — for opacity fades only (easing looks wrong on opacity)
      linear:     'linear',
    },
    duration: {
      instant:  '0ms',    // state changes, no animation needed
      micro:    '100ms',  // hover colour shifts, checkbox ticks
      fast:     '200ms',  // tooltip appear, dropdown open
      base:     '300ms',  // most transitions — the default
      slow:     '500ms',  // page-level reveals, panel slides
      deliberate:'800ms', // hero animations, first-load reveals
      cinematic: '1200ms',// dramatic reveals — use max once per page
    },
    stagger: {
      tight:  50,   // ms between items — dense lists
      normal: 100,  // ms — card grids, nav items
      loose:  200,  // ms — hero text lines, major reveals
    },
  },


  // · · · EFFECTS · · ·
  radius: {
    none:  '0',
    xs:    '0.125rem',  //  2px — sharp, precise
    sm:    '0.25rem',   //  4px — subtle rounding
    md:    '0.5rem',    //  8px — standard card
    lg:    '0.75rem',   // 12px — modals, panels
    xl:    '1rem',      // 16px — featured cards
    '2xl': '1.5rem',    // 24px — chips, pills
    '3xl': '2rem',      // 32px — large decorative elements
    full:  '9999px',    // perfect circle / pill
  },

  shadow: {
    // Light mode — warm tinted shadows (not cold grey)
    sm:  '0 1px 2px rgba(88, 53, 176, 0.04), 0 1px 1px rgba(0,0,0,0.04)',
    md:  '0 4px 8px rgba(88, 53, 176, 0.06), 0 2px 4px rgba(0,0,0,0.06)',
    lg:  '0 12px 24px rgba(88, 53, 176, 0.08), 0 4px 8px rgba(0,0,0,0.08)',
    xl:  '0 24px 48px rgba(88, 53, 176, 0.12), 0 8px 16px rgba(0,0,0,0.10)',
    // Glow — for accent/interactive states (amethyst tint)
    glow:  '0 0 20px rgba(139, 106, 255, 0.3)',
    glowSm:'0 0 8px rgba(139, 106, 255, 0.2)',
    // Inner — for pressed states, inset inputs
    inner: 'inset 0 1px 3px rgba(0,0,0,0.08)',
  },

  blur: {
    sm:  '4px',
    md:  '8px',
    lg:  '16px',
    xl:  '24px',
    '2xl':'40px',  // for frosted glass panels
  },


  // · · · LAYOUT · · ·
  layout: {
    maxWidth: {
      content: '720px',   // body copy, comfortable reading
      ui:      '1024px',  // main UI column
      wide:    '1280px',  // full layouts
      full:    '100%',
    },
    grid: {
      cols: 12,
    },
    breakpoint: {
      sm:  '640px',
      md:  '768px',
      lg:  '1024px',
      xl:  '1280px',
      '2xl':'1536px',
    },
    zIndex: {
      below:   -1,
      base:     0,
      raised:   10,
      dropdown: 100,
      sticky:   200,
      overlay:  300,
      modal:    400,
      toast:    500,
      cursor:   900,  // custom cursor always on top
    },
  },
}


// ─────────────────────────────────────────────────────────────
// HELPERS
// Typed utilities for consuming tokens safely
// ─────────────────────────────────────────────────────────────

/** Get a brand colour value for the current theme */
export const getBrandColor = (
  color: BrandColor,
  theme: 'light' | 'dark' = 'light'
): string => semantic.color.brand[color][theme]

/** Get all brand palette colours for the current theme — useful for swatch renders */
export const getPaletteColors = (theme: 'light' | 'dark' = 'light') =>
  paletteOrder.map((key) => ({
    name: key,
    value: getBrandColor(key, theme),
  }))

/** Get a semantic colour for the current theme */
export const getSemanticColor = (
  path: string,
  theme: 'light' | 'dark' = 'light'
): string => {
  const parts = path.split('.')
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  let current: any = semantic.color
  for (const part of parts) {
    current = current?.[part]
  }
  return current?.[theme] ?? current ?? ''
}

/** Resolve a type scale entry to CSS properties */
export const getTypeScale = (role: keyof typeof semantic.typography.scale) => {
  const scale = semantic.typography.scale[role]
  return {
    fontSize:      scale.size,
    fontWeight:    scale.weight,
    lineHeight:    scale.leading,
    letterSpacing: scale.tracking,
    fontFamily:    semantic.typography.font[scale.font as keyof typeof semantic.typography.font],
  }
}

// ─────────────────────────────────────────────────────────────
// LEGACY COMPAT
// Keeps old import paths working while you migrate
// Remove once fully migrated to `semantic.*` imports
// ─────────────────────────────────────────────────────────────
/** @deprecated Use semantic.color.brand instead */
export const colors = {
  brand: {
    amethyst: { light: primitive.color.amethyst[500], dark: primitive.color.amethyst.dark },
    lilac:    { light: primitive.color.lilac[500],    dark: primitive.color.lilac[500]    },
    rose:     { light: primitive.color.rose[500],     dark: primitive.color.rose[500]     },
    gold:     { light: primitive.color.gold[500],     dark: primitive.color.gold[500]     },
    peridot:  { light: primitive.color.peridot[500],  dark: primitive.color.peridot[500]  },
  },
  semantic: {
    accent: semantic.color.accent.default,
    error:  semantic.color.status.error,
    success:semantic.color.status.success,
  },
  background: {
    dark:    primitive.color.neutral[950],
    light:   primitive.color.neutral[50],
    surface: semantic.color.background.surface,
  },
  text: semantic.color.text,
  border: semantic.color.border.default,
}

/** @deprecated Use semantic.typography instead */
export const typography = {
  fonts:    semantic.typography.font,
  sizes:    Object.fromEntries(
    Object.entries(semantic.typography.scale).map(([k, v]) => [k, v.size])
  ),
  weights:  { light: 300, regular: 400, medium: 500, semibold: 600, bold: 700 },
  leading:  { none: 1, tight: 1.15, snug: 1.3, normal: 1.5, relaxed: 1.625, loose: 2 },
  tracking: { tighter: '-0.05em', tight: '-0.025em', normal: '0', wide: '0.025em', wider: '0.05em', widest: '0.1em' },
}

/** @deprecated Use semantic.motion instead */
export const animation = semantic.motion

/** @deprecated Use semantic.space instead */
export const spacing = semantic.space

/** @deprecated Use semantic.layout.breakpoint instead */
export const breakpoints = semantic.layout.breakpoint

/** @deprecated Use semantic.radius / semantic.shadow / semantic.blur instead */
export const effects = {
  radius: semantic.radius,
  shadow: semantic.shadow,
  blur:   semantic.blur,
}
