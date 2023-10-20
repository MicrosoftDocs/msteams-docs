---
title: One-on-one conversations with bots
description: In this module, learn end-to-end scenario of having a one-on-one conversation with a bot in Microsoft Teams
ms.localizationpriority: medium
ms.topic: conceptual
ms.date: 04/02/2023
---
# Have a personal (one-on-one) conversation with a Microsoft Teams bot

[!include[v3-to-v4-SDK-pointer](~/includes/v3-to-v4-pointer-bots.md)]

Microsoft Teams allows users to engage in direct conversations with bots built on the [Microsoft Bot Framework](/azure/bot-service/?view=azure-bot-service-3.0&preserve-view=true). Users can find bots in the Discover Apps gallery and add them to their Teams experience for personal conversations. Team owners and users with the appropriate permissions can also add bots as team members. For more information, see [Interact in a team channel](~/resources/bot-v3/bot-conversations/bots-conv-channel.md), which not only makes them available in that team's channels, but for personal chat users as well.

Personal chat differs from chat in channels in that the user doesn't need to @mention the bot. If a bot is used in multiple contexts such as in the following scopes:

* Personal
* Group chat
* Channel

You need to detect if the bot is in a group chat or channel, and process messages a little differently. For more information, see [Interact in a team channel or group chat](~/resources/bot-v3/bot-conversations/bots-conv-proactive.md).

## Designing a great personal bot

A great bot in Teams helps users get the information they need, all within the context of the Teams experience. Personal conversations with a bot are private exchanges between a bot and its user; they're a great way to provide information specific and relevant to that user in the personal context. A bot in personal chat is a dialog between your service and the individual, where a bot in a group chat or channel broadcasts everything to a group of people.

Depending on the experience you want to create, the bot might need to work in multiple scopes - personal, group chat, and team. The work to support more than one scope is minimal. There is no expectation in Teams that your bot function in all scopes, but you should ensure that your bot makes sense and provides user value in whatever scopes you choose to support.

## Best practice: Welcome messages in personal conversations

Your bot should [proactively send](~/resources/bot-v3/bot-conversations/bots-conv-proactive.md) a welcome message to a personal chat the first time (and only the first time) a user initiates a personal chat with your bot. This recommendation does not apply to first-time contacts in a channel.
