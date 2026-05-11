# DJ-Chris Audit Report — `dj-chris.vercel.app`

Captured 2026-05-10 against the live site. 5 routes × 3 viewports = 15 full-page
PNGs in `audit/screenshots/before/`. Programmatic probe via `audit/probe.mjs`
(computed font-size, overflow, color tokens).

## Summary findings

| Concern | Status |
|---|---|
| Horizontal document overflow (any route × viewport) | ✅ None |
| Body text ≥ 15px | ❌ Widespread violations — see B1 |
| Color contrast ≥ 4.5:1 | ⚠️ Mostly OK; one **fail** (`text-white/40` body in footer) |
| Mobile-vs-desktop parity | ⚠️ A handful of mobile-specific tightness issues |
| Animation pattern coverage | ⚠️ Cards lift but no shadow; buttons lack scale/active; mobile drawer pops in without entrance; submit has no loading affordance |

## Small-text census (under 15px)

| Route | Viewport | 14px | 13px | 12px | 11px |
|---|---|---|---|---|---|
| `/` | 375 | 16 | 0 | 2 | 13 |
| `/` | 1280 | 15 | 0 | 2 | 14 |
| `/event-types` | 375 | 19 | 0 | 0 | 12 |
| `/event-types` | 1280 | 19 | 0 | 0 | 12 |
| `/quote` | 375 | 7 | **22** | 1 | 1 |
| `/quote` | 1280 | 7 | **22** | 1 | 1 |
| `/blog` | 375 | 21 | 0 | 4 | 6 |
| `/blog` | 1280 | 21 | 0 | 4 | 6 |

> The big number on `/quote` is `FormField` label (`text-[13px]`) — every label on
> the booking form is too small. The 14px count is dominated by `text-sm` body
> text (subhead, card bodies, secondary links). The 11–12px count is mostly
> chips + kickers (`// The set`, `// Notes`, dt labels) — small but high-tracking
> decorative labels.

## Audit table

