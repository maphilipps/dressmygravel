# Architectural Decision Records (ADR) System

This directory contains Architectural Decision Records (ADRs) for the compound-engineering-setup project. ADRs document important architectural and design decisions made throughout the project's lifecycle.

## What are ADRs?

Architectural Decision Records are short documents that capture important architectural decisions along with their context and consequences. They help teams:

- Document the reasoning behind architectural choices
- Provide context for future developers
- Reduce repeated architectural debates
- Create a searchable history of technical decisions

## ADR Format

Each ADR follows a standardized format based on the Cognitect methodology:

```markdown
# ADR-XXX: [Decision Title]

## Status
[Proposed | Accepted | Deprecated | Superseded by ADR-YYY]

## Context
[Describe the forces at play, including technological, political, social, and project local factors]

## Decision
We will [describe the response to these forces].

## Consequences
[Describe the resulting context, after applying the decision]
```

## When to Create an ADR

Consider creating an ADR when making decisions about:

- **Architecture**: Major structural changes, service boundaries, data flow patterns
- **Technology**: Adopting new frameworks, languages, or significant dependencies  
- **Infrastructure**: Deployment strategies, hosting platforms, monitoring approaches
- **Development Process**: Build systems, testing strategies, code organization
- **Data**: Database schema changes, data migration strategies, data governance

## ADR Lifecycle

1. **Proposed**: ADR is drafted and under discussion
2. **Accepted**: Decision has been approved and implemented
3. **Deprecated**: Decision is no longer recommended but may still be in use
4. **Superseded**: Decision has been replaced by a newer ADR

## File Naming Convention

ADRs are numbered sequentially:
- `adr-001-example.md` - Example ADR documenting this ADR system
- `adr-002-database-choice.md` - Example of a technical decision
- `adr-003-api-versioning.md` - Example of an API design decision

## Creating a New ADR

### Using Claude Code Slash Commands
The ADR system integrates with Claude Code through dedicated slash commands:

```
# Create a new ADR
/adr_new Your Decision Title

# List all ADRs with status
/adr_list
/adr_list accepted     # Filter by status

# Display a specific ADR
/adr_show 001
/adr_show 001 --section decision    # Show specific section

# Search ADR content  
/adr_search database
/adr_search "exact phrase" --status proposed
```

### Manual Creation (Alternative)
1. Copy the template: `cp .adrs/template.md .adrs/adr-XXX-your-title.md`
2. Replace XXX with the next sequential number
3. Fill in the title and all sections
4. Commit the ADR with your changes

## Integration with Development Workflow

The ADR system is designed to integrate seamlessly with existing development practices:

- **Code Reviews**: ADRs are reviewed as part of pull requests
- **Git History**: ADRs are versioned alongside code changes
- **Documentation**: ADRs serve as living architectural documentation
- **Automation**: Future phases will include automated detection of ADR-worthy changes

## Current ADRs

- [ADR-001: Implement ADR System](./adr-001-example.md) - Decision to adopt this ADR system

## Best Practices

### Writing Good ADRs
- **Be Specific**: Focus on concrete decisions, not general discussions
- **Include Context**: Explain the circumstances that led to the decision
- **Consider Alternatives**: Briefly mention options that were considered but rejected
- **Document Consequences**: Include both positive and negative outcomes

### ADR Maintenance
- **Update Status**: Change status as decisions evolve
- **Link Related ADRs**: Reference related or superseding decisions
- **Keep Current**: Update ADRs if circumstances change significantly
- **Review Regularly**: Periodically review ADRs during architecture discussions

## Team Guidelines

### Required ADRs
The following changes typically require an ADR:
- New major dependencies or frameworks
- Changes to data storage or persistence strategies
- API design decisions that affect multiple services
- Infrastructure or deployment architecture changes
- Security architecture decisions

### Optional ADRs
Consider an ADR for:
- Significant refactoring decisions
- Testing strategy changes
- Development tooling choices
- Performance optimization strategies

### ADR Review Process
1. Create ADR in "Proposed" status
2. Include ADR in pull request with related changes
3. Team reviews both code and ADR
4. ADR status changes to "Accepted" upon merge
5. Implementation follows the documented decision

## Future Enhancements

The ADR system will be enhanced in future phases:

- **Phase 2**: Automated detection of ADR-worthy changes via Git hooks
- **Phase 3**: Mandatory workflow enforcement with escape hatches
- **Phase 4**: Enhanced CLI tooling and editor integration
- **Phase 5**: Analytics, reporting, and relationship tracking

## Resources

- [ADR GitHub Organization](https://adr.github.io/) - Community resources and tools
- [Cognitect ADR Tools](https://github.com/cognitect-labs/adr-tools) - Original inspiration
- [Architecture Decision Records](https://www.thoughtworks.com/radar/techniques/lightweight-architecture-decision-records) - ThoughtWorks article