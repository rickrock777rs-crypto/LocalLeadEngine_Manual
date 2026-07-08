import Image from "next/image";
import Link from "next/link";
import { BattleViewModel } from "@/lib/battle-view";
import { StatusBadge } from "./status-badge";
import { timeRemaining, votePercentages } from "@/lib/format";

export function BattleCard({ vm }: { vm: BattleViewModel }) {
  const { battle, business, creatorA, creatorB, votesA, votesB } = vm;
  const pct = votePercentages(votesA, votesB);
  const showLeader = battle.status === "live" || battle.status === "completed";

  return (
    <Link
      href={`/battles/${battle.id}`}
      className="group flex flex-col overflow-hidden rounded-2xl border border-border bg-surface transition hover:-translate-y-0.5 hover:border-brand/50"
    >
      <div className="relative h-36 w-full overflow-hidden">
        {business.image_url && (
          <Image
            src={business.image_url}
            alt={business.name}
            fill
            className="object-cover transition duration-300 group-hover:scale-105"
          />
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-surface via-surface/10 to-transparent" />
        <div className="absolute left-3 top-3">
          <StatusBadge status={battle.status} />
        </div>
        {battle.featured && (
          <div className="absolute right-3 top-3 rounded-full bg-brand px-2.5 py-1 text-[10px] font-bold uppercase tracking-wide text-brand-ink">
            Featured
          </div>
        )}
        <div className="absolute bottom-3 left-3 right-3">
          <p className="text-xs font-semibold uppercase tracking-wide text-brand">
            {business.name} · {business.category}
          </p>
        </div>
      </div>

      <div className="flex flex-1 flex-col gap-4 p-4">
        <h3 className="font-semibold leading-snug text-foreground">{battle.title}</h3>

        <div className="flex items-center gap-3">
          <div className="flex flex-1 items-center gap-2">
            <div className="relative h-9 w-9 shrink-0 overflow-hidden rounded-full ring-2 ring-side-a/60">
              {creatorA.avatar_url && (
                <Image src={creatorA.avatar_url} alt={creatorA.name} fill className="object-cover" />
              )}
            </div>
            <div className="min-w-0">
              <p className="truncate text-sm font-medium text-foreground">{creatorA.name}</p>
              {showLeader && <p className="text-xs text-side-a">{pct.a}%</p>}
            </div>
          </div>

          <span className="font-mono text-xs font-bold text-muted">VS</span>

          <div className="flex flex-1 flex-row-reverse items-center gap-2 text-right">
            <div className="relative h-9 w-9 shrink-0 overflow-hidden rounded-full ring-2 ring-side-b/60">
              {creatorB.avatar_url && (
                <Image src={creatorB.avatar_url} alt={creatorB.name} fill className="object-cover" />
              )}
            </div>
            <div className="min-w-0">
              <p className="truncate text-sm font-medium text-foreground">{creatorB.name}</p>
              {showLeader && <p className="text-xs text-side-b">{pct.b}%</p>}
            </div>
          </div>
        </div>

        <div className="mt-auto flex items-center justify-between border-t border-border pt-3 text-xs text-muted">
          <span>{battle.total_votes} votes</span>
          <span>
            {battle.status === "live"
              ? timeRemaining(battle.voting_ends_at)
              : battle.status === "upcoming"
                ? "Starts soon"
                : "Voting closed"}
          </span>
        </div>
      </div>
    </Link>
  );
}
