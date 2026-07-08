import Image from "next/image";
import Link from "next/link";
import { Creator, Submission } from "@/lib/types";

const SIDE_RING = { a: "ring-side-a", b: "ring-side-b" } as const;
const SIDE_TEXT = { a: "text-side-a", b: "text-side-b" } as const;
const SIDE_LABEL_BG = { a: "bg-side-a", b: "bg-side-b" } as const;

export function SubmissionPanel({
  side,
  creator,
  submission,
  isWinner,
}: {
  side: "a" | "b";
  creator: Creator;
  submission: Submission;
  isWinner?: boolean;
}) {
  return (
    <div className="flex flex-col overflow-hidden rounded-2xl border border-border bg-surface">
      <div className="relative h-56 w-full sm:h-72">
        {submission.image_url && (
          <Image src={submission.image_url} alt={submission.title} fill className="object-cover" />
        )}
        <div
          className={`absolute left-3 top-3 rounded-full px-2.5 py-1 text-[10px] font-bold uppercase tracking-wide text-black ${SIDE_LABEL_BG[side]}`}
        >
          Creator {side.toUpperCase()}
        </div>
        {isWinner && (
          <div className="absolute right-3 top-3 rounded-full bg-brand px-2.5 py-1 text-[10px] font-bold uppercase tracking-wide text-brand-ink">
            Winner
          </div>
        )}
      </div>

      <div className="flex flex-1 flex-col gap-3 p-5">
        <Link
          href={`/creators/${creator.username}`}
          className="flex items-center gap-3"
        >
          <div className={`relative h-10 w-10 shrink-0 overflow-hidden rounded-full ring-2 ${SIDE_RING[side]}`}>
            {creator.avatar_url && (
              <Image src={creator.avatar_url} alt={creator.name} fill className="object-cover" />
            )}
          </div>
          <div>
            <p className="font-semibold text-foreground hover:underline">{creator.name}</p>
            <p className="text-xs text-muted">
              {creator.wins}-{creator.losses} record
            </p>
          </div>
        </Link>

        <div>
          <p className={`text-xs font-semibold uppercase tracking-wide ${SIDE_TEXT[side]}`}>
            {submission.asset_type}
          </p>
          <h3 className="mt-1 text-lg font-bold text-foreground">{submission.title}</h3>
          <p className="mt-1 text-sm text-muted">{submission.description}</p>
        </div>

        <blockquote className="rounded-lg border border-border bg-surface-2 p-3 text-sm text-foreground/90">
          &ldquo;{submission.copy_text}&rdquo;
        </blockquote>

        <p className="mt-auto text-sm font-semibold text-foreground">
          CTA: <span className="font-normal text-muted">{submission.call_to_action}</span>
        </p>
      </div>
    </div>
  );
}
