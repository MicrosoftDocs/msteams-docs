---
title: Send proactive messages
author: clearab
description: How to send proactive messages with your Microsoft Teams bot.
ms.topic: overview
ms.author: anclear
---
# Send proactive messages

In some situations, a bot may need to send to the user a message that is not related to the current conversation. These types of messages are called **proactive messages**.

Proactive messages can be useful in a variety of scenarios. These are some examples:  

- The user previously asked the bot to monitor the price of a product, the bot can alert the user if the price of the product has changed.
- A bot requires some time to compile a response to the user's question, it may inform the user of the delay and allow the conversation to continue in the meantime.

## Best practices

### Basic guidelines

- Do not send several proactive messages within a short amount of time. Some channels enforce restrictions on how frequently a bot can send messages to the user, and will disable the bot if it violates those restrictions.
- Ad hoc proactive message is the simplest type of proactive message. The bot simply interjects the message into the conversation whenever it is triggered, regardless if the user is engaged in a separate topic of conversation, The bot will not attempt to change the conversation in any way.
- To handle notifications more smoothly, consider other ways to integrate the notification into the conversation flow, such as setting a flag in the conversation state or adding the notification to a queue.

Proactive messages generally fall into one of the categories described below.

### Welcome messages

When receiving a welcome message a users do not have context. Also this is the first time they have interacted with the bot which is an opportunity to create a good first impression. Well structured messages include:

- **Why the users are receiving the message.** It should be very clear to the users why they are receiving the message. If your bot was installed in a channel and you sent a welcome message to all users, let them know what channel it was installed and potentially who installed it.
- **What is the offer.** What can they do with your bot? What value it brings?
- **What should they do next.** Invite them to try out a command, or interact with your bot in some way.

### Notification messages

When sending notifications, assure that the users have a clear path to take common actions, and a clear understanding of why the notification ocurred. Well structured messages include:

- **What happened.** A clear indication of what caused the notification.
- **What it happened to.** What item was updated to cause the notification.
- **Who did it.** Who took the action that caused the notification to be sent.
- **What they can do about it.** Make it easy for the users to take actions based on the notification.
- **How they can opt out.** You need to provide a path for users to opt out of additional notifications.

## Obtain necessary user information

Bots can create new conversations with an individual Microsoft Teams user by obtaining the userâ€™s *unique ID* and *tenant ID.* You can obtain these values using one of the following methods:

> [!WARNING]
> Please, verify these links; they point to topics in the _old folder.

