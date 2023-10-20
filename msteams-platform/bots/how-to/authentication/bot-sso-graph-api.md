---
title: Extend your app with Microsoft Graph permissions
description: Describes configuring API permissions with Microsoft Graph for bot and messaging extensipn apps.
ms.topic: how-to
ms.localizationpriority: high
---
# Extend your app with Microsoft Graph permissions and scopes

You can extend your bot and message extension apps by using Microsoft Graph. These permissions can allow app users to view user profile, to read mail, and more. Your app must ask for specific permission scopes to obtain the access tokens on app user's consent.

Graph scopes, such as `User.Read` or `Mail.Read`, lets you specify how your app accesses a Teams user's account. You need to specify your scopes in the authorization request.

In this section, you'll learn to [Configure API permissions in Azure AD](#configure-api-permissions-in-azure-ad).

## Configure API permissions in Azure AD

You can configure Graph scopes in Azure AD as required for your app. Delegated permissions are used by apps that require signed-in access. An app user or administrator who is signed-in must consent to them. Your app can consent on behalf of the signed-in user when it calls Microsoft Graph.

### To configure API permissions

1. Open the app you registered in the [Azure portal](https://ms.portal.azure.com/).

2. Select **Manage** > **API permissions** from the left pane.

    :::image type="content" source="../../../assets/images/authentication/teams-sso-bots/api-permission-menu.png" alt-text="Screenshot shows the API permissions menu option." :::

    The **API permissions** page appears.

3. Select **+ Add a permission** to add Microsoft Graph API permissions.

    :::image type="content" source="../../../assets/images/authentication/teams-sso-bots/app-permission.png" alt-text="Screenshot shows the API permissions page to add a permission." :::

    The **Request API permissions** page appears.

4. Select **Microsoft Graph**.

    :::image type="content" source="../../../assets/images/authentication/teams-sso-bots/request-api-permission.png" alt-text="Screenshot shows the Request API permissions page with Microsoft Graph option highlighted." :::

    The options for Graph permissions display.

5. Select **Delegated permissions** to view the list of permissions.

   :::image type="content" source="../../../assets/images/authentication/teams-sso-bots/delegated-permission.png" alt-text="Screenshot shows the Delegated permissions option highlighted." :::

6. Select relevant permissions for your app, and then select **Add permissions**.

   :::image type="content" source="../../../assets/images/authentication/teams-sso-bots/select-permission.png" alt-text="Screenshot shows the selection of permissions to add." :::

    You can also enter the permission name in the search box to find it.

    A message appears on the browser stating that the permissions were updated.

   :::image type="content" source="../../../assets/images/authentication/teams-sso-bots/updated-permission-msg.png" alt-text="Screenshot shows the permissions updated message." :::

    The added permissions are displayed in the **API permissions** page.

   :::image type="content" source="../../../assets/images/authentication/teams-sso-bots/configured-permissions.png" alt-text="Screenshot shows the configured API permissions." :::

    You've configured your app with Microsoft Graph permissions.

After you've completed the configuration in Azure AD, you must update the code to acquire access token for Microsoft Graph. For more information, see [Bot framework SDK](https://github.com/OfficeDev/Microsoft-Teams-Samples/blob/main/samples/bot-teams-authentication/csharp/SimpleGraphClient.cs).

The app user is prompted to consent for Graph permissions on the first time they use it. After the app user gives consent, the Graph permissions are granted.
