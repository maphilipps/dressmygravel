import * as Sentry from '@sentry/nextjs';

// Only initialize Sentry if DSN is provided
if (process.env.NEXT_PUBLIC_SENTRY_DSN) {
  Sentry.init({
    dsn: process.env.NEXT_PUBLIC_SENTRY_DSN,
    // Performance Monitoring
    tracesSampleRate: 1.0,
    // Debug
    debug: process.env.NODE_ENV === 'development',
    environment: process.env.NODE_ENV || 'development',
  });
}
