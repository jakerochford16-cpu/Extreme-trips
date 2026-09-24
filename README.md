# Outer Line

A travel app for people who don't want a sightseeing itinerary — they want to know
what a country's extreme scene actually looks like: wild bivouacs, guided high-risk
climbs, outback hunts, cage-free wreck dives, cliff-edge camping. Browse by country,
see what's on offer, and what it costs, requires, and risks.

```
apps/
  web/   Next.js (App Router) site — this is what actually gets deployed.
         Reads the curated data straight from apps/web/src/data/countries.json,
         bundled at build time — no database or env vars needed for that part.
         Accounts (sign-in, favorites/reviews synced across devices) are the
         one piece that needs external services: Clerk for auth and a small
         Postgres database (two tables) for the synced data. See Accounts below.
  api/   Express + Prisma (SQLite) — a local authoring/dev tool, not part of
         the deployed site. apps/api/prisma/data.ts is the single source of
         truth for content; this app seeds a local database from it (handy
         for poking at the data with Prisma Studio) and can regenerate the
         JSON that apps/web ships.
```

### Deploying

`apps/web` can be deployed to Vercel (or any Next.js host) by pointing at this
repo with **Root Directory set to `apps/web`**. Every push to the branch
Vercel watches redeploys automatically. Browsing, search, favorites-on-this-
device, and reviews-on-this-device all work with zero config. Two features
need environment variables set in Vercel (Project Settings → Environment
Variables): the trip planner (`GEMINI_API_KEY`, see below) and accounts
(`NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY`, `CLERK_SECRET_KEY`, `DATABASE_URL`,
`DIRECT_URL`, see Accounts below) — everything else works without them.

### Data model

Each **Activity** belongs to a **Country** and carries:

- `category`, `region`, `description`
- `difficulty` (ADVANCED / EXPERT / EXTREME / INSANE)
- `riskLevel` (MODERATE / HIGH / SEVERE / EXTREME)
- `costType` (FREE / VARIES / PAID) + a human cost estimate
- `permitRequired`, `guideRequired`, `bestSeason`
- `latitude`/`longitude`, used by the map view
- `categoryGroup` — a broad taxonomy (Mountaineering & Climbing, Ice & Snow, Air &
  Jumps, etc., see `apps/api/src/categoryGroups.ts`) derived from the specific
  `category` string, used to drive the per-country filter chips and the map legend

Content is hand-curated to start (see `apps/api/prisma/data.ts`) — it's a real,
researched dataset across 9 countries (Switzerland, Australia, New Zealand,
Norway, Nepal, Peru, South Africa, Iceland, Canada), not placeholder text. Every
entry is a **starting point, not an instruction** — verify permits, conditions
and costs with a local guide or operator before you go.

### Map view

`/map` shows every activity across every country as a pin on one interactive map
(OpenStreetMap tiles, no API key required, CSS-filtered to match the dark theme),
filterable by country and category, colored by category, with a popup linking
into the write-up. Each country page also embeds the same map scoped to its own
activities (and whatever category filter is active).

### Trip planner (`/plan`)

An AI chat that answers open-ended trip-logistics questions ("I land in
Bishkek on the 5th, I want to ride horses") — not limited to the 9 curated
countries, though it'll point into the app's own write-ups when they overlap.
Runs on the Gemini API (`gemini-flash-latest`), chosen specifically because
Google's free tier is actually free indefinitely (rate-limited, no credit
card) rather than a paid trial.

