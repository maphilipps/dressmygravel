---
description: Guidelines and best practices for creating effective .claude/rules to guide Claude Code's behavior, knowledge, and workflows.
version: 1.1
tags: ["meta", "guideline", "claude-rules", "documentation", "best-practices"]
globs: [".claude/rules/**/*.md"] # This rule is relevant when writing or editing any Claude Code rule
---

# Writing Effective Claude Code Rules

Effective `.claude/rules` are the cornerstone of Claude Code's tailored assistance. They guide Claude Code's behavior, provide context, and define workflows. This document outlines best practices for creating powerful and understandable rules, ensuring they effectively direct Claude Code.

## 1. Getting Started: The Basics

When creating new rules:
* Create new Markdown files (`.md`) in the `.claude/rules/` directory.
* Use `kebab-case` naming (e.g., `my-new-rule.md`).
* Follow the established frontmatter structure.
* Include proper tags and globs for rule activation.

## 2. Core Principles for All Claude Code Rules

* **Clear Objective:** Every rule should have a well-defined purpose. State this objective clearly at the beginning of the rule, ideally in the frontmatter `description` and reinforced in the introductory text.
    * *Example:* Rules should start with an "Objective" section. This document's objective is stated in its frontmatter `description` and introduction.
* **Structured Content:** Use Markdown effectively to structure your rule.
    * **Headings and Subheadings:** Organize content logically using `#`, `##`, `###`, etc.
    * **Lists:** Use bulleted (`*`, `-`) or numbered (`1.`, `2.`) lists for steps, criteria, or key points.
    * **Code Blocks:** Use fenced code blocks (```) for code examples, commands, or structured data. Specify the language for syntax highlighting (e.g., ```typescript ... ```).
    * **Emphasis:** Use **bold** and *italics* to highlight important terms or instructions.
* **Clarity and Precision:** Write in a clear, unambiguous manner. Avoid jargon where possible, or explain it if necessary. If the rule is meant to guide AI behavior, precision is paramount.
* **Modularity:** Each rule should ideally focus on a specific topic, tool, workflow, or area of knowledge. This makes rules easier to manage, understand, and update.

## 3. Frontmatter for Metadata

Use YAML frontmatter at the beginning of your rule file to provide metadata. This helps Claude Code (and humans) understand the rule's context and applicability.

```yaml
---
description: A brief explanation of what this rule is for.
author: Your Name/Handle
version: 1.0
# Globs can specify file patterns where this rule is particularly relevant.
# Claude Code might use this to prioritize or activate rules.
globs: ["**/*.js", "**/*.ts", "specific-config.json"]
# Tags can help categorize rules.
tags: ["coding-guideline", "documentation", "workflow", "supabase"]
---

# Rule Title
... rest of the rule content ...
```

* **`description`**: A concise summary of the rule's purpose (as used in this document).
* **`globs`**: (As seen in `next-js-supabase.md` and this document) An array of file patterns indicating relevance.
* **Other metadata**: Include `author`, `version`, `tags` as appropriate (see this document's frontmatter for an example).

## 4. Types of Claude Code Rules and Their Structure

Claude Code rules can serve various purposes. Tailor the structure and content to the type of rule you're writing.

### a. Informational / Documentation Rules
Provide comprehensive information about a system, architecture, or technology. This document is an example of an informational rule.
* **Key Elements:**
    * Overview and project goals.
    * Detailed explanations of components, concepts, or processes.
    * Diagrams (e.g., Mermaid.js) to visualize systems.
    * Code snippets or configuration examples.
    * Definitions of key terms.
* **Example:** This `writing-effective-claude-rules.md` document.

### b. Process / Workflow Rules
Define a sequence of steps for Claude Code or the user to follow to achieve a specific outcome.
* **Key Elements:**
    * A clear start and end point.
    * Numbered steps for sequential actions.
    * Decision points with clear options (e.g., "If X, then Y, else Z").
    * Specification of tools to be used at each step (e.g., `use_mcp_tool`, `write_to_file`).
    * Expected inputs and outputs for each step.
    * Notes on dependencies or prerequisites.
* **Example:** `mcp-development-protocol.md`

### c. Behavioral / Instructional Rules (for Guiding AI)
These rules directly instruct Claude Code on how it should behave, process information, or generate responses, especially in specific contexts.
* **Key Elements:**
    * **Explicit Instructions:** Use imperative verbs (MUST, SHOULD, DO NOT, NEVER, ALWAYS).
    * **Critical Warnings:** Use formatting (bold, ALL CAPS, emojis like 🚨, ⚠️, ✅, ❌) to draw attention to critical instructions or prohibitions (as seen in `next-js-supabase.md` and `mcp-development-protocol.md`).
    * **Positive and Negative Examples:** Show correct and incorrect ways of doing things (e.g., code patterns to use vs. avoid).
    * **Triggers and Conditions:** Define when the rule or specific instructions within it should be activated.
    * **Verification Steps:** Include "thinking" blocks or checklists for the AI to verify its actions against the rule's constraints (e.g., the `<thinking>` block in `mcp-development-protocol.md`).
    * **Context Management:** Define how Claude Code should manage context, memory, or state if relevant (e.g., `memory-bank.md`).
* **Example:** `next-js-supabase.md`, `memory-bank.md`

### d. Meta-Rules
Rules that define how Claude Code manages or improves its own rules or processes.
* **Key Elements:**
    * Triggers for the meta-process.
    * Steps involved in the meta-process (e.g., reflection, suggesting improvements).
    * User interaction points (e.g., asking for confirmation).
* **Example:** `self-improving-claude.md`

## 5. Language and Formatting for AI Guidance

When writing rules intended to directly steer Claude Code's AI behavior, certain conventions are highly effective:

* **Be Directive:**
    * Use **MUST** for absolute requirements.
    * Use **SHOULD** for strong recommendations.
    * Use **MAY** for optional actions.
    * Use **MUST NOT** or **NEVER** for absolute prohibitions.
    * Use **SHOULD NOT** for strong discouragement.
* **Highlight Critical Information:**
    * `next-js-supabase.md` uses "🚨 CRITICAL INSTRUCTIONS FOR AI LANGUAGE MODELS 🚨" and "❌ NEVER GENERATE THIS CODE" / "✅ ALWAYS GENERATE THIS EXACT PATTERN".
    * `mcp-development-protocol.md` uses "⚠️ CRITICAL: DO NOT USE attempt_completion BEFORE TESTING ⚠️" and "BLOCKER ⛔️".
* **Provide Concrete Examples:**
    * Show exact code snippets, commands, or output formats.
    * For code generation, clearly distinguish between desired and undesired patterns.
* **Define AI's "Thought Process":**
    * The `<thinking> ... </thinking>` block in `mcp-development-protocol.md` is a good way to make the AI "pause and check" its understanding or state before proceeding.
    * The "AI MODEL VERIFICATION STEPS" in `next-js-supabase.md` serve a similar purpose.
* **Specify Tool Usage:**
    * If Claude Code needs to use a specific tool, explicitly state it and provide any necessary parameters or context for that tool.

## 6. Content Best Practices

* **Start Broad, Then Narrow:** Begin with a general overview or objective, then delve into specifics.
* **Use Analogies or Scenarios:** If explaining a complex concept, an analogy or a use-case scenario can be helpful.
* **Define Terminology:** If your rule introduces specific terms or acronyms, define them.
* **Anticipate Questions:** Try to think about what questions a user (or Claude Code itself) might have and address them proactively.
* **Keep it Updated:** As systems or processes change, ensure the relevant `.claude/rules` are updated to reflect those changes. The `self-improving-claude.md` rule encourages this.

## 7. Referencing Other Rules

If your rule builds upon or relates to another rule, feel free to reference it by its filename. This helps create a connected knowledge base.

## 8. Testing Your Rule

While not always formally testable, consider how your rule will be interpreted:
* **Human Readability:** Is it clear to another person? If so, it's more likely to be clear to Claude Code.
* **AI Interpretation (for behavioral rules):** Does it provide enough specific guidance? Are there ambiguities? Try "role-playing" as Claude Code and see if you can follow the instructions.
* **Practical Application:** If it's a workflow, manually step through it. If it's a coding guideline, try applying it to a piece of code.
* **Self-Review Against These Guidelines:** Does your new rule adhere to the principles and best practices outlined in *this very document* (`writing-effective-claude-rules.md`)?
