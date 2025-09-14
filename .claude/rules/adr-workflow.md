---
description: Architecture Decision Record (ADR) workflow using npryce/adr-tools for capturing and tracking architectural decisions in compound engineering projects.
author: Compound Engineering Team
version: 2.0
tags: ["adr", "adr-tools", "architecture", "decision-tracking", "documentation", "compound-engineering"]
globs: ["doc/architecture/decisions/**/*.md", "*"]
---
# Architecture Decision Record (ADR) Workflow

**Objective:** Systematically capture architectural decisions using npryce/adr-tools to build institutional knowledge that compounds over time, preventing repeated discussions and enabling faster, smarter future decisions.

## Setup and Installation

### Install adr-tools
```bash
# macOS
brew install adr-tools

# Verify installation
adr help
```

### Initialize ADR Directory
```bash
# Initialize in recommended location
adr init doc/architecture/decisions

# This creates the directory and first ADR (record architecture decisions)
```

### Standard Directory Structure
```
doc/
└── architecture/
    └── decisions/
        ├── 0001-record-architecture-decisions.md
        ├── 0002-use-compound-engineering.md
        └── 0003-adopt-microservices.md
```

## When to Create ADRs

Create an ADR for any decision that:
- **Affects system structure** or component relationships
- **Impacts multiple teams** or future development
- **Involves trade-offs** between alternatives
- **Sets precedents** for similar future decisions
- **Changes existing architectural patterns**
- **Introduces new technologies** or frameworks

## ADR Creation Process

### 1. Decision Trigger Recognition
When you encounter a decision point, **MUST**:
- Pause implementation
- Assess architectural impact
- Check existing ADRs for related decisions
- Determine if new ADR is needed

### 2. Create New ADR
Use adr-tools to create standardized ADRs:

```bash
# Create new ADR (opens in $VISUAL/$EDITOR)
adr new "Use microservices architecture"

# Create ADR that supersedes an existing one
adr new -s 3 "Adopt event-driven microservices"
```

### 3. ADR Template Structure
adr-tools creates standardized ADRs with this structure:

```markdown
# 4. Use microservices architecture

Date: 2024-01-15

## Status

Proposed

## Context

[What is the issue motivating this decision? 
What architectural factors led to this decision point?
What constraints exist?]

## Decision

[What is the specific decision being made?
What exact approach will we take?]

## Consequences

[What becomes easier or more difficult to do because of this change?]

### Positive
- [Benefit 1: How this improves the system]
- [Benefit 2: What this enables for future work]

### Negative
- [Cost 1: What we give up or complicate]
- [Risk 1: What could go wrong]

### Neutral
- [Impact 1: Changes that are neither positive nor negative]

## Alternatives Considered

### Option A: [Alternative approach]
- **Pros**: [Benefits]
- **Cons**: [Drawbacks]
- **Why rejected**: [Specific reason]

## Implementation Notes

[Specific implementation details, patterns to follow, or constraints]

## Related Decisions

- [0001-record-architecture-decisions.md](0001-record-architecture-decisions.md)
- [Link to relevant documentation]

## Compound Engineering Impact

[How does this decision improve our ability to make similar decisions faster in the future?
What patterns does this establish for reuse?]
```

### 4. ADR Numbering System
adr-tools automatically handles numbering:
- Sequential numbering (0001, 0002, etc.)
- Automatic increment with each `adr new` command
- Never reuse numbers, even for deleted ADRs

### 5. Review and Approval Process
**MUST** follow this sequence:
1. **Draft ADR** with status "Proposed"
2. **Automated ADR Review** using `adr-reviewer` agent for structure and quality validation
3. **Technical Review** by relevant stakeholders
4. **Impact Assessment** on existing systems
5. **Status Update** to "Accepted" or "Rejected"
6. **Implementation Tracking** if accepted

#### ADR Reviewer Agent Integration
Use the `adr-reviewer` agent at step 2 to ensure quality and consistency:

```bash
# After creating ADR, run automated review
# Agent validates: structure, completeness, terminology, cross-references
# Provides: validation report, improvement suggestions, compliance status
```

