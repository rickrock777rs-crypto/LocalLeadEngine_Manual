# LocalLeadEngine — Project Context for Claude

## What This Project Is
Automated lead generation and routing platform for local service businesses.
Current niche: **Water Damage Restoration**.
Business model: capture homeowner emergency leads via landing page → validate → store → notify contractor via webhook.

## Revenue Targets
- $5k/month = 42 leads @ $120 each
- $10k/month = 84 leads
- $20k/month = 167 leads

## Architecture
| Layer | Tech | Purpose |
|---|---|---|
| Frontend | Static HTML + Tailwind CSS | Lead capture form for homeowners |
| Backend | FastAPI (Python, serverless) | Receive, validate, store leads |
| Database | PostgreSQL | Tables: leads, business_clients, lead_distribution |
| Automation | Webhook (Make.com) | SMS + email contractor notifications |

## Lead Fields
`full_name`, `phone_number`, `email`, `city`, `service_needed`, `urgency_level`

## Lead Flow
1. Homeowner submits form on landing page
2. FastAPI backend validates + stores the lead
3. Webhook fires → Make.com scenario runs → contractor gets SMS + email

## Deployment Target
- Frontend: Netlify (static hosting)
- Backend: Containerized FastAPI
- Database: PostgreSQL (hosted)

## Traffic Sources
- Google Ads
- Local SEO landing pages
- Short-form social media

## Key Files
- `landing_page.html` — lead capture form
- `api_server.py` — FastAPI backend
- `project_spec.json` — full project specification

## Developer Notes
- Rick is a beginner coder — explain API key setup step by step every time
- Always check for side effects before marking a fix complete
- Tests should be simple and readable (Rick uses them to learn)
- Make.com is the automation tool (not Zapier despite spec saying "Zapier-compatible")
