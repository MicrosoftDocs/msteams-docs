---
title: Notification only bots
description: Describes what notification only bots are for in Microsoft Teams
keywords: teams bots notification
ms.date: 05/20/2019
---

# Notification only bots in Microsoft Teams

If your bot's sole purpose is to deliver notification to users and is not conversational, you can enable the `isNotificationOnly` field in your app manifest. This produces the following changes:

* Users cannot message your notification only bot.
* Users cannot @mention the bot.
* You bot must be added to a a team in order to recieve the necessary information to send a proactive message to a user. Before your notification only bot can message a user, you must receive and store the necessary information from the `membersAdded` event sent to your bot.

If you need more information about inserting messages into the Activity Feed, see [this article](~/concepts/activity-feed.md).

## App manifest

To enable this, set `isNotificationOnly` to `true`.

> [!NOTE]
> Be aware that the value of `isNotificationOnly` is boolean and not a string.

```json
{
  ⋮
  "bots":[
    {
      "botId":"[Microsoft App ID for your bot]",
      "isNotificationOnly": true,
      "scopes": [
        "personal",
        "team"
      ],
    }
  ],
  ...
}
```

## Best practices and limitations

* You cannot create a `personal` scoped notification only bot, as the user cannot message your notification only bot in a personal chat. This means that you can't receive a `conversationUpdate` event that would provide you with the necessary details to send a notification. Your notification only bot will only function correctly if it supports the `team` scope and is added to a team. In the team setting, your bot will have access to the necessary information to either send a notification to a channel or privately to a user.
* Notification only bots use proactive messaging to communicate with the user. See [Proactive messaging for bots](~/concepts/bots/bot-conversations/bots-conv-proactive.md) for more details.
* If you want your notification bot to notify users privately, take a look at how to start [1-on-1 conversations with bots](~/concepts/bots/bot-conversations/bots-conv-proactive.md#starting-personal-conversations).
* If you want your notification bot to notify users in a channel, take a look at how to start [channel conversations with bots](~/concepts/bots/bot-conversations/bots-conv-proactive.md#creating-a-channel-conversation).
