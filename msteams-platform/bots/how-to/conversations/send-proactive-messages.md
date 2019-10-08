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

- The user previously asked the bot to monitor the price of a product, the bot can alert the user if the price of the product haa changed.
- A bot requires some time to compile a response to the user's question, it may inform the user of the delay and allow the conversation to continue in the meantime.

## Best practices

### Basic guidelines

- When implementing proactive messages in your bot, don't send several proactive messages within a short amount of time. Some channels enforce restrictions on how frequently a bot can send messages to the user, and will disable the bot if it violates those restrictions.
- Ad hoc proactive message is the simplest type of proactive message. The bot simply interjects the message into the conversation whenever it is triggered, without any regard for whether the user is currently engaged in a separate topic of conversation with the bot and will not attempt to change the conversation in any way.
- To handle notifications more smoothly, consider other ways to integrate the notification into the conversation flow, such as setting a flag in the conversation state or adding the notification to a queue.

Proactive messages generally fall into one of two categories, welcome messages or notifications.

### Welcome messages

When using proactive messaging to send a welcome message to a user you must keep in mind that for most people receiving the message they will have no context for why they are receiving it. This is also the first time they will have interacted with your app; it is your opportunity to create a good first impression. The best welcome messages will include:

- **Why are they receiving this message.** It should be very clear to the user why they are receiving the message. If your bot was installed in a channel and you sent a welcome message to all users, let them know what channel it was installed in and potentially who installed it.
- **What do you offer.** What can they do with your app? What value can you bring to them?
- **What should they do next.** Invite them to try out a command, or interact with your app in some way.

### Notification messages

When using proactive messaging to send notifications you need to make sure your users have a clear path to take common actions based on your notification, and a clear understanding of why the notification ocurred. Good notification messages will generally include:

- **What happened.** A clear indication of what happened to cause the notification.
- **What it happened to.** It should be clear what item/thing was updated to cause the notification.
- **Who did it.** Who took the action that caused the notification to be sent.
- **What they can do about it.** Make it easy for your users to take actions based on your notifications.
- **How they can opt out.** You need to provide a path for users to opt out of additional notifications.

## Example

The following code snippet is part of a bot sample that could be added to a team, but could work in group chat (with updated `onMembersAdded` implementations).
If the user `@mention` the bot and sends it a message, the bot **proactively** send messages to the user. 

- You can use the adapter to send a message if you already have a conversation reference.
- You can put this code into the controller if you already have a store of conversation references.

Download the complete code example from this location [ProactiveMessages](https://github.com/microsoft/botbuilder-dotnet/tree/master/tests/Teams/ProactiveMessages).

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
