# Scoped RBAC — Permission matrix (initial proposal)

Legend: R=read, W=create/update, D=delete, A=approve, -=denied. All grants are constrained by company, branch, assignment and record ownership unless the Group Administrator has an explicit global grant.

| Role | Contacts | Academy | Academy contracts | Study abroad | Travel | Invoices | Payment verification | User accounts | Role grants |
|---|---|---|---|---|---|---|---|---|---|
| Group Administrator | RWD | RWD | RWD | RWD | RWD | RWDA | RWDA | RW | RW |
| Company Director | RW | R | - | R | R | R | - | - | - |
| Branch Manager | RW | RW | - | R | R | R | - | - | - |
| Academic Manager | R | RW | Assigned RW | - | - | R | - | - | - |
| Teacher | Assigned R | Branch R / assigned-class RW | - | - | - | - | - | - | - |
| Admissions | Branch R | Branch progress R | - | Assigned RW | - | Status R | - | - | - |
| Visa Officer | Assigned R | - | - | Branch R / assigned RW | - | - | - | - | - |
| Tour Operator | Assigned R | - | - | - | Branch R / assigned-tour RW | - | - | - | - |
| Accountant | R | - | - | - | - | RW | W (record only; Group Administrator approves) | - | - |
| Security Admin | Metadata only | - | - | - | - | - | - | Controlled via separate approval | - |

## Policy evaluation
Deny unless: authenticated AND active user AND permission grant AND company match AND branch match (if scoped) AND resource assignment (if required) AND workflow state allows action. The Group Administrator is explicitly assigned global scope across all companies and branches.

- Company Director: scope covers every branch of each explicitly assigned company; no access to other companies by default.
- Branch Manager: scope is limited to each explicitly assigned branch; no access to sibling branches or other companies by default.
- Company Director and Branch Manager may read invoices within their assigned scopes but cannot approve invoices or payments; payment approval is reserved for the Group Administrator.
- Academic Manager: may create/update Academy contracts only within assigned branches and has no payment-approval permission. Other roles have no Academy-contract access until explicitly granted.
- Teacher: may view classes in the assigned branch, but may record attendance, update assignments, and write feedback only for individually assigned classes. Contact details remain limited to students in assigned classes; teachers cannot edit student identity or contract records.
- Admissions: may read leads in the assigned branch and create/update only assigned study-abroad cases; may read Academy progress for the assigned branch and invoice status only, without modifying Academy or financial records or approving payments.
- Visa Officer: may read visa cases in the assigned branch and update documents/status only for individually assigned cases; no financial access.
- Tour Operator: may view tours in the assigned branch, but may update a tour and access its bookings/traveler details only when that tour is assigned to them; no invoice or payment access.
- Accountant: may read/create/update invoices and record payment evidence only within assigned company/branch scopes; cannot approve payments.
- Staff assigned to multiple companies receive a separate company or branch assignment for each scope. Access is the union of those explicit assignments only.

Never trust companyId or branchId supplied by the browser without verifying the assignment server-side.

## Segregation of duties
The Group Administrator may edit any operational record and override approval workflows, including approving a payment they entered. This is an intentional exception to segregation of duties; record the actor, timestamp, affected record, action, and reason in an immutable audit log. Financial evidence and applicable record-retention rules still apply. Other roles retain the separation-of-duties rules: invoice creators cannot solely approve their own credit note/refund, and payment verification requires traceable evidence. AI service identities have narrowly scoped, expiring capabilities and cannot approve financial or visa decisions.
