import { Battle, ChallengeRequest, Creator, CreatorSignup, Vote } from "./types";
import { battles as seedBattles } from "./data/battles";
import { creators as seedCreators } from "./data/creators";
import { applyBattleResult } from "./ranking";

/**
 * In-memory data store for the MVP.
 *
 * This holds the *mutable* runtime state (votes cast, battle totals,
 * creator records, form submissions) seeded from the static mock data in
 * src/lib/data/. It lives in a module-level singleton so it persists across
 * requests within a single server process — enough to demo the full voting
 * loop without a database.
 *
 * IMPORTANT: this resets on server restart and is NOT safe for a
 * multi-instance/serverless deployment. Swapping it for Postgres/Supabase
 * means replacing the functions below with real queries — the shapes
 * (Battle, Creator, Vote, ChallengeRequest, CreatorSignup) are already
 * modeled as future DB tables in src/lib/types.ts.
 */

interface Store {
  battles: Battle[];
  creators: Creator[];
  votes: Vote[];
  challengeRequests: ChallengeRequest[];
  creatorSignups: CreatorSignup[];
}

// Seed per-battle vote splits so the mock data renders realistic totals
// without having to materialize hundreds of individual Vote rows.
const seedVoteSplits: Record<string, { creatorAVotes: number; creatorBVotes: number }> = {
  battle_sonoma_coffee: { creatorAVotes: 62, creatorBVotes: 41 },
  battle_valley_burger: { creatorAVotes: 34, creatorBVotes: 28 },
  battle_glow_beauty: { creatorAVotes: 55, creatorBVotes: 19 },
  battle_north_bay_fitness: { creatorAVotes: 0, creatorBVotes: 0 },
  battle_plaza_taco: { creatorAVotes: 47, creatorBVotes: 44 },
};

function buildSeedVotes(): Vote[] {
  const votes: Vote[] = [];
  let counter = 0;
  for (const battle of seedBattles) {
    const split = seedVoteSplits[battle.id];
    if (!split) continue;
    for (let i = 0; i < split.creatorAVotes; i++) {
      counter++;
      votes.push({
        id: `seed_vote_${counter}`,
        battle_id: battle.id,
        selected_creator_id: battle.creator_a_id,
        voter_session_id: `seed_session_${counter}`,
        created_at: battle.voting_starts_at,
      });
    }
    for (let i = 0; i < split.creatorBVotes; i++) {
      counter++;
      votes.push({
        id: `seed_vote_${counter}`,
        battle_id: battle.id,
        selected_creator_id: battle.creator_b_id,
        voter_session_id: `seed_session_${counter}`,
        created_at: battle.voting_starts_at,
      });
    }
  }
  return votes;
}

const globalForStore = globalThis as unknown as { __localAdBattleStore?: Store };

function createStore(): Store {
  return {
    battles: seedBattles.map((b) => ({ ...b })),
    creators: seedCreators.map((c) => ({ ...c })),
    votes: buildSeedVotes(),
    challengeRequests: [],
    creatorSignups: [],
  };
}

// Reuse the store across hot-reloads in dev (Next.js clears the module
// cache on file changes, which would otherwise wipe votes on every save).
const store: Store = globalForStore.__localAdBattleStore ?? createStore();
globalForStore.__localAdBattleStore = store;

export function getAllBattles(): Battle[] {
  return store.battles;
}

export function getBattle(id: string): Battle | undefined {
  return store.battles.find((b) => b.id === id);
}

export function getAllCreators(): Creator[] {
  return store.creators;
}

export function getCreator(id: string): Creator | undefined {
  return store.creators.find((c) => c.id === id);
}

export function getCreatorByUsername(username: string): Creator | undefined {
  return store.creators.find((c) => c.username === username);
}

export function getVoteCountsForBattle(battleId: string): Record<string, number> {
  const counts: Record<string, number> = {};
  for (const vote of store.votes) {
    if (vote.battle_id !== battleId) continue;
    counts[vote.selected_creator_id] = (counts[vote.selected_creator_id] ?? 0) + 1;
  }
  return counts;
}

export function hasSessionVoted(battleId: string, sessionId: string): boolean {
  return store.votes.some(
    (v) => v.battle_id === battleId && v.voter_session_id === sessionId
  );
}

export type CastVoteResult =
  | { ok: true; battle: Battle }
  | { ok: false; error: "already_voted" | "battle_not_live" | "invalid_creator" };

export function castVote(
  battleId: string,
  selectedCreatorId: string,
  sessionId: string
): CastVoteResult {
  const battle = getBattle(battleId);
  if (!battle) return { ok: false, error: "invalid_creator" };
  if (battle.status !== "live") return { ok: false, error: "battle_not_live" };
  if (![battle.creator_a_id, battle.creator_b_id].includes(selectedCreatorId)) {
    return { ok: false, error: "invalid_creator" };
  }
  // One vote per viewer session for MVP. Future anti-cheat: require login,
  // verify email, throttle by IP, add device fingerprinting, or fold in a
  // weighted judge score / admin review before finalizing a winner.
  if (hasSessionVoted(battleId, sessionId)) {
    return { ok: false, error: "already_voted" };
  }

  store.votes.push({
    id: `vote_${Date.now()}_${Math.random().toString(36).slice(2, 8)}`,
    battle_id: battleId,
    selected_creator_id: selectedCreatorId,
    voter_session_id: sessionId,
    created_at: new Date().toISOString(),
  });

  battle.total_votes += 1;
  return { ok: true, battle };
}

/**
 * Admin action: close voting and declare a winner. Not exposed in the UI
 * yet (see /admin), but the store is structured so a real admin dashboard
 * can call this directly once it exists.
 */
export function declareWinner(battleId: string): Battle | undefined {
  const battle = getBattle(battleId);
  if (!battle) return undefined;

  const counts = getVoteCountsForBattle(battleId);
  const aVotes = counts[battle.creator_a_id] ?? 0;
  const bVotes = counts[battle.creator_b_id] ?? 0;
  const winnerId = aVotes >= bVotes ? battle.creator_a_id : battle.creator_b_id;
  const loserId = winnerId === battle.creator_a_id ? battle.creator_b_id : battle.creator_a_id;
  const winnerVotes = winnerId === battle.creator_a_id ? aVotes : bVotes;
  const loserVotes = winnerId === battle.creator_a_id ? bVotes : aVotes;

  const winner = getCreator(winnerId);
  const loser = getCreator(loserId);
  if (winner && loser) {
    const { winner: updatedWinner, loser: updatedLoser } = applyBattleResult(
      winner,
      loser,
      winnerVotes,
      loserVotes
    );
    Object.assign(winner, updatedWinner);
    Object.assign(loser, updatedLoser);
  }

  battle.status = "completed";
  battle.winner_creator_id = winnerId;
  return battle;
}

export function addChallengeRequest(request: ChallengeRequest): void {
  store.challengeRequests.push(request);
}

export function getAllChallengeRequests(): ChallengeRequest[] {
  return store.challengeRequests;
}

export function addCreatorSignup(signup: CreatorSignup): void {
  store.creatorSignups.push(signup);
}

export function getAllCreatorSignups(): CreatorSignup[] {
  return store.creatorSignups;
}
