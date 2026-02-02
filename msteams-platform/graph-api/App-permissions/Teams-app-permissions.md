---
title: Manage Teams app permissions
author: surbhigupta
description: Learn how Teams apps are managed in Microsoft Entra ID and resource-specific consent (RSC) based on the feature and capability wise management.
ms.topic: reference
ms.localizationpriority: medium
ms.author: lomeybur
ms.owner: vishachadha
ms.date: 10/31/2022
---

# Permissions in Teams app

You manage permissions for Teams apps in two locations, depending on the app feature:

* [Microsoft Entra ID](#azure-active-directory)
* [Resource-specific consent (RSC)](#resource-specific-consent)

:::image type="content" source="../../assets/images/teams-app-permissions-3.png" alt-text="The screenshot describes the different Teams app permissions." border="false":::

## Resource-specific consent

RSC integrates Microsoft Teams and Microsoft Graph API, allowing your app to use API endpoints to manage specific resources, like teams or chats, within an organization. For more details, see [enable resource-specific consent in Teams](../rsc/resource-specific-consent.md).

RSC permissions are available only to Teams apps installed on the Teams client. They aren't part of the Microsoft Entra admin center and are declared in the app manifest (previously called Teams app manifest) (JSON) file. You manage RSC permissions for Teams apps in Developer Portal from the **Permissions** section under **Configure**.

:::image type="content" source="../../assets/images/dev-portal-permissions.png" alt-text="Screenshot shows the RSC permissions managed from Developer Portal. " lightbox="../../assets/images/dev-portal-permissions1.png":::

<a name='azure-active-directory'></a>

## Microsoft Entra ID

Microsoft Entra ID is a cloud-based identity and access management service. It helps your employees access external resources, such as Microsoft 365, the Azure portal, and thousands of other SaaS applications. For more information, see [Microsoft Entra ID](/azure/active-directory/fundamentals/active-directory-whatis).

### Microsoft Graph API permission

You manage Graph API permissions in Microsoft Entra ID. For your app to access data in Microsoft Graph, the user or administrator must grant it the correct permissions through a consent process. For more information, see [Microsoft Graph permissions](/graph/permissions-reference).

## Capability wise management

### Bot and messaging extension

The bot or messaging extension ID is generated based on the registration platform. This ID is necessary to add a bot or messaging extension to a Teams app.

* Microsoft Entra admin center
* Developer or Bot Framework portal

<a name='azure-ad-portal'></a>

#### Microsoft Entra admin center

When you register a bot or message extension in Microsoft Entra admin center, it has a Microsoft Entra app ID associated with it, which you can find in **Microsoft Entra admin center** > **App Registrations**. You manage endpoints and other bot configurations in Azure portal.

#### Developer or Bot Framework portal

When you register a bot or message extension in Developer or Bot Framework portal, it doesn't have a Microsoft Entra app ID. However, you can find the bot or message extension ID on the Bot Framework portal. You manage endpoints and other bot configurations in the Bot Framework portal.

You can manage other Teams-specific configurations for the bot in the Developer portal section for the app.

### Connectors

Connectors have a connector ID and are registered and managed through the Connector Developer Dashboard. This ID is necessary for introducing a connector to the Teams App. You can manage other Teams-specific configurations for connectors in the developer portal section for the app.