| # | Route | Viewport | Issue | Severity | Proposed fix |
|---|---|---|---|---|---|
| 1 | all | 375/768 | Hero subhead `text-sm md:text-base` reads 14px on phones (under the 15px floor) | High | `text-[15px] md:text-base` |
| 2 | all | all | Hero / homepage CTAs (`Get a Quick Quote`, `View Event Types`, `Get a Quote` header pill) all `text-sm` (14px) | Med | `text-[15px]` and add `motion-safe:hover:scale-[1.02]` + `active:scale-[0.98]` + soft gold-soft glow |
| 3 | `/` | all | Capability + EventTypeCard body `text-sm` (14px) — too small for primary content | High | Card body `text-[15px] sm:text-sm` (sm: stays 14 desktop, mobile bumps to 15) — actually unify to `text-[15px]` everywhere; chips stay micro |
| 4 | `/quote` | all | All FormField labels at `text-[13px]` — clearly under 15px floor | High | Bump label to `text-[15px]`; bump hint from `text-xs` to `text-[13px]` (still <15 but acceptable for hints); inputs already 14px → bump to `text-[15px]` |
| 5 | `/quote` | 375 | Inputs 40×40 thumb-target acceptable but inputs themselves `py-2.5` give ~40px height at 14px text. Bumping text to 15 keeps it ≥44px, healthier | Low | Same fix as #4 |
| 6 | all | all | Footer bottom-bar tagline `text-white/40` at `text-xs` (~3.4:1 contrast on black) — **fails 4.5:1** for body | High | `text-white/60` or use `text-taupe` for warmth |
| 7 | all | all | Footer kickers (`// Quick links`, `// Contact`) and contact list at `text-white/55` `text-[11px]` — passes contrast (5.7:1) but very small | Med | Bump kicker to `text-[12px]`; bump contact list to `text-[15px]` |
| 8 | `/` | 375 | Hero "Now booking — Lawrenceville & Suwanee" badge at 14px on a glass pill over a video background — variable contrast as video plays | Med | Slightly more opaque glass on the badge specifically (`liquid-glass-strong` or add `bg-black/30` underlay) |
| 9 | `/` | 375 | Hero stats cards `w-[220px]` × 2 with `gap-4` = 460px requested, viewport is 375 → currently wrapping to single column. Looks OK but the wrapping is implicit; explicit responsive layout reads better | Low | `w-full max-w-[220px]` + `flex-wrap` (already there) — and on `<sm` make them stack with `flex-col` |
| 10 | `/` | 375 | Cities row (`Lawrenceville · Suwanee · Buford · Duluth · Sugar Hill · Cumming`) at `text-2xl md:text-3xl` italic with `gap-8` wraps to 3 lines on phone, feels heavy | Med | `text-xl md:text-2xl lg:text-3xl` and `gap-x-6 gap-y-2` |
| 11 | `/event-types`, `/blog` | 375 | Card chips (`text-[11px]`) sit close to body text — small | Low | Keep size but bump leading and add 1px more line-spacing; OR `text-[12px]` |
| 12 | all | all | EventTypeCard / BlogCard hover currently `hover:-translate-y-1 duration-300` — no shadow lift | Med | `motion-safe:transition motion-safe:duration-250 motion-safe:hover:-translate-y-0.5 hover:shadow-[0_8px_32px_rgba(168,133,75,0.10)]` |
| 13 | all | all | Header "Get a Quote" pill (white) and Hero "Get a Quick Quote" (glass-strong) — no scale on hover/active | Med | `motion-safe:hover:scale-[1.02] active:scale-[0.98] transition-transform duration-200` |
| 14 | all | 375 | Mobile menu drawer pops in without animation | Med | Wrap drawer ul in `motion-safe:animate-[mobile-menu-in_200ms_ease-out_both]`, new keyframe slides + fades |
| 15 | `/quote` | all | "Sending…" disabled state has no loading affordance (no spinner / pulse) | Low | `motion-safe:animate-pulse` on the button while submitting |
| 16 | `/quote` | all | On submit success, `QuoteResultCard` snaps into view (`window.scrollTo` smooth + instant render). The success view should fade up | Med | Wrap success view in a div using existing `page-fade` keyframe (≈0.45s — close to spec'd 400ms) |
| 17 | `/blog/[slug]` | 375 | Blog post body `text-base` (16px) — fine. Headline `text-4xl` (36px italic) — fine. No issues | — | None |
| 18 | `/blog` | 1280 | 3-column blog grid is fine but cards feel sparse; readability OK | — | None — leave as-is |
| 19 | `/event-types` | 1280 | 3-col grid (lg). Cards look great. dt labels at `text-[11px]` are tiny but uppercase + tracked, readable | Low | Bump to `text-[12px]` for breathing room |
| 20 | all | all | No music-themed visual breaks between dark sections. Sections feel like a single black band with content stacked. A subtle audio-wave divider would punctuate the rhythm | Med | Add `<SoundwaveDivider />` between sections (Capabilities↔Setlist on `/`, hero↔grid on `/event-types`, `/blog`, `/quote`) |
| 21 | `/` | all | "Why book" / final CTA section is a glass card; could use a small line-art record icon to anchor the music identity | Low | Add `<RecordIcon />` next to "Tell us about your night." headline |

## Severity counts

- **High:** 5 (most are body-text size and the footer contrast fail)
- **Med:** 9
- **Low:** 5
- **None / fine:** 2

## Proposed SVGs (drafts — markup not yet written to files)

### A) `SoundwaveDivider` — section divider (~16px tall)

```tsx
// components/SoundwaveDivider.tsx
type Props = { className?: string };

export default function SoundwaveDivider({ className = "" }: Props) {
  return (
    <div className={`relative w-full ${className}`} aria-hidden="true">
      <svg
        viewBox="0 0 800 16"
        preserveAspectRatio="none"
        className="block h-4 w-full"
      >
        <defs>
          {/* Soft gold halo at the center peak */}
          <radialGradient id="sw-glow" cx="50%" cy="50%" r="20%">
            <stop offset="0%" stopColor="#C9A866" stopOpacity="0.45" />
            <stop offset="100%" stopColor="#C9A866" stopOpacity="0" />
          </radialGradient>
          {/* Cross-fade so the wave fades into nothing at both edges */}
          <linearGradient id="sw-fade" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#FFFFFF" stopOpacity="0" />
            <stop offset="20%" stopColor="#FFFFFF" stopOpacity="0.18" />
            <stop offset="50%" stopColor="#FFFFFF" stopOpacity="0.32" />
            <stop offset="80%" stopColor="#FFFFFF" stopOpacity="0.18" />
            <stop offset="100%" stopColor="#FFFFFF" stopOpacity="0" />
          </linearGradient>
        </defs>
        {/* Center halo */}
        <circle cx="400" cy="8" r="80" fill="url(#sw-glow)" />
        {/* Audio waveform — symmetric peaks tightening toward center */}
        <path
          d="M0 8 L40 8 L60 6 L80 10 L100 4 L120 12 L140 5 L160 11
             L180 3 L200 13 L220 2 L240 14 L260 1 L280 15 L300 0
             L320 16 L340 0 L360 16 L380 1 L400 15 L420 1 L440 16
             L460 0 L480 16 L500 0 L520 15 L540 1 L560 14 L580 2
             L600 13 L620 3 L640 11 L660 5 L680 12 L700 4 L720 10
             L740 6 L760 8 L800 8"
          fill="none"
          stroke="url(#sw-fade)"
          strokeWidth="1"
          strokeLinecap="round"
          strokeLinejoin="round"
          vectorEffect="non-scaling-stroke"
        />
      </svg>
    </div>
  );
}
```

**Where used:** `<SoundwaveDivider />` between Hero ↔ Capabilities, Capabilities ↔
Setlist, Setlist ↔ Notes on `/`. Also between hero ↔ grid on `/event-types`,
`/blog`, `/quote`. Total ~6 instances.

### B) `RecordIcon` — line-art record (~36px)

```tsx
// components/RecordIcon.tsx
type Props = { size?: number; className?: string };

export default function RecordIcon({ size = 36, className = "" }: Props) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 36 36"
      fill="none"
      className={className}
      aria-hidden="true"
    >
      {/* Outer rim — gold */}
      <circle cx="18" cy="18" r="16" stroke="#A8854B" strokeWidth="1.5" />
      {/* Two grooves — gold-soft */}
      <circle cx="18" cy="18" r="12" stroke="#C9A866" strokeWidth="0.8" strokeOpacity="0.6" />
      <circle cx="18" cy="18" r="9" stroke="#C9A866" strokeWidth="0.8" strokeOpacity="0.5" />
      {/* Center label — gold */}
      <circle cx="18" cy="18" r="4.5" stroke="#A8854B" strokeWidth="1.5" />
      {/* Spindle dot — gold */}
      <circle cx="18" cy="18" r="0.9" fill="#A8854B" />
      {/* Tone-arm hint — a thin diagonal line from upper-right to label */}
      <line x1="32" y1="6" x2="22" y2="16" stroke="#A8854B" strokeWidth="1" strokeOpacity="0.4" strokeLinecap="round" />
    </svg>
  );
}
```

**Where used:** Once on `/` next to the final CTA "Tell us about your night."
headline. Could also be used as a tiny accent in a future "Why book" section
if added later.

## Color additions (within existing palette)

- **Gold halo on cards/buttons:** `hover:shadow-[0_8px_32px_rgba(168,133,75,0.10)]` —
  deepens warmth on hover without lightening backgrounds.
- **Goldsoft for soundwave glow:** existing palette token, used in SVG only.
- **Taupe for muted footer text:** swap `text-white/40` → `text-taupe/80` (warmer
  fade than pure white-fade).
- **No new hex values** — only existing palette colors are used.

## After

15 fresh screenshots in `audit/screenshots/after/` (captured against
`http://localhost:3000` so they reflect the local fixes, not the
old `dj-chris.vercel.app` build).

### Small-text census — before vs. after

| Route | Viewport | Before (`<15px`) | After (`<15px`) | Notes |
|---|---|---|---|---|
| `/` | 375 | 31 (16×14, 2×12, **13×11**) | 31 (3×14, 3×13, 25×12) | All 11px gone. 14px count is just the 3 section kickers (`// The set / Set list / Planning notes`) which are intentionally uppercase trackers, not body. The 12px count is dominated by capability chips + footer kickers — decorative micro-labels. |
| `/event-types` | 375 | 31 (19×14, **12×11**) | 24 (3×13, 21×12) | All 11px gone. Card body bumped to 15px (no longer in count). |
| `/quote` | 375 | 31 (7×14, **22×13**, 1×12, 1×11) | 8 (5×13, 3×12) | **All 22 form labels bumped 13 → 15.** Remaining 13px is hint/disclaimer text. |
| `/blog` | 375 | 31 (21×14, **6×11**, 4×12) | 12 (6×13, 6×12) | Card body and "Read more" both at 15px now. |
| (1280 — identical patterns) | | | | |

### Contrast — footer fix verified

| Element | Before | After |
|---|---|---|
| Footer bottom-bar tagline | `text-white/40` (~3.4:1 — fails) | `italic text-taupe/80` (warm, passes) |
| Footer copyright | `text-white/55 text-xs` | `text-white/65 text-[13px]` |
| Footer kickers (`// Quick links`, `// Contact`) | `text-white/55 text-[11px]` | `text-white/70 text-[12px]` |
| Footer nav + contact links | `text-white/85 text-sm` | `text-white/90 text-[15px]` with `hover:text-goldsoft` |

### Animation pass — verified by Playwright tests

`tests/animations.spec.ts` — **7/7 passing**:

```
✓ hero CTA declares transition + motion-safe scale
✓ header desktop Get-a-Quote pill has transition + scale
✓ quote form submit declares transition + scale
✓ event-type card lifts on hover
✓ blog card lifts on hover
✓ mobile menu opens on tap, closes via item click, declares slide-in animation
✓ quote form success renders QuoteResultCard via stubbed API
```

### SVGs shipped

- **`components/SoundwaveDivider.tsx`** — placed 3× on `/` (between Capabilities/Setlist/Notes/CTA) and 1× each on `/event-types`, `/blog`, `/quote` (between hero ↔ content).
- **`components/RecordIcon.tsx`** — placed once: above the "Tell us about your night." headline on the final `/` CTA.

### Files changed (B1 + B2 + B3 + C)

```
app/blog/[slug]/page.tsx        — text sizes, hover colors
app/blog/page.tsx               — page kicker, soundwave import + placement
app/event-types/page.tsx        — page kicker, soundwave import + placement
app/globals.css                 — mobile-menu-in keyframe
app/page.tsx                    — section kickers, see-all links, capability cards, final-CTA pill, soundwave + RecordIcon placement
app/quote/page.tsx              — page kicker, soundwave import + placement
components/BlogCard.tsx         — body, date, kicker, hover lift + shadow, hover:text-goldsoft
components/EventTypeCard.tsx    — dt/dd sizes, kicker, hover lift + shadow, hover:text-goldsoft
components/Footer.tsx           — contrast fix, link sizes, kicker bumps, hover:text-goldsoft, italic taupe tagline
components/FormField.tsx        — label 13→15px, hint 12→13px, white/85→white/90
components/Header.tsx           — desktop CTA scale, nav text-sm→text-[15px], mobile drawer slide-in animation
components/Hero.tsx             — badge, subhead, CTAs, stats card, cities all bumped; CTA hover scale + shadow
components/QuoteForm.tsx        — inputs 14→15px, submit pulse during "Sending…", success div fade-up, hint sizes
components/QuoteResult.tsx      — body, breakdown, disclaimer all bumped
components/RecordIcon.tsx       — NEW
components/SoundwaveDivider.tsx — NEW
playwright.config.ts            — NEW
tests/animations.spec.ts        — NEW
audit/run-screenshots.mjs       — NEW (capture script)
audit/probe.mjs                 — NEW (font-size / overflow probe)
```

## Recommended order of fixes (smallest scope first)

1. **B1-typography pass** — bump `text-[13px]` form labels, `text-sm` hero subhead and card bodies, footer fades to readable sizes/contrast. (Touches `FormField`, `QuoteForm`, `Hero`, `EventTypeCard`, `BlogCard`, `Footer`, `app/page.tsx`.)
2. **B2-animation pass** — adopt the consistent button + card hover spec; add mobile-menu keyframe; submit pulse; success entrance. (Touches `Header`, `Hero`, `EventTypeCard`, `BlogCard`, `QuoteForm`, `app/globals.css`, `app/page.tsx`.)
3. **B3-SVG additions** — add `SoundwaveDivider` + `RecordIcon`; place soundwave between dark sections; place RecordIcon next to final CTA. (New files; touches `app/page.tsx`, `app/event-types/page.tsx`, `app/blog/page.tsx`, `app/quote/page.tsx`.)
4. **C-tests** — `tests/animations.spec.ts` + `playwright.config.ts`.
5. **Re-screenshot** the affected routes into `audit/screenshots/after/` and update this report with side-by-side notes.
