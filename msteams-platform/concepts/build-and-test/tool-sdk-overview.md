---
title: Teams Platform Toolks and SDKs
author: nickwalkmsft
description: TODO
ms.localizationpriority: medium
ms.topic: overview
ms.author: nickwalk
ms.reviewer: nickwalk
ms.date: 08/18/2026
---

# Tools and SDKs

Build and develop your Microsoft Teams agents and apps using SDKs, libraries, and tools. Microsoft provides a comprehensive platform to create, develop, test, debug, and publish your Teams agents and apps seamlessly, making the entire process efficient and streamlined. Teams offers the following platform:

## Core SDKs, libraries and tools

[Teams SDK and developer CLI](/microsoftteams/platform/teams-sdk/welcome) form the main developer toolkit for building conversational agents and other app experiences in Teams. The SDK is developed alongside the Teams platform and and exposes the full range of platform features, enabling developers to build apps that integrate deeply with Teams and take advantage of its unique features that make it so effective for collaborative work. The developer CLI provides tools for creating, configuring, and managing Teams agents and apps.

[Teams Developer Portal](teams-developer-portal.md) is the primary tool for configuration management and distribution of Teams agents and apps. With Developer Portal, you can create a basic app manifest (previously known as Teams app manifest) and publish an agent or app to the Teams store or an organizational app catalog.

The [Microsoft 365 Agents SDK](/microsoft-365/agents-sdk/agents-sdk-overview?tabs=csharp) is an alternative that enables creation of extensible, multi-channel agents that can operate across Microsoft 365 experiences and are compatible with Microsoft Teams. It provides a unified development model for agent orchestration, lifecycle management, and integration with AI services of your choice.

The [Microsoft 365 Agents Toolkit](../../toolkit/overview-agents-toolkit.md) is a suite of developer tools for building agents and apps with the Microsoft 365 Agents SDK and Teams SDK.

> [!NOTE]
> Using a preview SDK does not automatically restrict marketplace publication, provided the app meets supported platform, compliance, and validation requirements.

## Supporting SDKs and libraries

- [Microsoft Graph SDKs](/graph/sdks/sdks-overview): The Microsoft Graph SDKs are designed to simplify the creation of high-quality, efficient, and resilient applications that access Microsoft Graph. The SDKs include two components such as service library and core library.
- [TeamsJS client library](~/tabs/how-to/using-teams-client-library.md): The Teams JavaScript client library (TeamsJS) enables you to create hosted experiences within Teams, Microsoft 365 app, and Outlook. These experiences involve hosting your app content in an iFrame.
- [SharePoint Framework (SPFx)](/sharepoint/dev/spfx/sharepoint-framework-overview): The SharePoint Framework (SPFx) offers a page and web part model that fully supports client-side SharePoint development, seamlessly integrates with SharePoint data, and extends Microsoft Teams and Microsoft Viva.
- [Live Share SDK](~/apps-in-teams-meetings/teams-live-share-overview.md) | Live Share is an SDK created to turn Teams apps into collaborative multi-user experiences without requiring dedicated back-end code to be written.
