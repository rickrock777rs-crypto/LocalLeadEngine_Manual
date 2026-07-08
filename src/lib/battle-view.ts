import { Battle, Business, Creator, Submission } from "./types";
import { getAllBattles, getBattle, getVoteCountsForBattle, getCreator } from "./store";
import { getBusinessById } from "./data/businesses";
import { getSubmissionById } from "./data/submissions";

export interface BattleViewModel {
  battle: Battle;
  business: Business;
  creatorA: Creator;
  creatorB: Creator;
  submissionA: Submission;
  submissionB: Submission;
  votesA: number;
  votesB: number;
}

export function buildBattleViewModel(battle: Battle): BattleViewModel | null {
  const business = getBusinessById(battle.business_id);
  const creatorA = getCreator(battle.creator_a_id);
  const creatorB = getCreator(battle.creator_b_id);
  const submissionA = getSubmissionById(battle.creator_a_submission_id);
  const submissionB = getSubmissionById(battle.creator_b_submission_id);

  if (!business || !creatorA || !creatorB || !submissionA || !submissionB) return null;

  const counts = getVoteCountsForBattle(battle.id);

  return {
    battle,
    business,
    creatorA,
    creatorB,
    submissionA,
    submissionB,
    votesA: counts[creatorA.id] ?? 0,
    votesB: counts[creatorB.id] ?? 0,
  };
}

export function getBattleViewModelById(id: string): BattleViewModel | null {
  const battle = getBattle(id);
  if (!battle) return null;
  return buildBattleViewModel(battle);
}

export function getAllBattleViewModels(): BattleViewModel[] {
  return getAllBattles()
    .map(buildBattleViewModel)
    .filter((v): v is BattleViewModel => v !== null)
    .sort((a, b) => new Date(b.battle.created_at).getTime() - new Date(a.battle.created_at).getTime());
}

export function getBattleViewModelsForCreator(creatorId: string): BattleViewModel[] {
  return getAllBattleViewModels().filter(
    (vm) => vm.creatorA.id === creatorId || vm.creatorB.id === creatorId
  );
}
