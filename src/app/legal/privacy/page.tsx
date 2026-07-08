import type { Metadata } from "next";
import { LegalPage } from "@/components/legal-page";

export const metadata: Metadata = { title: "Privacy Policy — Local Ad Battle" };

export default function PrivacyPage() {
  return (
    <LegalPage
      title="Privacy Policy"
      sections={[
        {
          heading: "What we collect",
          body: "Contact details submitted through challenge requests and creator signups (name, email, phone), plus anonymous voting activity tied to a browser session identifier, not a personal account.",
        },
        {
          heading: "How we use it",
          body: "To match businesses with creators, run battles, and contact you about your submission. We don't sell contact information to third parties.",
        },
        {
          heading: "Voting data",
          body: "Votes are recorded with a session identifier stored in your browser to prevent duplicate voting. No personal account is required to vote in the MVP.",
        },
      ]}
    />
  );
}
