# DJ Christina — Local DJ Site (MVP)

A Next.js + TypeScript + Tailwind site for a small local DJ business.
Sends inquiry emails via Resend. No database, no auth, no payments.

## Local setup

1. Install Node 18.18+ and a recent npm.
2. Install dependencies:
   ```bash
   npm install
   ```
3. Create your env file:
   ```bash
   cp .env.example .env.local
   ```
4. Fill in `.env.local`:
   - `RESEND_API_KEY` — from https://resend.com (server-only)
   - `MOM_BOOKING_EMAIL` — where inquiry emails should land (server-only)
   - `NEXT_PUBLIC_SITE_URL` — `http://localhost:3000` for local
5. Run the dev server:
   ```bash
   npm run dev
   ```
6. Open http://localhost:3000

### Test the form
- Visit `/quote`
- Fill the required fields
- Submit — you should see the on-screen quote
- Check the inbox at `MOM_BOOKING_EMAIL`

## Deploy to Vercel

1. Push the project to GitHub.
2. In Vercel, **Add New Project → Import** the repo.
3. **Project Settings → Environment Variables**, add:
   - `RESEND_API_KEY`
   - `MOM_BOOKING_EMAIL`
   - `NEXT_PUBLIC_SITE_URL` (your production URL)
4. Click **Deploy**.
5. After deploy, test the form on the production URL and confirm the email lands.

## Resend notes

- Resend requires an API key. The free tier is fine for low volume.
- The `from` address in `lib/email.ts` is set to `onboarding@resend.dev` so sending works on day one.
- Before real production use, **verify a domain** in Resend (e.g. `bookings@djchristina.com`) and replace the `FROM_ADDRESS` constant in `lib/email.ts`.

## Editing content

- Brand name, contact placeholders, service area, pricing → `lib/constants.ts`
- Blog posts → `lib/blog.ts`
- Email template → `lib/email.ts`
- Validation rules → `lib/validation.ts`
- Quote math → `lib/quote.ts`
