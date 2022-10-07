---
title: Manage Teams app permissions
author: surbhigupta
description: In this module, learn how Teams apps are managed in different places based on the feature.
ms.topic: reference
ms.localizationpriority: medium
ms.author: lomeybur
---

# Teams app permissions

Microsoft Teams apps are managed in different places depending on app features.

:::image type="content" source="../../assets/images/teams-app-permissions.png" alt-text="The screenshot describes the different Teams app permissions.":::

## Resource-specific consent

Resource-specific consent (RSC) is a Microsoft Teams and Microsoft Graph API integration that enables your app to use API endpoints to manage specific resources, either Teams or chats, within an organization.

RSC permissions are defined in the app manifest and not in Azure Active Directory (Azure AD). You grant consent to RSC permissions when you add the app to a team. For more information, see [enable resource-specific consent in Teams](../rsc/resource-specific-consent.md).

## Azure active directory

Azure AD is a cloud-based identity and access management service. This service helps your employees access external resources, such as Microsoft 365, the Azure portal, and thousands of other SaaS applications. For more information, see [Azure Active Directory](/azure/active-directory/fundamentals/active-directory-whatis).

When you create an app in Azure AD, an application ID, or Client ID, is generated. The application ID, or client ID, is a value the Microsoft identity platform assigns to your application when you register it in Azure AD.

The application ID is a GUID value that uniquely identifies the application and its configuration within the identity platform. You add the app ID to your application's code, and authentication libraries include the value in their requests to the identity platform at application runtime.

In Azure AD, all users are granted a set of default permissions. A user's access consists of the type of user, their role assignments, and their ownership of individual objects. For more information, see [Azure AD default user permissions](/azure/active-directory/fundamentals/users-default-permissions).

## App capability specifics

Microsoft Teams apps are a way to aggregate one or more capabilities into apps that can be installed, upgraded, and uninstalled. Capabilities of apps include:

* Bots
* Messaging extensions
* Connectors

For more information, see [Microsoft Teams apps permissions and considerations](/microsoftteams/app-permissions).

### Microsoft Graph API permission

For your app to access data in Microsoft Graph, the user or administrator must grant it the correct permissions via a consent process. This topic lists the permissions associated with each major set of Microsoft Graph APIs. It also provides guidance about how to use the permissions. For more information, see [Microsoft Graph permissions](/graph/permissions-reference).

### Connectors

Connect has a connector ID where permissions are directly configured in the connector portal to perform actions. For example, if you want to send an actionable message, you need to use the connector portal to enable that permission. With Microsoft Teams apps, you can add your existing Office 365 Connector or build a new one within Teams. For more information, see [build your own connector](/outlook/actionable-messages/connectors-dev-dashboard).

## See also

* [What is Azure Active Directory?](/azure/active-directory/fundamentals/active-directory-whatis)
