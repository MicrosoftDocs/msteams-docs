---
title: Format your bot response
description: Learn how to format and style your bot and the responses it generates for users.
ms.topic: conceptual
---

# Format your bot response

While large language models (LLMs) significantly enhance your bot’s capabilities, they can be inconsistent and often require careful fine-tuning and prompts to behave as intended. Feedback from users is helpful in assessing the performance of your bot in a real-world scenario and enables you to make effective and targeted upgrades. Microsoft Teams allows you to enable message-level feedback buttons. Users can select these buttons to provide feedback about the quality of the message your bot responds with. An optional form appears after the user selects the button that allows them to provide detailed and specific feedback about the message.

The following screenshot shows feedback buttons in a bot:

:::image type="content" source="../../assets/images/bots/bot-feedback-buttons.png" alt-text="Screenshots shows the feedback buttons in a bot.":::

The following screenshot shows a feedback form in a bot:

:::image type="content" source="../../assets/images/bots/bot-feedback-form.png" alt-text="Screenshot shows the feedback form in a bot.":::

> [!NOTE]
>
> * Feedback buttons and forms for bots are only available in public developer preview.
> * Feeback buttons and forms for bots are only available in Teams web and desktop clients.

Enabling feedback for your bot adds the feedback buttons to the footer of messages that the bot sends to the user. You can enable feedback buttons for specific messages in your bot. The bot sends the user's input received in the feedback form to you through the bot invoke.
You are responsible for receiving the feedback, mapping it to the appropriate message, and storing the feedback. Teams doesn't store the feedback, provide an API, or a way to manage and view the feedback received.

## How to enable feedback buttons

To enable feedback buttons in your bot, add a new object `channelData` in your bot logic and set `feedbackLoopEnabled` to true.

```json
       await context.sendActivity({
         type: ActivityTypes.Message,
         text: `Hey I'm a friendly AI bot. This mesasge is generated via AI - ${txt}`,
+        channelData: {
+          feedbackLoopEnabled: true // Feedback buttons 
+        },
       });
```

You can collect feedback on your bot’s responses across personal chat, group chat, and channel scopes.

## Feedback mechanism

## Feedback for uninstalled bots

If a user uninstalls your bot but still has access to the bot chat, the feedback buttons are visible. However, the user cannot provide feedback to the bot.

## How to handle feedback

### How to store messageID and message content pairs

## Error codes/exceptions/fallbacks

## Code sample

## See also

* [Format your bot messages](format-your-bot-messages.md)
* [Update and delete messages sent from bot](update-and-delete-bot-messages.md)
* [Teams Store validation guidelines](../../concepts/deploy-and-publish/appsource/prepare/teams-store-validation-guidelines.md)
