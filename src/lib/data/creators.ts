import { Creator } from "../types";
import { calculateRankScore } from "../ranking";

type CreatorSeed = Omit<Creator, "rank_score">;

const seeds: CreatorSeed[] = [
  {
    id: "creator_alex",
    name: "Alex Creative",
    username: "alex-creative",
    bio: "Brand designer turned ad strategist. I build promo concepts that make people stop scrolling.",
    location: "Santa Rosa, CA",
    avatar_url: "/creators/alex-creative.svg",
    skills: ["Graphic Design", "Branding", "Ad Strategy"],
    category_specialty: "Restaurant",
    experience_level: "Freelancer",
    wins: 5,
    losses: 1,
    total_votes: 412,
    current_streak: 3,
    social_links: { portfolio: "https://portfolio.example.com/alex-creative", instagram: "@alexcreative" },
    created_at: "2026-04-01T12:00:00.000Z",
  },
  {
    id: "creator_maya",
    name: "Maya Makes Ads",
    username: "maya-makes-ads",
    bio: "Short-form video editor and Canva power user. Local beauty and lifestyle brands are my specialty.",
    location: "Petaluma, CA",
    avatar_url: "/creators/maya-makes-ads.svg",
    skills: ["Short-Form Video", "Canva Design", "Social Media Marketing"],
    category_specialty: "Beauty",
    experience_level: "Marketing Pro",
    wins: 4,
    losses: 2,
    total_votes: 356,
    current_streak: 1,
    social_links: { tiktok: "@mayamakesads", instagram: "@mayamakesads" },
    created_at: "2026-04-05T12:00:00.000Z",
  },
  {
    id: "creator_jd",
    name: "J.D. Visuals",
    username: "jd-visuals",
    bio: "Photographer and flyer designer helping gyms and fitness studios look as good as they perform.",
    location: "Rohnert Park, CA",
    avatar_url: "/creators/jd-visuals.svg",
    skills: ["Flyer Design", "Graphic Design", "Video Editing"],
    category_specialty: "Fitness",
    experience_level: "Designer",
    wins: 2,
    losses: 2,
    total_votes: 210,
    current_streak: 0,
    social_links: { portfolio: "https://portfolio.example.com/jd-visuals" },
    created_at: "2026-04-10T12:00:00.000Z",
  },
  {
    id: "creator_promptboss",
    name: "PromptBoss",
    username: "promptboss",
    bio: "AI-assisted ad creator. I pair generative image tools with sharp copy to move fast without losing quality.",
    location: "Sonoma, CA",
    avatar_url: "/creators/promptboss.svg",
    skills: ["AI Image Creation", "Copywriting", "Ad Strategy"],
    category_specialty: "Retail",
    experience_level: "AI Creator",
    wins: 1,
    losses: 0,
    total_votes: 58,
    current_streak: 1,
    social_links: { instagram: "@promptboss.ai" },
    created_at: "2026-06-02T12:00:00.000Z",
  },
  {
    id: "creator_nina",
    name: "Nina CopyLab",
    username: "nina-copylab",
    bio: "Copywriter first, designer second. I write the line that makes someone actually walk through the door.",
    location: "Napa, CA",
    avatar_url: "/creators/nina-copylab.svg",
    skills: ["Copywriting", "Landing Page Copy", "Ad Strategy"],
    category_specialty: "Restaurant",
    experience_level: "Freelancer",
    wins: 3,
    losses: 3,
    total_votes: 268,
    current_streak: 0,
    social_links: { portfolio: "https://portfolio.example.com/nina-copylab" },
    created_at: "2026-04-15T12:00:00.000Z",
  },
  {
    id: "creator_cruz",
    name: "Cruz Creative",
    username: "cruz-creative",
    bio: "Design student building a portfolio one battle at a time. New to the arena, ready to compete.",
    location: "Santa Rosa, CA",
    avatar_url: "/creators/cruz-creative.svg",
    skills: ["Canva Design", "Flyer Design"],
    category_specialty: "Beauty",
    experience_level: "Student",
    wins: 0,
    losses: 1,
    total_votes: 19,
    current_streak: 0,
    social_links: {},
    created_at: "2026-06-20T12:00:00.000Z",
  },
];

export const creators: Creator[] = seeds.map((c) => ({
  ...c,
  rank_score: calculateRankScore(c),
}));

export function getCreatorById(id: string): Creator | undefined {
  return creators.find((c) => c.id === id);
}

export function getCreatorByUsername(username: string): Creator | undefined {
  return creators.find((c) => c.username === username);
}
