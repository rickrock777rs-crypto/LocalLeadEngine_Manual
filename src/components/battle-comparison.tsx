import { BattleViewModel } from "@/lib/battle-view";
import { SubmissionPanel } from "./submission-panel";
import { VoteButton } from "./vote-button";
import { WinnerBanner } from "./winner-banner";
import { CountdownTimer } from "./countdown-timer";
import { ShareButtons } from "./share-buttons";

const VOTING_CRITERIA = [
  "Most likely to get attention",
  "Best fit for the business",
  "Clearest message",
  "Strongest offer",
  "Most likely to make someone visit or buy",
];

export function BattleComparison({ vm }: { vm: BattleViewModel }) {
  const { battle, creatorA, creatorB, submissionA, submissionB, votesA, votesB } = vm;
  const isLive = battle.status === "live";
  const winner =
    battle.status === "completed" && battle.winner_creator_id
      ? battle.winner_creator_id === creatorA.id
        ? creatorA
        : creatorB
      : null;

  return (
    <div className="flex flex-col gap-6">
      {winner && <WinnerBanner winner={winner} />}

      <div className="flex flex-wrap items-center justify-between gap-3 rounded-2xl border border-border bg-surface-2 p-4">
        <div>
          <p className="text-xs font-semibold uppercase tracking-wide text-muted">Voting criteria</p>
          <p className="mt-1 text-sm text-foreground">{VOTING_CRITERIA.join(" · ")}</p>
        </div>
        {isLive && (
          <div className="text-right">
            <p className="text-xs font-semibold uppercase tracking-wide text-muted">Time left</p>
            <CountdownTimer endsAt={battle.voting_ends_at} className="font-mono text-sm text-brand" />
          </div>
        )}
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <SubmissionPanel
          side="a"
          creator={creatorA}
          submission={submissionA}
          isWinner={winner?.id === creatorA.id}
        />
        <SubmissionPanel
          side="b"
          creator={creatorB}
          submission={submissionB}
          isWinner={winner?.id === creatorB.id}
        />
      </div>

      <div className="rounded-2xl border border-border bg-surface p-5">
        <p className="mb-4 text-sm font-semibold text-foreground">Vote for the better ad</p>
        <VoteButton
          battleId={battle.id}
          isLive={isLive}
          creatorA={creatorA}
          creatorB={creatorB}
          initialVotesA={votesA}
          initialVotesB={votesB}
        />
        <p className="mt-4 text-xs text-muted">
          One vote per viewer session for this MVP. Future versions can add login-required voting,
          email verification, IP throttling, device fingerprinting, and admin review to prevent
          manipulation.
        </p>
      </div>

      <ShareButtons title={battle.title} />
    </div>
  );
}
