---
title: Bots and SDKs
author: surbhigupta
description: In this article, learn about tools and Bot Framework SDKs(C#, Python, Java, JavaScript) for Microsoft Teams bots and its advantages and disadvantages.
ms.topic: overview
ms.localizationpriority: medium
ms.author: anclear
---

# Bots and SDKs

You can create a bot that works in Microsoft Teams with one of the following tools or capabilities:

* [Microsoft Bot Framework SDK](#bots-with-the-microsoft-bot-framework)
* [Azure Active Directory (Azure AD)](~/bots/how-to/authentication/auth-aad-sso-bots.md#develop-an-sso-teams-bot)
* [Developer Portal](~/concepts/build-and-test/manage-your-apps-in-developer-portal.md#configure)
* [Power Virtual Agents](#bots-with-power-virtual-agents)
* [Virtual Assistant](~/samples/virtual-assistant.md)
* [Webhooks and connectors](#bots-with-webhooks-and-connectors)
* [Bot Framework Composer](/composer/introduction)

## Bots with the Microsoft Bot Framework

Your Teams bot consists of the following:

* A publicly accessible web service hosted by you.
* A Bot Framework registration for your web service.
* Your Teams app package, which connects the Teams client to your web service.

> [!TIP]
> Use the Developer Portal to register your web service with the Bot Framework and specify your app configurations. For more information, see [manage your apps with the Developer Portal for Teams](~/concepts/build-and-test/teams-developer-portal.md).

The [Bot Framework](https://dev.botframework.com/) is a rich SDK used to create bots using C#, Java, Python, and JavaScript. If you already have a bot that is based on the Bot Framework, you can easily modify it to work in Teams. Use either C# or Node.js to take advantage of our [SDKs](/microsoftteams/platform/#pivot=sdk-tools). These packages extend the basic Bot Builder SDK classes and methods as follows:

* Use specialized card types like the connector card for Microsoft 365 Groups.
* Set Teams-specific channel data on activities.
* Process message extension requests.

You can develop Teams apps in any web programming technology and call the [Bot Framework REST APIs](/bot-framework/rest-api/bot-framework-rest-overview) directly. You must perform token handling in all cases.

## Bots with Power Virtual Agents

[Power Virtual Agents](/power-virtual-agents/fundamentals-what-is-power-virtual-agents) is a chatbot service built on the Microsoft Power platform and Bot Framework. The Power Virtual Agent development process uses a guided, no-code, and graphical interface approach that empowers your team members to easily create and maintain an intelligent virtual agent. After creating your chatbot in the [Power Virtual Agents portal](https://powervirtualagents.microsoft.com), you can easily [integrate it with Teams](how-to/add-power-virtual-agents-bot-to-teams.md). For more information on getting started, see [Power Virtual Agents documentation](/power-virtual-agents).

>[!NOTE]
>You must not use Microsoft Power Platform to create apps that are to be published to the Teams app store. Microsoft Power Platform apps can be published to an organization’s app store only.

## Bots with webhooks and connectors

Webhooks and connectors connect your bot to your web services. Using webhooks and connectors, you can create a bot for basic interaction, such as creating a workflow or other simple commands. They're available only in the team where you create them and are intended for simple processes specific to your company's workflow. For more information, see [what are webhooks and connectors](~/webhooks-and-connectors/what-are-webhooks-and-connectors.md).

## Advantages of bots

Bots in Microsoft Teams can be part of a one-to-one conversation, a group chat, or a channel in a team. Each scope provides unique opportunities and challenges for your conversational bot.

| In a channel | In a group chat | In a one-to-one chat |
| :-- | :-- | :-- |
| Massive reach | Fewer members | Traditional way |
| Concise individual interactions | @mention to bot  | Q&A bots |
| @mention to bot | Similar to channel | Bots that tell jokes and take notes |

### In a channel

Channels contain threaded conversations between multiple people even up to 2000. This potentially gives your bot massive reach, but individual interactions must be concise. Traditional multi-turn interactions don't work. Instead, you must look to use interactive cards or task modules, or move the conversation to a one-to-one conversation to collect lots of information. Your bot only has access to messages where it's `@mentioned`. You can retrieve additional messages from the conversation using Microsoft Graph and organization-level permissions.

Bots work better in a channel in the following cases:

* Notifications, where you provide an interactive card for users to take additional information.
* Feedback scenarios, such as polls and surveys.
* Single request or response cycle resolves interactions and the results are useful for multiple members of the conversation.
* Social or fun bots, where you get an awesome cat image, randomly pick a winner, and so on.

### In a group chat

Group chats are non-threaded conversations between three or more people. They tend to have fewer members than a channel and are more transient. Similar to a channel, your bot only has access to messages where it's `@mentioned` directly.

In the cases where bots work better in a channel also work better in a group chat.

### In a one-to-one chat

One-to-one chat is a traditional way for a conversational bot to interact with a user. A few examples of one-to-one conversational bots are:

* Q&A bots
* bots that initiate workflows in other systems.
* bots that tell jokes.
* bots that take notes.
Before creating one-to-one chatbots, consider whether a conversation-based interface is the best way to present your functionality.

## Disadvantages of bots

An extensive dialog between your bot and the user is a slow and complex way to get a task completed. A bot that supports excessive commands, especially a broad range of commands, isn't successful or viewed positively by users.

### Have multi-turn experiences in chat

An extensive dialog requires the developer to maintain state. To exit this state, a user must either time out or select **Cancel**. Also, the process is tedious. For example, see the following conversation scenario:

USER: Schedule a meeting with Megan.

BOT: I’ve found 200 results, include a first and last name.

USER: Schedule a meeting with Megan Bowen.

BOT: OK, what time would you like to meet with Megan Bowen?

USER: 1:00 pm.

BOT: On which day?

### Support too many commands

As there are only six visible commands in the current bot menu, anything more is unlikely to be used with any frequency. Bots that go deep into a specific area rather than trying to be a broad assistant work and fare better.

### Maintain a large knowledge base

One of the disadvantages of bots is that it's difficult to maintain a large retrieval knowledge base with unranked responses. Bots are best suited for short, quick interactions, and not sifting through long lists looking for an answer.

## Limitations and known issues

If you're unable to create a bot in Developer Portal, ensure the following:

* **App registration is enabled for users**: When an app registration is disabled org-wide, users (other than users with AAD admin access) can't register new apps. To allow users to register apps, admins must toggle **Users can register applications** to **Yes** in the [Azure AD portal](/azure/active-directory/fundamentals/users-default-permissions#restrict-member-users-default-permissions).

* **Give permissions to specific users to register new apps**:

  * For Microsoft 365 licenses where app registration limit is 250 apps per user, ensure that the tenant admin adds Azure AD to a user with the following roles:

    * [Application Administrator](/azure/active-directory/roles/permissions-reference#application-administrator)
    * [Application Developer](/azure/active-directory/roles/permissions-reference#application-developer)
    * [Cloud Application Administrator](/azure/active-directory/roles/permissions-reference#cloud-application-administrator)

    For information about how to assign roles, see [Assign Azure AD roles to users](/azure/active-directory/roles/manage-roles-portal).

  * For Microsoft 365 (P1, P2, E3, or E5 plan) license where app registration limit is default to tenant limit (more than 300,000) per user, ensure that the tenant admin adds Azure AD  to a user and assigns a [Custom role](/azure/active-directory/roles/custom-create) to the user with the following permissions:

    * `microsoft.directory/applications/create`
    * `microsoft.directory/applications/createAsOwner`

## Code snippets

The following code provides an example of a bot activity for a channel team scope:

# [C#](#tab/dotnet)

* [SDK reference](/dotnet/api/microsoft.bot.builder.activityhandler.onmessageactivityasync?view=botbuilder-dotnet-stable#microsoft-bot-builder-activityhandler-onmessageactivityasync(microsoft-bot-builder-iturncontext((microsoft-bot-schema-imessageactivity))-system-threading-cancellationtoken)&preserve-view=true)

* [Sample code reference](https://github.com/OfficeDev/Microsoft-Teams-Samples/blob/main/samples/app-localization/csharp/Localization/Bots/LocalizerBot.cs#L20)

```csharp

protected override async Task OnMessageActivityAsync(ITurnContext<IMessageActivity> turnContext, CancellationToken cancellationToken)
{
    var mention = new Mention
    {
        Mentioned = turnContext.Activity.From,
        // EncodeName: Converts the name to a valid XML name.
        Text = $"<at>{XmlConvert.EncodeName(turnContext.Activity.From.Name)}</at>",
    };
    
    // MessageFactory.Text(): Specifies the type of text data in a message attachment.
    var replyActivity = MessageFactory.Text($"Hello {mention.Text}.");
    replyActivity.Entities = new List<Entity> { mention };

    // Sends a message activity to the sender of the incoming activity.
    await turnContext.SendActivityAsync(replyActivity, cancellationToken);
}

```

# [Node.js](#tab/nodejs)

* [SDK reference](/javascript/api/botbuilder-core/activityhandler?view=botbuilder-ts-latest#botbuilder-core-activityhandler-onmessage&preserve-view=true)

* [Sample code reference](https://github.com/OfficeDev/Microsoft-Teams-Samples/blob/main/samples/app-localization/nodejs/server/bot/botActivityHandler.js#L25)

```javascript

this.onMessage(async (turnContext, next) => {
    const mention = {
        mentioned: turnContext.activity.from,

        // TextEncoder().encode(): Encodes the supplied characters.
        text: `<at>${ new TextEncoder().encode(turnContext.activity.from.name) }</at>`,
    } as Mention;

    // MessageFactory.text(): Specifies the type of text data in a message attachment.
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

* [SDK reference](/dotnet/api/microsoft.bot.schema.activityextensions.removerecipientmention?view=botbuilder-dotnet-stable#microsoft-bot-schema-activityextensions-removerecipientmention(microsoft-bot-schema-imessageactivity)&preserve-view=true)

* [Sample code reference](https://github.com/OfficeDev/Microsoft-Teams-Samples/blob/main/samples/app-hello-world/csharp/Microsoft.Teams.Samples.HelloWorld.Web/Bots/MessageExtension.cs#L19)

```csharp

// Handle message activity
protected override async Task OnMessageActivityAsync(ITurnContext<IMessageActivity> turnContext, CancellationToken cancellationToken)
{
    // Remove recipient mention text from Text property.
    // Use with caution because this function is altering the text on the Activity.
    turnContext.Activity.RemoveRecipientMention();
    var text = turnContext.Activity.Text.Trim().ToLower();

    // Sends a message activity to the sender of the incoming activity.
    await turnContext.SendActivityAsync(MessageFactory.Text($"Your message is {text}."), cancellationToken);
}
```

# [Node.js](#tab/nodejs)

* [SDK reference](/javascript/api/botbuilder-core/turncontext?view=botbuilder-ts-latest#botbuilder-core-turncontext-sendactivity&preserve-view=true)
* [Sample code reference](https://github.com/OfficeDev/Microsoft-Teams-Samples/blob/main/samples/bot-receive-channel-messages-withRSC/nodejs/server/bot/botActivityHandler.js#L20)

```javascript
this.onMessage(async (context, next) => {
    // MessageFactory.text(): Specifies the type of text data in a message attachment.
    await context.sendActivity(MessageFactory.text("Your message is:" + context.activity.text));
    await next();
});
```

---

## Code sample

|Sample name | Description | .NETCore | Node.js | Python| Manifest
|----------------|-----------------|--------------|----------------|-------|-------|
| Teams conversation bot | This sample app shows how to use different bot conversation events available in bot framework v4. |[View](https://github.com/OfficeDev/Microsoft-Teams-Samples/tree/main/samples/bot-conversation/csharp)|[View](https://github.com/OfficeDev/Microsoft-Teams-Samples/tree/main/samples/bot-conversation/nodejs)|[View](https://github.com/OfficeDev/Microsoft-Teams-Samples/tree/main/samples/bot-conversation/python)|[View](https://github.com/OfficeDev/Microsoft-Teams-Samples/blob/main/samples/bot-conversation/csharp/demo-manifest/bot-conversation.zip)|
| Bot samples | Set of bot framework v4 samples | [View](https://github.com/OfficeDev/Microsoft-Teams-Samples/tree/main/samples) |[View](https://github.com/OfficeDev/Microsoft-Teams-Samples#bots-samples-using-the-v4-sdk)|[View](https://github.com/OfficeDev/Microsoft-Teams-Samples#bots-samples-using-the-v4-sdk)|

## Next step

> [!div class="nextstepaction"]
> [Bot activity handlers](~/bots/bot-basics.md)

## See also

* [Build bots for Teams](what-are-bots.md)
* [Create custom triggers in Bot Framework Composer](/composer/how-to-create-custom-triggers)
* [API reference for the Bot Framework Connector service](/azure/bot-service/rest-api/bot-framework-rest-connector-api-reference)
* [Publish your bot to Azure](/azure/bot-service/bot-builder-deploy-az-cli)
* [Authentication flow for bots in Microsoft Teams](how-to/authentication/auth-flow-bot.md)
* [Channel and group chat conversations with a bot](how-to/conversations/channel-and-group-conversations.md)
