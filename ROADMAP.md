# Sawaed Al‑Islah Platform (Education, Humanitarian Aid Organization Website)

A bilingual (AR/EN), mobile‑first Next.js website for a non‑profit focused on education and humanitarian aid. The platform highlights campaigns, paths (program areas), transparency reports, media gallery, and a volunteer portal, with a future roadmap for secure donations, admin panel, and dynamic content.

This README reflects the latest scope updates and current repository state.

---

## 1) Status Snapshot (Codebase Analysis)

- Framework: Next.js App Router (TypeScript), Tailwind, Shadcn UI.
- i18n/RTL: Implemented via translations file and hook:
  - Translations: [src/lib/translations.ts](d:\KODENEX\ Official Sites\sawaid\src\lib\translations.ts)
  - Hook: "@/hooks/use-translation" (used in pages like [src/app/page.tsx](d:\KODENEX\ Official Sites\sawaid\src\app\page.tsx), [src/app/about/page.tsx](d:\KODENEX\ Official Sites\sawaid\src\app\about\page.tsx), [src/app/volunteer/page.tsx](d:\KODENEX\ Official Sites\sawaid\src\app\volunteer\page.tsx))
- Site shell and branding:
  - Root layout: [src/app/layout.tsx](d:\KODENEX\ Official Sites\sawaid\src\app\layout.tsx)
  - Header/Footer: [src/components/layout/header.tsx](d:\KODENEX\ Official Sites\sawaid\src\components\layout\header.tsx), [src/components/layout/footer.tsx](d:\KODENEX\ Official Sites\sawaid\src\components\layout\footer.tsx)
  - Logo component: [src/components/shared/logo.tsx](d:\KODENEX\ Official Sites\sawaid\src\components\shared\logo.tsx)
- Content placeholders (static):
  - Homepage: [src/app/page.tsx](d:\KODENEX\ Official Sites\sawaid\src\app\page.tsx)
  - About: [src/app/about/page.tsx](d:\KODENEX\ Official Sites\sawaid\src\app\about\page.tsx)
  - Volunteer: [src/app/volunteer/page.tsx](d:\KODENEX\ Official Sites\sawaid\src\app\volunteer\page.tsx)
  - Static data: [src/lib/data.ts](d:\KODENEX\ Official Sites\sawaid\src\lib\data.ts)
- Known blocker:
  - Middleware currently redirects all non‑essential routes to “/”, making subpages inaccessible in production:
    - [src/middleware.ts](d:\KODENEX\ Official Sites\sawaid\src\middleware.ts)
- Docs in repo:
  - Alignment summary: [PROPOSAL_ALIGNMENT.md](d:\KODENEX\ Official Sites\sawaid\PROPOSAL_ALIGNMENT.md)
  - Early blueprint: [docs/blueprint.md](d:\KODENEX\ Official Sites\sawaid\docs\blueprint.md)

Conclusion: Static pages, shell, and translations are in place. Payments, CMS/database, admin dashboard, and APIs are not wired.

---

## 2) Updated Scope (What to Build First)

Per the latest Technical Scope:

- Branding
  - Use green logo; primary color #1B7B3A; Cairo/Poppins fonts; clean/minimal mobile design.
- Navigation (exact order)
  1. About Us
  2. Paths
  3. Campaigns
  4. Media Gallery
  5. Volunteer
  6. Transparency
  7. Contact Us
  - Remove “News/Challenges” from top nav; show them only near the homepage footer.
- Homepage
  - Hero with 3 rotating images, title, subtext, optional intro video popup.
  - CTAs: Donation Fields, Register as Sponsor, Volunteer Now.
  - Achievements (replace “Global Impact”) with animated counters.
  - Featured Campaigns; below it show 4 Paths:
    - Education & Empowerment
    - Sponsoring Reformers
    - Educational Nurseries
    - General Reform Programs
    - Under each path: dynamically list programs/projects.
  - Qur’anic verse block (Hud: 88) in green.
  - News & Challenges only at bottom of homepage.
