---
title: Universal actions for search based message extensions
author: v-ypalikila
description: In this article, learn about Universal Actions and automatic refresh for adaptive cards in search based message extensions.
ms.topic: conceptual
ms.author: v-ypalikila
ms.localizationpriority: medium
---

# Universal Actions for search based message extensions

Adaptive Cards in search based message extensions now support Universal Actions. To enable Universal Actions for search based message extensions, the app must conform to the [schema for Universal Actions for Adaptive Cards](../../../task-modules-and-cards/cards/Universal-actions-for-adaptive-cards/Work-with-Universal-Actions-for-Adaptive-Cards.md#schema-for-universal-actions-for-adaptive-cards) along with the following requirements:

1. The app must have a conversation bot defined in the app manifest.
1. If you already have a conversational bot, you must use the same bot that is used in your message extension.
1. If the card is sent in a group, the app must specify `team` or `groupchat` scope on their bot in the manifest.

Example of a JSON schema with `team` and `groupchat` values:

```json
{
    "$schema": "https://developer.microsoft.com/json-schemas/teams/v1.11/MicrosoftTeams.schema.json",
    "manifestVersion": "1.11",
    "version": "1.0.0",
    "id": "%MICROSOFT-APP-ID%",
    "bots": [
        {
            "botId": "%MICROSOFT-APP-ID-REGISTERED-WITH-BOT-FRAMEWORK%",
            "scopes": [
                    "team",
                    "personal",
                    "groupchat"
                ]
        }
    ],
    "composeExtensions": [
        {
            "canUpdateConfiguration": true,
            "botId": "%MICROSOFT-APP-ID-REGISTERED-WITH-BOT-FRAMEWORK%", // Use the same bot as what is specified in the bots section above
        }
    ]
}
```

## Automatic refresh for Adaptive Cards in search based message extensions

Enable automatic refresh for Adaptive Cards in search based message extensions to ensure users always see the latest information. To enable, define `userIds` array either in  `29:<ID>` or `8:orgid:<AAD ID>` format in the `refresh` property. For more information, see [work with Universal Actions for Adaptive Cards](../../../task-modules-and-cards/cards/Universal-actions-for-adaptive-cards/Work-with-Universal-Actions-for-Adaptive-Cards.md#user-ids-in-refresh).

Example of `userIds` array in the `refresh` property:

```json
    {
        "type": "AdaptiveCard",
        "refresh": {
            "userIds": [
                "8:orgid:<AADID>",
                "29:<id>"
            ],
            "action": {
                "type": "Action.Execute",
                "data": {}
            }
        },
        "body": [
            {
                "type": "TextBlock",
                "text": "Hello World!",
                "wrap": true
            }
        ],
        "actions": [
            {
                "type": "Action.Execute",
                "data": {},
                "title": "Hello"
            }
        ]
    }
```

> [!NOTE]
> Automatic refresh is enabled for all users in the group chat or channel with *less than or equal to* 60 users. For conversations (group chat or channel) with more than 60 users, users can use the refresh button in the message options menu to get the latest result.

Example of `Action.Execute` in the `refresh` property:

```json
    {
        "type": "AdaptiveCard",
        "refresh": {
            "action": {
                "type": "Action.Execute",
                "data": {}
            }
        },
        "body": [
            {
                "type": "TextBlock",
                "text": "Hello World!",
                "wrap": true
            }
        ],
        "actions": [
            {
                "type": "Action.Execute",
                "data": {},
                "title": "Hello"
            }
        ]
    }
```

## Just-in-time install

Just-in-time (JIT) allows you to install a card or message extension for multiple users in a group chat or channel. In order to support Universal Actions in search based message extensions, your bot is added to the conversation where the card (with `Action.Execute`) is sent by the user.

When a user selects a card and sends it in a group chat or channel, a **JIT** installation prompt appears. After the user selects the **send** option, the app is added for all the users in the chat or channel in the background.

> [!NOTE]
> For apps that don’t have `Action.Execute` and `refresh` schema defined, the install prompt isn't shown to the users.

Example of a dynamic ME and JIT install user flow:

  :::image type="content" source="../../../assets/videos/dynamic-me-jit-flow.gif" alt-text="GIF shows the user flow for a dynamic message extension and JIT install.":::

## See also

* [Message extensions](../../what-are-messaging-extensions.md)
* [Adaptive Cards](../../../task-modules-and-cards/what-are-cards.md#adaptive-cards)
* [Universal Actions for Adaptive Cards](../../../task-modules-and-cards/cards/Universal-actions-for-adaptive-cards/Overview.md)
