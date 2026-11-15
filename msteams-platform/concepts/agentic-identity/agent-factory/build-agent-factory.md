---
title: Build an agent factory
description: Build an agent factory that lets users create custom AI agents, each with its own Agentic User identity in Microsoft Entra ID. Learn how to get started today.
ms.topic: article
ms.date: 11/14/2026
ms.author: umangsehgal
author: umangsehgal
---

# Build an agent factory

An agent factory lets users create their own agents, each tailored to a team, a workflow, or a body of knowledge, by using your tools, orchestration, and runtime. It might be a no-code agent builder, or a work app that lets each team set up its own assistant.

An Agentic User is a user account in Microsoft Entra ID that belongs to an AI agent instead of a person. It has a name, a profile, and a manager, so people can find it and work with it in Microsoft 365 the way they work with a colleague.

When you build your agent factory on Agentic Users, every agent your users create gets its own Agentic User. Your customer's admin turns on your agent factory once. After that, each agent your users create shows up in Teams on its own, with no app to install for each one.

## What your users experience

1. Someone in your customer's organization creates an agent in your product and names it, for example Agent X.
1. Teams notifies them that Agent X is ready and opens a one-on-one chat with it.
1. Agent X appears in the org chart, reporting to the person who created it.
1. Anyone can add Agent X to a chat, channel, or meeting from the people picker.
1. Agent X's manager can tell it how to respond when other people contact it.

Each agent is its own participant. People can tell an onboarding agent that belongs to HR from an incident agent that belongs to engineering, and both can join the same conversation, each in its own role.

## What admins get

Each agent has its own identity in the organization's directory. It calls APIs as itself, with only the access it has been granted, and audit logs show the agent rather than the person who created it or the person talking to it. Admins choose who can create agents from your agent factory, and they can disable or delete any single agent.

## How it works

:::image type="content" source="../../../assets/images/agentic-user-event-flow.png" alt-text="A diagram illustrating how messages reach the correct agent within an agent runtime." lightbox="../../../assets/images/agentic-user-event-flow.png":::

*How messages reach your service and the right agent.*

* Your agent factory is one agent identity blueprint. It holds the credentials and baseline permissions that all of your agents share. Each agent is a child of the blueprint and inherits its configuration unless you override it.
* Each agent your users create gets its own agent identity and Agentic User in the customer's tenant.
* Messages and lifecycle notifications for every agent are funneled back to your service through the callback URL you registered for the blueprint. Your service uses Teams SDK to process them.
* Your service uses the blueprint to authenticate itself, but it replies, sends messages, and calls APIs as the Agentic User that each activity was addressed to.

## The agent acts as itself

We recommend that an agent use its own identity for every operation. That keeps attribution accurate, and it fences the agent in if its model misbehaves.

In a few cases, an agent might need to act as a person to finish a task, for example when the workload doesn't support native delegation. Use this only as a fallback: the agent sends the person a sign-in card, and if the person consents, the agent gets a token to act on their behalf.

> [!div class="nextstepaction"]
> [Next: Set up your agent factory](setup.md)
