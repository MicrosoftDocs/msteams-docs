---
title: Microsoft Teams SDK Programming Model
description: TODO
ms.topic: overview
ms.date: 05/19/2026
author: nickwalkmsft
ms.author: nickwalk
---

# Teams SDK programming model **for agents**

In [The Teams application model and developer workflow](concepts/teams-application-model.md), we saw how apps are powered by web apps

That article is overall arch model and workflow, this is Temas SDK app model

The focus of the SDK, and of most of this, is agents.

most events are activities, so the SDK exposes activity-specific handlers.

api client -> bot connector

<https://microsoft.github.io/teams-sdk/why>

## Remaining Concepts to carry over from <https://microsoft.github.io/teams-sdk/why>

- Reactive and proactive messaging
- Bot registration (bot ID and where the endpoint is configured)
- Request validation
- Variety of events, varied response types, some expect no response at all. Should define, maybe link to the Activity model.
- Authenticating calls to Teams API, Graph API
- OAuth, SSO
-
-

## Remaining Concepts to carry over from <https://microsoft.github.io/teams-sdk/teams/core-concepts>

- Basic flowchart, see diagram
- DevTunnel
- Provisioning of app and bot has to come even before sideloading
- Sideloading
- Explain how the developer CLI supports all of this

Multi languages:

<https://microsoft.github.io/teams-sdk/csharp/getting-started/code-basics>

<https://microsoft.github.io/teams-sdk/csharp/essentials/>

<https://microsoft.github.io/teams-sdk/csharp/essentials/app-basics>

<https://microsoft.github.io/teams-sdk/csharp/essentials/on-event>

<https://microsoft.github.io/teams-sdk/csharp/essentials/on-activity/> (there's a reference for TS)

<https://microsoft.github.io/teams-sdk/csharp/essentials/app-authentication/>

<https://microsoft.github.io/teams-sdk/csharp/essentials/app-authentication/trust-model>  (? this might be a separate page, but here we should at least call out how one function of the SDK is to authenticate received messages, and then we can link to a separate page.)

<https://microsoft.github.io/teams-sdk/csharp/essentials/sending-messages/> (some basic subset of messaging; a lot of this is specific features we'd link to from here, but this is a pretty good list of messaging features I can use to get that done.)

<https://microsoft.github.io/teams-sdk/csharp/essentials/api>

<https://microsoft.github.io/teams-sdk/typescript/essentials/graph> (big enough might need a separate page)
