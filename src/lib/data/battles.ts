import { Battle } from "../types";

// total_votes / winner_creator_id below represent the *seed* state before
// any live votes are cast. src/lib/store.ts clones this into an in-memory
// mutable store that /api/vote updates at runtime.
export const battles: Battle[] = [
  {
    id: "battle_sonoma_coffee",
    title: "Best 30-Second Ad for Sonoma Coffee House",
    brief:
      "Create the ad most likely to get a local Sonoma resident to stop scrolling, remember the shop, and walk in this week.",
    business_id: "biz_sonoma_coffee",
    creator_a_id: "creator_alex",
    creator_b_id: "creator_nina",
    creator_a_submission_id: "sub_b1_alex",
    creator_b_submission_id: "sub_b1_nina",
    status: "completed",
    category: "Restaurant",
    featured: false,
    voting_starts_at: "2026-06-20T00:00:00.000Z",
    voting_ends_at: "2026-06-27T00:00:00.000Z",
    winner_creator_id: "creator_alex",
    total_votes: 103,
    created_at: "2026-06-18T12:00:00.000Z",
  },
  {
    id: "battle_valley_burger",
    title: "Create the Best Happy Hour Promo",
    brief:
      "Design or script a happy hour promo for Valley Burger Co. that drives weekday foot traffic between 3-6pm.",
    business_id: "biz_valley_burger",
    creator_a_id: "creator_maya",
    creator_b_id: "creator_jd",
    creator_a_submission_id: "sub_b2_maya",
    creator_b_submission_id: "sub_b2_jd",
    status: "live",
    category: "Restaurant",
    featured: false,
    voting_starts_at: "2026-07-05T00:00:00.000Z",
    voting_ends_at: "2026-07-12T00:00:00.000Z",
    winner_creator_id: null,
    total_votes: 62,
    created_at: "2026-07-03T12:00:00.000Z",
  },
  {
    id: "battle_glow_beauty",
    title: "Design a Flyer That Gets More Foot Traffic",
    brief:
      "Build a flyer or social ad promoting a first-time client discount for Glow Beauty Studio's facial + lash services.",
    business_id: "biz_glow_beauty",
    creator_a_id: "creator_maya",
    creator_b_id: "creator_cruz",
    creator_a_submission_id: "sub_b3_maya",
    creator_b_submission_id: "sub_b3_cruz",
    status: "completed",
    category: "Beauty",
    featured: false,
    voting_starts_at: "2026-06-10T00:00:00.000Z",
    voting_ends_at: "2026-06-17T00:00:00.000Z",
    winner_creator_id: "creator_maya",
    total_votes: 74,
    created_at: "2026-06-08T12:00:00.000Z",
  },
  {
    id: "battle_north_bay_fitness",
    title: "Best Local Awareness Campaign",
    brief:
      "Create a local-awareness concept that gets fitness-hesitant residents to try a free class at North Bay Fitness.",
    business_id: "biz_north_bay_fitness",
    creator_a_id: "creator_promptboss",
    creator_b_id: "creator_nina",
    creator_a_submission_id: "sub_b4_promptboss",
    creator_b_submission_id: "sub_b4_nina",
    status: "upcoming",
    category: "Fitness",
    featured: false,
    voting_starts_at: "2026-07-15T00:00:00.000Z",
    voting_ends_at: "2026-07-22T00:00:00.000Z",
    winner_creator_id: null,
    total_votes: 0,
    created_at: "2026-07-08T12:00:00.000Z",
  },
  {
    id: "battle_plaza_taco",
    title: "Best Instagram Caption for a New Menu Item",
    brief:
      "Promote Plaza Taco Bar's limited-time birria taco launch in whatever format is most likely to sell out the week.",
    business_id: "biz_plaza_taco",
    creator_a_id: "creator_alex",
    creator_b_id: "creator_jd",
    creator_a_submission_id: "sub_b5_alex",
    creator_b_submission_id: "sub_b5_jd",
    status: "live",
    category: "Restaurant",
    featured: true,
    voting_starts_at: "2026-07-03T00:00:00.000Z",
    voting_ends_at: "2026-07-10T00:00:00.000Z",
    winner_creator_id: null,
    total_votes: 91,
    created_at: "2026-07-01T12:00:00.000Z",
  },
];

export function getBattleById(id: string): Battle | undefined {
  return battles.find((b) => b.id === id);
}
