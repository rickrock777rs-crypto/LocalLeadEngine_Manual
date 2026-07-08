import type { Metadata } from "next";
import { LegalPage } from "@/components/legal-page";

export const metadata: Metadata = { title: "Terms of Use — Local Ad Battle" };

export default function TermsPage() {
  return (
    <LegalPage
      title="Terms of Use"
      sections={[
        {
          heading: "Using the platform",
          body: "By using Local Ad Battle you agree to follow the competition rules, submit accurate information, and use the platform for lawful, good-faith participation in business challenges and creator battles.",
        },
        {
          heading: "Accounts and submissions",
          body: "You are responsible for the accuracy of information you submit, including business challenge requests and creator submissions.",
        },
        {
          heading: "Changes to the platform",
          body: "Features, rankings logic, and pricing may change as the platform moves out of MVP. We'll aim to communicate material changes to active businesses and creators.",
        },
      ]}
    />
  );
}
