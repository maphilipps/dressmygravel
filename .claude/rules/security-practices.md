---
description: Security practices and API key management for DressMyGravel.com, learned from exposed token incident
author: DressMyGravel Development Team
version: 1.0
tags: ["security", "api-keys", "git", "environment", "authentication"]
globs: ["**/*.ts", "**/*.tsx", "**/.env*", "**/*.config.*"]
creation_date: 2025-09-14
trigger: Git history cleanup due to exposed API tokens in commits
---

# Security Practices for DressMyGravel

**Objective:** Implement comprehensive security practices to prevent API key exposure, protect user data, and maintain secure development workflows.

## Critical Lesson: API Key Exposure Incident

### What Happened
During initial development, API tokens were accidentally committed to Git history, requiring complete repository cleanup. This rule set ensures this NEVER happens again.

### Prevention Protocol
**BEFORE EVERY COMMIT:**
```bash
# 1. Review staged changes
git diff --cached

# 2. Search for potential secrets
git diff --cached | grep -E "(api[_-]?key|token|secret|password|pwd|auth)" -i

# 3. Verify .env files are ignored
git status --ignored

# 4. Run automated secret scanning
npx secretlint "**/*"
```

## Environment Variable Management

### Proper .env Structure
```bash
# .env.local (NEVER commit this file)
APPLE_WEATHER_KEY=wk_live_xxxxxxxxxxxx
MAPBOX_SECRET_TOKEN=sk.xxxxxxxxxxxx
DATABASE_URL=postgresql://user:pass@host:5432/db
REDIS_URL=redis://default:pass@host:6379

# .env.example (SAFE to commit - template only)
APPLE_WEATHER_KEY=your_apple_weather_key_here
MAPBOX_SECRET_TOKEN=your_mapbox_secret_token_here
DATABASE_URL=your_database_url_here
REDIS_URL=your_redis_url_here

# .env.development (SAFE if no real secrets)
NEXT_PUBLIC_MAPBOX_TOKEN=pk.development.xxxxx  # Public token only
NEXT_PUBLIC_API_URL=http://localhost:3000
```

### Environment Variable Rules
```typescript
// CORRECT: Validate environment variables at startup
const getEnvVar = (key: string, required = true): string => {
  const value = process.env[key];

  if (required && !value) {
    throw new Error(`Missing required environment variable: ${key}`);
  }

  // Log that var is set (but not its value!)
  console.log(`✓ ${key} is configured`);

  return value || '';
};

// Server-side configuration
export const serverConfig = {
  appleWeatherKey: getEnvVar('APPLE_WEATHER_KEY'),
  databaseUrl: getEnvVar('DATABASE_URL'),
  redisUrl: getEnvVar('REDIS_URL', false),  // Optional
};

// Client-side configuration (NEXT_PUBLIC_ prefix only!)
export const clientConfig = {
  mapboxToken: getEnvVar('NEXT_PUBLIC_MAPBOX_TOKEN'),
  apiUrl: getEnvVar('NEXT_PUBLIC_API_URL'),
};
```

## Git Security Configuration

### Required .gitignore Entries
```gitignore
# Environment files
.env
.env.local
.env.production
.env*.local

# API keys and secrets
**/secrets/
**/credentials/
*.key
*.pem
*.p12

# IDE and system files that might contain secrets
.vscode/settings.json
.idea/
.DS_Store

# Build outputs that might embed secrets
.next/
out/
build/
dist/

# Temporary files
*.log
*.tmp
.work/
```

### Git Hooks for Security
```bash
# .husky/pre-commit
#!/bin/sh
. "$(dirname "$0")/_/husky.sh"

# Prevent committing secrets
npx secretlint "**/*"

# Check for common secret patterns
if git diff --cached | grep -qE "(api[_-]?key|token|secret|password|pwd|auth).*=.*['\"].*['\"]" -i; then
  echo "❌ Potential secret detected in staged files!"
  echo "Review your changes and move secrets to .env.local"
  exit 1
fi

# Verify .env files aren't being committed
if git diff --cached --name-only | grep -q "^\.env"; then
  echo "❌ Attempting to commit .env file!"
  exit 1
fi
```

### Emergency: If Secrets Are Committed
```bash
# IMMEDIATE ACTIONS:
# 1. Rotate the exposed keys IMMEDIATELY
# 2. Remove from Git history:

# For recent commits (not pushed)
git reset --soft HEAD~1
# Remove the secret
git add .
git commit -m "Remove exposed secret"

# For pushed commits (requires force push)
# Use BFG Repo-Cleaner or git filter-branch
bfg --delete-files .env
git reflog expire --expire=now --all
git gc --prune=now --aggressive

# 3. Force push cleaned history
git push --force-with-lease

# 4. Notify team of the force push
# 5. Have everyone re-clone the repository
```

## API Key Security Patterns

