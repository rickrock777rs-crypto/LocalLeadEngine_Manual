import { Submission } from "../types";

export const submissions: Submission[] = [
  // Battle 1: Sonoma Coffee House — Alex Creative vs Nina CopyLab (completed)
  {
    id: "sub_b1_alex",
    battle_id: "battle_sonoma_coffee",
    creator_id: "creator_alex",
    title: "Slow Down, Sonoma",
    description: "A moody, golden-hour social ad built around Sonoma Coffee House as the town's reset button.",
    asset_type: "Social media ad",
    image_url: "/submissions/b1-alex.svg",
    copy_text:
      "Your inbox can wait. Sonoma Coffee House is pulling shots and holding your favorite window seat. Slow down — you're allowed to.",
    call_to_action: "Order ahead, skip the line",
    created_at: "2026-06-19T09:00:00.000Z",
  },
  {
    id: "sub_b1_nina",
    battle_id: "battle_sonoma_coffee",
    creator_id: "creator_nina",
    title: "The Best Seat In Sonoma",
    description: "Copy-forward promo caption leaning into the shop's reputation as the local work-from-cafe spot.",
    asset_type: "Promo caption",
    image_url: "/submissions/b1-nina.svg",
    copy_text:
      "Free wifi. Bottomless refills on good conversation. The best seat in Sonoma has your name on it — and it's not at your desk.",
    call_to_action: "Come claim your table",
    created_at: "2026-06-19T09:20:00.000Z",
  },

  // Battle 2: Valley Burger Co. — Maya Makes Ads vs J.D. Visuals (live)
  {
    id: "sub_b2_maya",
    battle_id: "battle_valley_burger",
    creator_id: "creator_maya",
    title: "Happy Hour, Handled",
    description: "Fast-cut short-form video script built for a 15-second happy hour teaser.",
    asset_type: "Short video script",
    image_url: "/submissions/b2-maya.svg",
    copy_text:
      "SCENE 1: Sizzle shot of a burger hitting the grill. SCENE 2: Fries dropped into the basket. SCENE 3: Text on screen — 'Happy Hour. 3-6pm. Every weekday.' SCENE 4: Logo lockup + address card.",
    call_to_action: "Tag a friend who's hungry",
    created_at: "2026-07-04T09:00:00.000Z",
  },
  {
    id: "sub_b2_jd",
    battle_id: "battle_valley_burger",
    creator_id: "creator_jd",
    title: "Built Different. Built Local.",
    description: "Print-ready flyer concept for in-store counters and neighborhood bulletin boards.",
    asset_type: "Flyer",
    image_url: "/submissions/b2-jd.svg",
    copy_text:
      "Locally raised beef. Hand-cut fries. Zero shortcuts. Valley Burger Co. — the burger your neighborhood actually deserves.",
    call_to_action: "Stop in this week",
    created_at: "2026-07-04T09:15:00.000Z",
  },

  // Battle 3: Glow Beauty Studio — Maya Makes Ads vs Cruz Creative (completed)
  {
    id: "sub_b3_maya",
    battle_id: "battle_glow_beauty",
    creator_id: "creator_maya",
    title: "Glow Season Is Here",
    description: "Bright, aspirational social ad concept for a seasonal facial + lash promotion.",
    asset_type: "Social media ad",
    image_url: "/submissions/b3-maya.svg",
    copy_text:
      "New season, new glow. Book a facial + lash refresh at Glow Beauty Studio and walk out looking like you slept eight hours (even if you didn't).",
    call_to_action: "Book your glow-up",
    created_at: "2026-06-09T09:00:00.000Z",
  },
  {
    id: "sub_b3_cruz",
    battle_id: "battle_glow_beauty",
    creator_id: "creator_cruz",
    title: "Your Skin, On Purpose",
    description: "Clean, minimal Canva flyer built around a first-time client discount.",
    asset_type: "Flyer",
    image_url: "/submissions/b3-cruz.svg",
    copy_text:
      "First facial with us? Take 20% off. Glow Beauty Studio — skincare that's actually about your skin.",
    call_to_action: "Claim your first-visit discount",
    created_at: "2026-06-09T09:30:00.000Z",
  },

  // Battle 4: North Bay Fitness — PromptBoss vs Nina CopyLab (upcoming, no submissions live yet but drafted)
  {
    id: "sub_b4_promptboss",
    battle_id: "battle_north_bay_fitness",
    creator_id: "creator_promptboss",
    title: "Strength Has A Home Here",
    description: "AI-generated hero image paired with a bold local-awareness campaign line.",
    asset_type: "Local awareness campaign",
    image_url: "/submissions/b4-promptboss.svg",
    copy_text:
      "You don't need a fancy gym. You need people who show up and coaches who notice. North Bay Fitness — strength has a home here.",
    call_to_action: "Book a free trial class",
    created_at: "2026-07-08T09:00:00.000Z",
  },
  {
    id: "sub_b4_nina",
    battle_id: "battle_north_bay_fitness",
    creator_id: "creator_nina",
    title: "Consistency Over Perfection",
    description: "Landing-page-style copy block aimed at converting fitness-hesitant locals.",
    asset_type: "Promo caption",
    image_url: "/submissions/b4-nina.svg",
    copy_text:
      "You've started before. This time, finish. North Bay Fitness builds programs around your actual schedule — not the other way around.",
    call_to_action: "Start your first week free",
    created_at: "2026-07-08T09:15:00.000Z",
  },

  // Battle 5: Plaza Taco Bar — Alex Creative vs J.D. Visuals (live, featured)
  {
    id: "sub_b5_alex",
    battle_id: "battle_plaza_taco",
    creator_id: "creator_alex",
    title: "Taco Tuesday, Reinvented",
    description: "High-contrast social ad concept anchored on a limited-time menu item launch.",
    asset_type: "Product launch",
    image_url: "/submissions/b5-alex.svg",
    copy_text:
      "Handmade tortillas. House salsa verde. A birria taco that's only around for one more week. Plaza Taco Bar — come find out what the line is for.",
    call_to_action: "Find us before it's gone",
    created_at: "2026-07-02T09:00:00.000Z",
  },
  {
    id: "sub_b5_jd",
    battle_id: "battle_plaza_taco",
    creator_id: "creator_jd",
    title: "Fresh, Loud, Local",
    description: "Event-style promo flyer built for a weekend patio + live music tie-in.",
    asset_type: "Event promotion",
    image_url: "/submissions/b5-jd.svg",
    copy_text:
      "Tacos on the patio. Local music til 9. Plaza Taco Bar is where Rohnert Park actually hangs out this weekend.",
    call_to_action: "See you Saturday",
    created_at: "2026-07-02T09:20:00.000Z",
  },
];

export function getSubmissionById(id: string): Submission | undefined {
  return submissions.find((s) => s.id === id);
}

export function getSubmissionsForBattle(battleId: string): Submission[] {
  return submissions.filter((s) => s.battle_id === battleId);
}
