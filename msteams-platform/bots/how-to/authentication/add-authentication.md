---
title: Add OAuth authentication to a Teams bot
description: Create an Azure Bot resource, configure OAuth and Teams SSO with Microsoft Entra ID, deploy a Teams SDK sample to Azure, and test sign-in in Teams.
ms.topic: tutorial
ms.localizationpriority: high
ms.date: 10/23/2026
---

# Tutorial - Add OAuth authentication to a Teams bot

<a name="add-authentication-to-your-teams-bot"></a>

In this end-to-end tutorial, you configure OAuth 2.0 authentication with Microsoft Entra ID, deploy a Teams SDK bot to Azure, and test it in Microsoft Teams. OAuth lets the bot access resources on behalf of a user without collecting the user's password. The Bot Auth Quickstart sample also uses Teams single sign-on (SSO) to reuse the user's Teams identity and retrieve their Microsoft Graph profile.

> [!TIP]
> Already have a bot and only need OAuth setup? See [Configure OAuth authentication for a Teams bot](configure-oauth.md). You don't need to work through resource provisioning and deployment to configure an OAuth connection.

The Azure Bot Token Service flow requires an **Azure Bot resource**, regardless of where you host the bot code. Registration connects the bot to the service and its OAuth connection settings; it doesn't deploy the bot's web service. This tutorial uses Azure App Service for hosting, but you can host the code elsewhere or test locally through a public HTTPS tunnel.

In this tutorial, you:

1. Create or reuse a resource group and App Service plan for Azure hosting.
1. Register an Azure Bot resource and enable the Microsoft Teams channel.
1. Configure Microsoft Entra ID, an OAuth connection, and Teams SSO.
1. Configure and deploy the sample in your preferred language.
1. Install the app in Teams and test `signin`, `profile`, and `signout`.

