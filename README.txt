
LocalLeadEngine Project

Purpose
Generate homeowner service leads and distribute them to local contractors.

Core Components
1. Landing Page (landing_page.html)
2. API Backend (api_server.py using FastAPI)
3. Project specification (project_spec.json)

Deployment Suggestions
Frontend: static hosting (Netlify or similar)
Backend: containerized FastAPI service
Database: PostgreSQL
Automation: webhook integration with Zapier for SMS/email notifications

Lead Flow
User submits form -> API receives lead -> stored in DB -> webhook triggers -> contractor notified
