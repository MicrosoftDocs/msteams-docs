---
title: Agent and App permissions
description: Teams agent and app permissions span Microsoft Entra ID and resource-specific consent (RSC). Learn how each model works.
ms.topic: article
ms.date: 11/24/2026
---

# Agent and app permissions

Permissions for Teams agents fall into two categories:

* Microsoft Entra ID and Graph permissions
* Resource-specific consent (RSC) permissions

:::image type="content" source="../../assets/images/teams-app-permissions-3.png" alt-text="The screenshot describes the different Teams app permissions." border="false":::

## Resource-specific consent (RSC)

Resource-specific consent (RSC) is the permissions model for Teams that scopes certain agent and app permissions to the resources - teams, chats, meetings, and user personal scopes - where users install them.
RSC permissions are a category of Microsoft Graph permissions that extend only to the teams, chats, meetings, and user personal scopes where they are installed.
Developers declare in the app manifest which RSC permissions their agents and apps need up front, and users are empowered to grant those permissions within the scope of the resources they control.
See [Resource-specific consent for Teams agents and apps](../rsc/resource-specific-consent.md) for more information.

<a name='azure-active-directory'></a>

## Microsoft Entra ID

Microsoft Entra ID is the identity and access management service used by Teams and Microsoft 365. See [Entra ID app registration: identity and authentication](../../agents-in-teams/registering-agent-teams-platform.md#entra-id-app-registration-identity-and-authentication) for more information.

### Microsoft Graph API permission

Graph API permissions are managed in Microsoft Entra ID. For your app to access data in Microsoft Graph, the user or administrator must grant it the correct permissions via a consent process. For more information, see [Microsoft Graph permissions](/graph/permissions-reference).