- Get a free key at [aistudio.google.com/apikey](https://aistudio.google.com/apikey)
- Locally: copy `apps/web/.env.local.example` to `apps/web/.env.local` and
  paste the key in as `GEMINI_API_KEY`
- On Vercel: Project Settings → Environment Variables → add `GEMINI_API_KEY`,
  then redeploy

Without the key set, `/plan` still renders — it just shows a clear "not
configured yet" message instead of a reply, rather than erroring out.

The system prompt (`apps/web/src/app/api/plan/route.ts`) is given a compact
summary of every activity in the dataset so it can reference and link to
existing write-ups; the rest of its knowledge is the model's own.

### Accounts

Favorites and reviews always work without signing in — stored on that device
only, same as before. Signing in (via Clerk, top-right nav) additionally syncs
both to a Postgres database keyed to your account, so they follow you across
devices. The first time someone with existing device-only data signs in,
`AccountSync` (`apps/web/src/components/AccountSync.tsx`) pushes it into their
new account once, then clears the local copy.

- Get free Clerk keys at [clerk.com](https://clerk.com) → Dashboard → API Keys
- Get a free Postgres database at [supabase.com](https://supabase.com) → New
  project → Project Settings → Database → "Connection pooling" for
  `DATABASE_URL` (port 6543) and the session-mode pooler for `DIRECT_URL`
  (port 5432)
- Run `apps/web/scripts/schema.sql` against that database once, before first
  use (easiest via the Supabase SQL editor — paste and run)
- Locally: copy `apps/web/.env.local.example` to `apps/web/.env.local` and
  fill in all four values
- On Vercel: Project Settings → Environment Variables → add all four, then
  redeploy

Without these set, the nav's "Sign in" still renders but Clerk has nothing to
authenticate against — set all four together, not partially.

### Monetization

Three pieces, all off/zero by default and each independent of the others:

- **Sponsored placements** — `apps/web/src/lib/sponsorships.ts` holds a
  manually-curated list of activity ids with a paid featured slot (see
  `/partner`). A sponsored activity gets a "Featured" badge and sorts first
  in the default browse order everywhere; explicit sorts (most-extreme-first,
  free-first, etc.) are left un-nudged. Deliberately kept separate from the
  curated content pipeline in `apps/api` — flipping a placement on/off is
  just editing that one list and redeploying. Only add an id once someone's
  actually paid for it (see the honest-reviews reasoning elsewhere in this
  app); the homepage's "Sponsored placements" stat reflects this list live,
  so it stays accurate rather than a hardcoded number.
- **`/partner`** — a page for guide/tour operators to inquire about buying a
  featured slot, with a mailto CTA. Update `CONTACT_EMAIL` in
  `apps/web/src/app/partner/page.tsx` if that address changes.
- **Affiliate script slot** — `apps/web/src/components/AffiliateScript.tsx`
  renders a single site-wide `<script>` tag when
  `NEXT_PUBLIC_AFFILIATE_SCRIPT_SRC` is set, for an auto-affiliate network
  (Skimlinks, VigLink/Sovrn Commerce, etc.) that rewrites eligible outbound
  links in the browser — no per-link setup needed, which fits this site since
  guide links (`lib/guideLinks.ts`) point to a search, not one fixed
  merchant. Sign up with one of those services, get a publisher script URL,
  set the env var in Vercel, redeploy.

### Security

- **Auth & access control** — every route that reads/writes account data
  checks a real Clerk session server-side (`auth()` in each `api/*` route)
  and scopes every query by that session's `userId`, which is never taken
  from client input. That's the practical equivalent of row-level security
  here: this app connects to Postgres directly with a privileged connection
  (via `pg`, see `lib/db.ts`), not through Supabase's client SDK/PostgREST,
  so Postgres-level RLS policies would have no effect regardless — the
  connecting role would bypass them. Passwords, session cookies, login rate
  limiting and bot protection on sign-in are all handled by Clerk directly;
  this app never touches a password.
- **Input validation** — `lib/validation.ts` validates and size-caps every
  field the account-data routes accept (activity id shape, rating range,
  review text length, sync payload array sizes) before it reaches a query.
  All database queries are parameterized (`lib/serverData.ts`) — no string
  concatenation into SQL anywhere.
- **Rate limiting** — `lib/rateLimit.ts` is a best-effort, per-instance
  sliding-window limiter (no external store like Upstash Redis is wired up,
  so it only throttles requests landing on the same warm serverless
  instance, not globally) applied to every write endpoint and to `/api/plan`
  (keyed by IP, since that one has no auth) so it can't be used as a free
  unlimited LLM proxy.
- **Headers** — `next.config.ts` sets a Content-Security-Policy scoped to
  the actual external resources this site loads (Clerk, the Skimlinks
  affiliate script, OpenStreetMap tiles), plus
  `X-Content-Type-Options`, `X-Frame-Options: DENY`, `Referrer-Policy`,
  `Permissions-Policy` and `Strict-Transport-Security`. Verified with zero
  CSP violations across the homepage, Clerk sign-in, and the map. HTTPS
  itself is enforced by Vercel at the platform level.
- **Not applicable** — no file uploads exist anywhere in this app, and there
  is no "rewards" feature.

### Legal, compliance & site health

- **`/privacy`** and **`/terms`** — real, specific pages describing what
  this app actually does (not boilerplate templates), listing the real
  third parties data passes through (Clerk, Supabase/Postgres, Google
  Gemini, Skimlinks).
- **Cookie consent** — `components/CookieConsent.tsx` is a real gate, not
  decorative: Clerk's session cookie is essential and always active (the
  site can't function without it), but `AffiliateScript` only loads the
  Skimlinks script if the visitor has accepted (`lib/cookieConsent.ts`,
  localStorage-based, same pattern as favorites/reviews). Vercel
  Analytics/Speed Insights are cookieless and run regardless, per their own
  design.
- **Analytics** — `@vercel/analytics` and `@vercel/speed-insights`, added
  in `app/layout.tsx`. Needs "Web Analytics" enabled in the Vercel project
  dashboard (Analytics tab) to actually start showing data — the code
  alone doesn't turn it on.
- **Images** — source files in `apps/web/public/images` are pre-compressed
  (resized to the largest size they're ever actually displayed at, then
  re-encoded); Next.js's Image component further optimizes/resizes what's
  actually served to each visitor on top of that.
- **Alt text** — content photos (activity/country cards, hero images) carry
  descriptive alt text; nothing left as an empty placeholder.
- **Color contrast** — audited every `text-white/N` opacity value against
  both background colors used (`#0b0a08` and the `surface` card color
  `#131009`) against WCAG AA (4.5:1 for normal text); `white/40` was the
  only value that failed and has been bumped to `white/50` everywhere it
  was used as real text content (input placeholders, which have looser
  requirements, were left alone).

### Running it locally

Just the website (what's actually deployed — this is normally all you need):

```bash
npm install
npm run dev:web
```

Open `http://localhost:3000`.

If you want the local authoring database too (Prisma Studio, exploring the data
with SQL, etc.) — optional, not needed to run the site itself:

```bash
cd apps/api
cp .env.example .env
npm run prisma:migrate
npm run seed
```

### Adding a country or activity

Edit the `data` array in `apps/api/prisma/data.ts`, then regenerate the JSON
the website reads:

```bash
npm run build:data
```

Commit the updated `apps/web/src/data/countries.json` along with your change to
`data.ts` — that JSON file is what the deployed site actually serves, so both
need to move together. There's no admin UI yet; everything ships through this
file until user/community submissions are built.

### Roadmap (not yet built)

- Accounts + saved trips
- Community submissions and condition reports
- Native/mobile client (would talk to a revived version of `apps/api`, or a
  new backend, once there's a reason for one)
