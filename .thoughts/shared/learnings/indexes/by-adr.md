# Learning-ADR Cross-Reference Index

This index maintains bidirectional links between captured learnings and Architectural Decision Records (ADRs).

## ADR-001: Implement ADR System
*Status: Accepted*

### Related Learnings
- *No learnings linked yet*

### Implementation Notes
- System successfully established through PR #3
- Learning capture automation configured
- Cross-reference system initialized

---

## Unlinked Learnings
*Learnings not yet associated with specific ADRs*

- *No unlinked learnings found*

---

## Cross-Reference Management

### Linking Process
1. Use `/adr_link adr-XXX learning-filename` to create bidirectional links
2. Links are automatically maintained in both ADR documents and learning files
3. This index is updated when links are created or modified

### Discovery Commands
- `/adr_link --discover adr-XXX` - Find learnings related to specific ADR
- `/adr_link --find-learnings [topic]` - Find ADRs related to learning topics
- `/adr_search [term]` - Search ADR content for related decisions

### Maintenance
- `/adr_link --repair` - Check and repair broken cross-references
- Regular review ensures links remain current and valuable

---

*This index is automatically maintained by the ADR-learning cross-reference system.*