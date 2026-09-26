---
name: document-feature
description: End-to-end AI-assisted documentation for the msteams-docs repository. Ingests context from a link, file, or folder, classifies the task as a new feature or a documentation update, then writes/updates the article, TOC placement, headings, images, links, code snippets, zone pivots, and See also sections. Asks the user whenever anything is unclear and always asks for confirmation before opening a pull request.
version: 2.2.0
---

# Document Feature — Teams Platform Documentation Skill

GitHub Copilot skill that performs **end-to-end, AI-enabled documentation automation** for the [MicrosoftDocs/msteams-docs](https://github.com/MicrosoftDocs/msteams-docs) repository and opens a pull request for review.

## Quick Summary

Run `/document-feature <source>` where `<source>` is a **webpage URL, a file path, or a folder path**. The skill extracts context from that source, decides whether the work is a **new feature** doc or a **documentation update**, finds the right place in the TOC, restructures headings and lists, audits images/GIFs, repairs inbound and anchor links across the whole repo, validates code snippets against the Teams SDK docs, reworks zone pivots, refreshes the **See also** section, and adds notes/examples/tables. It asks you whenever something is unclear, then prints a full pre-PR summary and creates the PR only after you confirm.

## IMPORTANT: Ask the user whenever anything is unclear

**Always ask the user for clarification or confirmation when in doubt.** Never guess, never assume, and never invent context to keep the run moving. Execute the phases in order, but stop and ask whenever a decision is ambiguous, information is missing, or an input cannot be reached.

**Ask-the-user contract:**

- **Ask, don't assume.** If the context, the intent, the impacted articles, the target folder, the TOC placement, the audience, or the scope is not obvious, ask the user before proceeding.
- **Ask when inputs are unavailable.** If a source link is unreachable, gated, or requires sign-in; if a file or folder path does not exist or is empty; if a chat, thread, work item, or conversation cannot be reached or read — stop and ask the user for an alternate source, an export, or pasted content. Do not fabricate the missing context.
- **Ask when more than one answer is reasonable.** If the task could be a new feature or a doc update, if several existing articles could be the one to update, or if multiple TOC parents are plausible, present the options and ask the user to choose.
- **Ask before anything destructive or hard to reverse.** Deleting content, removing an image, moving or renaming a file, adding a redirect, removing a zone pivot, or changing another article — confirm first.
- **Ask before creating the pull request.** The pre-PR summary in Phase 11 must be printed and explicitly confirmed by the user before any branch, commit, or PR is created.
- **How to ask.** Ask one focused question at a time, state what you already know, offer concrete options with a recommended default, and wait for the answer. Never bundle several questions into one prompt.
- **After asking.** Record the user's answer in the run context, apply it, and reflect the decision in the PR body.

**Safety contract:**

- Never delete existing documentation unless explicitly replacing it with updated content.
- Preserve existing frontmatter fields; only update `ms.date` and content-affecting fields.
- Do not modify files outside documentation scope (no product code changes).
- All generated content must be factual and grounded in the extracted source context or the official Teams SDK documentation — never invent API behavior, parameters, or capabilities.
- Never delete an image, GIF, or asset that is still referenced anywhere in the repo.
- Never break an existing published URL; when a file must move, add a redirect entry instead of deleting.
- Screenshots must never contain personal, customer, or tenant-identifying data — real names, email addresses, avatars, tenant/subscription/object IDs, tokens, keys, connection strings, phone numbers, or customer content. If an asset contains any of it, flag the asset in the PR body for human review instead of committing it.

**Style contract:**

- Follow Microsoft Learn documentation style: clear, concise, developer-focused.
- Use second person ("you"). Present tense. Active voice. Short, scannable sentences.
- Match the tone, structure, and formatting of neighboring articles in the same folder — the repo's own style always wins over generic guidance.
- All visuals and their alt text must follow the Microsoft Learn screenshot and accessibility guidance defined in [Phase 5](#phase-5-audit-images-screenshots-and-gifs) — every meaningful image is captured, stored, referenced, and described according to those rules.

---

## Invocation

```
/document-feature <source> [scope-hint]
```

- **`source`** *(required)* — the context source. One of:
  - **Link** — a webpage URL (spec, blog post, Learn article, SDK reference, ADO/GitHub item).
  - **File** — a local path to a spec, design doc, code sample, changelog, or existing `.md` article.
  - **Folder** — a directory of specs, samples, or docs to be read recursively.
- **`scope-hint`** *(optional)* — a target path or area hint (for example, `msteams-platform/bots/`).
- Examples:
  - `/document-feature https://learn.microsoft.com/... bot emoji reactions API`
  - `/document-feature C:\specs\streaming-ux-spec.docx`
  - `/document-feature C:\specs\agents-sdk\ msteams-platform/agents-in-teams/`

---

## Workflow

### Phase 0: Ingest the Source and Extract Context

1. **Resolve the source type** — link, file, or folder. **If no source was provided, or the source type is ambiguous, ask the user for it before doing anything else.**
   - **Link:** fetch the page. Follow one level of directly relevant in-page links (spec appendices, SDK reference pages). Capture headings, API names, parameters, code snippets, screenshots, and version/release information. **If the link is unreachable, gated, requires sign-in, or returns partial content, ask the user** to provide an alternate link, an export, or the pasted content — do not proceed on guesswork.
   - **File:** read the whole file. For code files, extract public APIs, types, and usage patterns. For `.md`, extract structure and claims. **If the file is missing, unreadable, or in an unsupported format, ask the user** for a correct path or a readable version.
   - **Folder:** enumerate recursively, skip binaries and build output, and read every relevant spec, README, sample, and manifest. **If the folder is empty, missing, or contains no recognizable context, ask the user** which files to use.
   - **Chat, thread, work item, or conversation source:** if it cannot be reached or read, **ask the user** to paste the relevant content or point to an accessible copy.
2. **Build a context record** containing: feature name, capability summary, target audience, APIs/parameters/returns, code snippets by language, prerequisites, limitations, supported platforms/clients (Teams, Outlook, Microsoft 365 Copilot), and any images provided. **If any of these is missing or unclear and it materially affects the article, ask the user rather than inferring it.**
3. **Classify the task type:**
   - `new-feature` — the capability has no existing article in the repo.
   - `doc-update` — an article already covers this area and needs revision.
   - Decide by searching the repo for the feature name, API names, and close synonyms. If a strong match exists (title, headings, or API names overlap), choose `doc-update` and record the target file(s). Otherwise choose `new-feature`.
   - **If the classification is not clear-cut — or if several articles could be the target — list the candidates and ask the user to confirm the task type and the impacted articles before continuing.**
4. Print `📥 Source: <type> — <location>` and `🎯 Task type: <new-feature|doc-update>`.
5. **Confirm the understanding.** Summarize the extracted context and the impacted article(s) in a few lines and ask the user to confirm it is correct before moving to Phase 1.

---

### Phase 1: Locate the Article and Its TOC Placement

1. **Map the feature to a doc area** under `msteams-platform/`:
   - `agents-in-teams/` — agents built with the Teams AI/Agents SDK
   - `bots/` — bot framework features
   - `tabs/` — tab apps
   - `messaging-extensions/` — message extensions
   - `apps-in-teams-meetings/` — meeting, call, and live-share apps
   - `task-modules-and-cards/` — dialogs and Adaptive Cards
   - `webhooks-and-connectors/` — webhooks and connectors
   - `m365-apps/` — Microsoft 365 cross-platform apps
   - `messaging-extensions/`, `concepts/` — cross-cutting concepts (auth, design, build, deploy, publish)
   - `graph-api/` — Graph API integrations
   - `toolkit/` — Microsoft 365 Agents Toolkit
   - `resources/` — references, schemas, and samples
2. **Read `msteams-platform/TOC.yml`** and determine the exact insertion point:
   - Find the parent node whose siblings share the same conceptual level and audience.
   - Prefer placing the article next to the closest sibling topic (same feature family, same app type).
   - Respect the existing ordering convention of that node (build → integrate → test → publish, or basic → advanced).
   - For `doc-update`, verify the existing TOC entry is still in the right place; move it if the article's scope changed.
3. Record the proposed TOC entry (`name`, `href`, `displayName`) and the parent path in the tree.
4. Print `📂 Target area: <folder>` and `🧭 TOC placement: <parent > child path>`.

---

### Phase 2: Discover Repo Conventions

1. **Read adjacent articles** in the target folder to learn:
   - Frontmatter shape (`title`, `description`, `ms.topic`, `ms.localizationpriority`, `ms.date`, `author`, `ms.owner`, `zone_pivot_groups`).
   - Heading depth and naming patterns; sentence-case headings.
   - Use of includes, zone pivots, and tabbed content.
   - Image referencing patterns (`~/assets/images/<area>/...`) and `:::image:::` usage — capture the folder's alt-text style (phrasing, length, whether screenshots start with `Screenshot of`) and which `:::image:::` attributes the folder uses (`border`, `loc-scope`, `lightbox`).
   - Cross-reference style (relative `.md` paths with anchors, Learn absolute URLs for non-repo content).
   - Callout syntax (`> [!NOTE]`, `> [!TIP]`, `> [!IMPORTANT]`, `> [!CAUTION]`).
   - "See also" and "Next step" section conventions at the bottom of articles.
2. **Check `msteams-platform/includes/`** for reusable includes that already cover parts of the content — reuse instead of duplicating.
3. **Check `zone-pivot-groups.yml`** (or the repo's pivot definition file) for existing pivot group IDs and their pivot values.
4. **Apply current branding:**
   - "Microsoft 365 Agents Toolkit" (not "Teams Toolkit")
   - "App manifest" (not "Teams app manifest")
   - "Microsoft 365 Agents Playground" (not "Test Tool")
   - "Microsoft 365 Copilot" (not "Microsoft Copilot" for the Copilot app surface)

Print `✅ Conventions discovered`.

---

### Phase 3: Write or Update the Article

#### For a new feature (`new-feature`)

1. **Create the article** at `msteams-platform/<area>/<kebab-case-title>.md` with frontmatter matching neighboring files:

```yaml
---
title: <Descriptive, search-friendly title>
description: <Learn how/about ... — 1-2 sentences, max 160 chars, includes key search terms>
ms.topic: conceptual | how-to | reference
ms.localizationpriority: medium | high
ms.date: <MM/DD/YYYY — today's date>
ms.owner: <owner alias if the folder uses it>
zone_pivot_groups: <group-id, only if pivots are used>
---
```

2. **Write the content** using this structure, adapted to the folder's conventions:
   - `# Title`
   - **Introduction** — 2-3 sentences: what the feature is, who it's for, why it matters.
   - **Prerequisites** — bulleted list, when applicable.
   - **Concept sections** — how it works, with diagrams or tables where they aid comprehension.
   - **Implementation steps** — numbered, each step with the code required to complete it.
   - **Code samples** — fenced blocks with language identifiers; multi-language via tabs (`## [C#](#tab/csharp)` / `## [JavaScript](#tab/javascript)` / `---`).
   - **Examples and tables** — parameter tables, property tables, supported-surface matrices, and at least one realistic end-to-end example.
   - **Limitations and known issues.**
   - **Next step** — the single logical follow-on article.
   - **See also** — related references (see Phase 8).

#### For a documentation update (`doc-update`)

1. **Read the existing article completely** before editing.
2. **Make surgical edits** — revise only sections affected by the new context; do not rewrite unaffected prose.
3. **Reconcile conflicts** — where the source contradicts the article, update to the source and flag the change in the PR body.
4. **Remove or mark deprecated content** — move retired behavior into a clearly labeled note or delete it if the source confirms removal; never silently drop supported behavior.
5. **Update `ms.date`** to today's date.

Print `✏️ Documentation written: <file-path>`.

---

### Phase 4: Restructure Headings, Subheadings, and Lists

1. **Enforce a single `#` H1**; no heading level skips (`##` → `####` is invalid).
2. **Rewrite headings** to be sentence case, task-oriented, and scannable ("Send a streaming response", not "Streaming Responses Overview").
3. **Reorder sections** into the reading order a developer follows: concept → prerequisites → setup → implementation → examples → limitations → next step → see also.
4. **Promote or demote sections** so that related content nests correctly under its parent concept.
5. **Normalize lists:**
   - Convert prose paragraphs that enumerate items into bulleted lists.
   - Convert bulleted sequences that must be followed in order into numbered lists.
   - Keep list items parallel in grammar and consistent in end punctuation.
   - Convert two-dimensional bulleted content (item + attributes) into a table.
6. **Record every heading that was renamed, added, removed, or re-leveled** — this list drives the anchor-link repair in Phase 6.

Print `🧱 Structure normalized: <N> headings changed`.

---

### Phase 5: Audit Images, Screenshots, and GIFs

The authoritative source of truth for this phase is the Microsoft-internal guidance in [References](#references). The rules below are the checkable form the skill applies.

#### Inventory and decide

1. **Inventory every asset referenced** by the article (`:::image:::`, Markdown image syntax, and includes).
2. For each asset, decide:
   - **Keep** — still accurate for the documented behavior and current UI.
   - **Update** — the UI, labels, product name, or flow shown no longer matches the content; mark it `NEEDS-NEW-SCREENSHOT` and flag it in the PR body with the exact reason.
   - **Add** — a step or concept that the source describes visually has no supporting visual; add a placeholder reference with descriptive alt text and flag it.
   - **Remove** — the asset documents removed behavior; remove the reference (and the file only if nothing else in the repo references it).
3. **Validate every asset path resolves** to a file under `msteams-platform/assets/images/<area>/`.
4. **GIFs** — confirm the animation still matches the described flow; if the flow changed, flag for re-recording.

#### When to use a visual at all

1. Use a screenshot only when it **adds information the text can't convey** — an ambiguous UI location, a visual result, or a layout that words alone don't pin down.
2. Don't screenshot something a sentence or a code block already explains.
3. **Never screenshot code, terminal output, JSON, or a manifest.** Use a fenced code block instead, so the content stays copyable, searchable, localizable, and accessible to screen readers.
4. Prefer a **numbered procedure** over a series of near-identical screenshots; one screenshot of the decisive step beats six of the same dialog.

#### Capturing a screenshot

1. **Crop tightly** to the relevant UI region. Exclude the desktop, browser chrome, unrelated panes, and empty space.
2. **Capture at 100% scale / standard DPI** so UI text is legible without zooming.
3. Use the **default (light) theme** unless the article is specifically about theming, and stay consistent within an article.
4. **Scrub all sensitive and personal data before committing** — real names, email addresses, avatars, tenant/subscription/object IDs, tokens, keys, connection strings, phone numbers, and customer data. Use fictitious sample data.
5. Show the **current, shipping UI** and current branding and product names.
6. If a region must be called out, use a **single consistent annotation style** (for example, a red rectangle), and still describe the callout in the surrounding text. Never rely on the annotation — or on color — alone to carry meaning.

#### Saving and storing

1. **File type:** `.png` for UI screenshots, `.jpg` for photographic content, `.gif` only for short animated flows. Learn supports `.jpg` and `.png` by default; any other type must be registered as a resource in `docfx.json`.
2. **Keep files small** and optimize before committing. If an asset is unusually large, flag it for human review rather than committing a bloated file.
3. **Location:** store assets under `msteams-platform/assets/images/<area>/`, following the neighboring folder's naming convention.
4. **File names:** descriptive kebab-case that says what the image shows — never `image1.png`.
5. **Don't store images in an `/includes` folder** — that folder is excluded from the build. Put them in the associated media/assets folder instead.
6. **Don't share one media file across multiple includes or articles**; give each its own asset.

#### Referencing in Markdown

Prefer the Learn `:::image:::` extension over basic Markdown image syntax.

- **Standard image** — `source` and `alt-text` are both **required** for `type="content"`:

  ```md
  :::image type="content" source="~/assets/images/<area>/<file>.png" alt-text="<alt text>":::
  ```

- **Complex image** (diagram, chart, architecture, or flow) — `source`, `alt-text`, the long description, and the `:::image-end:::` closing tag are all required:

  ```md
  :::image type="complex" source="~/assets/images/<area>/<file>.png" alt-text="<short alt text>":::
     <Long description: the data, relationships, or sequence the diagram conveys, in full sentences.>
  :::image-end:::
  ```

- **Decorative icon** — `alt-text` must **not** be specified for icons:

  ```md
  :::image type="icon" source="~/assets/images/<area>/<file>.png":::
  ```

- Use the **`border`** property instead of drawing a border into the image. It defaults to `true` for `content` and `complex`, and `false` for `icon`.
- Set **`loc-scope`** when the image's localization scope differs from the article's — required for a screenshot of a product with a different localization scope.
- If existing content uses basic Markdown `![alt](path)`, escape underscores in the alt text as `\_`, and never reuse the file name as the alt text.

#### Alt-text requirements

Apply these rules to **every** image reference the skill generates or touches:

1. **Every meaningful image requires alt text.** Decorative images must not have it — reference them with `type="icon"`.
2. **Keep it concise** — target roughly 125 characters or fewer.
3. Describe the **purpose and meaning of the image in context**, not every pixel.
4. Screenshots **may and should** begin with `Screenshot of ...` or `Screenshot that shows ...`. Do **not** begin with `Image of`, `Graphic of`, `Picture of`, or `Photo of`.
5. **Don't duplicate** the caption or adjacent body text verbatim — alt text adds information, it doesn't repeat it.
6. **Don't put the file name or path** in alt text.
7. Write it as a **complete, punctuated phrase or sentence ending in a period**.
8. **Include any text baked into the image** that carries meaning.
9. **Complex visuals need a long description** via `type="complex"` — alt text alone is not sufficient for a diagram, chart, or flow.
10. **Never rely on color alone** to convey meaning in a visual; the surrounding text must explain it too.
11. **Videos and animated GIFs** need captions or a transcript, or an equivalent text description of the flow next to the embed.

| | Example |
| --- | --- |
| ❌ DON'T | `alt-text="teams-app-settings-1.png"` |
| ✅ DO | `alt-text="Screenshot of the Teams app settings pane with the Permissions tab selected."` |

#### New images from the source

If the source provided new images, place them under `msteams-platform/assets/images/<area>/` using the folder's naming convention, apply every rule above, and reference them with the `:::image:::` form that matches the image type.

Print `🖼️ Images: <kept> kept, <updated> flagged for update, <added> added, <removed> removed`.

---

### Phase 6: Repair Inbound Links and Anchors Across the Repo

1. **Find all inbound references** — search the entire repo for links to the current article (file name, relative paths from other folders, and `TOC.yml` `href` entries).
2. **Validate each inbound link** resolves to the article's current path; fix any that are broken or that point at a renamed/moved file.
3. **Validate anchor links** — for every inbound link containing `#anchor`, check the anchor against the article's **current** heading slugs (lowercase, spaces → hyphens, punctuation stripped).
   - Cross-reference the Phase 4 rename log: every renamed or re-leveled heading invalidates its old anchor.
   - Update each failing inbound anchor to the new slug, or to the nearest surviving section when the heading was removed.
4. **Validate outbound links** in the article — every relative link, anchor, include path, and Learn URL must resolve. Fix broken ones; flag any that require content that doesn't exist yet.
5. **Re-check after edits** — run the link and anchor validation a second time after all fixes so that repairs made in step 3 didn't introduce new failures.
6. **Update `TOC.yml` and `.openpublishing.redirection.json`** if the article path changed.

Print:

```
🔗 Links: <N> inbound checked, <A> fixed, <B> anchors repaired, <C> outbound fixed, <D> flagged
```

---

### Phase 7: Validate Code Snippets Against the Teams SDK

1. **Extract every code block** in the article with its language tag.
2. For each snippet, verify against the official Teams SDK / Bot Framework / Adaptive Cards reference documentation and the source context:
   - Namespaces, imports, and package names are current.
   - Class, method, property, and parameter names exist and are spelled correctly.
   - Method signatures, argument order, and return types match the SDK.
   - The snippet reflects the current recommended pattern, not a deprecated one.
3. **Classify each snippet:**
   - `valid` — leave as is.
   - `outdated` — rewrite to the current SDK API and note the change in the PR body.
   - `irrelevant` — the snippet no longer supports the surrounding content; replace it with one that does, or remove it.
   - `unverifiable` — cannot be confirmed against SDK docs; keep it, mark it in the PR body for SME review.
4. **Ensure completeness** — snippets are copy-paste ready with the context needed to run, not pseudo-code fragments.
5. **Ensure every fence has a language identifier** and that tabbed multi-language sets are complete and consistently ordered.

Print `💻 Code: <valid> valid, <fixed> updated, <removed> removed, <flagged> flagged`.

---

### Phase 8: Zone Pivots, Notes, See Also, and Enrichment

1. **Zone pivots:**
   - Determine whether the content genuinely differs by pivot dimension (SDK/language, app type, or platform surface).
   - **Add** pivots when the source describes divergent instructions per surface or SDK; declare `zone_pivot_groups` in frontmatter and wrap sections with `::: zone pivot="<value>"` / `::: zone-end`.
   - **Update** existing pivots when a new surface or SDK is introduced by the source.
   - **Remove** pivots when the instructions have converged and the branches are now identical.
   - Verify every pivot value used exists in the repo's zone pivot group definition, and that every declared pivot has content in the article.
2. **Add `> [!IMPORTANT]` notes** for behavior that causes failures if missed: preview/GA status, licensing or admin-consent requirements, breaking changes, platform limitations, and required manifest versions. Use `[!NOTE]` for supplementary detail, `[!TIP]` for optimizations, and `[!CAUTION]` for data-loss or security risk.
3. **Add "For more information" pointers** inline — wherever the article summarizes a concept covered in depth elsewhere in the repo, add `For more information, see [<article title>](<relative-path>).` Link only to pages that already exist in the repo.
4. **Add or refresh the See also section** at the bottom:
   - Include prerequisite articles, sibling articles in the same feature family, the deeper reference pages for concepts touched, and the logical next topic.
   - Use the article's real title as the link text.
   - Remove stale entries that no longer resolve or are no longer relevant.
   - Keep the section formatted exactly like neighboring articles in the folder.
5. **Add examples and tables** — parameter/property tables, supported-client matrices, error-code tables, and at least one realistic scenario walkthrough where the content warrants it.

Print `📎 Pivots, notes, and See also updated`.

---

### Phase 9: Update Navigation and What's New

1. **Insert the TOC entry** at the placement decided in Phase 1, with `name`, `href`, and `displayName` keywords.
2. **Update `whats-new.md`** (for `new-feature` only) under the correct date section, matching the existing format:

```
   * ***<Month Day, Year>***: [<Feature description>](<relative-path>) is now available.
```

3. **Add reciprocal cross-references** — where a related existing article should point at the new content, add it to that article's See also section.

Print `🧭 Navigation updated`.

---

### Phase 10: Final Validation

1. **Frontmatter** — required fields present, `ms.date` current, `zone_pivot_groups` valid when pivots are used.
2. **Structure** — one H1, no heading level skips, sections in the correct reading order.
3. **Links** — all inbound, outbound, anchor, include, and TOC links resolve.
4. **Images** — all paths resolve, all flagged items listed, and every reference passes the Phase 5 rules:
   - `type="content"` has both `source` and `alt-text`; `type="icon"` has **no** `alt-text`; `type="complex"` has a long description **and** a `:::image-end:::` closing tag.
   - Alt text is roughly 125 characters or fewer, ends in a period, doesn't repeat the caption or contain the file name, and — for screenshots — starts with `Screenshot of` / `Screenshot that shows` and never with `Image of`, `Graphic of`, `Picture of`, or `Photo of`.
   - File types are valid (`.png`, `.jpg`, or a type registered in `docfx.json`) and files live under `msteams-platform/assets/images/<area>/`, not in an `/includes` folder.
   - No screenshot contains personal, customer, or tenant-identifying data.
5. **Code** — all fences have languages, tab sets complete, SDK-verified.
6. **Style** — no first person, sentence-case headings, consistent list punctuation, active voice.
7. **Branding** — current product names throughout.
8. **Pivots** — every declared pivot has content; every pivot value is defined.

Print:

```
✅ Validation
  - Frontmatter: OK
  - Structure: OK
  - Links: <N> verified, <M> flagged
  - Images: <N> verified, <M> flagged
  - Code: <N> verified, <M> flagged
  - Style / Branding / Pivots: OK
```

---

### Phase 11: Confirm, Then Create the Pull Request

#### 11a. Print the pre-PR summary

Before creating any branch, commit, or pull request, print the complete run summary exactly in this order:

```
📥 Source: <type> — <location>
🎯 Task type: <new-feature|doc-update>
📂 Target area: <folder>
🧭 TOC placement: <parent > child path>
✅ Conventions discovered
✏️ Documentation written: <file-path>
🧱 Structure normalized: <N> headings changed
🖼️ Images: <kept> kept, <updated> flagged for update, <added> added, <removed> removed
🔗 Links: <N> inbound checked, <A> fixed, <B> anchors repaired, <C> outbound fixed, <D> flagged
💻 Code: <valid> valid, <fixed> updated, <removed> removed, <flagged> flagged
```

Then list, in full:

- **Articles being updated** — every file that will be added, modified, moved, or deleted, with a one-line reason for each.
- **Placement of the article** — for a `new-feature`, the exact file path and the TOC parent > child path it will be inserted under.
- **Open questions and flagged items** — anything still unverified, placeholder, or ambiguous.

#### 11b. Ask for confirmation

**Ask the user to confirm the list of articles being updated and the placement of the new article. Do not create a branch, commit, or pull request until the user explicitly confirms.**

- If the user asks for changes, apply them, re-run the affected phases, print the summary again, and ask again.
- If the user declines, stop and leave the working tree as is.
- If any part of the summary is uncertain, ask about it before asking for the final confirmation.

#### 11c. Create the pull request (only after confirmation)

1. **Create a feature branch** from `main`.
2. **Commit all changes** with a descriptive message:

```
  docs: <add|update> <feature-name> documentation

   - <Added|Updated> <article>.md
   - Restructured headings and lists
   - Repaired <N> inbound/anchor links
   - Validated code snippets against Teams SDK
   - Updated TOC.yml and whats-new.md
```

3. **Open the pull request** using the PR body template below.

Print:

```
🚀 Pull request created: #<number>
   Title: <title>
   Files: <N> added, <M> modified
   Review items: <count>
```

---

## Content Quality Rules

1. **Be precise** — exact API, parameter, and type names from the source or SDK docs.
2. **Show, don't just tell** — a runnable code example for every API or configuration described.
3. **Complete examples** — copy-paste ready, never pseudo-code.
4. **Document error cases** — common errors and how to handle them.
5. **Respect scope** — document current behavior only; no speculation about future releases.
6. 6. **Ground every claim** — if it isn't in the source or SDK docs, don't state it; ask the user to confirm it, or flag it.
7. **Match the repo** — when generic style guidance conflicts with the surrounding folder's conventions, follow the repo.
8. **SEO** — titles, descriptions, headings, and `displayName` use terms developers actually search.

---

## Edge Cases and Error Handling

**Rule: when something is not clear, ask the user.** Every situation below resolves by asking rather than guessing. Only proceed on your own when the user has answered, or when the user has explicitly told you to use your best judgment.

| Situation | Behavior |
| --- | --- |
| Source link is unreachable or gated | **Ask the user** for an accessible link, an export, or the pasted content. Do not proceed on partial context without the user's explicit go-ahead |
| Source file or folder is missing, empty, or unreadable | **Ask the user** for the correct path or a readable copy before continuing |
| Chat, thread, or work item cannot be reached | **Ask the user** to paste the relevant conversation or point to an accessible copy |
| Folder source contains unrelated files | List what you plan to use and what you plan to ignore, and **ask the user** to confirm the selection |
| Task type is ambiguous (new vs. update) | **Ask the user** to choose, showing the overlapping articles and your recommendation |
| Impacted articles are unclear or there are several candidates | **Ask the user** which article(s) to update, listing every candidate with a one-line reason |
| Feature area cannot be determined | **Ask the user** which folder the article belongs in, offering the closest matches |
| TOC insertion point unclear | **Ask the user** to confirm the parent node and position, offering your recommended placement |
| Existing article conflicts with the source | **Ask the user** which version is correct before overwriting, showing both versions side by side |
| Heading rename breaks external (non-repo) anchors | **Ask the user** whether to keep the old heading as a bookmark, add a redirect note, or accept the break |
| Broken inbound link points to a file that doesn't exist | Repair it only when the correct target is unambiguous; otherwise **ask the user** for the intended target |
| Screenshot/GIF appears stale | **Ask the user** whether to keep, replace, or flag it. Never remove or blank an image reference without confirmation |
| New images need to be added or an image must be removed | **Ask the user** to confirm the addition or removal and the placement before changing any asset |
| Code snippet can't be verified against SDK docs | **Ask the user** to confirm the snippet or supply a verified one; if the user defers, keep it and mark it `unverified` for SME review |
| No code samples in the source | **Ask the user** for samples or for permission to ship a `<!-- TODO: Add code sample -->` placeholder |
| Zone pivot value not defined in the repo | Never invent one — **ask the user** whether to add the pivot definition or publish non-pivoted content |
| A file must be moved, renamed, or deleted, or a redirect added | **Ask the user** for confirmation before making the change |
| Branding, terminology, or product name is uncertain | Auto-correct only known deprecated names; if the correct current name is unclear, **ask the user** |
| Anything else the skill cannot resolve with confidence | Stop, state precisely what is unclear and what you already know, offer options, and **ask the user** |

---

## Output Files Summary

| File | Purpose |
| --- | --- |
| `msteams-platform/<area>/<article>.md` | New or updated documentation article |
| `msteams-platform/TOC.yml` | Navigation entry added, moved, or corrected |
| `msteams-platform/whats-new.md` | What's new entry (new features only) |
| `msteams-platform/assets/images/<area>/*` | New or replaced images, screenshots, and GIFs |
| `msteams-platform/includes/<name>.md` | Shared include files (if created or updated) |
| `msteams-platform/**/*.md` | Inbound link and anchor repairs, reciprocal See also entries |
| `.openpublishing.redirection.json` | Redirects (only if an article moved or was renamed) |

---

## PR Body Template

```markdown
## Summary

<1-2 sentence description of what this PR adds or changes.>

**Context source:** <link | file | folder>
**Task type:** <new-feature | doc-update>

## Changes

| File | Action | Description |
|------|--------|-------------|
| `<path>` | Added/Modified | <brief description> |

## Automated audit results

| Check | Result |
|-------|--------|
| TOC placement | <parent > child path> |
| Headings/lists restructured | <N> changes |
| Images/GIFs | <kept> kept, <flagged> need updates |
| Inbound links | <N> checked, <A> fixed |
| Anchor links | <B> repaired |
| Code snippets | <valid> valid, <fixed> updated, <flagged> unverified |
| Zone pivots | <added|updated|removed|none> |
| See also | <added|refreshed> |

## Review checklist

- [ ] Content accuracy — technical claims match the source spec and SDK docs
- [ ] Code samples — snippets compile and run against the current SDK
- [ ] Links — inbound, outbound, and anchor links all resolve
- [ ] Images — screenshots and GIFs reflect current UI
- [ ] Alt text — every meaningful image has concise, descriptive alt text; icons have none; complex visuals have a long description
- [ ] Screenshot privacy — no personal, customer, or tenant-identifying data in any image
- [ ] Zone pivots — every pivot renders with correct content
- [ ] Branding — current product names used throughout
- [ ] TOC placement — navigation entry is in the correct location
- [ ] See also — links are relevant and complete

## Items flagged for review

<List every warning, placeholder, stale screenshot, unverified snippet, and ambiguity that needs human judgment.>
```

---

## Decisions confirmed with the author

<List every question asked during the run and the answer given — task type, impacted articles, target folder, TOC placement, image and deletion approvals, and the final pre-PR confirmation.>

## References

Screenshot and accessibility rules in this skill are derived from the following. The first two are **Microsoft-internal** and are the **source of truth**; where this skill and those pages disagree, those pages win.

- [Create a screenshot](https://review.learn.microsoft.com/en-us/help/contribute/contribute-how-to-create-screenshot?branch=main) — Microsoft-internal
- [Accessibility and multimedia: alt-text requirements for images](https://review.learn.microsoft.com/en-us/help/contribute/contribute-accessibility-multimedia?branch=main#alt-text-requirements-for-images) — Microsoft-internal
- [Teams platform documentation contributor reference](https://learn.microsoft.com/en-us/microsoftteams/platform/resources/teams-contributor-reference)
- [Microsoft Writing Style Guide](https://learn.microsoft.com/en-us/style-guide/welcome/)
- [Learn Markdown reference](https://learn.microsoft.com/en-us/contribute/markdown-reference)

---

*The skill is complete when the pull request is created — and the pull request is created only after the user confirms the pre-PR summary. Ask the user whenever anything is unclear at any point in the run.*
