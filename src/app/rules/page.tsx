import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Rules — Local Ad Battle",
  description: "Competition rules for businesses, creators, and viewers on Local Ad Battle.",
};

const RULES = [
  "Submissions must be original.",
  "No stolen designs, copied ads, or unauthorized brand assets.",
  "No hateful, threatening, or illegal content.",
  "Businesses must approve any public use of their name/logo.",
  "Voting manipulation may result in disqualification.",
  "The platform may remove inappropriate submissions.",
  "The winning creator grants the featured business permission to use the submitted asset for promotional purposes, unless otherwise agreed.",
  "Final commercial usage rights should be confirmed before paid campaigns.",
];

export default function RulesPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-12 sm:px-6">
      <p className="text-xs font-semibold uppercase tracking-wide text-brand">Rules</p>
      <h1 className="mt-2 text-3xl font-extrabold tracking-tight text-foreground sm:text-4xl">
        Competition rules
      </h1>
      <p className="mt-3 text-sm text-muted">
        Keep it original, keep it fair, and respect the businesses you&apos;re promoting.
      </p>

      <ol className="mt-8 flex flex-col gap-4">
        {RULES.map((rule, i) => (
          <li key={rule} className="flex gap-4 rounded-xl border border-border bg-surface p-4">
            <span className="font-mono text-sm font-bold text-brand">{String(i + 1).padStart(2, "0")}</span>
            <p className="text-sm text-foreground/90">{rule}</p>
          </li>
        ))}
      </ol>

      <div className="mt-8 rounded-xl border border-dashed border-border p-4 text-sm text-muted">
        This page is an MVP summary, not a binding legal contract. Full legal terms should be
        reviewed by counsel before a public launch — see{" "}
        <Link href="/legal/creator-agreement" className="text-brand hover:underline">
          Creator Submission Agreement
        </Link>{" "}
        and{" "}
        <Link href="/legal/business-usage-rights" className="text-brand hover:underline">
          Business Usage Rights
        </Link>
        .
      </div>
    </div>
  );
}
