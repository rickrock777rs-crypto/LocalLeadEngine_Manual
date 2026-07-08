import { BattleStatus, CreatorBadge } from "./types";

export function votePercentages(aVotes: number, bVotes: number): { a: number; b: number } {
  const total = aVotes + bVotes;
  if (total === 0) return { a: 50, b: 50 };
  return {
    a: Math.round((aVotes / total) * 100),
    b: Math.round((bVotes / total) * 100),
  };
}

export function timeRemaining(endsAt: string, now: Date = new Date()): string {
  const diffMs = new Date(endsAt).getTime() - now.getTime();
  if (diffMs <= 0) return "Voting closed";

  const totalMinutes = Math.floor(diffMs / (1000 * 60));
  const days = Math.floor(totalMinutes / (60 * 24));
  const hours = Math.floor((totalMinutes % (60 * 24)) / 60);
  const minutes = totalMinutes % 60;

  if (days > 0) return `${days}d ${hours}h left`;
  if (hours > 0) return `${hours}h ${minutes}m left`;
  return `${minutes}m left`;
}

export const STATUS_LABELS: Record<BattleStatus, string> = {
  draft: "Draft",
  upcoming: "Upcoming",
  live: "Live Voting",
  voting_closed: "Voting Closed",
  completed: "Completed",
};

export const BADGE_STYLES: Record<CreatorBadge, string> = {
  Rookie: "bg-surface-2 text-muted",
  "Rising Creator": "bg-side-a-soft text-side-a",
  "Battle Tested": "bg-side-b-soft text-side-b",
  "Local Favorite": "bg-emerald-950 text-emerald-400",
  "Ad Assassin": "bg-rose-950 text-rose-400",
  "Conversion King/Queen": "bg-fuchsia-950 text-fuchsia-400",
  "Champion Creator": "bg-brand text-brand-ink",
};

export function formatDate(iso: string): string {
  return new Date(iso).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
}
