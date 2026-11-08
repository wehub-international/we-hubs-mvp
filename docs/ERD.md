# WE HUBS — ERD (conceptual)

```mermaid
erDiagram
 COMPANY ||--o{ BRANCH : owns
 USER ||--o{ ROLE_ASSIGNMENT : has
 COMPANY ||--o{ ROLE_ASSIGNMENT : scopes
 BRANCH ||--o{ ROLE_ASSIGNMENT : scopes
 CONTACT ||--o{ SERVICE_ENROLLMENT : purchases
 COMPANY ||--o{ SERVICE_ENROLLMENT : delivers
 SERVICE_ENROLLMENT ||--o{ CLASS_ENROLLMENT : attends
 COURSE ||--o{ CLASS_GROUP : contains
 CLASS_GROUP ||--o{ CLASS_ENROLLMENT : enrolls
 CLASS_GROUP ||--o{ LESSON : schedules
 LESSON ||--o{ ATTENDANCE : records
 LESSON ||--o{ ASSIGNMENT : creates
 LESSON ||--o{ FEEDBACK : evaluates
 SERVICE_ENROLLMENT ||--o{ STUDY_ABROAD_CASE : starts
 STUDY_ABROAD_CASE ||--o{ CHECKLIST_TASK : includes
 TOUR ||--o{ TOUR_BOOKING : receives
 SERVICE_ENROLLMENT ||--o{ TOUR_BOOKING : registers
 SERVICE_ENROLLMENT ||--o{ INVOICE : billed
 INVOICE ||--o{ PAYMENT : receives
```

## Production extensions required
- Contact-company sharing grants and legal basis; guardian relationships and consent.
- Resource assignments for teacher/class, counselor/case, tour operator/tour.
- LearningPath/Milestone, AssignmentSubmission, document version, file access log.
- InvoiceLine, payment allocation, credit note, refund, ledger events and exchange rates.
- NotificationOutbox and idempotency keys; approval workflows.
- Composite tenant-scoped foreign keys or triggers verifying company/branch consistency on all child tables.
- Database RLS policies for every sensitive table, with explicit tenant session context and dedicated service roles.

The Prisma schema in this starter is a **domain prototype**, not the complete production schema. Do not migrate it into production without the above constraints and RLS policies.
