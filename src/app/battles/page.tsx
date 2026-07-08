import Link from "next/link";
import { BattleCard } from "@/components/battle-card";
import { getAllBattleViewModels } from "@/lib/battle-view";
import { BUSINESS_CATEGORIES, BattleStatus, BusinessCategory } from "@/lib/types";
import { STATUS_LABELS } from "@/lib/format";

export const dynamic = "force-dynamic";

const STATUS_FILTERS: { label: string; value: BattleStatus | "all" }[] = [
  { label: "All", value: "all" },
  { label: STATUS_LABELS.live, value: "live" },
  { label: STATUS_LABELS.upcoming, value: "upcoming" },
  { label: STATUS_LABELS.completed, value: "completed" },
];

function buildHref(status: string, category: string) {
  const params = new URLSearchParams();
  if (status !== "all") params.set("status", status);
  if (category !== "all") params.set("category", category);
  const qs = params.toString();
  return qs ? `/battles?${qs}` : "/battles";
}

export default async function BattlesPage({
  searchParams,
}: {
  searchParams: Promise<{ status?: string; category?: string }>;
}) {
  const params = await searchParams;
  const statusFilter = (params.status as BattleStatus | undefined) ?? "all";
  const categoryFilter = (params.category as BusinessCategory | undefined) ?? "all";

  const battleViewModels = getAllBattleViewModels().filter((vm) => {
    const statusOk =
      statusFilter === "all"
        ? true
        : statusFilter === "upcoming"
          ? vm.battle.status === "upcoming"
          : vm.battle.status === statusFilter;
    const categoryOk = categoryFilter === "all" ? true : vm.battle.category === categoryFilter;
    return statusOk && categoryOk;
  });

  return (
    <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6">
      <div className="mb-8">
        <p className="text-xs font-semibold uppercase tracking-wide text-brand">Battles</p>
        <h1 className="mt-2 text-3xl font-extrabold tracking-tight text-foreground sm:text-4xl">
          Every ad battle, live and completed
        </h1>
        <p className="mt-2 max-w-xl text-sm text-muted">
          Compare submissions, vote for your favorite, and see who&apos;s climbing the leaderboard.
        </p>
      </div>

      <div className="mb-6 flex flex-wrap gap-2">
        {STATUS_FILTERS.map((f) => (
          <Link
            key={f.value}
            href={buildHref(f.value, categoryFilter)}
            className={`rounded-full border px-3 py-1.5 text-sm font-medium transition ${
              statusFilter === f.value
                ? "border-brand bg-brand text-brand-ink"
                : "border-border text-muted hover:border-brand hover:text-foreground"
            }`}
          >
            {f.label}
          </Link>
        ))}
      </div>

      <div className="mb-10 flex flex-wrap gap-2">
        <Link
          href={buildHref(statusFilter, "all")}
          className={`rounded-full border px-3 py-1.5 text-xs font-medium transition ${
            categoryFilter === "all"
              ? "border-foreground text-foreground"
              : "border-border text-muted hover:border-foreground hover:text-foreground"
          }`}
        >
          All categories
        </Link>
        {BUSINESS_CATEGORIES.map((cat) => (
          <Link
            key={cat}
            href={buildHref(statusFilter, cat)}
            className={`rounded-full border px-3 py-1.5 text-xs font-medium transition ${
              categoryFilter === cat
                ? "border-foreground text-foreground"
                : "border-border text-muted hover:border-foreground hover:text-foreground"
            }`}
          >
            {cat}
          </Link>
        ))}
      </div>

      {battleViewModels.length === 0 ? (
        <p className="rounded-2xl border border-border bg-surface p-10 text-center text-sm text-muted">
          No battles match those filters yet. Check back soon or{" "}
          <Link href="/challenge" className="text-brand hover:underline">
            start one
          </Link>
          .
        </p>
      ) : (
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {battleViewModels.map((vm) => (
            <BattleCard key={vm.battle.id} vm={vm} />
          ))}
        </div>
      )}
    </div>
  );
}
