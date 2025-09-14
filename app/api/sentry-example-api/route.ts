import { NextResponse } from 'next/server';

export function GET() {
  throw new Error('Sentry Example API Route Error');
}

export function HEAD() {
  return NextResponse.json({});
}
