import { NextRequest, NextResponse } from "next/server";
import { addCreatorSignup } from "@/lib/store";
import { CreatorSignup } from "@/lib/types";

export const dynamic = "force-dynamic";

export async function POST(request: NextRequest) {
  const body = await request.json().catch(() => null);

  if (!body?.creator_name || !body?.email || !body?.main_skill) {
    return NextResponse.json({ ok: false, error: "Missing required fields" }, { status: 400 });
  }
  if (!body?.agreed_to_rules) {
    return NextResponse.json(
      { ok: false, error: "You must agree to the competition rules" },
      { status: 400 }
    );
  }

  const signup: CreatorSignup = {
    id: `signup_${Date.now()}_${Math.random().toString(36).slice(2, 8)}`,
    creator_name: body.creator_name,
    email: body.email,
    location: body.location || "",
    main_skill: body.main_skill,
    portfolio_link: body.portfolio_link || undefined,
    bio: body.bio || "",
    preferred_category: body.preferred_category,
    experience_level: body.experience_level,
    agreed_to_rules: Boolean(body.agreed_to_rules),
    status: "new",
    created_at: new Date().toISOString(),
  };

  addCreatorSignup(signup);

  return NextResponse.json({ ok: true, id: signup.id });
}
