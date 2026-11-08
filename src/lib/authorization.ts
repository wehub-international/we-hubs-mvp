export type Scope = {companyId:string; branchId?:string; resourceId?:string};
export type RoleAssignment = {role:string; companyId:string; branchId?:string|null; resourceId?:string|null};
export type Actor = {userId:string; assignments:RoleAssignment[]};
export const rolePermissions: Record<string,readonly string[]> = {
 GROUP_DIRECTOR:['reports.read','companies.read'],
 COMPANY_DIRECTOR:['contacts.read','contacts.write','reports.read','invoices.read','cases.read','tours.read'],
 BRANCH_MANAGER:['contacts.read','contacts.write','classes.read','attendance.write','invoices.read'],
 TEACHER:['classes.read','attendance.write','assignments.write','feedback.write'],
 ADMISSIONS:['contacts.read','contacts.write','cases.read','cases.write'],
 VISA_OFFICER:['cases.read','cases.write','documents.review'],
 TOUR_OPERATOR:['tours.read','tours.write','bookings.read','bookings.write'],
 ACCOUNTANT:['invoices.read','invoices.write','payments.read','payments.record'],
};
// This is an application-level preliminary check, NOT a replacement for DB RLS.
export function can(actor:Actor,permission:string,scope:Scope):boolean{
 return actor.assignments.some(a=>a.companyId===scope.companyId &&
  (!a.branchId || a.branchId===scope.branchId) &&
  (!a.resourceId || a.resourceId===scope.resourceId) &&
  (rolePermissions[a.role]??[]).includes(permission));
}
