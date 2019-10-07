---
title: Send proactive messages
author: clearab
description: How to send proactive messages with your Microsoft Teams bot.
ms.topic: overview
ms.author: anclear
---
# Send proactive messages

<!-- Work in progress -->
In some situations, a bot may need to send to the user a message that is not related to the current conversation. These types of messages are called **proactive messages**.

Proactive messages can be useful in a variety of scenarios. These are some examples:  

- The user previously asked the bot to monitor the price of a product, the bot can alert the user if the price of the product haa changed.
- A bot requires some time to compile a response to the user's question, it may inform the user of the delay and allow the conversation to continue in the meantime.

## Common sense guidelines

- When implementing proactive messages in your bot, don't send several proactive messages within a short amount of time. Some channels enforce restrictions on how frequently a bot can send messages to the user, and will disable the bot if it violates those restrictions.
- Ad hoc proactive message is the simplest type of proactive message. The bot simply interjects the message into the conversation whenever it is triggered, without any regard for whether the user is currently engaged in a separate topic of conversation with the bot and will not attempt to change the conversation in any way.
- To handle notifications more smoothly, consider other ways to integrate the notification into the conversation flow, such as setting a flag in the conversation state or adding the notification to a queue.


## Writing notes

 * **Purpose** Send proactive messages to 1:1, group chat, and channel. Includes stub pointer to Graph article on how to proactively install your bot.
 * **Existing teams doc reference** 
   * [https://docs.microsoft.com/en-us/microsoftteams/platform/concepts/bots/bot-conversations/bots-conv-proactive](https://docs.microsoft.com/en-us/microsoftteams/platform/concepts/bots/bot-conversations/bots-conv-proactive)
 * **Existing Bot framework doc reference** 
   * [https://docs.microsoft.com/en-us/azure/bot-service/bot-builder-howto-proactive-message?view=azure-bot-service-4.0&tabs=csharp](https://docs.microsoft.com/en-us/azure/bot-service/bot-builder-howto-proactive-message?view=azure-bot-service-4.0&tabs=csharp)
 * **Code Snippets** 
   * [https://github.com/microsoft/botbuilder-dotnet/tree/master/tests/Teams/ProactiveMessages](https://github.com/microsoft/botbuilder-dotnet/tree/master/tests/Teams/ProactiveMessages)