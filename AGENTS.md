# AGENTS.md — DJ Christina MVP

This file gives Codex context when working in this repo. Read this first.

## What this is

A Next.js 14 (App Router) + TypeScript + Tailwind site for a small local DJ business near
Lawrenceville/Suwanee, GA. It is a real gift project — Logan is building this for his mom.
The brand name "DJ Christina" is a placeholder until confirmed.

## Hard constraints (do not violate without asking)

- No database
- No auth
- No payment processor
- No CMS
- No heavy animation libraries (Framer Motion, GSAP, etc.)
- No fake testimonials, awards, or experience claims
- All private env vars stay server-side only (`RESEND_API_KEY`, `MOM_BOOKING_EMAIL`)

## Tech stack

- Next.js 14 App Router
- TypeScript (strict mode)
- Tailwind CSS 3.4
- Resend for transactional email
- Single API route at `app/api/inquiry/route.ts` (POST only)

## Architecture

```
app/                  # Routes (App Router)
  api/inquiry/        # POST endpoint — validate, quote, email
  blog/[slug]/        # Static blog post pages
components/           # Reusable UI components
lib/                  # Domain logic
  constants.ts        # SINGLE SOURCE OF TRUTH for brand, pricing, copy
  quote.ts            # Quote calculation
  email.ts            # Resend integration + email template
  validation.ts       # Server-side input validation
  blog.ts             # Static blog post data
  format.ts           # Display formatters
types/                # Shared TS types
```

## Where to edit what

- **Pricing** → `lib/constants.ts` → `PRICING` object
- **Brand name, contact placeholders, service area** → `lib/constants.ts` → `BRAND` object
- **Event types and their copy** → `lib/constants.ts` → `EVENT_TYPES` array
- **Blog posts** → `lib/blog.ts` → `BLOG_POSTS` array
- **Email template** → `lib/email.ts` → `renderHtml` and `renderText`
- **Validation rules** → `lib/validation.ts`
- **Theme colors** → `tailwind.config.ts`

## Placeholder convention

Anything that needs replacing before launch is marked with `PLACEHOLDER` in a comment.
To find every spot: `grep -r "PLACEHOLDER" .`

## Conventions

- Mobile-first Tailwind. Default styles target ~375px width; `sm:` and up scale up.
- Every form field uses the `<FormField>` component for label/error/hint consistency.
- Server-side validation is authoritative. Client validation is for UX only.
- Errors shown to users are sanitized strings, never raw exceptions.
- Honeypot field is named `website` and rejected if non-empty.
- Email subjects follow: `New DJ Christina Booking Inquiry — [Event Type] — Estimated $X–$Y`

## How Logan likes to work

- He's learning — explain reasoning when making non-obvious changes, not just the diff.
- He prefers step-by-step over big leaps.
- He's on a MacBook Pro M4. Terminal is Warp. Editor is VS Code.
- Don't add dependencies casually. Justify any new package in chat first.

## Running locally

```bash
npm install
cp .env.example .env.local   # then fill in values
npm run dev
```

## Common tasks

- **Add a new event type:** edit `EVENT_TYPES` in `lib/constants.ts` and `basePriceByEventType` in `PRICING`. The event-types page and quote dropdown read from these automatically.
- **Change pricing:** edit `PRICING` in `lib/constants.ts`. Quote math reads from there.
- **Add a blog post:** append to `BLOG_POSTS` in `lib/blog.ts`. Static params regenerate at build.
- **Tweak the email template:** edit `renderHtml`/`renderText` in `lib/email.ts`.
