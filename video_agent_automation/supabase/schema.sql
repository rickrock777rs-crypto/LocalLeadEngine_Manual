-- Video-to-Agent Task Automation — v1 Supabase schema
--
-- Scope for this session: tasks, task_steps, user_queue only (Layer 1-3
-- state model). pattern_memory (Layer 4) is defined in the blueprint but is
-- out of scope until Layer 2/3 execution is built, so it is intentionally
-- omitted here.
--
-- SANDBOX / DRY-RUN ONLY. This file has not been applied to any live
-- Supabase project. Do not run it against a live project without explicit
-- approval, per standing build protocol.

create table tasks (
  id uuid primary key default gen_random_uuid(),
  source_url text,
  overall_goal text,
  markdown_content text,
  status text default 'pending', -- pending | running | blocked | done | failed
  created_at timestamptz default now()
);

create table task_steps (
  id uuid primary key default gen_random_uuid(),
  task_id uuid references tasks(id) on delete cascade,
  step_number int,
  short_name text,
  action text,
  requires_human boolean default false,
  block_reason text, -- login | 2fa | captcha | needs_clarification | approval
  status text default 'pending', -- pending | running | blocked | queued_for_user | done | skipped
  browser_session_state jsonb, -- cookies/session, current URL, screenshot ref
  resume_condition text,
  updated_at timestamptz default now()
);

create table user_queue (
  id uuid primary key default gen_random_uuid(),
  task_id uuid references tasks(id),
  step_id uuid references task_steps(id),
  prompt_message text,
  status text default 'waiting', -- waiting | resolved
  created_at timestamptz default now(),
  resolved_at timestamptz
);
