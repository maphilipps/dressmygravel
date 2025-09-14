import * as Sentry from '@sentry/nextjs';

export function register() {
  if (process.env.NEXT_RUNTIME === 'nodejs') {
    // Server-side Sentry configuration
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
  }

  if (process.env.NEXT_RUNTIME === 'edge') {
    // Edge runtime Sentry configuration
    if (process.env.NEXT_PUBLIC_SENTRY_DSN) {
      Sentry.init({
        dsn: process.env.NEXT_PUBLIC_SENTRY_DSN,
        // Performance Monitoring
        tracesSampleRate: 1.0,
        // Debug
        debug: false,
        environment: process.env.NODE_ENV || 'development',
      });
    }
  }
}
