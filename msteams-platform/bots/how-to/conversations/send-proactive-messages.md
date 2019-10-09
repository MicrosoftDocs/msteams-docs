---
title: Send and receive messages
author: clearab
description: How to send and receive messages with a Microsoft Teams bot
ms.topic: overview
ms.author: anclear
---

# Send and receive messages

<!-- Version 1.0 -->

A bot communicates with users through message activities. Some messages are simply plain text, others contain richer content such as cards or attachments. The bot's turn handler receives requests from the user, and sends responses back as messages. The **turn context** object provides methods for sending messages back to the user.

Markdown is supported for most text fields, but support may vary by channel.

## Send a message

To send a text message, specify the string you want to send as the activity.
In the bot's activity handlers, use the turn context object's `SendActivityAsync` method to send a single message response. You can also use the object's `SendActivitiesAsync` method to send multiple responses at once.   

```cs

await turnContext.SendActivityAsync($"Welcome!");

```

## Receive a message

To receive a text message, use the `Text` property of the `Activity` object.
In the bot's activity handlers, use the turn context object's `Activity` to read a single message request. 

```cs
var responseMessage = turnContext.Activity.Text;
```

## Additional resources

- [How bots work](https://docs.microsoft.com/azure/bot-service/bot-builder-basics?view=azure-bot-service-4.0&tabs=csharp) - Inside the bots
- [Have a conversation with a Microsoft Teams bot](../../../_old/concepts/bots/bot-conversations/bots-conversations.md) - Conversations and messages in Teams
- [Activity processing](https://docs.microsoft.com/azure/bot-service/bot-builder-basics?view=azure-bot-service-4.0&tabs=csharp#the-activity-processing-stack) - Activity processing in general
- [Message activity section](https://aka.ms/botSpecs-activitySchema#message-activity) - Formatting

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
