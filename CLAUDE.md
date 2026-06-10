# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

LocalLeadEngine is a lead generation and routing platform for local service businesses. The current niche is Water Damage Restoration. The business model sells leads to local contractors at $120/lead. The intended lead flow is:

```
Homeowner submits form → FastAPI receives & validates → stored in PostgreSQL → webhook fires → contractor notified via SMS/email → logged in CRM
```

## Running the Backend

There is no `requirements.txt` yet. Install dependencies manually:

```bash
pip install fastapi uvicorn pydantic
```

Run the development server:

```bash
uvicorn api_server:app --reload
```

The API will be available at `http://localhost:8000`. The single endpoint is `POST /api/lead`.

## Architecture

### Current State (MVP scaffold)

| File | Role |
|------|------|
| `api_server.py` | FastAPI app with a single `POST /api/lead` endpoint and a Pydantic `Lead` model |
| `landing_page.html` | Static HTML form that POSTs to `/api/lead` — no CSS framework applied yet |
| `project_spec.json` | Authoritative source for business rules, DB schema, and automation workflow |

### Planned Architecture (from `project_spec.json`)

**Database** — PostgreSQL with three tables:
- `leads` — raw lead submissions
- `business_clients` — contractor accounts that receive leads
- `lead_distribution` — join table tracking which leads were sent to which contractors

**Automation** — Zapier-compatible webhooks triggered after a lead is stored:
1. Send SMS to matched contractor
2. Email contractor
3. Log lead in CRM

**Frontend** — Static HTML + Tailwind CSS, deployable to Netlify or any static host.

**Backend** — FastAPI, intended for containerized deployment.

### Lead Data Model

The `Lead` Pydantic model in `api_server.py` is the canonical shape for all lead data:

```python
full_name: str        # required
phone_number: str     # required
email: str | None     # optional
city: str             # required
service_needed: str   # "Flood Cleanup" | "Burst Pipe" | "Mold Removal"
urgency_level: str    # "Immediate" | "Within 24 Hours" | "Within 3 Days"
```

## Key Implementation Gaps

The following are stubbed or missing and need to be built out before production:

- **Database layer** — `create_lead` currently only prints to stdout; needs SQLAlchemy or asyncpg connection to PostgreSQL
- **Webhook trigger** — no outbound HTTP call to Zapier yet
- **Environment config** — no `.env` / settings management; DB URL and webhook URL will need to be injected via environment variables
- **Form submission** — `landing_page.html` POSTs as `application/x-www-form-urlencoded` but the API expects JSON; needs alignment (either use `fetch` on the frontend or switch the endpoint to accept form data)
- **Tailwind CSS** — not yet applied to `landing_page.html`
- **Tests and linting** — no test suite or linter configured
