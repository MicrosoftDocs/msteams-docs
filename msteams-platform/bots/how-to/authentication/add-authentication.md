---
title: "Tutorial: Add OAuth authentication to a Teams bot"
description: Create an Azure Bot resource, configure OAuth and Teams SSO with Microsoft Entra ID, deploy a Teams SDK sample to Azure, and test sign-in in Teams.
ms.topic: tutorial
ms.localizationpriority: high
ms.date: 10/19/2026
---

# Tutorial: Add OAuth authentication to a Teams bot

<a name="add-authentication-to-your-teams-bot"></a>

In this end-to-end tutorial, you configure OAuth 2.0 authentication with Microsoft Entra ID, deploy a Teams SDK bot to Azure, and test it in Microsoft Teams. OAuth lets the bot access resources on behalf of a user without collecting the user's password. The Bot Auth Quickstart sample also uses Teams single sign-on (SSO) to reuse the user's Teams identity and retrieve their Microsoft Graph profile.

> [!TIP]
> Already have a bot and only need OAuth setup? See Configure OAuth authentication for a Teams bot. You don't need to work through resource provisioning and deployment to configure an OAuth connection.

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
- Git and the tools required by your chosen sample: the .NET SDK and Visual Studio, Node.js, or Python.
- Azure account. If needed, you can create an [Azure free account](https://azure.microsoft.com/pricing/purchase-options/azure-account?cid=msft_learn).
- A Teams account with permission to upload custom apps, and permission to configure app registrations and grant consent in your test tenant.
- The following sample:

    | Sample |
    | :--- |
    | **Bot Auth Quickstart** in [cs-auth-sample][teams-bot-auth-quickstart-cs] |
    | **Bot Auth Quickstart** in [js-auth-sample][teams-bot-auth-quickstart-js] |
    | **Bot Auth Quickstart** in [py-auth-sample][teams-bot-auth-quickstart-py] |

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
> Use **Azure Active Directory v2** for the SSO sample in this tutorial. The v1 procedure below is retained for existing OAuth integrations, not for this sample's Teams SSO setup.

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
1. Confirm that **Test Connection to \<your-connection-name> Succeeded** appears.

The bot code uses the connection name to retrieve user authentication tokens. This test verifies the provider connection, not the Teams SSO token exchange.

> [!div class="nextstepaction"]
> [I ran into an issue](https://github.com/MicrosoftDocs/msteams-docs/issues/new?template=Doc-Feedback.yaml&title=%5BI+ran+into+an+issue%5D+Test+the+connection&&author=%40vikasalmal&pageUrl=https%3A%2F%2Flearn.microsoft.com%2Fen-us%2Fmicrosoftteams%2Fplatform%2Fbots%2Fhow-to%2Fauthentication%2Fadd-authentication%3Ftabs%3Dnode-js%252Cdotnet-sample%23test-the-connection&contentSourceUrl=https%3A%2F%2Fgithub.com%2FMicrosoftDocs%2Fmsteams-docs%2Fblob%2Fmain%2Fmsteams-platform%2Fbots%2Fhow-to%2Fauthentication%2Fadd-authentication.md&documentVersionIndependentId=70952f91-56e9-ff08-59f6-e237d4aaeca9&platformId=cc53b20b-69e0-cb70-1ca7-9b939c969c92&metadata=*%2BID%253A%2Be473e1f3-69f5-bcfa-bcab-54b098b59c80%2B%250A*%2BService%253A%2B%2A%2Amsteams%2A%2A)

## Prepare the bot sample code

Use one implementation of the Bot Auth Quickstart sample. Keep credentials out of source control and use the sample's local configuration or your hosting platform's secret settings.

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

1. Use the sample's app package and update the [app manifest values](#apppackagemanifestjson) before installing the app in Teams.

> [!div class="nextstepaction"]
> [I ran into an issue](https://github.com/MicrosoftDocs/msteams-docs/issues/new?template=Doc-Feedback.yaml&title=%5BI+ran+into+an+issue%5D+Prepare+the+bot+sample+code+using+C%23%2F.NET&&author=%40vikasalmal&pageUrl=https%3A%2F%2Flearn.microsoft.com%2Fen-us%2Fmicrosoftteams%2Fplatform%2Fbots%2Fhow-to%2Fauthentication%2Fadd-authentication%3Ftabs%3Dnode-js%252Cdotnet-sample%23test-the-connection&contentSourceUrl=https%3A%2F%2Fgithub.com%2FMicrosoftDocs%2Fmsteams-docs%2Fblob%2Fmain%2Fmsteams-platform%2Fbots%2Fhow-to%2Fauthentication%2Fadd-authentication.md&documentVersionIndependentId=70952f91-56e9-ff08-59f6-e237d4aaeca9&platformId=cc53b20b-69e0-cb70-1ca7-9b939c969c92&metadata=*%2BID%253A%2Be473e1f3-69f5-bcfa-bcab-54b098b59c80%2B%250A*%2BService%253A%2B%2A%2Amsteams%2A%2A)

# [JavaScript](#tab/node-js)

1. Clone [node-auth-sample][teams-bot-auth-quickstart-js].
1. In a console, go to the project: </br></br>
`cd samples/TeamsSDK/bot-auth-quickstart/nodejs/bot-auth-quickstart`
1. Install modules</br></br>
`npm install`
1. Update the **.env** configuration as follows:

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

1. In the `appPackage` folder, update the [app manifest values](#apppackagemanifestjson) before installing the app in Teams.

> [!div class="nextstepaction"]
> [I ran into an issue](https://github.com/MicrosoftDocs/msteams-docs/issues/new?template=Doc-Feedback.yaml&title=%5BI+ran+into+an+issue%5D+Prepare+the+bot+sample+code+using+JavaScript&&author=%40vikasalmal&pageUrl=https%3A%2F%2Flearn.microsoft.com%2Fen-us%2Fmicrosoftteams%2Fplatform%2Fbots%2Fhow-to%2Fauthentication%2Fadd-authentication%3Ftabs%3Dnode-js%252Cdotnet-sample%23prepare-the-bot-sample-code&contentSourceUrl=https%3A%2F%2Fgithub.com%2FMicrosoftDocs%2Fmsteams-docs%2Fblob%2Fmain%2Fmsteams-platform%2Fbots%2Fhow-to%2Fauthentication%2Fadd-authentication.md&documentVersionIndependentId=70952f91-56e9-ff08-59f6-e237d4aaeca9&platformId=cc53b20b-69e0-cb70-1ca7-9b939c969c92&metadata=*%2BID%253A%2Be473e1f3-69f5-bcfa-bcab-54b098b59c80%2B%250A*%2BService%253A%2B%2A%2Amsteams%2A%2A)

# [Python](#tab/python)

1. Clone [py-auth-sample][teams-bot-auth-quickstart-py] from the GitHub repository.
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

1. In the `appPackage` folder, update the [app manifest values](#apppackagemanifestjson) before installing the app in Teams.

> [!div class="nextstepaction"]
> [I ran into an issue](https://github.com/MicrosoftDocs/msteams-docs/issues/new?template=Doc-Feedback.yaml&title=%5BI+ran+into+an+issue%5D+Prepare+the+bot+sample+code+using+Python&&author=%40vikasalmal&pageUrl=https%3A%2F%2Flearn.microsoft.com%2Fen-us%2Fmicrosoftteams%2Fplatform%2Fbots%2Fhow-to%2Fauthentication%2Fadd-authentication%3Ftabs%3Dpython%252Cdotnet-sample%23prepare-the-bot-sample-code&contentSourceUrl=https%3A%2F%2Fgithub.com%2FMicrosoftDocs%2Fmsteams-docs%2Fblob%2Fmain%2Fmsteams-platform%2Fbots%2Fhow-to%2Fauthentication%2Fadd-authentication.md&documentVersionIndependentId=70952f91-56e9-ff08-59f6-e237d4aaeca9&platformId=cc53b20b-69e0-cb70-1ca7-9b939c969c92&metadata=*%2BID%253A%2Be473e1f3-69f5-bcfa-bcab-54b098b59c80%2B%250A*%2BService%253A%2B%2A%2Amsteams%2A%2A)

---

## Deploy the bot to Azure

To deploy the bot, follow the steps in the How to [Deploy your bot to Azure](/azure/bot-service/provision-and-publish-a-bot?view=azure-bot-service-4.0&preserve-view=true&tabs=userassigned%2Ccsharp).

Alternatively, while in Visual Studio, you can follow these steps:

1. In Visual Studio *Solution Explorer*, select and hold (or right-click) the project name.
1. In the dropdown menu, select **Publish**.
1. In the displayed window, select the **New** link.
1. In the dialog window, select **App Service** and **Create New**.
1. Select **Publish**.
1. Select the subscription, resource group, and App Service plan you prepared for this tutorial, and enter a name for the web app.

1. Select **Create**.
1. After publishing, record the App Service HTTPS URL, such as `https://botteamsauth.azurewebsites.net/`. Configure the bot's runtime settings on the hosting platform; don't publish local secrets with the app.
1. In your browser, go to the [**Azure portal**][azure-portal].
1. Check that the bot's App Service is listed in your resource group.

1. In the resource group, select the bot registration name (link).
1. In the left panel, select **Settings**.
1. In the **Messaging endpoint** box, enter the URL you just obtained followed by `api/messages`. For example, `https://botteamsauth.azurewebsites.net/api/messages`.
    > [!NOTE]
    > Only one messaging endpoint is allowed for a bot.
1. Select the **Save** button in the upper left.

> [!div class="nextstepaction"]
> [I ran into an issue](https://github.com/MicrosoftDocs/msteams-docs/issues/new?template=Doc-Feedback.yaml&title=%5BI+ran+into+an+issue%5D+Deploy+the+bot+to+Azure&&author=%40vikasalmal&pageUrl=https%3A%2F%2Flearn.microsoft.com%2Fen-us%2Fmicrosoftteams%2Fplatform%2Fbots%2Fhow-to%2Fauthentication%2Fadd-authentication%3Ftabs%3Ddotnet%252Cpython-sample%23deploy-the-bot-to-azure&contentSourceUrl=https%3A%2F%2Fgithub.com%2FMicrosoftDocs%2Fmsteams-docs%2Fblob%2Fmain%2Fmsteams-platform%2Fbots%2Fhow-to%2Fauthentication%2Fadd-authentication.md&documentVersionIndependentId=70952f91-56e9-ff08-59f6-e237d4aaeca9&platformId=cc53b20b-69e0-cb70-1ca7-9b939c969c92&metadata=*%2BID%253A%2Be473e1f3-69f5-bcfa-bcab-54b098b59c80%2B%250A*%2BService%253A%2B%2A%2Amsteams%2A%2A)

## Test locally using Microsoft 365 Agents Playground

To test your bot locally, use the **Microsoft 365 Agents Playground**, which supports both agents and bots.  
For setup and testing instructions, see [Test your agent locally with the Microsoft 365 Agents Playground](/microsoft-365/agents-sdk/test-with-toolkit-project?tabs=windows).

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
> If sign-in fails, [test the connection](#test-the-connection) and check the provider error, connection name, and bot credentials.

> [!div class="nextstepaction"]
> [I ran into an issue](https://github.com/MicrosoftDocs/msteams-docs/issues/new?template=Doc-Feedback.yaml&title=%5BI+ran+into+an+issue%5D+Test+the+deployed+bot&&author=%40vikasalmal&pageUrl=https%3A%2F%2Flearn.microsoft.com%2Fen-us%2Fmicrosoftteams%2Fplatform%2Fbots%2Fhow-to%2Fauthentication%2Fadd-authentication%3Ftabs%3Ddotnet%252Cdotnet-sample%23test-the-deployed-bot&contentSourceUrl=https%3A%2F%2Fgithub.com%2FMicrosoftDocs%2Fmsteams-docs%2Fblob%2Fmain%2Fmsteams-platform%2Fbots%2Fhow-to%2Fauthentication%2Fadd-authentication.md&documentVersionIndependentId=70952f91-56e9-ff08-59f6-e237d4aaeca9&platformId=cc53b20b-69e0-cb70-1ca7-9b939c969c92&metadata=*%2BID%253A%2Be473e1f3-69f5-bcfa-bcab-54b098b59c80%2B%250A*%2BService%253A%2B%2A%2Amsteams%2A%2A)

## Install and test the bot in Teams

1. In your bot project, ensure that the `appPackage` folder contains the `manifest.json` along with an `outline.png` and `color.png` files.
1. In Solution Explorer, go to the `appPackage` folder. Edit `manifest.json` by assigning the following values:
    1. Set `id` to your Teams app's unique ID and `bots[].botId` to the bot's Microsoft App ID.
    1. Assign this value: `validDomains: [ "token.botframework.com" ]`.
    1. Set `webApplicationInfo.id` to the SSO identity-provider application's client ID and `webApplicationInfo.resource` to its application ID URI. The resource must match **Token Exchange URL** in the OAuth connection.
1. Select and **zip** the `manifest.json`, `outline.png`, and `color.png` files.
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
1. Start your bot locally, for example in Visual Studio debug mode.
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

- [Enable SSO for your app](bot-sso-overview.md)
- [Configure your app in Microsoft Entra ID](bot-sso-register-aad.md)
- [Supported OAuth URLs](/azure/bot-service/ref-oauth-redirect-urls)
- [Get access on behalf of a user](/graph/auth-v2-user)

<!-- Footnote-style links -->

[azure-portal]: https://ms.portal.azure.com

[teams-bot-auth-quickstart-cs]: https://github.com/OfficeDev/Microsoft-Teams-Samples/tree/main/samples/TeamsSDK/bot-auth-quickstart/dotnet/bot-auth-quickstart

[teams-bot-auth-quickstart-py]: https://github.com/OfficeDev/Microsoft-Teams-Samples/tree/main/samples/TeamsSDK/bot-auth-quickstart/python/bot-auth-quickstart

[teams-bot-auth-quickstart-js]: https://github.com/OfficeDev/Microsoft-Teams-Samples/tree/main/samples/TeamsSDK/bot-auth-quickstart/nodejs/bot-auth-quickstart
