---
title: Manage Teams app permissions
author: surbhigupta
description: In this module, learn how Teams apps are managed in different places based on the feature.
ms.topic: reference
ms.localizationpriority: medium
ms.author: lomeybur
---

# Permissions in Teams app

Permission for Teams app is managed in two places, depending on the app feature:

* [Resource-specific consent (RSC)](#resource-specific-consent)
* [Azure Active Directory (Azure AD)](#azure-active-directory)

:::image type="content" source="../../assets/images/teams-app-permissions.png" alt-text="The screenshot describes the different Teams app permissions.":::

## Resource-specific consent

RSC is a Microsoft Teams and Microsoft Graph API integration that enables your app to use API endpoints to manage specific resources, either teams or chats, within an organization. For more information, see [enable resource-specific consent in Teams](../rsc/resource-specific-consent.md).

RSC permissions are only available to Teams apps installed on the Teams client and are currently not part of the Azure AD portal and are declared in the Teams app manifest (JSON) file.

## Azure Active Directory

Azure AD is a cloud-based identity and access management service. This service helps your employees access external resources, such as Microsoft 365, the Azure portal, and thousands of other SaaS applications. For more information, see [Azure Active Directory](/azure/active-directory/fundamentals/active-directory-whatis).

### Microsoft Graph API permission

Graph API permissions are managed in Azure AD. For your app to access data in Microsoft Graph, the user or administrator must grant it the correct permissions via a consent process. For more information, see [Microsoft Graph permissions](/graph/permissions-reference).

## Capability wise management

### Bot and messaging extension

The bot or messaging extension ID is generated based on the following registration platform. This ID is required to add a bot or messaging extension to a Teams app.

* Azure AD portal
* Developer or Bot Framework portal

#### Azure AD portal

When a bot or messaging extension is registered on Azure AD portal, it will have an Azure AD app ID associated with it, which can be found in **Azure AD** portal > **App Registrations**. Endpoints and other bot configurations are managed in the Azure portal.

#### Developer or Bot Framework portal

When a bot or messaging extension is registered in the Developer or Bot Framework portal, it will not have an Azure AD app ID. However, the bot or messaging extension ID can be found on the Bot Framework portal. Endpoints and other bot configurations are managed in the Bot Framework portal.

Other Teams specific configuration for the bot can be managed in the Developer portal section for the app.

### Connectors

Connectors have a connector ID and are registered and managed through the Connector Developer Dashboard. This ID is necessary for introducing a connector to the Teams App. Other Teams specific configuration for connectors can be managed in the developer portal section for the app.
