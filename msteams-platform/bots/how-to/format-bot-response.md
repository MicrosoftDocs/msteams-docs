---
title: Format your bot response
description: Learn how to format and style your bot and the responses it generates for users.
ms.topic: conceptual
---

# Format your bot response

While large language models (LLMs) significantly enhance your bot’s capabilities, they can be inconsistent and often require careful fine-tuning to behave as intended. Feedback from users is helpful in assessing the performance of your bot in a real-world scenario and enables you to make effective and targeted upgrades. Microsoft Teams allows you to enable feedback buttons in the messages your bot sends. Users can select these buttons to provide feedback about the quality of the message. An optional form appears that allows them to provide more detailed and specific feedback about the message.

> [!NOTE]
>
> * Feedback buttons and forms for bots are available in public developer preview.
> * Feeback buttons and forms for bots are only available in Teams web and desktop clients.
> * You can collect feedback on your bot’s responses across personal chat, group chat, and channels.

You're responsible for receiving the feedback, mapping it to the appropriate message, and storing the feedback. Teams doesn't store the feedback, provide an API, or a way to manage and view the feedback received.

## How to enable feedback buttons

To enable feedback buttons in your bot, add a new `channelData` object in your bot's message and set `feedbackLoopEnabled` to true.

```json
       await context.sendActivity({
         type: ActivityTypes.Message,
         text: `Hey I'm a friendly AI bot. This mesasge is generated via AI - ${txt}`,
+        channelData: {
+          feedbackLoopEnabled: true // Feedback buttons 
+        },
       });
```

After you enable feedback buttons, the footer of your bot's message contains a like and dislike button that the user can select. You can enable feedback buttons for specific messages in your bot.

:::image type="content" source="../../assets/images/bots/bot-feedback-buttons.png" alt-text="Screenshots shows the feedback buttons in a bot.":::

When the user selects one of the feedback buttons, a feedback form appears that asks the user for more information. Depending on the user's selection, a positive or a negative feedback form appears.

# [Positive feedback form](#tab/pos)

:::image type="content" source="../../assets/images/bots/bot-feedback-form.png" alt-text="Screenshot shows the feedback form in a bot.":::

# [Negative feedback form](#tab/neg)

:::image type="content" source="../../assets/images/bots/bot-feedback-form.png" alt-text="Screenshot shows the feedback form in a bot.":::

The bot sends the user's input in the feedback form to you through a bot invoke. The following code snippet is an example of a bot invoke containing feedback from a user:

```json
    {
      "name": "message/submitAction",
      "conversation": {
        "id": "19:144de878089f94d7db699d10a4672bc040@thread.v2"
      },
      "value": {
        "actionName": "feedback",
        "actionValue": {
          "reaction": "like",
          "feedback": "test feedback"
        }
      }
    }
```

## Handle feedback

When your bot receives the invoke, ensure that it responds with an HTTP status code 200 response with no body. We recommend that your bot don't send the user any message or notification upon receiving feedback. Teams automatically sends a toast notifying the user that their feedback was submitted successfully.

Once you start receiving feedback, ensure that you store the feedback. Teams doesn't store or process feedback after the invoke is sent to your bot. Store the message IDs and the content of the messages that your bot sends and receives. Use the message ID to match and store the feedback with the corresponding bot message When your bot receives the invoke.

### How to store messageID and message content pairs

> [!NOTE]
> If a user uninstalls your bot and still has access to the bot chat, Teams removes the feedback buttons from the bot's messages to prevent the user from providing feedback to the bot.

## Error handling

Ensure that you handle the errors listed in the table appropriately in your bot. The following table lists the error codes and the conditions under which the errors are generated:

| Error code | Error name | Condition |
| --------- | --------------- | -------- |
| **400** | Bad Request | `submit/messageAction` invoke response isn't empty |

## Code samples

| S.No. | Description | .NET | Node.js | Manifest |
|:--|:--|:--|---|---|
| 1 | This sample app provides an LLM-based bot with feedback buttons. | [View](https://github.com/OfficeDev/Microsoft-Teams-Samples) | [View](https://github.com/OfficeDev/Microsoft-Teams-Samples) | [View](https://github.com/OfficeDev/Microsoft-Teams-Samples) |

## See also

* [Format your bot messages](format-your-bot-messages.md)
* [Update and delete messages sent from bot](update-and-delete-bot-messages.md)
* [Teams Store validation guidelines](../../concepts/deploy-and-publish/appsource/prepare/teams-store-validation-guidelines.md)
