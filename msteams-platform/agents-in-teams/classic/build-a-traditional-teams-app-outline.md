---
title: Build a traditional Microsoft Teams app  
description: Learn the core surfaces—tabs, bots, message extensions, webhooks, and connectors—used to create classic Teams apps that don’t integrate with Copilot or the new agent runtime.  
ms.localizationpriority: medium  
ms.topic: conceptual
ms.date: 07/02/2025  
---
# Build a traditional Microsoft Teams app  

[template instruction → Introduce in 3-4 sentences (< 100 words) what a “classic” Teams app is, why it’s still supported, and when you might choose it over an AI-powered agent.]

## Why build a classic app  

[template instruction → Provide 2–3 bullets focusing on scenarios such as highly customized UI, legacy tenant environments, or meeting-stage media that isn’t yet agent-enabled.]

## Core extensibility pillars  

[template instruction → List each pillar with one-line description.]  

- Tabs (personal, channel, meeting)  
- Bots (conversational experiences via Bot Framework)  
- Message extensions (search & action commands)  
- Webhooks and connectors (incoming/outgoing notifications)  
- Meeting apps (side panel, stage, Live Share)  

## Architecture snapshot  

[template instruction → Include simple diagram placeholder + 3-5 callouts showing Teams client, service-hosted web content, Bot Framework endpoint, and optional Azure Functions.]

## Development lifecycle at a glance  

1. Plan UX & capabilities  
2. Scaffold project with **Teams Toolkit** (classic mode)  
3. Test locally with dev tunnels  
4. Validate manifest (`manifestVersion` ≤ 1.21)  
5. Publish to Tenant or Teams Store  
[template instruction → Add one short sentence under each bullet.]

## Relationship to AI-powered agents  

[template instruction → Explain in ≤ 70 words that classic apps can coexist with agents; you can migrate later by adding a `copilotAgents` block or keep both models side-by-side.]

## Limitations  

[template instruction → Note that classic apps won’t appear in Copilot skill list and cross-host runtime may require additional manifest work.]

## Next step  

See “[Tabs, bots & message extensions](tabs-bots-and-message-extensions.md)” for hands-on guides to each classic capability.

## See also  

- [Overview of the Teams developer platform](../overview/overview-of-teams-developer-platform.md)  
- [App manifest schema (v1.21)](../reference/sdk-and-api-reference-hub.md#schemas)
