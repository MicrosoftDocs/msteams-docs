---
title: Agent and App permissions
description: Learn how Teams apps are managed in Microsoft Entra ID and resource-specific consent (RSC) based on the feature and capability wise management.
ms.topic: article
ms.date: 11/24/2026
---

# Agent and app permissions

Permission for Teams agents and apps are managed in two places, depending on the app feature:

* [Microsoft Entra ID](#azure-active-directory)
* [Resource-specific consent (RSC)](#resource-specific-consent-rsc)

:::image type="content" source="../../assets/images/teams-app-permissions-3.png" alt-text="The screenshot describes the different Teams app permissions." border="false":::

## Resource-specific consent (RSC)

Resource-specific consent (RSC) is the permissions model for Teams that scopes certain agent and app permissions to the resources - teams, chats, meetings, and user personal scopes - where users install them. See [Resource-specific consent for Teams agents and apps](../rsc/resource-specific-consent.md) for more information.

<a name='azure-active-directory'></a>

## Microsoft Entra ID

Microsoft Entra ID is the identity and access management service used by Teams and Microsoft 365. See [Entra ID app registration: identity and authentication](../../agents-in-teams/registering-agent-teams-platform.md#entra-id-app-registration-identity-and-authentication) for more information.

### Microsoft Graph API permission

Graph API permissions are managed in Microsoft Entra ID. For your app to access data in Microsoft Graph, the user or administrator must grant it the correct permissions via a consent process. For more information, see [Microsoft Graph permissions](/graph/permissions-reference).
