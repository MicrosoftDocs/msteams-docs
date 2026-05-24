---
title: Agents in Teams - Overview
description: Learn about agents in Teams and associated organizational goals, why should you build agents on Teams platform, and how do Teams agent help meet business needs.
ms.localizationpriority: high
ms.date: 02/06/2025
ms.topic: reference
---

<!-- TODO refresh metadata -->

# Agents in Teams

<!-- REVIEW NOTE: Distinguishing this from the old article: This condenses things; the old vesrion was marketing-ish and used broad value statements, and relied on one big scenario further down that didn't  highlight the value of putting agents specifically into Teams. This version focuses on the developer perspective with a technical definition (with a next steps link that points to a new article about the Teams app model, in addition to the existing one that goes to the quickstart), and uses multiple, small, concrete scenarios that paint a picture and focus on Teams' distinguished value as an environment for agents -->

<!-- TODO do away with the infographics and put in code/CLI snippets and client UX screenshots instead -->

An agent in Teams is a kind of *bot*: an app that users install into Teams and interact with conversationally in Teams chat. *Agents* are bots that rely on large language models (LLMs) to converse naturally, adapt to context, and dynamically take action.

## Creating agents for Teams

<!-- REVIEW NOTE: The old version's "Agent developer experience" which gave no insight. Note that we don't position Teams SDK here as "primary" to Agent's SDKs "secondary/compatible", we simply don't mention Agents SDK here at all, which is why this section doesn't talk about Teams SDK's "first-class"ness either - it's simply the one. -->

For developers, creating a Teams agent means writing a web service. The service behind a Teams agent handles events sent by the Teams platform and makes calls to the platform's API. Developers use Teams SDK (TODO link) to create these services and can host them anywhere on the web. Teams SDK uses web service frameworks that are familiar to TypeScript, C#, and Python developers to help them structure their Teams apps, and offers tools for simplifying common app concerns and accelerating development.

With the Teams SDK, developers can build apps that offer a variety of interactions in Teams, not just conversational assistants. For bot and agent apps, the main focus of development is handling and responding to chat messages.

## Comparing bot and agent design

Traditional bots typically react to predefined commands with deterministic responses, and only when they are addressed directly in chat. Here's the message handler for a bot that... TODO bot should respond to 1:1s or to @mentions in groups and parse commands.

<!-- TODO should I pivot this article or use tabs? -->

*TODO Snippet of simple bot message handler with pseudocode inside a real message handler: check if in 1:1 or if @mentioned, detect command, act and respond. Be careful to imply that the pseudocode methods are implemented elsewhre, not that they represent APIs offered by TSDK.*

Agents work differently. Like traditional bots, they can offer deterministic behavior with named commands, but generally agents rely on LLMs to interpret natural-language requests and drive behavior. Agents can track every message in a discussion to build context for the LLM and form an understanding of users' intent, dynamically make decisions, and reply in a conversational style. When connected to other services, agents can intelligently take action and perform tasks on users' behalf. Here's the message handler for an agent that... TODO

*TODO Snippet of simple LLM-driven agent message handler with pseudocode inside a real message handler. Keep it short, don't worry about integrating deeply with chat features unless it's snappy, the focus is the LLM-driven architecture*

## What's possible with agents in Teams

Outside of Teams, most conversational agents are presented as private assistants in dedicated chat interfaces or integrated with another tool. Teams offers unique opportunities for creating agents that expressively interact with users in group conversations, in the place where users already go to collaborate on work.

Consider these scenarios:

*TODO Refine these, have a handful, pack them with features but keep them short. A few 2-3 sentence scenarios are better than one extended one. The goal here is to both illustrate the possibilities and to inspire. They should paint a picture and be concrete, not generically referring to "information" and "tasks" but showcasing specific, hypothetical real-world requests, actions and responses. Ideas should come from and use unique Teamsy stuff for agents, like interesting events they can respond to, proactive messaging, using reactions, mentions, suggested actions, slash commands, targeted messages, feedback intake, citations and disclosure labels, maybe like adding in message extension capabilities to do really cool stuff. Should also leverage identity and access to workplace data. Maybe genericize some real customer apps*

- A team adds an agent to their group chat to ask it for information and direct it to perform tasks. The agent can infer intent based on the conversation and share the results back into the thread.
- Make sure to feature a 1:1 personal agent too, just to indicate it can be done. This scenario can emphasize other aspects like workplace data access, reactions, slash commands etc.
- An agent in a long-running channel absorbs details about decisions and process. When appropriate, it proactively suggests actions, requests approval, and acts on the team's behalf.
- An agent that "learns" across conversations by creating memories. Can mention the feedback feature in this one.
- An agent is prompted to be aware that it's operating in the context of Teams dynamcally uses conversation features like mentions, reactions, quoting, and targeted (private) messages in group conversations.
- An agent that proactively offers information or action without having to be explicitly addressed, without being obnoxious. Uses buttons for quick approval.

## Agents and apps in the Microsoft 365 ecosystem

Do mention that they can go in Copilot, M365 etc. etc. too. The teams app model is actually the M365 app model, these concepts are everywhere, etc.

<!-- TODO we can add an additional "more concepts" nextsteps button at the bottom that goes to the "app model" page. -->

## Related resources

<!-- TODO sdk page -->
<!-- TODO what else? -->

## Next steps

> [!div class="nextstepaction"]
> [Build your first agent](build-first-agent.md)

<!-- TODO
> [!div class="nextstepaction"]
> [Learn more about the Teams application model](xxx)
-->