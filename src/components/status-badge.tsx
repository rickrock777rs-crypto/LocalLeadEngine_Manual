import { BattleStatus } from "@/lib/types";
import { STATUS_LABELS } from "@/lib/format";

const DOT_STYLES: Record<BattleStatus, string> = {
  draft: "bg-muted",
  upcoming: "bg-sky-400",
  live: "bg-win",
  voting_closed: "bg-amber-400",
  completed: "bg-brand",
};

const TEXT_STYLES: Record<BattleStatus, string> = {
  draft: "text-muted",
  upcoming: "text-sky-300",
  live: "text-win",
  voting_closed: "text-amber-300",
  completed: "text-brand",
};

export function StatusBadge({ status }: { status: BattleStatus }) {
  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-full border border-border bg-surface-2 px-2.5 py-1 text-xs font-semibold uppercase tracking-wide ${TEXT_STYLES[status]}`}
    >
      <span
        className={`h-1.5 w-1.5 rounded-full ${DOT_STYLES[status]} ${status === "live" ? "animate-pulse-live" : ""}`}
      />
      {STATUS_LABELS[status]}
    </span>
  );
}
