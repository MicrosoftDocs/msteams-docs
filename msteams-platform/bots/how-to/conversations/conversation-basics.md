---
title: Conversation basics
description: Introduction to conversations
ms.topic: overview
ms.author: anclear
keyword: conversations basics messages
---

# Conversation basics

[!INCLUDE [pre-release-label](~/includes/v4-to-v3-pointer-bots.md)]

A conversation is a series of messages sent between your Microsoft Teams bot and one or more users. There are three types of conversations, also called scopes in Teams:

| Conversation type | Description |
| ------- | ----------- |
| `teams` | This conversation type is also called channel conversations, visible to all members of the channel. |
| `personal` | This conversation type includes conversations between bots and a single user. |
| `groupChat` | This conversation type includes chat between a bot and two or more users. It also enables your bot in meeting chats. |

A bot behaves differently depending on the conversation it is involved in:

* Bots in channel and group chat conversations require the user to @ mention the bot to invoke it in a channel.
* Bots in a one-to-one conversation do not require an @ mention. All messages sent by the user routes to your bot.

For the bot to work in a particular conversation or scope, add support to that scope in the [app manifest](~/resources/schema/manifest-schema.md).

To define core commands that your bot responds to, you can add a command menu with a drop-down list of commands for your bot. Bots in a group or channel only receive messages when they are mentioned @botname. Teams sends notifications to your bot for conversation events that happen in scopes where your bot is active. You can capture these events in your code and take action on them. A bot can also send proactive messages to users. A proactive message is any message sent by a bot that is not in response to a request from a user. You can format your bot messages to include rich cards that include interactive elements, such as buttons, text, images, audio, video, and so on. Rather than have your messages be static snapshots of data, your bot can dynamically update messages after sending them. Messages can also be deleted using the Bot Framework's `DeleteActivity` method.

## Next step

> [!div class="nextstepaction"]
> [Messages in bot conversations](~/bots/how-to/conversations/conversation-messages.md)
