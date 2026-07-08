import type { Metadata } from "next";
import { LeaderboardTable } from "@/components/leaderboard-table";
import { getAllCreators } from "@/lib/store";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Creator Leaderboard — Local Ad Battle",
  description: "See which creators are ranked highest for winning ad battles.",
};

const BADGES = [
  { name: "Rookie", detail: "New to the arena" },
  { name: "Rising Creator", detail: "Won or lost at least one battle" },
  { name: "Battle Tested", detail: "Competed in 3+ battles" },
  { name: "Local Favorite", detail: "3+ wins and 150+ total votes earned" },
  { name: "Ad Assassin", detail: "On a 4+ battle win streak" },
  { name: "Conversion King/Queen", detail: "6+ wins with a 60%+ win rate" },
  { name: "Champion Creator", detail: "10+ wins with a 70%+ win rate" },
];

export default function LeaderboardPage() {
  const creators = getAllCreators();

  return (
    <div className="mx-auto max-w-5xl px-4 py-12 sm:px-6">
      <div className="mb-4">
        <p className="text-xs font-semibold uppercase tracking-wide text-brand">Leaderboard</p>
        <h1 className="mt-2 text-3xl font-extrabold tracking-tight text-foreground sm:text-4xl">
          Ranked creators
        </h1>
        <p className="mt-2 max-w-xl text-sm text-muted">
          Rankings update automatically after every completed battle.
        </p>
      </div>

      <div className="mb-8 rounded-2xl border border-border bg-surface-2 p-4 text-sm text-muted">
        <span className="font-semibold text-foreground">Rank score formula: </span>
        <code className="rounded bg-surface px-2 py-1 font-mono text-xs text-brand">
          (Wins × 100) + (Total Votes × 1) + (Win Streak × 25) − (Losses × 25)
        </code>
      </div>

      <LeaderboardTable creators={creators} />

      <div className="mt-10">
        <h2 className="mb-4 text-lg font-bold text-foreground">Badges</h2>
        <div className="grid gap-3 sm:grid-cols-2">
          {BADGES.map((b) => (
            <div key={b.name} className="rounded-xl border border-border bg-surface p-4">
              <p className="font-semibold text-foreground">{b.name}</p>
              <p className="mt-1 text-sm text-muted">{b.detail}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
