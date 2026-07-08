import { NextRequest, NextResponse } from "next/server";
import { castVote, getBattle, getVoteCountsForBattle, hasSessionVoted } from "@/lib/store";

export const dynamic = "force-dynamic";

export async function GET(request: NextRequest) {
  const battleId = request.nextUrl.searchParams.get("battleId");
  const sessionId = request.nextUrl.searchParams.get("sessionId");

  if (!battleId) {
    return NextResponse.json({ error: "battleId is required" }, { status: 400 });
  }

  const battle = getBattle(battleId);
  if (!battle) {
    return NextResponse.json({ error: "Battle not found" }, { status: 404 });
  }

  const counts = getVoteCountsForBattle(battleId);
  const hasVoted = sessionId ? hasSessionVoted(battleId, sessionId) : false;

  return NextResponse.json({
    status: battle.status,
    counts,
    totalVotes: battle.total_votes,
    hasVoted,
  });
}

export async function POST(request: NextRequest) {
  const body = await request.json().catch(() => null);
  const battleId = body?.battleId as string | undefined;
  const creatorId = body?.creatorId as string | undefined;
  const sessionId = body?.sessionId as string | undefined;

  if (!battleId || !creatorId || !sessionId) {
    return NextResponse.json(
      { ok: false, error: "battleId, creatorId, and sessionId are required" },
      { status: 400 }
    );
  }

  const result = castVote(battleId, creatorId, sessionId);

  if (!result.ok) {
    const status = result.error === "already_voted" ? 409 : 400;
    return NextResponse.json({ ok: false, error: result.error }, { status });
  }

  const counts = getVoteCountsForBattle(battleId);
  return NextResponse.json({
    ok: true,
    counts,
    totalVotes: result.battle.total_votes,
    votedFor: creatorId,
  });
}
