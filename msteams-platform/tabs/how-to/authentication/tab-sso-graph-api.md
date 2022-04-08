---
title: Configure API permissions with Microsoft Graph
description: Describes configuring API permissions with Microsoft Graph
ms.topic: how-to
ms.localizationpriority: medium
keywords: teams authentication tabs Microsoft Azure Active Directory (Azure AD) Graph API
---
# Configure API permissions with Microsoft Graph

In this section, you'll learn to configure API permissions with Microsoft Graph, such as User.Read, email, offline_access, and more.

To configure API permissions:

1. Open a web browser to the [Azure portal](https://ms.portal.azure.com/).
   The Microsoft Azure AD Portal page opens.

1. Select **Manage** > **API permission** from the left pane.

    :::image type="content" source="../../../assets/images/authentication/teams-sso-tabs/api-permission-menu.png" alt-text="App permissions menu option." border="false":::

    The **API permissions** page appears.

1. Select **+ Add permissions** to add Microsoft Graph API permissions.

    :::image type="content" source="../../../assets/images/authentication/teams-sso-tabs/app-permission.png" alt-text="App permissions page." border="false":::

    The **Request API permissions** page appears.

1. Select **Microsoft Graph**.

    :::image type="content" source="../../../assets/images/authentication/teams-sso-tabs/request-api-permission.png" alt-text="Request API permissions page." border="true":::

    The options for Graph permissions display.

1. Select **Delegated permissions** to view the list of possible permission that you can select.

   :::image type="content" source="../../../assets/images/authentication/teams-sso-tabs/delegated-permission.png" alt-text="Delegated permissions." border="true":::

1. Select relevant permissions for your app. For this section, select **email** and **offline_access**, and then select **Add permissions**.

   :::image type="content" source="../../../assets/images/authentication/teams-sso-tabs/select-permission.png" alt-text="Select permissions." border="true":::

    A message pops up on the browser stating that the permissions were updated.

   :::image type="content" source="../../../assets/images/authentication/teams-sso-tabs/updated-permission-msg.png" alt-text="Permissions updated message." border="false":::

    The added permissions are displayed in the **API permissions** page.

   :::image type="content" source="../../../assets/images/authentication/teams-sso-tabs/configured-permissions.png" alt-text="API permissions are configured." border="true":::

    You've configured API permissions with Microsoft Graph.
