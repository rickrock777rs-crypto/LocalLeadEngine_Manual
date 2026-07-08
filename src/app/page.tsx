import Link from "next/link";
import { HeroSection } from "@/components/hero-section";
import { HowItWorksSection } from "@/components/how-it-works-section";
import { FAQSection } from "@/components/faq-section";
import { BattleCard } from "@/components/battle-card";
import { LeaderboardTable } from "@/components/leaderboard-table";
import { PricingCard } from "@/components/pricing-card";
import { StatusBadge } from "@/components/status-badge";
import { CountdownTimer } from "@/components/countdown-timer";
import { getAllBattleViewModels } from "@/lib/battle-view";
import { getAllCreators } from "@/lib/store";
import { pricingTiers } from "@/lib/data/pricing";
import { homeFAQ } from "@/lib/data/faq";

export const dynamic = "force-dynamic";

const BUSINESS_BENEFITS = [
  "Get a professionally-made ad, flyer, or promo concept without hiring an agency.",
  "See two creative directions competing head-to-head instead of gambling on one freelancer.",
  "Walk away with a ready-to-use asset the public already voted as the winner.",
  "Get free exposure to the local audience following the battle.",
];

const CREATOR_BENEFITS = [
  "Build a public track record of wins, losses, and rank score you can show clients.",
  "Get real feedback from real viewers voting on your work — not just a portfolio nobody reads.",
  "Compete in a category you specialize in, from flyers to short-form video.",
  "Climb the leaderboard and earn badges like Battle Tested, Local Favorite, and Champion Creator.",
];

