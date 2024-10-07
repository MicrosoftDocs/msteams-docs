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

Messages interaction between your bot and user can include different types of message content that:

| Content type | From user to bot | From bot to user |
| --- |:---:|:---:|
| [Rich text and emojis](#use-rich-text-message-and-emojis) | ✔️ | ✔️ |
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

### Send and receive messages

In a chat, each message is an Activity object of type `messageType: message`. When someone sends a message, Microsoft Teams posts it to your bot. Teams sends a JSON object to your bot's messaging endpoint, and it allows only one endpoint for messaging. Your bot then checks the message to figure out its type and responds accordingly.

Basic conversations are managed through the Bot Framework connector, which is a single REST API. This API enables your bot talk to Teams and other channels. The Bot Builder SDK offers the following features:

- Easy access to the Bot Framework connector.
- Tools to manage conversation flow and state.
- Simple ways to add cognitive services, like natural language processing (NLP).

Your bot gets messages from Teams using the `Text` property and can send back single or multiple responses to users.

For more information, see [user attribution for bot messages](/microsoftteams/platform/messaging-extensions/how-to/action-commands/respond-to-task-module-submit?tabs=dotnet%2Cdotnet-1#user-attribution-for-bots-messages).

The following table lists the activity that your bot can receive and take action on:

| Message type | Payload object | Scope |
| --- | --- | --- |
| [Receive a message activity](#receive-a-message-activity) | Message activity | All |
| [Receive edit message activity](#get-edit-message-activity) | Message edit activity | All |
| [Receive undelete message activity](#get-undelete-message-activity) | Message undelete activity | All |
| [Receive soft delete message activity](#get-soft-delete-message-activity) | Message soft delete activity | All |

## Send messages in Teams channel data

## Next step

## See also
