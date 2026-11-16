---
title: "Agent factories in Microsoft Teams: FAQ"
description: Find answers about Teams agent factory activation, blueprint reuse, Agentic User identities, provisioning readiness, and admin lifecycle controls.
ms.topic: faq
ms.date: 11/15/2026
ms.author: umangsehgal
author: umangsehgal
---

# Agent factories in Microsoft Teams: FAQ

This article is part 7 of the [Build an agent factory with Agentic Users in Teams](build-agent-factory.md) series.

## Do people need to install each agent in Teams?

No. Your customer's admin activates your agent factory once. After that, each agent people create in your product shows up in Teams on its own.

## Do I need a separate blueprint or service for each agent?

No. Create one blueprint for your agent factory. Each agent gets its own Agentic User, and one service handles the messages for all of them.

## Can one agent identity have more than one Agentic User?

No. An agent identity can have at most one associated Agentic User, and an Agentic User is associated with one agent identity. Each agent created through this factory pattern has its own pair. The blueprint is shared; the per-agent identities aren't.

## How soon can people use a new agent?

Creation is asynchronous. Wait for provisioning and Teams onboarding to succeed before treating the agent as ready. People-search indexing can take longer. Show provisioning progress and any errors in your product. See [Check the status](create-agentic-users.md#step-2-check-the-status).

## Who approves a new agent?

Your customer's admin configures who can create agents when they activate your factory: all users, or specific users and groups. Creation is still subject to the tenant's policies and the selected provisioning workflow. See [What your customer's admin does](setup.md#what-your-customers-admin-does).

## What happens when an admin disables or deletes an agent?

Your service receives a lifecycle notification. Stop scheduled and proactive work for the affected agent, and enforce its disabled or deleted state in your product. Deleting the directory identity doesn't automatically remove data from your service; apply your agreed retention and cleanup policy. See [Best practices for Teams agent factories](best-practices.md).

Previous: [Best practices for Teams agent factories](best-practices.md).

> [!div class="nextstepaction"]
> [Return to the agent factory overview](build-agent-factory.md)
