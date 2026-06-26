---
title: Legacy Tools and SDKs for Teams app development
description: Legacy Teams app frameworks like TeamsFx and Bot Framework are no longer supported. Learn about these older tools and plan your migration to current solutions today.
author: nickwalkmsft
ms.author: nickwalk
ms.date: 06/23/2026
ms.topic: overview
---

# Legacy Teams app and agent development frameworks

This article briefly describes SDKs and tools for Teams app development that are now deprecated and no longer supported, along with their recommended replacements.

**New Teams app and agent development should not make use of any of the items in this list.** Existing solutions that use any of these items should be migrated to current SDKs and tools.

## Bot Framework SDK (BotBuilder)

The Bot Framework SDK, also called BotBuilder SDK, was used to build cross-platform bots compatible with Teams. The name "Bot Framework" is still used to refer to a larger ecosystem of cloud service and infrastructure components that remain an important part of the Teams platform, but the Bot Framework SDK is no longer supported as an SDK for creating bots or agents.

Teams SDK is the successor to the Bot Framework SDK for agents that specifically target Teams and seek to make full use of its conversational features and collaborative surface. Microsoft Agents 365 SDK should be used for agents that need compatibility with multiple conversational platforms.

TODO migration guidance link.

TODO link to app model page

TODO <https://learn.microsoft.com/en-us/azure/bot-service/bot-service-overview>

## Teams AI Library

Teams AI Library was the direct predecessor of Teams SDK. Existing solutions that use any versions of Teams AI Library should migrate to the current version of Teams SDK.

## TeamsFx SDK (TypeScript and .NET)

TeamsFx was an SDK that simplified some aspects of Teams app development, including authentication, Microsoft Graph access, configuration, and deployment.

New Teams app and agent development should use Teams SDKExisting Teams applications that use TeamsFx should

It is now superseded by the Teams SDK and Microsoft 365 Agents SDK for new development.

integrated with teams toolkit

TeamsFx is a legacy framework used to build Teams apps and agents. It's no longer supported.

## Teams Toolkit

Teams Toolkit was previously the main developer tooling experience for Teams app development, comprised of a command-line tool and extensions for Visual Studio Code and Visual Studio. Teams Toolkit integrated with TeamsFx and offered support for creating, debugging, provisioning, and deploying Teams applications.

Teams Toolkit is most directly succeeded by the Microsoft 365 Agents Toolkit, which can be used to create apps using the Microsoft 365 Agents SDK or the Teams SDK. Alternatively, the Teams developer CLI facilitates its own command-line based developer workflow.
