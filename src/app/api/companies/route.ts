import { NextResponse } from 'next/server';
// Fail closed: do not expose business data until OIDC verification, scoped RBAC,
// tenant filtering, validation and audit logging have been implemented and tested.
export async function GET(){return NextResponse.json({error:'NOT_IMPLEMENTED',message:'Authentication and authorization required before enabling this endpoint.'},{status:501});}
export async function POST(){return NextResponse.json({error:'NOT_IMPLEMENTED'},{status:501});}