- Key pages
  - About, Paths, Campaigns, Media Gallery, Volunteer, Transparency, Contact.
- Zakat Stamp System
  - Admin toggles a Zakat status per project/campaign; green “Zakat Supported” or red “Not Supported” appears on cards and details; persisted in DB.
- Admin Panel
  - CRUD for Paths, Campaigns, Projects. Manage donor/volunteer submissions, upload transparency docs and gallery items, toggle Zakat.
- Functional
  - AR/EN switch, dynamic linking between paths/campaigns/projects, donation progress bars, one‑time/recurring donations, volunteer registration, API‑ready for mobile.

---

## 3) Tech Stack

- Frontend: Next.js (App Router), React, TypeScript, Tailwind CSS, Shadcn UI.
- i18n: Custom translations file + RTL support ([translations.ts](d:\KODENEX\ Official Sites\sawaid\src\lib\translations.ts)).
- Build/deploy: Vercel or similar (TBD).
- Backend (recommended): Supabase (see Section 6).
- Payments (later): Stripe (no monthly fee; pay per transaction).
- Email (later): Resend/SendGrid (free tier).

---

## 4) Getting Started (Local)

- Requirements: Node 18+.
- Install: 
  - Windows terminal
    - npm install
    - npm run dev
- Open http://localhost:3000

Environment variables (create .env.local):
- NEXT_PUBLIC_MAINTENANCE=0
- NEXT_PUBLIC_DEFAULT_LOCALE=en

For later phases (when enabled):
- NEXT_PUBLIC_SUPABASE_URL=
- NEXT_PUBLIC_SUPABASE_ANON_KEY=
- SUPABASE_SERVICE_ROLE_KEY=
- STRIPE_SECRET_KEY=
- STRIPE_WEBHOOK_SECRET=
- RESEND_API_KEY=

---

## 5) Known Issues To Fix Early

- Middleware blocks all pages except “/” and assets. Remove/gate redirects before design review:
  - [src/middleware.ts](d:\KODENEX\ Official Sites\sawaid\src\middleware.ts)

Optional maintenance‑mode update (set NEXT_PUBLIC_MAINTENANCE=1 to lock site):

```ts
// filepath: d:\KODENEX\Official Sites\sawaid\src\middleware.ts
import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl

  if (
    pathname.startsWith('/_next') ||
    pathname.startsWith('/api') ||
    pathname === '/favicon.ico' ||
    pathname.startsWith('/Logo')
  ) return NextResponse.next()

  if (process.env.NEXT_PUBLIC_MAINTENANCE === '1') {
    if (pathname === '/') return NextResponse.next()
    return NextResponse.redirect(new URL('/', request.url))
  }

  return NextResponse.next()
}

export const config = {
  matcher: ['/((?!_next/static|_next/image|favicon.ico).*)'],
}
```

---

## 6) Backend Choice: Supabase vs Appwrite (Recommendation)

Recommendation: Supabase.

- Why Supabase fits your constraints (time/skills/no cost):
  - Hosted Postgres with instant REST/GraphQL (via PostgREST), simple SQL modeling.
  - Auth, Storage, Row‑Level Security, Policies out‑of‑the‑box.
  - Generous free tier; zero monthly cost to start.
  - First‑class Next.js examples and client libraries.
  - Easy to evolve from static → dynamic without managing servers.

Appwrite is also solid, but typically requires more service setup/ops choices for similar outcomes. For fastest path with minimal ops, Supabase is simpler.

---

## 7) Data Model (Supabase SQL, minimal MVP)

Key entities: paths, programs (projects), campaigns, donations, volunteers, media, posts, reports, users.

