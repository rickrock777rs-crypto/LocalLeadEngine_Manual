// Core domain types for Local Ad Battle.
// Structured to map 1:1 onto future database tables (e.g. Supabase/Postgres).

export type BusinessCategory =
  | "Restaurant"
  | "Bar"
  | "Retail"
  | "Service Business"
  | "Real Estate"
  | "Fitness"
  | "Beauty"
  | "Local Event"
  | "Other";

export const BUSINESS_CATEGORIES: BusinessCategory[] = [
  "Restaurant",
  "Bar",
  "Retail",
  "Service Business",
  "Real Estate",
  "Fitness",
  "Beauty",
  "Local Event",
  "Other",
];

export interface Business {
  id: string;
  name: string;
  category: BusinessCategory;
  description: string;
  location: string;
  website?: string;
  contact_name: string;
  contact_email: string;
  contact_phone?: string;
  logo_url?: string;
  image_url?: string;
  created_at: string;
}

export type CreatorSkill =
  | "Copywriting"
  | "Graphic Design"
  | "Video Editing"
  | "Canva Design"
  | "AI Image Creation"
  | "Ad Strategy"
  | "Social Media Marketing"
  | "Branding"
  | "Flyer Design"
  | "Landing Page Copy"
  | "Short-Form Video";

export const CREATOR_SKILLS: CreatorSkill[] = [
  "Copywriting",
  "Graphic Design",
  "Video Editing",
  "Canva Design",
  "AI Image Creation",
  "Ad Strategy",
  "Social Media Marketing",
  "Branding",
  "Flyer Design",
  "Landing Page Copy",
  "Short-Form Video",
];

export type ExperienceLevel =
  | "Beginner"
  | "Hobby Creator"
  | "Freelancer"
  | "Marketing Pro"
  | "Designer"
  | "Student"
  | "Agency Owner"
  | "AI Creator";

export const EXPERIENCE_LEVELS: ExperienceLevel[] = [
  "Beginner",
  "Hobby Creator",
  "Freelancer",
  "Marketing Pro",
  "Designer",
  "Student",
  "Agency Owner",
  "AI Creator",
];

export type CreatorBadge =
  | "Rookie"
  | "Rising Creator"
  | "Battle Tested"
  | "Local Favorite"
  | "Ad Assassin"
  | "Conversion King/Queen"
  | "Champion Creator";

export interface SocialLinks {
  website?: string;
  instagram?: string;
  tiktok?: string;
  portfolio?: string;
}

export interface Creator {
  id: string;
  name: string;
  username: string;
  bio: string;
  location: string;
  avatar_url?: string;
  skills: CreatorSkill[];
  category_specialty: BusinessCategory;
  experience_level: ExperienceLevel;
  wins: number;
  losses: number;
  total_votes: number;
  current_streak: number;
  rank_score: number;
  social_links: SocialLinks;
  created_at: string;
}

export type BattleStatus =
  | "draft"
  | "upcoming"
  | "live"
  | "voting_closed"
  | "completed";

export const BATTLE_STATUSES: BattleStatus[] = [
  "draft",
  "upcoming",
  "live",
  "voting_closed",
  "completed",
];

export interface Battle {
  id: string;
  title: string;
  brief: string;
  business_id: string;
  creator_a_id: string;
  creator_b_id: string;
  creator_a_submission_id: string;
  creator_b_submission_id: string;
  status: BattleStatus;
  category: BusinessCategory;
  featured: boolean;
  voting_starts_at: string;
  voting_ends_at: string;
  winner_creator_id: string | null;
  total_votes: number;
  created_at: string;
}

export type AssetType =
  | "Social media ad"
  | "Flyer"
  | "Short video script"
  | "Promo caption"
  | "Slogan/tagline"
  | "Event promotion"
  | "Menu item promotion"
  | "Product launch"
  | "Local awareness campaign";

export const ASSET_TYPES: AssetType[] = [
  "Social media ad",
  "Flyer",
  "Short video script",
  "Promo caption",
  "Slogan/tagline",
  "Event promotion",
  "Menu item promotion",
  "Product launch",
  "Local awareness campaign",
];

export interface Submission {
  id: string;
  battle_id: string;
  creator_id: string;
  title: string;
  description: string;
  asset_type: AssetType;
  asset_url?: string;
  image_url?: string;
  video_url?: string;
  copy_text: string;
  call_to_action: string;
  created_at: string;
}

export interface Vote {
  id: string;
  battle_id: string;
  selected_creator_id: string;
  voter_session_id: string;
  created_at: string;
}

export type BusinessGoal =
  | "More foot traffic"
  | "More calls"
  | "More online orders"
  | "More event attendance"
  | "More bookings"
  | "More social followers"
  | "More awareness"
  | "Promote a specific offer";

export const BUSINESS_GOALS: BusinessGoal[] = [
  "More foot traffic",
  "More calls",
  "More online orders",
  "More event attendance",
  "More bookings",
  "More social followers",
  "More awareness",
  "Promote a specific offer",
];

export type ChallengeRequestStatus = "new" | "reviewing" | "scheduled" | "declined";

export interface ChallengeRequest {
  id: string;
  business_name: string;
  contact_name: string;
  email: string;
  phone?: string;
  business_category: BusinessCategory;
  website_or_social?: string;
  promotion_goal: BusinessGoal;
  desired_asset_type: AssetType;
  offer_details?: string;
  budget_interest: string;
  deadline?: string;
  message?: string;
  feature_permission: boolean;
  status: ChallengeRequestStatus;
  created_at: string;
}

export type CreatorSignupStatus = "new" | "approved" | "waitlisted";

export interface CreatorSignup {
  id: string;
  creator_name: string;
  email: string;
  location: string;
  main_skill: CreatorSkill;
  portfolio_link?: string;
  bio: string;
  preferred_category: BusinessCategory;
  experience_level: ExperienceLevel;
  agreed_to_rules: boolean;
  status: CreatorSignupStatus;
  created_at: string;
}
