---
title: Best practices for Teams agent factories
description: Operate a Teams agent factory with tenant-aware data isolation, manager controls, lifecycle handling, explicit retention policies, and protected credentials.
ms.topic: article
ms.date: 11/15/2026
ms.author: umangsehgal
author: umangsehgal
---

# Best practices for Teams agent factories

This article is part 6 of the [Build an agent factory with Agentic Users in Teams](build-agent-factory.md) series.

This article recommends best practices for developers building agents and agent factories. These recommendations aren't mandatory, but they're highly recommended to help you create a delightful experience for your customers and make your factory easier to operate.

## Introduce the agent

* After Teams onboarding succeeds, send a short hello in the agent's one-on-one chat with its owner and whenever it's added to a new conversation. Say what it can help with, and suggest a first task.
* When the agent's manager changes, have it introduce itself to its new manager and refresh what it knows about them.

## Give each agent a clear profile

When you create an agent, give it a recognizable name, description, and profile picture, so people pick the right one in the people picker.

## Let the manager set boundaries

Provide controls in your product so each agent's manager can decide how it responds when other people contact it. Enforce those controls in your service's authorization and tool execution, not only in model instructions. Verify who the current manager is before accepting changes.

## Keep each agent's context separate

* Key each agent's records by both tenant ID and Agentic User ID. Include the conversation ID when storing conversation-specific state.
* Keep private per-agent state isolated. In each turn, load only the instructions, knowledge, tools, memory, and conversation history authorized for the selected agent.
* If no enabled agent matches the tenant ID and Agentic User ID, log it and stop. Don't fall back to another agent's logic.
* Include the tenant ID and Agentic User ID in your logs and telemetry, so every action traces back to one agent. Don't log tokens, credentials, or unnecessary conversation content.

## React to lifecycle notifications

| **Notification** | **What your service can do** |
| ---- | ---- |
| Agentic User identity created | Create or link the agent's record, and initialize its configuration and state. |
| Workload onboarding updated | Wait for successful Teams onboarding before sending a welcome message or starting Teams-specific work. |
| Identity property updated | Refresh the stored mail address, alias, or user principal name. |
| Manager updated | Update the stored manager, and route manager-based approvals and escalations to the new manager. |
| Disabled | Pause the agent's scheduled and proactive work. |
| Enabled | Check onboarding, permissions, and your product's policies before resuming the agent's work. |
| Deleted | Stop the agent, remove its access to your product's resources, and start cleanup. |
| Undeleted | Restore retained state only if retention policy allows it and the identity is enabled and authorized. |

Make event handling idempotent and verify the current agent state before executing scheduled or proactive work. For handlers in each SDK language, see [Handle lifecycle notifications](be-in-the-know.md).

## Plan for deletion

Deleting an Agentic User doesn't automatically delete the agent's configuration or memory in your product. Stop its work and revoke its access to your product's resources immediately.

Define a retention period with your customer that satisfies their deletion and compliance requirements. During that period, retain only the data that policy allows and keep it inaccessible to active agents. If the identity is restored before the period expires, restore permitted state only after checking its enabled status and authorization. Otherwise, permanently delete retained data when the period ends. If policy requires immediate deletion, don't retain state for restoration.

When someone deletes an agent in your product, also initiate deletion of its Agentic User through an authorized management workflow. Track failures and retry safely so your product and the customer's tenant don't diverge.

## Protect credentials and tokens

* Store credentials in a secret store such as Azure Key Vault. If you cache tokens, encrypt them, restrict access, and isolate entries by tenant, agent identity, Agentic User, and resource.
* In production, use a supported managed identity or certificate configuration for your SDK and hosting environment. Use client secrets only during development. See [Runtime authentication configuration](../../../agents-in-teams/configure-agent-runtime-authentication.md).

Previous: [Handle lifecycle notifications in your agent factory](be-in-the-know.md).

> [!div class="nextstepaction"]
> [Next: Agent factory FAQ](faq.md)
