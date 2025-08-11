---
title: Source to Target Mappings
description: [1–2 sentence summary of what this concept is and why it matters]  
ms.localizationpriority: medium  
ms.topic: concept  
ms.date: 07/02/2025  
---

# Source to Target Mappings

Below is a first-pass “source → target” mapping matrix. It shows how every CURRENT_OUTLINES file (left column) will be re-used, merged, or deprecated when we build the new content set defined in the Canonical Topic Map (right column).  
For readability, I’ve grouped legacy files by functional area. A single legacy file can feed several new articles; likewise, several legacy files can collapse into one new article.  I’ve added NOTES to flag gaps, overlaps, or material that is obsolete.

Legend for Target IDs  
• IDs beginning with AG-, PLAN-, BUILD-, etc. come from the Topic Map you approved.  
• “(classic)” means the content is kept under the “Build a Traditional Teams App” chapter.  
• “DEPR” = proposed for deprecation or archival.

----------------------------------------------------------------------------------------------------------------------------------

A. Core “Overview & Get Started” material
----------------------------------------------------------------------------------------------------------------------------------

| Legacy source file(s) | New target ID(s) | Notes |
|-----------------------|------------------|-------|
| overview.md, overview-explore.md | TP-OV-01, TP-OV-02 | Both files combine into Overview + Why Build. |
| whats-new.md | TP-OV-03 | Change-log page; keep trimmed to <3 months of updates. |
| glossary.md | TP-OV-04 | One-to-one. |
| get-started\get-started-overview.md | AG-START-01, AG-START-04 | “Build your first Teams app” material repurposed as agent quick-start. |

----------------------------------------------------------------------------------------------------------------------------------

B. Plan & Design for agents
----------------------------------------------------------------------------------------------------------------------------------

| Legacy source | New target | Notes |
|---------------|------------|-------|
| concepts\design\designing-apps-in-meetings.md (sections on design principles, UI Kit, best practices) | PLAN-03 | General design guidance; agent-specific examples will be added. |
| concepts\design\overview-analytics.md, strategize-measure.md | PLAN-03 | Merge into “Design best practices” under analytics & measurement sub-sections. |
| concepts\design\planning-checklist.md, plan-use-cases.md | PLAN-01 | Forms basis of “Choose your agent use-case”. |
| concepts\design\map-use-cases.md | PLAN-02 | Helps define “Agent types & capabilities”. |

----------------------------------------------------------------------------------------------------------------------------------

C. Build track – Tools, SDKs, Manifest, Implementation
----------------------------------------------------------------------------------------------------------------------------------

| Legacy source | New target | Notes |
|---------------|------------|-------|
| toolkit\agents-toolkit-fundamentals.md, toolkit\agents-toolkit-fundamentals-vs.md | BUILD-01 | Merged—one cross-IDE “Tools & SDKs” article; IDE-specific callouts in tabs. |
| includes\sdk-include.md, tabs\how-to\using-teams-client-library.md | BUILD-01, SDK-REF-01 | Library overviews go to BUILD-01; deep API tables to SDK-REF-01. |
| resources\schema\manifest-schema-dev-preview.md, manifest-schema.md | BUILD-02 | Classic & preview combined into “App manifest for agents”; keep schema details in Reference hub. |
| bots\build-a-bot.md, bots\how-to\teams-conversational-ai\how-conversation-ai-get-started.md | BUILD-03 | Provide foundational “build bot” content in agent context. |
| messaging-extensions\build-bot-based-agent.md | BUILD-03 | Same target; becomes section 2. |
| tabs\what-are-tabs.md, cards\what-are-cards.md | BUILD-03 | Classic surface coverage; rewritten around agent usage of tabs/cards. |
| device-capabilities\*  | EXT-02 | Implementation details for future “Device capabilities” (cross-M365). |

----------------------------------------------------------------------------------------------------------------------------------

D. Integration track
----------------------------------------------------------------------------------------------------------------------------------

