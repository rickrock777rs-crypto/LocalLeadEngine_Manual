import { Creator } from "@/lib/types";

export function WinnerBanner({ winner }: { winner: Creator }) {
  return (
    <div className="flex items-center gap-3 rounded-2xl border border-brand/40 bg-brand/10 p-4">
      <span className="text-2xl">🏆</span>
      <p className="text-sm font-semibold text-brand">
        {winner.name} won this battle
      </p>
    </div>
  );
}