```sql
-- Paths (4 main tracks)
create table paths (
  id uuid primary key default gen_random_uuid(),
  slug text unique not null,
  title_en text not null,
  title_ar text not null,
  description_en text,
  description_ar text,
  created_at timestamptz default now()
);

-- Programs/Projects linked to paths
create table programs (
  id uuid primary key default gen_random_uuid(),
  path_id uuid references paths(id) on delete cascade,
  slug text unique not null,
  title_en text not null,
  title_ar text not null,
  summary_en text,
  summary_ar text,
  body_en text,
  body_ar text,
  zakat_supported boolean not null default false,
  cover_url text,
  created_at timestamptz default now()
);

-- Campaigns, optionally linked to a program
create table campaigns (
  id uuid primary key default gen_random_uuid(),
  program_id uuid references programs(id) on delete set null,
  slug text unique not null,
  title_en text not null,
  title_ar text not null,
  goal_amount numeric not null default 0,
  raised_amount numeric not null default 0,
  urgent boolean not null default false,
  zakat_supported boolean not null default false,
  cover_url text,
  start_at date,
  end_at date,
  created_at timestamptz default now()
);

-- Donations (Stripe payment_intent id stored when integrated)
create table donations (
  id uuid primary key default gen_random_uuid(),
  campaign_id uuid references campaigns(id) on delete set null,
  amount numeric not null,
  currency text not null default 'usd',
  donor_email text,
  donor_name text,
  recurring boolean not null default false,
  payment_ref text, -- stripe payment intent id
  status text not null default 'pending',
  created_at timestamptz default now()
);

-- Volunteer applications
create table volunteers (
  id uuid primary key default gen_random_uuid(),
  full_name text not null,
  email text not null,
  phone text,
  position_id text, -- matches your volunteerPositions keys or separate table later
  message text,
  status text not null default 'new', -- new|reviewed|accepted|rejected
  created_at timestamptz default now()
);

-- Media gallery assets
create table media_assets (
  id uuid primary key default gen_random_uuid(),
  kind text not null, -- image|video
  title_en text,
  title_ar text,
  url text not null,
  thumb_url text,
  tags text[] default '{}',
  created_at timestamptz default now()
);

-- News/Posts (can live only on homepage footer initially)
create table posts (
  id uuid primary key default gen_random_uuid(),
  slug text unique not null,
  title_en text not null,
  title_ar text not null,
  excerpt_en text,
  excerpt_ar text,
  body_en text,
  body_ar text,
  category text, -- news|challenge|update etc.
  published_at timestamptz,
  created_at timestamptz default now()
);

-- Transparency reports
create table reports (
  id uuid primary key default gen_random_uuid(),
  year int not null,
  title_en text not null,
  title_ar text not null,
  pdf_url text not null,
  created_at timestamptz default now()
);

-- Simple RLS example (enable and add policies as you go)
alter table donations enable row level security;
alter table volunteers enable row level security;

-- Public read policies (examples)
create policy "Public read campaigns" on campaigns for select using (true);
create policy "Public read paths" on paths for select using (true);
create policy "Public read programs" on programs for select using (true);
create policy "Public read media" on media_assets for select using (true);
create policy "Public read posts" on posts for select using (true);
create policy "Public read reports" on reports for select using (true);

-- Public write for forms (lock down later with rate limit; allow anonymous inserts)
create policy "Anon create volunteers" on volunteers for insert with check (true);
```

Note: You’ll add Supabase Auth and admin roles later; for MVP keep admin actions behind server routes and service role key.

---

## 8) API Plan (Next.js App Routes)

Public read (SSR/ISR):
- GET /api/paths
- GET /api/paths/[slug]/programs
- GET /api/campaigns?urgent=true
- GET /api/campaigns/[slug]
- GET /api/media
- GET /api/posts?limit=4&category=news
- GET /api/reports

Public forms:
- POST /api/volunteer (create volunteers row)
- POST /api/contact (send email via Resend; optional save)

Donations (later with Stripe):
- POST /api/donations/create-intent
- POST /api/webhooks/stripe

Admin (later, protected):
- CRUD endpoints for paths/programs/campaigns/media/posts/reports
- PATCH /api/campaigns/[id]/zakat (toggle)

---

## 9) Zakat Stamp System (Data + UI)

