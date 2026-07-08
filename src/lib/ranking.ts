import { Creator, CreatorBadge } from "./types";

// Rank Score = (Wins x 100) + (Total Votes x 1) + (Win Streak x 25) - (Losses x 25)
export function calculateRankScore(creator: {
  wins: number;
  losses: number;
  total_votes: number;
  current_streak: number;
}): number {
  return (
    creator.wins * 100 +
    creator.total_votes * 1 +
    creator.current_streak * 25 -
    creator.losses * 25
  );
}

export function winRate(creator: { wins: number; losses: number }): number {
  const total = creator.wins + creator.losses;
  if (total === 0) return 0;
  return Math.round((creator.wins / total) * 100);
}

export function badgeForCreator(creator: Creator): CreatorBadge {
  const total = creator.wins + creator.losses;
  const rate = winRate(creator);

  if (creator.wins >= 10 && rate >= 70) return "Champion Creator";
  if (creator.current_streak >= 4) return "Ad Assassin";
  if (creator.wins >= 6 && rate >= 60) return "Conversion King/Queen";
  if (creator.wins >= 3 && creator.total_votes >= 150) return "Local Favorite";
  if (total >= 3) return "Battle Tested";
  if (total >= 1) return "Rising Creator";
  return "Rookie";
}

export function sortByRank(creators: Creator[]): Creator[] {
  return [...creators].sort((a, b) => b.rank_score - a.rank_score);
}

/**
 * Applies the outcome of a completed battle to both creators and returns
 * updated copies. Pure function so it can be reused by API routes, seed
 * scripts, or a future admin action ("Declare Winner").
 */
export function applyBattleResult(
  winner: Creator,
  loser: Creator,
  winnerVotes: number,
  loserVotes: number
): { winner: Creator; loser: Creator } {
  const updatedWinner: Creator = {
    ...winner,
    wins: winner.wins + 1,
    total_votes: winner.total_votes + winnerVotes,
    current_streak: winner.current_streak + 1,
  };
  updatedWinner.rank_score = calculateRankScore(updatedWinner);

  const updatedLoser: Creator = {
    ...loser,
    losses: loser.losses + 1,
    total_votes: loser.total_votes + loserVotes,
    current_streak: 0,
  };
  updatedLoser.rank_score = calculateRankScore(updatedLoser);

  return { winner: updatedWinner, loser: updatedLoser };
}
