"use client";

import { useEffect, useState } from "react";
import { Creator } from "@/lib/types";
import { votePercentages } from "@/lib/format";

const SESSION_KEY = "lab_voter_session_id";

function getSessionId(): string {
  if (typeof window === "undefined") return "";
  let id = window.localStorage.getItem(SESSION_KEY);
  if (!id) {
    id = crypto.randomUUID();
    window.localStorage.setItem(SESSION_KEY, id);
  }
  return id;
}

interface VoteButtonProps {
  battleId: string;
  isLive: boolean;
  creatorA: Creator;
  creatorB: Creator;
  initialVotesA: number;
  initialVotesB: number;
}

export function VoteButton({
  battleId,
  isLive,
  creatorA,
  creatorB,
  initialVotesA,
  initialVotesB,
}: VoteButtonProps) {
  const [votesA, setVotesA] = useState(initialVotesA);
  const [votesB, setVotesB] = useState(initialVotesB);
  const [votedFor, setVotedFor] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const sessionId = getSessionId();
    fetch(`/api/vote?battleId=${battleId}&sessionId=${sessionId}`)
      .then((r) => r.json())
      .then((data) => {
        if (data.counts) {
          setVotesA(data.counts[creatorA.id] ?? 0);
          setVotesB(data.counts[creatorB.id] ?? 0);
        }
        if (data.hasVoted) {
          // MVP can't tell which side without storing it locally too, so
          // fall back to a locally-remembered choice for this battle.
          const local = window.localStorage.getItem(`lab_voted_${battleId}`);
          setVotedFor(local);
        }
        setReady(true);
      })
      .catch(() => setReady(true));
  }, [battleId, creatorA.id, creatorB.id]);

  async function vote(creatorId: string) {
    if (loading || votedFor || !isLive) return;
    setLoading(true);
    setError(null);
    const sessionId = getSessionId();

    try {
      const res = await fetch("/api/vote", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ battleId, creatorId, sessionId }),
      });
      const data = await res.json();

      if (!res.ok || !data.ok) {
        if (data.error === "already_voted") {
          setVotedFor(window.localStorage.getItem(`lab_voted_${battleId}`) ?? creatorId);
        } else {
          setError("Couldn't record your vote. Try again.");
        }
        return;
      }

      setVotesA(data.counts[creatorA.id] ?? 0);
      setVotesB(data.counts[creatorB.id] ?? 0);
      setVotedFor(creatorId);
      window.localStorage.setItem(`lab_voted_${battleId}`, creatorId);
    } catch {
      setError("Network error — try again.");
    } finally {
      setLoading(false);
    }
  }

  const pct = votePercentages(votesA, votesB);
  const showResults = Boolean(votedFor) || !isLive;

  return (
    <div className="grid grid-cols-2 gap-4">
      <VoteSide
        side="a"
        creator={creatorA}
        votes={votesA}
        pct={pct.a}
        showResults={showResults}
        isWinner={votedFor === creatorA.id}
        disabled={!isLive || loading || Boolean(votedFor) || !ready}
        onVote={() => vote(creatorA.id)}
      />
      <VoteSide
        side="b"
        creator={creatorB}
        votes={votesB}
        pct={pct.b}
        showResults={showResults}
        isWinner={votedFor === creatorB.id}
        disabled={!isLive || loading || Boolean(votedFor) || !ready}
        onVote={() => vote(creatorB.id)}
      />
      {error && <p className="col-span-2 text-sm text-loss">{error}</p>}
      {!isLive && (
        <p className="col-span-2 text-center text-sm text-muted">
          Voting isn&apos;t open for this battle right now.
        </p>
      )}
      {isLive && votedFor && (
        <p className="col-span-2 text-center text-sm text-win">
          Vote recorded — thanks for judging this battle.
        </p>
      )}
    </div>
  );
}

// Tailwind needs literal class names to scan at build time, so side-specific
// styles are spelled out per side rather than built from a template string.
const SIDE_STYLES = {
  a: {
    border: "border-side-a",
    borderHover: "hover:border-side-a",
    bgSoft: "bg-side-a-soft",
    fill: "bg-side-a/15",
    text: "text-side-a",
  },
  b: {
    border: "border-side-b",
    borderHover: "hover:border-side-b",
    bgSoft: "bg-side-b-soft",
    fill: "bg-side-b/15",
    text: "text-side-b",
  },
} as const;

function VoteSide({
  side,
  creator,
  votes,
  pct,
  showResults,
  isWinner,
  disabled,
  onVote,
}: {
  side: "a" | "b";
  creator: Creator;
  votes: number;
  pct: number;
  showResults: boolean;
  isWinner: boolean;
  disabled: boolean;
  onVote: () => void;
}) {
  const s = SIDE_STYLES[side];

  return (
    <button
      type="button"
      onClick={onVote}
      disabled={disabled}
      className={`relative overflow-hidden rounded-xl border p-4 text-left transition disabled:cursor-default ${
        isWinner ? `${s.border} ${s.bgSoft}` : `border-border bg-surface-2 ${s.borderHover}`
      }`}
    >
      {showResults && (
        <div className={`absolute inset-y-0 left-0 ${s.fill}`} style={{ width: `${pct}%` }} />
      )}
      <div className="relative flex items-center justify-between gap-2">
        <span className="font-semibold text-foreground">{creator.name}</span>
        {showResults && <span className={`font-mono text-sm ${s.text}`}>{pct}%</span>}
      </div>
      <p className="relative mt-1 text-xs text-muted">
        {showResults ? `${votes} vote${votes === 1 ? "" : "s"}` : "Tap to vote"}
      </p>
    </button>
  );
}
