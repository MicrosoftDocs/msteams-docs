---
title: Send and receive messages
author: clearab
description: How to send and receive messages with a Microsoft Teams bot
ms.topic: overview
ms.author: anclear
---
# Send and receive messages

<!-- Draft -->
A bot communicates with users through message activities. Some messages are simply plain text, others contain richer content such as cards or attachments. The bot's turn handler receives messages from the user, and sends responses to the user from there. The **turn context** object provides methods for sending messages back to the user.
Markdown is supported for most text fields, but support may vary by channel.

## Send a message

To send a simple text message, specify the string you want to send as the activity:

# [C#](#tab/csharp)

In the bot's activity handlers, use the turn context object's `SendActivityAsync` method to send a single message response. You can also use the object's `SendActivitiesAsync` method to send multiple responses at once.

<!-- [!code-csharp[Send message](~/../botbuilder-dotnet/tests/Teams/52.Teams-echo-bot/Bots/TeamsEchoBot.cs?range=45-52&highlight=51)]
-->

```cs
await turnContext.SendActivityAsync(replyActivity, cancellationToken);

```

```
```

## Receive a message

To receive a simple text message, use the *text* property of the *activity* object.

# [C#](#tab/csharp)

In the bot's activity handlers, use the following code to receive a message. 

<!-- [!code-csharp[Receive message](~/../botbuilder-dotnet/tests/Teams/52.Teams-echo-bot/Bots/TeamsEchoBot.cs?range=23-43&highlight=23)]
-->

```cs
var selection = turnContext.Activity.Text;
switch (selection)
{
  // switch statements
}
```

```
```

## Additional resources

- Inside the bots - [How bots work](https://docs.microsoft.com/en-us/azure/bot-service/bot-builder-basics?view=azure-bot-service-4.0&tabs=csharp#bot-structure)
- Conversations and messages in Teams - [Have a conversation with a Microsoft Teams bot](https://docs.microsoft.com/en-us/microsoftteams/platform/concepts/bots/bot-conversations/bots-conversations)
- Activity processing in general - [activity processing](https://docs.microsoft.com/en-us/azure/bot-service/bot-builder-basics?view=azure-bot-service-4.0&tabs=csharp#the-activity-processing-stack)
- Formatting - [message activity section](https://aka.ms/botSpecs-activitySchema#message-activity)

## Next steps

> [!div class="nextstepaction"]
> [Send proactive messages](send-proactive-messages.md)

<!-- 
## Writing notes

Might need to be renamed to map to 1:1 conversations

 * **Purpose** The simple article
 * **Existing teams doc reference** 
   * Some of: [https://docs.microsoft.com/en-us/microsoftteams/platform/concepts/bots/bot-conversations/bots-conversations](https://docs.microsoft.com/en-us/microsoftteams/platform/concepts/bots/bot-conversations/bots-conversations)
 * **Existing Bot framework doc reference** 
   * [https://docs.microsoft.com/en-us/azure/bot-service/bot-builder-howto-send-messages?view=azure-bot-service-4.0&tabs=csharp](https://docs.microsoft.com/en-us/azure/bot-service/bot-builder-howto-send-messages?view=azure-bot-service-4.0&tabs=csharp)
 * **Code Snippets** 
   * none, or all really
  -->
