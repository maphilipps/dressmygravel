# Research Report: Next.js 14 Project Setup and Configuration
**Issue Reference**: [#1 - Project Setup and Configuration](.work/issues/001-project-setup-and-configuration.md)
**Research Date**: 2025-01-14
**Research Scope**: Next.js 14 initialization, TypeScript configuration, Tailwind CSS v3/v4, Shadcn/ui integration, tooling setup

## Executive Summary

Research indicates that Next.js 14 with App Router remains the optimal choice for DressMyGravel, with a clear upgrade path to Next.js 15 when stable. The ecosystem has matured significantly with Tailwind CSS v4 simplifying configuration and Shadcn/ui providing production-ready components. Key recommendations include using the latest create-next-app with specific flags, implementing Tailwind v4 (with v3 fallback), integrating Shadcn with the "new-york" style, and establishing comprehensive tooling from the start. The project structure should follow Next.js 14 conventions with App Router, Server Components by default, and aggressive caching strategies aligned with our API limits.

## Current Codebase Analysis

### Existing Patterns
- **Tech Stack Decision**: Already documented in `docs/project-spec.md` with Next.js 14, TypeScript, Tailwind, Shadcn/ui, Zustand, SWR
- **Project Structure**: Well-defined directory structure planned with clear separation of concerns (app/, components/, lib/, data/)
- **Agent Ecosystem**: Recently refactored from Rails to Next.js focused agents (ADR #4), providing specialized tooling for initialization
- **MVP Philosophy**: Strong emphasis on pragmatic MVP-first approach embedded in all project documentation

### Architectural Constraints
- **API Limits**: OpenWeatherMap 1000 calls/day requiring aggressive caching (3-hour minimum)
- **Coordinate Rounding**: 0.1° precision for cache efficiency (critical for cost control)
- **Performance Targets**: Lighthouse >90, LCP <2.5s, FID <100ms, CLS <0.1
- **Bundle Size**: Initial JS must be <200KB
- **Mobile-First**: 640px breakpoint, PWA with offline capabilities

### Code Quality Assessment
- **Reference Implementation**: `dressmyrun.js` exists as minified reference (DO NOT EDIT)
- **Rules Framework**: Comprehensive `.claude/rules/` directory with patterns for API integration, UI components, performance, security
- **ADR Process**: Established with 4 existing ADRs documenting key decisions
- **Agent Support**: Specialized agents ready for Next.js initialization and implementation

## Best Practices Research (Context7 & Web)

### Library Documentation Insights

#### Next.js 14 Setup (2025 Best Practices)
- **Recommended Initialization**:
  ```bash
  npx create-next-app@latest dressmygravel \
    --typescript \
    --tailwind \
    --eslint \
    --app \
    --src-dir \
    --import-alias "@/*"
  ```
- **Key Flags Explained**:
  - `--app`: Use App Router (mandatory for our architecture)
  - `--src-dir`: Organize code in src/ directory (cleaner structure)
  - `--import-alias`: Set up @ alias for cleaner imports
  - `--typescript`: Full TypeScript support with strict mode
  - `--tailwind`: Tailwind CSS integration (can upgrade to v4 later)

#### Tailwind CSS Configuration
- **Tailwind v4 Advantages** (2025):
  - No config file needed (all inline in CSS)
  - Better performance with Lightning CSS
  - OKLCH color space for better color management
  - Simplified setup: `npm install tailwindcss @tailwindcss/postcss postcss`
- **Migration Strategy**: Start with v3 (stable), migrate to v4 when ecosystem catches up
- **Required Plugins**: `prettier-plugin-tailwindcss` for consistent formatting

#### Shadcn/ui Integration
- **Current Best Practices**:
  - Use "new-york" style (default being deprecated)
  - CSS variables for theming
  - Don't modify components directly - create variants
  - Every primitive needs `data-slot` attribute
- **Installation Command**:
  ```bash
  npx shadcn@latest init -d
  ```

### Framework Integration

#### TypeScript Configuration
```json
{
  "compilerOptions": {
    "strict": true,
    "noUncheckedIndexedAccess": true,
    "noImplicitOverride": true,
    "exactOptionalPropertyTypes": true,
    "forceConsistentCasingInFileNames": true
  }
}
```

#### ESLint + Prettier + Husky Setup
- **Dependencies**:
  ```bash
  npm install --save-dev prettier eslint-plugin-prettier \
    eslint-config-prettier husky lint-staged \
    @typescript-eslint/eslint-plugin @typescript-eslint/parser
  ```
- **lint-staged Configuration** (Next.js specific):
  ```javascript
  const path = require('path')
  const buildEslintCommand = (filenames) =>
    `next lint --fix --file ${filenames
      .map((f) => path.relative(process.cwd(), f))
      .join(' --file ')}`

  module.exports = {
    '*.{js,jsx,ts,tsx}': [buildEslintCommand],
    '*.{js,jsx,ts,tsx,css,md}': ['prettier --write']
  }
  ```

#### Sentry Integration
- **Next.js 14 Specific**:
  - Three config files needed (client, server, edge)
  - App Router requires generateMetadata modification
  - Tunnel route to bypass ad-blockers
  - Turbopack production builds not fully supported yet
- **Installation**: Use wizard for automatic setup:
  ```bash
  npx @sentry/wizard@latest -i nextjs
  ```

## Current Industry Analysis (Web Research)

### Industry Trends (2025)

| Trend | Description | Relevance to DressMyGravel |
|-------|-------------|---------------------------|
| **Next.js 15 Adoption** | Stable release with Turbopack, better caching | Wait for ecosystem maturity, plan migration |
| **Tailwind v4** | Simplified config, better performance | Consider for new projects, migration path clear |
| **Server Components Default** | Performance benefits, reduced bundle size | Align with our <200KB bundle requirement |
| **Edge Runtime** | Better global performance | Good for weather API responses |
| **Partial Prerendering** | Hybrid static/dynamic | Perfect for weather + static content |

### Comparative Analysis

| Setup Approach | Pros | Cons | Recommendation |
|----------------|------|------|----------------|
| **Manual Setup** | Full control, understanding | Time-consuming, error-prone | Not for MVP |
| **create-next-app** | Official, best defaults | Some unnecessary features | ✅ **RECOMMENDED** |
| **T3 Stack** | Full-stack ready | Overkill for our needs | Skip for MVP |
| **Custom Boilerplate** | Tailored exactly | Maintenance burden | Post-MVP only |

### Community Insights
- **Common Pitfalls**:
  - Not setting up tooling early (ESLint, Prettier, Husky)
  - Ignoring TypeScript strict mode until too late
  - Poor caching strategy leading to API limit issues
  - Not testing mobile viewport during development

- **Success Patterns**:
  - Shadcn components accelerate UI development significantly
  - SWR with aggressive caching solves most data fetching needs
  - Zustand (8KB) over Redux (60KB) for state management
  - Early PWA setup ensures mobile experience

## Synthesis and Recommendations

### Recommended Approach

1. **Initialize with create-next-app** using recommended flags
2. **Immediate TypeScript strict mode** configuration
3. **Tailwind v3 initially** with clear v4 migration path
4. **Shadcn/ui setup** with "new-york" style
5. **Complete tooling setup** (ESLint, Prettier, Husky) before first feature
6. **Environment configuration** with .env.local template
7. **Sentry integration** using wizard for automatic setup

### Implementation Strategy

#### Phase 1: Core Setup (Day 1)
1. Run create-next-app with all flags
2. Configure TypeScript for strict mode
3. Set up Shadcn/ui with proper theme
4. Create folder structure per spec
5. Initialize Git with proper .gitignore

#### Phase 2: Tooling & Quality (Day 1)
1. Configure ESLint + Prettier
2. Set up Husky + lint-staged
3. Create initial component structure
4. Set up environment variables
5. Configure path aliases

#### Phase 3: Infrastructure (Day 2)
1. Integrate Sentry for error tracking
2. Set up SWR for data fetching
3. Configure Zustand for state
4. Implement basic caching strategy
5. Create API route structure

### Risk Assessment

- **Technical Risks**:
  - Tailwind v4 ecosystem not fully ready (Mitigation: Start with v3)
  - Turbopack production issues with Sentry (Mitigation: Use standard build)
  - Complex caching requirements (Mitigation: Implement early, test thoroughly)

- **Performance Risks**:
  - Bundle size with all dependencies (Mitigation: Tree-shaking, lazy loading)
  - API rate limits (Mitigation: Aggressive caching, coordinate rounding)

- **Maintenance Risks**:
  - Rapid ecosystem changes (Mitigation: Lock versions, careful updates)
  - Component library updates (Mitigation: Don't modify Shadcn directly)

### Success Metrics

- ✅ Project runs with `npm run dev` without errors
- ✅ All Shadcn components installable and working
- ✅ TypeScript strict mode with zero errors
- ✅ ESLint/Prettier running on pre-commit
- ✅ Environment variables properly configured
- ✅ Sentry capturing test errors
- ✅ Lighthouse score >90 on initial setup
- ✅ Mobile viewport (640px) properly responsive

## Implementation Prerequisites

### Required Libraries
```json
{
  "dependencies": {
    "next": "14.2.x",
    "react": "^18",
    "react-dom": "^18",
    "@radix-ui/react-*": "latest",
    "tailwindcss": "^3.4.x",
    "zustand": "^5.x",
    "swr": "^2.x",
    "lucide-react": "latest",
    "clsx": "^2.x",
    "tailwind-merge": "^2.x"
  },
  "devDependencies": {
    "typescript": "^5.x",
    "@types/react": "^18",
    "@types/node": "^20",
    "eslint": "^8",
    "eslint-config-next": "14.2.x",
    "prettier": "^3.x",
    "husky": "^9.x",
    "lint-staged": "^15.x",
    "@sentry/nextjs": "^8.x"
  }
}
```

### Configuration Changes
- `tsconfig.json`: Enable all strict checks
- `next.config.js`: Configure images, environment, Sentry
- `.env.local.example`: Template for required variables
- `tailwind.config.ts`: Extend with custom colors/fonts
- `.eslintrc.json`: Integrate with Prettier
- `.prettierrc`: Project formatting rules

### Database Changes
- Not required for initial setup (API-based initially)
- Consider SQLite for local development later

### Infrastructure Requirements
- Node.js 18.x or 20.x
- npm or pnpm (prefer pnpm for speed)
- Git configured with hooks support
- VS Code with recommended extensions

## Next Steps for Planning Phase

1. **Agent Selection**: Use `nextjs-project-initializer` for automated setup
2. **Verify Prerequisites**: Ensure Node.js version and Git are ready
3. **Environment Preparation**: Create `.env.local` with weather API keys
4. **Component Planning**: List initial Shadcn components needed
5. **API Route Design**: Plan weather and location endpoints
6. **Caching Strategy**: Implement coordinate rounding utility first
7. **Mobile Testing**: Set up device emulation from start
8. **Performance Baseline**: Run Lighthouse after initial setup

## Compound Learning Insights

### Patterns for Future Reuse
- **Setup Command Chain**: Document exact command sequence for reproduction
- **Configuration Templates**: Save working configs for future projects
- **Tooling Integration**: ESLint/Prettier/Husky setup is reusable
- **Caching Patterns**: Weather API caching strategy applicable to any rate-limited API

### Context Evolution
- Update CLAUDE.md with:
  - Exact Next.js initialization command used
  - Specific TypeScript strict settings
  - Shadcn component installation pattern
  - Environment variable naming conventions

### Quality Gate Improvements
- Pre-commit hooks must pass before any commit
- Lighthouse CI integration for performance regression
- Bundle size analysis in build process
- API call monitoring from day one

## Conclusion

The research confirms Next.js 14 with App Router as the optimal foundation for DressMyGravel. The ecosystem is mature, tooling is comprehensive, and the upgrade path to Next.js 15 is clear. By following the recommended setup with create-next-app, implementing strict TypeScript from the start, and establishing comprehensive tooling immediately, we can build a solid MVP foundation that scales. The key differentiator will be our aggressive caching strategy and coordinate rounding to stay within API limits while providing excellent user experience.