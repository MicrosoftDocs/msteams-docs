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

If you need more information about inserting messages into the Activity Feed, see [this article](~//concepts/activity-feed.md).

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

* Notification only bots use proactive messaging to communicate with the user. See [Proactive messaging for bots](~/concepts/bots/bot-conversations/bots-conv-proactive) for more details.
* If you want your notification bot to notify users privately, take a look at how to start [1-on-1 conversations with bots](~/concepts/bots/bot-conversations/bots-conv-proactive#starting-11-conversations).
* If you want your notification bot to notify users in a channel, take a look at how to start [channel conversations with bots](~/concepts/bots/bot-conversations/bots-conv-proactive#creating-a-channel-conversation).