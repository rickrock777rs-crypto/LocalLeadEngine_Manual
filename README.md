# Local Ad Battle — MVP

A competitive creator arena where local businesses get featured in creative
challenges, two creators battle head-to-head to make the best ad/flyer/promo
concept, the public votes, and a ranked leaderboard tracks creator wins.

Built with Next.js 16 (App Router, TypeScript, Tailwind v4). Mock data +
an in-memory store stand in for a database for now — see "What still needs
to be connected later" below.

## 1. What was built

**Core loop:** business challenge → creator battle → public vote → winner →
leaderboard update.

- **Home page** — hero, featured battle, how-it-works, business/creator
  benefits, active battles, leaderboard preview, pricing/sponsorship, FAQ,
  final CTA.
- **Active battles** (`/battles`) — all battles with status filters (live,
  upcoming, completed) and category filters.
- **Individual battle page** (`/battles/[id]`) — business + brief, side-by-side
  creator submissions, voting criteria, countdown timer, live vote
  percentages, winner banner once completed, share buttons.
- **Voting system** — one vote per browser session, enforced server-side.
  See "How to test voting" below.
- **Leaderboard** (`/leaderboard`) — ranked creators, visible rank-score
  formula, badges.
- **Creator profiles** (`/creators/[username]`) — bio, skills, record, rank,
  best-performing submission, past battles, social link placeholders.
- **Business challenge request** (`/challenge`) — full intake form, posts to
  `/api/challenge-request`.
- **Creator signup** (`/join`) — full intake form, posts to
  `/api/creator-signup`.
- **Rules** (`/rules`), **Pricing/Sponsorship** (`/pricing`), and legal
  placeholders (`/legal/*`: terms, privacy, creator agreement, business usage
  rights, voting rules, sponsor disclosure).
- **Admin view** (`/admin`) — read-only dashboard over the in-memory store
  (battles, challenge requests, creator signups), plus a list of admin
  actions the data layer already supports (`declareWinner()` etc.) that just
  need UI wired up.

Seeded with 5 mock businesses, 6 mock creators, and 5 battles in a mix of
`upcoming`, `live`, and `completed` states so every UI state is visible
without any manual setup.

## 2. File / page structure

```
src/
  app/
    page.tsx                     Home page
    battles/page.tsx              Battle listing + filters
    battles/[id]/page.tsx         Individual battle + voting
    leaderboard/page.tsx
    creators/[username]/page.tsx
    challenge/page.tsx            Business challenge request form
    join/page.tsx                 Creator signup form
    rules/page.tsx
    pricing/page.tsx
    admin/page.tsx                Read-only admin dashboard
    legal/*/page.tsx              Terms, privacy, creator agreement, etc.
    api/vote/route.ts             GET (status) / POST (cast vote)
    api/challenge-request/route.ts
    api/creator-signup/route.ts
  components/                    Reusable UI: HeroSection, BattleCard,
                                  BattleComparison, VoteButton, CountdownTimer,
                                  LeaderboardTable, CreatorCard, BusinessCard,
                                  ChallengeRequestForm, CreatorSignupForm,
                                  PricingCard, StatusBadge, WinnerBanner,
                                  HowItWorksSection, FAQSection, Nav, Footer,
                                  SubmissionPanel, ShareButtons, LegalPage
  lib/
    types.ts                     Business, Creator, Battle, Submission, Vote,
                                  ChallengeRequest, CreatorSignup — modeled to
                                  map 1:1 onto future DB tables
    data/                        Seed mock data (businesses, creators,
                                  submissions, battles, pricing, faq)
    store.ts                     In-memory mutable store (votes, battle
                                  totals, form submissions) + castVote(),
                                  declareWinner()
    ranking.ts                   Rank score formula, badge logic,
                                  applyBattleResult()
    battle-view.ts                Joins battle+business+creators+submissions
                                  +vote counts into one view model
    format.ts                    Vote %, countdown text, status/badge labels
public/
  businesses/ creators/ submissions/   Generated SVG placeholder art
```

## 3. Setup steps

```bash
npm install
npm run dev      # http://localhost:3000
```

`npm run build && npm run start` for a production build. No environment
variables or external services are required to run the MVP as-is.

## 4. How to test voting

1. Go to `/battles` and open any battle with a **Live Voting** status (e.g.
   "Create the Best Happy Hour Promo" or the featured Plaza Taco Bar battle).
2. Click either creator's "Tap to vote" panel. The vote is recorded via
   `POST /api/vote`, percentages update immediately, and a confirmation
   message appears.
3. Reload the page — your vote persists (checked via a `sessionId` stored in
   `localStorage`, validated server-side in `src/lib/store.ts`), and the
   button state changes to show results instead of letting you vote again.
4. Try voting from a different browser (or an incognito window) to see an
   independent session cast a second, separate vote.
5. Open `/admin` to see the battle's updated `total_votes` reflected live.

Anti-cheat is intentionally lightweight for the MVP (see comments in
`src/lib/store.ts::castVote`) — future versions should add login-required
voting, email verification, IP throttling, device fingerprinting, or admin
review before finalizing a winner.

## 5. What still needs to be connected later

- **Persistence**: `src/lib/store.ts` is an in-memory singleton — it resets
  on server restart and won't work across multiple serverless instances.
  Swap its functions for real queries against Postgres/Supabase; the
  `Business`/`Creator`/`Battle`/`Submission`/`Vote`/`ChallengeRequest`/
  `CreatorSignup` types in `src/lib/types.ts` are already shaped as future
  DB tables.
- **Admin actions**: `declareWinner()` and `castVote()` exist in the data
  layer but aren't exposed as buttons in `/admin` yet — wiring up "Create
  Battle," "Close Voting," "Declare Winner," and "Feature on Homepage"
  controls is mostly a UI task at this point.
- **Payments**: pricing tiers route to the `/challenge` form
  ("Request Sponsorship Info"), not a checkout. No Stripe/payment
  integration yet.
- **Real accounts/auth**: there's no login for creators or businesses.
  Voting is anonymous with a `localStorage` session id.
- **Real media**: submission images/business photos are generated SVG
  placeholders (`public/businesses`, `public/creators`, `public/submissions`)
  — swap in real uploads/CDN URLs via `image_url`/`avatar_url`/`asset_url`
  fields once creators can upload.
- **Comments**: the battle page has a placeholder note where a comments
  section will eventually go.

## 6. Next 5 improvements after MVP validation

1. Wire the `/admin` actions (create battle, open/close voting, declare
   winner) to real buttons instead of read-only tables.
2. Add creator/business accounts with real auth, so creators can submit
   their own work and businesses can track their own challenge requests.
3. Stronger vote integrity: login-required or email-verified voting, IP
   throttling, and/or admin review before a winner is finalized.
4. Payment processing for the paid sponsorship tiers (Stripe), plus
   automated recap/asset delivery to the winning business.
5. Creator-vs-creator direct challenges and automated matchmaking instead of
   matching only through business challenge requests.
