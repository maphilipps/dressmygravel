# Drupal Development Agent Ecosystem

## Overview
This comprehensive agent ecosystem is designed specifically for Drupal development with DDEV, Tailwind CSS, and Storybook. Each agent specializes in specific aspects of Drupal development while working together to provide a complete development experience.

## Agent Categories

### Core Development Agents
- **drupal-environment-setup** - Complete development environment setup with DDEV, Drupal, Tailwind, and Storybook
- **drupal-module-developer** - Custom module creation, hooks, services, and plugin development
- **drupal-theme-specialist** - Theme development with Twig, Tailwind CSS, and responsive design
- **drupal-content-architect** - Content types, fields, taxonomy, and editorial workflow design

### Infrastructure & DevOps
- **ddev-orchestrator** - DDEV container management, services, and local development optimization
- **drupal-deployment-manager** - CI/CD pipelines, automated deployments, and production management
- **composer-dependency-manager** - PHP dependency management and security updates
- **drupal-configuration-syncer** - Configuration management and environment synchronization

### Data & Integration
- **drupal-database-architect** - Database design, optimization, and schema management
- **drupal-api-integrator** - REST/JSON:API development and third-party integrations
- **drupal-migration-specialist** - Data migration, ETL processes, and legacy system imports
- **drupal-multisite-manager** - Multisite architecture and shared resource management

### Quality Assurance & Testing
- **drupal-test-automator** - PHPUnit, Behat, and automated testing workflows
- **drupal-code-quality-inspector** - Code standards, static analysis, and quality gates
- **drupal-accessibility-auditor** - WCAG compliance and accessibility testing
- **drupal-seo-optimizer** - SEO optimization and structured data implementation

### Performance & Security
- **drupal-performance-optimizer** - Caching, database optimization, and performance monitoring
- **drupal-security-guardian** - Security hardening, updates, and vulnerability management

### Frontend & Design
- **storybook-component-curator** - Component library development and design system management
- **drupal-ui-designer** - Modern UI/UX implementation with Tailwind and responsive design

### Specialized Solutions
- **drupal-headless-architect** - Headless/decoupled architecture with frontend frameworks
- **drupal-commerce-specialist** - E-commerce implementation with Drupal Commerce

### Knowledge & Documentation
- **drupal-documentation-generator** - API docs, user guides, and technical documentation
- **drupal-knowledge-curator** - ADRs, best practices, and institutional knowledge management
- **adr-reviewer** - Architecture Decision Record quality validation and consistency checking

## Usage Patterns

### New Project Setup
1. **drupal-environment-setup** - Set up local development environment
2. **drupal-project-initializer** - Initialize new Drupal project
3. **ddev-orchestrator** - Configure DDEV services and optimization
4. **storybook-component-curator** - Set up component development workflow

### Feature Development
1. **drupal-content-architect** - Design content architecture
2. **drupal-module-developer** - Implement custom functionality
3. **drupal-theme-specialist** - Create frontend implementation
4. **drupal-test-automator** - Implement testing coverage

### Quality & Deployment
1. **drupal-code-quality-inspector** - Ensure code standards compliance
2. **drupal-accessibility-auditor** - Validate accessibility requirements
3. **drupal-performance-optimizer** - Optimize for performance
4. **drupal-deployment-manager** - Deploy to production

### Maintenance & Operations
1. **composer-dependency-manager** - Handle security updates
2. **drupal-security-guardian** - Monitor and maintain security
3. **drupal-configuration-syncer** - Manage configuration changes
4. **drupal-documentation-generator** - Keep documentation current

### Architecture Decision Management
1. **drupal-knowledge-curator** - Create and maintain ADRs
2. **adr-reviewer** - Validate ADR quality and consistency
3. **feedback-codifier** - Convert learnings into permanent rules

## Agent Interaction Patterns

### Parallel Workflows
Multiple agents can work simultaneously on different aspects:
- **drupal-module-developer** + **drupal-theme-specialist** for full-stack features
- **drupal-test-automator** + **drupal-code-quality-inspector** for quality assurance
- **drupal-performance-optimizer** + **drupal-security-guardian** for production readiness

### Sequential Workflows
Some agents naturally follow others:
1. **drupal-content-architect** → **drupal-module-developer** → **drupal-theme-specialist**
2. **drupal-migration-specialist** → **drupal-test-automator** → **drupal-performance-optimizer**
3. **drupal-environment-setup** → **ddev-orchestrator** → **storybook-component-curator**

### Feedback Loops
Agents can iterate and improve based on each other's work:
- **debug-detective** findings inform **drupal-code-quality-inspector** rules
- **drupal-performance-optimizer** insights guide **drupal-database-architect** optimizations
- **drupal-accessibility-auditor** results direct **drupal-theme-specialist** improvements

## Integration with Existing Agents

### General Purpose Agents (Keep These)
- **debug-detective** - Cross-platform debugging and troubleshooting
- **git-hygiene-enforcer** - Git workflow and repository management
- **feedback-codifier** - Convert learnings into permanent rules
- **codebase-analyzer** - Deep codebase analysis and pattern recognition
- **web-search-researcher** - External research and documentation lookup

### MVP & Planning Agents (Keep These)
- **mvp-grand-orchestrator** - Overall project coordination
- **mvp-spec-interviewer** - Requirements gathering and scope definition

## Best Practices

### Agent Selection
- Use specific Drupal agents for Drupal-related tasks
- Combine multiple agents for complex features
- Let agents build on each other's work for compound improvements

### Workflow Orchestration
- Start with architecture and planning agents
- Use parallel execution for independent tasks
- Implement feedback loops for continuous improvement
- Document decisions with **drupal-knowledge-curator**

### Quality Assurance
- Always run quality agents before deployment
- Use testing agents throughout development
- Implement security checks at multiple stages
- Maintain documentation as code evolves

This agent ecosystem enables compound engineering principles where each improvement builds on previous work, creating exponentially better outcomes over time.