import Link from "next/link";

const LINKS = [
  { href: "/battles", label: "Battles" },
  { href: "/leaderboard", label: "Leaderboard" },
  { href: "/pricing", label: "Pricing" },
  { href: "/rules", label: "Rules" },
];

export function Nav() {
  return (
    <header className="sticky top-0 z-50 border-b border-border bg-background/90 backdrop-blur">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-4 sm:px-6">
        <Link href="/" className="flex items-center gap-2 font-extrabold tracking-tight">
          <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-brand text-sm font-black text-brand-ink">
            AB
          </span>
          <span className="text-foreground">
            Local Ad <span className="text-brand">Battle</span>
          </span>
        </Link>

        <nav className="hidden items-center gap-6 text-sm font-medium text-muted md:flex">
          {LINKS.map((l) => (
            <Link key={l.href} href={l.href} className="transition hover:text-foreground">
              {l.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <Link
            href="/join"
            className="hidden rounded-full border border-border px-4 py-2 text-sm font-semibold text-foreground transition hover:border-brand hover:text-brand sm:block"
          >
            Join as Creator
          </Link>
          <Link
            href="/challenge"
            className="rounded-full bg-brand px-4 py-2 text-sm font-bold text-brand-ink transition hover:opacity-90"
          >
            Start a Challenge
          </Link>
        </div>
      </div>
      <nav className="flex items-center gap-4 overflow-x-auto border-t border-border px-4 py-2 text-xs font-medium text-muted md:hidden">
        {LINKS.map((l) => (
          <Link key={l.href} href={l.href} className="shrink-0 transition hover:text-foreground">
            {l.label}
          </Link>
        ))}
      </nav>
    </header>
  );
}
