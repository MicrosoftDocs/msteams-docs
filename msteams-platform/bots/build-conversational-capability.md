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

| Format | From user to bot | From bot to user |
| --- |:---:|:---:|
| [Rich text and Emojis](#use-rich-text-message-and-emojis) | ✔️ | ✔️ |
| [Pictures](#use-picture-messages) | ✔️ | ✔️ |
| [Adaptive Cards](#use-adaptive-cards) | ❌ | ✔️ |

### Use rich text message and emojis

Your Teams bot can send rich text and emojis. Teams supports emojis through UTF-16, like U+1F600 for a grinning face.

### Use picture messages

To make bot message pop, the user can add pictures as attachments:

- Pictures can be up to 1024 × 1024 pixels and 1 MB in PNG, JPEG, or GIF format. Animated GIFs aren't supported.
- You can specify the height and width of each image using XML. In Markdown, the image size defaults to 256×256. For example:

  - ✔️: `<img src="http://aka.ms/Fo983c" alt="Duck on a rock" height="150" width="223"></img>`.
  - ❌: `![Duck on a rock](http://aka.ms/Fo983c)`.

For more information on attachments, see [add media attachments to messages](/azure/bot-service/dotnet/bot-builder-dotnet-add-media-attachments).

### Use Adaptive Cards

A conversational bot can include Adaptive Cards that simplify business workflows. Adaptive Cards offer rich customizable text, speech, images, buttons, and input fields. You can author Adaptive Cards in a bot and shown in multiple apps such as Teams, your website, and so on.

For more information, see:

- [Adaptive Cards](~/task-modules-and-cards/cards/cards-reference.md#adaptive-card) for.
- [Teams card reference](~/task-modules-and-cards/cards/cards-reference.md) for supported cards.

The following code shows an example of sending a simple Adaptive Card:

<details>
<summary>Example: Send a simple Adaptive Card</summary>

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

</details>

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
