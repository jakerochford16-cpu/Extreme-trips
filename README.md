# Outer Line

A travel app for people who don't want a sightseeing itinerary — they want to know
what a country's extreme scene actually looks like: wild bivouacs, guided high-risk
climbs, outback hunts, cage-free wreck dives, cliff-edge camping. Browse by country,
see what's on offer, and what it costs, requires, and risks.

```
apps/
  web/   Next.js (App Router) site — this is what actually gets deployed.
         Reads the curated data straight from apps/web/src/data/countries.json,
         bundled at build time. No database, no live API, no env vars needed
         to run it in production.
  api/   Express + Prisma (SQLite) — a local authoring/dev tool, not part of
         the deployed site. apps/api/prisma/data.ts is the single source of
         truth for content; this app seeds a local database from it (handy
         for poking at the data with Prisma Studio) and can regenerate the
         JSON that apps/web ships.
```

### Deploying

`apps/web` is a self-contained Next.js app with no external dependencies at
runtime — it can be deployed to Vercel (or any Next.js host) by pointing at
this repo with **Root Directory set to `apps/web`**. No environment variables,
no database, no separate backend to stand up. Every push to the branch Vercel
watches redeploys automatically.

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
