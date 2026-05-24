---
title: Agents in Teams - Overview
description: Learn about agents in Teams and associated organizational goals, why should you build agents on Teams platform, and how do Teams agent help meet business needs.
ms.localizationpriority: high
ms.date: 02/06/2025
ms.topic: reference
---

# Agents in Teams

<!-- REVIEW NOTE: Distinguishing this from the old article: This condenses things; the old vesrion was marketing-ish and used broad value statements, and relied on one big scenario further down that didn't  highlight the value of putting agents specifically into Teams. This version focuses on the developer perspective with a technical definition (with a next steps link that points to a new article about the Teams app model, in addition to the existing one that goes to the quickstart), and uses multiple, small, concrete scenarios that paint a picture and focus on Teams' distinguished value as an environment for agents -->

<!-- TODO do away with the infographics and put in code/CLI snippets and client UX screenshots instead -->

An *agent* in Teams is a kind of *bot*: an app that users install into Teams and interact with conversationally in Teams chat. Agents are bots that use modern AI techniques to converse naturally, adapt to context, and help users get work done.

Unlike rule-based bots with fixed behavior, agents rely on large language models (LLMs) to understand users' intent, dynamically make decisions, and respond with natural language. Given connectivity to other services, agents can take action and perform tasks on users' behalf.

## Building agents for Teams

<!-- REVIEW NOTE: The old version's "Agent developer experience" which gave no insight. Note that we don't position Teams SDK here as "primary" to Agent's SDKs "secondary/compatible", we simply don't mention Agents SDK here at all, which is why this section doesn't talk about Teams SDK's "first-class"ness either - it's simply the one. -->

From a developer's perspective, a Teams app consists of two main components:

1. A web service, built with Teams SDK (TODO link), that receives events from the Teams platform and makes calls to its API. The service can be hosted anywhere on the web.

2. The app manifest, a JSON configuration file that describes the functionality and configuration of the application. A developer deploys the app manifest to the Teams platform to make the app available to users.

An agent's behavior and capabilities are mainly defined by the way its service handles events triggered by user actions in Teams, but agents can act proactively as well. Teams SDK provides a framework in idiomatic TypeScript, C# and Python for creating services that handle Teams events. For example...

<!--TODO medium sized code snippet in 3-lang tabs that has some LLMness, not just an echo response -->

Teams SDK also simplifies other important parts of developing Teams apps, including request and response authentication, user authentication and enterprise single sign-on, calling the Teams platform and Microsoft Graph APIs, and managing agent conversation state.

## Scenarios for Teams agents

Agents are a natural fit for Teams, where people are already primed to accomplish their work by collaborating in chat. What truly sets Teams apart as an environment for agents, though, are its shared group context and unique conversational features.

<!-- TODO the scenarios should include aspects of both group context and features, but I also maybe want short code snippets for features, figure out if those should be interleaved or put afterwards. Maybe I could inline them? Put a pivot on the article? -->

Consider these scenarios:

<!-- TODO Get more of these. I need mini, two-sentence scenarios that get specific, in order to paint a picture. and make them concreete: not "an agent; information; tasks," but an agent that does a specific things; is asked for specific information and to do a specific task. Ideas should come from and use unique Teamsy stuff for agents, like interesting events it can respond to, using reactions, mentions, suggested actions, slash commands etc, or maybe like adding in message extension capabilities to do really cool stuff. Maybe genericize some real customer apps; these should be inspiring. Also access to org M365 data. -->

- A team adds an agent to their group chat to ask it for information and direct it to perform tasks. The agent can infer intent based on the conversation and share the results back into the thread.
- An agent in a long-running channel absorbs details about decisions and process. When appropriate, it proactively suggests actions, requests approval, and acts on the team's behalf.
- An agent that can...
-
- <!-- TODO also code samples that do like reactions and other Teams-only stuff. @mentions, emoji reactions on messages, quoted and threaded replies, command autocomplete, detection of channel and meeting events, citations and disclosure labels on AI-generated content, user feedback intake, custom dialogs and more-->

## Agents and apps in the Microsoft 365 ecosystem

Do mention that they can go in Copilot, M365 etc. etc. too. The teams app model is actually the M365 app model, these concepts are everywhere, etc.

<!-- TODO we can add an additional "more concepts" nextsteps button at the bottom that goes to the "app model" page. -->

## Links (TODO rename)

<!-- TODO sdk page -->
<!-- TODO what else? -->

## Next steps

> [!div class="nextstepaction"]
> [Build your first agent](build-first-agent.md)

<!-- TODO
> [!div class="nextstepaction"]
> [Learn more about the Teams application model](xxx)
-->