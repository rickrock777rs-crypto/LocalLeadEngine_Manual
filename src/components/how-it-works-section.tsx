const STEPS = [
  {
    step: "01",
    title: "A business gets featured",
    description:
      "A local business submits a challenge — what they want promoted and what kind of asset they need.",
  },
  {
    step: "02",
    title: "Two creators battle",
    description:
      "Two creators are matched into a head-to-head battle and each submit their best ad, flyer, or promo concept.",
  },
  {
    step: "03",
    title: "The public votes",
    description:
      "Viewers compare both submissions side by side and vote for the one most likely to win customers.",
  },
  {
    step: "04",
    title: "A winner is crowned",
    description:
      "The winning creator climbs the leaderboard and the business walks away with a ready-to-use marketing asset.",
  },
];

export function HowItWorksSection() {
  return (
    <section className="mx-auto max-w-6xl px-4 py-16 sm:px-6">
      <div className="mb-10 max-w-xl">
        <p className="text-xs font-semibold uppercase tracking-wide text-brand">How it works</p>
        <h2 className="mt-2 text-3xl font-extrabold tracking-tight text-foreground">
          The core loop: challenge → battle → vote → winner.
        </h2>
      </div>
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {STEPS.map((s) => (
          <div key={s.step} className="rounded-2xl border border-border bg-surface p-5">
            <span className="font-mono text-2xl font-extrabold text-brand">{s.step}</span>
            <h3 className="mt-3 font-semibold text-foreground">{s.title}</h3>
            <p className="mt-2 text-sm text-muted">{s.description}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
