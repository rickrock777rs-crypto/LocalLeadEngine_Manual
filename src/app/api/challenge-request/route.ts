import { NextRequest, NextResponse } from "next/server";
import { addChallengeRequest } from "@/lib/store";
import { ChallengeRequest } from "@/lib/types";

export const dynamic = "force-dynamic";

export async function POST(request: NextRequest) {
  const body = await request.json().catch(() => null);

  if (!body?.business_name || !body?.contact_name || !body?.email || !body?.business_category) {
    return NextResponse.json(
      { ok: false, error: "Missing required fields" },
      { status: 400 }
    );
  }
  if (!body?.feature_permission) {
    return NextResponse.json(
      { ok: false, error: "You must grant permission to feature your business publicly" },
      { status: 400 }
    );
  }

  const request_: ChallengeRequest = {
    id: `req_${Date.now()}_${Math.random().toString(36).slice(2, 8)}`,
    business_name: body.business_name,
    contact_name: body.contact_name,
    email: body.email,
    phone: body.phone || undefined,
    business_category: body.business_category,
    website_or_social: body.website_or_social || undefined,
    promotion_goal: body.promotion_goal,
    desired_asset_type: body.desired_asset_type,
    offer_details: body.offer_details || undefined,
    budget_interest: body.budget_interest || "Not specified",
    deadline: body.deadline || undefined,
    message: body.message || undefined,
    feature_permission: Boolean(body.feature_permission),
    status: "new",
    created_at: new Date().toISOString(),
  };

  addChallengeRequest(request_);

  return NextResponse.json({ ok: true, id: request_.id });
}
