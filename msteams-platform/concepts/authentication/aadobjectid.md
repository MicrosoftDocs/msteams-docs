---
title: Teams Support for AAD Object ID and UPN in User Mention 
author: Rajeshwari-v
description: Describes Teams support for AAD Object ID and UPN in User Mention for bots and incoming webhook connectors
ms.topic: conceptual
localization_priority: Normal
ms.author: surbhigupta
---

# Teams Support for AAD Object ID and UPN in User Mention 

Teams platform allows you to mention users with their AAD Object ID and User Principle Name (UPN) in addition to the existing mention ID types.

Adaptive Cards in bots and Incoming Webhooks in Connectors support the additional user mention IDs. 

The following table describes the newly supported user mention ID types:

|ID Format | Used by |	Description	| Example |
|----------|--------|---------------|---------|
| AAD Object ID | 	Bot, Connector | 	AAD user’s object ID |	49c4641c-ab91-4248-aebb-6a7de286397b |
| UPN |	Bot, Connector | 	AAD user’s UPN 	| john.smith@microsoft.com |

## User mention with Adaptive Card in Bot

Text messages or Adaptive Cards in Bot including `invoke` support the two ID types in addition to existing IDs for user mentions in different scenarios.

> [!NOTE]
> Schema update and UI/UX changes are not required for user mentions with AAD Object ID and UPN.

### Example 

```json 
{
  "$schema": "http://adaptivecards.io/schemas/adaptive-card.json",
  "version": "1.0",
  "type": "AdaptiveCard",
  "body": [
    {
      "type": "TextBlock",
      "text": "Hi <at>Adele</at>"
    }
  ],
  "msteams": {
    "entities": [
      {
        "type": "mention",
        "text": "<at>Adele</at>",
        "mentioned": {
          "id": "AdeleV@contoso.onmicrosoft.com"
        }
      }
    ]
  }
}
```

Following image illustrates user mention with Adaptive Card in Bot:

![User mention in bot with Adaptive Card](~/assets/images/authentication/user-mention-in-bot.png)

## User mention in Incoming Webhook

Incoming webhooks support user mention with the two ID types for user mentions in different scenarios.

> [!NOTE]
> You must enable the user mention in the schema. UI/UX changes are not required for user mentions with AAD Object ID and UPN.

### Example 

```json
{
    "type": "message",
    "attachments": [
        {
        "contentType": "application/vnd.microsoft.card.adaptive",
        "content": {
            "type": "AdaptiveCard",
            "body": [
                {
                    "type": "TextBlock",
                    "size": "Medium",
                    "weight": "Bolder",
                    "text": "Sample Adaptive Card with User Mention"
                },
                {
                    "type": "TextBlock",
                    "text": "Hi <at>Adele</at>"
                }
            ],
            "$schema": "http://adaptivecards.io/schemas/adaptive-card.json",
            "version": "1.0",
            "msteams": {
                "entities": [
                    {
                        "type": "mention",
                        "text": "<at>Adele</at>",
                        "mentioned": {
                            "id": "AdeleV@contoso.onmicrosoft.com"
                        }
                    }
                ]
            }
        }
    }]
}
```

Following image illustrates user mention in Incoming Webhook:

![User mention in Incoming Webhook](~/assets/images/authentication/user-mention-in-incoming-webhook.png)

