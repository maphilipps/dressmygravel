# Implementation Plan: Next.js 14 MVP Project Initialization

**Plan ID**: plan-001
**Issue Reference**: #1 - Project Setup and Configuration
**Created**: 2025-01-14
**Scope**: Initialize Next.js 14 project with TypeScript, Tailwind CSS, Shadcn/ui, and comprehensive tooling

## 1. Status Quo

### Current State Analysis

**Repository Status**:
- Empty Next.js project directory (no initialization yet)
- Comprehensive documentation exists (project-spec.md, CLAUDE.md)
- Agent ecosystem recently refactored from Rails to Next.js focus (ADR #4)
- 12 open GitHub issues awaiting project initialization
- Reference implementation available (dressmyrun.js - minified, read-only)

**Existing Infrastructure**:
- `.claude/` directory with 29 specialized agents ready for deployment
- `.claude/rules/` with established patterns for API integration, UI components, performance
- `.adrs/` and `doc/` directories documenting architectural decisions
- `.work/` directory structure for issue and research management

**Technical Constraints**:
- OpenWeatherMap API: 1000 calls/day free tier limit
- Coordinate rounding requirement: 0.1° precision for cache efficiency
- Performance targets: Lighthouse >90, LCP <2.5s, FID <100ms, CLS <0.1
- Bundle size limit: <200KB initial JavaScript
- Mobile-first requirement: 640px breakpoint
- PWA requirements: Offline capability with cached weather data

## 2. Best Practices (From Research)

### Next.js 14 Setup Best Practices
```bash
# Recommended initialization command
npx create-next-app@latest dressmygravel \
  --typescript \
  --tailwind \
  --eslint \
  --app \
  --src-dir=false \
  --import-alias "@/*"
```

### TypeScript Configuration (Strict Mode)
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

### Tailwind CSS Strategy
- Start with v3 for stability
- Plan migration path to v4 when ecosystem matures
- Use `prettier-plugin-tailwindcss` for consistent formatting

### Shadcn/ui Integration
- Use "new-york" style (default being deprecated)
- CSS variables for theming
- Don't modify components directly - create variants
- Initialize with: `npx shadcn@latest init -d`

### Tooling Setup
- ESLint + Prettier + Husky for code quality
- lint-staged for pre-commit hooks
- Sentry for error tracking (use wizard: `npx @sentry/wizard@latest -i nextjs`)

## 3. Proposed Implementation

### Implementation Timeline
- **Day 1**: Core setup + Tooling (Phases 1-2)
- **Day 1-2**: UI Components + Initial Features (Phase 3)
- **Day 2**: Verification + Optimization (Phase 4)

## Agent Execution Matrix

| Phase | Primary Agent | Supporting Agents | Execution Type | Handoff Protocol |
|-------|--------------|-------------------|----------------|------------------|
| 1. Core Setup | nextjs-project-initializer | mvp-grand-orchestrator, debug-detective | Sequential | Project config files, package.json |
| 2. Quality & Tooling | nextjs-step-by-step-implementer | debug-detective, git-hygiene-enforcer | Sequential | Linting configs, git hooks |
| 3. UI & Components | shadcn-component-developer | codebase-analyzer, feedback-codifier | Parallel possible | Component library, theme config |
| 4. Verification | performance-optimizer | pwa-optimizer, production-monitor-agent | Parallel | Performance metrics, PWA manifest |

## Phase-by-Phase Agent Assignments

### Phase 1: Core Project Setup (2-3 hours)

**Assigned Agent**: `nextjs-project-initializer` (Next.js Development)
- **Input Requirements**:
  - Empty or existing project directory
  - Node.js 18+ environment
  - npm/yarn available
- **Output Deliverables**:
  - Initialized Next.js 14 project with TypeScript
  - Tailwind CSS configured
  - Basic Shadcn/ui setup
  - Environment variable templates
  - PWA configuration files
- **Success Criteria**:
  - `npm run dev` runs without errors
  - localhost:3000 shows Next.js welcome page
  - TypeScript compilation successful
  - Shadcn components installable
- **Dependencies**: None (first phase)

**Supporting Agent**: `mvp-grand-orchestrator` (Orchestration)
- Provides high-level coordination
- Ensures MVP-first approach
- Monitors progress across phases

### Phase 2: Quality Tools & Configuration (1-2 hours)

**Assigned Agent**: `nextjs-step-by-step-implementer` (Next.js Development)
- **Input Requirements**:
  - Working Next.js project from Phase 1
  - package.json with dependencies
  - TypeScript configuration
- **Output Deliverables**:
  - ESLint configuration (.eslintrc.json)
  - Prettier configuration (.prettierrc)
  - Husky git hooks setup
  - lint-staged configuration
  - Sentry integration files
  - Updated tsconfig.json with strict mode
- **Success Criteria**:
  - Pre-commit hooks trigger on git commit
  - ESLint/Prettier run without errors
  - TypeScript strict mode with zero errors
  - Sentry test error captured successfully
- **Dependencies**: Phase 1 completion

**Supporting Agent**: `debug-detective` (Debugging)
- Troubleshoots configuration issues
- Resolves dependency conflicts
- Ensures cross-platform compatibility

### Phase 3: UI Components & Structure (2-3 hours)

**Assigned Agent**: `shadcn-component-developer` (Frontend & Design)
- **Input Requirements**:
  - Configured Next.js project with Shadcn/ui
  - Tailwind CSS working
  - Component requirements from spec
- **Output Deliverables**:
  - Weather display components (cards, forecasts)
  - Clothing recommendation cards
  - Location input components
  - Loading/error states
  - Mobile-responsive layouts
  - Dark mode implementation
- **Success Criteria**:
  - All components render correctly
  - Mobile viewport (640px) properly responsive
  - Dark mode toggle functional
  - Accessibility checks pass (WCAG 2.1 AA)
- **Dependencies**: Phase 1 completion (can run parallel with Phase 2)

**Supporting Agent**: `codebase-analyzer` (Knowledge Management)
- Analyzes component patterns
- Ensures consistency across components
- Documents component usage

### Phase 4: Performance & PWA Optimization (1-2 hours)

**Primary Agents (Parallel Execution)**:

**Agent 1**: `performance-optimizer` (Performance & Security)
- **Input Requirements**:
  - Complete Next.js application
  - Initial components created
  - Build process configured
- **Output Deliverables**:
  - Optimized bundle sizes
  - Image optimization setup
  - Lazy loading implementation
  - Core Web Vitals improvements
  - Performance monitoring setup
- **Success Criteria**:
  - Lighthouse score >90 all metrics
  - LCP <2.5s
  - FID <100ms
  - CLS <0.1
  - Bundle size <200KB
- **Dependencies**: Phases 1-3 completion

**Agent 2**: `pwa-optimizer` (Specialized Solutions)
- **Input Requirements**:
  - Next.js application structure
  - manifest.json template
  - Service worker requirements
- **Output Deliverables**:
  - PWA manifest.json
  - Service worker for offline caching
  - Icon sets and splash screens
  - Offline fallback pages
  - Cache strategies for weather data
- **Success Criteria**:
  - PWA installable on mobile
  - Offline mode functional
  - Weather data cached for 3 hours
  - Service worker registered successfully
- **Dependencies**: Phases 1-3 completion

### Phase 5: Learning Capture & Documentation (30 minutes)

**Assigned Agent**: `feedback-codifier` (Knowledge Management)
- **Input Requirements**:
  - Completed implementation
  - Issues encountered and resolved
  - Performance metrics achieved
- **Output Deliverables**:
  - Updated CLAUDE.md with learnings
  - New rules in `.claude/rules/` if needed
  - JOURNAL.md entry with session summary
  - ADR for significant decisions
- **Success Criteria**:
  - All learnings documented
  - Rules updated for future use
  - Clear handoff documentation
- **Dependencies**: All phases complete

## Coordination Protocols

### Data Exchange Between Agents

**Phase 1 → Phase 2**:
- package.json with installed dependencies
- tsconfig.json base configuration
- Project structure and paths

**Phase 2 → Phase 3**:
- Linting rules for component development
- TypeScript types and interfaces
- Git workflow established

**Phase 3 → Phase 4**:
- Component bundle sizes
- Initial performance baseline
- Critical rendering paths

**All Phases → Phase 5**:
- Error logs and resolutions
- Performance improvements made
- Configuration decisions

### Error Handling & Recovery

**Common Issues & Mitigation**:

| Issue | Detection | Recovery Agent | Mitigation |
|-------|-----------|---------------|------------|
| npm install failures | Build errors | debug-detective | Clear cache, use different registry |
| TypeScript errors | Compilation fails | nextjs-step-by-step-implementer | Adjust strict settings gradually |
| Shadcn component conflicts | UI rendering issues | shadcn-component-developer | Use isolated component testing |
| Performance regression | Lighthouse <90 | performance-optimizer | Implement code splitting |
| PWA registration fails | Console errors | pwa-optimizer | Check HTTPS, manifest paths |

### Validation Checkpoints

**After Each Phase**:
1. Run automated tests (if available)
2. Visual verification using Puppeteer MCP
3. Performance check using Lighthouse
4. Mobile responsiveness check at 640px
5. Git commit with descriptive message

## Risk Assessment & Mitigation

### Technical Risks

**Risk 1: Tailwind v4 Compatibility**
- **Probability**: Medium
- **Impact**: Low
- **Mitigation**: Start with v3, document migration path
- **Recovery Agent**: shadcn-component-developer

**Risk 2: Bundle Size Exceeding 200KB**
- **Probability**: Medium
- **Impact**: High
- **Mitigation**: Aggressive tree-shaking, lazy loading
- **Recovery Agent**: performance-optimizer

**Risk 3: API Rate Limit Issues**
- **Probability**: Low (during setup)
- **Impact**: High (in production)
- **Mitigation**: Implement caching strategy early
- **Recovery Agent**: weather-api-integrator (Phase 5+)

### Process Risks

**Risk 4: Agent Coordination Failures**
- **Probability**: Low
- **Impact**: Medium
- **Mitigation**: Clear handoff protocols, validation checkpoints
- **Recovery Agent**: mvp-grand-orchestrator

## Success Metrics

### Quantitative Metrics
- ✅ Zero TypeScript errors in strict mode
- ✅ Lighthouse score >90 (all categories)
- ✅ Bundle size <200KB (initial JS)
- ✅ 100% mobile responsive at 640px
- ✅ <5 second total setup time per phase
- ✅ Zero npm vulnerabilities (high/critical)

### Qualitative Metrics
- ✅ Clean, organized project structure
- ✅ Consistent code formatting
- ✅ Clear documentation and comments
- ✅ Intuitive component architecture
- ✅ Smooth developer experience

## Implementation Commands Sequence

```bash
# Phase 1: Core Setup (nextjs-project-initializer)
npx create-next-app@latest . --typescript --tailwind --eslint --app --src-dir=false --import-alias "@/*"
npx shadcn-ui@latest init
npx shadcn-ui@latest add card button input select

# Phase 2: Dependencies (nextjs-step-by-step-implementer)
npm install zustand swr react-hook-form @hookform/resolvers zod lucide-react @turf/turf next-pwa
npm install -D prettier eslint-plugin-prettier eslint-config-prettier husky lint-staged
npx husky install
npx @sentry/wizard@latest -i nextjs

# Phase 3: Component Development (shadcn-component-developer)
# Components created programmatically

# Phase 4: Optimization (performance-optimizer + pwa-optimizer)
# Configuration and optimization tasks

# Phase 5: Documentation (feedback-codifier)
# Update CLAUDE.md, rules, and journal
```

## Next Actions

1. **Immediate**: Execute Phase 1 with `nextjs-project-initializer` agent
2. **Sequential**: Progress through phases 2-4 monitoring success criteria
3. **Parallel Opportunity**: Run Phase 3 alongside Phase 2 after core setup
4. **Final**: Capture learnings with `feedback-codifier` agent

## Contingency Plans

**If Primary Agent Fails**:
- Phase 1: Manual setup with `nextjs-step-by-step-implementer`
- Phase 2: Use `debug-detective` for troubleshooting
- Phase 3: Fall back to manual component creation
- Phase 4: Skip optimization for MVP, revisit later
- Phase 5: Manual documentation update

**Time Constraints**:
- Minimum viable: Complete Phases 1-2 only (3-4 hours)
- Recommended: Complete Phases 1-3 (5-6 hours)
- Optimal: Complete all phases (7-8 hours)