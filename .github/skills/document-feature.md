---
name: document-feature
description: Generate or update developer documentation for a new or existing Microsoft Teams platform feature in the msteams-docs repository, following repo conventions, and create a pull request for human review.
version: 1.0.0
---

# Document Feature — Teams Platform Documentation Skill

Automatically generate or update developer documentation for a Microsoft Teams platform feature and open a pull request for review.

## Quick Summary

Run `/document-feature <feature-description-or-scope>` to generate new documentation or update existing docs for a Teams platform feature. The skill discovers repo conventions, writes content that matches the established style, updates the TOC and what's-new entries, then creates a PR for human review.

## IMPORTANT: Automated with PR for review

**Do NOT ask the user questions mid-run. Do NOT pause for confirmation.** Execute every step in order and create a pull request at the end. If a step cannot be completed, log a warning and continue.

**Safety contract:**
- Never delete existing documentation unless explicitly replacing it with updated content.
- Preserve existing frontmatter fields; only update `ms.date` and content.
- Do not modify files outside the documentation scope (no code changes).
- All generated content must be factual and based on provided context — do not invent API behaviors or feature capabilities.

**Style contract:**
- Follow Microsoft Learn documentation style: clear, concise, developer-focused.
- Use second person ("you") to address the developer.
- Use present tense for describing current behavior.
- Prefer active voice.
- Keep sentences short and scannable.

---

## Invocation

```
/document-feature <feature-description-or-scope>
```

- **`feature-description-or-scope`** *(required)* — a description of the feature to document, or a path/scope hint pointing to existing docs to update.
- The user should also provide context such as: API specs, design docs, code samples, or a description of the feature's behavior.
- Examples:
  - `/document-feature Add docs for the new bot emoji reactions API`
  - `/document-feature Update the adaptive cards section to cover universal actions v2`
  - `/document-feature msteams-platform/bots/streaming-ux.md — add streaming response examples`

---

## Workflow

### Phase 0: Understand the Request

1. Parse the user's feature description and any attached context (specs, code, design docs).
2. Determine the **intent**:
   - `new` — create documentation for a feature that doesn't exist yet.
   - `update` — modify existing documentation with new information.
3. Identify the **doc area** — map the feature to the correct folder under `msteams-platform/`:
   - `agents-in-teams/` — Agents built with Teams SDK
   - `bots/` — Bot framework features
   - `tabs/` — Tab apps
   - `messaging-extensions/` — Message extensions
   - `apps-in-teams-meetings/` — Meeting apps
   - `task-modules-and-cards/` — Dialogs and Adaptive Cards
   - `webhooks-and-connectors/` — Webhooks
   - `m365-apps/` — Microsoft 365 cross-platform apps
   - `concepts/` — Cross-cutting concepts (auth, design, deploy)
   - `graph-api/` — Graph API integrations
   - `toolkit/` — Microsoft 365 Agents Toolkit
   - `resources/` — References and schemas
4. Print `📂 Target area: <resolved-folder>` and `🎯 Intent: <new|update>`.

---

### Phase 1: Discover Repo Conventions

1. **Read adjacent files** in the target folder to learn:
   - Frontmatter format (`title`, `description`, `ms.topic`, `ms.localizationpriority`, `ms.date`, optional `author`, `ms.owner`).
   - Heading structure and depth.
   - Use of includes, zone pivots, or tabs.
   - Image/asset referencing patterns (`~/assets/images/...`).
   - Cross-reference link style (relative paths, Learn URLs).
   - Note/tip/warning callout syntax (`> [!NOTE]`, `> [!TIP]`, `> [!IMPORTANT]`).
2. **Read `TOC.yml`** to understand where the new article fits in the navigation hierarchy.
3. **Check `msteams-platform/includes/`** for reusable include files relevant to the feature.
4. **Check the branding mapping** — use current product names:
   - "Microsoft 365 Agents Toolkit" (not "Teams Toolkit")
   - "App Manifest" (not "Teams app manifest")
   - "Microsoft 365 Agents Playground" (not "Test Tool")

Print `✅ Conventions discovered`.

---

### Phase 2: Generate or Update Documentation

#### For new documentation (`intent: new`):

1. **Create the article file** at the appropriate path with proper frontmatter:

```yaml
---
title: <Descriptive title>
description: <Learn about ... — 1-2 sentence SEO description, max 160 chars>
ms.topic: conceptual | how-to | reference
ms.localizationpriority: medium | high
ms.date: <MM/DD/YYYY — today's date>
---
```

2. **Write the content** following this structure (adapt as needed):
   - `# Title` — matches or expands the frontmatter title.
   - **Introduction** — 2-3 sentences explaining what the feature is and why developers need it.
   - **Prerequisites** (if applicable) — bulleted list of what's needed.
   - **Concept sections** — explain how it works with clear headings.
   - **Implementation steps** (for how-to articles) — numbered steps with code samples.
   - **Code samples** — use fenced code blocks with language tags. Use tabs for multi-language samples (`## [C#](#tab/csharp)` / `## [JavaScript](#tab/javascript)`).
   - **Limitations or known issues** (if any).
   - **Next steps** — link to related articles.
   - **See also** — related references.

