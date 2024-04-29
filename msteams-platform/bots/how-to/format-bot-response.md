---
title: Format your bot response
description: Learn how to format and style your AI-based bot and the responses it generates for users.
ms.topic: conceptual
---

# Format your bot response

While Large Language Models (LLMs) significantly enhance your bot’s capabilities, they can sometimes be inconsistent and require careful adjustments to behave as intended. User feedback is invaluable to evaluate your bot’s performance in real-world scenarios and enables you to make effective and targeted improvements.

Microsoft Teams allows you to enable feedback buttons in the messages sent by your bot. Users can interact with these buttons to indicate that they either like or dislike the message. Once they select a button, an optional form appears that allows them to provide detailed feedback about the message.

> [!NOTE]
>
> * Feedback buttons are available in public developer preview.
> * Feeback buttons are only available in Teams web and desktop clients.
> * You can collect feedback on your bot’s responses from personal chats, group chats, and channels.
> * Feedback buttons are not available for message extensions.

## Enable feedback buttons

To enable feedback buttons in your bot, add a new `channelData` object in your bot's message and set `feedbackLoopEnabled` to true.

```json
       await context.sendActivity({
         type: ActivityTypes.Message,
         text: `Hey I'm a friendly AI bot. This mesasge is generated via AI - ${txt}`,
         channelData: {
           feedbackLoopEnabled: true // Enable feedback buttons
         },
       });
```

After you enable feedback buttons, the footer of your bot's message contains a like and dislike button for the user to select. You have the option to enable feedback buttons for specific messages that your bot sends.

:::image type="content" source="../../assets/images/bots/bot-feedback-buttons.png" alt-text="Screenshots shows the feedback buttons in a bot.":::

When the user selects one of the feedback buttons, the feedback form that appears depends on the user's selection. A positive feedback form appears if the user likes a message and a negative feedback form appears if the user dislike a message.

# [Positive feedback](#tab/pos)

:::image type="content" source="../../assets/images/bots/bot-feedback-form.png" alt-text="Screenshot shows the feedback form in a bot.":::

# [Negative feedback](#tab/neg)

:::image type="content" source="../../assets/images/bots/bot-feedback-form.png" alt-text="Screenshot shows the feedback form in a bot.":::

---

The bot sends the user's input, received in the feedback form, to you through a bot invoke. The following code snippet is an example of a bot invoke containing feedback from a user:

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

When your bot receives the invoke, you need to have an `onInvokeActivity` handler to process the invoke correctly. Ensure that you return a `status:200` with no body.

```json
      public async onInvokeActivity(context: TurnContext): Promise<InvokeResponse> {
        try {
          switch (context.activity.name) {
            case "message/submitAction":
                return CreateInvokeResponse(200);
            default:
              return {
                status: 200,
                body: `Unknown invoke activity handled as default- ${context.activity.name}`,
              };
          }
        } catch (err) {
          console.log(`Error in onInvokeActivity: ${err}`);
          return {
            status: 500,
            body: `Invoke activity received- ${context.activity.name}`,
          };
        }
      }
      export const CreateInvokeResponse = (
       status: number,
       body?: unknown
      ): InvokeResponse => {
         return { status, body };
      };
```

We recommend that you don't send a message or notification to the user upon receiving feedback. Teams automatically notifies the user that their feedback was submitted successfully.

It’s important to store feedback after you receive it. Teams doesn’t store or process feedback, nor does it provide an API or a storage mechanism for you to do so. Hence, you should store the message IDs and the content of the messages that your bot sends and receives. When your bot receives an invoke containing feedback, match the message ID of the bot’s message with the corresponding feedback.

### How to store messageID and message content pairs

> [!NOTE]
> If a user uninstalls your bot but still has access to the bot chat, Teams removes the feedback buttons from the bot's messages to prevent the user from providing feedback to the bot.

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
* [Bot activity handlers](../bot-basics.md)
