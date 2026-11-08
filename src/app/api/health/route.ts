import { NextResponse } from 'next/server';
export async function GET(){return NextResponse.json({status:'ok',service:'we-hubs',version:'0.1.0'});}
