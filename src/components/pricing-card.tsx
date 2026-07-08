import Link from "next/link";

export interface PricingTier {
  name: string;
  price: string;
  description: string;
  features: string[];
  highlight?: boolean;
  cta: string;
  ctaHref: string;
}

export function PricingCard({ tier }: { tier: PricingTier }) {
  return (
    <div
      className={`flex flex-col gap-4 rounded-2xl border p-6 ${
        tier.highlight ? "border-brand bg-brand/5" : "border-border bg-surface"
      }`}
    >
      {tier.highlight && (
        <span className="w-fit rounded-full bg-brand px-2.5 py-1 text-[10px] font-bold uppercase tracking-wide text-brand-ink">
          Most Popular
        </span>
      )}
      <div>
        <h3 className="text-lg font-bold text-foreground">{tier.name}</h3>
        <p className="mt-1 text-2xl font-extrabold text-foreground">{tier.price}</p>
        <p className="mt-2 text-sm text-muted">{tier.description}</p>
      </div>
      <ul className="flex flex-1 flex-col gap-2 text-sm text-foreground/90">
        {tier.features.map((f) => (
          <li key={f} className="flex items-start gap-2">
            <span className="mt-0.5 text-brand">✓</span>
            <span>{f}</span>
          </li>
        ))}
      </ul>
      <Link
        href={tier.ctaHref}
        className={`mt-2 rounded-full px-4 py-2.5 text-center text-sm font-semibold transition ${
          tier.highlight
            ? "bg-brand text-brand-ink hover:opacity-90"
            : "border border-border text-foreground hover:border-brand hover:text-brand"
        }`}
      >
        {tier.cta}
      </Link>
    </div>
  );
}
