import Image from "next/image";
import Link from "next/link";
import { Creator } from "@/lib/types";
import { badgeForCreator, sortByRank, winRate } from "@/lib/ranking";
import { BADGE_STYLES } from "@/lib/format";

export function LeaderboardTable({ creators, limit }: { creators: Creator[]; limit?: number }) {
  const ranked = sortByRank(creators).slice(0, limit ?? creators.length);

  return (
    <div className="overflow-hidden rounded-2xl border border-border bg-surface">
      <table className="w-full text-sm">
        <thead>
          <tr className="border-b border-border text-left text-xs uppercase tracking-wide text-muted">
            <th className="px-4 py-3 font-semibold">Rank</th>
            <th className="px-4 py-3 font-semibold">Creator</th>
            <th className="hidden px-4 py-3 font-semibold sm:table-cell">Record</th>
            <th className="hidden px-4 py-3 font-semibold sm:table-cell">Win Rate</th>
            <th className="hidden px-4 py-3 font-semibold md:table-cell">Streak</th>
            <th className="hidden px-4 py-3 font-semibold md:table-cell">Votes</th>
            <th className="px-4 py-3 text-right font-semibold">Score</th>
          </tr>
        </thead>
        <tbody>
          {ranked.map((creator, i) => {
            const rank = i + 1;
            const badge = badgeForCreator(creator);
            return (
              <tr key={creator.id} className="border-b border-border last:border-0 hover:bg-surface-2">
                <td className="px-4 py-3">
                  <span className={`font-mono font-bold ${rank <= 3 ? "text-brand" : "text-muted"}`}>
                    {rank}
                  </span>
                </td>
                <td className="px-4 py-3">
                  <Link href={`/creators/${creator.username}`} className="flex items-center gap-3">
                    <div className="relative h-9 w-9 shrink-0 overflow-hidden rounded-full">
                      {creator.avatar_url && (
                        <Image src={creator.avatar_url} alt={creator.name} fill className="object-cover" />
                      )}
                    </div>
                    <div className="min-w-0">
                      <p className="truncate font-medium text-foreground hover:text-brand">{creator.name}</p>
                      <span
                        className={`inline-block rounded-full px-1.5 py-0.5 text-[10px] font-semibold uppercase tracking-wide ${BADGE_STYLES[badge]}`}
                      >
                        {badge}
                      </span>
                    </div>
                  </Link>
                </td>
                <td className="hidden px-4 py-3 font-mono text-foreground sm:table-cell">
                  {creator.wins}-{creator.losses}
                </td>
                <td className="hidden px-4 py-3 text-foreground sm:table-cell">{winRate(creator)}%</td>
                <td className="hidden px-4 py-3 text-foreground md:table-cell">
                  {creator.current_streak > 0 ? `${creator.current_streak}W` : "—"}
                </td>
                <td className="hidden px-4 py-3 text-foreground md:table-cell">{creator.total_votes}</td>
                <td className="px-4 py-3 text-right font-mono font-bold text-brand">{creator.rank_score}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}
