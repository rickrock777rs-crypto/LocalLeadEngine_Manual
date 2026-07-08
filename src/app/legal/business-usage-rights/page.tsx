import type { Metadata } from "next";
import { LegalPage } from "@/components/legal-page";

export const metadata: Metadata = { title: "Business Usage Rights — Local Ad Battle" };

export default function BusinessUsageRightsPage() {
  return (
    <LegalPage
      title="Business Usage Rights"
      sections={[
        {
          heading: "What you receive on a win",
          body: "The winning creator's submission may be used for your business's promotional purposes, per the Creator Submission Agreement.",
        },
        {
          heading: "Before running paid campaigns",
          body: "Confirm final commercial usage rights and any licensing terms directly with the creator before spending ad budget behind a winning submission.",
        },
        {
          heading: "Public feature",
          body: "By submitting a challenge request, you grant Local Ad Battle permission to publicly display your business name, category, and general offer details as part of the battle.",
        },
      ]}
    />
  );
}
