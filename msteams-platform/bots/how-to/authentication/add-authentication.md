---
title: Add authentication to your Teams bot
author: surbhigupta
description: How to add OAuth authentication to a bot in Microsoft Teams.
ms.topic: how-to
ms.localizationpriority: medium
ms.author: lajanuar
---

# Add authentication to your Teams bot

This document helps you to use Azure Bot Service v4 SDK authentication, based on OAuth 2.0. This makes it easier to develop a bot that can use authentication tokens based on the user's credentials. You can create bots in Microsoft Teams that can access resources on behalf of the user, such as a mail service.

OAuth 2.0 is an open standard for authentication and authorization used by Azure Active Directory (AAD) and many other identity providers. A basic understanding of OAuth 2.0 is a prerequisite for working with authentication in Teams.

For more information about how the Azure Bot Service handles authentication, see [user authentication within a conversation](https://aka.ms/azure-bot-authentication).

The document scope includes:

- **How to create an authentication-enabled bot**. You will use [cs-auth-sample][teams-auth-bot-cs] to handle user sign in credentials and to generate the authentication token.
- **How to deploy the bot to Azure and associate it with an identity provider**. The provider issues a token based on user sign in credentials. The bot can use the token to access resources, such as a mail service, which require authentication. For more information, see [Microsoft Teams authentication flow for bots](auth-flow-bot.md).
- **How to integrate the bot within Microsoft Teams**. After the bot has been integrated, you can sign in and exchange messages with it in a chat.

## Prerequisites

Before you work with adding authentication to your Teams bot, you must have an understanding of the following:

* Knowledge of [bot basics][concept-basics], [managing state][concept-state], the [dialogs library][concept-dialogs], and how to [implement sequential conversation flow][simple-dialog].
* Knowledge of Azure and OAuth 2.0 development.
* [ngrok](https://ngrok.com/download) latest version (only for devbox testing) or any equivalent tunneling solution
* The current versions of Visual Studio and Git.
* Azure account. If required, you can create an [Azure free account](https://azure.microsoft.com/free/).

## Create an Azure bot

1. Go to the [Azure portal](https://portal.azure.com/).
1. Select **Create a resource**.
1. In the search box, enter **Azure Bot**.
1. Select **Enter**.
1. Select **Azure Bot**.

   ![Create Azure bot card](~/assets/images/bots/createazurebot.png)

1. Select **Create**.
1. Enter required bot handle name in **Bot handle**.
1. From the **Subscription** dropdown list, select **msteams.nonprod.pub.msft.aplt**.
1. From the **Resource group** dropdown list, Create new or select your existing resource group.

   >[!Tip]
   > You can create a new resource group (select **Create new** > enter resource name > select **OK**).

   ![Register bot](~/assets/images/Tab-ME-SSO/register-bot.png)

1. In the **Microsoft App ID** section, by default **Create new Microsoft App ID** is selected. 

    Select **Use existing app registration** and enter **Existing app ID** and **Existing app password** for an existing application. Select **Create new Microsoft App ID** for a new application.

   > [!NOTE]
   > You can't create more than one bot with the same **Microsoft App ID**.

1. Select **Review + create**.

   ![Register bot1](~/assets/images/Tab-ME-SSO/register-bot-2.png)

1. If the validation passes, select **Create**.
   It takes a few moments for your bot service to be provisioned.

1. Select **Go to resource**.

   ![Deploy App1](~/assets/images/Tab-ME-SSO/go-to-resource.png)

Your Azure bot is created.

> [!Tip]
> Save the **Microsoft App ID**. You'll use this value as the *Client ID* in future.
> Save **Directory (tenant) ID**. You'll use this value later as the *Tenant ID* to register this Azure identity application with your bot.

**To add a Client secret**

Perform the following steps if you've created a new **Microsoft App ID**:

1. In the left panel, select **Configuration**.

1. Next to **Microsoft App ID**, select **Manage**.

   ![Microsoft App ID](~/assets/images/Tab-ME-SSO/manage1.png)

1. Go to **Certificates & secrets**.
1. In the **Client secrets** section, select **New client secret**.
1. Enter **Description**.

1. Select **Add**.

   ![Add client secret to app](~/assets/images/Tab-ME-SSO/add-client-id.png)

1. In the **Value** column, select **Copy to clipboard**.

   > [!TIP]
   > Save the **Client secrets** value or app password for future reference.

1. Under **Manage**, go to **Expose an API**

   > [!TIP]
   > To update your app manifest later, save the **Application (client) ID** value.

1. Select **Set** to generate the Application ID URI.

   > [!IMPORTANT]
   > * If you are building a standalone bot, enter the Application ID URI as `api://botid-{YourBotId}`. Here **YourBotId** is your AAD application ID.
   > * If you are building an app with a bot and a tab, enter the Application ID URI as `api://fully-qualified-domain-name.com/botid-{YourBotId}`.

1. Select **Add a scope**.
1. In the panel that prompts, enter `access_as_user` as the **Scope name**.

   >[!NOTE]
   > The "access_as_user" scope used to add a client app is for "Administrators and users".
   >
   > You must be aware of the following important restrictions:
   >
   > * Only user-level Microsoft Graph API permissions, such as email, profile, offline_access, and OpenId are supported. If you need access to other Microsoft Graph scopes, such as `User.Read` or `Mail.Read`, see [Get an access token with Graph permissions](../../../tabs/how-to/authentication/auth-aad-sso.md#get-an-access-token-with-graph-permissions).
   > * Your application's domain name must be same as the domain name that you have registered for your AAD application.
   > * Multiple domains per app are currently not supported.
   > * Applications that use the `azurewebsites.net` domain are not supported because it is common and may be a security risk.

1. In the **Who can consent?**, enter **Admins and users**.
1. Enter the following details to configure the admin and user consent prompts with values that are appropriate for the `access_as_user`scope.

     | Field | Value |
     | -------- | -------- |
     | **Admin consent display name** | Teams can access the user’s profile |
     | **Admin consent description** | Allows Teams to call the app’s web APIs as the current user. |
     | **User consent display name** | Teams can access your user profile and make requests on your behalf |
     | **User consent description** | Enable Teams to call this app’s APIs with the same rights that you have. |

1. Ensure that the state is set to **Enabled**.
1. Select **Add scope** to save the details.

   ![Admin and user](~/assets/images/authentication/add-a-scope.png)


   > [!Note]
   > The **Scope name** must automatically match the **Application ID** URI set in the previous step, with `/access_as_user` appended to the end `api://subdomain.example.com/00000000-0000-0000-0000-000000000000/access_as_user`.

1. In **Authorized client applications**, identify the applications that you want to authorize for your app’s web application.
1. Select **Add a client application**.
1. Enter each of the following client IDs and select the authorized scopes:
     * `1fec8e78-bce4-4aaf-ab1b-5451cc387264` for Teams mobile or desktop application.

         ![ID one](~/assets/images/authentication/add-client-application.png)

     * `5e3ce6c0-2b1f-4285-8d4b-75ee78787346` for Teams web application.

         ![ID two](~/assets/images/authentication/add-client-application21.png)

1. Go to **API permissions**.

   > [!NOTE]
   > Users need to consent to these permissions only if the AAD app is registered in a different tenant.

1. Select **Add a permission**.

1. Select **Microsoft Graph**.

   ![Microsoft Graph](~/assets/images/Tab-ME-SSO/microsoft-graph.png)

1. Select **Delegated permissions**.
1. Select the permissions that your application needs for the AAD endpoint, such as, **User.Read**, **OpenID**, **email** and other permissions.

## Create the service plan

1. In the [**Azure portal**][azure-portal], on the left navigation pane, select **Create a resource**.
1. In the search box, enter **App Service Plan**.
1. Select the **App Service Plan** card from the search results.
1. Select **Create**.
1. Provide the following information:

     | Field | Value |
     | -------- | -------- |
     | **Subscription** | You can use an existing subscription. |
     | **Resource Group** | Select the group you created earlier. |
     | **Name** | Enter the name for the service plan. For example, *TeamsServicePlan*. Remember that the name must be unique, within the group. |
     |**Operating System** | Select **Windows** or your applicable OS. |
     | **Region** | Select **West US** or a region close to your applications. |
     | **Pricing Tier** | Make sure that **Standard S1** is selected. This should be the default value. |

1. Select the **Review + create**.
1. If the Validation passes, select **Create**.

   > [!Note]
   > It will take a few minutes to create the app service plan. The plan will be listed in the resource group.

## Create the identity provider

You will use an Azure AD identity provider for authentication; other Azure AD supported identity providers can also be used.

**To create the identity provider**

1. In the [**Azure portal**][azure-portal], on the left pane, select **Azure Active Directory**.

    > [!TIP]
    > You must create and register this AAD resource in a tenant.
    > You can consent to delegate permissions requested by an application.
    > For instruction on creating a tenant, see [access the portal and create a tenant](/azure/active-directory/fundamentals/active-directory-access-create-new-tenant).

1. In the left pane, select **App registrations**.
1. Select your bot in **Owned applications**.
1. Go to **Authentication**.
1. In **Platform configurations**, select **Add a platform**.
1. Select **Web**.

    ![Configure platform1](~/assets/images/authentication/configure-platform1.png)

1. Enter the **Redirect URIs** for your app.

   >[!NOTE]
   > This URI should be a fully qualified domain name. It's also followed by the API route where an authentication response is sent. If you're following any of the Teams samples, the URI is `https://token.botframework.com/.auth/web/redirect`. For more information, see [OAuth 2.0 authorization code flow](/azure/active-directory/develop/v2-oauth2-auth-code-flow).

1. Enable implicit grant and hybrid flow by selecting the following checkboxes:
    * **Access tokens**
    * **ID tokens**

     >[!NOTE]
     > **Implicit grant** may be required in the AAD application.

1. Select **Configure**.

    ![Configure platform](~/assets/images/authentication/configure-web.png)

### Configure the identity provider connection and register it with the bot

> [!NOTE]
> There are two options for Service Providers, Azure AD V1 and Azure AD V2. The differences between the two providers are summarized in [update to Microsoft identity platform (v2.0)](/azure/active-directory/azuread-dev/azure-ad-endpoint-comparison). In general, V2 provides more flexibility with respect to changing bot permissions. Graph API permissions are listed in the scopes field, and as new ones are added, bots will allow users to consent to the new permissions on the next sign in. For V1, the bot consent must be deleted by the user for new permissions to be prompted in the OAuth dialog.

#### Azure AD V1

1. Go to **Configuration** on the left pane.
1. Select **Add OAuth Connection Settings**.
1. Enter the following values:

     | Field | Value or description |
     | ----- | ---------- |
     |**Name** | Enter a name for the connection. For example *BotTeamsAuthADv1* |
     | **Service Provider** | Select **Azure Active Directory**.  |
     | **Client id** |Saved previously as your **Microsoft App ID** |
     | **Client secret** | Saved previously as **Value** of the client secret ID. |
     | **Grant Type** | `authorization_code`|
     | **Login URL** | `https://login.microsoftonline.com`|
     | **Tenant ID** | Enter the **Directory (tenant) ID** that you saved previously for your Azure identity app if you selected either **Single tenant** type of app or enter **common** if you selected **Multi tenant** type of app. |
     |**Resource URL** | Enter `https://graph.microsoft.com/`. |  
     | **Scopes** | Leave it blank. |

1. Select **Save**.

   ![AAD v1](~/assets/images/Tab-ME-SSO/new-connection-bot-v1.png)


#### Azure AD V2

1. Go to **Configuration** on the left pane.
1. Select **Add OAuth Connection Settings**.
1. Enter the following values:

     | Field | Value or description |
     | ----- | ---------- |
     |**Name** | Enter a name for the connection. For example *BotTeamsAuthADv2*. |
     | **Service Provider** | Select **Azure Active Directory v2**. |
     | **Client id** | Saved previously as your **Microsoft App ID**. |
     | **Client secret** |  Saved previously as **Value** of the client secret ID. |
     | **Token Exchange URL** | Leave this blank. |
     | **Tenant ID** | Enter the **Directory (tenant) ID** that you saved previously for your Azure identity app if you selected either **Single tenant** type of app or enter **common** if you selected **Multi tenant** type of app. |
     | **Scopes** | Enter a space-delimited list of graph permissions this application requires, for example, User.Read User.ReadBasic.All Mail.Read. |

1. Select **Save**.

   ![AAD v2](~/assets/images/Tab-ME-SSO/new-connection-bot-v2.png)


### Test the connection

1. Select **Configuration**.
1. Select the name of connection in **Add OAuth Connection Settings**, for example, *BotTeamsAuthADv1*.

   ![connection name](~/assets/images/Tab-ME-SSO/connection-check.png)

1. Select **Test Connection** at the top of the **Service Provider Connection Setting** pane.

   ![Test connection](~/assets/images/Tab-ME-SSO/test-connection.png) 

1. The first time you do this will open a new browser window asking you to select an account. Select the one you want to use.
1. You will be asked to allow the identity provider to use your data or credentials. Select **Accept**.

   ![permission box](~/assets/images/Tab-ME-SSO/consent-box2.png)


1. This should then redirect you to a **Test Connection to \<your-connection-name> Succeeded** page. Refresh the page if you get an error. The following image is an example:

   ![Web token](~/assets/images/Tab-ME-SSO/web-token.png)

The connection name is used by the bot code to retrieve user authentication tokens.

## Prepare the bot sample code

With the preliminary settings done, prepare the bot sample code.

# [C#/.NET](#tab/dotnet)

1. Clone [cs-auth-sample][teams-auth-bot-cs].
1. Launch Visual Studio.
1. From the toolbar, select **File -> Open -> Project/Solution** and open the bot project.
1. In C#, update **appsettings.json** as follows:

    - Set `ConnectionName` to the name of the identity provider connection you added to the bot channel registration. The name we used in this example is *BotTeamsAuthADv1*.
    - Set `MicrosoftAppId` to the **bot App ID** you saved at the time of the bot channel registration.
    - Set `MicrosoftAppPassword` to the **customer secret** you saved at the time of the bot channel registration.

    Depending on the characters in your bot secret, you must XML escape the password. For example, any ampersands (&) will need to be encoded as `&amp;`.

     [!code-json[appsettings](~/../botbuilder-samples/samples/csharp_dotnetcore/46.teams-auth/appsettings.json?range=1-5)]

1. In the Solution Explorer, go to the `TeamsAppManifest` folder, open `manifest.json`, and set `id` and `botId` to the **bot App ID** you saved at the time of the bot channel registration.

# [JavaScript](#tab/node-js)

1. Clone [node-auth-sample][teams-auth-bot-js].
1. In a console, go to the project: </br></br>
    `cd samples/javascript_nodejs/46.teams`  
1. Install modules using the following command: </br></br>
    `npm install`
1. Update the **.env** configuration as follows:

    - Set `MicrosoftAppId` to the **bot App ID** you saved at the time of the bot channel registration.
    - Set `MicrosoftAppPassword` to the **customer secret** you saved at the time of the bot channel registration.
    - Set the `connectionName` to the name of the identity provider connection.
    Depending on the characters in your bot secret, you must XML escape the password. For example, any ampersands (&) will need to be encoded as `&amp;`.

     [!code-javascript[settings](~/../botbuilder-samples/samples/javascript_nodejs/46.teams-auth/.env)]

1. In the `teamsAppManifest` folder, open `manifest.json` and set `id`  to your **Microsoft App ID** and `botId` to the **bot App ID** you saved at the time of the bot channel registration.

# [Python](#tab/python)

1. Clone [py-auth-sample][teams-auth-bot-py] from the github repository.
1. Update **config.py**:

    - Set `ConnectionName` to the name of the OAuth connection setting you added to your bot.
    - Set `MicrosoftAppId` and `MicrosoftAppPassword` to your bot's app ID and app secret.

      Depending on the characters in your bot secret, you must XML escape the password. For example, any ampersands (&) will need to be encoded as `&amp;`.

      [!code-python[config](~/../botbuilder-samples/samples/python/46.teams-auth/config.py?range=14-16)]

---

### Deploy the bot to Azure

To deploy the bot, follow the steps in [deploy your bot to Azure](https://aka.ms/azure-bot-deployment-cli).

Alternatively, in Visual Studio, you can follow these steps:

1. In Visual Studio **Solution Explorer**, select and hold (or right-click) the project name.
1. In the drop-down menu, select **Publish**.
1. In the displayed window, select the **Add a publish profile**.
1. In the next window that prompts, select **Azure**.
1. Select your Azure app service.
1. In the dialog window, select **App Service** on the left and **Create New** on the right.
 
    ![create-app-service1](~/assets/images/Tab-ME-SSO/create-app-service.png)

1. Select the **Publish** button.
1. In the next dialog window, enter the required information. The following is an example:

    ![auth-app-service](~/assets/images/Tab-ME-SSO/app-service.png)

1. Select **Create**.
1. If the deployment completes successfully, you will see it reflected in Visual Studio. A page is displayed in your default browser saying *Your bot is ready!*. The URL will be similar to this: `https://botteamsauth.azurewebsites.net/`, save the url.
1. In your browser, go to the [**Azure portal**][azure-portal].
1. Check your resource group, the bot should be listed along with the other resources.
1. In the resource group, select the bot.
1. In the left pane, select **Configuration**.
1. In **Messaging endpoint**, enter the URL obtained above followed by `api/messages`. For example: `https://botteamsauth.azurewebsites.net/api/messages`.
1. Select the **Save** button in the upper left.

## Test the bot using the Emulator

If you have not done it already, install the [Microsoft Bot Framework Emulator](https://aka.ms/bot-framework-emulator-readme). See also [debug with the Emulator](https://aka.ms/bot-framework-emulator-debug-with-emulator).

In order for the bot sample login to work you must configure the Emulator.

### Configure the Emulator for authentication

If a bot requires authentication, you must configure the Emulator.

**To configure the Emulator for authentication**

1. Start the Emulator.
1. In the Emulator, select the gear icon &#9881; in the bottom left, or the **Emulator Settings** tab in the upper right.
1. Select the **Use version 1.0 authentication tokens** checkbox.
1. Enter the local path to the **ngrok** tool. For more information, see the Bot Framework Emulator or ngrok tunneling integration [Wiki](https://github.com/Microsoft/BotFramework-Emulator/wiki/Tunneling-(ngrok)). For more tool information, see [ngrok](https://ngrok.com/).
1. Select the **Run ngrok when the Emulator starts up** checkbox.
1. Select **Save**.

When the bot displays a sign-in card and the user selects the sign-in button, the Emulator opens a page that the user can use to sign in with the authentication provider.
After the user signs in, the provider generates a user token and sends it to the bot. After that, the bot can act on behalf of the user.

### Test the bot locally

After you have configured the authentication mechanism, you can perform the actual bot testing.

**To test the bot locally**

1. Run the bot sample locally on your machine using Visual Studio for example.
1. Start the Emulator.
1. Select **Open bot**.
1. In **Bot URL**, enter the bot's local URL. Usually, `http://localhost:3978/api/messages`.
1. In **Microsoft App ID**, enter the bot's app ID from `appsettings.json`.
1. In **Microsoft App password**, enter the bot's app password from the `appsettings.json`.
1. Select **Connect**.
1. After the bot is up and running, enter any text to display the sign-in card.
1. Select the **Sign in** button.

    ![sign-in-bot1](~/assets/images/Tab-ME-SSO/sign-in-bot.png)

1. A pop-up dialog is displayed to **Confirm Open URL**. This is to allow the bot's user to be authenticated.  
1. Select **Confirm**.

    ![confirm1](~/assets/images/Tab-ME-SSO/confirm-url.png)

1. If asked, select the applicable user's account.
1. Depending which configuration you used for the Emulator, you get one of the following:
    - **Using sign-in verification code**  
       * A window is opened displaying the validation code.  
       * Copy and enter the validation code into the chat box to complete sign in.
    - **Using authentication tokens**.  
       * You are logged in based on your credentials.

       ![login1](~/assets/images/Tab-ME-SSO/login.png)

1. If you select **Yes** when the bot asks **Would you like to view your token?**, you will get a response similar to the following:

    ![token2](~/assets/images/Tab-ME-SSO/token-view2.png)

1. Enter **logout** in the input chat box to sign out.
    This releases the user token, and the bot will not be able to act on your behalf until you sign in again.

    ![logout1](~/assets/images/Tab-ME-SSO/logout.png)

> [!NOTE]
> Bot authentication requires use of the **Bot Connector Service**. The service accesses the bot channels registration information for your bot.

## Test the deployed bot

<!--There are several testing scenarios here. Ideally, we'd have a separate article on the what, why, 
and when for these, and just reference that from here, along with the set of steps that exercises the bot code.-->

1. In your browser, navigate to the [**Azure portal**][azure-portal].
1. Find your resource group.
1. Select the resource link. The resource page is displayed.
1. In the resource page, select **Test in Web Chat**. The bot starts and displays the predefined messages.
1. Enter anything in the chat box.
1. Select the **Sign in** box.
1. A pop-up dialog is displayed to **Confirm Open URL**. This is to allow the bot's user to be authenticated.  
1. Select **Confirm**.
1. If asked, select the applicable user's account.
1. Select **Yes** to view token and **No** to continue with chat.
1. Enter **logout** to sign out.

> [!NOTE]
> If you are having problems signing in, try to test the connection again as described in the earlier steps. This recreates the authentication token.
> With the Bot Framework Web Chat client in Azure, you must sign in several times before the authentication is established correctly.

## Upload and test the bot in Teams

**To set up ngrok**

The following steps will help you to set up ngrok in preparation for running your Microsoft Teams app locally:

1. In a terminal window, go to the directory where you have `ngrok.exe` installed. We suggest setting the *environment variable* path to point to it.
1. Run the following command in the terminal window:

     ```bash
     ngrok http -host-header=localhost 3978
     ```

1. From ngrok, copy the HTTPS URL (https to io).

   ![ngrok](~/assets/images/Tab-ME-SSO/ngrok-bots.png)

**To update messaging endpoint**

1. Go to the [**Azure portal**][azure-portal]
1. Select your bot from **Recent resources**.
1. Select **Configuration**.
1. In **Messaging endpoint**, use the HTTPS URL available from ngrok and at the end of the URL add **/api/messages**. 
   For example, `https://ab1e-110-235-239-61.ngrok.io/api/messages`

   > [!Note]
   > This is the **Messages endpoint** for the bot running locally on your machine and reachable over the web in a chat in Microsoft Teams.

1. Select **Apply**.

**To update manifest.jason**

In Solution Explorer, navigate to the `TeamsAppManifest` folder. Edit `manifest.json` by assigning `id` and `botId` with you **Microsoft app ID**.

**To upload the app to Teams**

1. Start your bot locally, for example in Visual Studio debug mode.
1. Go to `TeamsAppManifest` folder.
1. Select and zip the `manifest.json`, `outline.png`, and `color.png` files.
1. Go to Teams.
1. In the left pane, in the lower left corner, select **Apps**.
1. In the **Apps** section, in the lower left corner, select **Upload a custom app**.
1. Select **Publish an app**.
1. Go to the `TeamsAppManifest` folder and select the zipped manifest.
1. A window will prompt, select **Add**.

   ![add bot](~/assets/images/Tab-ME-SSO/add-bot.png)

You will see the bot listed as a contact in the chat list.
Exchange messages with the bot

   ![int](~/assets/images/Tab-ME-SSO/int-bot.png)

You have successfully uploaded your bot to teams.

## Additional information

### TeamsAppManifest/manifest.json

This manifest contains information required by Microsoft Teams to connect with the bot:

```json
{
  "$schema": "https://developer.microsoft.com/json-schemas/teams/v1.8/MicrosoftTeams.schema.json",
  "manifestVersion": "1.5",
  "version": "1.0.0",
  "id": "",
  "packageName": "com.teams.auth.bot",
  "developer": {
    "name": "TeamsBotAuth",
    "websiteUrl": "https://www.microsoft.com",
    "privacyUrl": "https://www.teams.com/privacy",
    "termsOfUseUrl": "https://www.teams.com/termsofuse"
  },
  "icons": {
    "color": "color.png",
    "outline": "outline.png"
  },
  "name": {
    "short": "TeamsBotAuth",
    "full": "Teams Bot Authentication"
  },
  "description": {
    "short": "TeamsBotAuth",
    "full": "Teams Bot Authentication"
  },
  "accentColor": "#FFFFFF",
  "bots": [
    {
      "botId": "",
      "scopes": [
        "groupchat",
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
    "*.ngrok.io"
  ]
}

```

With authentication, Teams behaves slightly differently than other channels, as explained later.

### Handling Invoke Activity

An **Invoke Activity** is sent to the bot rather than the Event Activity used by other channels. This is done by sub-classing the **ActivityHandler**.

# [C#/.NET](#tab/dotnet-sample)

**Bots/DialogBot.cs**

[!code-csharp[ActivityHandler](~/../botbuilder-samples/samples/csharp_dotnetcore/46.teams-auth/Bots/DialogBot.cs?range=19-51)]

**Bots/TeamsBot.cs**

The *Invoke Activity* must be forwarded to the dialog if the **OAuthPrompt** is used.

[!code-csharp[ActivityHandler](~/../botbuilder-samples/samples/csharp_dotnetcore/46.teams-auth/Bots/TeamsBot.cs?range=34-42)]

#### TeamsActivityHandler.cs

```csharp

protected virtual Task OnInvokeActivityAsync(ITurnContext<IInvokeActivity> turnContext, CancellationToken cancellationToken)
{
    switch (turnContext.Activity.Name)
    {
        case "signin/verifyState":
            return OnSigninVerifyStateAsync(turnContext, cancellationToken);

        default:
            return Task.CompletedTask;
    }
}

protected virtual Task OnSigninVerifyStateAsync(ITurnContext<IInvokeActivity> turnContext, CancellationToken cancellationToken)
{
    return Task.CompletedTask;
}
```

# [JavaScript](#tab/node-js-dialog-sample)

**bots/dialogBot.js**

[!code-javascript[ActivityHandler](~/../botbuilder-samples/samples/javascript_nodejs/46.teams-auth/bots/dialogBot.js?range=4-46)]

**bots/teamsBot.js**

The *Invoke Activity* must be forwarded to the dialog if the **OAuthPrompt** is used.

[!code-javascript[ActivityHandler](~/../botbuilder-samples/samples/javascript_nodejs/46.teams-auth/bots/teamsBot.js?range=4-33)]

**dialogs/mainDialog.js**

Within the dialog, use `beginDialog` to start the OAuth prompt, which asks the user to sign in.

- If the user is already signed in, this will generate a token response event, without prompting the user.
- Otherwise, this will prompt the user to sign in. The Azure Bot Service sends the token response event after the user attempts to sign in.

[!code-javascript[AddOAuthPrompt](~/../botbuilder-samples/samples/javascript_nodejs/46.teams-auth/dialogs/mainDialog.js?range=50-52)]

Within the following dialog, check for the presence of a token in the result from the previous step. If it is not null, the user successfully signed in.

[!code-javascript[AddOAuthPrompt](~/../botbuilder-samples/samples/javascript_nodejs/46.teams-auth/dialogs/mainDialog.js?range=50-64)]

**bots/logoutDialog.js**

[!code-javascript[allow-logout](~/../botbuilder-samples/samples/javascript_nodejs/46.teams-auth/dialogs/logoutDialog.js?range=31-42&highlight=7)]

# [Python](#tab/python-sample)

**bots/dialog_bot.py**

[!code-python[ActivityHandler](~/../botbuilder-samples/samples/python/46.teams-auth/bots/dialog_bot.py?range=10-42)]

**bots/teams_bot.py**

The *Invoke Activity* must be forwarded to the dialog if the **OAuthPrompt** is used.

[!code-python[on_token_response_event](~/../botbuilder-samples/samples/python/46.teams-auth/bots/teams_bot.py?range=38-45)]

**dialogs/main_dialog.py**

Within the dialog, use `begin_dialog` to start the OAuth prompt, which asks the user to sign in.

- If the user is already signed in, this will generate a token response event, without prompting the user.
- Otherwise, this will prompt the user to sign in. The Azure Bot Service sends the token response event after the user attempts to sign in.

[!code-python[Add OAuthPrompt](~/../botbuilder-samples/samples/python/46.teams-auth/dialogs/main_dialog.py?range=48-49)]

Within the following dialog, check for the presence of a token in the result from the previous step. If it is not null, the user successfully signed in.

[!code-python[Add OAuthPrompt](~/../botbuilder-samples/samples/python/46.teams-auth/dialogs/main_dialog.py?range=51-61)]

**dialogs/logout_dialog.py**

[!code-python[allow logout](~/../botbuilder-samples/samples/python/46.teams-auth/dialogs/logout_dialog.py?range=29-36&highlight=6)]

---

## Code samples

| Sample | BotBuilder version | Demonstrates | .Net | Node.js | Python |
|:---|:---:|:---:|:---:|:---:|:---:|
| **Bot authentication** | v4 | OAuthCard support | [View][teams-auth-bot-cs] | [View][teams-auth-bot-js] | [View][teams-auth-bot-py] |


## See also

[Add authentication through Azure Bot Service](https://aka.ms/azure-bot-add-authentication)

<!-- Footnote-style links -->

[azure-portal]: https://ms.portal.azure.com

[concept-basics]: /azure/bot-service/bot-builder-basics?view=azure-bot-service-4.0&preserve-view=true
[concept-state]: /azure/bot-service/bot-builder-concept-state?view=azure-bot-service-4.0&preserve-view=true
[concept-dialogs]: /azure/bot-service/bot-builder-concept-dialog?view=azure-bot-service-4.0&preserve-view=true
[simple-dialog]: /azure/bot-service/bot-builder-dialog-manage-conversation-flow?view=azure-bot-service-4.0&preserve-view=true

[teams-auth-bot-cs]: https://github.com/microsoft/BotBuilder-Samples/tree/master/samples/csharp_dotnetcore/46.teams-auth

[teams-auth-bot-py]: https://github.com/microsoft/BotBuilder-Samples/tree/master/samples/python/46.teams-auth

[teams-auth-bot-js]: https://github.com/microsoft/BotBuilder-Samples/tree/master/samples/javascript_nodejs/46.teams-auth

[azure-aad-blade]: https://ms.portal.azure.com/#blade/Microsoft_AAD_IAM/ActiveDirectoryMenuBlade/Overview
[aad-registration-blade]: https://ms.portal.azure.com/#blade/Microsoft_AAD_IAM/ActiveDirectoryMenuBlade/RegisteredAppsPreview
