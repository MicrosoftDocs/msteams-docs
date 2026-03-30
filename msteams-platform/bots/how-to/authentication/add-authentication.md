---
title: OAuth 2.0 Bot Authentication with Azure
author: vikasalmal
description: Learn how to enable authentication using third-party provider to a bot app in Teams using Entra ID. Learn to create and register bot resource group and service plan.
ms.topic: how-to
ms.localizationpriority: high
ms.owner: ryanbliss
ms.date: 03/27/2026
---

# Add authentication to your Teams bot

You can create bots in Microsoft Teams that access resources on behalf of the user, such as a mail service. You can use Teams SDK authentication, based on OAuth 2.0. This method makes it easier to develop a bot that can use authentication tokens based on the user's credentials. The key is the use of **identity providers**.

OAuth 2.0 is an open standard for authentication and authorization used by Microsoft Entra ID and many other identity providers. A basic understanding of OAuth 2.0 is a prerequisite for working with authentication in Teams.

See [OAuth 2 Simplified](https://aka.ms/oauth2-simplified) for a basic understanding, and [OAuth 2.0](https://oauth.net/2/) for the complete specification.

In this article you'll learn:

- **How to create an authentication-enabled bot**. Use [cs-auth-sample][teams-auth-bot-cs] to handle user sign-in credentials and the generating the authentication token.
- **How to deploy the bot to Azure and associate it with an identity provider**. The provider issues a token based on user sign-in credentials. The bot can use the token to access resources, such as a mail service, which require authentication.
- **How to integrate the bot within Microsoft Teams**. Once the bot is integrated, you can sign in and exchange messages with it in a chat.

## Prerequisites

- Knowledge of [bot basics](/microsoftteams/platform/bots/bot-concepts) and the [Teams SDK](/microsoftteams/platform/bots/bot-concepts).
- Knowledge of Azure and OAuth 2.0 development.
- The latest versions of Microsoft Visual Studio and Git.
- Azure account. If needed, you can create an [Azure free account](https://azure.microsoft.com/pricing/purchase-options/azure-account?cid=msft_learn).
- The following sample:

    | Sample |
    |:---|:---:|:---|
    | **Bot authentication** in [cs-auth-sample][teams-auth-bot-cs] |
    | **Bot authentication** in [js-auth-sample][teams-auth-bot-js] |
    | **Bot authentication** in [py-auth-sample][teams-auth-bot-py] |

## Create the resource group

The resource group and the service plan aren't strictly necessary, but they allow you to conveniently release the resources you create. We recommend that you keep your resources organized and manageable.

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
> [I ran into an issue](https://github.com/MicrosoftDocs/msteams-docs/issues/new?template=Doc-Feedback.yaml&title=%5BI+ran+into+an+issue%5D+Create+the+resource+group&&author=%40surbhigupta&pageUrl=https%3A%2F%2Flearn.microsoft.com%2Fen-us%2Fmicrosoftteams%2Fplatform%2Fbots%2Fhow-to%2Fauthentication%2Fadd-authentication%3Ftabs%3Ddotnet%252Cdotnet-sample%23create-the-resource-group&contentSourceUrl=https%3A%2F%2Fgithub.com%2FMicrosoftDocs%2Fmsteams-docs%2Fblob%2Fmain%2Fmsteams-platform%2Fbots%2Fhow-to%2Fauthentication%2Fadd-authentication.md&documentVersionIndependentId=70952f91-56e9-ff08-59f6-e237d4aaeca9&platformId=cc53b20b-69e0-cb70-1ca7-9b939c969c92&metadata=*%2BID%253A%2Be473e1f3-69f5-bcfa-bcab-54b098b59c80%2B%250A*%2BService%253A%2B%2A%2Amsteams%2A%2A)

## Create the service plan

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
> [I ran into an issue](https://github.com/MicrosoftDocs/msteams-docs/issues/new?template=Doc-Feedback.yaml&title=%5BI+ran+into+an+issue%5D+Create+the+service+plan&&author=%40surbhigupta&pageUrl=https%3A%2F%2Flearn.microsoft.com%2Fen-us%2Fmicrosoftteams%2Fplatform%2Fbots%2Fhow-to%2Fauthentication%2Fadd-authentication%3Ftabs%3Ddotnet%252Cdotnet-sample%23create-the-service-plan&contentSourceUrl=https%3A%2F%2Fgithub.com%2FMicrosoftDocs%2Fmsteams-docs%2Fblob%2Fmain%2Fmsteams-platform%2Fbots%2Fhow-to%2Fauthentication%2Fadd-authentication.md&documentVersionIndependentId=70952f91-56e9-ff08-59f6-e237d4aaeca9&platformId=cc53b20b-69e0-cb70-1ca7-9b939c969c92&metadata=*%2BID%253A%2Be473e1f3-69f5-bcfa-bcab-54b098b59c80%2B%250A*%2BService%253A%2B%2A%2Amsteams%2A%2A)

## Create Azure Bot resource registration

The Azure Bot resource registration registers your web service as a bot with the Azure Bot Service, which provides you with a Microsoft App ID and App password (client secret).

> [!IMPORTANT]
> You only need to register your bot if it's not hosted in Azure. If you [created a bot](/azure/bot-service/abs-quickstart?view=azure-bot-service-4.0&viewFallbackFrom=azure-bot-service-3.0&preserve-view=true) through the Azure portal then it's already registered with the service. If you created your bot through the [Developer Portal](../../../concepts/build-and-test/teams-developer-portal.md) your bot isn't registered in Azure.

1. Visit [**Azure portal**][azure-portal] and search for **Azure Bot** in **Create a resource** section.
1. Open the **Azure Bot** and select **Create**.
1. Enter bot handle name in **Bot handle** field.
1. Select your **Subscription** from the dropdown list.
1. Select your **Resource group** from the dropdown list.
1. Select **Type of App** as **User-Assigned Managed Identity** or **Single Tenant** for **Microsoft App ID**.

    >[!IMPORTANT]
    > The **Multi Tenant** bot type in **Azure Bot Service** is deprecated. Existing Multi Tenant bots continues to work for now.</br> All new bot registrations must either use the **Single Tenant** bot type or the **User-Assigned Managed Identity** type.</br> When registering your Entra app in Azure portal, you can still select the **Accounts in any organizational directory (Multi Tenant)** option. This enables your bot to work across multiple tenants, even outside the tenant where the app is registered, when using one of the supported bot types.</br> In all cases, the **TENANT_ID** must be set to the **Tenant ID of the Azure tenant where the Microsoft Entra ID app is registered**.

   :::image type="content" source="../../../assets/images/adaptive-cards/single-tenant.png" alt-text="Screenshot shows how to select multitenant for Microsoft AppID.":::

1. Select **Review + create**.

   :::image type="content" source="../../../assets/images/adaptive-cards/create-azure-bot.png" alt-text="Screenshot shows how to create Azure bot.":::

1. If the validation passes, select **Create**.

    Azure provisions your bot in a few moments.

   :::image type="content" source="../../../assets/images/adaptive-cards/validation-pane.png" alt-text="Screenshot shows how Azure bot validation passes.":::

1. Select **Go to resource**. The bot and the related resources are listed in the resource group.

   :::image type="content" source="../../../assets/images/adaptive-cards/go-to-resource-card.png" alt-text="Screenshot shows how to select resources group.":::

    Your Azure bot is created.

   :::image type="content" source="../../../assets/images/adaptive-cards/azure-bot-ui.png" alt-text="Screenshot shows how to create Azure bot resources.":::

To create client secret:

1. In **Settings**, select **Configuration**. Save the **Microsoft App ID** (client ID) for future reference.

   :::image type="content" source="../../../assets/images/adaptive-cards/config-microsoft-app-id.png" alt-text="Screenshot shows how to add Microsoft App ID to create client secret.":::

1. Next to **Microsoft App ID**, select **Manage**.

   :::image type="content" source="~/assets/images/manage-bot-label.png" alt-text="Screenshot shows how to create and manage a bot.":::

1. In the **Client secrets** section, select **New client secret**.**Add a client secret** window appears.

   :::image type="content" source="../../../assets/images/meetings-side-panel/newclientsecret.PNG" alt-text="Screenshot shows how to create new client secret.":::

1. Enter **Description** and select **Add**.

   :::image type="content" source="../../../assets/images/adaptive-cards/client-secret.png" alt-text="The screenshot shows how to enter description for the client secret.":::

1. In the **Value** column, select **Copy to clipboard** and save the client secret ID for future reference.

   :::image type="content" source="../../../assets/images/adaptive-cards/client-secret-value.png" alt-text="The screenshot shows how to save the client secret ID for future reference.":::

To add the Microsoft Teams channel:

1. Go to **Home**.

   :::image type="content" source="../../../assets/images/adaptive-cards/bot-home-page.png" alt-text="Screenshot shows you the bot home page.":::

1. Open your bot from the **Recent resources** section.

1. Select **Channels** in the left pane and select **Microsoft Teams** :::image type="icon" source="../../../assets/icons/teams-icon.png":::.

   :::image type="content" source="../../../assets/images/adaptive-cards/channel-teams.png" alt-text="Screenshot shows how to select Teams in channels.":::

1. Select the checkbox to accept the terms of service and select **Agree**.</br>

   :::image type="content" source="../../../assets/images/adaptive-cards/select-terms-of-service.png" alt-text="Screenshot shows how to set the terms if service.":::

1. Select **Save**.

   :::image type="content" source="../../../assets/images/adaptive-cards/select-teams.png" alt-text="Screenshot shows how to add Microsoft Teams channel.":::

For more information, see [Create a bot for Teams](../create-a-bot-for-teams.md).

> [!div class="nextstepaction"]
> [I ran into an issue](https://github.com/MicrosoftDocs/msteams-docs/issues/new?template=Doc-Feedback.yaml&title=%5BI+ran+into+an+issue%5D+Create+Azure+Bot+resource+registration&&author=%40surbhigupta&pageUrl=https%3A%2F%2Flearn.microsoft.com%2Fen-us%2Fmicrosoftteams%2Fplatform%2Fbots%2Fhow-to%2Fauthentication%2Fadd-authentication%3Ftabs%3Ddotnet%252Cdotnet-sample%23create-azure-bot-resource-registration&contentSourceUrl=https%3A%2F%2Fgithub.com%2FMicrosoftDocs%2Fmsteams-docs%2Fblob%2Fmain%2Fmsteams-platform%2Fbots%2Fhow-to%2Fauthentication%2Fadd-authentication.md&documentVersionIndependentId=70952f91-56e9-ff08-59f6-e237d4aaeca9&platformId=cc53b20b-69e0-cb70-1ca7-9b939c969c92&metadata=*%2BID%253A%2Be473e1f3-69f5-bcfa-bcab-54b098b59c80%2B%250A*%2BService%253A%2B%2A%2Amsteams%2A%2A)

## Create the identity provider

You need an identity provider for authentication. In this procedure, you use a Microsoft Entra provider. Alternatively, you can also use other Microsoft Entra ID supported identity providers.

1. In the [**Azure portal**][azure-portal], on the left navigation panel, select **Microsoft Entra ID**.
    > [!TIP]
    > You must create and register this Microsoft Entra resource in a tenant in which you can consent to delegate permissions requested by an application. For instructions on creating a tenant, see [Access the portal and create a tenant](/azure/active-directory/fundamentals/active-directory-access-create-new-tenant).
1. In the left panel, select **App registrations**.
1. In the right panel, select the **New registration** tab, in the upper left.
1. Provide the following information:
   1. **Name**. Enter the name for the application. An example could be  *BotTeamsIdentity*. Remember that the name must be unique.
   1. Select the **Supported account types** for your application. Select **Accounts in any organizational directory (Any Microsoft Entra ID tenant - Multitenant) and personal Microsoft accounts (e.g. Skype, Xbox)**.
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

> [!div class="nextstepaction"]
> [I ran into an issue](https://github.com/MicrosoftDocs/msteams-docs/issues/new?template=Doc-Feedback.yaml&title=%5BI+ran+into+an+issue%5D+Create+the+identity+provider&&author=%40surbhigupta&pageUrl=https%3A%2F%2Flearn.microsoft.com%2Fen-us%2Fmicrosoftteams%2Fplatform%2Fbots%2Fhow-to%2Fauthentication%2Fadd-authentication%3Ftabs%3Ddotnet%252Cdotnet-sample%23create-the-identity-provider&contentSourceUrl=https%3A%2F%2Fgithub.com%2FMicrosoftDocs%2Fmsteams-docs%2Fblob%2Fmain%2Fmsteams-platform%2Fbots%2Fhow-to%2Fauthentication%2Fadd-authentication.md&documentVersionIndependentId=70952f91-56e9-ff08-59f6-e237d4aaeca9&platformId=cc53b20b-69e0-cb70-1ca7-9b939c969c92&metadata=*%2BID%253A%2Be473e1f3-69f5-bcfa-bcab-54b098b59c80%2B%250A*%2BService%253A%2B%2A%2Amsteams%2A%2A)

### Configure the identity provider connection and register it with the bot

>[!NOTE]
> There are two options for Service Providers here, Azure Active Directory v1 and Azure Active Directory v2. The differences between the two providers are summarized [here](/azure/active-directory/azuread-dev/azure-ad-endpoint-comparison), but in general, v2 provides more flexibility with respect to changing bot permissions. Graph API permissions are listed in the scopes field, and as new ones are added, bots will allow users to consent to the new permissions on the next sign in. For v1, the bot consent must be deleted by the user for new permissions to be prompted in the OAuth dialog.

#### Microsoft Azure Active Directory (Azure AD) v1

1. In the [**Azure portal**][azure-portal], select your resource group from the dashboard.
1. Select your bot registration link.
1. Open the resource page and select **Configuration** under **Settings**.
1. Select **Add OAuth Connection Settings**.
   The following image displays the corresponding selection in the resource page:

   ![SampleAppDemoBot configuration](~/assets/images/authentication/sample-app-demo-bot-configuration.png)

1. Complete the form as follows:

    1. **Name**. Enter a name for the connection. You use this name in your bot in the `appsettings.json` file. For example, *BotTeamsAuthADv1*.
    1. **Service Provider**. Select **Azure Active Directory**. Once you select this option, the Azure Active Directory-specific fields are displayed.
    1. **Client id**. Enter the Application (client) ID that you recorded for your Azure identity provider app.
    1. **Client secret**. Enter the secret that you recorded for your Azure identity provider app.
    1. **Grant Type**. Enter `authorization_code`.
    1. **Login URL**. Enter `https://login.microsoftonline.com`.
    1. **Tenant ID**, enter the **Directory (tenant) ID** that you recorded earlier for your Azure identity app or **common** depending on the supported account type selected when you created the identity provider app. To decide which value to assign, follow these criteria:

        - If you selected either **Accounts in this organizational directory only (Microsoft only - Single tenant)** or **Accounts in any organizational directory (Any Microsoft Entra ID tenant - Multitenant)**, enter the **tenant ID** you recorded earlier for the Microsoft Entra app. This will be the tenant associated with the users who can be authenticated.

        - If you selected **Accounts in any organizational directory (Any Microsoft Entra ID tenant - Multitenant) and personal Microsoft accounts (e.g. Skype, Xbox)** enter the word **common** instead of a tenant ID. Otherwise, the Microsoft Entra app verifies through the tenant whose ID was selected and exclude personal Microsoft accounts.

    h. For **Resource URL**, enter `https://graph.microsoft.com/`. This URL isn't used in the code sample.  
    i. Leave **Scopes** blank. The following image is an example:

    :::image type="content" source="../../../assets/images/authentication/auth-bot-identity-connection-adv1.PNG" alt-text="Screenshot shows how to add Teams bot auth bot identity connection adv1.":::

1. Select **Save**.

> [!div class="nextstepaction"]
> [I ran into an issue](https://github.com/MicrosoftDocs/msteams-docs/issues/new?template=Doc-Feedback.yaml&title=%5BI+ran+into+an+issue%5D+Microsoft+Azure+Active+Directory+%28Azure+AD%29+v1&&author=%40surbhigupta&pageUrl=https%3A%2F%2Flearn.microsoft.com%2Fen-us%2Fmicrosoftteams%2Fplatform%2Fbots%2Fhow-to%2Fauthentication%2Fadd-authentication%3Ftabs%3Ddotnet%252Cdotnet-sample%23microsoft-azure-active-directory-azure-ad-v1&contentSourceUrl=https%3A%2F%2Fgithub.com%2FMicrosoftDocs%2Fmsteams-docs%2Fblob%2Fmain%2Fmsteams-platform%2Fbots%2Fhow-to%2Fauthentication%2Fadd-authentication.md&documentVersionIndependentId=70952f91-56e9-ff08-59f6-e237d4aaeca9&platformId=cc53b20b-69e0-cb70-1ca7-9b939c969c92&metadata=*%2BID%253A%2Be473e1f3-69f5-bcfa-bcab-54b098b59c80%2B%250A*%2BService%253A%2B%2A%2Amsteams%2A%2A)

#### Microsoft Azure Active Directory (Azure AD) v2

1. In the [**Azure portal**][azure-portal], select your Azure Bot from the dashboard.
1. In the resource page, select **Configuration** under **Settings**.
1. Select **Add OAuth Connection Settings**.  
   The following image displays the corresponding selection in the resource page:

   :::image type="content" source="../../../assets/images/authentication/sample-app-demo-bot-configuration.png" alt-text="Screenshot shows the corresponding selection in the resource page.":::

1. Complete the form as follows:

    1. **Name**. Enter a name for the connection. Use this name in your bot in the `appsettings.json` file. For example, *BotTeamsAuthADv2*.
    1. **Service Provider**. Select **Azure Active Directory v2**. Once you select this option, the Azure AD v2 specific fields are displayed.
    1. **Client id**. Enter the Application (client) ID that you recorded for your Azure identity provider app.
    1. **Client secret**. Enter the secret that you recorded for your Azure identity provider app.
    1. **Token Exchange URL**. Leave this blank.
    1. **Tenant ID**, enter the **Directory (tenant) ID** that you recorded earlier for your Azure identity app or **common** depending on the supported account type selected when you created the identity provider app. To decide which value to assign, follow these criteria:

        - If you selected either **Accounts in this organizational directory only (Microsoft only - Single tenant)** or **Accounts in any organizational directory (Any Microsoft Entra ID tenant - Multitenant)**, enter the **tenant ID** you recorded earlier for the Microsoft Entra app. This will be the tenant associated with the users who can be authenticated.

        - If you selected **Accounts in any organizational directory (Any Microsoft Entra ID tenant - Multitenant) and personal Microsoft accounts (e.g. Skype, Xbox)** enter the word **common** instead of a tenant ID. Otherwise, the Microsoft Entra app verifies through the tenant whose ID was selected and exclude personal Microsoft accounts.

    1. For **Scopes**, enter a space-delimited list of graph permissions this application requires, such as *User.Read*, *User.ReadBasic.All*, or *Mail.Read*.

1. Select **Save**.

> [!div class="nextstepaction"]
> [I ran into an issue](https://github.com/MicrosoftDocs/msteams-docs/issues/new?template=Doc-Feedback.yaml&title=%5BI+ran+into+an+issue%5D+Microsoft+Azure+Active+Directory+%28Azure+AD%29+v2&&author=%40surbhigupta&pageUrl=https%3A%2F%2Flearn.microsoft.com%2Fen-us%2Fmicrosoftteams%2Fplatform%2Fbots%2Fhow-to%2Fauthentication%2Fadd-authentication%3Ftabs%3Ddotnet%252Cdotnet-sample%23microsoft-azure-active-directory-azure-ad-v2&contentSourceUrl=https%3A%2F%2Fgithub.com%2FMicrosoftDocs%2Fmsteams-docs%2Fblob%2Fmain%2Fmsteams-platform%2Fbots%2Fhow-to%2Fauthentication%2Fadd-authentication.md&documentVersionIndependentId=70952f91-56e9-ff08-59f6-e237d4aaeca9&platformId=cc53b20b-69e0-cb70-1ca7-9b939c969c92&metadata=*%2BID%253A%2Be473e1f3-69f5-bcfa-bcab-54b098b59c80%2B%250A*%2BService%253A%2B%2A%2Amsteams%2A%2A)

### Test the connection

1. Select the connection entry to open the connection you created.
1. Select **Test Connection** at the top of the **Service Provider Connection Setting** panel.
1. For the first time, it opens a new browser window asking you to select an account. Select the one you want to use.
1. Next, allow to the identity provider to use your data (credentials). The following image is an example:

   :::image type="content" source="../../../assets/images/authentication/auth-bot-connection-test-accept.PNG" alt-text="The screenshot shows how to add Teams bot auth connection string adv1.":::

1. Select **Accept**.
1. A **Test Connection to \<your-connection-name> Succeeded** page opens. Refresh the page if you get an error. The following image is an example:

   :::image type="content" source="../../../assets/images/authentication/auth-bot-connection-test-token.PNG" alt-text="The screenshot shows how to add Teams app auth connection string adv1.":::

The bot code uses the connection name to retrieve user authentication tokens.

> [!div class="nextstepaction"]
> [I ran into an issue](https://github.com/MicrosoftDocs/msteams-docs/issues/new?template=Doc-Feedback.yaml&title=%5BI+ran+into+an+issue%5D+Test+the+connection&&author=%40surbhigupta&pageUrl=https%3A%2F%2Flearn.microsoft.com%2Fen-us%2Fmicrosoftteams%2Fplatform%2Fbots%2Fhow-to%2Fauthentication%2Fadd-authentication%3Ftabs%3Dnode-js%252Cdotnet-sample%23test-the-connection&contentSourceUrl=https%3A%2F%2Fgithub.com%2FMicrosoftDocs%2Fmsteams-docs%2Fblob%2Fmain%2Fmsteams-platform%2Fbots%2Fhow-to%2Fauthentication%2Fadd-authentication.md&documentVersionIndependentId=70952f91-56e9-ff08-59f6-e237d4aaeca9&platformId=cc53b20b-69e0-cb70-1ca7-9b939c969c92&metadata=*%2BID%253A%2Be473e1f3-69f5-bcfa-bcab-54b098b59c80%2B%250A*%2BService%253A%2B%2A%2Amsteams%2A%2A)

## Prepare the bot sample code

With the preliminary settings done, let's focus on the creation of the bot to use in this article.

# [C#/.NET](#tab/dotnet)

1. Clone [cs-auth-sample][teams-auth-bot-cs].
1. Open Visual Studio.
1. From the toolbar, select **File > Open > Project/Solution** and open the bot project.
1. In C#, Update **appsettings.json** as follows:

    - Set `CONNECTION_NAME` to the name of the identity provider connection you added to the bot registration. The name we used in this example is *BotTeamsAuthADv1*.
    - Set `CLIENT_ID` to the **bot App ID** you saved at the time of the bot registration.
    - Set `CLIENT_SECRET` to the **customer secret** you saved at the time of the bot registration.

    Depending on the characters in your bot secret, you might need to XML escape the password. For example, any ampersands (&) must be encoded as `&amp;`.

     ```JSON
    "Teams": { 
    "ClientId": "", 
    "ClientSecret": "", 
    "TenantId": "", 
    "ConnectionName": ""

  }
    ```

1. In the Solution Explorer, go to the `appPackage` folder, open `manifest.json` and set `id` and `botId` to the **bot App ID** you saved at the time of the bot registration. For more information, see [app manifest](/microsoft-365/extensibility/schema/root-bots#botid).

> [!div class="nextstepaction"]
> [I ran into an issue](https://github.com/MicrosoftDocs/msteams-docs/issues/new?template=Doc-Feedback.yaml&title=%5BI+ran+into+an+issue%5D+Prepare+the+bot+sample+code+using+C%23%2F.NET&&author=%40surbhigupta&pageUrl=https%3A%2F%2Flearn.microsoft.com%2Fen-us%2Fmicrosoftteams%2Fplatform%2Fbots%2Fhow-to%2Fauthentication%2Fadd-authentication%3Ftabs%3Dnode-js%252Cdotnet-sample%23test-the-connection&contentSourceUrl=https%3A%2F%2Fgithub.com%2FMicrosoftDocs%2Fmsteams-docs%2Fblob%2Fmain%2Fmsteams-platform%2Fbots%2Fhow-to%2Fauthentication%2Fadd-authentication.md&documentVersionIndependentId=70952f91-56e9-ff08-59f6-e237d4aaeca9&platformId=cc53b20b-69e0-cb70-1ca7-9b939c969c92&metadata=*%2BID%253A%2Be473e1f3-69f5-bcfa-bcab-54b098b59c80%2B%250A*%2BService%253A%2B%2A%2Amsteams%2A%2A)

# [JavaScript](#tab/node-js)

1. Clone [node-auth-sample][teams-auth-bot-js].
1. In a console, go to the project: </br></br>
`cd samples/TeamsSDK/bot-auth-quickstart/nodejs/bot-auth-quickstart`
1. Install modules</br></br>
`npm install`
1. Update the **.env** configuration as follows:

    - Set `CLIENT_ID` to the **bot App ID** you saved at the time of the bot registration.
    - Set `CLIENT_SECRET` to the **customer secret** you saved at the time of the bot registration.
    - Set the `CONNECTION_NAME` to the name of the identity provider connection.
    Depending on the characters in your bot secret, you might need to XML escape the password. For example, any ampersands (&) must be encoded as `&amp;`.

     ```Javascript
    TENANT_ID=
    CLIENT_ID=
    CLIENT_SECRET=
    CONNECTION_NAME=
    ```

1. In the `appPackage` folder, open `manifest.json` and set `id`  to your **Microsoft App ID** and `botId` to the **bot App ID** you saved at the time of the bot registration.

> [!div class="nextstepaction"]
> [I ran into an issue](https://github.com/MicrosoftDocs/msteams-docs/issues/new?template=Doc-Feedback.yaml&title=%5BI+ran+into+an+issue%5D+Prepare+the+bot+sample+code+using+JavaScript&&author=%40surbhigupta&pageUrl=https%3A%2F%2Flearn.microsoft.com%2Fen-us%2Fmicrosoftteams%2Fplatform%2Fbots%2Fhow-to%2Fauthentication%2Fadd-authentication%3Ftabs%3Dnode-js%252Cdotnet-sample%23prepare-the-bot-sample-code&contentSourceUrl=https%3A%2F%2Fgithub.com%2FMicrosoftDocs%2Fmsteams-docs%2Fblob%2Fmain%2Fmsteams-platform%2Fbots%2Fhow-to%2Fauthentication%2Fadd-authentication.md&documentVersionIndependentId=70952f91-56e9-ff08-59f6-e237d4aaeca9&platformId=cc53b20b-69e0-cb70-1ca7-9b939c969c92&metadata=*%2BID%253A%2Be473e1f3-69f5-bcfa-bcab-54b098b59c80%2B%250A*%2BService%253A%2B%2A%2Amsteams%2A%2A)

# [Python](#tab/python)

1. Clone [py-auth-sample][teams-auth-bot-py] from the GitHub repository.
1. Update **config.py**:

    - Set `CONNECTION_NAME` to the name of the OAuth connection setting you added to your bot.
    - Set `CLIENT_ID` and `CLIENT_SECRET` to your bot's app ID and app secret.

      Depending on the characters in your bot secret, you might need to XML escape the password. For example, any ampersands (&) must be encoded as `&amp;`.

     ```Python
    TENANT_ID=
    CLIENT_ID=
    CLIENT_SECRET=
    CONNECTION_NAME=
    ```

> [!div class="nextstepaction"]
> [I ran into an issue](https://github.com/MicrosoftDocs/msteams-docs/issues/new?template=Doc-Feedback.yaml&title=%5BI+ran+into+an+issue%5D+Prepare+the+bot+sample+code+using+Python&&author=%40surbhigupta&pageUrl=https%3A%2F%2Flearn.microsoft.com%2Fen-us%2Fmicrosoftteams%2Fplatform%2Fbots%2Fhow-to%2Fauthentication%2Fadd-authentication%3Ftabs%3Dpython%252Cdotnet-sample%23prepare-the-bot-sample-code&contentSourceUrl=https%3A%2F%2Fgithub.com%2FMicrosoftDocs%2Fmsteams-docs%2Fblob%2Fmain%2Fmsteams-platform%2Fbots%2Fhow-to%2Fauthentication%2Fadd-authentication.md&documentVersionIndependentId=70952f91-56e9-ff08-59f6-e237d4aaeca9&platformId=cc53b20b-69e0-cb70-1ca7-9b939c969c92&metadata=*%2BID%253A%2Be473e1f3-69f5-bcfa-bcab-54b098b59c80%2B%250A*%2BService%253A%2B%2A%2Amsteams%2A%2A)

---

### Deploy the bot to Azure

To deploy the bot, follow the steps in the How to [Deploy your bot to Azure](/azure/bot-service/provision-and-publish-a-bot?view=azure-bot-service-4.0&preserve-view=true&tabs=userassigned%2Ccsharp).

Alternatively, while in Visual Studio, you can follow these steps:

1. In Visual Studio *Solution Explorer*, select and hold (or right-click) the project name.
1. In the dropdown menu, select **Publish**.
1. In the displayed window, select the **New** link.
1. In the dialog window, select **App Service** and **Create New**.
1. Select the **Publish** button.
1. In the next dialog window, enter the required information.

   :::image type="content" source="../../../assets/images/authentication/auth-bot-app-service.png" alt-text="Screenshot shows how to enter required information for auth app service.":::

1. Select **Create**.
1. If the deployment completes successfully, you should see it reflected in Visual Studio. A page opens in your default browser with the message *Your bot is ready!*. The URL is similar to `https://botteamsauth.azurewebsites.net/`. Save it to a file.
1. In your browser, go to the [**Azure portal**][azure-portal].
1. Check your resource group, the bot is listed along with the other resources. The following image is an example:

   :::image type="content" source="../../../assets/images/authentication/auth-bot-app-service-in-group.png" alt-text="Screenshot shows how to check resource group and bot.":::

1. In the resource group, select the bot registration name (link).
1. In the left panel, select **Settings**.
1. In the **Messaging endpoint** box, enter the URL you just obtained followed by `api/messages`. For example, `https://botteamsauth.azurewebsites.net/api/messages`.
    > [!NOTE]
    > Only one messaging endpoint is allowed for a bot.
1. Select the **Save** button in the upper left.

> [!div class="nextstepaction"]
> [I ran into an issue](https://github.com/MicrosoftDocs/msteams-docs/issues/new?template=Doc-Feedback.yaml&title=%5BI+ran+into+an+issue%5D+Deploy+the+bot+to+Azure&&author=%40surbhigupta&pageUrl=https%3A%2F%2Flearn.microsoft.com%2Fen-us%2Fmicrosoftteams%2Fplatform%2Fbots%2Fhow-to%2Fauthentication%2Fadd-authentication%3Ftabs%3Ddotnet%252Cpython-sample%23deploy-the-bot-to-azure&contentSourceUrl=https%3A%2F%2Fgithub.com%2FMicrosoftDocs%2Fmsteams-docs%2Fblob%2Fmain%2Fmsteams-platform%2Fbots%2Fhow-to%2Fauthentication%2Fadd-authentication.md&documentVersionIndependentId=70952f91-56e9-ff08-59f6-e237d4aaeca9&platformId=cc53b20b-69e0-cb70-1ca7-9b939c969c92&metadata=*%2BID%253A%2Be473e1f3-69f5-bcfa-bcab-54b098b59c80%2B%250A*%2BService%253A%2B%2A%2Amsteams%2A%2A)

## Test the deployed bot

<!--There are several testing scenarios here. Ideally, we'd have a separate article on the what, why, 
and when for these, and just reference that from here, along with the set of steps that exercises the bot code.-->

1. In your browser, go to the [**Azure portal**][azure-portal].
1. Find your resource group.
1. Select the resource link. The resource page is displayed.
1. In the resource page, select **Test in Web Chat**. The bot starts and displays the predefined greetings.
1. Type anything in the chat box.
1. Select the **Sign in** box.
1. A pop-up dialog appears to **Confirm Open URL** to authenticate the bot's user (you).  
1. Select **Confirm**.
1. If asked, select the applicable user's account.
    The following image is an example of the bot UI after you sign in:

   :::image type="content" source="../../../assets/images/authentication/auth-bot-login-deployed.PNG" alt-text="Screenshot shows an example of the Teams bot UI after you sign in.":::

1. Select the **Yes** button to display your authentication token. The following image is an example:

   :::image type="content" source="../../../assets/images/authentication/auth-bot-login-deployed-token.PNG" alt-text="Screenshot shows how to select Yes button to display your authentication token.":::

1. Enter **logout** in the input chat box to sign out.

   :::image type="content" source="../../../assets/images/authentication/auth-bot-deployed-logout.PNG" alt-text="Screenshot shows how to sign out of the bot.":::

> [!NOTE]
> If you're having problems signing in, try to test the connection again as described in the previous steps. This could recreate the authentication token.
> With the Web Chat client in Azure, you may need to sign in several times before the authentication is established correctly.

> [!div class="nextstepaction"]
> [I ran into an issue](https://github.com/MicrosoftDocs/msteams-docs/issues/new?template=Doc-Feedback.yaml&title=%5BI+ran+into+an+issue%5D+Test+the+deployed+bot&&author=%40surbhigupta&pageUrl=https%3A%2F%2Flearn.microsoft.com%2Fen-us%2Fmicrosoftteams%2Fplatform%2Fbots%2Fhow-to%2Fauthentication%2Fadd-authentication%3Ftabs%3Ddotnet%252Cdotnet-sample%23test-the-deployed-bot&contentSourceUrl=https%3A%2F%2Fgithub.com%2FMicrosoftDocs%2Fmsteams-docs%2Fblob%2Fmain%2Fmsteams-platform%2Fbots%2Fhow-to%2Fauthentication%2Fadd-authentication.md&documentVersionIndependentId=70952f91-56e9-ff08-59f6-e237d4aaeca9&platformId=cc53b20b-69e0-cb70-1ca7-9b939c969c92&metadata=*%2BID%253A%2Be473e1f3-69f5-bcfa-bcab-54b098b59c80%2B%250A*%2BService%253A%2B%2A%2Amsteams%2A%2A)

## Install and test the bot in Teams

1. In your bot project, ensure that the `appPackage` folder contains the `manifest.json` along with an `outline.png` and `color.png` files.
1. In Solution Explorer, go to the `appPackage` folder. Edit `manifest.json` by assigning the following values:
    1. Ensure that the **bot App ID** you received at the time of the bot registration is assigned to `id` and `botId`.
    1. Assign this value: `validDomains: [ "token.botframework.com" ]`.
1. Select and **zip** the `manifest.json`, `outline.png`, and `color.png` files.
1. Open **Microsoft Teams**.
1. In the left panel, at the bottom, select the **Apps icon**.
1. In the right panel, at the bottom, select **Upload a custom app**.
1. Go to the `appPackage` folder and upload the zipped manifest.
1. Select **Add** to install the app to Teams.

   :::image type="content" source="../../../assets/images/authentication/auth-bot-add.png" alt-text="Screenshot of TeamsBotAuth app installation with the Add option highlighted.":::

1. Search and select the required scope or select a channel or chat from the list, and move through the dialog to select **Go**.

   :::image type="content" source="../../../assets/images/authentication/auth-bot-add-scope.png" alt-text="Screenshot of TeamsBotAuth app scope selection dialog to select the required scope.":::

   > [!NOTE]
   > OAuth isn't supported in the group chat or channel scopes directly. If you enable authentication and users install your bot in group chats or channels, they must authenticate in their personal scopes before they can use the bot in the group chat or channel.

1. Select the three dots (&#x25cf;&#x25cf;&#x25cf;) in the left panel. Then select the **Developer Portal** icon.
1. Select the **Manifest editor** tab. You should see the icon for the bot you uploaded.
1. Also, you should be able to see the bot listed as a contact in the chat list
that you can use to exchange messages with the bot.

> [!div class="nextstepaction"]
> [I ran into an issue](https://github.com/MicrosoftDocs/msteams-docs/issues/new?template=Doc-Feedback.yaml&title=%5BI+ran+into+an+issue%5D+Install+and+test+the+bot+in+Teams&&author=%40surbhigupta&pageUrl=https%3A%2F%2Flearn.microsoft.com%2Fen-us%2Fmicrosoftteams%2Fplatform%2Fbots%2Fhow-to%2Fauthentication%2Fadd-authentication%3Ftabs%3Ddotnet%252Cdotnet-sample%23install-and-test-the-bot-in-teams&contentSourceUrl=https%3A%2F%2Fgithub.com%2FMicrosoftDocs%2Fmsteams-docs%2Fblob%2Fmain%2Fmsteams-platform%2Fbots%2Fhow-to%2Fauthentication%2Fadd-authentication.md&documentVersionIndependentId=70952f91-56e9-ff08-59f6-e237d4aaeca9&platformId=cc53b20b-69e0-cb70-1ca7-9b939c969c92&metadata=*%2BID%253A%2Be473e1f3-69f5-bcfa-bcab-54b098b59c80%2B%250A*%2BService%253A%2B%2A%2Amsteams%2A%2A)

### Testing the bot locally in Teams

Teams is an entirely cloud-based product. It requires all services it accesses to be available from the cloud using HTTPS endpoints. Therefore, to enable the bot (our sample) to work in Teams, you need to either publish the code to the cloud of your choice, or make a locally running instance externally accessible via a **tunneling** tool. We recommend [ngrok](https://ngrok.com/download), which creates an externally addressable URL for a port you open locally on your machine.
To set up ngrok in preparation for running your Teams app locally, follow these steps:

1. In a terminal window, go the directory where you have `ngrok.exe` installed. We suggest setting the *environment variable* path to point to it.
1. Run, for example, `ngrok http 3978 --host-header=localhost:3978`. Replace the port number as needed.
It launches ngrok to listen on the port you specify. In return, it gives you an externally addressable URL, valid for as long as ngrok is running. The following image is an example:

   :::image type="content" source="../../../assets/images/authentication/auth-bot-ngrok-start.PNG" alt-text="Screenshot shows the Teams bot app auth connection string adv1":::

1. Copy the forwarding HTTPS address that is similar to: `https://dea822bf.ngrok.io/`.
1. Append `/api/messages` to obtain `https://dea822bf.ngrok.io/api/messages`, which is the **messages endpoint** for the bot running locally on your machine and reachable over the web in a chat in Teams.
1. One final step to perform is to update the messages endpoint of the deployed bot. In the example, we deployed the bot in Azure. So let's perform these steps:
    1. In your browser, go to the [**Azure portal**][azure-portal].
    1. Select your **Bot Registration**.
    1. In the left panel, select **Settings**.
    1. In the right panel, in the **Messaging endpoint** box, enter the ngrok URL, in our example, `https://dea822bf.ngrok.io/api/messages`.
1. Start your bot locally, for example in Visual Studio debug mode.
1. Test the bot while running locally using the Azure portal's **Test in Web Chat**.
1. In the terminal window where `ngrok` is running you can see HTTP traffic between the bot and the web chat client. If you want a more detailed view, in a browser window enter `http://127.0.0.1:4040` you obtained from the previous terminal window. The following image is an example:

   :::image type="content" source="../../../assets/images/authentication/auth-bot-teams-ngrok-testing.png" alt-text="Screenshot shows auth bot teams ngrok testing.":::

> [!NOTE]
> If you stop and restart ngrok, the URL changes. To use ngrok in your project, and depending on the capabilities you're using, you must update all URL references.

> [!div class="nextstepaction"]
> [I ran into an issue](https://github.com/MicrosoftDocs/msteams-docs/issues/new?template=Doc-Feedback.yaml&title=%5BI+ran+into+an+issue%5D+Testing+the+bot+locally+in+Teams&&author=%40surbhigupta&pageUrl=https%3A%2F%2Flearn.microsoft.com%2Fen-us%2Fmicrosoftteams%2Fplatform%2Fbots%2Fhow-to%2Fauthentication%2Fadd-authentication%3Ftabs%3Ddotnet%252Cdotnet-sample%23testing-the-bot-locally-in-teams&contentSourceUrl=https%3A%2F%2Fgithub.com%2FMicrosoftDocs%2Fmsteams-docs%2Fblob%2Fmain%2Fmsteams-platform%2Fbots%2Fhow-to%2Fauthentication%2Fadd-authentication.md&documentVersionIndependentId=70952f91-56e9-ff08-59f6-e237d4aaeca9&platformId=cc53b20b-69e0-cb70-1ca7-9b939c969c92&metadata=*%2BID%253A%2Be473e1f3-69f5-bcfa-bcab-54b098b59c80%2B%250A*%2BService%253A%2B%2A%2Amsteams%2A%2A)

## Additional information

### appPackage/manifest.json

This manifest contains information needed by Teams to connect with the bot:  

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

    "short": "Teams bot with SSO authentication and Graph API integration.", 

    "full": "This bot demonstrates SSO authentication in Microsoft Teams using Azure AD, and uses Microsoft Graph API to retrieve the user profile." 

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

    "id": "${{BOT_ID}}", 

    "resource": "api://botid-${{BOT_ID}}" 

  } 

} 
```

With authentication, Teams behaves differently than other channels.

> [!div class="nextstepaction"]
> [I ran into an issue](https://github.com/MicrosoftDocs/msteams-docs/issues/new?template=Doc-Feedback.yaml&title=%5BI+ran+into+an+issue%5D+TeamsAppManifest%2Fmanifest.json&&author=%40surbhigupta&pageUrl=https%3A%2F%2Flearn.microsoft.com%2Fen-us%2Fmicrosoftteams%2Fplatform%2Fbots%2Fhow-to%2Fauthentication%2Fadd-authentication%3Ftabs%3Ddotnet%252Cpython-sample%23teamsappmanifestmanifestjson&contentSourceUrl=https%3A%2F%2Fgithub.com%2FMicrosoftDocs%2Fmsteams-docs%2Fblob%2Fmain%2Fmsteams-platform%2Fbots%2Fhow-to%2Fauthentication%2Fadd-authentication.md&documentVersionIndependentId=70952f91-56e9-ff08-59f6-e237d4aaeca9&platformId=cc53b20b-69e0-cb70-1ca7-9b939c969c92&metadata=*%2BID%253A%2Be473e1f3-69f5-bcfa-bcab-54b098b59c80%2B%250A*%2BService%253A%2B%2A%2Amsteams%2A%2A)

## Code sample

This sample demonstrates how to implement Single Sign-On (SSO) authentication for Microsoft Teams bots using Azure Active Directory.

| **Sample name** | **Description** | **.NET** | **Node.js** | **Python** |
|---------------|------------|------------|-------------|---------------|---------------|
| Bot Auth Quickstart | This sample demonstrates how to implement Single Sign-On (SSO) authentication for Microsoft Teams bots using Azure Active Directory. | [View](https://github.com/OfficeDev/Microsoft-Teams-Samples/tree/main/samples/TeamsSDK/bot-auth-quickstart/dotnet/bot-auth-quickstart) | [View](https://github.com/OfficeDev/Microsoft-Teams-Samples/tree/main/samples/TeamsSDK/bot-auth-quickstart/nodejs/bot-auth-quickstart) | [View](https://github.com/OfficeDev/Microsoft-Teams-Samples/tree/main/samples/TeamsSDK/bot-auth-quickstart/python/bot-auth-quickstart) |

## See also

- [Get access on behalf of a user](/graph/auth-v2-user)

<!-- Footnote-style links -->

[azure-portal]: https://ms.portal.azure.com

[teams-auth-bot-cs]: https://github.com/OfficeDev/Microsoft-Teams-Samples/tree/main/samples/TeamsSDK/bot-auth-quickstart/dotnet/bot-auth-quickstart

[teams-auth-bot-py]: https://github.com/OfficeDev/Microsoft-Teams-Samples/tree/main/samples/TeamsSDK/bot-auth-quickstart/python/bot-auth-quickstart

[teams-auth-bot-js]: https://github.com/OfficeDev/Microsoft-Teams-Samples/tree/main/samples/TeamsSDK/bot-auth-quickstart/nodejs/bot-auth-quickstart