### Server-Side API Protection
```typescript
// app/api/weather/route.ts
import { NextResponse } from 'next/server';
import { serverConfig } from '@/lib/config';

// CORRECT: API key only on server
export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const lat = searchParams.get('lat');
  const lon = searchParams.get('lon');

  // Validate input
  if (!lat || !lon) {
    return NextResponse.json({ error: 'Missing coordinates' }, { status: 400 });
  }

  // Use server-side API key
  const response = await fetch(
    `https://api.weather.com/v1/weather?lat=${lat}&lon=${lon}`,
    {
      headers: {
        'Authorization': `Bearer ${serverConfig.appleWeatherKey}`,
      },
    }
  );

  // Never expose the API key in response
  const data = await response.json();
  return NextResponse.json(data);
}

// WRONG: Exposing API key to client
export async function GET() {
  return NextResponse.json({
    apiKey: process.env.APPLE_WEATHER_KEY,  // NEVER DO THIS
  });
}
```

### Client-Side Security
```typescript
// CORRECT: Client calls your API, not external API
async function getWeather(lat: number, lon: number) {
  // Call YOUR backend API
  const response = await fetch(`/api/weather?lat=${lat}&lon=${lon}`);
  return response.json();
}

// WRONG: Direct external API call from client
async function badGetWeather(lat: number, lon: number) {
  // This exposes your API key in browser DevTools!
  const response = await fetch('https://external-api.com', {
    headers: {
      'Authorization': 'Bearer sk_live_xxxxx',  // VISIBLE TO USERS!
    },
  });
}
```

## Authentication & Authorization

### NextAuth.js Configuration
```typescript
// app/api/auth/[...nextauth]/route.ts
import NextAuth from 'next-auth';
import { authOptions } from '@/lib/auth';

// Secure session configuration
export const authOptions = {
  providers: [
    // OAuth providers for secure authentication
  ],
  session: {
    strategy: 'jwt',
    maxAge: 30 * 24 * 60 * 60,  // 30 days
  },
  callbacks: {
    jwt: async ({ token, user }) => {
      // Don't include sensitive data in JWT
      if (user) {
        token.id = user.id;
        token.email = user.email;
        // DON'T include: passwords, API keys, etc.
      }
      return token;
    },
  },
  secret: process.env.NEXTAUTH_SECRET,  // Required for production
};
```

## Security Headers

### Next.js Security Headers
```typescript
// next.config.js
const securityHeaders = [
  {
    key: 'X-DNS-Prefetch-Control',
    value: 'on'
  },
  {
    key: 'Strict-Transport-Security',
    value: 'max-age=63072000; includeSubDomains; preload'
  },
  {
    key: 'X-Frame-Options',
    value: 'SAMEORIGIN'
  },
  {
    key: 'X-Content-Type-Options',
    value: 'nosniff'
  },
  {
    key: 'Referrer-Policy',
    value: 'origin-when-cross-origin'
  },
  {
    key: 'Content-Security-Policy',
    value: ContentSecurityPolicy.replace(/\s{2,}/g, ' ').trim()
  }
];

module.exports = {
  async headers() {
    return [
      {
        source: '/:path*',
        headers: securityHeaders,
      },
    ];
  },
};
```

## Input Validation & Sanitization

### API Input Validation
```typescript
import { z } from 'zod';

// Define schemas for validation
const coordinateSchema = z.object({
  lat: z.number().min(-90).max(90),
  lon: z.number().min(-180).max(180),
});

export async function POST(request: Request) {
  const body = await request.json();

  // Validate input
  const validation = coordinateSchema.safeParse(body);

  if (!validation.success) {
    return NextResponse.json(
      { error: 'Invalid coordinates', details: validation.error },
      { status: 400 }
    );
  }

  // Safe to use validated data
  const { lat, lon } = validation.data;
  // ... continue processing
}
```

## Security Monitoring

### Automated Security Scanning
```json
// package.json
{
  "scripts": {
    "security:check": "npm audit && npx secretlint '**/*'",
    "security:fix": "npm audit fix",
    "prebuild": "npm run security:check",
    "precommit": "npx secretlint '**/*'"
  }
}
```

### Logging Best Practices
```typescript
// CORRECT: Log events without sensitive data
logger.info('User login attempt', {
  email: user.email,
  timestamp: new Date().toISOString(),
  // DON'T log: password, token, full user object
});

// WRONG: Logging sensitive data
logger.info('API call', {
  apiKey: process.env.APPLE_WEATHER_KEY,  // NEVER LOG THIS
  password: user.password,  // NEVER LOG THIS
});
```

## Related Patterns
- See `api-integration-patterns.md` for API security
- See `github-workflow.md` for secure Git practices
- See `performance-requirements.md` for security vs performance balance

## Security Checklist
- [ ] All API keys in environment variables
- [ ] .env files in .gitignore
- [ ] Git hooks configured for secret scanning
- [ ] No hardcoded credentials anywhere
- [ ] Server-side API key usage only
- [ ] Input validation on all endpoints
- [ ] Security headers configured
- [ ] Regular dependency updates (npm audit)
- [ ] Logging excludes sensitive data
- [ ] Authentication properly configured