- Data: campaigns.zakat_supported (boolean), programs.zakat_supported (boolean).
- Admin toggles field via PATCH endpoint.
- UI:
  - On campaign/program cards and detail pages, show:
    - 🟢 “Zakat Supported” if true
    - 🔴 “Zakat Not Supported” if false
- Include in query results and cache/ISR invalidate on change.

---

## 10) Roadmap (Phased, fast and cost‑free to start)

Phase 0 — Unblock and Align Shell (0.5–1 day)
- Fix middleware to allow all routes. See snippet above: [src/middleware.ts](d:\KODENEX\ Official Sites\sawaid\src\middleware.ts)
- Update nav order per scope in header and translations:
  - Header: [src/components/layout/header.tsx](d:\KODENEX\ Official Sites\sawaid\src\components\layout\header.tsx)
  - Translations: [src/lib/translations.ts](d:\KODENEX\ Official Sites\sawaid\src\lib\translations.ts)
  - Remove “News/Challenges” from top; add “Paths”. Keep news in homepage footer.
- Swap logo to green version (already using /Logo path in [logo.tsx](d:\KODENEX\ Official Sites\sawaid\src\components\shared\logo.tsx)); confirm asset.

Phase 1 — Static Website Design (2–4 days)
- Homepage: implement hero rotation (3 images), CTAs, Achievements (replace “Our Global Impact”), Featured Campaigns, 4 Paths block with static programs list, Qur’anic verse section, and footer “News & Challenges” teaser.
  - Files to update: [src/app/page.tsx](d:\KODENEX\ Official Sites\sawaid\src\app\page.tsx), [src/lib/data.ts](d:\KODENEX\ Official Sites\sawaid\src\lib\data.ts), [src/lib/translations.ts](d:\KODENEX\ Official Sites\sawaid\src\lib\translations.ts)
- Create static Paths page (/paths) showing the 4 tracks -> each lists related sample programs.
- Verify About, Volunteer, Transparency, Gallery basic sections exist visually; align copy with translations.
- Accessibility pass (alt text, keyboard focus order, color contrast on green palette).
- Acceptance: All pages reachable, mobile‑friendly, AR/EN switch correct, no runtime errors.

Phase 2 — Supabase Setup & Content Modeling (1–2 days)
- Create Supabase project (free tier). Add tables from Section 7.
- Seed initial Paths/Programs/Campaigns/Posts/Reports to replace hardcoded lists progressively.
- Add simple GET APIs using supabase-js (server components/app routes).
- Replace homepage Featured Campaigns and Paths block with API data; fallback to static if API down.
- Acceptance: SSR fetches render content; no client keys leaked; RLS read policies for public tables.

Phase 3 — Public Forms (Volunteers/Contact) (1 day)
- Wire /api/volunteer to insert into volunteers table and send email notification (Resend free).
- Add basic bot protection (honeypot + server‑side validation).
- Acceptance: Submissions land in DB; minimal rate limit on server (e.g., IP hash + cooldown).

Phase 4 — Admin MVP (2–3 days)
- Auth: Supabase Auth (email magic link) for admins; server‑side verification middleware.
- Admin routes: /admin with CRUD for Paths, Programs, Campaigns, Posts, Reports, Media.
- Add Zakat toggle action on Campaigns/Programs.
- Acceptance: Admin login; CRUD works; Zakat status persists and reflects on front‑end.

Phase 5 — Donations (Stripe) (2–3 days)
- Payment intent API for one‑time and recurring (Stripe subscriptions).
- Campaign‑specific donations via metadata; webhook increases raised_amount.
- Email receipts (Resend) after successful payment.
- Acceptance: Test card works; webhooks update DB; donation reflected in progress bars.

Phase 6 — Transparency & Reports (1 day)
- Upload PDFs to Supabase Storage; index in reports table.
- Transparency page lists reports; download links; optional charts from aggregated DB views.
- Acceptance: Files accessible; SEO meta; AR/EN content.

Phase 7 — Media Gallery (1–2 days)
- Supabase Storage + media_assets table; simple upload via admin.
- Public gallery grid with filters and video support (YouTube/Vimeo or file).
- Acceptance: Thumbnails fast; lazy loading; captions AR/EN.

