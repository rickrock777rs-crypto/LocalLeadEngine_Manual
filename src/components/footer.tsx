import Link from "next/link";

const COLUMNS = [
  {
    title: "Platform",
    links: [
      { href: "/battles", label: "Active Battles" },
      { href: "/leaderboard", label: "Leaderboard" },
      { href: "/pricing", label: "Pricing & Sponsorship" },
    ],
  },
  {
    title: "Get Involved",
    links: [
      { href: "/challenge", label: "Start a Business Challenge" },
      { href: "/join", label: "Join as a Creator" },
      { href: "/admin", label: "Admin" },
    ],
  },
  {
    title: "Trust & Rules",
    links: [
      { href: "/rules", label: "Competition Rules" },
      { href: "/legal/terms", label: "Terms of Use" },
      { href: "/legal/privacy", label: "Privacy Policy" },
    ],
  },
];

export function Footer() {
  return (
    <footer className="border-t border-border bg-surface">
      <div className="mx-auto grid max-w-6xl gap-8 px-4 py-12 sm:px-6 md:grid-cols-[1.3fr_1fr_1fr_1fr]">
        <div>
          <Link href="/" className="flex items-center gap-2 font-extrabold tracking-tight">
            <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-brand text-sm font-black text-brand-ink">
              AB
            </span>
            <span className="text-foreground">
              Local Ad <span className="text-brand">Battle</span>
            </span>
          </Link>
          <p className="mt-3 max-w-xs text-sm text-muted">
            Creators battle. Businesses get content. Viewers choose the winner.
          </p>
        </div>
        {COLUMNS.map((col) => (
          <div key={col.title}>
            <p className="text-xs font-semibold uppercase tracking-wide text-muted">{col.title}</p>
            <ul className="mt-3 flex flex-col gap-2 text-sm">
              {col.links.map((l) => (
                <li key={l.href}>
                  <Link href={l.href} className="text-foreground/80 transition hover:text-brand">
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
      <div className="border-t border-border px-4 py-6 text-center text-xs text-muted sm:px-6">
        © {new Date().getFullYear()} Local Ad Battle. MVP build — legal terms are placeholders pending review.
      </div>
    </footer>
  );
}
