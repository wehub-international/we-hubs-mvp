# WE HUBS — Product Requirements Document (PRD v1.0)

## 1. Product goal
One cloud platform for WE STUDY, WE TRAVEL, and WE STUDY ACADEMY, sharing identity and customer master records while enforcing company/branch/resource-scoped authorization. Pilot all three companies with separate staff and client access surfaces.

## 2. Domain surfaces
- `wehubs.org`: public hub presenting the three companies; no private customer or operational records.
- `client.wehubs.org`: client portal. Visitors may self-register with email and phone to submit their own inquiry; verified students/parents may view only records linked to their approved student/guardian relationship and company affiliation.
- `work.wehubs.org`: authenticated staff workspace for company operations. No public employee registration; staff accounts and role assignments are provisioned by authorized administrators.
- Staff use their verified company email address hosted by Mắt Bão as their WE HUBS login identifier. Do not assume Microsoft 365/Entra SSO; never collect or reuse mailbox passwords. Application access is granted only through explicit staff account provisioning and role assignments.
- Staff authentication method: invite-only account, separate WE HUBS password, and authenticator-app MFA (TOTP). Password reset and MFA recovery must be verified and audited.
- Domain separation is not an authorization boundary by itself. Every API and data query must enforce identity, company, branch, resource, and record-level access server-side.
- Public registration creates a prospective client account/lead only. Selecting a company or entering an email/phone must never reveal or link existing student records by itself.
- Linking an existing student or guardian record requires verified identity and an approved relationship match. The login credential method (password with MFA or one-time code) remains to be selected.

## 3. Organizational model
- Companies: WS, WT, WESA; legal entities remain separate.
- Branches: WS HCM/DANANG/HATINH/CANTHO; WT HCM/DANANG/HATINH; WESA DANANG/HATINH. Verify active branch status before production seeding.
- A staff account can have multiple role assignments across companies and branches.
- Global technical administrator must not automatically access confidential student/finance content.

## 4. Personas
Group director; company director; branch manager; academic manager; teacher; admissions; visa processing; tour operator; accountant; auditor; system administrator; students and parents with verified portal access.

## 5. Functional requirements (priority P0/P1/P2)
| ID | Priority | Requirement | Acceptance |
|---|---|---|---|
| CORE-01 | P0 | Staff login with verified Mắt Bão company email, separate WE HUBS password, and authenticator-app MFA | Staff account must be invited by an administrator; expired/invalid sessions and disabled accounts rejected; recovery is verified/audited; mailbox credentials are never collected or reused |
| CORE-02 | P0 | Company and branch selection | Cross-company data inaccessible without explicit grant |
| CORE-03 | P0 | Scoped RBAC, default deny | API and DB policies block unauthorized read/write |
| CORE-04 | P0 | Contact master + service enrollment | One contact supports multiple company services |
| CORE-05 | P0 | Immutable audit trail for privileged actions | Actor, timestamp, target and change captured |
| ACA-01 | P0 | Courses, classes, lessons, enrollment | Branch-scoped teacher can access assigned classes only |
| ACA-02 | P0 | Attendance per lesson | Duplicate attendance for same learner/lesson blocked |
| ACA-03 | P1 | Assignments and submissions | Due date, submission and teacher evaluation recorded |
| ACA-04 | P1 | Post-lesson feedback | Teacher notes attributable; edit history retained |
| ACA-05 | P1 | Learning paths | Baseline, target, milestones, progress history |
| WS-01 | P0 | Leads and consultation cases | Assigned owner and stage visible to authorized staff |
| WS-02 | P0 | Study-abroad cases and checklists | Template per destination/program, task owner and due date |
| WS-03 | P1 | Document uploads and reviews | Signed URLs, virus scan, version history, approval |
| WT-01 | P0 | Tour catalog and custom tour requests | Distinct quote/booking/itinerary lifecycle |
| WT-02 | P0 | Bookings and travelers | Booking links to contact and tour; permissions enforced |
| WT-03 | P1 | Supplier, rooming, expense reconciliation | Currency and cost ownership tracked |
| FIN-01 | P0 | Company-scoped invoices and payments | Decimal money, currency, approval and payment verification |
| FIN-02 | P1 | Automated tuition/fee reminders | Idempotent scheduler, opt-in/contact preference, audit log |
| FIN-03 | P1 | Refunds/credit notes | Maker-checker approval and immutable ledger events |
| AI-01 | P1 | AI drafting and recommendations | Explicit human approval before external send or sensitive write |
| PORTAL-01 | P1 | Student/parent portal at `client.wehubs.org` | Authenticated learner/guardian can view only their verified linked records; no cross-customer access |
| PORTAL-02 | P1 | Staff workspace at `work.wehubs.org` | Staff authentication required; no public registration; account/role provisioning audited |
| PORTAL-03 | P1 | Public client self-registration | Collect verified email and phone, selected company/service, privacy notice/consent, and only the minimum inquiry data; new account can view only its own submitted inquiry |
| PORTAL-04 | P1 | Link existing learner/guardian record | Identity and student/guardian relationship must be verified and approved before existing records are visible; prevent account/record enumeration |

## 6. Key workflows
1. Create contact -> enroll in WESA -> class -> lesson -> attendance -> feedback -> progress report -> invoice.
2. Existing WESA learner requests study abroad -> authorized referral -> WS case -> configurable checklist -> document review.
3. Contact requests tour -> WT custom quote -> approval -> booking -> itinerary -> payment -> operations.
4. Finance creates draft invoice -> approver authorizes -> notification queue -> payment verification -> stop reminders.

## 7. Non-functional requirements
- Mắt Bão Vibe Host is the selected platform for staging and the target hosting platform for WE HUBS. Mắt Bão's published materials describe deploying Next.js and using Vibe Host as a Vercel alternative; the Vibe Host guide documents container deployment, Node.js recognition, PostgreSQL, environment variables, custom domains/SSL, and scheduled database backups. Use synthetic data during staging.
- Before production, test this project on the selected Vibe Host plan, including Next.js SSR/API routes and start/build behavior. Confirm private file/object storage, database isolation/encryption, backup retention and restore, region/data-processing terms, capacity, and operational SLA. Vibe Host control-panel authentication is separate from WE HUBS staff/customer authentication.
- Separate development, staging, and production environments; require encrypted automated backups and a tested restore process before launch.
- Evaluate provider region, data-processing terms, backup retention, MFA support, access logging, and operating cost before storing real personal data.
- Secure by default: no direct browser database access; all endpoints enforce identity, role, company, branch, resource ownership and row-level constraints.
- Availability target for initial pilot: 99.5% monthly (planning target, not SLA).
- RPO target 24h; RTO target 8h for pilot; rehearse restoration.
- Audit all financial state changes and sensitive file access; retain according to approved policy.
- Encrypt in transit/at rest; MFA; rate limiting; session expiry; secrets manager; virus scan; file retention and deletion policies.
- Respect Vietnam personal data protection obligations and special handling of minors; legal review before launch.
- No production use of real student data until security testing and DPA/consent flows are complete.

## 8. Out of scope for first pilot
Native mobile apps; unverified linking to existing student records; anonymous access to student/finance data; direct bank reconciliation; accounting ledger replacement; automatic visa decisions; autonomous AI sends; supplier API integration.

## 9. Definition of done
Tests for company/branch cross-access; privilege escalation; teacher assignment scope; financial approvals; duplicate payment callbacks; timezone/date handling; backup restore; audit completeness; and staged UAT by all three companies.