Phase 8 — SEO, Sitemap, Analytics (0.5–1 day)
- Add sitemap.xml, robots.txt, metadata, OpenGraph images.
- Add simple analytics (Plausible free trial or GA).
- Acceptance: Pages indexed; metadata validated.

Phase 9 — Security, Perf, A11y Hardening (0.5–1 day)
- Rate limiting on POST endpoints, better input validation, CSRF on admin forms.
- Lighthouse pass: 90+ for PWA/Perf/A11y/Best Practices.

Phase 10 — Launch (0.5 day)
- Deploy, set custom domain + SSL.
- Uptime monitor (Cron job or free service).

Note: Timelines are rough and assume a single developer with time constraints.

---

## 11) Navigation and Content Tasks (Static Phase)

- Update translations nav keys:
  - Add “Paths”, remove “News” from nav; keep news/challenges strings for homepage footer only.
  - File: [src/lib/translations.ts](d:\KODENEX\ Official Sites\sawaid\src\lib\translations.ts)
- Header links:
  - Update order/labels in [src/components/layout/header.tsx](d:\KODENEX\ Official Sites\sawaid\src\components\layout\header.tsx)
- Create /paths page with 4 cards (static first), each linking to a sub‑route or anchor (dynamic later).

---

## 12) Folder Highlights

- App routes and pages:
  - [src/app/layout.tsx](d:\KODENEX\ Official Sites\sawaid\src\app\layout.tsx)
  - [src/app/page.tsx](d:\KODENEX\ Official Sites\sawaid\src\app\page.tsx)
  - [src/app/about/page.tsx](d:\KODENEX\ Official Sites\sawaid\src\app\about\page.tsx)
  - [src/app/volunteer/page.tsx](d:\KODENEX\ Official Sites\sawaid\src\app\volunteer\page.tsx)
- Data and i18n:
  - [src/lib/data.ts](d:\KODENEX\ Official Sites\sawaid\src\lib\data.ts)
  - [src/lib/translations.ts](d:\KODENEX\ Official Sites\sawaid\src\lib\translations.ts)
- Layout components:
  - [src/components/layout/header.tsx](d:\KODENEX\ Official Sites\sawaid\src\components\layout\header.tsx)
  - [src/components/layout/footer.tsx](d:\KODENEX\ Official Sites\sawaid\src\components\layout\footer.tsx)
  - [src/components/shared/logo.tsx](d:\KODENEX\ Official Sites\sawaid\src\components\shared\logo.tsx)

---

## 13) Acceptance Criteria (Static Phase)

- All key pages render and are reachable (About, Paths, Campaigns, Gallery, Volunteer, Transparency, Contact).
- Homepage sections implemented as per scope (hero rotation, CTAs, Achievements counters, 4 Paths, verse, footer news/challenges).
- AR/EN fully switchable; RTL correct; branding color #1B7B3A applied.
- No blocking redirects from middleware.

---

## 14) Future Enhancements (After MVP)

- Live chat widget (Crisp free tier).
- Newsletter (tinybird/listmonk/Mailchimp free) and blog CMS authoring.
- Volunteer dashboard (hours, assignments) once auth is in place.
- Mobile app‑ready endpoints (keep REST clean, add pagination and ETags).

---

## 15) Troubleshooting

- If subpages redirect to “/”, disable maintenance mode and/or update middleware:
  - [src/middleware.ts](d:\KODENEX\ Official Sites\sawaid\src\middleware.ts)
- If fonts/colors don’t reflect the new brand, verify Tailwind config and CSS variables in globals:
  - [src/app/layout.tsx](d:\KODENEX\ Official Sites\sawaid\src\app\layout.tsx)
- Translations missing? Search and add keys in:
  - [src/lib/translations.ts](d:\KODENEX\ Official Sites\sawaid\src\lib\translations.ts)

---

## 16) License

Internal project for a non‑profit; add a license if needed.