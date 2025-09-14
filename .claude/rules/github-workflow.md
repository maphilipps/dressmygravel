---
description: GitHub workflow best practices specific to DressMyGravel.com project
author: DressMyGravel Development Team
version: 1.0
tags: ["github", "workflow", "issues", "milestones", "project-management"]
globs: [".github/**", "**/*.md"]
creation_date: 2025-09-14
trigger: GitHub Issues creation and milestone setup during project initialization
---

# GitHub Workflow for DressMyGravel

**Objective:** Maintain clear project structure through GitHub Issues, Milestones, and consistent development workflows that create traceable, manageable progress.

## Issue Management Structure

### Issue Template Hierarchy
Based on our created issues, follow this structure:

```markdown
## Epic Issues (Milestones)
- MVP Launch (Milestone)
  ├── Core Weather Integration (#1)
  ├── Clothing Recommendation Engine (#2)
  ├── User Interface Development (#3)
  └── Testing & Deployment (#4)

## Task Breakdown Pattern
Epic Issue → Feature Issues → Implementation Tasks

Example:
#1 Core Weather Integration (Epic)
  ├── Implement Apple Weather API client
  ├── Create caching layer
  ├── Build fallback strategies
  └── Add weather data models
```

### Issue Creation Standards
```markdown
# CORRECT: Clear, actionable issue
Title: Implement Apple Weather API integration with caching

## Description
Integrate Apple Weather API to fetch current conditions with aggressive caching to minimize API costs.

## Acceptance Criteria
- [ ] Weather data fetched for given coordinates
- [ ] Results cached for minimum 3 hours
- [ ] Coordinates rounded to 0.1 decimal places
- [ ] Fallback to stale data if API fails
- [ ] Error handling for rate limits

## Technical Details
- Use Next.js Route Handlers for API routes
- Implement Redis/Upstash for caching
- Follow temperature zone classifications from requirements

## Related Issues
- Blocks: #2 (Clothing Recommendations)
- Related to: #3 (UI Development)
```

### Issue Labels System
```typescript
const labelStructure = {
  // Type labels
  'type:feature': 'New functionality',
  'type:bug': 'Something broken',
  'type:enhancement': 'Improvement to existing feature',
  'type:documentation': 'Documentation updates',

  // Priority labels
  'priority:critical': 'MVP blocker',
  'priority:high': 'Important for launch',
  'priority:medium': 'Nice to have',
  'priority:low': 'Future enhancement',

  // Status labels
  'status:blocked': 'Waiting on dependency',
  'status:in-progress': 'Currently being worked on',
  'status:review': 'In code review',
  'status:testing': 'Being tested',

  // Component labels
  'component:api': 'API/Backend',
  'component:ui': 'User Interface',
  'component:cache': 'Caching layer',
  'component:auth': 'Authentication',
};
```

## Milestone Management

### MVP Milestone Structure
```yaml
Milestone: MVP Launch
Due Date: [Set realistic date]
Description: |
  Minimum viable product with core features:
  - Weather data integration
  - Basic clothing recommendations
  - Mobile-responsive UI
  - Caching for cost optimization

Issues:
  - Core Weather Integration (#1)
  - Clothing Recommendation Engine (#2)
  - User Interface Development (#3)
  - Testing & Deployment (#4)

Success Criteria:
  - All critical issues closed
  - Performance targets met
  - Security audit passed
  - Deployed to production
```

## Branch Strategy

### Branch Naming Convention
```bash
# Feature branches
feature/1-apple-weather-integration
feature/2-clothing-recommendations
feature/3-ui-shadcn-setup

# Bug fix branches
fix/5-cache-invalidation-issue
fix/6-mobile-layout-break

# Enhancement branches
enhance/7-add-wind-chill-factor
enhance/8-improve-loading-states

# NEVER work on main directly
main  # Protected branch, requires PR
```

