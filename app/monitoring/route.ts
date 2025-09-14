import { NextRequest, NextResponse } from 'next/server';

const SENTRY_HOST = 'o4508275400515584.ingest.us.sentry.io';
const SENTRY_PROJECT_ID = process.env.SENTRY_PROJECT_ID;

export async function POST(request: NextRequest) {
  try {
    const envelope = await request.text();
    const pieces = envelope.split('\n');
    const header = JSON.parse(pieces[0] || '');

    const { host, pathname } = new URL(header.dsn);
    if (host !== SENTRY_HOST) {
      throw new Error(`Invalid Sentry host: ${host}`);
    }

    const projectId = pathname?.replace(/^\//, '');
    if (projectId !== SENTRY_PROJECT_ID) {
      throw new Error(`Invalid project ID: ${projectId}`);
    }

    const url = `https://${SENTRY_HOST}/api/${projectId}/envelope/`;

    const response = await fetch(url, {
      method: 'POST',
      body: envelope,
      headers: {
        'Content-Type': 'application/x-sentry-envelope',
      },
    });

    return new NextResponse(null, {
      status: response.status,
    });
  } catch (error) {
    console.error('Sentry tunnel error:', error);
    return new NextResponse('Bad request', { status: 400 });
  }
}
