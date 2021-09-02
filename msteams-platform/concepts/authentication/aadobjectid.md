---
title: Support for AAD Object ID and UPN in user mention 
author: Rajeshwari-v
description: Describes Teams support for AAD Object ID and UPN in User Mention for bots and incoming webhook connectors
ms.topic: conceptual
localization_priority: Normal
ms.author: surbhigupta
---

# Support for AAD Object ID and UPN in user mention 

Teams platform allows you to mention users with their AAD Object ID and User Principle Name (UPN), in addition to the existing mention IDs. Bots with Adaptive Cards and Connectors with Incoming Webhooks support the additional user mention IDs. 

The following table describes the newly supported user mention ID:

|IDs  | Supporting capabilities |	Description	| Example |
|----------|--------|---------------|---------|
| AAD object ID | Bot, Connector |  AAD user’s object ID |	49c4641c-ab91-4248-aebb-6a7de286397b |
| UPN |	Bot, Connector | AAD user’s UPN | john.smith@microsoft.com |

## User mention in bots with Adaptive Cards 

Bots support user mentions with the AAD Object ID and UPN, in addition to the existing IDs. The support the two new IDs is available in bots for text messages or Adaptive Cards including `invoke`. 

> [!NOTE]
> Schema update and UI/UX changes are not required for user mentions with Adaptive Card in Bot.

### Example 

Example for user mention in bots with Adaptive Cards as follows:

```json 
{
  "$schema": "http://adaptivecards.io/schemas/adaptive-card.json",
  "version": "1.0",
  "type": "AdaptiveCard",
  "body": [
    {
      "type": "TextBlock",
      "text": "Hi <at>Adele UPN</at>, <at>Adele AAD</at>"
    }
  ],
  "msteams": {
    "entities": [
      {
        "type": "mention",
        "text": "<at>Adele UPN</at>",
        "mentioned": {
          "id": "AdeleV@contoso.onmicrosoft.com",
          "name": "Adele Vance"
        }
      },
      {
        "type": "mention",
        "text": "<at>Adele AAD</at>",
        "mentioned": {
          "id": "87d349ed-44d7-43e1-9a83-5f2406dee5bd",
          "name": "Adele Vance"
        }
      }
    ]
  }
}
```

Following image illustrates user mention with Adaptive Card in Bot:

![User mention in bot with Adaptive Card](~/assets/images/authentication/user-mention-in-bot.png)

## User mention in Incoming Webhook

Incoming webhooks support user mention with the AAD Object ID and UPN, in addition to the existing IDs in different scenarios.

> [!NOTE]
> You must enable the user mention in the schema for Incoming webhook to support AAD Object ID and UPN. 
> UI/UX changes are not required for user mentions with AAD Object ID and UPN.

### Example 

Example for user mention in Incoming Webhook as follows:

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
                    "text": "Hi <at>Adele UPN</at>, <at>Adele AAD</at>"
                }
            ],
            "$schema": "http://adaptivecards.io/schemas/adaptive-card.json",
            "version": "1.0",
            "msteams": {
                "entities": [
                    {
                        "type": "mention",
                        "text": "<at>Adele UPN</at>",
                        "mentioned": {
                          "id": "AdeleV@contoso.onmicrosoft.com",
                          "name": "Adele Vance"
                        }
                      },
                      {
                        "type": "mention",
                        "text": "<at>Adele AAD</at>",
                        "mentioned": {
                          "id": "87d349ed-44d7-43e1-9a83-5f2406dee5bd",
                          "name": "Adele Vance"
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

## Code sample

| Sample name | Description | C# |
|-------------|-------------|------|
|Support for AAD Object ID and UPN in user mention |Microsoft Teams sample app for demonstrating support for AAD Object ID and UPN in user mention.|[View](https://github.com/microsoft/BotBuilder-Samples/tree/main/samples/csharp_dotnetcore/07.using-adaptive-cards)|