The agent checks:
- **Structure**: Required sections and formatting compliance
- **Content Quality**: Problem clarity, decision rationale, consequences coverage
- **Consistency**: Terminology alignment with project glossary and existing ADRs
- **Completeness**: All required information present and linked properly

## ADR Management

### Status Transitions
adr-tools supports standard ADR statuses:
- **Proposed** → **Accepted**: Decision approved and being implemented
- **Proposed** → **Rejected**: Decision rejected, document preserved for context
- **Accepted** → **Deprecated**: Decision no longer applies but not replaced
- **Accepted** → **Superseded by [ADR-XXXX]**: Decision replaced by newer ADR

### Status Management Commands
```bash
# List all ADRs with their current status
adr list

# Generate graphviz visualization of ADR relationships
adr generate graph

# Generate table of contents
adr generate toc
```

### ADR Updates
**NEVER** modify accepted ADRs. Instead:
```bash
# Create superseding ADR
adr new -s 5 "Updated microservices approach"

# This automatically:
# - Creates new ADR with higher number
# - Updates ADR 5 status to "Superseded by ADR-XXXX"
# - Links the relationship between ADRs
```

### Periodic Review
**Quarterly ADR Review Process**:
```bash
# Generate current ADR status report
adr list

# Generate visual relationship map
adr generate graph | dot -Tpng -o adr-relationships.png

# Review process:
1. Review all "Accepted" ADRs for continued relevance
2. Mark outdated decisions as "Deprecated"
3. Identify patterns across ADRs for systematic improvement
4. Update compound engineering rules based on decision patterns
```

## Integration with Development Workflow

### During Planning
- **MUST** check existing ADRs before architectural decisions
- Reference relevant ADRs in planning documents
- Create placeholder ADRs for identified decision points

### During Implementation
```bash
# Reference ADR in commit messages
git commit -m "feat: implement user service (ref: ADR-0004)"

# Create follow-up ADRs for discovered issues
adr new "Handle user service data consistency"
```
- Update implementation notes in ADRs as needed
- Create follow-up ADRs for discovered architectural issues

### During Review
- Verify implementation matches ADR decisions
- Flag deviations for ADR updates or new ADRs
- Capture lessons learned for future ADR improvements

## Compound Learning Integration

### Pattern Recognition
Track recurring decision patterns:
- **Technology Selection**: Build decision matrices that improve over time
- **Architecture Patterns**: Document which patterns work in which contexts
- **Trade-off Analysis**: Develop better trade-off evaluation frameworks

### Decision Acceleration
Use ADRs to speed up future decisions:
- **Precedent Search**: Quickly find similar past decisions
- **Context Reuse**: Leverage previously analyzed contexts
- **Alternative Elimination**: Skip already-rejected alternatives

### Knowledge Distribution
- Link ADRs from relevant code comments
- Include ADR references in system documentation
- Create ADR summaries for new team members

## Quality Requirements

Every ADR **MUST**:
- [ ] Have clear, specific decision statement
- [ ] Document at least 2 alternatives considered
- [ ] Include concrete consequences (positive and negative)
- [ ] Provide implementation guidance
- [ ] Connect to compound engineering improvement

## adr-tools Commands Reference

### Essential Commands
```bash
# Initialize ADR directory
adr init [directory]

# Create new ADR
adr new "Decision title"

# Create ADR that supersedes another
adr new -s 5 "Updated decision title"

# List all ADRs
adr list

# Generate relationship graph
adr generate graph

# Generate table of contents
adr generate toc

# Show help
adr help
```

### Advanced Integration
```bash
# Generate ADR status dashboard
adr list | grep -E "(Proposed|Accepted)" > adr-status.txt

# Create ADR link documentation
adr generate toc >> README.md

# Visualize ADR relationships
adr generate graph | dot -Tsvg -o doc/adr-graph.svg
```

### Automation Opportunities
- Git hooks to remind about ADR creation for architectural changes
- CI/CD integration to validate ADR references in commits
- Automated ADR status reporting in project dashboards

**Remember**: ADRs are not just documentation - they are the foundation of our compound engineering approach, turning every architectural decision into permanent institutional wisdom that accelerates future work.