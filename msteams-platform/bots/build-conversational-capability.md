---
title: Conversations with a Bot
description: Learn about sending and receiving messages using a bot app
ms.topic: conceptual
ms.localizationpriority: medium
ms.author: surbhigupta
ms.date: 10/03/2024
---

# Build conversational capability

Conversational bots communicate with users through messaging, enabling seamless interactions.

## Message content

Messages received from or sent to your bot can include different types of message content:

| Format | From user to bot | From bot to user | Notes |
| --- |:---:|:---:| ---|
| [Rich text](#use-rich-text-message) | ✔️ | ✔️ | Your bot can send rich text, pictures, and cards. Users can send rich text and pictures to your bot. |
| [Pictures](#use-picture-messages) | ✔️ | ✔️ | Maximum 1024 × 1024 pixels and 1 MB in PNG, JPEG, or GIF format. Doesn't support the animated GIF. |
| [Adaptive Cards](#use-adaptive-cards) | ❌ | ✔️ | See [Teams card reference](~/task-modules-and-cards/cards/cards-reference.md) for supported cards. |
| Emojis | ✔️ | ✔️ | Teams supports emojis through UTF-16, such as U+1F600 for grinning face. |

### Use rich text message

### Use picture messages

To enhance your message, you can include pictures as attachments to that message. For more information on attachments, see [add media attachments to messages](/azure/bot-service/dotnet/bot-builder-dotnet-add-media-attachments).

Pictures can be at most 1024 × 1024 pixels and 1 MB in PNG, JPEG, or GIF format. Animated GIF isn't supported.

Specify the height and width of each image by using XML. In Markdown, the image size defaults to 256×256. For example:

- Use: `<img src="http://aka.ms/Fo983c" alt="Duck on a rock" height="150" width="223"></img>`.
- Don't use: `![Duck on a rock](http://aka.ms/Fo983c)`.

A conversational bot can include Adaptive Cards that simplify business workflows. Adaptive Cards offer rich customizable text, speech, images, buttons, and input fields.

### Use Adaptive Cards

Adaptive Cards can be authored in a bot and shown in multiple apps such as Teams, your website, and so on. For more information, see [Adaptive Cards](~/task-modules-and-cards/cards/cards-reference.md#adaptive-card).

The following code shows an example of sending a simple Adaptive Card:

```json
{
    "type": "AdaptiveCard",
    "$schema": "http://adaptivecards.io/schemas/adaptive-card.json",
    "version": "1.5",
    "body": [
    {
        "items": [
        {
            "size": "large",
            "text": " Simple Adaptivecard Example with a Textbox",
            "type": "TextBlock",
            "weight": "bolder",
            "wrap": true
        },
        ],
        "spacing": "extraLarge",
        "type": "Container",
        "verticalContentAlignment": "center"
    }
    ]
}
```

## Send and receive messages

Sending and receiving messages is the core functionality of a bot. It enables a bot to:

- Send and receive messages
  - Receive a message activity
  - Receive edit message activity
  - Receive undelete message activity
  - Receive soft delete message activity
  - Send a message
- Send suggested actions
- Update and delete bot messages

## Send messages in Teams channel data

## Next step

## See also
