# 4. Agent Ecosystem Refactoring for Tech Stack Alignment

Date: 2025-01-14

## Status

Accepted

## Context

The DressMyGravel project inherited a Rails-focused agent ecosystem from a previous project template. These agents contained Rails-specific patterns, ActiveRecord assumptions, and MVC architecture that didn't align with our Next.js 14, TypeScript, and React-based stack.

Key misalignments identified:
- Rails project initializer vs Next.js App Router setup
- ActiveRecord patterns vs Prisma/API-based data
- ERB templates vs React components
- Rails UI helpers vs Shadcn/ui components
- Backend-first vs Frontend-first architecture

## Decision

We refactored the entire agent ecosystem to align with the Next.js 14 tech stack:

1. **Deprecated Rails Agents** (preserved with DEPRECATED_ prefix):
   - rails-project-initializer → nextjs-project-initializer
   - rails-step-by-step-implementer → nextjs-step-by-step-implementer
   - rails-ui-designer → shadcn-component-developer
   - rails-environment-setup (deprecated, no replacement needed)
   - rails-implementation-planner (deprecated, covered by other agents)
   - rails-plan-reviewer (deprecated, covered by other agents)

2. **Created Domain-Specific Agents**:
   - weather-api-integrator (weather API patterns, caching, cost optimization)
   - clothing-recommendation-engine (gravel cycling logic, temperature zones)
   - pwa-optimizer (PWA-specific optimizations)
   - performance-optimizer (Core Web Vitals, mobile performance)

3. **Established Agent Management Rules**:
   - Created `agent-ecosystem-management.md` rule file
   - Defined naming conventions: `[tech-stack]-[function]-[role].md`
   - Embedded MVP-first philosophy in all agents
   - Documented refactoring protocol for future migrations

## Consequences

### Positive
- **Immediate Productivity**: Agents now generate correct Next.js code without translation
- **Domain Expertise**: Weather and cycling knowledge embedded in specialized agents
- **Cost Optimization**: API limits and caching strategies built into agent behavior
- **Consistent Patterns**: All agents aligned with project architecture
- **Future-Proof**: Clear refactoring protocol for future tech stack changes
- **Learning Preservation**: Deprecated agents retained for reference

### Negative
- **Initial Refactoring Cost**: Time spent refactoring 6 agents
- **Learning Curve**: Team needs to understand new agent ecosystem
- **Maintenance**: More agents to maintain (but more focused)

### Neutral
- **Agent Count**: Similar total number of agents, but better specialized
- **Documentation**: More documentation needed but clearer purpose

## Lessons Learned

1. **Tech Stack Alignment is Critical**: Generic agents create friction; specific agents accelerate
2. **Domain Encoding Pays Off**: Embedding business logic in agents ensures consistency
3. **Deprecation Strategy Works**: DEPRECATED_ prefix preserves knowledge while clearing confusion
4. **MVP Philosophy Propagates**: When agents enforce MVP-first, the entire project benefits
5. **Compound Rules Capture Value**: The refactoring patterns are now reusable for future projects

## Related Documents
- `.claude/rules/agent-ecosystem-management.md` - Detailed refactoring rules
- `.claude/agents/README.md` - Current agent ecosystem documentation
- `.claude/rules/compound-engineering-core.md` - Core engineering principles