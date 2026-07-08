import Image from "next/image";
import Link from "next/link";
import { Creator } from "@/lib/types";
import { badgeForCreator, winRate } from "@/lib/ranking";
import { BADGE_STYLES } from "@/lib/format";

export function CreatorCard({ creator, rank }: { creator: Creator; rank?: number }) {
  const badge = badgeForCreator(creator);

  return (
    <Link
      href={`/creators/${creator.username}`}
      className="group flex items-center gap-4 rounded-2xl border border-border bg-surface p-4 transition hover:border-brand/50 hover:bg-surface-2"
    >
      {rank !== undefined && (
        <div className="w-8 shrink-0 text-center font-mono text-lg font-bold text-muted">
          {rank}
        </div>
      )}
      <div className="relative h-14 w-14 shrink-0 overflow-hidden rounded-full border border-border">
        {creator.avatar_url && (
          <Image src={creator.avatar_url} alt={creator.name} fill className="object-cover" />
        )}
      </div>
      <div className="min-w-0 flex-1">
        <div className="flex items-center gap-2">
          <p className="truncate font-semibold text-foreground group-hover:text-brand">
            {creator.name}
          </p>
          <span className={`shrink-0 rounded-full px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wide ${BADGE_STYLES[badge]}`}>
            {badge}
          </span>
        </div>
        <p className="truncate text-sm text-muted">
          {creator.category_specialty} specialist · {creator.location}
        </p>
      </div>
      <div className="hidden shrink-0 text-right sm:block">
        <p className="font-mono text-sm font-semibold text-foreground">
          {creator.wins}-{creator.losses}
        </p>
        <p className="text-xs text-muted">{winRate(creator)}% win rate</p>
      </div>
    </Link>
  );
}
