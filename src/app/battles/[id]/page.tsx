import Link from "next/link";
import { notFound } from "next/navigation";
import { getBattleViewModelById } from "@/lib/battle-view";
import { BattleComparison } from "@/components/battle-comparison";
import { StatusBadge } from "@/components/status-badge";
import { formatDate } from "@/lib/format";
import type { Metadata } from "next";

export const dynamic = "force-dynamic";

interface PageProps {
  params: Promise<{ id: string }>;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { id } = await params;
  const vm = getBattleViewModelById(id);
  if (!vm) return { title: "Battle not found — Local Ad Battle" };
  return {
    title: `${vm.battle.title} — Local Ad Battle`,
    description: vm.battle.brief,
  };
}

export default async function BattlePage({ params }: PageProps) {
  const { id } = await params;
  const vm = getBattleViewModelById(id);
  if (!vm) notFound();

  const { battle, business } = vm;

  return (
    <div className="mx-auto max-w-5xl px-4 py-12 sm:px-6">
      <Link href="/battles" className="text-sm text-muted hover:text-brand">
        ← All battles
      </Link>

      <div className="mt-4 flex flex-wrap items-start justify-between gap-4">
        <div>
          <div className="mb-2 flex items-center gap-2">
            <StatusBadge status={battle.status} />
            <span className="text-xs text-muted">Created {formatDate(battle.created_at)}</span>
          </div>
          <h1 className="text-3xl font-extrabold tracking-tight text-foreground sm:text-4xl">
            {battle.title}
          </h1>
        </div>
      </div>

      <div className="mt-6 rounded-2xl border border-border bg-surface p-5">
        <p className="text-xs font-semibold uppercase tracking-wide text-muted">
          Featured business
        </p>
        <p className="mt-1 text-lg font-bold text-foreground">
          {business.name} <span className="font-normal text-muted">· {business.category} · {business.location}</span>
        </p>
        <p className="mt-2 text-sm text-muted">{business.description}</p>

        <p className="mt-4 text-xs font-semibold uppercase tracking-wide text-muted">
          Challenge brief
        </p>
        <p className="mt-1 text-sm text-foreground/90">{battle.brief}</p>
      </div>

      <div className="mt-8">
        <BattleComparison vm={vm} />
      </div>

      <div className="mt-8 rounded-2xl border border-dashed border-border bg-surface/50 p-6 text-center text-sm text-muted">
        Comments are coming in a future release — for now, share the battle to get more votes.
      </div>
    </div>
  );
}
