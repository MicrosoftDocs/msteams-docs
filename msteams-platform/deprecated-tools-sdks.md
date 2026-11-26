---
title: Deprecated Tools and SDKs for Teams development
description: Deprecated Teams app frameworks like TeamsFx and Bot Framework are no longer supported. Learn about these older tools and plan your migration to current solutions today.
ms.date: 11/17/2026
ms.topic: overview
---

# Deprecated tools and SDKs for Teams development

This article lists SDKs and tools that are deprecated for Teams agent and app development and should not be used.

**The SDKs and tools listed here are no longer supported for Teams agent and app development.**
Consider migrating existing solutions that use any of these SDKs and tools to use the modern developer experience based on [Teams SDK](teams-sdk-overview.md) and the [Teams developer CLI](teams-developer-cli-overview.md).

## Bot Framework SDK (BotBuilder)

The Bot Framework SDK, also called BotBuilder SDK, was used to build cross-platform bots compatible with Teams.
It is fully deprecated, no longer supported, and should not be used for Teams app and agent development.
The term "Bot Framework" is still occasionally used to refer to a larger ecosystem of cloud service and infrastructure components that remain a part of Teams platform connectivity.

Use [Teams SDK](teams-sdk-overview.md) to create agents that make full use of Teams' conversational features and collaborative surface.
Use the [Bot Framework SDK migration guide](botbuilder-migration/overview.md) to migrate Bot Framework SDK agents and apps to Teams SDK.

## Teams AI Library

Teams AI Library is now Teams SDK.
Update existing solutions that use any versions of Teams AI Library to use the current version of [Teams SDK](teams-sdk-overview.md).

## TeamsFx SDK (TypeScript and .NET)

TeamsFx is a deprecated SDK that simplified some aspects of Teams app development, including authentication, Microsoft Graph access, configuration, and deployment.

Use [Teams SDK](teams-sdk-overview.md) to create agents and apps for Teams.

## Microsoft 365 Agents Toolkit (Teams Toolkit)

Microsoft 365 Agents Toolkit, formerly Teams Toolkit, is a set of developer tools that previously supported Teams agent and app development.
Agents Toolkit is actively supported for Copilot extensibility development, but is deprecated for Teams agent and app development.

Use the [Teams developer CLI](teams-developer-cli-overview.md)'s command-line workflow for Teams agent and app development tasks.

## Microsoft Graph Toolkit

The Microsoft Graph Toolkit provided a set of reusable web components and helpers to accelerate development of apps that use Microsoft Graph.
It is fully deprecated and no longer supported.

Use Teams SDK's [Graph API Client](concepts/sdk-graph-api-client.md) to interact with Microsoft Graph from Teams agents and apps.
