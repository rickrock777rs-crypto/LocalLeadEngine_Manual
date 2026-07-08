import type { Metadata } from "next";
import { LegalPage } from "@/components/legal-page";

export const metadata: Metadata = { title: "Creator Submission Agreement — Local Ad Battle" };

export default function CreatorAgreementPage() {
  return (
    <LegalPage
      title="Creator Submission Agreement"
      sections={[
        {
          heading: "Originality",
          body: "By submitting to a battle, you confirm the work is your own and doesn't infringe on anyone else's copyright, trademark, or brand assets.",
        },
        {
          heading: "Usage rights on a win",
          body: "If your submission wins a battle, you grant the featured business permission to use it for promotional purposes, unless a separate written agreement says otherwise.",
        },
        {
          heading: "Usage rights if you don't win",
          body: "Losing submissions remain your property. The business has no automatic right to use them without your separate agreement.",
        },
      ]}
    />
  );
}
