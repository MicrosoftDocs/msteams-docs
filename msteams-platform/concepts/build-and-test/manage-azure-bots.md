---
title: Manage Azure Bots with Developer Portal
description: Learn how to manage Azure bots using the Developer Portal for Microsoft Team
ms.topic: overview
ms.date: 11/04/2026
---

# Manage Azure bots in Developer Portal for Teams

Use [Developer Portal](https://dev.teams.microsoft.com/) for Teams to find existing Azure Bot resources and open their supported configuration settings. You don’t need to recreate or import an Azure bot to use this experience.

Azure-managed bots and Teams-managed bots have separate lists. An Azure-managed bot remains an Azure resource: Azure permissions govern its resource settings, and the Azure portal remains the place to manage its lifecycle and other properties.

## What you can do

| Task | Where to do it |
| --- | --- |
| Find Azure bots by subscription, resource group, or search | Developer Portal: Tools > Bot management > Azure-managed bots |
| View supported delivery settings | Open the bot and select Configure. HTTP endpoint and Socket Mode availability depends on the preview and your access. |
| Create or delete an Azure bot; manage channels, credentials, or its icon | Azure portal, or the linked identity management experience where applicable |
| Package, test, or publish a Teams app that uses the bot | The app’s workflow under Apps in Developer Portal |

## Prerequisites

- Access to Developer Portal with the Azure-managed bots preview enabled. The planned preview is for commercial-cloud tenants; it doesn’t include GCC Moderate or other sovereign clouds.
- An existing Azure Bot resource and Azure read permission at the resource, resource-group, or subscription scope. Only enabled subscriptions are included.
- To use the bot in Teams, enable the Microsoft Teams channel in Azure.

### Delivery settings at a glance

Configure provides HTTP endpoint settings and, for bots, Socket Mode. HTTP uses a messaging endpoint; Socket Mode uses an outbound connection for development. For setup steps, endpoint-access requirements, and delivery-specific troubleshooting, use the delivery-method documentation [Link to Socket mode documentation].
