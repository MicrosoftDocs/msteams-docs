---
title: Build an agent factory with Agentic Users in Teams
description: Build a Microsoft Teams agent factory with one agent identity blueprint, a shared runtime, and a separate Agentic User for each customer-created agent.
ms.topic: article
ms.date: 11/15/2026
ms.author: umangsehgal
author: umangsehgal
---

# Build an agent factory with Agentic Users in Teams

This article is part 1 of the **Build an agent factory with Agentic Users in Teams** series.

> [!NOTE]
> This series is for developers building products that let customers create and manage multiple AI agents in Microsoft Teams. It covers a shared runtime and a separate Agentic User for each agent, rather than a single-agent app or an end-user agent-building tutorial.

An agent factory lets users create their own agents, each tailored to a team, a workflow, or a body of knowledge, by using your tools, orchestration, and runtime. It might be a no-code agent builder, or a work app that lets each team set up its own assistant.

An Agentic User is a user account in Microsoft Entra ID that belongs to an AI agent instead of a person. It has a name, a profile, and a manager, so people can find it and work with it in Microsoft 365 the way they work with a colleague.

When you build your agent factory on Agentic Users, every agent your users create gets its own Agentic User. Your customer's admin turns on your agent factory once. After that, each agent your users create shows up in Teams on its own, with no app to install for each one.

## What your users experience

1. Someone in your customer's organization creates an agent in your product and names it, for example Agent X.
1. After provisioning and Teams onboarding finish, Teams notifies them that Agent X is ready and opens a one-on-one chat with it.
1. Agent X appears in the organization's directory with its assigned manager.
1. People can find Agent X in the people picker and add it to supported chats, channels, and meetings, subject to their organization's policies.
1. Your product lets Agent X's manager set boundaries for how it responds when other people contact it.

Each agent is its own participant. People can tell an onboarding agent that belongs to HR from an incident agent that belongs to engineering, and both can join the same conversation, each in its own role.

## Admins govern each agent individually

Each agent has its own identity in your customer's directory. Admins can manage individual agents without treating every agent from your factory as one shared account.

* **Control creation:** Choose who can create agents from your factory.
* **Limit access:** Grant the permissions agents need for their work. Each agent acts with the access granted to its identity.
* **Trace activity:** Distinguish agent activity from human activity in supported audit logs.
* **Manage individual agents:** Disable or delete one agent without disabling the entire factory.

Your runtime must honor these controls by enforcing authorization and stopping work when an agent is disabled or deleted.

## How it works

:::image type="content" source="../../../assets/images/agentic-user-event-flow.png" alt-text="Diagram showing Teams messages passing through Teams SDK to custom agent orchestration and external tools." lightbox="../../../assets/images/agentic-user-event-flow.png":::

*How messages reach your service and the right agent.*

* Your agent factory uses one agent identity blueprint. The blueprint defines the reusable identity configuration and requested permissions. An administrator must consent to the required permissions; declaring them doesn't grant access by itself.
* Each agent your users create gets its own agent identity and Agentic User in the customer's tenant.
* Messages and lifecycle notifications for every agent are funneled back to your service through the callback URL you registered for the blueprint. Your service uses Teams SDK to process them.
* Your service uses the blueprint to authenticate itself, but it replies, sends messages, and calls APIs as the Agentic User that each activity was addressed to.

### Understand the identities

| Identity | Purpose |
| ---- | ---- |
| Agent identity blueprint | Authenticates your shared runtime and defines the configuration used to create agent identities. |
| Agent identity | Identifies one agent instance in the customer's tenant. Its client ID is used during token acquisition. |
| Agentic User | The user account associated with that agent identity. Its object ID identifies the agent as a Microsoft 365 participant. |

Store the customer's tenant ID alongside these per-agent IDs. Don't use the blueprint ID to distinguish agents or assume an agent identity's client ID is the same as its Agentic User's object ID.

## The agent acts as itself

We recommend that an agent use its own identity for every operation. That keeps attribution accurate and limits its access to the permissions granted to that identity. Your service must also enforce authorization and data isolation.

In a few cases, an agent might need to act as a person to finish a task, for example when the workload doesn't support native delegation. Use this only as a fallback: the agent sends the person a sign-in card, and if the person consents, the agent gets a token to act on their behalf.

> [!div class="nextstepaction"]
> [Next: Set up your agent factory](setup.md)
