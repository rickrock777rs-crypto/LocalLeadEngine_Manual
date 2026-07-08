import type { Metadata } from "next";
import { ChallengeRequestForm } from "@/components/challenge-request-form";

export const metadata: Metadata = {
  title: "Start a Business Challenge — Local Ad Battle",
  description: "Get your local business featured in a creator ad battle.",
};

export default function ChallengePage() {
  return (
    <div className="mx-auto max-w-2xl px-4 py-12 sm:px-6">
      <p className="text-xs font-semibold uppercase tracking-wide text-brand">For businesses</p>
      <h1 className="mt-2 text-3xl font-extrabold tracking-tight text-foreground sm:text-4xl">
        Start a Business Challenge
      </h1>
      <p className="mt-3 text-sm text-muted">
        Let creators compete to make your next ad. Tell us about your business and what you want
        promoted — our team matches you with two creators for a head-to-head battle.
      </p>

      <div className="mt-8 rounded-2xl border border-border bg-surface p-6 sm:p-8">
        <ChallengeRequestForm />
      </div>
    </div>
  );
}
