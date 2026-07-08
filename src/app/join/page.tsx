import type { Metadata } from "next";
import { CreatorSignupForm } from "@/components/creator-signup-form";

export const metadata: Metadata = {
  title: "Join as a Creator — Local Ad Battle",
  description: "Compete in ad battles, build a public record, and climb the leaderboard.",
};

export default function JoinPage() {
  return (
    <div className="mx-auto max-w-2xl px-4 py-12 sm:px-6">
      <p className="text-xs font-semibold uppercase tracking-wide text-brand">For creators</p>
      <h1 className="mt-2 text-3xl font-extrabold tracking-tight text-foreground sm:text-4xl">
        Enter the arena
      </h1>
      <p className="mt-3 text-sm text-muted">
        Climb the leaderboard by making ads people actually like. Tell us what you make and
        we&apos;ll match you into a battle.
      </p>

      <div className="mt-8 rounded-2xl border border-border bg-surface p-6 sm:p-8">
        <CreatorSignupForm />
      </div>
    </div>
  );
}
