FILE: teams-platform/overview/teams-developer-glossary.md  
SOURCES:  
- get-started/glossary.md  

OUTLINE:
---
title: Microsoft Teams developer glossary  
description: Definitions of key terms, acronyms, and concepts used throughout the Teams developer platform and AI-agent documentation.  
ms.localizationpriority: medium  
ms.topic: reference  
ms.date: 07/02/2025  
---
# Microsoft Teams developer glossary  
The following alphabetical glossary helps you quickly understand the terminology used in the Teams developer platform—especially new phrases introduced with AI-powered agents. Terms are grouped by first letter.

> [!NOTE]  
> If a term links to another article, that page provides deeper technical details.

## A  
* Adaptive Card – JSON-based UI snippet that renders natively in Teams, Outlook, and Microsoft 365.  
* Agent (AI-powered) – An application manifest type that exposes skills to Copilot and other LLM-backed surfaces.  
* App manifest – The JSON file that declares capacities, permissions, and runtime requirements for a Teams or agent app.  

## B  
* Bot – Conversational component powered by the Bot Framework or Teams AI Library.  
* Background load configuration – Manifest setting that enables tabs to pre-cache content.  

## C  
* Copilot plug-in – Declarative agent that surfaces actions or knowledge to Microsoft 365 Copilot.  
* Custom engine agent – Agent that hosts its own reasoning logic rather than relying on Copilot orchestration.  

## D  
* Device capability API – TeamsJS namespace enabling camera, barcode scanner, and location access.  

## E  
* ElementRelationshipSet – Manifest section that specifies dependencies between capabilities when extending across Microsoft 365.  

## F  
* Fluent UI – Microsoft’s cross-platform design system used by Teams web surfaces.  

## G  
* Graph (Microsoft) – REST API endpoint that provides data from Microsoft 365 services such as Teams, Outlook, and OneDrive.  

## H  
* Hosted content – Any web experience (tab, dialog, Stageview) rendered inside the Teams webview container.  

## I  
* Incoming Webhook – Simple HTTP endpoint that posts JSON payloads into a Teams channel.  
* Interactive notification – Bot-delivered message that includes buttons or Adaptive Card actions.  

## J  
* JSON schema (manifest) – Formal definition of allowable properties and value types inside a Teams or agent manifest file.  

## L  
* Live Share SDK – Library that enables real-time co-editing, cursor presence, and media sync inside meeting apps.  

## M  
* Message extension – Extension that lets users search or invoke actions directly from the Teams compose box or message context menu.  

## N  
* Notification feed – The “Activity” pane in Teams where apps can surface user-specific alerts.  

## O  
* OBO (On-Behalf-Of) flow – OAuth pattern used to exchange a Teams access token for a Microsoft Graph token.  

## P  
* Personal tab – Static tab that is installed in the user’s app bar, scoped to that individual.  

## R  
* Resource-specific consent (RSC) – Fine-grained permission model that lets an app access specific team, chat, or meeting resources.  

## S  
* Stageview – Multi-window surface that opens rich content (docs, cards) alongside chat.  
* Single sign-on (SSO) – Experience where Teams silently acquires an access token without extra user prompts.  

## T  
* TeamsJS (Microsoft Teams JavaScript SDK) – Client library for tabs, dialogs, and web content running inside Teams or Outlook.  

## U  
* Universal Actions – Adaptive Card action pattern that enables user-specific views, refresh, and sequential workflows.  

## V  
* Valid domains – Manifest array of fully qualified domain names that the app is allowed to load.  

## W  
* Webhooks (Outgoing) – Endpoint that lets Teams POST chat content to an external service and receive a JSON reply.  

*(Add new terms as the platform evolves; keep each definition ≤ 30 words.)*

## Next step  
Review “[Tools & SDKs for building agents](../build/tools-and-sdks-for-agents.md)” to see how these concepts map to code.

## See also  
- [Overview of the Teams developer platform](overview-of-teams-developer-platform.md)  
- [App manifest for agents](../build/app-manifest-for-agents.md)