import Link from "next/link";

export function HeroSection() {
  return (
    <section className="relative overflow-hidden border-b border-border">
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute -left-24 top-0 h-72 w-72 rounded-full bg-side-a/20 blur-3xl" />
        <div className="absolute -right-24 top-40 h-72 w-72 rounded-full bg-side-b/20 blur-3xl" />
      </div>

      <div className="relative mx-auto flex max-w-6xl flex-col items-start gap-6 px-4 py-20 sm:px-6 sm:py-28">
        <span className="rounded-full border border-border bg-surface px-3 py-1 text-xs font-semibold uppercase tracking-wide text-muted">
          A competitive creator arena
        </span>

        <h1 className="max-w-3xl text-balance text-4xl font-extrabold leading-tight tracking-tight text-foreground sm:text-6xl">
          Where creators battle to build better ads for local businesses.
        </h1>

        <p className="max-w-xl text-balance text-lg text-muted">
          Businesses get fresh marketing ideas. Creators compete for rankings. Viewers vote for the
          winner.
        </p>

        <div className="flex flex-wrap items-center gap-3 pt-2">
          <Link
            href="/challenge"
            className="rounded-full bg-brand px-6 py-3 text-sm font-bold text-brand-ink transition hover:opacity-90"
          >
            Start a Challenge
          </Link>
          <Link
            href="/join"
            className="rounded-full border border-border px-6 py-3 text-sm font-semibold text-foreground transition hover:border-brand hover:text-brand"
          >
            Enter as a Creator
          </Link>
        </div>

        <div className="mt-4 flex flex-wrap gap-x-8 gap-y-2 text-sm text-muted">
          <span>
            <strong className="text-foreground">Turn your business</strong> into a creative challenge
          </span>
          <span>
            <strong className="text-foreground">Climb the leaderboard</strong> by making ads people
            actually like
          </span>
        </div>
      </div>
    </section>
  );
}
