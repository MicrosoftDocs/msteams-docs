---
title: Bots solutions in Teams
author: surbhigupta
description: Description for bot solutions
ms.topic: overview
ms.localizationpriority: high
ms-author: surbhigupta
ms.date: 01/29/2023
---


# Bot solutions

Introduction: TBD
You can use any one of the following ways to build a bot for Teams:

* Bot Framework SDK
* TeamsFx SDK
* Teams AI bot
* Azure AI bot service
* Virtual Power Agent

You can register your bot with Teams in any one of the following ways:

* Azure AD
* Developer Portal

## Bot framework SDKs

Your Teams bot consists of the following:

* A publicly accessible web service hosted by you.
* A Bot Framework registration for your web service.
* Your Teams app package, which connects the Teams client to your web service.

> [!TIP]
> Use the Developer Portal to register your web service with the Bot Framework and specify your app configurations. For more information, see [manage your apps with the Developer Portal for Teams](~/concepts/build-and-test/teams-developer-portal.md).

The [Bot Framework](https://dev.botframework.com/) is a rich SDK used to create bots using C#, Python, and JavaScript. If you already have a bot that is based on the Bot Framework, you can easily modify it to work in Teams. Use either C# or Node.js to take advantage of our [SDKs](/azure/bot-service/bot-service-overview?view=azure-bot-service-4.0&preserve-view=true). These packages extend the basic Bot Builder SDK classes and methods as follows:

* Use specialized card types like the connector card for Microsoft 365 Groups.
* Set Teams-specific channel data on activities.
* Process message extension requests.

You can develop Teams apps in any web programming technology and call the [Bot Framework REST APIs](/bot-framework/rest-api/bot-framework-rest-overview) directly. You must perform token handling in all cases.

### Code snippets for bot framework SDKs

The following code provides an example of a bot activity for a channel team scope:

# [.NET](#tab/dotnet)

* [SDK reference](/dotnet/api/microsoft.bot.builder.activityhandler.onmessageactivityasync?view=botbuilder-dotnet-stable&preserve-view=true)

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

* [SDK reference](/javascript/api/botbuilder-core/activityhandler?view=botbuilder-ts-latest&preserve-view=true#botbuilder-core-activityhandler-onmessage)

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

# [.NET](#tab/dotnet)

* [SDK reference](/dotnet/api/microsoft.bot.schema.activityextensions.removerecipientmention?view=botbuilder-dotnet-stable&preserve-view=true)

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

* [SDK reference](/javascript/api/botbuilder-core/turncontext?view=botbuilder-ts-latest&preserve-view=true#botbuilder-core-turncontext-sendactivity)
* [Sample code reference](https://github.com/OfficeDev/Microsoft-Teams-Samples/blob/main/samples/bot-receive-channel-messages-withRSC/nodejs/server/bot/botActivityHandler.js#L20)

```javascript
this.onMessage(async (context, next) => {
    // MessageFactory.text(): Specifies the type of text data in a message attachment.
    await context.sendActivity(MessageFactory.text("Your message is:" + context.activity.text));
    await next();
});
```

---

## Teams Toolkit and TeamsFx SDK

Teams Toolkit makes it simple to get started with bot app development for Teams. You can begin with a project template for common custom bot app built for your org (LOB app) scenarios or start from a sample.

For more information, see [Tools and SDKs](../concepts/build-and-test/tool-sdk-overview.md).

TeamsFx helps to reduce your tasks by using Microsoft Teams single sign-on (SSO) and accessing cloud resources down to single line statements with zero configuration. You can use TeamsFx SDK in the browser and Node.js environments. TeamsFx core functionalities can be accessed in client and server environments.

For more information, see [TeamsFx SDK](../toolkit/TeamsFx-SDK.md).

### Code snippets for TeamsFx SDKs

TBD

The following code provides an example of a bot activity handler for a channel team scope in TeamsFx SDK:

# [JavaScript](#tab/js)

```javascript
/**
* Interface implemented by object based middleware
*/
export interface Middleware{
    /**
    * Calling 'await next(); ` will cause execution to continue to either the next place of 
    * middleware in the chain or the bots main logic if you are the last piece of middleware.
    *
    * Your middleware should perform its business logic before and/or after the call to `next()`,
    * You can short-circuit further execution of the turn by omitting the call to `next()`.
    *
    * The following example shows a sample piece of logging middleware:
    *
    * ```JavaScript
    *class MyLogger {
    *    async onTurn(context, next) {
    *        console.log(`Leading Edge`);
    *        await next();
    *        console.log(`Trailing Edge`);
    *    }
    *}
*
* @param context Context for current turn of conversation with the user.
* @param next Function to call to continue execution to the next step in the middleware chain.
*/
onTurn(context: TurnContext, next: () => Promise<void>): Promise<void>;
}

```

---

## Azure AI bot service

TBD

Azure AI Bot Service is a cloud platform. It hosts bots and makes them available to channels, such as Microsoft Teams, Facebook, or Slack.

The Bot Framework Service, which is a component of the Azure AI Bot Service, sends information between the user's bot-connected app and the bot. Each channel can include additional information in the activities they send.

For more information, see [Azure AI bot service](/azure/bot-service/bot-builder-basics).

## Teams AI bot

TBD

A Teams AI bot utilizes artificial intelligence (AI) technology to communicate with users in natural language, similar to a human-to-human conversation. These bots can handle a variety of tasks, from answering simple questions to performing complex operations, and can be integrated into larger applications or used as standalone tools.

Teams AI bots are built using the Bot Framework SDK and can leverage the Teams AI library to streamline the process of building intelligent applications. This library provides APIs to access and manipulate data, as well as a range of controls and components to create custom user interfaces.

## Power Agent

[Power Virtual Agents](/power-virtual-agents/fundamentals-what-is-power-virtual-agents) is a chatbot service built on the Microsoft Power platform and Bot Framework. The Power Virtual Agent development process uses a guided, no-code, and graphical interface approach that empowers your team members to easily create and maintain an intelligent virtual agent. After creating your chatbot in the [Power Virtual Agents portal](https://powervirtualagents.microsoft.com), you can easily [integrate it with Teams](how-to/add-power-virtual-agents-bot-to-teams.md). For more information on getting started, see [Power Virtual Agents documentation](/power-virtual-agents).

>[!NOTE]
>You must not use Microsoft Power Platform to create apps that are to be published to the Microsoft Teams Store. Microsoft Power Platform apps can be published to an organization’s app store only.

## Build a bot app with Azure bot service

TBD
link back to Get started to build a basic bot app using TTK
links for code samples to build a basic bot app using samples

## Code sample

|Sample name | Description | .NETCore | Node.js | Python| Manifest
|----------------|-----------------|--------------|----------------|-------|-------|
| Teams conversation bot | This sample app shows how to use different bot conversation events available in bot framework v4. |[View](https://github.com/OfficeDev/Microsoft-Teams-Samples/tree/main/samples/bot-conversation/csharp)|[View](https://github.com/OfficeDev/Microsoft-Teams-Samples/tree/main/samples/bot-conversation/nodejs)|[View](https://github.com/OfficeDev/Microsoft-Teams-Samples/tree/main/samples/bot-conversation/python)|[View](https://github.com/OfficeDev/Microsoft-Teams-Samples/blob/main/samples/bot-conversation/csharp/demo-manifest/bot-conversation.zip)|
| Bot samples | Set of bot framework v4 samples | [View](https://github.com/OfficeDev/Microsoft-Teams-Samples/tree/main/samples) |[View](https://github.com/OfficeDev/Microsoft-Teams-Samples#bots-samples-using-the-v4-sdk)|[View](https://github.com/OfficeDev/Microsoft-Teams-Samples#bots-samples-using-the-v4-sdk)|

## Next step