- By [fetching the team roster](../../../_old/concepts/bots/bots-context.md#fetching-the-team-roster) from a channel your app is installed in.
- By caching them when a user [interacts with your bot in a channel](../../../_old/concepts/bots/bot-conversations/bots-conv-channel.md).
- When a users is [@mentioned in a channel conversation](../../../_old/concepts/bots/bot-conversations/bots-conv-channel.md#-mentions) the bot is a part of.
- By caching them when you [receive the conversationUpdate](../../../_old/concepts/bots/bots-notifications.md#team-member-or-bot-addition) event when your app is installed in a personal scope, or new members are added to a channel or group chat that

### Proactively install your app using Graph

> [!Note]
> Proactively installing apps using graph is currently in beta.

Occasionally it may be necessary to proactively message users that have not installed or interacted with your bot previously. For example, you want to use the [company communicator](../../../samples/app-templates.md#company-communicator) to send messages to your entire organization. For this scenario you can use the Graph API to proactively install your bot for your users, then cache the necessary values from the `conversationUpdate` event your app will receive upon install.

You can only install apps that are in your organizational app catalogue, or the Teams app store.

See [Install apps for users](https://docs.microsoft.com/graph/teams-proactive-messaging) in the Graph documentation for complete details. There is also a [sample in .NET](https://github.com/microsoftgraph/contoso-airlines-teams-sample/blob/283523d45f5ce416111dfc34b8e49728b5012739/project/Models/GraphService.cs#L176).



## Example

The following code snippets belong to a bot sample that could be added to a team, but could also work in group chat (with updated `onMembersAdded` implementations).
If the user `@mention` the bot and sends a message to it, the bot **proactively** sends messages to the user.

Download the complete code example at this location [ProactiveMessages](https://github.com/microsoft/botbuilder-dotnet/tree/master/tests/Teams/ProactiveMessages).

```cs
protected override async Task OnMessageActivityAsync(ITurnContext<IMessageActivity> turnContext, CancellationToken cancellationToken)

{
    // You can hand roll a connector to manually address a proactive message
    var connectorClient = turnContext.TurnState.Get<IConnectorClient>();
    var connector = new ConnectorClient(connectorClient.Credentials);
    connector.BaseUri = new Uri(turnContext.Activity.ServiceUrl);

    var parameters = new ConversationParameters
    {
        Bot = turnContext.Activity.From,
        Members = new ChannelAccount[] { turnContext.Activity.From },
        ChannelData = new TeamsChannelData
        {
            Tenant = new TenantInfo
            {
                Id = turnContext.Activity.Conversation.TenantId,
            },
        },
    };

    var converationReference = await connector.Conversations.CreateConversationAsync(parameters);

    var proactiveMessage = MessageFactory.Text($"Hello {turnContext.Activity.From.Name}. You sent me a message. This is a proactive responsive message.");

    proactiveMessage.From = turnContext.Activity.From;

    proactiveMessage.Conversation = new ConversationAccount
    {
        Id = converationReference.Id.ToString(),
    };

    await connector.Conversations.SendToConversationAsync(proactiveMessage, cancellationToken);

    // Or you can use the adapter to send a message if you already have a conversation reference. You can put this code into the controller if
    // you already have a store of conversation references. 
    await turnContext.Adapter.ContinueConversationAsync(_appId, turnContext.Activity.GetConversationReference(), BotOnTurn, cancellationToken);
}

```

You can use the adapter to send a proactive message if you already have a conversation reference; put this code into the controller:

```cs
await turnContext.Adapter.ContinueConversationAsync(_appId, turnContext.Activity.GetConversationReference(), BotOnTurn, cancellationToken);
```

To send a proactive message, the adapter requires an app ID for the bot. In a production environment, you can use the bot's app ID. In a local test environment, you can use any GUID. If the bot is not currently assigned an app ID, the notify controller self-generates a placeholder ID to use for the call.

## Additional information

### Avoiding 401 "Unauthorized" Errors

By default, the BotBuilder SDK adds a `serviceUrl` to the list of trusted host names if the incoming request is authenticated. They are maintained in an in-memory cache. If your bot is restarted, a user awaiting a proactive message cannot receive it unless they have messaged the bot again after it restarted. 

To avoid this, you must manually add the `serviceUrl` to the list of trusted host names by using: 

```csharp 
MicrosoftAppCredentials.TrustServiceUrl(serviceUrl); 
``` 

For proactive messaging, `serviceUrl` is the URL of the channel that the recipient of the proactive message is using and can be found in `Activity.ServiceUrl`. 
You'll want to add the above code just prior to the the code that sends the proactive message. In the above example:

```cs
var proactiveMessage = MessageFactory.Text($"Hello {turnContext.Activity.From.Name}. You sent me a message. This is a proactive responsive message.");
```

For more information and a related example code, see Bot Framework SDK [Send proactive notifications to users](https://docs.microsoft.com/azure/bot-service/bot-builder-howto-proactive-message?view=azure-bot-service-4.0&tabs=csharp) article.


## Additional resources

- [Send proactive notifications to users](https://docs.microsoft.com/azure/bot-service/bot-builder-howto-proactive-message?view=azure-bot-service-4.0&tabs=csharp) - Bot Framework SDK proactive messages explained
- [How bots work](https://docs.microsoft.com/azure/bot-service/bot-builder-basics?view=azure-bot-service-4.0&tabs=csharp) - Inside the bots
- [Have a conversation with a Microsoft Teams bot](../../../_old/concepts/bots/bot-conversations/bots-conversations.md) - Conversations and messages in Teams


<!--
## Writing notes

 * **Purpose** Send proactive messages to 1:1, group chat, and channel. Includes stub pointer to Graph article on how to proactively install your bot.
 * **Existing teams doc reference** 
   * [https://docs.microsoft.com/en-us/microsoftteams/platform/concepts/bots/bot-conversations/bots-conv-proactive](https://docs.microsoft.com/en-us/microsoftteams/platform/concepts/bots/bot-conversations/bots-conv-proactive)
 * **Existing Bot framework doc reference** 
   * [https://docs.microsoft.com/en-us/azure/bot-service/bot-builder-howto-proactive-message?view=azure-bot-service-4.0&tabs=csharp](https://docs.microsoft.com/en-us/azure/bot-service/bot-builder-howto-proactive-message?view=azure-bot-service-4.0&tabs=csharp)
 * **Code Snippets** 
   * [https://github.com/microsoft/botbuilder-dotnet/tree/master/tests/Teams/ProactiveMessages](https://github.com/microsoft/botbuilder-dotnet/tree/master/tests/Teams/ProactiveMessages)
-->

