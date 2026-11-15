---
title: Agent factory FAQ
description: Agent factory FAQ answers common questions about Teams activation, blueprints, Agentic Users, and admin approvals. Find quick answers to build and manage agents.
ms.topic: faq
ms.date: 11/14/2026
ms.author: umangsehgal
author: umangsehgal
---

# Agent factory FAQ

## Do people need to install each agent in Teams?

No. Your customer's admin activates your agent factory once. After that, each agent people create in your product shows up in Teams on its own.

## Do I need a separate blueprint or service for each agent?

No. Create one blueprint for your agent factory. Each agent gets its own Agentic User, and one service handles the messages for all of them.

## Can one agent identity have more than one Agentic User?

No. Each agent identity pairs with exactly one Agentic User.

## How soon can people use a new agent?

The person who created the agent can chat with it one-on-one within minutes. It can take a little longer before everyone else in the organization can find it in people search.

## Who approves a new agent?

Your customer's admin decides when they activate your agent factory: they can allow all users, or only specific users and groups, to create agents from it.

## What happens when an admin disables or deletes an agent?

Your service receives a lifecycle notification, so it can pause or clean up that agent in your product. See Best practices.
