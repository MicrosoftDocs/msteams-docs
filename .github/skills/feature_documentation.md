---
name: document-feature
description: End-to-end AI-assisted documentation for the msteams-docs repository. Ingests context from a link, file, or folder, classifies the documentation work as a Doc Feature or Doc Improvement, then writes/updates the article, TOC placement, headings, images, links, code snippets, zone pivots, developer announcements, RSS feed, and See also sections. Asks the user whenever anything is unclear and always asks for confirmation before opening a pull request.
version: 2.2.0
---

# Document Feature — Teams Platform Documentation Skill

GitHub Copilot skill that performs **end-to-end, AI-enabled documentation automation** for the [MicrosoftDocs/msteams-docs](https://github.com/MicrosoftDocs/msteams-docs) repository and opens a pull request for review.

## Quick Summary

Run `/document-feature [source] [scope-hint]`. The skill first confirms whether the documentation work is a **Doc Feature** or **Doc Improvement**, then extracts context from the source, finds or proposes the right documentation home, restructures headings and lists, audits images/GIFs, repairs inbound and anchor links across the whole repo, validates code snippets against the Teams SDK docs, reworks zone pivots, refreshes the **See also** section, updates developer announcements and `feed.atom` when needed, and adds notes/examples/tables. It asks you whenever something is unclear, then prints a full pre-PR summary and creates the PR only after you confirm.

## IMPORTANT: Ask the user whenever anything is unclear

**Always ask the user for clarification or confirmation when in doubt.** Never guess, never assume, and never invent context to keep the run moving. Execute the phases in order, but stop and ask whenever a decision is ambiguous, information is missing, or an input cannot be reached.

**Ask-the-user contract:**

- **Ask, don't assume.** If the context, the intent, the impacted articles, the target folder, the TOC placement, the audience, or the scope is not obvious, ask the user before proceeding.
- **Ask when inputs are unavailable.** If a source link is unreachable, gated, or requires sign-in; if a file or folder path does not exist or is empty; if a chat, thread, work item, or conversation cannot be reached or read — stop and ask the user for an alternate source, an export, or pasted content. Do not fabricate the missing context.
- **Ask when more than one answer is reasonable.** If the work could be a Doc Feature or Doc Improvement, if several existing articles could be the one to update, or if multiple TOC parents are plausible, present the options and ask the user to choose.
- **Ask which Doc Improvement task type applies.** For every Doc Improvement run, ask whether the request is an FTE request, a GitHub `doc-bug` / `doc-enhancement` issue, monthly feedback analysis, or a broken link report before selecting files to edit.
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

**Docs quality contract:**

- Define the feature by first explaining what it is in familiar developer terms, not only what it does or what it's for.
- Explain intent: why the feature exists, what recognizable user or developer need it solves, and why that need matters.
- Explain the user experience developers are creating for their users, including how users discover, invoke, or interact with the capability.
- Include implementation guidance with short, realistic Teams SDK snippets in TypeScript, .NET, and Python when code is required. If samples aren't available for all applicable languages, ask PM or engineering for them or flag the gap.
- Add opinionated design guidance and best practices. Use **must** only for technical, policy, security, accessibility, or store approval requirements; use **should** for recommended behaviors and explain how strong the recommendation is.
- Position the feature against adjacent or similar features so developers know when to use each capability and how they work together.
- Capture preview details when applicable: who can use it, how to enable it, end-user availability, rollout or publishing limits, and what changes at GA.
- Anticipate developer questions: limitations, misconceptions, prerequisites, assumptions, edge cases, failure modes, and common implementation mistakes.
- Keep documentation articles mostly timeless. Don't describe released features as "new" in evergreen articles unless discussing preview, deprecation, migration, or legacy compatibility. Put point-in-time messaging, launch context, current ecosystem positioning, and calls to action in `developer-announcements.md` and `feed.atom`.

---

## Invocation

```
/document-feature [source] [scope-hint]
```

- **`source`** *(optional)* — the context source. If omitted, the skill asks whether this is a Doc Feature or Doc Improvement task and then asks for the source or update context. Source can be one of:
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

### Phase 0: Intake, Source, and Placement Decision

1. **Ask for the user's starting intent** if it isn't already clear: is this a **Doc Feature** task or a **Doc Improvement** task? Treat the answer as the starting point, then verify it against the repository.
   - `doc-feature` — the user expects documentation for a feature or capability. It might become a new article, or it might be incorporated into an existing article after repository discovery.
   - `doc-improvement` — the user expects updates to existing documentation. This includes adding, updating, reorganizing, clarifying, or removing content based on PM or engineering input, even when that input describes a newly released product feature.
   - For `doc-improvement`, **ask the user which task type this request is** before choosing files to edit. Present these options and wait for the answer:
     1. **FTE request**
     2. **GitHub doc issue (`doc-bug` or `doc-enhancement`)**
     3. **Monthly feedback analysis (Verbatim, App Validation, or Dev comm)**
     4. **Broken link report** from the scheduled link check

     If the user selects monthly feedback analysis, ask which feedback category applies. Then follow the matching rules:
     - **FTE request** — an FTE asks to replace, update, add, or remove specific wording, guidance, APIs, screenshots, or references across one article or the doc set. This also covers partner-reported issues that an FTE forwards. For partner-reported cases, capture the partner scenario, affected page, expected correction, and any required technical validation. FTE requests also include content removal and redirection work; see [Content removal and redirection](#content-removal-and-redirection-fte-request).
     - **GitHub doc issue** — a `MicrosoftDocs/msteams-docs` issue with a `doc-bug` or `doc-enhancement` label after triage. Read the issue, comments, labels, and linked context when accessible. If the issue URL is inaccessible, ask the user to paste the issue body and relevant comments.
     - **Monthly feedback analysis** — feedback rows collected from Learn feedback reports and tracked in a workbook. Feedback is categorized as **Verbatim**, **App Validation**, or **Dev comm**.
       - **Verbatim** — "Was this page helpful" thumbs up/down ratings and comments submitted on Microsoft Learn pages. Use the page URL, rating, comment, date, and any writer analysis to identify the article and the requested improvement.
       - **App Validation** — partner feedback collected after the Teams Store app validation and publishing process. Two questions in that feedback form relate to documentation:
         - `How would you rate documentation for ease of building the app?` — the documentation rating.
         - `Share your feedback on documentation (Optional)` — a free-text comment that usually doesn't name the articles the partner used.
         - If the documentation rating is **4 or 5**, don't make documentation changes. Record the entry as reviewed with no action needed.
         - If the documentation rating is **less than 4**, documentation action is required. Partner comments usually don't identify which articles were referenced, so never infer the target articles from the comment alone.
         - Ask the user for the list of referred documents that the validation team collects from the partner. Only edit documentation after that list is available.
         - If the referred-document list never arrives, don't make speculative edits. Recommend closing the feedback entry as no action, and record the reason.
       - If the Power BI report or SharePoint workbook is gated, ask the user for exported rows, a local file, or pasted content.
     - **Broken link report** — output from the `Link check` workflow, which runs weekly and files a `doc-bug` issue listing every external link that no longer resolves. For each reported link, find the current destination and update it. When no replacement exists, ask the user whether to remove the link or the surrounding content. If a link is a false positive, such as a sign-in wall or a bot-blocked host, add an exclusion to `lychee.toml` instead of editing the article.
   - For repository issues, record the issue number and whether the PR should close it. When the fix fully resolves the issue, include `Fixes #<issue-number>` or `Closes #<issue-number>` in the PR body so GitHub links the PR in the issue's Development section and closes the issue when the PR merges. If the PR only partially addresses the issue, use `Related to #<issue-number>` and flag the remaining work.
2. **Resolve the source type** — link, file, folder, pasted content, or user-provided article path. **If no source or update context was provided, ask for it before continuing.**
   - **Link:** fetch the page. Follow one level of directly relevant in-page links (spec appendices, SDK reference pages). Capture headings, API names, parameters, code snippets, screenshots, and version/release information. **If the link is unreachable, gated, requires sign-in, or returns partial content, ask the user** to provide an alternate link, an export, or the pasted content — do not proceed on guesswork.
   - **File:** read the whole file. For code files, extract public APIs, types, and usage patterns. For `.md`, extract structure and claims. **If the file is missing, unreadable, or in an unsupported format, ask the user** for a correct path or a readable version.
   - **Folder:** enumerate recursively, skip binaries and build output, and read every relevant spec, README, sample, and manifest. **If the folder is empty, missing, or contains no recognizable context, ask the user** which files to use.
   - **Article path:** read the article completely and treat it as the user's proposed target. Still search nearby and related docs to confirm it is the best home.
   - **GitHub issue URL:** read the public issue details when accessible, including title, body, labels, comments, linked pages, and reproduction details. Confirm the issue is labeled `doc-bug` or `doc-enhancement`, or ask the user whether to proceed if it isn't triaged yet.
   - **Feedback workbook rows:** use exported Excel, CSV, copied table rows, or pasted content as the source. Capture feedback type (Verbatim, App Validation, or Dev comm), page URL, rating, user comment, writer notes, proposed action, and priority. Don't rely on inaccessible Power BI or SharePoint links without user-provided content.
   - **Teams chat or channel post:** Teams message links require tenant sign-in and can't be read directly. Ask the user to paste the post text, relevant replies, and any referenced doc links or attachments.
   - **Chat, thread, work item, or conversation source:** if it cannot be reached or read, **ask the user** to paste the relevant content or point to an accessible copy.
3. **Build a context record** containing: feature name, definition, capability summary, intent, target audience, user experience, APIs/parameters/returns, code snippets by language, prerequisites, limitations, supported platforms/clients (Teams, Outlook, Microsoft 365 Copilot), preview or GA status, adjacent or similar features, best practices, common misconceptions, edge cases, and any images provided. **If any of these is missing or unclear and it materially affects the article, ask the user rather than inferring it.**
   - Ask PM or engineering to fill gaps in definition, intent, user experience, positioning, preview availability, limitations, implementation samples, and design guidance. These gaps are part of the documentation work, not optional polish.
   - Ask why the feature exists until the answer explains the user or developer need, not just the mechanism the feature enables.
4. **Find and propose the documentation home before writing.** Search the repo for the feature name, API names, article title candidates, scenario names, and close synonyms.
   - For a `doc-improvement`, identify the most suitable existing article or section, tell the user where the update should be made, and explain why. If the user provided a different target article, compare both locations, explain the tradeoffs, brainstorm with the user, and ask the user to confirm the final target before editing.
   - For a `doc-feature`, search for similar or adjacent information that could absorb the new content. Present your recommendation: add to an existing article, create a new standalone article, or create a new article plus update existing pages. Include reasons, likely target path, related articles, and TOC impact. If the user needs manager confirmation, stop and wait for the decision before continuing.
5. **Finalize the documentation work type.** Keep this separate from the product change type. A source can describe a new product feature and still result in a Doc Improvement if the correct documentation home already exists.
   - `doc-feature` — create a new standalone article or major new documentation page because the capability isn't already documented in the repo, or existing pages don't have a clear home for it.
   - `doc-improvement` — update existing documentation. Use this when an existing article already covers the feature area and the work is to add, update, reorganize, clarify, or remove content, including changes driven by new PM or engineering input for a feature that already has documentation.
   - If repository discovery changes the initial user intent, explain the reason and ask the user to confirm the final documentation work type before continuing.
   - **If the classification is not clear-cut — or if several articles could be the target — list the candidates and ask the user to confirm the documentation work type and the impacted articles before continuing.**

   | Situation | Documentation work type | PR title prefix |
   | --- | --- | --- |
   | No existing article or section covers the capability and a new standalone page is needed | `doc-feature` | `[Doc Feature]` |
   | Existing article covers the capability and needs new content for a newly released or updated feature | `doc-improvement` | `[Doc Improvement]` |
   | Existing article needs corrections, restructuring, refreshed guidance, removals, SDK updates, or quality improvements | `doc-improvement` | `[Doc Improvement]` |
   | Existing content is too broad or fragmented and the work requires creating a new article plus updating existing pages | Ask the user; recommend `doc-feature` if the new article is the primary deliverable | `[Doc Feature]` or `[Doc Improvement]` based on confirmation |

6. Print `📥 Source: <type> — <location>`, `🎯 Documentation work type: <doc-feature|doc-improvement>`, and `📍 Proposed documentation home: <file-or-new-path>`.
7. **Confirm the understanding and placement.** Summarize the extracted context, recommended documentation home, alternative target if the user proposed one, and impacted article(s). Ask the user to confirm before moving to Phase 1.

---

### Phase 1: Locate the Article and Its TOC Placement

1. **Map the documentation work to a doc area** under `msteams-platform/`:
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
2. **Read `msteams-platform/TOC.yml`** and determine the exact insertion point or existing placement:
   - Find the parent node whose siblings share the same conceptual level and audience.
   - Prefer placing the article next to the closest sibling topic (same feature family, same app type).
   - Respect the existing ordering convention of that node (build → integrate → test → publish, or basic → advanced).
   - For `doc-improvement`, verify the existing TOC entry is still in the right place. Move it only if the article's scope changed and the user confirms the move.
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

#### For a Doc Feature (`doc-feature`)

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
   - **Introduction** — 2-3 sentences: what the feature is in familiar developer terms, who it's for, why it matters, and the recognizable scenario it supports.
   - **Prerequisites** — bulleted list, when applicable.
   - **User experience** — what users see, do, and expect when developers implement the feature.
   - **Developer experience** — the end-to-end implementation flow. Order the list to match the subsections under `Implement <feature name>`.
   - **Implement `<feature name>`** — compile all implementation instructions under this single section. Every implementation topic must be a subsection of this heading.
   - **Handle errors** — include an error-code table when the source or SDK docs provide errors. Use columns: `Status code`, `Error code`, `Description`, and `Developer action`. Include known HTTP 400, 401, 403, and service-specific errors when applicable.
   - **Code sample** — add a placeholder section for full sample links. Use a table with `Sample name`, `Description`, and `TypeScript` columns until more language links are available.
   - **Design guidelines and best practices** — move agent or app design guidance and best practices into this section. Explain when, why, and how developers should use the feature to create the intended user experience.
   - **Limitations and known issues** — prerequisites, assumptions, edge cases, common misconceptions, preview limits, and failure modes.
   - **Next step** — the single logical follow-on article.
   - **See also** — related references (see Phase 8).
3. **Explain implementation code snippets** directly under each code block:
   - Explain only the main properties, parameters, or values that developers must set. Don't explain every line or every element of the snippet.
   - Use bullet lists instead of parameter tables.
   - Each bullet must include a brief 6-10 word description, the value the developer assigns, and why it matters to the implementation flow. Pattern: `` `propertyName` — <6-10 word description>. Set this to `<value>` so <relevance to the process>.``
4. **Review for redundancy before finalizing**. Check for repeated, overlapping, or conflicting information across sections. Report the redundancy findings to the user and don't apply broad restructuring or PR updates for redundancy cleanup until the user approves.

#### For a Doc Improvement (`doc-improvement`)

1. **Read the existing article completely** before editing.
2. **Make surgical edits** — revise only sections affected by the new context; do not rewrite unaffected prose.
3. **Reconcile conflicts** — where the source contradicts the article, update to the source and flag the change in the PR body.
4. **Remove or mark deprecated content** — move retired behavior into a clearly labeled note or delete it if the source confirms removal; never silently drop supported behavior. For requested removals, follow [Content removal and redirection](#content-removal-and-redirection-fte-request).
5. **Fill quality gaps introduced by the update** — definition, intent, user experience, implementation examples, best practices, positioning, preview details, limitations, and misconceptions.
6. **Update `ms.date`** to today's date.

#### Content removal and redirection (FTE request)

When an engineer asks to remove a document or part of a document from the doc set, confirm the removal scope with the user, then follow the matching path.

**Removing an entire document**

1. Confirm with the user that the whole article should be removed.
2. Remove the article's entry from `msteams-platform/TOC.yml`.
3. Search the whole repo and scrub every link that points to the removed article, including relative links, anchor links, `TOC.yml` entries, includes, and See also entries. Repoint each link to the correct alternative target, or remove the reference when no replacement exists.
4. **Ask the user where the removed URL should redirect**, then add the entry to `.openpublishing.redirection.json` at the repository root:

```json
{
  "source_path": "msteams-platform/<area>/<removed-article>.md",
  "redirect_url": "/microsoftteams/platform/<target-article-path>",
  "redirect_document_id": false
}
```

5. Delete the article file only after the TOC entry, inbound links, and redirect entry are handled.
6. Check whether any images or includes used only by the removed article are now unreferenced, and ask the user before deleting them.

**Removing part of a document**

1. Confirm with the user exactly which section, procedure, table, or code block should be removed.
2. Remove that content from the article and keep the surrounding prose coherent.
3. Record the removed headings so their anchors are tracked in Phase 4 and repaired in Phase 6.
4. Search the repo for inbound links that point to the removed section anchors and scrub them. Repoint each link to the nearest surviving section when one exists, or remove the anchor reference when it doesn't.
5. Don't add a redirect entry for a removed section. Redirects apply to removed files, not to removed anchors.
6. Ask the user before removing any image or include that the deleted section was the only consumer of.

Print `✏️ Documentation written: <file-path>`.

---

### Phase 4: Restructure Headings, Subheadings, and Lists

1. **Enforce a single `#` H1**; no heading level skips (`##` → `####` is invalid).
2. **Rewrite headings** to be sentence case, task-oriented, and scannable ("Send a streaming response", not "Streaming Responses Overview").
3. **Reorder Doc Feature sections** into the recommended reading order: introduction → user experience → developer experience → implement `<feature name>` → handle errors → code sample → design guidelines and best practices → limitations → next step → see also. For Doc Improvement work, preserve the existing article structure unless the update requires restructuring.
4. **Promote or demote sections** so that related content nests correctly under its parent concept.
5. **Normalize lists:**
   - Convert prose paragraphs that enumerate items into bulleted lists.
   - Convert bulleted sequences that must be followed in order into numbered lists.
   - Keep list items parallel in grammar and consistent in end punctuation.
   - Convert two-dimensional bulleted content (item + attributes) into a table.
6. **Validate Doc Feature structure**:
   - All implementation content is under `Implement <feature name>`.
   - Developer experience steps appear in the same order as the implementation subsections.
   - Agent or app design guidance appears under `Design guidelines and best practices`.
   - Code snippet explanations use bullet lists, not parameter tables.
   - `Handle errors` and `Code sample` sections exist, even if they contain placeholders that are flagged for review.
7. **Record every heading that was renamed, added, removed, or re-leveled** — this list drives the anchor-link repair in Phase 6.

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
7. **For removals**, confirm the removed article has no remaining inbound links or `TOC.yml` entries, and that a redirect entry exists for the removed file. For removed sections, confirm no inbound link still targets the deleted anchors.

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
4. **Explain snippets in implementation sections** — under each code block, add bullet-list explanations for only the main developer-controlled properties, parameters, and values. Include a brief description, the value to assign, and the relevance to the feature flow.
5. **Ensure completeness** — snippets are copy-paste ready with the context needed to run, not pseudo-code fragments.
6. **Ensure every fence has a language identifier** and that tabbed multi-language sets are complete and consistently ordered.

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
5. **Add positioning links and decision support** — link to related features where developers would benefit from discovering this capability, and add comparison or decision tables when a similar feature might be confused with it.
6. **Add examples and tables** — parameter/property tables, supported-client matrices, error-code tables, and at least one realistic scenario walkthrough where the content warrants it.

Print `📎 Pivots, notes, and See also updated`.

---

### Phase 9: Update Navigation, Developer Announcements, and RSS Feed

1. **Insert the TOC entry** at the placement decided in Phase 1, with `name`, `href`, and `displayName` keywords.
2. **Update `msteams-platform/developer-announcements.md`** when the work includes an externally relevant feature or platform update that should be announced. This can apply to either `doc-feature` or `doc-improvement` work. If it's unclear whether an announcement is needed, ask the user before editing the file. Add the entry near the top of the file with the newest announcement order and match the existing format:

```
## <Released|Preview|Retiring>: <Feature or update title>

*<Month Day, Year>*

<One or more concise paragraphs that describe the feature or update.> For more information, see [<article title>](<relative-path>).

---
```

3. **Update `msteams-platform/feed.atom`** whenever `msteams-platform/developer-announcements.md` gets a new top entry. Treat `developer-announcements.md` as the source of truth and update only the Atom feed fields required for the new announcement:
   - Remove the oldest `<entry>` from the bottom of `feed.atom`.
   - Update the feed-level `<updated>` value to the date from the new announcement post, formatted as a date-time with no timezone information, for example `YYYY-MM-DDT00:00:00`.
   - Add a new `<entry>` at the top of the feed entries that corresponds to the top item in `developer-announcements.md`.
   - Set the entry `<updated>` value to the date specified with the post in `developer-announcements.md`, using the same date-time format as the feed-level `<updated>` value.
   - Set the entry `<id>` and `<link href="..."/>` values to the published anchor URL for the post header. Derive the anchor from the exact `##` heading text.
   - Set `<title>`, `<summary>`, and `<content>` to `type="html"` and wrap each value in a CDATA block.
   - Set `<title>` to the post title exactly as written in the announcement heading.
   - Set `<summary>` to the first paragraph of the post. Don't wrap the summary in `<p>` tags.
   - Set `<content>` to the full post body converted from Markdown to simple HTML, including enclosing `<p>` tags for paragraphs. Preserve the post text; don't change, shorten, or summarize it.
   - Don't make any other changes to `feed.atom` beyond deleting the oldest entry, updating the feed-level `<updated>` value, and adding the new top entry.
   - Validate that `feed.atom` remains well-formed XML and a valid Atom feed after the edit.
4. **Add reciprocal cross-references** — where a related existing article should point at the new content, add it to that article's See also section.

Print `🧭 Navigation, announcements, and feed updated`.

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
6. **Feature article structure** — for Doc Feature work, verify the recommended section order, `Implement <feature name>` grouping, aligned Developer experience order, `Handle errors`, `Code sample`, and `Design guidelines and best practices` sections.
7. **Snippet explanations** — implementation snippets have concise bullet-list explanations for main developer-controlled properties, parameters, and values.
8. **Redundancy review** — repeated, overlapping, or conflicting content is reported to the user. Broad cleanup isn't applied unless approved.
9. **Docs quality** — definition, intent, user experience, implementation, best practices, positioning, preview details, limitations, misconceptions, and edge cases are present or explicitly flagged for PM or engineering review.
10. **Timeless language** — evergreen article content doesn't describe released capabilities as "new" or use launch-only messaging; point-in-time messaging is confined to `developer-announcements.md` and `feed.atom` except for preview, deprecation, migration, or legacy-compatibility context.
11. **Style** — no first person, sentence-case headings, consistent list punctuation, active voice.
12. **Branding** — current product names throughout.
13. **Pivots** — every declared pivot has content; every pivot value is defined.
14. **RSS feed** — if `developer-announcements.md` was updated, verify that `feed.atom` has exactly one new top entry for the announcement, the oldest entry was removed, the feed-level `<updated>` value matches the new post date with no timezone information, and the file is valid XML and a valid Atom feed.

Print:

```
✅ Validation
  - Frontmatter: OK
  - Structure: OK
  - Links: <N> verified, <M> flagged
  - Images: <N> verified, <M> flagged
  - Code: <N> verified, <M> flagged
   - Feature article structure: <OK|not applicable|flagged>
   - Snippet explanations: <OK|not applicable|flagged>
   - Redundancy review: <OK|approved changes pending|flagged>
   - Docs quality: <OK|flagged>
   - Timeless language: <OK|flagged>
   - RSS feed: <OK|not changed|flagged>
  - Style / Branding / Pivots: OK
```

---

### Phase 11: Confirm, Then Create the Pull Request

#### 11a. Print the pre-PR summary

Before creating any branch, commit, or pull request, print the complete run summary exactly in this order:

```
📥 Source: <type> — <location>
🎯 Documentation work type: <doc-feature|doc-improvement>
📂 Target area: <folder>
🧭 TOC placement: <parent > child path>
✅ Conventions discovered
✏️ Documentation written: <file-path>
🧱 Structure normalized: <N> headings changed
🖼️ Images: <kept> kept, <updated> flagged for update, <added> added, <removed> removed
🔗 Links: <N> inbound checked, <A> fixed, <B> anchors repaired, <C> outbound fixed, <D> flagged
💻 Code: <valid> valid, <fixed> updated, <removed> removed, <flagged> flagged
📰 Announcements/feed: <updated|not changed>, <flagged> flagged
```

Then list, in full:

- **Articles being updated** — every file that will be added, modified, moved, or deleted, with a one-line reason for each.
- **Placement of the article** — for a `doc-feature`, the exact file path and the TOC parent > child path it will be inserted under.
- **Doc Improvement source** — FTE request, GitHub `doc-bug` / `doc-enhancement`, or monthly feedback analysis (Verbatim, App Validation, or Dev comm), when applicable.
- **Linked issue** — the GitHub issue number and whether the PR will use `Fixes`, `Closes`, or `Related to`.
- **Open questions and flagged items** — anything still unverified, placeholder, or ambiguous.

#### 11b. Ask for confirmation

**Ask the user to confirm the list of articles being updated and the placement of the new article. Do not create a branch, commit, or pull request until the user explicitly confirms.**

- If the user asks for changes, apply them, re-run the affected phases, print the summary again, and ask again.
- If the user declines, stop and leave the working tree as is.
- If any part of the summary is uncertain, ask about it before asking for the final confirmation.

#### 11c. Create the pull request (only after confirmation)

1. **Create a feature branch** from `main`.
2. **Use the repository PR title convention** based on the documentation work type:
   - For `doc-feature`, use `[Doc Feature] <feature name or short description>`.
   - For `doc-improvement`, use `[Doc Improvement] <short update description>`.
3. **Commit all changes** with a descriptive message:

```
  docs: <add|update> <feature-name> documentation

   - <Added|Updated> <article>.md
   - Restructured headings and lists
   - Repaired <N> inbound/anchor links
   - Validated code snippets against Teams SDK
   - Updated TOC.yml, developer-announcements.md, and feed.atom
```

4. **Open the pull request** using the PR body template below. If the PR resolves a GitHub issue, include a closing keyword such as `Fixes #<issue-number>` or `Closes #<issue-number>` in the PR body so the issue appears in the GitHub Development section and closes when the PR is merged. If the PR doesn't fully resolve the issue, use `Related to #<issue-number>` instead and explain the remaining work.

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
6. **Ground every claim** — if it isn't in the source or SDK docs, don't state it; ask the user to confirm it, or flag it.
7. **Define and explain intent** — start from what the feature is, then explain the user or developer need it fulfills.
8. **Document the user experience** — help developers understand what users will see, do, and expect.
9. **Provide opinionated guidance** — include best practices, design decisions, and standard conventions. Use **must** only for requirements; use **should** for recommendations.
10. **Position the feature** — explain how it compares to related capabilities and add cross-links where developers would expect to discover it.
11. **Keep evergreen content timeless** — avoid "new" launch language in articles unless documenting preview, deprecation, migration, or legacy compatibility.
12. **Structure feature articles consistently** — use introduction → user experience → developer experience → implementation → handle errors → code sample → design guidance, adapted to repo conventions.
13. **Explain code for implementation decisions** — after each implementation snippet, describe only the main developer-controlled values in concise bullets.
14. **Review redundancy separately** — report repeated or overlapping content and get approval before broad cleanup.
15. **Match the repo** — when generic style guidance conflicts with the surrounding folder's conventions, follow the repo.
16. **SEO** — titles, descriptions, headings, and `displayName` use terms developers actually search.

---

## Edge Cases and Error Handling

**Rule: when something is not clear, ask the user.** Every situation below resolves by asking rather than guessing. Only proceed on your own when the user has answered, or when the user has explicitly told you to use your best judgment.

| Situation | Behavior |
| --- | --- |
| Source link is unreachable or gated | **Ask the user** for an accessible link, an export, or the pasted content. Do not proceed on partial context without the user's explicit go-ahead |
| Source file or folder is missing, empty, or unreadable | **Ask the user** for the correct path or a readable copy before continuing |
| GitHub issue link is inaccessible or lacks the needed context | **Ask the user** to paste the issue body, comments, labels, linked page, expected fix, and whether the PR should close the issue |
| GitHub issue isn't labeled `doc-bug` or `doc-enhancement` | **Ask the user** whether to proceed before editing, and record that the issue wasn't triaged with the expected doc label |
| SharePoint workbook or Power BI feedback report is gated | **Ask the user** for exported Excel or CSV rows, a local workbook file, copied rows, or pasted feedback content |
| Verbatim feedback doesn't clearly identify the needed doc change | **Ask the user** for writer analysis, affected page, expected correction, and priority before editing |
| App Validation feedback rating is 4 or 5 | No documentation change is needed. Record the entry as reviewed with no action |
| App Validation feedback rating is less than 4 but no referred documents are listed | **Ask the user** for the referred-document list from the validation team's partner follow-up. Never infer the target articles from the partner comment |
| App Validation referred-document list never arrives | Don't make speculative edits. Recommend closing the entry as no action and record the reason |
| Teams chat or channel post link can't be opened | **Ask the user** to paste the post text, replies, and any referenced doc links |
| Chat, thread, or work item cannot be reached | **Ask the user** to paste the relevant conversation or point to an accessible copy |
| Folder source contains unrelated files | List what you plan to use and what you plan to ignore, and **ask the user** to confirm the selection |
| Documentation work type is ambiguous (Doc Feature vs. Doc Improvement) | **Ask the user** to choose, showing the overlapping articles and your recommendation |
| Doc Improvement task type wasn't stated | **Ask the user** whether it's an FTE request, GitHub `doc-bug` / `doc-enhancement` issue, monthly feedback analysis, or a broken link report before editing any file |
| A reported broken link has no obvious replacement target | **Ask the user** whether to repoint, remove the link, or remove the surrounding content |
| A reported broken link is a sign-in wall, tenant-scoped portal, or bot-blocked host | Add an exclusion to `lychee.toml` instead of editing the article, and note it in the PR body |
| Impacted articles are unclear or there are several candidates | **Ask the user** which article(s) to update, listing every candidate with a one-line reason |
| Feature area cannot be determined | **Ask the user** which folder the article belongs in, offering the closest matches |
| TOC insertion point unclear | **Ask the user** to confirm the parent node and position, offering your recommended placement |
| Definition, intent, user experience, positioning, or best practices are missing | **Ask PM or engineering** for the missing guidance; if the user defers, flag the gap for review |
| Feature requires code but one or more Teams SDK language samples are missing | **Ask PM or engineering** for C#, TypeScript, and Python samples, or flag the missing language coverage |
| Preview details are incomplete | **Ask** who can use the feature, how to enable it, end-user availability, release limitations, and GA expectations |
| Existing article conflicts with the source | **Ask the user** which version is correct before overwriting, showing both versions side by side |
| Heading rename breaks external (non-repo) anchors | **Ask the user** whether to keep the old heading as a bookmark, add a redirect note, or accept the break |
| Broken inbound link points to a file that doesn't exist | Repair it only when the correct target is unambiguous; otherwise **ask the user** for the intended target |
| Screenshot/GIF appears stale | **Ask the user** whether to keep, replace, or flag it. Never remove or blank an image reference without confirmation |
| New images need to be added or an image must be removed | **Ask the user** to confirm the addition or removal and the placement before changing any asset |
| Code snippet can't be verified against SDK docs | **Ask the user** to confirm the snippet or supply a verified one; if the user defers, keep it and mark it `unverified` for SME review |
| No code samples in the source | **Ask the user** for samples or for permission to ship a `<!-- TODO: Add code sample -->` placeholder |
| Zone pivot value not defined in the repo | Never invent one — **ask the user** whether to add the pivot definition or publish non-pivoted content |
| A file must be moved, renamed, or deleted, or a redirect added | **Ask the user** for confirmation before making the change |
| An entire article must be removed | **Ask the user** for the redirect target before deleting, then remove the TOC entry, scrub inbound links, and add the `.openpublishing.redirection.json` entry |
| Part of an article must be removed | **Ask the user** to confirm the exact section, then scrub inbound anchor links across the repo. Don't add a redirect for a removed section |
| Branding, terminology, or product name is uncertain | Auto-correct only known deprecated names; if the correct current name is unclear, **ask the user** |
| Anything else the skill cannot resolve with confidence | Stop, state precisely what is unclear and what you already know, offer options, and **ask the user** |

---

## Output Files Summary

| File | Purpose |
| --- | --- |
| `msteams-platform/<area>/<article>.md` | New or updated documentation article |
| `msteams-platform/TOC.yml` | Navigation entry added, moved, or corrected |
| `msteams-platform/developer-announcements.md` | Developer announcement entry for externally relevant feature or platform updates |
| `msteams-platform/feed.atom` | Atom feed entry for new developer announcements |
| `msteams-platform/assets/images/<area>/*` | New or replaced images, screenshots, and GIFs |
| `msteams-platform/includes/<name>.md` | Shared include files (if created or updated) |
| `msteams-platform/**/*.md` | Inbound link and anchor repairs, reciprocal See also entries |
| `.openpublishing.redirection.json` | Redirects (only if an article moved, was renamed, or was removed) |

---

## PR Body Template

```markdown
## Summary

<1-2 sentence description of what this PR adds or changes.>

**Context source:** <link | file | folder>
**Documentation work type:** <doc-feature | doc-improvement>
**Linked issue:** <Fixes #issue | Closes #issue | Related to #issue | none>

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
| Feature article structure | <OK|not applicable|flagged> |
| Snippet explanations | <OK|not applicable|flagged> |
| Redundancy review | <OK|approved changes pending|flagged> |
| Docs quality | <OK|flagged: definition/intent/UX/guidance/positioning/preview/limitations> |
| Removals / redirects | <none|article removed with redirect|section removed, anchors scrubbed> |
| Doc Improvement source | <FTE request|GitHub issue|Verbatim|App Validation|Dev comm|broken link report|not applicable> |
| Linked issue | <Fixes #issue|Closes #issue|Related to #issue|none> |
| Developer announcements / RSS feed | <updated|not changed>, <flagged> flagged |
| Zone pivots | <added|updated|removed|none> |
| See also | <added|refreshed> |

## Review checklist

- [ ] Content accuracy — technical claims match the source spec and SDK docs
- [ ] Docs quality — definition, intent, user experience, implementation, guidance, positioning, preview details, and limitations are complete or flagged
- [ ] Feature article structure — implementation content is grouped under `Implement <feature name>`, with Developer experience ordered to match
- [ ] Code explanation bullets — implementation snippets explain only the main developer-controlled properties, parameters, and values
- [ ] Redundancy review — repeated, overlapping, or conflicting content was reported, and broad cleanup was approved before applying
- [ ] Linked issue — PR body uses the correct `Fixes`, `Closes`, or `Related to` issue reference when the work came from a GitHub issue
- [ ] Code samples — snippets compile and run against the current SDK
- [ ] Links — inbound, outbound, and anchor links all resolve
- [ ] Images — screenshots and GIFs reflect current UI
- [ ] RSS feed — feed.atom entry matches the top developer announcement and remains valid Atom XML
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

<List every question asked during the run and the answer given — documentation work type, impacted articles, target folder, TOC placement, image and deletion approvals, and the final pre-PR confirmation.>

## References

Screenshot and accessibility rules in this skill are derived from the following. The first two are **Microsoft-internal** and are the **source of truth**; where this skill and those pages disagree, those pages win.

- [Create a screenshot](https://review.learn.microsoft.com/en-us/help/contribute/contribute-how-to-create-screenshot?branch=main) — Microsoft-internal
- [Accessibility and multimedia: alt-text requirements for images](https://review.learn.microsoft.com/en-us/help/contribute/contribute-accessibility-multimedia?branch=main#alt-text-requirements-for-images) — Microsoft-internal
- [Teams platform documentation contributor reference](https://learn.microsoft.com/en-us/microsoftteams/platform/resources/teams-contributor-reference)
- [Microsoft Writing Style Guide](https://learn.microsoft.com/en-us/style-guide/welcome/)
- [Learn Markdown reference](https://learn.microsoft.com/en-us/contribute/markdown-reference)

---

*The skill is complete when the pull request is created — and the pull request is created only after the user confirms the pre-PR summary. Ask the user whenever anything is unclear at any point in the run.*
