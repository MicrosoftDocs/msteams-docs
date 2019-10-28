---
title: Add authentication to your Teams bot
author: clearab
description: How to add OAuth authentication to a bot in Microsoft Teams.
ms.topic: overview
ms.author: anclear
---

# Add authentication to your Teams bot

There are times when you may need to create bots in Microsoft Teams that can access resources on behalf of the user, such as a mail service.

This article demonstrates how to use Azure Bot Service v4 SDK authentication, based on OAuth 2.0. This makes it easier to develop a bot that can use authentication tokens based on the user's credentials. Key in all this is the use of **identity providers**, as we will see later.

OAuth 2.0 is an open standard for authentication and authorization used by Azure Active Directory and many other identity providers. A basic understanding of OAuth 2.0 is a prerequisite for working with authentication in Teams.

See [OAuth 2 Simplified](https://aka.ms/oauth2-simplified) for a basic understanding, and [OAuth 2.0](https://oauth.net/2/) for the complete specification.

For more information about how the Azure Bot Service handles authentication, see [User authentication within a conversation](https://aka.ms/azure-bot-authentication).

In this article you will learn:

- **How to create an authentication-enabled bot**. You will use the [cs-auth-sample][teams-auth-bot] sample. The example handles user's login and the authentication token generation.
- **How to deploy the bot to Azure and associate it with an identity provider**. The provider issues a token based on the user's credentials. The bot can use the token to access resources, such as a mail service, which require authentication. For more information see  [Microsoft Teams authentication flow for bots](../../../_old/concepts/bots/bot-authentication/auth-flow-bot.md).
- **How to integrate the bot within Microsoft Teams**. Once the bot has been integrated, you can login and exchange messages with it in a chat.

## Prerequisites

- Knowledge of [bot basics][concept-basics], [managing state][concept-state], the [dialogs library][concept-dialogs], and how to [implement sequential conversation flow][simple-dialog].
- Knowledge of Azure and OAuth 2.0 development.
- Visual Studio 2017 or later and git.
- Azure account. If needed you can create an [Azure free account](https://azure.microsoft.com/en-us/free/).
- The following sample.

    | Sample | BotBuilder version | Demonstrates |
    |:---|:---:|:---|
    | **Bot authentication** in [cs-auth-sample][teams-auth-bot] | v4 | OAuthCard support |

## Create the resource group

The resource group and the service plan are not strictly necessary but they allow you to conveniently release the resources you create. This is a good practice to keep your resources better organized and manageable.

You use a resource group to create individual resources for the Bot Framework. For performance, assure that these resources are located in the same Azure region.

1. In your browser sign in the [Azure portal][azure-portal].
1. In the left navigation panel, select **Resource groups**.
1. In the upper left of the displayed window, click the **Add** tab to create a new resource group. You are prompted to provide some information:
    1. **Subscription** Use your existing subscription.
    1. **Resource group** Enter tne name for the resource group. An example could be  *TeamsResourceGroup*. Remember that the name must be unique.
    1. From the Region drop-down, select *West US*, or a region close to your applications.
    1. Click **Review and create** button. You should see a banner that reads *Validation passed*.
    1. Click the **Create** button. It may take a few minutes to create the resource group.
 
 > [!TIP]
> As with the resources you'll create later in this tutorial, it's a good idea to pin this resource group to your dashboard for easy access. If you'd like to pin this resource group, click the pin icon in the upper right of the dashboard.

## Create the service plan

1. In the [**Azure portal**][azure-portal], on the left navigation panel, select **Create a resource**.
1. In the search box, type *App Service Plan*. Select the **App Service Plan** card from the search results.
1. Click **Create**.
1. You'll be asked to provide the following information:
    1. **Subscription**. You can use an existing subscription.
    1. **Resource Group**. Select the group you created earlier.
    1. **Name**. Enter the name for the service plan. An example could be  *TeamsServicePlan*. Remember that the name must be unique, within the group.
    1. **Operating System**. Select *Windows* or the OS that applies to your case.
    1. **Region**. Select *West US* or a region close to your applications.
    1. **Pricing Tier**. Make sure that *Standard S1* is selected. This should be the default value.
    1. Click **Review and create** button. You should see a banner that reads *Validation passed*.
    1. Click **Create**. It may take a few minutes to create the app service plan. The plan will be listed in the resource group. 

## Create the bot channels registration

The bot channels registration registers your web service as a bot with the Bot Framework, providing you an App Id and secret.

[!INCLUDE [bot channels registration steps](~/includes/bots/azure-bot-channels-registration.md)]

After Azure has created the registration resource it lists it in the related resource group.  

![bot app channels registration group](~/bots/how-to/conversations/media/auth-bot-channels-registration-group.PNG)

> [!NOTE]
> The Bot Channels Registration resource will show the **Global** region even though you selected West US. This is expected.

For more information, see [Create a bot for Teams](~/bots/how-to/create-a-bot-form-teams.md).

## Create the identity provider

You need an identity provider that can be used for authentication.
In this procedure you will use an Azure Active Directory (AD) provider; other Azure supported identity providers can also be used.

1. In the [Azure portal][azure-portal], on the left navigation panel, select **Azure Active Directory**.
    > [!TIP]
    > You will need to create and register this Azure AD resource in a tenant
    > in which you can consent to delegate permissions requested by an application.
    > For instruction on creating a tenant, see [Access the portal and create a tenant](/azure/active-directory/fundamentals/active-directory-access-create-new-tenant).
1. In the left panel, click **App registrations**.
1. In the right panel, click the **New registration** tab, in the upper left.
1. You'll be asked to provide the following information: 
   1. **Name**. Enter the name for the application. An example could be  *BotTeaamsIdentity*. Remember that the name must be unique.
   1. Select the **Supported account types** for your application. Select *Accounts in any organizational directory (Any Azure AD directory - Multitenant) and personal Microsoft accounts (e.g. Skype, Xbox)*.
   1. For the **Redirect URI**
       1. Select **Web**.
       1. Set the URL to `https://token.botframework.com/.auth/web/redirect`.
   1. Click **Register**.

1. Once it is created, Azure displays the **Overview** page for the app. Copy and save to a file the following information:

    1. The **Application (client) ID** value. You will use this value later as the *Client id* when you register this Azure identity application with your bot.
    1. The **Directory (tenant) ID** value. You will also use this value later to register this Azure identity application with your bot.

1. In the left panel, click **Certificates & secrets** to create a secret for your application.

   1. Under **Client secrets**, click **New client secret**.
   1. Add a description to identify this secret from others you might need to create for this app, such as *Bot identity app in Teams*.
   1. Set **Expires** to your selection.
   1. Click **Add**.
   1. Before leaving this page, record the secret. You will use this value later as the _Client secret_ when you register your Azure AD application with your bot.

### Configure the identity provider connection and register it with the bot

1. In the [Azure portal](http://portal.azure.com/), select your resource group from the dashboard.
1. Click on your bot channel registration link.
1. On the blade, click **Settings**.
1. Under **OAuth Connection Settings** near the bottom of the page, click **Add Setting**.
1. Fill in the form as follows:

    1. **Name**. Enter a name for the connection. You'll use this name in your bot in the `appsettings.json` file. For example *BotTeamsAuthADv1*. 
    1. For **Service Provider**. Select **Azure Active Directory**. Once you select this, the Azure AD-specific fields will be displayed.
    1. **Client id**. Enter the Application (client) ID that you recorded for your Azure identity provider app in the steps above. 
    1. **Client secret**. Enter the secret that you recorded for your Azure identity provider app in the steps above.
    1. For **Grant Type**. Enter `authorization_code`.
    1. For **Login URL**. Enter `https://login.microsoftonline.com`.
    1. For **Tenant ID**, enter the **directory (tenant) ID** that your recorded earlier for your Azure identity app or **common** depending on the supported account type selected when you created the identity provider app. To decide which value to assign follow these criteria:

        - When creating the identity app if you selected either *Accounts in this organizational directory only (Microsoft only - Single tenant)* or *Accounts in any organizational directory(Microsoft AAD directory - Multi tenant)* enter the **tenant ID** you recorded earlier for the AAD app.

        - However, if you selected *Accounts in any organizational directory (Any AAD directory - Multi tenant and personal Microsoft accounts e.g. Skype, Xbox, Outlook.com)* enter the word **common** instead of a tenant ID. Otherwise, the AAD app will verify through the tenant whose ID was selected and exclude personal MS accounts.

        This will be the tenant associated with the users who can be authenticated.

    1. For **Resource URL**, enter `https://graph.microsoft.com/`. Not used in the current code sample. 
    1. Leave **Scopes** blank.

        The following picture shows an example:

        ![teams bots app auth connection string adv1](~/bots/how-to/conversations/media/auth-bot-identity-connection-adv1.PNG)

1. Click **Save**.

### Test the connection

1. Click on the connection entry to open the connection you just created.
1. Click **Test Connection** at the top of the **Service Provider Connection Setting** panel.
1. The first time, this should open a new browser window asking you to select an account. Select the one you want to use.
1. Next, you will be asked to allow to the identity provider to use your data (credentials) The following picture shows an example:

    ![teams bots app auth connection string adv1](~/bots/how-to/conversations/media/auth-bot-connection-test-accept.PNG)

1. Click **Accept**.
1. This should then redirect you to a **Test Connection to \<your-connection-name> Succeeded** page. Refresh the page if you get an error. The following picture shows an example:

    ![teams bots app auth connection string adv1](~/bots/how-to/conversations/media/auth-bot-connection-test-token.PNG)

This connection name is used by the bot code to retrieve user authentication tokens.

## Prepare the bot sample code

With the preliminary settings done, let's focus on the creation of the bot to use in this article.

1. Clone the [cs-auth-sample][teams-auth-bot] sample.
1. Launch Visual Studio.
1. From the toolbar select **File->Open->Project/Solution** and open the bot project.
1. Update **appsettings.json** as follows:

    - Set `ConnectionName` to the name of the identity provider connection you added to the bot channel registration. The name we used in this example is *BotTeamsAuthADv1*.
    - Set `MicrosoftAppId` to the **bot App ID** you saved at the time of the bot channel registration.
    - Set `MicrosoftAppPassword` to the **customer secret** you saved at the time of the bot channel registration.
    - Set the `ConnectionName` to the name of the identity provider connection. 

    Depending on the characters in your bot secret, you may need to XML escape the password. For example, any ampersands (&) will need to be encoded as `&amp;`.

        ```cs
        {
            "MicrosoftAppId": "", // The bot App Id 
            "MicrosoftAppPassword": "", // The bot client secret
            "ConnectionName": "" // The name of the identity provider connection
        }
        ```

1. In the solution explorer, navigate to the `TeamsAppManifest` folder, open the `manifest.json` and set `id` and `botId` to the **bot App ID** you saved at the time of the bot channel registration.

### Deploy the bot to Azure

To deploy the bot, follow the steps in the how to [Deploy your bot to Azure](https://aka.ms/azure-bot-deployment-cli).

Alternatively, wile in Visual Studio, you can follow these steps:

1. In Visual Studio, in the *Solution Explorer* right-click on the project name.
1. In the drop-down menu, select **Publish**.
1. In the displayed window, click the **New** link.
1. In the dialog window, select **App Service** on the left and **Create New** on the right.
1. Click the **Publish** button.
1. In the next dialog window, enter the required information. The following is an example:

   ![auth-app-service](~/bots/how-to/conversations/media/auth-bot-app-service.png)

1. Click **Create**.
1. If the deployment completes successfully, you should see it reflected in Visual Studio. Moreover, a page is displayed in your default browser saying *Your bot is ready!*. The URL will be similar to this: `https://botteamsauth.azurewebsites.net/`. Save it to a file.
1. In your browser, navigate to the [Azure portal][azure-portal].
1. Check your resource group, the bot should be listed along with the other resources. The following picture shows an example:

    ![teams-bot-auth-app-service-group](~/bots/how-to/conversations/media/auth-bot-app-service-in-group.png)

1. In the resource group, click the bot channel registration name (link).
1. In the left panel, click **Settings**.
1. In the **Messaging endpoint** box, enter the URL obtained above followed by `api/messages`. This is an example: `https://botteamsauth.azurewebsites.net/api/messages`.
1. Click the **Save** button in the upper left.

## Test the bot using the Emulator

If you have not done it already, install the [Bot Framework Emulator](https://aka.ms/bot-framework-emulator-readme). See also [Debug with the emulator](https://aka.ms/bot-framework-emulator-debug-with-emulator).

In order for the bot sample login to work you must configure the Emulator as shown below.

### Configure the emulator for authentication

If a bot requires authentication, you must configure the emulator as shown below.

1. Start the Emulator.
1. In the Emulator, click the gear icon in the bottom left, or the **Emulator Settings** tab in the upper right.
1. Check the box by **Use version 1.0 authentication tokens**.
1. Enter the local path to the **ngrok** tool. For more the tool information, see [ngrok](https://ngrok.com/).
1. Check the box by **Run ngrok when the Emulator starts up**.
1. Click the  **Save** button.

When the bot displays a sign-in card and the user clicks the sign-in button, the Emulator opens a page that the user can use to sign in with the authentication provider. 
Once the user does so, the provider generates a user token and sends it to the bot. After that, the bot can act on behalf of the user.

### Test the bot locally

After you have configured the authentication mechanism, you can perform the actual bot testing.  

1. Run the bot sample locally on your machine, via Visual Studio for example.
1. Start the Emulator.
1. Click the **Open bot** button. 
1. In the **Bot URL**, enter the bot's local URL. Usually, `http://localhost:3978/api/messages`.
1. In the **Microsoft App ID** enter the bot's app ID from the `appsetting.json`.
1. In the **Microsoft App password** enter the bot's app password from the `appsetting.json`.
1. Click **Connect**.
1. After the bot is up and running, enter any text to display the sign-in card.
1. Click the **Sign in** button.
1. A pop-up dialog is displayed to **Confirm Open URL**. This is to allow the bot's user (you) to be authenticated.  
1. Click **Confirm**.
1. If asked, select the applicable user's account.
1. Depending which configuration you used for the emulator, you get one of the following:
    1. **Using sign-in verification code**
        1. A window is opened displaying the validation code.
        1. Copy and enter the validation code into the chat box to complete the sign-in.
    1. **Using authentication tokens**.
        1. You are logged in based on your credentials.

    The following picture is an example of the bot UI after you have logged in:

    ![auth bot login emulator](~/bots/how-to/conversations/media/auth-bot-login-emulator.PNG)

1. If you click **Yes** when the bot asks *Would ypu like to view your token?*, you get a response similar to the following:

    ![auth bot login emulator token](~/bots/how-to/conversations/media/auth-bot-login-emulator-token.png)
1. Enter **logout** in the input chat box to sign out.
This releases the user token, and the bot will not be able to act on your behalf until you sign in again.

> [!NOTE]
> Bot authentication requires use of the Bot Connector Service. The service accesses the bot channels registration information for your bot.

## Test the deployed bot

<!--There are several testing scenarios here. Ideally, we'd have a separate article on the what, why, 
and when for these, and just reference that from here, along with the set of steps that exercises the bot code.-->

1. In your browser, navigate to the [Azure portal][azure-portal].
1. Find your resource group.
1. Click the resource link. The resource page is displayed.
1. In the resource blade, click **Test in Web Chat**. The bot starts and displays the predefined greetings. 
1. Type anything in the chat box. 
1. Click the **Sign in** box.
1. A pop-up dialog is displayed to **Confirm Open URL**. This is to allow the bot's user (you) to be authenticated.  
1. Click **Confirm**.
1. If asked, select the applicable user's account.
    The following picture is an example of the bot UI after you have logged in:

    ![auth bot login deployed](~/bots/how-to/conversations/media/auth-bot-login-deployed.PNG).

1. Click the **Yes** button to display your authentication token. The following picture shows an example:

    ![auth bot login deployed token](~/bots/how-to/conversations/media/auth-bot-login-deployed-token.PNG).

1. Enter logout to sign out.

    ![auth bot deployed logout](~/bots/how-to/conversations/media/auth-bot-deployed-logout.PNG)

> [!NOTE]
> If you are having problems signing in, try to test the connection again as described in the previous steps. This could recreate the authentication token.
> With Web Chat client in Azure, you may need to sign in a couple times before the authentication is established correctly.

## Preliminary quick testing the bot in Teams

The following steps allow you to do a quick install by using the bot GUID, so you can perform preliminary testing.

> [!WARNING]
> Adding a bot by GUID, for anything other than testing purposes, is not recommended.
> Doing so severely limits the functionality of a bot.
> Bots in production must be added to Teams as part of an app. See [Create a bot](~/bots/how-to/create-a-bot-for-teams.md).

1. In your browser, navigate to the [Azure portal][azure-portal].
1. In the left pane, select **All Resources**.
1. In the right panel find your bot **Azure AD Registration**. 
1. Click the **Channels** blade, and then click the **Teams** icon.

    ![auth bot connect to teams channel](~/bots/how-to/conversations/media/auth-bot-connect-to-teams-channel.png)

1. Click the **Save** button. 
1. After adding the Teams channel, go to the Channels page and click the **Get bot embed code**.
1. Copy the https part of the code that is showing in the Get bot embed code dialog. For example, `https://teams.microsoft.com/l/chat/0/0?users=28:b8a22302e-9303-4e54-b348-343232`.
1. In the browser, paste this address and then choose the Microsoft Teams app (client or web) that you use to add the bot to Teams. You should be able to see the bot listed as a contact in that chat list. 
1. Use it to exchange messages with the bot.
For more information, see [Connect a bot to Teams](/azure/bot-service/channel-connect-teams?view=azure-bot-service-4.0).


## Install and test the bot in Teams

1. In your bot project, assure that the `TeamsAppManifest` folder contains the `manifest.json` along with an `outline.png` and `color.png` files.
1. In the solution explorer, navigate to the folder `TeamsAppManifest` folder. Edit the `manifest.json` file ed assign the following values:
    1. Assure that the **bot App ID** you got at the time of the bot chanel registration is assigned to `id` and `botId`.
    1. Assign this value: `validDomains: [ "token.botframework.com" ]`.
1. Select and **zip** the files `manifest.json`, `outline.png`, and `color.png`.
1. Open **Microsoft Teams**.
1. In the left panel, at the bottom, click the **Apps icon**.
1. In the right panel, at the bottom, click **Upload a custom app**.
1. Navigate to the `TeamsAppManifest` folder and upload the zipped manifest.
The following wizard is displayed:

    ![auth bot teams upload](../../media/auth-bot-teams-upload.png)

1. Click the **Add to a team** button.
1. In the next window, select the team where to use the bot.
1. Click thw **Set up a bot** button.
1. Click the three dots in the left panel. Then click **App Studio** icon.
1. Click the **Manifest editor** tab. You should see the icon of the bot you uploaded.
1. Also, you should be able to see the bot listed as a contact in that chat list.
Use it to exchange messages with the bot.

### Testing the bot locally in Teams

Microsoft Teams is an entirely cloud-based product, it requires all services it accesses to be available from the cloud using HTTPS endpoints. Therefore, to enable the bot (our sample)to work in Teams, you need to either publish the code to the cloud of your choice, or make a local running instance externally accessible via a **tunneling**. tool. We recommend  [ngrok](https://ngrok.com/download), which creates an externally addressable URL for a port you open locally on your machine. 
To set up ngrok in preparation for running your Microsoft Teams app locally, perform these steps:

1. In a terminal window, go the directory where you have `ngrok.exe` installed. We suggest too set the *environment variable* path pointing to it. 
1. Run, for example, `> ngrok http 3978 --host-header=localhost:3978`. Replace the port number as needed.
This launches ngrok to listen on the port you specify. In return, it gives you an externally addressable URL, valid for as long as ngrok is running. The following picture shows an example:

    ![teams bots app auth connection string adv1](~/bots/how-to/conversations/media/auth-bot-ngrok-start.PNG).

1. Copy the forwarding https address, in the picture shown is: `https://dea822bf.ngrok.io/`.
1. Append to it `/api/messages` to obtain `https://dea822bf.ngrok.io/api/messages`. This is the **messages endpoint** for the bot running locally on your machine and reachable over the web in a chat in Microsoft Teams.
1. One final step to perform is to update the messages end point of the deployed bot. In teh example, we deployed the bot in Azure. So let's perform these steps:
    1. In your browser navigate to the [Azure portal][azure-portal].
    1. Select your **Bot Channel Registration**.
    1. In the left panel, click **Settings**.
    1. In the right panel, in the **Messaging endpoint** box, enter the ngrok URL, in our example, `https://dea822bf.ngrok.io/api/messages`.
1. Start your bot locally, for example in Visual Studio debug mode.
1. Test the bot while running locally using the Bot Framework portal's **Test Web chat**. Like the emulator, this test doesn't allow you to access Teams-specific functionality.
1. In the terminal window where `ngrok` is running you can see HTTP traffic between the bot and the web chat client. If you want a more detailed view, in a browser window enter `http://127.0.0.1:4040` you obtain from the previous terminal window. The following picture shows an example:

    ![auth bot teams ngrok testing](~/bots/how-to/conversations/media/auth-bot-teams-ngrok-testing.png).

> [!NOTE]
> If you stop and restart ngrok, the URL changes. To use ngrok in your project, and depending on the capabilities you are using, you must replace all URL references.

## Additional information

### TeamsAppManifest/manifest.json

This manifest contains information needed by Microsoft Teams to be able to connect with the bot.  

```json 
{
  "$schema": "https://developer.microsoft.com/en-us/json-schemas/teams/v1.3/MicrosoftTeams.schema.json",
  "manifestVersion": "1.3",
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
  "validDomains": [ "token.botframework.com" ]
}
```

Teams behaves slightly differently than other channels, in case of authentication as explained below.

### Handling Invoke Activity

An **Invoke Activity** is sent to the bot rather than the Event Activity used by other channels.
This is done by sub-classing the **ActivityHandler**.

#### Bots\DialogBots.cs

```cs
public class DialogBot<T> : TeamsActivityHandler where T : Dialog
{
    protected readonly BotState ConversationState;
    protected readonly Dialog Dialog;
    protected readonly ILogger Logger;
    protected readonly BotState UserState;

    public DialogBot(ConversationState conversationState, UserState userState, T dialog, ILogger<DialogBot<T>> logger)
    {
        ConversationState = conversationState;
        UserState = userState;
        Dialog = dialog;
        Logger = logger;
    }

    public override async Task OnTurnAsync(ITurnContext turnContext, CancellationToken cancellationToken = default(CancellationToken))
    {
        await base.OnTurnAsync(turnContext, cancellationToken);

        // Save any state changes that might have occured during the turn.
        await ConversationState.SaveChangesAsync(turnContext, false, cancellationToken);
        await UserState.SaveChangesAsync(turnContext, false, cancellationToken);
    }

    protected override async Task OnMessageActivityAsync(ITurnContext<IMessageActivity> turnContext, CancellationToken cancellationToken)
    {
        Logger.LogInformation("Running dialog with Message Activity.");

        // Run the Dialog with the new message Activity.
        await Dialog.RunAsync(turnContext, ConversationState.CreateProperty<DialogState>(nameof(DialogState)), cancellationToken);
    }
}
```

#### Bots\TeamsBot.cs

The *Invoke Activity* must be forwarded to the dialog if the **OAuthPrompt** is used. 

```cs
protected override async Task OnSigninVerifyStateAsync(ITurnContext<IInvokeActivity> turnContext, CancellationToken cancellationToken)
{
    Logger.LogInformation("Running dialog with signin/verifystate from an Invoke Activity.");

    // OAuth Prompt needs to see the Invoke Activity in order to complete the login process.
    // Run the Dialog with the new Invoke Activity.
    await Dialog.RunAsync(turnContext, ConversationState.CreateProperty<DialogState>(nameof(DialogState)), cancellationToken);
}

```

#### TeamsActivityHandler.cs

```cs

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

## Further reading

- [Add authentication to your bot via Azure Bot Service](https://aka.ms/azure-bot-add-authentication)

<!-- Footnote-style links -->

[azure-portal]: https://ms.portal.azure.com

[concept-basics]: https://docs.microsoft.com/azure/bot-service/bot-builder-basics?view=azure-bot-service-4.0
[concept-state]: https://docs.microsoft.com/azure/bot-service/bot-builder-concept-state?view=azure-bot-service-4.0
[concept-dialogs]: https://docs.microsoft.com/azure/bot-service/bot-builder-concept-dialog?view=azure-bot-service-4.0
[simple-dialog]: https://docs.microsoft.com/azure/bot-service/bot-builder-dialog-manage-conversation-flow?view=azure-bot-service-4.0

[teams-auth-bot]: https://github.com/microsoft/BotBuilder-Samples/tree/master/samples/csharp_dotnetcore/46.teams-auth

[azure-aad-blade]: https://ms.portal.azure.com/#blade/Microsoft_AAD_IAM/ActiveDirectoryMenuBlade/Overview
[aad-registration-blade]: https://ms.portal.azure.com/#blade/Microsoft_AAD_IAM/ActiveDirectoryMenuBlade/RegisteredAppsPreview
