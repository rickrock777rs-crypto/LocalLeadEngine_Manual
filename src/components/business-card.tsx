import Image from "next/image";
import { Business } from "@/lib/types";

export function BusinessCard({ business }: { business: Business }) {
  return (
    <div className="group flex items-center gap-4 rounded-2xl border border-border bg-surface p-4 transition hover:border-side-b/60">
      <div className="relative h-14 w-14 shrink-0 overflow-hidden rounded-xl">
        {business.logo_url && (
          <Image src={business.logo_url} alt={business.name} fill className="object-cover" />
        )}
      </div>
      <div className="min-w-0">
        <p className="truncate font-semibold text-foreground">{business.name}</p>
        <p className="truncate text-sm text-muted">
          {business.category} · {business.location}
        </p>
      </div>
    </div>
  );
}
