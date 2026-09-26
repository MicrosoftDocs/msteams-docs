---
title: User Feedback Controls
description: Learn how to add and handle user feedback controls in agent messages using Teams SDK.
ms.topic: article
ms.localizationpriority: medium
ms.date: 09/26/2026
---

# User feedback controls

Feedback controls in agent messages help you track user engagement, identify errors, and gain insights into agent performance. Enable feedback controls to allow users to like or dislike messages and provide detailed feedback.

> [!NOTE]
>
> * Feedback controls are available for agents in personal chats, group chats, and channels.
> * Feedback controls are available in [Government Community Cloud (GCC), GCC High, and Department of Defense (DoD)](../../concepts/cloud-overview.md) environments.

Feedback controls are located at the footer of the agent's message and include a 👍 (thumbs up) and a 👎 (thumbs down) button that the user selects.

# [Desktop](#tab/desktop)

:::image type="content" source="../../assets/images/bots/bot-feedback-buttons.png" border="false" alt-text="Screenshot shows the feedback controls in an agent in the Teams desktop client." lightbox="../../assets/images/bots/bot-feedback-buttons.png":::

# [Mobile](#tab/mobile)

:::image type="content" source="../../assets/images/bots/feedback-buttons-mobile.png" border="false" alt-text="Screenshot shows feedback controls in an agent in the Teams mobile client." lightbox="../../assets/images/bots/feedback-buttons-mobile.png":::

---

When the user selects a feedback button, a feedback form appears based on the user's selection. You can either use the default feedback form or customize it to suit your app's needs.

# [Desktop](#tab/desktop)

:::image type="content" source="../../assets/images/bots/bot-feedback-form.png" border="false" alt-text="Screenshot shows the default feedback form in an agent in the Teams desktop client.":::

# [Mobile](#tab/mobile)

:::image type="content" source="../../assets/images/bots/feedback-form-mobile.png" border="false" alt-text="Screenshot shows the default feedback form in an agent in the Teams mobile client." lightbox="../../assets/images/bots/feedback-form-mobile.png":::

---

## Add feedback controls

To enable feedback controls in an agent built using **Teams SDK**, use the `addFeedback()` method on the message activity.

# [JavaScript](#tab/javascript)

```javascript
app.message(/feedback/i, async ({ send }) => {
  await send(
    new MessageActivity("This is an example of a feedback control that helps collect feedback for a message")
      .addFeedback()
  );
});
```

# [C#](#tab/csharp)

```csharp
async Task SendFeedbackControls(IContext context)
{
    await context.Send(
        new MessageActivity("This is an example of a feedback control that helps collect feedback for a message")
            .AddFeedback());
}
```

# [Python](#tab/python)

```python
@app.on_message_pattern(re.compile(r"feedback", re.IGNORECASE))
async def add_feedback_controls(ctx: ActivityContext[MessageActivity]):
    await ctx.send(
        MessageActivityInput(
            text="This is an example of a feedback control that helps collect feedback for a message",
        ).add_feedback("custom")
    )
```

---

| Property | Type | Required | Description |
| -- | -- | -- | -- |
| `feedbackLoop` | Object | ✔️ | Enables feedback controls in the agent's message. |
| `feedbackLoop.type` | String | ✔️ | Defines the type of feedback form that appears when a user selects a feedback button.<br>Allowed values: `custom`, `default` |

If you set `feedbackLoop.type` to `default`, the default feedback form appears when a user selects a feedback button. To display a custom feedback form, set `feedbackLoop.type` to `custom`. The following invoke request is sent to the agent to retrieve a custom form:

```json
{
  "type": "invoke",
  "name": "message/fetchTask",
  "value": {
    "actionName": "feedback",
    "actionValue": {
      "reaction": "like"
    }
  }
}
```

The value of `reaction` is `like` or `dislike`.

You must respond to this invoke call with a dialog (referred to as a task module in TeamsJS v1.x), the same way you respond to a `task/fetch` invoke. For more information about invoking dialogs in agents, see [Use dialogs with bots](../../task-modules-and-cards/task-modules/task-modules-bots.md).

## Handle feedback

The agent receives user input from the feedback form through an agent invoke flow. For agents built using **Teams SDK**, the agent invoke request is handled automatically. Handle user feedback using the `message.submit.feedback` event:

```javascript
app.on("message.submit.feedback", async (context) => {
  // Add custom logic here.
});
```

The response to the `message.submit.feedback` event must be empty. Otherwise, Teams returns a `400` error.

> [!NOTE]
> Teams doesn't store or process feedback and doesn't provide an API or storage mechanism for it.

If a user uninstalls your agent and still has access to the agent chat, Teams removes the feedback controls from the agent messages to prevent the user from providing feedback to the agent.

## Code sample

The Teams conversation agent sample displays feedback controls and handles user feedback:

* [Node.js](https://github.com/OfficeDev/Microsoft-Teams-Samples/tree/main/samples/TeamsSDK/bot-ai-messages/nodejs/bot-ai-messages)
* [.NET](https://github.com/OfficeDev/Microsoft-Teams-Samples/tree/main/samples/TeamsSDK/bot-ai-messages/dotnet/bot-ai-messages)
* [Python](https://github.com/OfficeDev/Microsoft-Teams-Samples/tree/main/samples/TeamsSDK/bot-ai-messages/python/bot-ai-messages)

## See also

* [AI Content Labels](../../bots/how-to/bot-messages-ai-generated-content.md)
* [Format agent messages](../../bots/how-to/format-your-bot-messages.md)
