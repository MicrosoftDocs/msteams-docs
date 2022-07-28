---
title: Extend app with Microsoft Graph permissions
description: Describes configuring API permissions with Microsoft Graph for message extension app
ms.topic: how-to
ms.localizationpriority: high
---
# Extend app with Microsoft Graph permissions and scope

You can extend your bot app by using Microsoft Graph. These permissions can allow app users to view user profile, to read mail, and more. Your app must ask for specific permission scopes to obtain the access tokens on app user's consent.

Graph scopes, such as `User.Read` or `Mail.Read`, lets you specify how your app accesses a Teams user's account. You need to specify your scopes in the authorization request.

In this section, you'll learn to:

- [Configure API permissions in Azure AD](#configure-api-permissions-in-azure-ad)
- [Configure authentication for different platforms](#configure-authentication-for-different-platforms)
- [Acquire access token for MS Graph](#acquire-access-token-for-ms-graph)

## Configure API permissions in Azure AD

You can configure more Graph scopes in Azure AD as required for your app. Delegated permissions are used by apps that require signed-in access. A signed-in app user or administrator must consent to them. Your bot app can consent on behalf of the signed-in user when it calls Microsoft Graph.

### To configure API permissions

1. Open the app you registered in the [Azure portal](https://ms.portal.azure.com/).

2. Select **Manage** > **API permission** from the left pane.

    :::image type="content" source="../../../assets/images/authentication/teams-sso-tabs/api-permission-menu.png" alt-text="App permissions menu option." border="true":::

    The **API permissions** page appears.

3. Select **+ Add permissions** to add Microsoft Graph API permissions.

    :::image type="content" source="../../../assets/images/authentication/teams-sso-tabs/app-permission.png" alt-text="App permissions page." border="true":::

    The **Request API permissions** page appears.

4. Select **Microsoft Graph**.

    :::image type="content" source="../../../assets/images/authentication/teams-sso-tabs/request-api-permission.png" alt-text="Request API permissions page." border="true":::

    The options for Graph permissions display.

5. Select **Delegated permissions** to view the list of permissions.

   :::image type="content" source="../../../assets/images/authentication/teams-sso-tabs/delegated-permission.png" alt-text="Delegated permissions." border="true":::

6. Select relevant permissions for your app, and then select **Add permissions**.

   :::image type="content" source="../../../assets/images/authentication/teams-sso-tabs/select-permission.png" alt-text="Select permissions." border="true":::

    You can also enter the permission name in the search box to find it.

    A message pops up on the browser stating that the permissions were updated.

   :::image type="content" source="../../../assets/images/authentication/teams-sso-tabs/updated-permission-msg.png" alt-text="Permissions updated message." border="false":::

    The added permissions are displayed in the **API permissions** page.

   :::image type="content" source="../../../assets/images/authentication/teams-sso-tabs/configured-permissions.png" alt-text="API permissions are configured." border="true":::

    You've configured your app with Microsoft Graph permissions.

## Configure authentication for different platforms

Configuration for authentication depends on the platform or device where you want to target your app. You may need to configure redirect URIs, specific authentication settings, or details specific to the platform.

> [!NOTE]
>
> - If your bot app hasn't been granted IT admin consent, app users have to provide consent the first time they use your app on a different platform.
> - Implicit grant is not required if SSO is enabled on a bot app.

You can configure authentication for multiple platforms as long as the URL is unique.

### To configure authentication for a platform

1. Open the app you registered in the [Azure portal](https://ms.portal.azure.com/).

1. Select **Manage** > **Authentication** from the left pane.

    :::image type="content" source="../../../assets/images/authentication/teams-sso-tabs/azure-portal-platform.png" alt-text="Authenticate for platforms" border="true":::

    The **Platform configurations** page appears.

1. Select **+ Add a platform**.

    :::image type="content" source="../../../assets/images/authentication/teams-sso-tabs/add-platform.png" alt-text="Add a platforms" border="true":::

    The **Configure platforms** page appears.

1. Select the platform that you want to configure for your bot app. You can choose the platform type from web or SPA.

    :::image type="content" source="../../../assets/images/authentication/teams-sso-tabs/configure-platform.png" alt-text="Select web platform" border="true":::

    You can configure multiple platforms for a particular platform type. Ensure that the redirect URI is unique for every platform you configure.

    The Configure Web page appears.

    > [!NOTE]
    > The configurations will be different based on the platform you select.

1. Enter the configuration details for the platform.

    :::image type="content" source="../../../assets/images/authentication/teams-sso-tabs/config-web-platform.png" alt-text="Configure web platform" border="true":::

    1. Enter the redirect URI. The URI should be unique.
    2. Enter the front-channel log-out URL.
    3. Select the tokens you want Azure AD to send for your app.

1. Select **Configure**.

    The platform is configured and displayed in the **Platform configurations** page.

## Acquire access token for MS Graph

You'll need to acquire access token for Microsoft Graph.

### Configure code to fetch access token

The following code provides an example of using the access token obtained in the OAuth process to submit a request for permissions to Microsoft Graph.

```TypeScript
    public async displayMicrosoftGraphDataStep(stepContext: WaterfallStepContext): Promise<DialogTurnResult> {
      // get token from prev step (or directly from the prompt itself)
      const tokenResponse = stepContext.result;
      if (!tokenResponse?.token) {
        await stepContext.context.sendActivity("Login not successful, please try again.");
      } else {
        const msGraphClient = new MsGraphHelper(tokenResponse?.token);
    
        const user = await msGraphClient.getCurrentUser();
        await stepContext.context.sendActivity(`Thank you for signing in ${user.displayName as string} (${user.userPrincipalName as string})!`);
        await stepContext.context.sendActivity(`I can retrieve your details from Microsoft Graph using my support for SSO! For example...`);
    
        const email = await msGraphClient.getMostRecentEmail();
        await stepContext.context.sendActivity(`Your most recent email about "${email.subject as string}" was received at ${new Date(email.receivedDateTime as string).toLocaleString()}.`);
      }

      return await stepContext.endDialog();
    }
```

When you run the bot, the first time the app user interacts with the bot, the app user is prompted to consent for Graph permissions. After the app user gives consent, the Graph permissions are granted.
