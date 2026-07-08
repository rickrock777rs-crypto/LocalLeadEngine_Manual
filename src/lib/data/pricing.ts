import { PricingTier } from "@/components/pricing-card";

export const pricingTiers: PricingTier[] = [
  {
    name: "Free Feature Battle",
    price: "$0",
    description: "Limited-time launch offer. Good for proof-building.",
    features: [
      "Business gets featured in one challenge",
      "Two creator submissions",
      "Public voting on the platform",
    ],
    cta: "Request a Free Battle",
    ctaHref: "/challenge",
  },
  {
    name: "Sponsored Challenge",
    price: "$49",
    description: "A dedicated battle page built around your business.",
    features: [
      "Business gets a featured battle page",
      "Two creator submissions",
      "Public voting",
      "Social-ready recap post",
    ],
    highlight: true,
    cta: "Request Sponsorship Info",
    ctaHref: "/challenge",
  },
  {
    name: "Premium Challenge",
    price: "$149",
    description: "More creators, more exposure, ready-to-use output.",
    features: [
      "Four creator submissions or two rounds",
      "Featured homepage placement",
      "Battle recap content",
      "Winning ad packaged for business use",
    ],
    cta: "Request Sponsorship Info",
    ctaHref: "/challenge",
  },
  {
    name: "Monthly Local Sponsor",
    price: "$299+",
    description: "For businesses who want an ongoing presence.",
    features: [
      "Sponsor multiple battles per month",
      "Logo placement across the platform",
      "Community mentions",
      "Monthly recap content",
    ],
    cta: "Request Sponsorship Info",
    ctaHref: "/challenge",
  },
];
