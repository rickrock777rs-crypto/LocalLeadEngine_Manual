import type { Metadata } from "next";
import { LegalPage } from "@/components/legal-page";

export const metadata: Metadata = { title: "Voting Rules — Local Ad Battle" };

export default function VotingRulesPage() {
  return (
    <LegalPage
      title="Voting Rules"
      sections={[
        {
          heading: "One vote per session",
          body: "Each viewer session may cast one vote per battle. Votes are tied to a browser-local session identifier for this MVP, not a verified account.",
        },
        {
          heading: "Manipulation",
          body: "Coordinated or automated vote manipulation may result in disqualification of the affected submission at the platform's discretion.",
        },
        {
          heading: "Planned improvements",
          body: "Future versions may add login-required voting, email verification, IP throttling, device fingerprinting, weighted judge scoring, or admin review before finalizing a winner.",
        },
      ]}
    />
  );
}