export default function HomePage() {
  const battleViewModels = getAllBattleViewModels();
  const featured = battleViewModels.find((v) => v.battle.featured) ?? battleViewModels[0];
  const activeBattles = battleViewModels
    .filter((v) => v.battle.status === "live" || v.battle.status === "upcoming")
    .slice(0, 3);
  const creators = getAllCreators();

  return (
    <>
      <HeroSection />

      {featured && (
        <section className="mx-auto max-w-6xl px-4 py-16 sm:px-6">
          <div className="mb-6 flex items-center justify-between">
            <div>
              <p className="text-xs font-semibold uppercase tracking-wide text-brand">
                Featured battle
              </p>
              <h2 className="mt-2 text-3xl font-extrabold tracking-tight text-foreground">
                {featured.battle.title}
              </h2>
            </div>
            <StatusBadge status={featured.battle.status} />
          </div>

          <div className="grid gap-6 rounded-2xl border border-border bg-surface p-6 lg:grid-cols-[1fr_1fr_auto]">
            <FeaturedSide label="Creator A" name={featured.creatorA.name} votes={featured.votesA} side="a" />
            <FeaturedSide label="Creator B" name={featured.creatorB.name} votes={featured.votesB} side="b" />
            <div className="flex flex-col items-start justify-between gap-4 lg:items-end lg:text-right">
              <div>
                <p className="text-xs text-muted">
                  {featured.business.name} · {featured.business.category}
                </p>
                {featured.battle.status === "live" && (
                  <p className="mt-1 font-mono text-sm text-brand">
                    <CountdownTimer endsAt={featured.battle.voting_ends_at} />
                  </p>
                )}
              </div>
              <Link
                href={`/battles/${featured.battle.id}`}
                className="rounded-full bg-brand px-5 py-2.5 text-sm font-bold text-brand-ink transition hover:opacity-90"
              >
                View Battle
              </Link>
            </div>
          </div>
        </section>
      )}

      <HowItWorksSection />

      <section className="border-y border-border bg-surface">
        <div className="mx-auto grid max-w-6xl gap-10 px-4 py-16 sm:px-6 md:grid-cols-2">
          <BenefitBlock
            eyebrow="For businesses"
            title="Why local businesses use it"
            items={BUSINESS_BENEFITS}
            accent="side-b"
          />
          <BenefitBlock
            eyebrow="For creators"
            title="Why creators join"
            items={CREATOR_BENEFITS}
            accent="side-a"
          />
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 py-16 sm:px-6">
        <div className="mb-6 flex items-end justify-between">
          <div>
            <p className="text-xs font-semibold uppercase tracking-wide text-brand">Active battles</p>
            <h2 className="mt-2 text-3xl font-extrabold tracking-tight text-foreground">
              Battles happening right now
            </h2>
          </div>
          <Link href="/battles" className="text-sm font-semibold text-brand hover:underline">
            View all battles →
          </Link>
        </div>
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {activeBattles.map((vm) => (
            <BattleCard key={vm.battle.id} vm={vm} />
          ))}
        </div>
      </section>

      <section className="border-y border-border bg-surface">
        <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6">
          <div className="mb-6 flex items-end justify-between">
            <div>
              <p className="text-xs font-semibold uppercase tracking-wide text-brand">Leaderboard</p>
              <h2 className="mt-2 text-3xl font-extrabold tracking-tight text-foreground">
                Top-ranked creators
              </h2>
            </div>
            <Link href="/leaderboard" className="text-sm font-semibold text-brand hover:underline">
              Full leaderboard →
            </Link>
          </div>
          <LeaderboardTable creators={creators} limit={5} />
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 py-16 sm:px-6">
        <div className="mb-10 max-w-xl">
          <p className="text-xs font-semibold uppercase tracking-wide text-brand">
            Pricing &amp; sponsorship
          </p>
          <h2 className="mt-2 text-3xl font-extrabold tracking-tight text-foreground">
            Get your business featured
          </h2>
          <p className="mt-2 text-sm text-muted">
            No payment processing required to try it — every tier below routes to a sponsorship
            request, not a checkout.
          </p>
        </div>
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {pricingTiers.map((tier) => (
            <PricingCard key={tier.name} tier={tier} />
          ))}
        </div>
      </section>

      <FAQSection items={homeFAQ} />

      <section className="border-t border-border bg-surface">
        <div className="mx-auto flex max-w-4xl flex-col items-center gap-6 px-4 py-20 text-center sm:px-6">
          <h2 className="text-balance text-3xl font-extrabold tracking-tight text-foreground sm:text-4xl">
            Turn your business into a creative challenge, or climb the leaderboard as a creator.
          </h2>
          <div className="flex flex-wrap items-center justify-center gap-3">
            <Link
              href="/challenge"
              className="rounded-full bg-brand px-6 py-3 text-sm font-bold text-brand-ink transition hover:opacity-90"
            >
              Start a Challenge
            </Link>
            <Link
              href="/join"
              className="rounded-full border border-border px-6 py-3 text-sm font-semibold text-foreground transition hover:border-brand hover:text-brand"
            >
              Enter as a Creator
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}

function FeaturedSide({
  label,
  name,
  votes,
  side,
}: {
  label: string;
  name: string;
  votes: number;
  side: "a" | "b";
}) {
  return (
    <div className={`rounded-xl border p-4 ${side === "a" ? "border-side-a/40" : "border-side-b/40"}`}>
      <p className={`text-xs font-semibold uppercase tracking-wide ${side === "a" ? "text-side-a" : "text-side-b"}`}>
        {label}
      </p>
      <p className="mt-1 text-lg font-bold text-foreground">{name}</p>
      <p className="mt-1 text-sm text-muted">{votes} votes</p>
    </div>
  );
}

function BenefitBlock({
  eyebrow,
  title,
  items,
  accent,
}: {
  eyebrow: string;
  title: string;
  items: string[];
  accent: "side-a" | "side-b";
}) {
  return (
    <div>
      <p className={`text-xs font-semibold uppercase tracking-wide ${accent === "side-a" ? "text-side-a" : "text-side-b"}`}>
        {eyebrow}
      </p>
      <h2 className="mt-2 text-2xl font-extrabold tracking-tight text-foreground">{title}</h2>
      <ul className="mt-5 flex flex-col gap-3">
        {items.map((item) => (
          <li key={item} className="flex items-start gap-3 text-sm text-foreground/90">
            <span className={`mt-0.5 ${accent === "side-a" ? "text-side-a" : "text-side-b"}`}>●</span>
            <span>{item}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}
