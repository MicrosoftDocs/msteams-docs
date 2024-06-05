---
title: Manage Teams app permissions
author: surbhigupta
description: In this module, learn how Teams apps are managed in different places based on the feature.
ms.topic: reference
ms.localizationpriority: medium
ms.author: lomeybur
ms.date: 10/31/2022
---

# Permissions in Teams app

Permission for Teams app is managed in two places, depending on the app feature:

* [Microsoft Entra ID](#azure-active-directory)
* [Resource-specific consent (RSC)](#resource-specific-consent)

:::image type="content" source="../../assets/images/teams-app-permissions-3.png" alt-text="The screenshot describes the different Teams app permissions." border="false":::

## Resource-specific consent

RSC is a Microsoft Teams and Microsoft Graph API integration that enables your app to use API endpoints to manage specific resources, either teams or chats, within an organization. For more information, see [enable resource-specific consent in Teams](../rsc/resource-specific-consent.md).

RSC permissions are only available to Teams apps installed on the Teams client and are currently not part of the Microsoft Entra admin center and are declared in the app manifest (previously called Teams app manifest) (JSON) file. You can manage RSC permissions for Teams apps in Developer Portal from the **Permissions** section under **Configure**.

:::image type="content" source="../../assets/images/dev-portal-permissions.png" alt-text="Screenshot shows the RSC permissions managed from Developer Portal. " lightbox="../../assets/images/dev-portal-permissions1.png":::

<a name='azure-active-directory'></a>

## Microsoft Entra ID

Microsoft Entra ID is a cloud-based identity and access management service. This service helps your employees access external resources, such as Microsoft 365, the Azure portal, and thousands of other SaaS applications. For more information, see [Microsoft Entra ID](/azure/active-directory/fundamentals/active-directory-whatis).

### Microsoft Graph API permission

Graph API permissions are managed in Microsoft Entra ID. For your app to access data in Microsoft Graph, the user or administrator must grant it the correct permissions via a consent process. For more information, see [Microsoft Graph permissions](/graph/permissions-reference).

## Capability wise management

### Bot and messaging extension

The bot or messaging extension ID is generated based on the following registration platform. This ID is required to add a bot or messaging extension to a Teams app.

* Microsoft Entra admin center
* Developer or Bot Framework portal

<a name='azure-ad-portal'></a>

#### Microsoft Entra admin center

When a bot or messaging extension is registered on Microsoft Entra admin center, it will have a Microsoft Entra app ID associated with it, which can be found in **Microsoft Entra admin center** > **App Registrations**. Endpoints and other bot configurations are managed in the Azure portal.

#### Developer or Bot Framework portal

When a bot or messaging extension is registered in the Developer or Bot Framework portal, it will not have a Microsoft Entra app ID. However, the bot or messaging extension ID can be found on the Bot Framework portal. Endpoints and other bot configurations are managed in the Bot Framework portal.

Other Teams specific configuration for the bot can be managed in the Developer portal section for the app.

### Connectors

Connectors have a connector ID and are registered and managed through the Connector Developer Dashboard. This ID is necessary for introducing a connector to the Teams App. Other Teams specific configuration for connectors can be managed in the developer portal section for the app.
