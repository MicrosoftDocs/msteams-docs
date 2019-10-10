---
title: Send and receive messages
author: clearab
description: How to send and receive messages with a Microsoft Teams bot
ms.topic: overview
ms.author: anclear
---

# Send and receive messages

A bot communicates with users through message activities. Some messages are simply plain text, others contain richer content such as cards or attachments. The bot's turn handler receives requests from the user, and sends responses back as messages. The **turn context** object provides methods for sending messages back to the user.

Markdown is supported for most text fields, but support may vary by channel.

## Send a message

To send a text message, specify the string you want to send as the activity.
In the bot's activity handlers, use the turn context object's `SendActivityAsync` method to send a single message response. You can also use the object's `SendActivitiesAsync` method to send multiple responses at once. The code below shows an example.  

```cs

protected override async Task OnMembersAddedAsync(IList<ChannelAccount> membersAdded, ITurnContext<IConversationUpdateActivity> turnContext, CancellationToken cancellationToken)
{
  foreach (var member in membersAdded)
  {
      if (member.Id != turnContext.Activity.Recipient.Id)
      {
          await turnContext.SendActivityAsync(MessageFactory.Text($"Hello and welcome!"), cancellationToken);
      }
  }
}

```

## Receive a message

To receive a text message, use the `Text` property of the `Activity` object.
In the bot's activity handlers, use the turn context object's `Activity` to read a single message request. The code below shows an example.

```cs
protected override async Task OnMessageActivityAsync(ITurnContext<IMessageActivity> turnContext, CancellationToken cancellationToken)
{
  await turnContext.SendActivityAsync(MessageFactory.Text($"Echo: {turnContext.Activity.Text}"), cancellationToken);
}
```

## Additional resources

- Inside the bots - [How bots work](https://docs.microsoft.com/azure/bot-service/bot-builder-basics?view=azure-bot-service-4.0&tabs=csharp)
- Conversations and messages in Teams - [Have a conversation with a Microsoft Teams bot](../../../_old/concepts/bots/bot-conversations/bots-conversations.md)
- Activity processing in general - [activity processing](https://docs.microsoft.com/azure/bot-service/bot-builder-basics?view=azure-bot-service-4.0&tabs=csharp#the-activity-processing-stack)
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
