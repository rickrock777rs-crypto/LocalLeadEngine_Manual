import type { Metadata } from "next";
import Link from "next/link";
import { getAllChallengeRequests, getAllCreatorSignups, getAllBattles } from "@/lib/store";
import { StatusBadge } from "@/components/status-badge";
import { formatDate } from "@/lib/format";

export const dynamic = "force-dynamic";

export const metadata: Metadata = { title: "Admin — Local Ad Battle" };

const FUTURE_ADMIN_ACTIONS = [
  "Create a battle from a challenge request (assign business + two creators)",
  "Add/edit creator A and creator B submissions",
  "Open voting on an upcoming battle",
  "Close voting early on a live battle",
  "Declare a winner (already implemented in src/lib/store.ts as declareWinner())",
  "Feature a battle on the homepage",
  "Approve or waitlist a creator signup",
];

export default function AdminPage() {
  const battles = getAllBattles();
  const challengeRequests = getAllChallengeRequests();
  const creatorSignups = getAllCreatorSignups();

  return (
    <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6">
      <p className="text-xs font-semibold uppercase tracking-wide text-brand">Admin</p>
      <h1 className="mt-2 text-3xl font-extrabold tracking-tight text-foreground sm:text-4xl">
        Operations dashboard
      </h1>
      <p className="mt-3 max-w-2xl text-sm text-muted">
        This MVP admin view is read-only and shows the current in-memory data store. It&apos;s
        structured so a real admin panel (with the actions below) can be built directly on top of
        the functions already in <code className="text-brand">src/lib/store.ts</code>.
      </p>

      <section className="mt-10">
        <h2 className="mb-4 text-lg font-bold text-foreground">Battles ({battles.length})</h2>
        <div className="overflow-x-auto rounded-2xl border border-border bg-surface">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-border text-left text-xs uppercase tracking-wide text-muted">
                <th className="px-4 py-3">Title</th>
                <th className="px-4 py-3">Status</th>
                <th className="px-4 py-3">Votes</th>
                <th className="px-4 py-3">Winner</th>
                <th className="px-4 py-3">Created</th>
              </tr>
            </thead>
            <tbody>
              {battles.map((b) => (
                <tr key={b.id} className="border-b border-border last:border-0">
                  <td className="px-4 py-3">
                    <Link href={`/battles/${b.id}`} className="text-foreground hover:text-brand">
                      {b.title}
                    </Link>
                  </td>
                  <td className="px-4 py-3">
                    <StatusBadge status={b.status} />
                  </td>
                  <td className="px-4 py-3 font-mono">{b.total_votes}</td>
                  <td className="px-4 py-3 text-muted">{b.winner_creator_id ?? "—"}</td>
                  <td className="px-4 py-3 text-muted">{formatDate(b.created_at)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      <section className="mt-10">
        <h2 className="mb-4 text-lg font-bold text-foreground">
          Business challenge requests ({challengeRequests.length})
        </h2>
        {challengeRequests.length === 0 ? (
          <EmptyState label="No challenge requests submitted yet. Try the /challenge form." />
        ) : (
          <div className="overflow-x-auto rounded-2xl border border-border bg-surface">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-border text-left text-xs uppercase tracking-wide text-muted">
                  <th className="px-4 py-3">Business</th>
                  <th className="px-4 py-3">Contact</th>
                  <th className="px-4 py-3">Category</th>
                  <th className="px-4 py-3">Asset type</th>
                  <th className="px-4 py-3">Status</th>
                </tr>
              </thead>
              <tbody>
                {challengeRequests.map((r) => (
                  <tr key={r.id} className="border-b border-border last:border-0">
                    <td className="px-4 py-3 text-foreground">{r.business_name}</td>
                    <td className="px-4 py-3 text-muted">
                      {r.contact_name} · {r.email}
                    </td>
                    <td className="px-4 py-3 text-muted">{r.business_category}</td>
                    <td className="px-4 py-3 text-muted">{r.desired_asset_type}</td>
                    <td className="px-4 py-3 text-muted">{r.status}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </section>

      <section className="mt-10">
        <h2 className="mb-4 text-lg font-bold text-foreground">
          Creator signups ({creatorSignups.length})
        </h2>
        {creatorSignups.length === 0 ? (
          <EmptyState label="No creator signups yet. Try the /join form." />
        ) : (
          <div className="overflow-x-auto rounded-2xl border border-border bg-surface">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-border text-left text-xs uppercase tracking-wide text-muted">
                  <th className="px-4 py-3">Name</th>
                  <th className="px-4 py-3">Email</th>
                  <th className="px-4 py-3">Main skill</th>
                  <th className="px-4 py-3">Experience</th>
                  <th className="px-4 py-3">Status</th>
                </tr>
              </thead>
              <tbody>
                {creatorSignups.map((c) => (
                  <tr key={c.id} className="border-b border-border last:border-0">
                    <td className="px-4 py-3 text-foreground">{c.creator_name}</td>
                    <td className="px-4 py-3 text-muted">{c.email}</td>
                    <td className="px-4 py-3 text-muted">{c.main_skill}</td>
                    <td className="px-4 py-3 text-muted">{c.experience_level}</td>
                    <td className="px-4 py-3 text-muted">{c.status}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </section>

      <section className="mt-10 rounded-2xl border border-dashed border-border p-5">
        <h2 className="mb-3 text-sm font-bold uppercase tracking-wide text-muted">
          Planned admin actions (not yet wired to UI)
        </h2>
        <ul className="flex flex-col gap-2 text-sm text-foreground/90">
          {FUTURE_ADMIN_ACTIONS.map((a) => (
            <li key={a} className="flex items-start gap-2">
              <span className="mt-0.5 text-brand">→</span>
              <span>{a}</span>
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
}

function EmptyState({ label }: { label: string }) {
  return (
    <div className="rounded-2xl border border-border bg-surface p-6 text-sm text-muted">{label}</div>
  );
}
