---
title: Notification only bots
description: Describes what notification only bots are for in Microsoft Teams
keywords: teams bots notification
---

# Notification only bots in Microsoft Teams

In order for your app to send [activity feed notifications](~/concepts/activity-feed), you must leverage the Bot Framework APIs. In other words, that means your app must contain a bot. If your bot's sole purpose is to deliver notification to users and it is not conversational, you can enable the `isNotificationOnly` field in your app manifest. This produces the following changes:

* Users cannot message your notification only bot.
* Users cannot @mention the bot.


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

* If you want your notification bot to notify users privately, take a look at how to start [1-on-1 conversations with bots](~/scenarios/bots-personal-conversations).
* If you want your notification bot to notify users in a channel, take a look at how to start [channel conversations with bots](~/scenarios/bots-channel-conversations).
* The current implementation implies that there is no way to create a `personal` scoped notification only bot. Since the user cannot message your notification only bot in a 1:1 chat, you do not receive a `conversationUpdate` event that provides you with the necessary details to send a notification to a user. We are aware of this gap.
* In other words, your notification only bot will only function correctly if it supports the `team` scope and is added to a team. In the team setting, your bot will have access to the necessary information to either send a notification to a channel or privately to a user.