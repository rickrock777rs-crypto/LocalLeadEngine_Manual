import { Business } from "../types";

export const businesses: Business[] = [
  {
    id: "biz_sonoma_coffee",
    name: "Sonoma Coffee House",
    category: "Restaurant",
    description:
      "A neighborhood coffee shop known for single-origin pour-overs, house-made pastries, and a cozy work-friendly space.",
    location: "Sonoma, CA",
    website: "https://sonomacoffeehouse.example.com",
    contact_name: "Dana Reyes",
    contact_email: "dana@sonomacoffeehouse.example.com",
    contact_phone: "(707) 555-0142",
    logo_url: "/businesses/sonoma-coffee-logo.svg",
    image_url: "/businesses/sonoma-coffee.svg",
    created_at: "2026-05-02T14:00:00.000Z",
  },
  {
    id: "biz_valley_burger",
    name: "Valley Burger Co.",
    category: "Restaurant",
    description:
      "Family-owned burger spot serving locally-sourced beef, hand-cut fries, and a rotating list of specialty burgers.",
    location: "Napa Valley, CA",
    website: "https://valleyburgerco.example.com",
    contact_name: "Marcus Lee",
    contact_email: "marcus@valleyburgerco.example.com",
    contact_phone: "(707) 555-0198",
    logo_url: "/businesses/valley-burger-logo.svg",
    image_url: "/businesses/valley-burger.svg",
    created_at: "2026-05-10T14:00:00.000Z",
  },
  {
    id: "biz_glow_beauty",
    name: "Glow Beauty Studio",
    category: "Beauty",
    description:
      "Boutique studio offering facials, lash extensions, and skincare consultations in a calm, modern space.",
    location: "Santa Rosa, CA",
    website: "https://glowbeautystudio.example.com",
    contact_name: "Priya Nandan",
    contact_email: "priya@glowbeautystudio.example.com",
    contact_phone: "(707) 555-0173",
    logo_url: "/businesses/glow-beauty-logo.svg",
    image_url: "/businesses/glow-beauty.svg",
    created_at: "2026-05-18T14:00:00.000Z",
  },
  {
    id: "biz_north_bay_fitness",
    name: "North Bay Fitness",
    category: "Fitness",
    description:
      "Independent gym with strength training, small-group HIIT classes, and coaching for all experience levels.",
    location: "Petaluma, CA",
    website: "https://northbayfitness.example.com",
    contact_name: "Jordan Vasquez",
    contact_email: "jordan@northbayfitness.example.com",
    contact_phone: "(707) 555-0121",
    logo_url: "/businesses/north-bay-fitness-logo.svg",
    image_url: "/businesses/north-bay-fitness.svg",
    created_at: "2026-05-24T14:00:00.000Z",
  },
  {
    id: "biz_plaza_taco",
    name: "Plaza Taco Bar",
    category: "Restaurant",
    description:
      "Fast-casual taco bar with fresh tortillas, house salsas, and a rotating list of local craft beers on tap.",
    location: "Rohnert Park, CA",
    website: "https://plazatacobar.example.com",
    contact_name: "Elena Cruz",
    contact_email: "elena@plazatacobar.example.com",
    contact_phone: "(707) 555-0159",
    logo_url: "/businesses/plaza-taco-logo.svg",
    image_url: "/businesses/plaza-taco.svg",
    created_at: "2026-06-01T14:00:00.000Z",
  },
];

export function getBusinessById(id: string): Business | undefined {
  return businesses.find((b) => b.id === id);
}