If you already have hosting resources, skip to [Create Azure Bot resource registration](#create-azure-bot-resource-registration). If your bot is already registered in Azure, continue with [Create the identity provider](#create-the-identity-provider). For background on the protocol, see [OAuth 2.0](https://oauth.net/2/).

## Prerequisites

- Knowledge of [bot basics](/microsoftteams/platform/bots/bot-concepts) and the [Teams SDK](/microsoftteams/platform/teams-sdk/welcome).
- Knowledge of Azure and OAuth 2.0 development.
- Git and the language-specific tools listed below. Install Visual Studio Code with Microsoft 365 Agents Toolkit if you use the sample's Toolkit deployment workflow.
- Azure account. If needed, you can create an [Azure free account](https://azure.microsoft.com/pricing/purchase-options/azure-account?cid=msft_learn).
- A Teams account with permission to upload custom apps, and permission to configure app registrations and grant consent in your test tenant.
- The following sample:

    | Sample |
    | :--- |
    | **Bot Auth Quickstart** in [cs-auth-sample][teams-bot-auth-quickstart-cs] |
    | **Bot Auth Quickstart** in [js-auth-sample][teams-bot-auth-quickstart-js] |
    | **Bot Auth Quickstart** in [py-auth-sample][teams-bot-auth-quickstart-py] |

Use the following paths relative to `samples/TeamsSDK/bot-auth-quickstart` in the sample repository:

| Implementation | Required tools | Runtime project folder | App package folder |
| --- | --- | --- | --- |
| C#/.NET | .NET 10 SDK; a Visual Studio version that supports .NET 10 if using the IDE. | `dotnet/bot-auth-quickstart/BotAuthQuickstart` | `dotnet/bot-auth-quickstart/M365Agent/appPackage` |
| TypeScript (Node.js) | Node.js LTS and npm. | `nodejs/bot-auth-quickstart` | `nodejs/bot-auth-quickstart/appPackage` |
| Python | Python 3.11 or later, below 4.0, with pip and a virtual environment. | `python/bot-auth-quickstart` | `python/bot-auth-quickstart/appPackage` |

For .NET, the runtime project and the `M365Agent` packaging/deployment project are siblings. Don't look for `appPackage` inside `BotAuthQuickstart`.

## Create the resource group

Use a resource group to organize the Azure resources in this tutorial. You can reuse an existing resource group. The App Service plan is for hosting the bot in Azure App Service, not for enabling OAuth.

You use a resource group to create individual resources for the bot. For performance, ensure that these resources are located in the same Azure region.

1. In your browser, sign into the [**Microsoft Azure portal**][azure-portal].
1. In the left navigation panel, select **Resource groups**.
1. In the upper left of the displayed window, select **Add** tab to create a new resource group. Provide the following details:
    1. **Subscription**. Use your existing subscription.
    1. **Resource group**. Enter the name for the resource group. An example could be  *TeamsResourceGroup*. Remember that the name must be unique.
    1. From the **Region** dropdown menu, select *West US*, or a region close to your applications.
    1. Select the **Review and create** button. You should see a banner that reads *Validation passed*.
    1. Select the **Create** button. It might take a few minutes to create the resource group.

> [!TIP]
> As with the resources you'll create later in this tutorial, it's a good idea to pin this resource group to your dashboard for easy access. If you'd like to do so, select the pin icon &#128204; in the upper right of the dashboard.

> [!div class="nextstepaction"]
> [I ran into an issue](https://github.com/MicrosoftDocs/msteams-docs/issues/new?template=Doc-Feedback.yaml&title=%5BI+ran+into+an+issue%5D+Create+the+resource+group&&author=%40vikasalmal&pageUrl=https%3A%2F%2Flearn.microsoft.com%2Fen-us%2Fmicrosoftteams%2Fplatform%2Fbots%2Fhow-to%2Fauthentication%2Fadd-authentication%3Ftabs%3Ddotnet%252Cdotnet-sample%23create-the-resource-group&contentSourceUrl=https%3A%2F%2Fgithub.com%2FMicrosoftDocs%2Fmsteams-docs%2Fblob%2Fmain%2Fmsteams-platform%2Fbots%2Fhow-to%2Fauthentication%2Fadd-authentication.md&documentVersionIndependentId=70952f91-56e9-ff08-59f6-e237d4aaeca9&platformId=cc53b20b-69e0-cb70-1ca7-9b939c969c92&metadata=*%2BID%253A%2Be473e1f3-69f5-bcfa-bcab-54b098b59c80%2B%250A*%2BService%253A%2B%2A%2Amsteams%2A%2A)

## Create the service plan

Skip this section if you already have a suitable App Service plan or plan to host the bot elsewhere. Azure hosting can incur charges; choose a pricing tier appropriate for your test environment.

1. In the [**Azure portal**][azure-portal], on the left navigation panel, select **Create a resource**.
1. In the search box, type *App Service Plan*. Select the **App Service Plan** card from the search results.
1. Select **Create**.
1. Provide the following information:
    1. **Subscription**. You can use an existing subscription.
    1. **Resource Group**. Select the group you created earlier.
    1. **Name**. Enter the name for the service plan. An example could be  *TeamsServicePlan*. Remember that the name must be unique, within the group.
    1. **Operating System**. Select *Windows* or your applicable OS.
    1. **Region**. Select *West US* or a region close to your applications.
    1. **Pricing Tier**. Select *Standard S1*, which is the default value.
    1. Select the **Review and create** button. You should see a banner that reads *Validation passed*.
    1. Select **Create**. It might take a few minutes to create the app service plan. The plan is listed in the resource group.

> [!div class="nextstepaction"]
> [I ran into an issue](https://github.com/MicrosoftDocs/msteams-docs/issues/new?template=Doc-Feedback.yaml&title=%5BI+ran+into+an+issue%5D+Create+the+service+plan&&author=%40vikasalmal&pageUrl=https%3A%2F%2Flearn.microsoft.com%2Fen-us%2Fmicrosoftteams%2Fplatform%2Fbots%2Fhow-to%2Fauthentication%2Fadd-authentication%3Ftabs%3Ddotnet%252Cdotnet-sample%23create-the-service-plan&contentSourceUrl=https%3A%2F%2Fgithub.com%2FMicrosoftDocs%2Fmsteams-docs%2Fblob%2Fmain%2Fmsteams-platform%2Fbots%2Fhow-to%2Fauthentication%2Fadd-authentication.md&documentVersionIndependentId=70952f91-56e9-ff08-59f6-e237d4aaeca9&platformId=cc53b20b-69e0-cb70-1ca7-9b939c969c92&metadata=*%2BID%253A%2Be473e1f3-69f5-bcfa-bcab-54b098b59c80%2B%250A*%2BService%253A%2B%2A%2Amsteams%2A%2A)

## Create Azure Bot resource registration

The Azure Bot resource registers your web service with Azure Bot Service and associates it with a bot identity. This tutorial uses a single-tenant bot with a client secret.

> [!IMPORTANT]
> An Azure Bot resource is required for the OAuth connection used here, even when you host your bot outside Azure. If you already have an Azure Bot resource, reuse it. A bot created only through [Developer Portal](../../../concepts/build-and-test/teams-developer-portal.md) doesn't provide these Azure OAuth connection settings.

1. Visit [**Azure portal**][azure-portal] and search for **Azure Bot** in **Create a resource** section.
1. Open the **Azure Bot** and select **Create**.
1. Enter bot handle name in **Bot handle** field.
1. Select your **Subscription** from the dropdown list.
1. Select your **Resource group** from the dropdown list.
1. Select **Single Tenant** for **Type of App** under **Microsoft App ID**.

    >[!IMPORTANT]
    >
    > - The **Multi Tenant** bot type in **Azure Bot Service** is deprecated. Existing Multi Tenant bots continue to work for now.
    > - All new bot registrations must either use the **Single Tenant** bot type or the **User-Assigned Managed Identity** type.
    > - When registering your Entra app in Azure portal, you can still select the **Accounts in any organizational directory (Multi Tenant)** option. This enables your bot to work across multiple tenants, even outside the tenant where the app is registered, when using one of the supported bot types.
    > - Set the bot runtime's **TENANT_ID** to the tenant containing the **bot identity**. The identity-provider application's tenant setting is configured separately in the OAuth connection.

1. Select **Review + create**.

1. If the validation passes, select **Create**.

    Azure provisions your bot.

1. Select **Go to resource**. The bot and the related resources are listed in the resource group.

    Your Azure bot is created.

For a bot that uses a user-assigned managed identity instead, follow the identity-specific configuration in [Add authentication to a bot](/azure/bot-service/bot-builder-authentication). Don't create a bot client secret for a managed identity.

To create client secret:

1. In **Settings**, select **Configuration**. Save the **Microsoft App ID** (client ID) for future reference.

1. Next to **Microsoft App ID**, select **Manage**.

1. In the **Client secrets** section, select **New client secret**. **Add a client secret** window appears.

1. Enter **Description** and select **Add**.

1. In the **Value** column, select **Copy to clipboard** and store the secret value securely. Use the **Value**, not the secret ID. Also record the bot identity's directory (tenant) ID.

> [!CAUTION]
> Don't commit client secrets or access tokens to source control or include them in screenshots, chat messages, or logs.

To add the Microsoft Teams channel:

1. Go to **Home**.

1. Open your bot from the **Recent resources** section.

1. Select **Channels** in the left pane and select **Microsoft Teams** :::image type="icon" source="../../../assets/icons/teams-icon.png":::.

1. Select the checkbox to accept the terms of service and select **Agree**.</br>

1. Select **Save**.

For more information, see [Connect a bot to Microsoft Teams](/azure/bot-service/channel-connect-teams).

> [!div class="nextstepaction"]
> [I ran into an issue](https://github.com/MicrosoftDocs/msteams-docs/issues/new?template=Doc-Feedback.yaml&title=%5BI+ran+into+an+issue%5D+Create+Azure+Bot+resource+registration&&author=%40vikasalmal&pageUrl=https%3A%2F%2Flearn.microsoft.com%2Fen-us%2Fmicrosoftteams%2Fplatform%2Fbots%2Fhow-to%2Fauthentication%2Fadd-authentication%3Ftabs%3Ddotnet%252Cdotnet-sample%23create-azure-bot-resource-registration&contentSourceUrl=https%3A%2F%2Fgithub.com%2FMicrosoftDocs%2Fmsteams-docs%2Fblob%2Fmain%2Fmsteams-platform%2Fbots%2Fhow-to%2Fauthentication%2Fadd-authentication.md&documentVersionIndependentId=70952f91-56e9-ff08-59f6-e237d4aaeca9&platformId=cc53b20b-69e0-cb70-1ca7-9b939c969c92&metadata=*%2BID%253A%2Be473e1f3-69f5-bcfa-bcab-54b098b59c80%2B%250A*%2BService%253A%2B%2A%2Amsteams%2A%2A)

## Create the identity provider

This tutorial uses Microsoft Entra ID as the identity provider. Keep the bot identity credentials separate from the identity-provider application credentials: the former authenticate the bot to the service, and the latter authorize access on behalf of users.

For OAuth setup without deployment or SSO, see [Register the identity-provider application](configure-oauth.md#register-the-identity-provider-application).

1. In the [**Azure portal**][azure-portal], on the left navigation panel, select **Microsoft Entra ID**.
    > [!TIP]
    > You must create and register this Microsoft Entra resource in a tenant in which you can consent to delegate permissions requested by an application. For instructions on creating a tenant, see [Access the portal and create a tenant](/azure/active-directory/fundamentals/active-directory-access-create-new-tenant).
1. In the left panel, select **App registrations**.
1. In the right panel, select the **New registration** tab, in the upper left.
1. Provide the following information:
   1. **Name**. Enter the name for the application. An example could be  *BotTeamsIdentity*. Remember that the name must be unique.
   1. Select the **Supported account types** for your intended users. For a single-tenant test, select **Accounts in this organizational directory only**.
   1. For the **Redirect URI**:<br/>
       &#x2713;Select **Web**. <br/>
       &#x2713; Set the URL to `https://token.botframework.com/.auth/web/redirect`.
   1. Select **Register**.

1. After Azure creates the app, it displays the **Overview** page for the app. Copy and save the following information to a file:

    1. The **Application (client) ID** value. Use this value later as the *Client ID* when you register this Azure identity application with your bot.
    1. The **Directory (tenant) ID** value. Use this value later as the *Tenant ID* when you register this Azure identity application with your bot.

1. In the left panel, select **Certificates & secrets** to create a client secret for your application.

   1. Under **Client secrets**, select &#x2795; **New client secret**.
   1. Add a description to identify this secret from others you might need to create for this app, such as *Bot identity app in Teams*.
   1. Set **Expires** to your selection.
   1. Select **Add**.
   1. Before leaving this page, **record the secret**. Use this value later as the *Client secret* when you register your Microsoft Entra application with your bot.

1. Select **API permissions** > **Add a permission** > **Microsoft Graph** > **Delegated permissions**. Add `User.Read` for the sample's profile command. Obtain admin consent if required by your tenant.
1. Complete the SSO-specific setup in [Configure your app in Microsoft Entra ID](bot-sso-register-aad.md) for this identity-provider app: expose an API with an application ID URI and `access_as_user` scope, authorize the Teams clients, and configure the access token version. Save the application ID URI for the OAuth connection and app manifest.

> [!NOTE]
> This tutorial uses the default public-cloud redirect URI. For other clouds or regional data residency, use [Supported OAuth URLs](/azure/bot-service/ref-oauth-redirect-urls).

> [!div class="nextstepaction"]
> [I ran into an issue](https://github.com/MicrosoftDocs/msteams-docs/issues/new?template=Doc-Feedback.yaml&title=%5BI+ran+into+an+issue%5D+Create+the+identity+provider&&author=%40vikasalmal&pageUrl=https%3A%2F%2Flearn.microsoft.com%2Fen-us%2Fmicrosoftteams%2Fplatform%2Fbots%2Fhow-to%2Fauthentication%2Fadd-authentication%3Ftabs%3Ddotnet%252Cdotnet-sample%23create-the-identity-provider&contentSourceUrl=https%3A%2F%2Fgithub.com%2FMicrosoftDocs%2Fmsteams-docs%2Fblob%2Fmain%2Fmsteams-platform%2Fbots%2Fhow-to%2Fauthentication%2Fadd-authentication.md&documentVersionIndependentId=70952f91-56e9-ff08-59f6-e237d4aaeca9&platformId=cc53b20b-69e0-cb70-1ca7-9b939c969c92&metadata=*%2BID%253A%2Be473e1f3-69f5-bcfa-bcab-54b098b59c80%2B%250A*%2BService%253A%2B%2A%2Amsteams%2A%2A)

### Configure the identity provider connection and register it with the bot

>[!NOTE]
> Use **Azure Active Directory v2** for the SSO sample in this tutorial. The v1 procedure below is retained for existing OAuth integrations, not for this sample's Teams SSO setup. For explicit OAuth sign-in without SSO, see [Configure OAuth authentication for a Teams bot](configure-oauth.md).

#### Microsoft Azure Active Directory (Azure AD) v1

1. In the [**Azure portal**][azure-portal], select your resource group from the dashboard.
1. Select your bot registration link.
1. Open the resource page and select **Configuration** under **Settings**.
1. Select **Add OAuth Connection Settings**.

1. Complete the form as follows:

    1. **Name**. Enter a name for the connection. You use this name in your bot in the `appsettings.json` file. For example, *BotTeamsAuthADv1*.
    1. **Service Provider**. Select **Azure Active Directory**. Once you select this option, the Azure Active Directory-specific fields are displayed.
    1. **Client id**. Enter the Application (client) ID that you recorded for your Azure identity provider app.
    1. **Client secret**. Enter the secret that you recorded for your Azure identity provider app.
    1. **Grant Type**. Enter `authorization_code`.
    1. **Login URL**. Enter `https://login.microsoftonline.com`.
    1. **Tenant ID**, enter the **Directory (tenant) ID** that you recorded earlier for your Azure identity app or **common** depending on the supported account type selected when you created the identity provider app. To decide which value to assign, follow these criteria:

        - For a single-tenant identity-provider app, enter its directory (tenant) ID.

        - For a multitenant identity-provider app, enter `common` to support its configured audience.

    1. For **Resource URL**, enter `https://graph.microsoft.com/`.
    1. Leave **Scopes** blank.

1. Select **Save**.

> [!div class="nextstepaction"]
> [I ran into an issue](https://github.com/MicrosoftDocs/msteams-docs/issues/new?template=Doc-Feedback.yaml&title=%5BI+ran+into+an+issue%5D+Microsoft+Azure+Active+Directory+%28Azure+AD%29+v1&&author=%40vikasalmal&pageUrl=https%3A%2F%2Flearn.microsoft.com%2Fen-us%2Fmicrosoftteams%2Fplatform%2Fbots%2Fhow-to%2Fauthentication%2Fadd-authentication%3Ftabs%3Ddotnet%252Cdotnet-sample%23microsoft-azure-active-directory-azure-ad-v1&contentSourceUrl=https%3A%2F%2Fgithub.com%2FMicrosoftDocs%2Fmsteams-docs%2Fblob%2Fmain%2Fmsteams-platform%2Fbots%2Fhow-to%2Fauthentication%2Fadd-authentication.md&documentVersionIndependentId=70952f91-56e9-ff08-59f6-e237d4aaeca9&platformId=cc53b20b-69e0-cb70-1ca7-9b939c969c92&metadata=*%2BID%253A%2Be473e1f3-69f5-bcfa-bcab-54b098b59c80%2B%250A*%2BService%253A%2B%2A%2Amsteams%2A%2A)

#### Microsoft Azure Active Directory (Azure AD) v2

1. In the [**Azure portal**][azure-portal], select your Azure Bot from the dashboard.
1. In the resource page, select **Configuration** under **Settings**.
1. Select **Add OAuth Connection Settings**.

1. Complete the form as follows:

    1. **Name**. Enter a name for the connection. Use this name in your bot in the `appsettings.json` file. For example, *BotTeamsAuthADv2*.
    1. **Service Provider**. Select **Azure Active Directory v2**. Once you select this option, the Azure AD v2 specific fields are displayed.
    1. **Client id**. Enter the Application (client) ID that you recorded for your Azure identity provider app.
    1. **Client secret**. Enter the secret that you recorded for your Azure identity provider app.
    1. **Token Exchange URL**. For this SSO sample, enter the application ID URI you configured for the identity-provider app. Use the same value for `webApplicationInfo.resource` in the app manifest. Leave this field blank only for explicit OAuth sign-in without SSO.
    1. **Tenant ID**, enter the **Directory (tenant) ID** that you recorded earlier for your Azure identity app or **common** depending on the supported account type selected when you created the identity provider app. To decide which value to assign, follow these criteria:

        - If you selected **Accounts in this organizational directory only**, enter that application's directory (tenant) ID.

        - If you selected a multitenant account type, enter `common` to support that application's configured audience. This OAuth connection setting is separate from the bot runtime's tenant ID.

    1. For **Scopes**, enter `User.Read` for the sample's profile command. Add other delegated permissions only when your bot needs them.

1. Select **Save**.

> [!div class="nextstepaction"]
> [I ran into an issue](https://github.com/MicrosoftDocs/msteams-docs/issues/new?template=Doc-Feedback.yaml&title=%5BI+ran+into+an+issue%5D+Microsoft+Azure+Active+Directory+%28Azure+AD%29+v2&&author=%40vikasalmal&pageUrl=https%3A%2F%2Flearn.microsoft.com%2Fen-us%2Fmicrosoftteams%2Fplatform%2Fbots%2Fhow-to%2Fauthentication%2Fadd-authentication%3Ftabs%3Ddotnet%252Cdotnet-sample%23microsoft-azure-active-directory-azure-ad-v2&contentSourceUrl=https%3A%2F%2Fgithub.com%2FMicrosoftDocs%2Fmsteams-docs%2Fblob%2Fmain%2Fmsteams-platform%2Fbots%2Fhow-to%2Fauthentication%2Fadd-authentication.md&documentVersionIndependentId=70952f91-56e9-ff08-59f6-e237d4aaeca9&platformId=cc53b20b-69e0-cb70-1ca7-9b939c969c92&metadata=*%2BID%253A%2Be473e1f3-69f5-bcfa-bcab-54b098b59c80%2B%250A*%2BService%253A%2B%2A%2Amsteams%2A%2A)

### Test the connection

1. Select the connection entry to open the connection you created.
1. Select **Test Connection** at the top of the **Service Provider Connection Setting** panel.
1. For the first time, it opens a new browser window asking you to select an account. Select the one you want to use.
1. Review the permissions requested by the identity-provider application.

1. Select **Accept**.
1. Confirm that **Test Connection to \<your-connection-name> Succeeded** appears. If it fails, use [Troubleshoot OAuth setup](configure-oauth.md#troubleshoot-oauth-setup) before trying again.

The bot code uses the connection name to retrieve user authentication tokens. This test verifies the provider connection, not the Teams SSO token exchange.

> [!div class="nextstepaction"]
> [I ran into an issue](https://github.com/MicrosoftDocs/msteams-docs/issues/new?template=Doc-Feedback.yaml&title=%5BI+ran+into+an+issue%5D+Test+the+connection&&author=%40vikasalmal&pageUrl=https%3A%2F%2Flearn.microsoft.com%2Fen-us%2Fmicrosoftteams%2Fplatform%2Fbots%2Fhow-to%2Fauthentication%2Fadd-authentication%3Ftabs%3Dnode-js%252Cdotnet-sample%23test-the-connection&contentSourceUrl=https%3A%2F%2Fgithub.com%2FMicrosoftDocs%2Fmsteams-docs%2Fblob%2Fmain%2Fmsteams-platform%2Fbots%2Fhow-to%2Fauthentication%2Fadd-authentication.md&documentVersionIndependentId=70952f91-56e9-ff08-59f6-e237d4aaeca9&platformId=cc53b20b-69e0-cb70-1ca7-9b939c969c92&metadata=*%2BID%253A%2Be473e1f3-69f5-bcfa-bcab-54b098b59c80%2B%250A*%2BService%253A%2B%2A%2Amsteams%2A%2A)

## Prepare the bot sample code

Use one implementation of the Bot Auth Quickstart sample. Keep credentials out of source control and use the sample's local configuration or your hosting platform's secret settings.

The linked samples don't all use the same Teams SDK authentication APIs:

| Implementation | SDK dependency in the sample | Authentication API version |
| --- | --- | --- |
| C#/.NET | `Microsoft.Teams.Apps` `2.1.*` | Current SDK 2.1 OAuth flows, including `AddOAuthFlow` and `SignInAsync`. |
| TypeScript (Node.js) | `@microsoft/teams.apps` `^2.0.0` | Legacy SDK 2.0-style `oauth.defaultConnectionName` and context-level sign-in. The dependency range can resolve to later 2.x versions; it isn't a pin to SDK 2.0. |
| Python | `microsoft-teams-apps==2.0.15` | Legacy SDK 2.0 `default_connection_name` and context-level sign-in. |

> [!NOTE]
> The TypeScript and Python instructions below follow the linked legacy implementations; they aren't SDK 2.1 code examples. For current SDK 2.1 examples in all three languages, see [Teams SDK user authentication](/microsoftteams/platform/teams-sdk/in-depth-guides/user-authentication). When updating an implementation, migrate its authentication code together with its SDK dependencies. Don't mix legacy default-connection configuration with the current flow-registration APIs.

# [C#/.NET](#tab/dotnet)

1. Clone [cs-auth-sample][teams-bot-auth-quickstart-cs].
1. Open Visual Studio.
1. From the toolbar, select **File > Open > Project/Solution** and open the bot project.
1. In `BotAuthQuickstart/appsettings.json`, configure the following sections:

    ```json
    {
      "AzureAd": {
        "TenantId": "<bot-tenant-id>",
        "ClientId": "<bot-app-id>",
        "ClientCredentials": [
          {
            "SourceType": "ClientSecret",
            "ClientSecret": "<bot-client-secret-value>"
          }
        ]
      },
      "OAuth": {
        "ConnectionName": "BotTeamsAuthADv2"
      }
    }
    ```

    - `AzureAd.TenantId` identifies the tenant containing the bot identity. Set it to the bot's directory (tenant) ID.
    - `AzureAd.ClientId` identifies the bot to Azure Bot Service. Set it to the bot's Microsoft App ID.
    - `AzureAd.ClientCredentials` supplies the bot identity's credential. Replace the secret placeholder with the bot's client secret **Value** through secure configuration.
    - `OAuth.ConnectionName` selects the bot's configured OAuth connection. Set it to the exact connection name saved on the Azure Bot resource.

1. Use `M365Agent/appPackage`, alongside the `BotAuthQuickstart` runtime project, and update the [app manifest values](#apppackagemanifestjson) before installing the app in Teams.

> [!div class="nextstepaction"]
> [I ran into an issue](https://github.com/MicrosoftDocs/msteams-docs/issues/new?template=Doc-Feedback.yaml&title=%5BI+ran+into+an+issue%5D+Prepare+the+bot+sample+code+using+C%23%2F.NET&&author=%40vikasalmal&pageUrl=https%3A%2F%2Flearn.microsoft.com%2Fen-us%2Fmicrosoftteams%2Fplatform%2Fbots%2Fhow-to%2Fauthentication%2Fadd-authentication%3Ftabs%3Dnode-js%252Cdotnet-sample%23test-the-connection&contentSourceUrl=https%3A%2F%2Fgithub.com%2FMicrosoftDocs%2Fmsteams-docs%2Fblob%2Fmain%2Fmsteams-platform%2Fbots%2Fhow-to%2Fauthentication%2Fadd-authentication.md&documentVersionIndependentId=70952f91-56e9-ff08-59f6-e237d4aaeca9&platformId=cc53b20b-69e0-cb70-1ca7-9b939c969c92&metadata=*%2BID%253A%2Be473e1f3-69f5-bcfa-bcab-54b098b59c80%2B%250A*%2BService%253A%2B%2A%2Amsteams%2A%2A)

# [JavaScript](#tab/node-js)

1. Clone [node-auth-sample][teams-bot-auth-quickstart-js].
1. In a console, go to the `samples/TeamsSDK/bot-auth-quickstart/nodejs/bot-auth-quickstart` project folder.
1. Install dependencies:

    ```console
    npm install
    ```

1. For manual local setup with the Azure Bot resource you created in this tutorial, create or update `.localConfigs` in the project root:

    ```dotenv
    TENANT_ID=<bot-tenant-id>
    CLIENT_ID=<bot-app-id>
    CLIENT_SECRET=<bot-client-secret-value>
    CONNECTION_NAME=BotTeamsAuthADv2
    ```

    - `TENANT_ID` identifies the tenant containing the bot identity. Set it to the bot's directory (tenant) ID.
    - `CLIENT_ID` identifies the bot to Azure Bot Service. Set it to the bot's Microsoft App ID.
    - `CLIENT_SECRET` supplies the bot identity's client secret value. Use the value, not the secret ID.
    - `CONNECTION_NAME` selects the bot's configured OAuth connection. Set it to the exact connection name saved on the Azure Bot resource.

    Microsoft 365 Agents Toolkit generates this file during its local deploy lifecycle in `m365agents.local.yml`. If you use that workflow instead of manual setup, update the Toolkit environment values that populate `.localConfigs`; don't rely on manual edits that a later deploy can overwrite. Keep `.localConfigs` out of source control.

1. Build the TypeScript project, then start it with the sample's installed `env-cmd` dependency to load `.localConfigs`. Run each command after the previous one succeeds:

    ```console
    npm run build
    npx --no-install env-cmd -f .localConfigs npm start
    ```

    For local development with automatic restarts, use `npm run dev:teamsfx` instead. That script also loads `.localConfigs` before starting the development server. `npm start` alone doesn't load this file, and the sample's launch scripts don't load `.env`.

1. In the `appPackage` folder, update the [app manifest values](#apppackagemanifestjson) before installing the app in Teams.

> [!div class="nextstepaction"]
> [I ran into an issue](https://github.com/MicrosoftDocs/msteams-docs/issues/new?template=Doc-Feedback.yaml&title=%5BI+ran+into+an+issue%5D+Prepare+the+bot+sample+code+using+JavaScript&&author=%40vikasalmal&pageUrl=https%3A%2F%2Flearn.microsoft.com%2Fen-us%2Fmicrosoftteams%2Fplatform%2Fbots%2Fhow-to%2Fauthentication%2Fadd-authentication%3Ftabs%3Dnode-js%252Cdotnet-sample%23prepare-the-bot-sample-code&contentSourceUrl=https%3A%2F%2Fgithub.com%2FMicrosoftDocs%2Fmsteams-docs%2Fblob%2Fmain%2Fmsteams-platform%2Fbots%2Fhow-to%2Fauthentication%2Fadd-authentication.md&documentVersionIndependentId=70952f91-56e9-ff08-59f6-e237d4aaeca9&platformId=cc53b20b-69e0-cb70-1ca7-9b939c969c92&metadata=*%2BID%253A%2Be473e1f3-69f5-bcfa-bcab-54b098b59c80%2B%250A*%2BService%253A%2B%2A%2Amsteams%2A%2A)

# [Python](#tab/python)

1. Clone [py-auth-sample][teams-bot-auth-quickstart-py] from the GitHub repository.
1. In the Python runtime project folder, create and activate a virtual environment for your operating system. Install the sample and its dependencies:

    ```console
    python -m venv .venv
    ```

    After activating `.venv`, run:

    ```console
    python -m pip install -e .
    ```

1. Configure the environment values shown in the sample's `.env.TEMPLATE`, using its local configuration instructions:

    ```dotenv
    TENANT_ID=<bot-tenant-id>
    CLIENT_ID=<bot-app-id>
    CLIENT_SECRET=<bot-client-secret-value>
    CONNECTION_NAME=BotTeamsAuthADv2
    ```

    - `TENANT_ID` identifies the tenant containing the bot identity. Set it to the bot's directory (tenant) ID.
    - `CLIENT_ID` identifies the bot to Azure Bot Service. Set it to the bot's Microsoft App ID.
    - `CLIENT_SECRET` supplies the bot identity's client secret value. Use the value, not the secret ID.
    - `CONNECTION_NAME` selects the bot's configured OAuth connection. Set it to the exact connection name saved on the Azure Bot resource.

    Save the values in `.env` in the Python runtime project folder. SDK 2.0.15 loads this file from the current working directory during import. Alternatively, set the values as environment variables in the terminal before running `python main.py`. The supplied Visual Studio Code **Start Python** debug configuration also loads `.env` through its `envFile` setting.

1. In the `appPackage` folder, update the [app manifest values](#apppackagemanifestjson) before installing the app in Teams.

> [!div class="nextstepaction"]
> [I ran into an issue](https://github.com/MicrosoftDocs/msteams-docs/issues/new?template=Doc-Feedback.yaml&title=%5BI+ran+into+an+issue%5D+Prepare+the+bot+sample+code+using+Python&&author=%40vikasalmal&pageUrl=https%3A%2F%2Flearn.microsoft.com%2Fen-us%2Fmicrosoftteams%2Fplatform%2Fbots%2Fhow-to%2Fauthentication%2Fadd-authentication%3Ftabs%3Dpython%252Cdotnet-sample%23prepare-the-bot-sample-code&contentSourceUrl=https%3A%2F%2Fgithub.com%2FMicrosoftDocs%2Fmsteams-docs%2Fblob%2Fmain%2Fmsteams-platform%2Fbots%2Fhow-to%2Fauthentication%2Fadd-authentication.md&documentVersionIndependentId=70952f91-56e9-ff08-59f6-e237d4aaeca9&platformId=cc53b20b-69e0-cb70-1ca7-9b939c969c92&metadata=*%2BID%253A%2Be473e1f3-69f5-bcfa-bcab-54b098b59c80%2B%250A*%2BService%253A%2B%2A%2Amsteams%2A%2A)

---

## Deploy the bot to Azure

Deploy the Teams SDK web service, not just the Teams app package. You can use the sample's `deploy` lifecycle in `m365agents.yml` with Microsoft 365 Agents Toolkit. For the deployment UI and action reference, see [Deploy to the cloud](../../../toolkit/deploy.md).

1. Create an Azure App Service web app on the plan you prepared earlier, with an operating system and runtime appropriate to your implementation. If the plan's operating system doesn't match the selected language's hosting requirements, create a compatible plan:

    | Implementation | Toolkit project folder, relative to the sample root | Deployment and host startup |
    | --- | --- | --- |
    | C#/.NET | `dotnet/bot-auth-quickstart/M365Agent` | The supplied lifecycle publishes `BotAuthQuickstart.csproj` for `win-x86`, self-contained, and uploads `BotAuthQuickstart/bin/Release/net10.0/win-x86/publish`. Use a Windows App Service compatible with this target. Alternatively, publish the **BotAuthQuickstart** web project from Visual Studio to this App Service, not the `M365Agent` project. |
    | TypeScript (Node.js) | `nodejs/bot-auth-quickstart` | The lifecycle runs `npm install` and `npm run build --if-present`, then uploads the project. For this walkthrough, use a Linux Node.js App Service and set its startup command to `npm start`, which runs `lib/app.js`. Use the same supported Node.js LTS version for the build and host; see [Configure a Node.js app in App Service](/azure/app-service/configure-language-nodejs). |
    | Python | `python/bot-auth-quickstart` | The lifecycle uploads the project but doesn't install its dependencies. Use a Linux Python App Service with a supported Python version matching the sample. Configure deployment-time dependency installation, set the startup command to `python main.py`, and set the app environment variable `PORT=8000` to match the built-in Python container's HTTP port; see [Configure a Python app in App Service](/azure/app-service/configure-language-python). |

    For Python, prepare a `requirements.txt` for App Service build automation from the sample's `pyproject.toml` dependency declarations, including the pinned Teams SDK versions. Enable `SCM_DO_BUILD_DURING_DEPLOYMENT=true` so the deployment installs those dependencies. Don't upload your local virtual environment.

1. Open the Toolkit project folder for your implementation in Visual Studio Code. In the selected environment's `env/.env.<environment>` file, set `BOT_AZURE_APP_SERVICE_RESOURCE_ID` to the resource ID of the existing App Service web app.

    > [!IMPORTANT]
    > This tutorial already creates a single-tenant bot registration with a client secret. The samples' cloud provisioning templates create managed-identity resources. Don't run their unmodified **Provision** lifecycle against this setup or replace the bot ID with a newly provisioned identity. Use **Deploy** to upload code to your existing App Service.

1. Configure runtime settings in the App Service environment, using the bot identity and connection name from this tutorial:

    | Implementation | App Service environment variables |
    | --- | --- |
    | C#/.NET | `AzureAd__TenantId`, `AzureAd__ClientId`, `AzureAd__ClientCredentials__0__SourceType=ClientSecret`, `AzureAd__ClientCredentials__0__ClientSecret`, and `OAuth__ConnectionName`. |
    | TypeScript and Python | `TENANT_ID`, `CLIENT_ID`, `CLIENT_SECRET`, and `CONNECTION_NAME`. |

    Set credentials through secure host configuration, such as Key Vault references. Don't deploy local secrets or rely on `.localConfigs` or `.env` being present on the server. Before deployment, review the `azureAppService/zipDeploy` action's `ignoreFile` and ensure it excludes secret-bearing files, Toolkit environment files, and local virtual environments.

1. In Microsoft 365 Agents Toolkit, select **Deploy** under **LIFECYCLE**, then select the environment that targets your existing App Service. Check the deployment output and App Service startup logs for build, dependency, or configuration errors.
1. Record the App Service HTTPS URL, such as `https://botteamsauth.azurewebsites.net/`. In the Azure portal, open your existing Azure Bot resource and set its **Messaging endpoint** to that URL followed by `/api/messages`, such as `https://botteamsauth.azurewebsites.net/api/messages`. Select **Save**.

Only one messaging endpoint is active per bot registration. For local Teams testing instead of Azure deployment, use [Testing the bot locally in Teams](#testing-the-bot-locally-in-teams).

> [!div class="nextstepaction"]
> [I ran into an issue](https://github.com/MicrosoftDocs/msteams-docs/issues/new?template=Doc-Feedback.yaml&title=%5BI+ran+into+an+issue%5D+Deploy+the+bot+to+Azure&&author=%40vikasalmal&pageUrl=https%3A%2F%2Flearn.microsoft.com%2Fen-us%2Fmicrosoftteams%2Fplatform%2Fbots%2Fhow-to%2Fauthentication%2Fadd-authentication%3Ftabs%3Ddotnet%252Cpython-sample%23deploy-the-bot-to-azure&contentSourceUrl=https%3A%2F%2Fgithub.com%2FMicrosoftDocs%2Fmsteams-docs%2Fblob%2Fmain%2Fmsteams-platform%2Fbots%2Fhow-to%2Fauthentication%2Fadd-authentication.md&documentVersionIndependentId=70952f91-56e9-ff08-59f6-e237d4aaeca9&platformId=cc53b20b-69e0-cb70-1ca7-9b939c969c92&metadata=*%2BID%253A%2Be473e1f3-69f5-bcfa-bcab-54b098b59c80%2B%250A*%2BService%253A%2B%2A%2Amsteams%2A%2A)

## Test locally using Microsoft 365 Agents Playground

Microsoft 365 Agents Playground is optional for checking local message routing, replies, and activity payloads without installing the app in Teams. It doesn't verify the real Teams user identity, consent experience, OAuth token exchange, or Teams SSO. Use non-authenticated commands to check message handling; mocked activities aren't proof that user authentication works.

Follow the [Teams SDK Playground setup](/microsoftteams/platform/teams-sdk/developer-tools/agents-playground/overview) for your installed SDK version. Playground sends requests without a Bot Framework JWT by default. SDK versions that reject unauthenticated requests require explicit local request-authentication configuration. The current guide documents `dangerouslyAllowUnauthenticatedRequests` for TypeScript, `dangerously_allow_unauthenticated_requests` for Python, and the `AzureAd__DangerouslyAllowUnauthenticatedRequests` launch-profile setting for .NET. Check version compatibility before applying current options to the legacy samples.

> [!WARNING]
> Allow unauthenticated requests only in an isolated local Playground configuration. Never enable this bypass in production, deploy it to App Service, or expose a bypass-enabled local endpoint through a public tunnel. Disable it before testing through the Azure Bot Service and Teams.

To validate OAuth and SSO, complete [Install and test the bot in Teams](#install-and-test-the-bot-in-teams), using either the deployed bot or an authenticated local bot behind an HTTPS tunnel. Check `signin`, `profile`, and `signout` in Teams; Playground message tests alone don't complete this tutorial's authentication validation.

## Test the deployed bot

<!--There are several testing scenarios here. Ideally, we'd have a separate article on the what, why, 
and when for these, and just reference that from here, along with the set of steps that exercises the bot code.-->

Use Web Chat to check message delivery and explicit sign-in. Test Teams SSO separately in [Install and test the bot in Teams](#install-and-test-the-bot-in-teams).

1. In your browser, go to the [**Azure portal**][azure-portal].
1. Find your resource group.
1. Select the resource link. The resource page is displayed.
1. In the resource page, select **Test in Web Chat**. The bot starts and displays the predefined greetings.
1. Enter `signin` and select **Sign in** if prompted.
1. A pop-up dialog appears to **Confirm Open URL** to authenticate the bot's user (you).  
1. Select **Confirm**.
1. If asked, select the applicable user's account and grant the requested permissions.
1. Enter `profile`. Confirm that the bot returns the signed-in user's profile instead of displaying an access token.
1. Enter `signout` to sign out.

> [!NOTE]
> If sign-in fails, [test the connection](#test-the-connection) and check the provider error, connection name, and bot credentials. See [Troubleshoot OAuth setup](configure-oauth.md#troubleshoot-oauth-setup).

> [!div class="nextstepaction"]
> [I ran into an issue](https://github.com/MicrosoftDocs/msteams-docs/issues/new?template=Doc-Feedback.yaml&title=%5BI+ran+into+an+issue%5D+Test+the+deployed+bot&&author=%40vikasalmal&pageUrl=https%3A%2F%2Flearn.microsoft.com%2Fen-us%2Fmicrosoftteams%2Fplatform%2Fbots%2Fhow-to%2Fauthentication%2Fadd-authentication%3Ftabs%3Ddotnet%252Cdotnet-sample%23test-the-deployed-bot&contentSourceUrl=https%3A%2F%2Fgithub.com%2FMicrosoftDocs%2Fmsteams-docs%2Fblob%2Fmain%2Fmsteams-platform%2Fbots%2Fhow-to%2Fauthentication%2Fadd-authentication.md&documentVersionIndependentId=70952f91-56e9-ff08-59f6-e237d4aaeca9&platformId=cc53b20b-69e0-cb70-1ca7-9b939c969c92&metadata=*%2BID%253A%2Be473e1f3-69f5-bcfa-bcab-54b098b59c80%2B%250A*%2BService%253A%2B%2A%2Amsteams%2A%2A)

## Install and test the bot in Teams

1. Locate your implementation's app package folder from the [prerequisites table](#prerequisites). For .NET, use `M365Agent/appPackage`, not a folder under the `BotAuthQuickstart` runtime project. Ensure the package contains `manifest.json`, `outline.png`, and `color.png`.
1. Open `manifest.json` in your editor and assign the following values:
    1. Set `id` to your Teams app's unique ID and `bots[].botId` to the bot's Microsoft App ID.
    1. Assign this value: `validDomains: [ "token.botframework.com" ]`.
    1. Set `webApplicationInfo.id` to the SSO identity-provider application's client ID and `webApplicationInfo.resource` to its application ID URI. The resource must match **Token Exchange URL** in the OAuth connection.
1. Replace all remaining template placeholders before packaging. For manual packaging, **zip** `manifest.json`, `outline.png`, and `color.png` at the archive root, without an enclosing `appPackage` folder. If you use Toolkit packaging instead, upload its generated `appPackage/build/appPackage.<environment>.zip` for the selected environment, not the unexpanded source template.
1. Open **Microsoft Teams**.
1. In the left panel, at the bottom, select the **Apps icon**.
1. In the right panel, at the bottom, select **Upload a custom app**.
1. Go to the `appPackage` folder and upload the zipped manifest.
1. Select **Add** to install the app to Teams.

1. Open a personal chat with the bot for this tutorial's sign-in test.

   > [!NOTE]
   > This tutorial tests personal scope. Teams SSO also supports group chat; see [Enable SSO for your app](bot-sso-overview.md) for scope-specific behavior.

1. Enter `signin`. Complete consent or the sign-in prompt if one appears.
1. Enter `profile` and confirm that the bot returns your Microsoft Graph profile.
1. Enter `signout` and confirm the sign-out response.

For current app-upload instructions, see [Upload your app in Microsoft Teams](../../../concepts/deploy-and-publish/apps-upload.md).

> [!div class="nextstepaction"]
> [I ran into an issue](https://github.com/MicrosoftDocs/msteams-docs/issues/new?template=Doc-Feedback.yaml&title=%5BI+ran+into+an+issue%5D+Install+and+test+the+bot+in+Teams&&author=%40vikasalmal&pageUrl=https%3A%2F%2Flearn.microsoft.com%2Fen-us%2Fmicrosoftteams%2Fplatform%2Fbots%2Fhow-to%2Fauthentication%2Fadd-authentication%3Ftabs%3Ddotnet%252Cdotnet-sample%23install-and-test-the-bot-in-teams&contentSourceUrl=https%3A%2F%2Fgithub.com%2FMicrosoftDocs%2Fmsteams-docs%2Fblob%2Fmain%2Fmsteams-platform%2Fbots%2Fhow-to%2Fauthentication%2Fadd-authentication.md&documentVersionIndependentId=70952f91-56e9-ff08-59f6-e237d4aaeca9&platformId=cc53b20b-69e0-cb70-1ca7-9b939c969c92&metadata=*%2BID%253A%2Be473e1f3-69f5-bcfa-bcab-54b098b59c80%2B%250A*%2BService%253A%2B%2A%2Amsteams%2A%2A)

### Testing the bot locally in Teams

Teams is an entirely cloud-based product. It requires all services it accesses to be available from the cloud using HTTPS endpoints. Therefore, to enable the bot (our sample) to work in Teams, you need to either publish the code to the cloud of your choice, or make a locally running instance externally accessible via a **tunneling** tool. We recommend [ngrok](https://ngrok.com/download), which creates an externally addressable URL for a port you open locally on your machine.
To set up ngrok in preparation for running your Teams app locally, follow these steps:

1. In a terminal window, go the directory where you have `ngrok.exe` installed. We suggest setting the *environment variable* path to point to it.
1. Run, for example, `ngrok http 3978 --host-header=localhost:3978`. Replace the port number as needed.
   It launches ngrok to listen on the port you specify and returns an externally addressable URL, valid for as long as ngrok is running.

1. Copy the forwarding HTTPS address that is similar to: `https://dea822bf.ngrok.io/`.
1. Append `/api/messages` to obtain `https://dea822bf.ngrok.io/api/messages`, which is the **messages endpoint** for the bot running locally on your machine and reachable over the web in a chat in Teams.
1. One final step to perform is to update the messages endpoint of the deployed bot. In the example, we deployed the bot in Azure. So let's perform these steps:
    1. In your browser, go to the [**Azure portal**][azure-portal].
    1. Select your **Bot Registration**.
    1. In the left panel, select **Settings**.
    1. In the right panel, in the **Messaging endpoint** box, enter the ngrok URL, in our example, `https://dea822bf.ngrok.io/api/messages`.
1. Disable any local Playground request-authentication bypass. Start your configured bot from its runtime project folder:

    | Implementation | Local startup |
    | --- | --- |
    | C#/.NET | Run `dotnet run --no-launch-profile --urls http://localhost:3978` from `BotAuthQuickstart`. This builds the project and explicitly selects the port used by the tunnel example. |
    | TypeScript (Node.js) | After `npm install` and `npm run build`, run `npx --no-install env-cmd -f .localConfigs npm start`. For automatic restarts, use `npm run dev:teamsfx`. |
    | Python | Activate the virtual environment, install dependencies with `python -m pip install -e .`, and set the runtime environment variables described in [Prepare the bot sample code](#prepare-the-bot-sample-code). Run `python main.py`, or use the supplied **Start Python** debug configuration to load `.env`. |

    Confirm the actual listening port in the startup output and use that port for the tunnel. Keep inbound request authentication enabled when connecting Teams to your local endpoint.
1. Test the bot while running locally using the Azure portal's **Test in Web Chat**.
1. Open the bot's personal chat in Teams and test `signin`, `profile`, and `signout`. Web Chat alone doesn't verify Teams SSO.

> [!NOTE]
> If you stop and restart ngrok, the URL changes. To use ngrok in your project, and depending on the capabilities you're using, you must update all URL references.

> [!div class="nextstepaction"]
> [I ran into an issue](https://github.com/MicrosoftDocs/msteams-docs/issues/new?template=Doc-Feedback.yaml&title=%5BI+ran+into+an+issue%5D+Testing+the+bot+locally+in+Teams&&author=%40vikasalmal&pageUrl=https%3A%2F%2Flearn.microsoft.com%2Fen-us%2Fmicrosoftteams%2Fplatform%2Fbots%2Fhow-to%2Fauthentication%2Fadd-authentication%3Ftabs%3Ddotnet%252Cdotnet-sample%23testing-the-bot-locally-in-teams&contentSourceUrl=https%3A%2F%2Fgithub.com%2FMicrosoftDocs%2Fmsteams-docs%2Fblob%2Fmain%2Fmsteams-platform%2Fbots%2Fhow-to%2Fauthentication%2Fadd-authentication.md&documentVersionIndependentId=70952f91-56e9-ff08-59f6-e237d4aaeca9&platformId=cc53b20b-69e0-cb70-1ca7-9b939c969c92&metadata=*%2BID%253A%2Be473e1f3-69f5-bcfa-bcab-54b098b59c80%2B%250A*%2BService%253A%2B%2A%2Amsteams%2A%2A)

## Additional information

### appPackage/manifest.json

Use the app manifest provided by your sample. The following example shows how the Teams app, bot identity, and SSO application are connected. Replace the placeholders through your project's configuration before packaging.

```json
{
  "$schema": "https://developer.microsoft.com/json-schemas/teams/v1.22/MicrosoftTeams.schema.json",
  "manifestVersion": "1.22",
  "version": "1.0.0",
  "id": "${{TEAMS_APP_ID}}",
  "developer": {
    "name": "Teams App, Inc.",
    "websiteUrl": "https://example.azurewebsites.net",
    "privacyUrl": "https://example.azurewebsites.net/privacy",
    "termsOfUseUrl": "https://example.azurewebsites.net/termsofuse"
  },
  "icons": {
    "color": "color.png",
    "outline": "outline.png"
  },
  "name": {
    "short": "Auth Bot",
    "full": "Auth Bot"
  },
  "description": {
    "short": "Teams bot with OAuth, SSO, and Microsoft Graph integration.",
    "full": "This bot demonstrates OAuth and SSO in Teams using Microsoft Entra ID and retrieves the signed-in user's profile from Microsoft Graph."
  },
  "accentColor": "#FFFFFF",
  "bots": [
    {
      "botId": "${{BOT_ID}}",
      "scopes": [
        "personal",
        "groupChat",
        "team"
      ],
      "supportsFiles": false,
      "isNotificationOnly": false
    }
  ],
  "permissions": [
    "identity",
    "messageTeamMembers"
  ],
  "validDomains": [
    "token.botframework.com",
    "${{BOT_DOMAIN}}"
  ],
  "webApplicationInfo": {
    "id": "${{SSO_APP_ID}}",
    "resource": "${{SSO_APP_ID_URI}}"
  }
}
```

- `id` identifies the Teams app independently of its bot. Set `TEAMS_APP_ID` to the Teams app's unique ID.
- `bots[].botId` connects Teams to the registered bot. Set `BOT_ID` to the bot's Microsoft App ID.
- `validDomains` allows the OAuth token-service domain. Keep `token.botframework.com` for this public-cloud flow and replace `BOT_DOMAIN` with your bot's hostname.
- `webApplicationInfo.id` identifies the SSO identity-provider application. Set `SSO_APP_ID` to its application (client) ID.
- `webApplicationInfo.resource` identifies the API used for token exchange. Set `SSO_APP_ID_URI` to that app's application ID URI, matching **Token Exchange URL** in the OAuth connection.

The SSO placeholders describe the required values; if your sample uses different environment variable names, map those variables to the same values. For more information, see [Update app manifest for SSO](bot-sso-manifest.md).

> [!div class="nextstepaction"]
> [I ran into an issue](https://github.com/MicrosoftDocs/msteams-docs/issues/new?template=Doc-Feedback.yaml&title=%5BI+ran+into+an+issue%5D+appPackage%2Fmanifest.json&&author=%40vikasalmal&pageUrl=https%3A%2F%2Flearn.microsoft.com%2Fen-us%2Fmicrosoftteams%2Fplatform%2Fbots%2Fhow-to%2Fauthentication%2Fadd-authentication%3Ftabs%3Ddotnet%252Cpython-sample%23apppackagemanifestjson&contentSourceUrl=https%3A%2F%2Fgithub.com%2FMicrosoftDocs%2Fmsteams-docs%2Fblob%2Fmain%2Fmsteams-platform%2Fbots%2Fhow-to%2Fauthentication%2Fadd-authentication.md&documentVersionIndependentId=70952f91-56e9-ff08-59f6-e237d4aaeca9&platformId=cc53b20b-69e0-cb70-1ca7-9b939c969c92&metadata=*%2BID%253A%2Be473e1f3-69f5-bcfa-bcab-54b098b59c80%2B%250A*%2BService%253A%2B%2A%2Amsteams%2A%2A)

## Code sample

The Bot Auth Quickstart sample demonstrates OAuth and Teams SSO with Microsoft Entra ID. Use `signin`, `profile`, and `signout` to test sign-in and Microsoft Graph access.

| **Sample name** | **Description** | **.NET** | **Node.js** | **Python** |
|---------------|------------|------------|-------------|---------------|
| Bot Auth Quickstart | Sign in with Microsoft Entra ID and retrieve the user's Microsoft Graph profile. | [View](https://github.com/OfficeDev/Microsoft-Teams-Samples/tree/main/samples/TeamsSDK/bot-auth-quickstart/dotnet/bot-auth-quickstart) | [View](https://github.com/OfficeDev/Microsoft-Teams-Samples/tree/main/samples/TeamsSDK/bot-auth-quickstart/nodejs/bot-auth-quickstart) | [View](https://github.com/OfficeDev/Microsoft-Teams-Samples/tree/main/samples/TeamsSDK/bot-auth-quickstart/python/bot-auth-quickstart) |

## See also

- [Configure OAuth authentication for a Teams bot](configure-oauth.md)
- [Enable SSO for your app](bot-sso-overview.md)
- [Configure your app in Microsoft Entra ID](bot-sso-register-aad.md)
- [Supported OAuth URLs](/azure/bot-service/ref-oauth-redirect-urls)
- [Get access on behalf of a user](/graph/auth-v2-user)

<!-- Footnote-style links -->

[azure-portal]: https://ms.portal.azure.com

[teams-bot-auth-quickstart-cs]: https://github.com/OfficeDev/Microsoft-Teams-Samples/tree/main/samples/TeamsSDK/bot-auth-quickstart/dotnet/bot-auth-quickstart

[teams-bot-auth-quickstart-py]: https://github.com/OfficeDev/Microsoft-Teams-Samples/tree/main/samples/TeamsSDK/bot-auth-quickstart/python/bot-auth-quickstart

[teams-bot-auth-quickstart-js]: https://github.com/OfficeDev/Microsoft-Teams-Samples/tree/main/samples/TeamsSDK/bot-auth-quickstart/nodejs/bot-auth-quickstart
