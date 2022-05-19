---
title: Bots and SDKs
author: surbhigupta
description: Overview of the tools and SDKs for building Microsoft Teams bots.
ms.topic: overview
ms.localizationpriority: medium
ms.author: anclear
---

# Bots and SDKs

You can create a bot that works in Microsoft Teams with one of the following tools or capabilities:

* [Microsoft Bot Framework SDK](#bots-with-the-microsoft-bot-framework)
* [Power Virtual Agents](#bots-with-power-virtual-agents)
* [Virtual Assistant](~/samples/virtual-assistant.md)
* [Webhooks and connectors](#bots-with-webhooks-and-connectors)
* [Azure bot service](#azure-bot-service)

## Bots with the Microsoft Bot Framework

Your Teams bot consists of the following:

* A publicly accessible web service hosted by you.
* A Bot Framework registration for your web service.
* Your Teams app package, which connects the Teams client to your web service.

> [!TIP]
> Use the Developer Portal to register your web service with the Bot Framework and specify your app configurations. For more information, see [manage your apps with the Developer Portal for Teams](~/concepts/build-and-test/teams-developer-portal.md).

The [Bot Framework](https://dev.botframework.com/) is a rich SDK used to create bots using C#, Java, Python, and JavaScript. If you already have a bot that is based on the Bot Framework, you can easily modify it to work in Teams. Use either C# or Node.js to take advantage of our [SDKs](/microsoftteams/platform/#pivot=sdk-tools). These packages extend the basic Bot Builder SDK classes and methods as follows:

* Use specialized card types like the Office 365 connector card.
* Set Teams-specific channel data on activities.
* Process message extension requests.

> [!IMPORTANT]
> You can develop Teams apps in any web programming technology and call the [Bot Framework REST APIs](/bot-framework/rest-api/bot-framework-rest-overview) directly. But you must perform token handling in all cases.

## Bots with Power Virtual Agents

[Power Virtual Agents](/power-virtual-agents/fundamentals-what-is-power-virtual-agents) is a chatbot service built on the Microsoft Power platform and Bot Framework. The Power Virtual Agent development process uses a guided, no-code, and graphical interface approach that empowers your team members to easily create and maintain an intelligent virtual agent. After creating your chatbot in the [Power Virtual Agents portal](https://powervirtualagents.microsoft.com), you can easily [integrate it with Teams](how-to/add-power-virtual-agents-bot-to-teams.md). For more information on getting started, see [Power Virtual Agents documentation](/power-virtual-agents).

>[!NOTE]
>You must not use Microsoft Power Platform to create apps that are to be published to the Teams app store. Microsoft Power Platform apps can be published to an organization’s app store only.

## Bots with webhooks and connectors

Webhooks and connectors connect your bot to your web services. Using webhooks and connectors, you can create a bot for basic interaction, such as creating a workflow or other simple commands. They are available only in the team where you create them and are intended for simple processes specific to your company's workflow. For more information, see [what are webhooks and connectors](~/webhooks-and-connectors/what-are-webhooks-and-connectors.md).

## Azure bot service

The Azure bot service, along with the Bot Framework, provides tools to build, test, deploy, and manage intelligent bots, all in one place. You can also create your bot in Azure bot service.

> [!IMPORTANT]
> Bot applications within Microsoft Teams are available in GCC-High through [Azure bot Service](/azure/bot-service/channel-connect-teams).

> [!NOTE]
> * Bots in GCCH only support  up to manifest version v1.10.
> * Image URL's in Adaptive Cards are not supported in GCCH environment. You can replace an image URL with Base64 encoded DataUri.
> * Bot channel registration in Azure Government will provision web app bot, app service (app service plan), and application insights also but it doesn't support to provision the azure bot service only (no app service).
>   <details>
>   <summary><b>If you want to do bot registration only</b></summary>
>
>   * Go to the resource group to and manually delete the unused resources . Such as the app service, app service plan (if you created during bot registration) and the application insights (if you choose to enable it during bot registration).
>   * You can also use az-cli to do bot registration:
>
>     1. Sign into azure and set the subscription <br> 
>           &nbsp; az cloud set –name  "AzureUSGovernment" <br> 
>           &nbsp; az account set –name "`subscriptionname/id`".<br>
>     1. Create app registration  
>           &nbsp; az ad app create --display-name "`name`" <br> 
>           &nbsp; --password "`password`" --available-to-other-tenants.<br> 
>           Your app id would be created here.<br>
>     1. Create bot resource <br>
>           &nbsp; az bot create –resource-group "`resource-group`"<br>
>           &nbsp; --appid "`appid`"<br>
>           &nbsp; --name "`botid`"<br>
>           &nbsp; --kind "registration".<br>
>
> </details>

For GCCH environment, you need to register a bot using [Azure Government portal](https://portal.azure.us).

:::image type="content" source="../assets/videos/abs-bot.gif" alt-text="Azure Government portal":::
<br>
<br>
The following changes are needed within the bot for GCC-High environment:
<br>
<br>
<details>
<summary><b>Configuration changes</b></summary>

As the bot registration occurs in Azure Government portal, ensure to update the bot configurations to connect to Azure govermnet instances. Following are the configuration details:

| Configuration Name | Value |
|----|----|
| ChannelService | `https://botframework.azure.us` |
| OAuthUrl | `https://tokengcch.botframework.azure.us` |
| ToChannelFromBotLoginUrl | `https://login.microsoftonline.us/MicrosoftServices.onmicrosoft.us` |
| ToChannelFromBotOAuthScope | `https://api.botframework.us` |
| ToBotFromChannelTokenIssuer | `https://api.botframework.us`  |
| BotOpenIdMetadata | `https://login.botframework.azure.us/v1/.well-known/openidconfiguration` |

</details>
<br>
<details>
<summary><b>Update to appsettings.json & startup.cs</b></summary>

1. **Update appsettings.json:**

    * Set `ConnectionName` to the name of the OAuth connection setting you added to your bot.

    * Set `MicrosoftAppId` and `MicrosoftAppPassword` to your bot's app ID and app secret.
    
    Depending on the characters in your bot secret, you may need to XML escape the password. For example, any ampersands (&) need to be encoded as `&amp;`.

    ```json
    {
      "MicrosoftAppType": "",
      "MicrosoftAppId": "",
      "MicrosoftAppPassword": "",
      "MicrosoftAppTenantId": "",
      "ConnectionName": ""
    }
    ```
2. **Update Startup.cs:**

    To use OAuth in *non-public Azure clouds*, like the government cloud, or in bots with data-residency, you must add the following code in the **Startup.cs** file.
    
    ```csharp
    string uri = "<uri-to-use>";
    MicrosoftAppCredentials.TrustServiceUrl(uri);
    OAuthClientConfig.OAuthEndpoint = uri;
    ```
    
    Where \<uri-to-use\> is one of the following URIs:

    |**URI**|**Description**|
    |---|---|
    |`https://europe.api.botframework.com`|For public-cloud bots with data residency in Europe.|
    |`https://unitedstates.api.botframework.com`|For public-cloud bots with data residency in the United States.|
    |`https://apiGCCH.botframework.azure.us`|For United States government-cloud bots without data residency.|
    |`https://api.botframework.com`|For public-cloud bots without data residency. This is the default URI and does not require a change to **Startup.cs**.|

3. The redirect URL for app registration from Azure should be updated to `https://tokengcch.botframework.azure.us/.auth/web/redirect`.

</details>

## Advantages of bots

Bots in Microsoft Teams can be part of a one-to-one conversation, a group chat, or a channel in a team. Each scope provides unique opportunities and challenges for your conversational bot.

| In a channel | In a group chat | In a one-to-one chat |
| :-- | :-- | :-- |
| Massive reach | Fewer members | Traditional way |
| Concise individual interactions | @mention to bot  | Q&A bots |
| @mention to bot | Similar to channel | Bots that tell jokes and take notes |

### In a channel

Channels contain threaded conversations between multiple people even up to two thousand. This potentially gives your bot massive reach, but individual interactions must be concise. Traditional multi-turn interactions do not work. Instead, you must look to use interactive cards or task modules, or move the conversation to a one-to-one conversation to collect lots of information. Your bot only has access to messages where it is `@mentioned`. You can retrieve additional messages from the conversation using Microsoft Graph and organization-level permissions.

Bots work better in a channel in the following cases:

* Notifications, where you provide an interactive card for users to take additional information.
* Feedback scenarios, such as polls and surveys.
* Single request or response cycle resolves interactions and the results are useful for multiple members of the conversation.
* Social or fun bots, where you get an awesome cat image, randomly pick a winner, and so on.

### In a group chat

Group chats are non-threaded conversations between three or more people. They tend to have fewer members than a channel and are more transient. Similar to a channel, your bot only has access to messages where it is `@mentioned` directly.

In the cases where bots work better in a channel also work better in a group chat.

### In a one-to-one chat

One-to-one chat is a traditional way for a conversational bot to interact with a user. A few examples of one-to-one conversational bots are:

* Q&A bots
* bots that initiate workflows in other systems
* bots that tell jokes
* bots that take notes
Before creating one-to-one chatbots, consider whether a conversation-based interface is the best way to present your functionality.

## Disadvantages of bots

An extensive dialog between your bot and the user is a slow and complex way to get a task completed. A bot that supports excessive commands, especially a broad range of commands, is not successful or viewed positively by users.

### Have multi-turn experiences in chat

An extensive dialog requires the developer to maintain state. To exit this state a user must either time-out or select **Cancel**. Also, the process is tedious. For example, see the following conversation scenario:

USER: Schedule a meeting with Megan.

BOT: I’ve found 200 results, please include a first and last name.

USER: Schedule a meeting with Megan Bowen.

BOT: OK, what time would you like to meet with Megan Bowen?

USER: 1:00 pm.

BOT: On which day?

### Support too many commands

As there are only six visible commands in the current bot menu, anything more is unlikely to be used with any frequency. Bots that go deep into a specific area rather than trying to be a broad assistant work and fare better.

### Maintain a large knowledge base

One of the disadvantages of bots is that it is difficult to maintain a large retrieval knowledge base with unranked responses. Bots are best suited for short, quick interactions, and not sifting through long lists looking for an answer.

## Code snippets

The following code provides an example of bot activity for a channel team scope:

# [C#](#tab/dotnet)

```csharp

protected override async Task OnMessageActivityAsync(ITurnContext<IMessageActivity> turnContext, CancellationToken cancellationToken)
{
    var mention = new Mention
    {
        Mentioned = turnContext.Activity.From,
        Text = $"<at>{XmlConvert.EncodeName(turnContext.Activity.From.Name)}</at>",
    };

    var replyActivity = MessageFactory.Text($"Hello {mention.Text}.");
    replyActivity.Entities = new List<Entity> { mention };

    await turnContext.SendActivityAsync(replyActivity, cancellationToken);
}

```

# [Node.js](#tab/nodejs)

```javascript

this.onMessage(async (turnContext, next) => {
    const mention = {
        mentioned: turnContext.activity.from,
        text: `<at>${ new TextEncoder().encode(turnContext.activity.from.name) }</at>`,
    } as Mention;

    const replyActivity = MessageFactory.text(`Hello ${mention.text}`);
    replyActivity.entities = [mention];

    await turnContext.sendActivity(replyActivity);

    // By calling next() you ensure that the next BotHandler is run.
    await next();
});

```

---

The following code provides an example of bot activity for a one-to-one chat:

# [C#](#tab/dotnet)

```csharp

// Handle message activity
protected override async Task OnMessageActivityAsync(ITurnContext<IMessageActivity> turnContext, CancellationToken cancellationToken)
{
    turnContext.Activity.RemoveRecipientMention();
    var text = turnContext.Activity.Text.Trim().ToLower();
  await turnContext.SendActivityAsync(MessageFactory.Text($"Your message is {text}."), cancellationToken);
}
```

# [Node.js](#tab/nodejs)

```javascript
this.onMessage(async (context, next) => {
    await context.sendActivity(MessageFactory.text("Your message is:" + context.activity.text));
    await next();
});
```

---

## Code sample

|Sample name | Description | .NETCore | Node.js | Python|
|----------------|-----------------|--------------|----------------|-------|
| Teams conversation bot | Messaging and conversation event handling. |[View](https://github.com/microsoft/BotBuilder-Samples/tree/master/samples/csharp_dotnetcore/57.teams-conversation-bot)|[View](https://github.com/microsoft/BotBuilder-Samples/tree/master/samples/javascript_nodejs/57.teams-conversation-bot)|[View](https://github.com/microsoft/BotBuilder-Samples/tree/main/samples/python/57.teams-conversation-bot)|
| Bot samples | Set of bot samples | [View](https://github.com/microsoft/BotBuilder-Samples/tree/main/samples/csharp_dotnetcore) |[View](https://github.com/microsoft/BotBuilder-Samples/tree/main/samples/javascript_nodejs)|[View](https://github.com/microsoft/BotBuilder-Samples/tree/main/samples/python)|

## Next step

> [!div class="nextstepaction"]
> [Bot activity handlers](~/bots/bot-basics.md)

## See also

* [Calls and meetings bots](~/bots/calls-and-meetings/calls-meetings-bots-overview.md)
* [Bot conversations](~/bots/how-to/conversations/conversation-basics.md)
* [Bot command menus](~/bots/how-to/create-a-bot-commands-menu.md)
* [Authentication flow for bots in Microsoft Teams](~/bots/how-to/authentication/auth-flow-bot.md)
* [Use task modules from bots](~/task-modules-and-cards/task-modules/task-modules-bots.md)