### Branch Workflow
```bash
# 1. Create issue first
gh issue create --title "Implement weather caching" --body "..."

# 2. Create branch from issue
git checkout -b feature/10-weather-caching

# 3. Work on branch
git add .
git commit -m "feat: implement 3-hour weather caching

- Round coordinates to 0.1 decimal places
- Add Redis caching layer
- Implement stale-while-revalidate pattern

Refs #10"

# 4. Push and create PR
git push -u origin feature/10-weather-caching
gh pr create --title "Feature: Weather caching implementation" \
  --body "Closes #10" --milestone "MVP Launch"
```

## Pull Request Standards

### PR Template
```markdown
## Description
Brief description of changes

## Type of Change
- [ ] Bug fix
- [ ] New feature
- [ ] Enhancement
- [ ] Documentation

## Related Issues
Closes #[issue number]

## Changes Made
- Implemented X
- Fixed Y
- Refactored Z

## Testing
- [ ] Unit tests pass
- [ ] Integration tests pass
- [ ] Manual testing completed
- [ ] Performance benchmarks met

## Screenshots (if UI changes)
[Add screenshots]

## Checklist
- [ ] Code follows project style guidelines
- [ ] Self-review completed
- [ ] Comments added for complex logic
- [ ] Documentation updated
- [ ] No console.logs or debugging code
- [ ] No hardcoded values or API keys
- [ ] Changes generate no new warnings
```

### PR Review Process
```typescript
interface ReviewChecklist {
  security: [
    'No exposed API keys',
    'Input validation present',
    'No sensitive data in logs',
  ],
  performance: [
    'Caching implemented where needed',
    'No N+1 queries',
    'Images optimized',
    'Bundle size acceptable',
  ],
  code_quality: [
    'Follows established patterns',
    'Properly typed (TypeScript)',
    'Error handling present',
    'Tests included',
  ],
  documentation: [
    'Complex logic commented',
    'README updated if needed',
    'API changes documented',
  ],
}
```

## Commit Message Convention

### Conventional Commits Format
```bash
# Format: <type>(<scope>): <subject>

# Examples from our project:
feat(weather): implement Apple Weather API integration
fix(cache): resolve coordinate rounding issue
perf(api): add 3-hour caching to reduce API calls
docs(readme): update setup instructions
refactor(ui): migrate to Shadcn/ui components
test(weather): add caching behavior tests
style(components): apply consistent Tailwind classes
chore(deps): update Next.js to 14.2.0

# Breaking changes:
feat(api)!: change weather endpoint response format

BREAKING CHANGE: Weather API now returns temperature zones
instead of raw temperature values
```

## Project Board Automation

### GitHub Projects Configuration
```yaml
Project Board Columns:
  - Backlog (auto-add new issues)
  - Ready (refined and ready to work)
  - In Progress (assigned and being worked on)
  - In Review (PR open)
  - Testing (ready for QA)
  - Done (closed and merged)

Automation Rules:
  - New issues → Backlog
  - Issue assigned → In Progress
  - PR opened → In Review
  - PR merged → Done
  - Issue closed → Done
```

## Release Management

### Version Tagging
```bash
# Semantic versioning
v0.1.0  # Initial development
v0.2.0  # Weather integration complete
v0.3.0  # Recommendations engine added
v0.4.0  # UI implementation
v0.5.0  # Caching layer complete
v1.0.0  # MVP release

# Create release
gh release create v1.0.0 \
  --title "MVP Release" \
  --notes "Initial release with core features" \
  --milestone "MVP Launch"
```

## Documentation Requirements

### README Updates
Every significant feature requires README updates:
```markdown
## Features
- ✅ Weather integration with Apple Weather API
- ✅ Intelligent caching (3+ hour TTL)
- ✅ Mobile-responsive design
- ✅ Gravel-specific clothing recommendations
- 🚧 User preferences (in progress)
- 📋 Social sharing (planned)
```

## Related Patterns
- See `compound-engineering-core.md` for learning capture
- See `security-practices.md` for secure Git practices
- See `adr-workflow.md` for architecture decisions

## Workflow Checklist
- [ ] Issue created before starting work
- [ ] Branch created from issue
- [ ] Commits follow conventional format
- [ ] PR links to issue
- [ ] Code review completed
- [ ] Tests pass before merge
- [ ] Documentation updated
- [ ] Milestone progress tracked