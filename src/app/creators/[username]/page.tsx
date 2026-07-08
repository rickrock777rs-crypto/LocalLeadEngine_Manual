import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { getAllCreators, getCreatorByUsername } from "@/lib/store";
import { getBattleViewModelsForCreator } from "@/lib/battle-view";
import { badgeForCreator, sortByRank, winRate } from "@/lib/ranking";
import { BADGE_STYLES } from "@/lib/format";
import { BattleCard } from "@/components/battle-card";

export const dynamic = "force-dynamic";

interface PageProps {
  params: Promise<{ username: string }>;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { username } = await params;
  const creator = getCreatorByUsername(username);
  if (!creator) return { title: "Creator not found — Local Ad Battle" };
  return {
    title: `${creator.name} — Local Ad Battle`,
    description: creator.bio,
  };
}

export default async function CreatorProfilePage({ params }: PageProps) {
  const { username } = await params;
  const creator = getCreatorByUsername(username);
  if (!creator) notFound();

  const battles = getBattleViewModelsForCreator(creator.id);
  const rank = sortByRank(getAllCreators()).findIndex((c) => c.id === creator.id) + 1;
  const badge = badgeForCreator(creator);

  const bestBattle = battles
    .filter((b) => b.battle.status === "completed" && b.battle.winner_creator_id === creator.id)
    .sort((a, b) => b.battle.total_votes - a.battle.total_votes)[0];

  const socialEntries = Object.entries(creator.social_links).filter(([, v]) => v);

  return (
    <div className="mx-auto max-w-4xl px-4 py-12 sm:px-6">
      <div className="flex flex-col items-start gap-6 sm:flex-row sm:items-center">
        <div className="relative h-24 w-24 shrink-0 overflow-hidden rounded-full border-2 border-brand">
          {creator.avatar_url && (
            <Image src={creator.avatar_url} alt={creator.name} fill className="object-cover" />
          )}
        </div>
        <div>
          <div className="flex flex-wrap items-center gap-2">
            <h1 className="text-3xl font-extrabold tracking-tight text-foreground">{creator.name}</h1>
            <span className={`rounded-full px-2 py-0.5 text-xs font-semibold uppercase tracking-wide ${BADGE_STYLES[badge]}`}>
              {badge}
            </span>
          </div>
          <p className="mt-1 text-sm text-muted">
            {creator.location} · {creator.experience_level} · Rank #{rank}
          </p>
        </div>
      </div>

      <p className="mt-6 max-w-2xl text-foreground/90">{creator.bio}</p>

      <div className="mt-6 grid grid-cols-2 gap-3 sm:grid-cols-4">
        <Stat label="Record" value={`${creator.wins}-${creator.losses}`} />
        <Stat label="Win Rate" value={`${winRate(creator)}%`} />
        <Stat label="Rank Score" value={String(creator.rank_score)} accent />
        <Stat label="Total Votes" value={String(creator.total_votes)} />
      </div>

      <div className="mt-8">
        <p className="mb-2 text-xs font-semibold uppercase tracking-wide text-muted">
          Category specialty
        </p>
        <span className="rounded-full border border-border px-3 py-1 text-sm text-foreground">
          {creator.category_specialty}
        </span>
      </div>

      <div className="mt-6">
        <p className="mb-2 text-xs font-semibold uppercase tracking-wide text-muted">Skills</p>
        <div className="flex flex-wrap gap-2">
          {creator.skills.map((skill) => (
            <span
              key={skill}
              className="rounded-full border border-border bg-surface px-3 py-1 text-sm text-foreground"
            >
              {skill}
            </span>
          ))}
        </div>
      </div>

      <div className="mt-6">
        <p className="mb-2 text-xs font-semibold uppercase tracking-wide text-muted">
          Social &amp; portfolio
        </p>
        {socialEntries.length > 0 ? (
          <div className="flex flex-wrap gap-2 text-sm">
            {socialEntries.map(([key, value]) => (
              <span key={key} className="rounded-full border border-border px-3 py-1 text-muted">
                {key}: {value}
              </span>
            ))}
          </div>
        ) : (
          <p className="text-sm text-muted">No links added yet.</p>
        )}
      </div>

      {bestBattle && (
        <div className="mt-8">
          <p className="mb-2 text-xs font-semibold uppercase tracking-wide text-muted">
            Best-performing submission
          </p>
          <div className="max-w-sm">
            <BattleCard vm={bestBattle} />
          </div>
        </div>
      )}

      <div className="mt-10 flex flex-wrap items-center gap-3 rounded-2xl border border-dashed border-border p-5">
        <p className="text-sm text-muted">
          Direct challenges between creators aren&apos;t open yet — matchmaking currently happens
          through business challenge requests.
        </p>
        <Link
          href="/challenge"
          className="ml-auto shrink-0 rounded-full border border-border px-4 py-2 text-sm font-semibold text-foreground transition hover:border-brand hover:text-brand"
        >
          Challenge this creator (coming soon)
        </Link>
      </div>

      <div className="mt-10">
        <h2 className="mb-4 text-lg font-bold text-foreground">
          Past battles ({battles.length})
        </h2>
        {battles.length === 0 ? (
          <p className="text-sm text-muted">No battles yet.</p>
        ) : (
          <div className="grid gap-6 sm:grid-cols-2">
            {battles.map((vm) => (
              <BattleCard key={vm.battle.id} vm={vm} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

function Stat({ label, value, accent }: { label: string; value: string; accent?: boolean }) {
  return (
    <div className="rounded-xl border border-border bg-surface p-4 text-center">
      <p className={`font-mono text-xl font-bold ${accent ? "text-brand" : "text-foreground"}`}>
        {value}
      </p>
      <p className="mt-1 text-xs text-muted">{label}</p>
    </div>
  );
}
