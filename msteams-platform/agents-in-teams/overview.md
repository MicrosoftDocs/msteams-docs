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

An agent in Teams is a kind of *bot*: an app that users install into Teams and interact with conversationally in Teams chat. *Agents* are bots that rely on large language models (LLMs) to converse naturally, adapt to context, and dynamically take action.

## Creating agents for Teams

<!-- REVIEW NOTE: The old version's "Agent developer experience" which gave no insight. Note that we don't position Teams SDK here as "primary" to Agent's SDKs "secondary/compatible", we simply don't mention Agents SDK here at all, which is why this section doesn't talk about Teams SDK's "first-class"ness either - it's simply the one. -->

For developers, creating a Teams agent means writing a web service. The service behind a Teams agent handles events sent by the Teams platform and makes calls to the platform's API. Developers use Teams SDK (TODO link) to create these services and can host them anywhere on the web. Teams SDK uses web service frameworks that are familiar to TypeScript, C#, and Python developers to help them structure their Teams apps, and offers tools for simplifying common Teams app concerns and accelerating app development.

With the Teams SDK, developers can build apps that offer a variety of interactions in Teams, not just conversational assistants. TODO rewrite For bot and agent apps, the main focus is handling and responding to messages in chats.

Traditional bots are typically built to react to predefined commands that are addressed to them directly. Here's the message handler for a bot that... TODO bot should respond to 1:1s or to @mentions in groups and parse commands.

<!-- TODO should I pivot this article or use tabs? -->

*TODO Snippet of simple bot message handler with pseudocode inside a real message handler: check if in 1:1 or if @mentioned, read command, act and respond. Be careful not to infer that the pseudocode represents APIs offered by TSDK.*

Agents work differently. They can also respond to commands with predefined behaviors, but generally an agent relies on an LLM to drive its actions and responses. Agents can track every message of a conversation to form an understanding of users' intent, dynamically make decisions, and reply with natural language that fits the context of the conversation. When connected to other services, agents can take action and perform tasks on users' behalf. Here's the message handler for an agent that... TODO

*TODO Snippet of simple LLM-driven agent message handler with pseudocode inside a real message handler. This one shouldn't be deeply integrated with Teams, just a messenger, integration comes below.*

## What's possible with agents in Teams

Most applications that feature agents present them as one-to-one chat assistants in a dedicated interface or integrated with another tool. Teams offers unique, rich opportunities for creating agents that expressively interact with users in the place where they already come to collaborate in chat to get work done.

Consider these scenarios:

<!-- TODO Refine these, have a handful, pack them with features but keep them short. The idea is to concisely pack every cool feature into a few short illustrative scenarios to inspire (a few short punchy ones are better than one long-running one). I need mini, two or three sentence scenarios that get specific, in order to paint a picture. and make them concreete: not "an agent; information; tasks," but an agent that does a specific things; is asked for specific information and to do a specific task. Ideas should come from and use unique Teamsy stuff for agents, like interesting events it can respond to, using reactions, mentions, suggested actions, slash commands etc, or maybe like adding in message extension capabilities to do really cool stuff. Maybe genericize some real customer apps; these should be inspiring. Also access to org M365 data. -->

- A team adds an agent to their group chat to ask it for information and direct it to perform tasks. The agent can infer intent based on the conversation and share the results back into the thread.
- An agent in a long-running channel absorbs details about decisions and process. When appropriate, it proactively suggests actions, requests approval, and acts on the team's behalf.
- An agent that "learns" across conversations by creating memories. Can mention the feedback feature in this one.
- An agent is prompted to be aware that it's operating in the context of Teams dynamcally uses conversation features like mentions, reactions, quoting, and targeted (private) messages in group conversations.
- An agent that proactively offers information or action without having to be explicitly addressed, without being obnoxious. Uses buttons for quick approval.

- <!--  @mentions, emoji reactions on messages, quoted and threaded replies, command autocomplete, detection of channel and meeting events, citations and disclosure labels on AI-generated content, user feedback intake, custom dialogs and more-->

## The development process

Teams SDK also simplifies other aspects of developing Teams apps, including request and response authentication, user authentication and enterprise single sign-on, calling the Teams platform and Microsoft Graph APIs, and managing agent conversation state.

Teams SDK also includes a developer CLI tool to accelerate development. The workflow enabled by the Teams developer CLI is designed to help you quickly get started with a new project and have it running in Teams at the very beginning of development.

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