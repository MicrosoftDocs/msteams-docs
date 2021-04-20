---
title: Conversation basics
description: Introduction to conversations
ms.topic: overview
ms.author: anclear
localization_priority: Normal
keyword: conversations basics messages
---

# Conversation basics

[!INCLUDE [pre-release-label](~/includes/v4-to-v3-pointer-bots.md)]

A conversation is a series of messages sent between your Microsoft Teams bot and one or more users. The following table provides the three types of conversations, also called scopes in Teams:

| Conversation type | Description |
| ------- | ----------- |
| `channel` | This conversation type is visible to all members of the channel. |
| `personal` | This conversation type includes conversations between bots and a single user. |
| `groupChat` | This conversation type includes chat between a bot and two or more users. It also enables your bot in meeting chats. |

A bot behaves differently depending on the conversation it is involved in:

* Bots in channel and group chat conversations require the user to @ mention the bot to invoke it in a channel.
* Bots in a one-to-one conversation do not require an @ mention. All messages sent by the user routes to your bot.

For the bot to work in a particular conversation or scope, add support to that scope in the [app manifest](~/resources/schema/manifest-schema.md).

Each message in a bot conversation is an `Activity` object of type `messageType: message`. When a user sends a message, Teams posts the message to your bot and the bot handles the message. In addition, to define core commands that your bot responds to, you can add a command menu with a drop-down list of commands for your bot. Bots in a group or channel only receive messages when they are mentioned @botname. Teams sends notifications to your bot for conversation events that happen in scopes where your bot is active. You can capture these events in your code and take action on them. 

A bot can also send proactive messages to users. A proactive message is any message sent by a bot that is not in response to a request from a user. You can format your bot messages to include rich cards that include interactive elements, such as buttons, text, images, audio, video, and so on. Bot can dynamically update messages after sending them, instead of having your messages as a static snapshots of data. Messages can also be deleted using the Bot Framework's `DeleteActivity` method.

## Next step

> [!div class="nextstepaction"]
> [Messages in bot conversations](~/bots/how-to/conversations/conversation-messages.md)
