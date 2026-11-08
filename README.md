# WE HUBS — secure-first MVP starter

This repository contains a Next.js UI scaffold, a prototype Prisma domain model, a preliminary RBAC utility and detailed implementation documents. It is **NOT a production-ready student management system**. Business API routes intentionally return HTTP 501 until authentication, RLS, data ownership and audit controls are implemented.

## Setup
1. Install Node.js 20+ and PostgreSQL (or managed PostgreSQL).
2. `npm install`
3. Copy `.env.example` to `.env` and set a non-production database URL.
4. `npm run db:generate`
5. Review schema and tenant constraints before `npm run db:migrate`.
6. `npm run dev`; open http://localhost:3000.
7. Read `docs/CLAUDE_CODE_PLAN.md` and execute Sprint 0 using Claude Code.

## Security warning
No live login, authorization middleware, RLS, notification engine or AI integration has been implemented. Do not put personal, student, payment or visa data into this starter until these controls are completed and tested.
