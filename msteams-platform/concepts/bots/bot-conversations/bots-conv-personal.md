---
title: 1-on-1 conversations with bots
description: Describes the end-to-end scenario of having a 1-on-1 conversation with a bot in Microsoft Teams
keywords: teams scenarios 1on1 1to1 conversation bot
ms.date: 03/20/2018
---

# Interact one-on-one (1:1) with a Microsoft Teams bot

Microsoft Teams allows users to engage in direct conversations with bots built on the [Microsoft Bot Framework](https://docs.botframework.com/en-us/). Users can find bots in the Discover Apps gallery and add them to their Teams experience for 1:1 conversations. Team owners and users with the appropriate permissions can also add bots as full team members (see [Interact in a team channel](~/concepts/bots/bot-conversations/bots-conv-channel)), which not only makes them available in that team's channels, but for 1:1 chat for all of those users as well.

## Designing a great personal (1:1) bot

A great bot in Microsoft Teams helps users get the information they need, all within the context of the Teams experience. One-on-one conversations with a bot are private exchanges between a bot and its user; they're a great way to provide information specific and relevant to that user in the personal context. A bot in 1:1 is really a dialog between your service and the individual, where a bot in a channel that broadcasts information to a group.

Depending on the experience you want to create, the bot might need to work in both scopes - personal and team. No significant extra work is required to make your bot to work in both. There is no expectation in Teams that your bot function in all contexts, but you should ensure that your bot makes sense and provides user value in whatever scope(s) you choose to support.

## Best practice: Welcome messages in 1:1 conversations

For bots that are added directly by a user, and not already part of any of the user's teams, it is a best practice to send a welcome message to the General channel to introduce the bot to all users of the team and tell a bit about its functionality. 

To do this, ensure that your bot responds to the `conversationUpdate` message, with the `teamsAddMembers` eventType in the `channelData` object.

Your bot should proactively send a welcome message to a 1:1 chat the first time (and only the first time) a user initiates a 1:1 chat with your bot. (This recommendation does not apply to first-time contacts in a channel.)

For more best practices, see our [design guidelines](~/resources/design/overview).
