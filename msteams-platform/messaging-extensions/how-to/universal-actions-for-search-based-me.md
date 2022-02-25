---
title: Universal Actions for search based messaging extensions
author: v-ypalikila
description: Adaptive Cards in Search based messaging extensions now support Universal Actions.
ms.localizationpriority: medium
ms.topic: conceptual
ms.author: v-ypalikila
---
## Universal Actions for search based messaging extensions

Adaptive Cards in Search based messaging extensions now support Universal Actions. To enable Universal Actions for search based messaging extensions, the app must conform to the [Schema for Universal Actions for Adaptive Cards](../../../task-modules-and-cards/cards/Universal-actions-for-adaptive-cards/Work-with-Universal-Actions-for-Adaptive-Cards.md#schema-for-universal-actions-for-adaptive-cards) along with the following requirements:

1. The app must have a conversation bot defined in their app manifest.
1. If you already have a conversational bot, the bot must be the same that is used in your messaging extension.
1. If the card is sent in a group, the app must specify `team` or `groupchat` scope on their bot in the manifest.

**Example**

The following is an example of a json schema with `team` and `groupchat`values:

```json
{
    "$schema": "https://developer.microsoft.com/json-schemas/teams/v1.11/MicrosoftTeams.schema.json",
    "manifestVersion": "1.11",
    "version": "1.0.0",
    "id": "%MICROSOFT-APP-ID%",
    "packageName": "com.example.myapp",
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

### Automatic refresh for Adaptive Cards in search based MEs

Enable automatic refresh for Adaptive Cards in search based messaging extensions to ensure users always see the latest information. To enable, define `userIds` array in either `29:<ID>` or `8:orgid:<AAD ID>` format in the `refresh` property. For more information, see [Work with Universal Actions for Adaptive Cards](../../../task-modules-and-cards/cards/Universal-actions-for-adaptive-cards/Work-with-Universal-Actions-for-Adaptive-Cards.md#user-ids-in-refresh)

**Example**

The following is an example of `userIds` array in the `refresh` property:

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
> Automatic refresh is enabled for all users in the group chat or channel with LESS than or equal to 60 users. For conversations (group chat or channel) with more than 60 users, users can use the refresh button in the message options menu to get the latest result.

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

### Just-In Time (JIT) install

Just-In Time (JIT) allows you to install a card or messaging extension for multiple users in a group chat or channel. Your bot is added to the conversation where the card is sent by the user to support Universal Actions in search based Message extensions.

When a user selects a card and sends it in a group chat or channel, a **Just-In Time (JIT)** installation prompt appears. After the user selects the **send** option, the bot installs the card in the background for all the users in the chat or channel and the message sent to the chat or channel.

> [!NOTE]
> For apps that don’t have `Action.Execute` and `refresh` schema defined, the install prompt is not shown to the users.

The following is an example of a dynamic ME and JIT install user flow:

  :::image type="content" source="../../../assets/videos/dynamic-me-jit-flow.gif" alt-text="Dynamic ME JIT flow":::

## See also

[Work with Universal Actions for Adaptive Cards](../../task-modules-and-cards/cards/Universal-actions-for-adaptive-cards/Work-with-Universal-Actions-for-Adaptive-Cards.md)
[Respond to search command](search-commands/respond-to-search.md)