3. **Add images/diagrams** only if the user provides them or they can be described as placeholders:
   - Use `:::image type="content" source="<path>" alt-text="<description>":::` syntax.
   - Place image files under `msteams-platform/assets/images/<feature-area>/`.

#### For updating documentation (`intent: update`):

1. **Read the existing file** completely.
2. **Make surgical edits** — update only the sections affected by the new information.
3. **Preserve structure** — don't reorganize the document unless the update requires it.
4. **Update `ms.date`** in frontmatter to today's date.

Print `✏️ Documentation written: <file-path>`.

---

### Phase 3: Update Navigation and Cross-References

1. **Update `TOC.yml`** — add the new article entry in the correct location with:
   - `name:` — display name for navigation
   - `href:` — relative path to the article
   - `displayName:` — comma-separated keywords for search

2. **Update `whats-new.md`** (for new features only) — add an entry under the appropriate date section following the existing format:
   ```
   * ***<Month Day, Year>***: [<Feature description>](<relative-path>) is now available.
   ```

3. **Add cross-references** — if the new content relates to existing docs, add "See also" links in both directions where appropriate.

Print `🔗 Navigation updated`.

---

### Phase 4: Validate Content

1. **Frontmatter check** — verify all required fields are present and correctly formatted.
2. **Link validation** — verify all relative links point to existing files (or flag as needing creation).
3. **Style check**:
   - No first person ("I", "we") except in notes attributed to a team.
   - Headings use sentence case (capitalize only the first word and proper nouns).
   - Code blocks have language identifiers.
   - Lists are consistent (all periods or no periods at end of items).
4. **Branding check** — verify current product names are used (see Phase 1 branding mapping).
5. **Include verification** — if using `[!INCLUDE [...]]` syntax, verify the include file exists.

Print validation results:
```
✅ Validation passed
  - Frontmatter: OK
  - Links: <N> verified, <M> flagged
  - Style: OK
  - Branding: OK
```

Or list any warnings/issues found.

---

### Phase 5: Create Pull Request

1. **Create a feature branch** from `main` (if not already on one).
2. **Commit all changes** with a descriptive commit message:
   ```
   docs: add <feature-name> documentation

   - Added <article-name>.md with <brief description>
   - Updated TOC.yml navigation
   - Updated whats-new.md
   ```
3. **Create a pull request** with:
   - **Title:** `docs: <feature description>`
   - **Body:** structured summary including:
     - What was added/changed
     - Files modified (list)
     - Any items flagged for human review (broken links, placeholder images, unverified claims)
     - Checklist for reviewer

Print:
```
🚀 Pull request created: #<number>
   Title: <title>
   Files: <N> added, <M> modified
   Review items: <count>
```

---

## Content Quality Rules

1. **Be precise** — use exact API names, parameter names, and return types from the provided context.
2. **Show, don't just tell** — include code examples for every API or configuration described.
3. **Provide complete examples** — code samples should be copy-paste ready, not pseudo-code.
4. **Document error cases** — mention common errors and how to handle them.
5. **Respect scope** — document only what the feature does, don't speculate on future behavior.
6. **Use standard callouts:**
   - `> [!NOTE]` — supplementary information
   - `> [!TIP]` — helpful suggestions
   - `> [!IMPORTANT]` — critical information that could cause issues if missed
   - `> [!CAUTION]` — potential data loss or security implications
7. **SEO and discoverability** — write descriptions and headings that developers would search for.

---

## Edge Cases and Error Handling

| Situation | Behavior |
|-----------|----------|
| Feature area cannot be determined | Ask in the PR body for reviewer to confirm placement |
| Existing article conflicts with new info | Flag the conflict in the PR body with both versions shown |
| No code samples provided in context | Write the doc structure with `<!-- TODO: Add code sample -->` placeholders and flag in PR |
| Image references without actual images | Use placeholder alt-text and flag in PR body |
| TOC.yml insertion point unclear | Place at end of the most relevant section and flag for reviewer |
| Feature uses deprecated branding | Auto-correct to current branding (see mapping) |
| Provided context is ambiguous | Document the most likely interpretation, flag alternatives in PR body |

---

## Output Files Summary

| File | Purpose |
|------|---------|
| `msteams-platform/<area>/<article>.md` | New or updated documentation article |
| `msteams-platform/TOC.yml` | Updated navigation (new entries) |
| `msteams-platform/whats-new.md` | What's new entry (new features only) |
| `msteams-platform/assets/images/<area>/*` | Supporting images (if provided) |
| `msteams-platform/includes/<name>.md` | Shared include files (if needed) |

---

## PR Body Template

```markdown
## Summary

<1-2 sentence description of what this PR adds or changes.>

## Changes

| File | Action | Description |
|------|--------|-------------|
| `<path>` | Added/Modified | <brief description> |

## Review checklist

- [ ] Content accuracy — verify technical claims against the feature spec
- [ ] Code samples — confirm samples compile/run correctly
- [ ] Links — verify all cross-references resolve
- [ ] Images — confirm screenshots/diagrams are accurate
- [ ] Branding — current product names used throughout
- [ ] TOC placement — navigation entry is in the correct location

## Items flagged for review

<List any warnings, placeholders, or ambiguities that need human judgment.>
```

---

*The skill is complete when the pull request is created. Do not ask follow-up questions.*
