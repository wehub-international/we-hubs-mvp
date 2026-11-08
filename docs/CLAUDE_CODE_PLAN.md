# Claude Code delivery plan

## Sprint 0 — Foundation and threat model
- Confirm branch master data, roles, approval authority, retention periods and customer data-sharing rules.
- Create Git repository, staging/prod environments, CI checks, secret manager, logging, backups.
- Implement OIDC authentication with MFA, disable inactive users, scoped RBAC, PostgreSQL RLS.
- Write integration tests proving cross-company and cross-branch isolation before any feature API.

## Sprint 1 — Shared CRM and organizational admin
- Company/branch selectors, users and role assignments with approval.
- Contacts, contact-company data sharing grants, service enrollments, audit log.
- Zod validation, pagination, query filters and idempotent mutations.

## Sprint 2 — Three business verticals
- WESA: courses, classes, lessons, attendance, teacher assignment.
- WE STUDY: lead pipeline, study abroad case, checklist templates and task ownership.
- WE TRAVEL: tours, bespoke requests, quotes, bookings, traveler lists.

## Sprint 3 — Finance and communications
- Invoice lines, payment allocations, approval states, transaction ledger.
- Notification outbox, scheduler, duplicate-send prevention, consent preferences.
- Preview and manual approval before enabling external email dispatch.

## Sprint 4 — Academic depth and controlled AI
- Assignment submissions, feedback, learning paths and reports.
- AI draft tools constrained by actor permissions, redaction, review, logging and cost budgets.

## Sprint 5 — Hardening and pilot
- Threat-model review, penetration testing, UAT with all three companies, load tests.
- Restore rehearsal, incident playbook, training, production deployment with rollback.

## Claude Code prompt — start here
Read docs/PRD.md, docs/ERD.md, docs/PERMISSIONS.md and prisma/schema.prisma. Implement Sprint 0 only. Prioritize verified OIDC authentication, tenant-scoped authorization, PostgreSQL row-level security, migration integrity, and automated negative tests for cross-company/branch access. Do not enable the stub business APIs until all security gates pass. Do not use real customer data. Provide a diff summary, test evidence, migration steps and security caveats after implementation.

## Critical review gates
- No business API ships with placeholder authentication.
- No financial send/approval is autonomous.
- Every migration is reviewed and rollback-tested.
- Separate staging and production credentials.
