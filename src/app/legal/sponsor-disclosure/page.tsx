import type { Metadata } from "next";
import { LegalPage } from "@/components/legal-page";

export const metadata: Metadata = { title: "Sponsor Disclosure — Local Ad Battle" };

export default function SponsorDisclosurePage() {
  return (
    <LegalPage
      title="Sponsor Disclosure"
      sections={[
        {
          heading: "Sponsored battles",
          body: "Battles created through a paid sponsorship package are labeled with a Sponsor badge on the battle card and battle page so viewers know the business paid to be featured.",
        },
        {
          heading: "Voting integrity",
          body: "Sponsorship affects how a business gets featured — it never affects vote counts or which creator wins a battle.",
        },
      ]}
    />
  );
}
