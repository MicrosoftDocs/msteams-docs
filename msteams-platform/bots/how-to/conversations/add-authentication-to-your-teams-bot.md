---
title: Add authentication to your Teams bot
author: clearab
description: How to add OAuth authentication to a bot in Microsoft Teams.
ms.topic: overview
ms.author: anclear
---
# Add authentication to your Teams bot

> [!WARNING]
> Work in progress.

This article demonstrates how to use Azure Bot Service v4 SDK authentication, which includes new bot authentication capabilities based on OAuth 2.0, and provides features to make it easier to develop a bot that authenticates users to various identity providers.

OAuth 2.0 is an open standard for authentication and authorization used by Azure Active Directory and many other identity providers. A basic understanding of OAuth 2.0 is a prerequisite for working with authentication in Teams.

Notice that authentication flow for tabs and bots are different. Tabs are very similar to websites so they can use OAuth 2.0 directly. Bots must do a few things differently, but the core concepts still apply.

For more information see  [Microsoft Teams authentication flow for bots](../../../_old/concepts/bots/bot-authentication/auth-flow-bot.md).

For more information about how the Azure Bot Service handles authentication, see [User authentication within a conversation](https://docs.microsoft.com/azure/bot-service/bot-builder-concept-authentication?view=azure-bot-service-4.0).

## Create the bot

This section uses the bot sample code you cna download from this location: [teams-auth-bot](https://github.com/microsoft/BotBuilder-Samples/tree/master/samples/csharp_dotnetcore/46.teams-auth).

1. In your browser navigate to the [Azure portal][azure-portal].
1. In the left panel, click **Create a resource**.
1. In the right panel selection box enter "bot". Select **Bot Channels Registration** card from the search results.
1. Click **Create**.
1. You'll be asked to provide the following information: 
    1. **Name**. Enter tne name for the app registration. For example,  *TeamsBotRegistration*.
    1. **Subscription**. You can use an existing subscription.
    1. **Resource Group**. Select *TeamsBotsResourceGroup* you created earlier.
    1. **Region**. Select *West US 2* or the region closest to you.
    1. **Pricing Tier**. Make sure that *Standard S1* is selected. This should be the default value.
    1. **Messaging endpoint**. Leave it blank for now. You will insert the correct value after you have created the bot service app.
    1. Click **Create**.

### Get Azure app registration credentials

After the resource has been created, you must obtain its credentials which you will use in the bot `appsettings.json` or `.env` file in the code project. 

1. In the resource list, click on the name (link) of the resource just created.
1. In the right panel, in the resource blade, click **Settings**. The resource *Settings* page is displayed.
1. Double click on the generated **Microsoft App ID**, copy it and save it to a file. You will assign this ID to the `MicrosoftAppId` variable in the `appsettings.json` or `.env` bot file.  
1. Click the **Manage** button by the *Microsoft App ID*. The *Certificates & secrets* page is displayed.
1. Click the **New client secret** button.
1. Add the description, select the expiration time.
1. Click the **Add** button. This generate a new password. Copy it and save it to a file. 

> [!IMPORTANT]
> This is the only time you will see this password. If you do not have the full password saved, you will need to repeat the process to create a new password should you need it later.

For more information, see [Register a bot with Azure Bot Service](https://docs.microsoft.com/azure/bot-service/bot-service-quickstart-registration?view=azure-bot-service-3.0A).


### Test the bot via the emulator


## Teams authentication peculiarities

Teams behaves slightly differently than other channels, in case of authentication as explained below.

### Handling Invoke Activity

The **Invoke Activity** must be forwarded to the dialog when the **OAuthPrompt** is used. This is done by sub-classing the **ActivityHandler**.

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

An **Invoke Activity** is **sent to the bot** rather than the *Event Activity* as done in other channels. The *Invoke Activity* must be 
forwarded to the dialog if the **OAuthPrompt** is used. 

```cs
protected override async Task OnSigninVerifyStateAsync(ITurnContext<IInvokeActivity> turnContext, CancellationToken cancellationToken)
{
    Logger.LogInformation("Running dialog with signin/verifystate from an Invoke Activity.");

    // OAuth Prompt needs to see the Invoke Activity in order to complete the login process.
    // Run the Dialog with the new Invoke Activity.
    await Dialog.RunAsync(turnContext, ConversationState.CreateProperty<DialogState>(nameof(DialogState)), cancellationToken);
}

```

<!-- 

The sample shown next includes a reusable `TeamsActivityHandler` class which in future could be included in the Bot Framework SDK.
- The Teams channel is also capable of sending **Message Reaction Activities**. Virtual methods for these are included in the **TeamsActivityHandler**. 
- A Message Reaction Activity references the original Activity using the `replyToId`. 
  - This id would have actually been the value returned from a previous Message Activity the bot had sent. 
  - This activity should also be visible through the Activity Feed in Microsoft Teams, documentation for which can be found here [activity-feed](https://docs.microsoft.com/microsoftteams/platform/concepts/activity-feed).


// This IBot implementation can run any type of Dialog. The use of type parameterization is to allows multiple different bots
// to be run at different endpoints within the same project. This can be achieved by defining distinct Controller types
// each with dependency on distinct IBot types, this way ASP Dependency Injection can glue everything together without ambiguity.
// The ConversationState is used by the Dialog system. The UserState isn't, however, it might have been used in a Dialog implementation,
// and the requirement is that all BotState objects are saved at the end of a turn.


## Example

The sample uses the bot authentication capabilities in Azure Bot Service, providing features to make it easier to develop a bot that authenticates users to various identity providers such as Azure AD (Azure Active Directory), GitHub, Uber, etc. You cna download the code at this location: [teams-auth bot](https://github.com/microsoft/BotBuilder-Samples/tree/master/samples/csharp_dotnetcore/46.teams-auth). 

-->

## References

#### Teams
---
 test 

> [!WARNING]
> The following links to be revised. They are in the _old folder.  

- [Microsoft Teams authentication flow for bots](../../../_old/concepts/bots/bot-authentication/auth-flow-bot.md)
- [Authenticate a user in a Microsoft Teams bot](../../../_old/concepts/bots/bot-authentication/auth-bot-aad.md)
- [Using Azure Bot Service for Authentication in Teams](../../../_old/concepts/bots/bot-authentication/auth-oauth-card.md)


#### Bot framework
----

- [Add authentication to your bot via Azure Bot Service](https://docs.microsoft.com/azure/bot-service/bot-builder-authentication?view=azure-bot-service-4.0&tabs=csharp%2Cbot-oauth)


#### Sample code
----

- [teams-auth bot](https://github.com/microsoft/BotBuilder-Samples/tree/master/samples/csharp_dotnetcore/46.teams-auth)


<!-- Footnote-style links -->

[azure-portal]: https://ms.portal.azure.com



<!--- Ref links 
## Writing notes

 * **Purpose** Explain how to add authentication to your bot.
 * **Existing teams doc reference**
   * [https://docs.microsoft.com/en-us/microsoftteams/platform/concepts/authentication/auth-flow-bot](https://docs.microsoft.com/en-us/microsoftteams/platform/concepts/authentication/auth-flow-bot)
   * [https://docs.microsoft.com/en-us/microsoftteams/platform/concepts/authentication/auth-bot-aad](https://docs.microsoft.com/en-us/microsoftteams/platform/concepts/authentication/auth-bot-aad)
   * [https://docs.microsoft.com/en-us/microsoftteams/platform/concepts/authentication/auth-oauth-card](https://docs.microsoft.com/en-us/microsoftteams/platform/concepts/authentication/auth-oauth-card)
 * **Existing Bot framework doc reference**
   * [https://docs.microsoft.com/en-us/azure/bot-service/bot-builder-authentication?view=azure-bot-service-4.0&tabs=csharp%2Cbot-oauth](https://docs.microsoft.com/en-us/azure/bot-service/bot-builder-authentication?view=azure-bot-service-4.0&tabs=csharp%2Cbot-oauth)
 * **Code Snippets**
   * [https://github.com/microsoft/BotBuilder-Samples/tree/master/samples/csharp_dotnetcore/46.teams-auth](https://github.com/microsoft/BotBuilder-Samples/tree/master/samples/csharp_dotnetcore/46.teams-auth)
   --->
