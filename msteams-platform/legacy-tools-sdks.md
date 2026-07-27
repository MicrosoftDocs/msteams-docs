---
title: Legacy Tools and SDKs for Teams app development
description: Legacy Teams app frameworks like TeamsFx and Bot Framework are no longer supported. Learn about these older tools and plan your migration to current solutions today.
author: nickwalkmsft
ms.author: nickwalk
ms.date: 06/23/2026
ms.topic: overview
---

# Legacy Teams app and agent development frameworks

This article briefly describes deprecated SDKs and tools for Teams app development, along with their recommended replacements.

**The SDKs and tools in this article are no longer supported, and new Teams app and agent development should not make use of them.** Consider migrating existing solutions that use any of these items to current SDKs and tools.

## Bot Framework SDK (BotBuilder)

The Bot Framework SDK, also called BotBuilder SDK, was used to build cross-platform bots compatible with Teams. The name "Bot Framework" is still used to refer to a larger ecosystem of cloud service and infrastructure components that remain an important part of the Teams platform, but the Bot Framework SDK is no longer supported as an SDK for creating bots or agents.

Teams SDK is the successor to the Bot Framework SDK for agents that specifically target Teams and seek to make full use of its conversational features and collaborative surface. Use Microsoft Agents 365 SDK for agents that need compatibility with multiple conversational platforms.

## Teams AI Library

Teams AI Library was the direct predecessor of Teams SDK. Update existing solutions that use any versions of Teams AI Library to use the current version of Teams SDK.

## TeamsFx SDK (TypeScript and .NET)

TeamsFx was an SDK that simplified some aspects of Teams app development, including authentication, Microsoft Graph access, configuration, and deployment.

Like the Bot Framework SDK, TeamsFx is superseded by the Teams SDK and Microsoft 365 Agents SDK.

## Teams Toolkit

Teams Toolkit was previously the main developer tooling experience for Teams app development, consisting of a command-line tool and extensions for Visual Studio Code and Visual Studio. Teams Toolkit integrated with TeamsFx and offered support for creating, debugging, provisioning, and deploying Teams applications.

Microsoft 365 Agents Toolkit most directly succeeds Teams Toolkit. You can use it to create apps by using the Microsoft 365 Agents SDK or the Teams SDK. Alternatively, the Teams developer CLI provides a command-line based developer workflow.

## Additional resources

- [Bot Framework SDK documentation](/azure/bot-service/index-bf-sdk)
