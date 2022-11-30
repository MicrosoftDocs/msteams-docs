---
title: Notification-only bots
description: In this module, learn what notification-only bots are in Microsoft Teams, app manifest and its best practices and limitations
ms.topic: conceptual
ms.localizationpriority: medium
ms.date: 01/29/2020
---
# Notification-only bots in Microsoft Teams

[!include[v3-to-v4-SDK-pointer](~/includes/v3-to-v4-pointer-bots.md)]

If your bot's sole purpose is to deliver notification to users and isn't conversational, you can enable the `isNotificationOnly` field in your app manifest. This produces the following changes:

* Users can't message your notification-only bot.
* Users can't @mention the bot.

> [!NOTE]
> The bot-only apps will surface in the personal app tray in both cases: `isNotificationOnly: true` or `isNotificationOnly: false`.

## App manifest

To enable this, set `isNotificationOnly` to `true`.

> [!NOTE]
> The value of `isNotificationOnly` is Boolean and not a string.

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

Notification-only bots use proactive messaging to communicate with the user. For more information, see [Proactive messaging for bots](~/resources/bot-v3/bot-conversations/bots-conv-proactive.md).