| Legacy source | New target | Notes |
|---------------|------------|-------|
| concepts\authentication\authentication.md, tabs\how-to\authentication\*.md, bots\how-to\authentication\*.md | INTEG-01 | SSO & OAuth unified under one “Authentication & SSO” article. |
| bots\how-to\authentication\bot-sso-graph-api.md, tabs\tab-sso-graph-api.md | INTEG-02 | Become “Microsoft Graph integration”. |
| m365-apps\*, teams-live-share-*(canvas, media, core), extend-m365-* | INTEG-03 | All cross-host content rolls into “Extend agents across Microsoft 365”. |

----------------------------------------------------------------------------------------------------------------------------------

E. Test & Debug track
----------------------------------------------------------------------------------------------------------------------------------

| Legacy source | New target | Notes |
|---------------|------------|-------|
| toolkit\debug-overview.md, debug-local.md, debug-your-agents-playground.md | TEST-01 | Consolidate under “Local testing your agent”; Agents Playground highlighted. |
| toolkit\TeamsFx-preview-and-customize-app-manifest.md | TEST-02 | Manifest validation & preview. |
| resources\troubleshoot.md, bots\how-to\debug\locally-with-an-ide.md | TEST-03 | Troubleshooting mega-FAQ for agent devs. |

----------------------------------------------------------------------------------------------------------------------------------

F. Publish & Grow track
----------------------------------------------------------------------------------------------------------------------------------

| Legacy source | New target | Notes |
|---------------|------------|-------|
| concepts\deploy-and-publish\apps-publish-overview.md | PUBLISH-01 | Publishing flow rewritten for agents. |
| promote-app-adoption.md, appsource\post-publish\app-growth\* | PUBLISH-02 | Adoption & analytics combined. |
| concept\deploy-and-publish\appsource\prepare\monetize-overview.md, in-app-purchase-flow.md | PUBLISH-03 | Monetization strategies. |

----------------------------------------------------------------------------------------------------------------------------------

G. Classic Teams app content (maintained)
----------------------------------------------------------------------------------------------------------------------------------

| Legacy source folder | New target | Notes |
|----------------------|------------|-------|
| *All meeting apps, tabs, bots, messaging-extensions HOW-TOs that are not agent-specific* | CLASSIC-OV, CLASSIC-01, CLASSIC-02 | Grouped under “Build a traditional Teams app”. |
| apps-in-teams-meetings\* | CLASSIC-02 (Meeting apps) | No agent work planned; keep reference. |
| webhooks-and-connectors\* | EXT-03 (Notifications) + CLASSIC-01 | Outgoing webhooks largely classic; incoming notifications relevant to agents. |

----------------------------------------------------------------------------------------------------------------------------------

H. Reference hub
----------------------------------------------------------------------------------------------------------------------------------

| Legacy source | New target | Notes |
|---------------|------------|-------|
| Every “schema-reference” file, SDK reference tabs, Graph API pages | SDK-REF-01 | Will sit under single Reference landing page with filters (Bots, Tabs, Agents). |

----------------------------------------------------------------------------------------------------------------------------------

I. Identified gaps (no suitable legacy source)
----------------------------------------------------------------------------------------------------------------------------------

| New target ID | Gap description / plan |
|---------------|------------------------|
| AG-START-02 | “Why build agents on Teams?” – needs fresh content with Copilot positioning. |
| PLAN-02 | Clear taxonomy of agent types & capabilities – build from scratch. |
| BUILD-03 (agent orchestration section) | Need new section on “agent planner, memory & orchestration loop”. |
| INTEG-03 | Explicit guidance on Outlook & Microsoft 365 host surfaces for agents – create new. |
| PUBLISH-03 | Consumption-based billing model for Copilot plug-ins – new content. |

----------------------------------------------------------------------------------------------------------------------------------

J. Overlaps / consolidation candidates
----------------------------------------------------------------------------------------------------------------------------------

1. Many SSO articles (tab & bot) are redundant → will merge into INTEG-01 with platform-specific tabs.  
2. Multiple “debug locally” pages under bots/tabs/toolkit → single TEST-01 with IDE switch-tabs.  
3. Link unfurling appears in messaging-extensions & webhooks; unify under EXT-03 “Notifications & webhooks”.
