import type { Metadata } from "next";
import { PricingCard } from "@/components/pricing-card";
import { pricingTiers } from "@/lib/data/pricing";

export const metadata: Metadata = {
  title: "Pricing & Sponsorship — Local Ad Battle",
  description: "Sponsorship packages for local businesses to get featured in an ad battle.",
};

export default function PricingPage() {
  return (
    <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6">
      <p className="text-xs font-semibold uppercase tracking-wide text-brand">Pricing</p>
      <h1 className="mt-2 text-3xl font-extrabold tracking-tight text-foreground sm:text-4xl">
        Get your business featured
      </h1>
      <p className="mt-3 max-w-xl text-sm text-muted">
        Every package includes public voting and a battle page. No payment processing yet — every
        button below routes to a sponsorship request our team follows up on directly.
      </p>

      <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {pricingTiers.map((tier) => (
          <PricingCard key={tier.name} tier={tier} />
        ))}
      </div>

      <div className="mt-10 rounded-2xl border border-dashed border-border p-5 text-sm text-muted">
        See the{" "}
        <a href="/legal/sponsor-disclosure" className="text-brand hover:underline">
          sponsor disclosure
        </a>{" "}
        for how sponsored battles are labeled to viewers.
      </div>
    </div>
  );
}
