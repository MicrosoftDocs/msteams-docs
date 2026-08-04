---
title: Guide Users with Suggested Actions
description: Learn how to create and handle suggested actions for your Microsoft Teams agents and apps to help users continue conversations.
ms.topic: how-to
ms.localizationpriority: medium
zone_pivot_groups: select-language
ms.date: 07/15/2026
---

<!-- markdownlint-disable MD001 -->

# Dynamically guide users with suggested actions

Suggested actions are buttons that agents can dynamically present in chat to help users quickly respond or take action.

:::image type="content" source="~/assets/images/Cards/suggested-actions.png" alt-text="Suggested action buttons displayed below an agent response in a Teams chat." border="false" lightbox="~/assets/images/Cards/suggested-actions.png":::

Suggested actions are useful for requesting user approval or input, guiding users through multi-step workflows, and surfacing agent functionality in the flow of a conversation. The buttons can be configured to send a **predefined message** on the user's behalf, offer a **prefilled response** in the compose box, or **trigger a user action** without posting a chat message.

Agents can dynamically provide up to three suggested action buttons with each chat message they send.

## User experience

When a user selects a button, it remains visible and accessible on rich cards. Suggested actions are supported in personal chats, group chats, and channels. Here are some examples of how a **predefined message** suggested action shows up for desktop and mobile clients in Teams.

# [Personal chat](#tab/pc)

:::image type="content" source="../../../assets/images/agents-in-teams/suggested-actions/im-back-personal.png" alt-text="Suggested actions displayed in a personal chat on a desktop client." border="false" lightbox="../../../assets/images/agents-in-teams/suggested-actions/im-back-personal.png":::

# [Group chat](#tab/gc)

:::image type="content" source="../../../assets/images/agents-in-teams/suggested-actions/im-back-group.png" alt-text="Suggested actions displayed in a group chat on a desktop client." border="false" lightbox="../../../assets/images/agents-in-teams/suggested-actions/im-back-group.png":::

# [Channel](#tab/channel)

:::image type="content" source="../../../assets/images/agents-in-teams/suggested-actions/im-back-channel.png" alt-text="Suggested actions displayed in a channel on a desktop client." border="false" lightbox="../../../assets/images/agents-in-teams/suggested-actions/im-back-channel.png":::

---

Suggested actions behavior varies by conversation scope. Selected actions on rich cards remain visible in group chats and channels, while personal chats show smart replies only from the latest message:

- For **predefined message**, the suggested action button appears with the agent message. In a personal chat, smart replies appear only for the latest agent message. In a group chat or channel, the action remains saved with the message. Selecting it posts the configured value as a user message in that chat.
- For **prefilled response**, the suggested action button appears with the agent message. Selecting it places the configured chat message in that conversation's compose box, where the user can review, edit, and send it. The action does not post or invoke agent logic until the user sends the composed message.
- For **triggering a user action**, the suggested action button appears with the agent message. Selecting it sends a structured invoke payload to the agent or app without posting a user-visible message.

## Implement suggested actions

Suggested action types define how a user’s selection is handled. You can use suggested action buttons to present context-specific next steps to post a message to a chat. You can build the following suggested actions in your agent or app:

- [**Send predefined message**](#send-predefined-message): Lets users quickly send a ready-made response in the conversation using the `imBack` action. For example, options such as *Show overdue tasks* or *Create a new work item* let users send common responses without typing them.
- [**Share prefilled response**](#share-prefilled-response): Prepares a rich, prewritten content in the compose box for users to review, edit, and send using the `Action.Compose` action. For example, a scheduling assistant can prepare a follow-up message with an @mention and proposed next steps, allowing the user to adjust the content before posting it.
- [**Trigger user action**](#trigger-user-action): Offers a user options that can start an action without posting a message using `Action.Submit` action. For example, an approval agent can present *Approve* and *Reject* options and process the selected decision on the server.

Implement each suggested action by first confirming the intended user outcome, then validating its behavior in the supported conversation scopes, and finally adding the corresponding payload and handler.
Here are some examples that show how to implement and experience suggested actions using `imBack`, `Action.Compose`, and `Action.Submit`.

> [!NOTE]
> Suggested actions aren't supported in messages with attachments. Test each supported scope for visibility and persistence.

### Send predefined message

A predefined message gives users a ready-to-send response that they can select to continue a conversation. You can enable this behavior with the `imBack` action by adding suggested actions to activity.`suggestedActions`. Each action includes a title displayed to the user and a predefined value. When the user selects an action, its value is posted to the conversation as a visible user message and can be processed like other user input.

<!--
Bot FW reference
To add the `imBack` suggested action to a message, specify a list of [card action](/azure/bot-service/rest-api/bot-framework-rest-connector-api-reference) objects that represent the buttons to be displayed to the user for the [`suggestedActions`](/dotnet/api/microsoft.bot.builder.messagefactory.suggestedactions) property of the [activity](/azure/bot-service/rest-api/bot-framework-rest-connector-api-reference) object.
-->

#### Teams SDK implementation

::: zone pivot="csharp"

> [!NOTE]
> Microsoft Teams SDK for C# does not currently support `imBack` suggested actions.

::: zone-end

::: zone pivot="typescript"

```typescript
finalMarker.withSuggestedActions({
  to: [recipientId],
  actions: followUps.map((prompt) => ({ type: 'imBack', title: 'See more information', value: 'See more information' })),
});
```

This snippet displays follow-up prompts as suggested action buttons. For each prompt, it creates a suggested action object.

- `title`: prompt controls what the user sees as the clickable option.
- `value`: prompt controls what gets sent back when the user clicks it.
- `type`: determines the action type. `imBack` means the clicked suggestion is sent back to the agent as a user message.
- `to: [recipientId]`: targets the suggested actions to the intended recipient.

`finalMarker.withSuggestedActions()` adds suggested action buttons to the `finalMarker` message. The `to: [recipientId]` value targets the actions to a specific user, while `followUps.map()` converts each generated prompt into an `imBack` action. Each button displays the prompt as its title and sends the same prompt back as its `value`, allowing the agent or app to continue the conversation from the selected option.

::: zone-end

::: zone pivot="python"

```python
reply.with_suggested_actions(
    SuggestedActions(to=[ctx.activity.from_.id], actions=[CardAction(type=CardActionType.IM_BACK, title="Tell me more", value="Tell me more")]))
)
```

This code snippet example adds the suggested actions as buttons to the Teams reply so the user can select them.

- `reply.with_suggested_actions()` adds suggested action buttons to the agent's response.
- `SuggestedActions()` wraps the list of follow-up buttons in the format expected by Microsoft Teams.
- `to=[ctx.activity.from_.id]` targets the suggested actions to the user who sent the original message.
- `actions=follow_ups` uses the two `CardAction` objects generated by the first code snippet example.

::: zone-end

#### `imBack` JSON example

The following is a JSON example to implement suggested actions using `imBack`:

In this example, `imBack` offers two context-specific next steps for the day’s planned tasks: *Create a new query identifying overdue tasks* and *Create a new work item for this feature*. Selecting either option sends its value back to the agent or app, which then continues with the corresponding action.

``` json
{
  "type": "message",
  "from": {
    "id": "12345678",
    "name": "sender's name"
  },
  "conversation": {
    "id": "abcd1234",
    "name": "conversation's name"
  },
  "recipient": {
    "id": "1234abcd",
    "name": "recipient's name"
  },
  "text": "What are the tasks for the day.",
  "inputHint": "expectingInput",
  "suggestedActions": {
    "actions": [
      {
        "type": "imBack",
        "title": "Create a new query identifying overdue tasks",
        "value": "Create a new query identifying overdue tasks"
      },
      {
        "type": "imBack",
        "title": "Create a new work item for this feature",
        "value": "Create a new work item for this feature"
      }
    ]
  },
  "replyToId": "5d5cdc723"
}
```

This example shows how to attach `suggestedActions` to the agent message and set `inputHint` to `expectingInput` to prompt a user response. The `actions` array defines the available choices, each using `imBack` with a button `title` and a returned `value`. When selected, the value is sent back to the agent or app as the user response, enabling it to route the conversation to the appropriate intent or operation.

### Share prefilled response

This suggested action places prewritten content in the compose box for the user to review, edit, and send. You can enable this experience with `Action.Compose` by returning an action that contains a Teams `chatMessage` payload. The payload can include formatted text, @mentions, tags, emojis, GIFs, and other supported rich content.

Before using `Action.Compose`, verify that the conversation channel and host support it; unsupported hosts display an error.

::: zone pivot="csharp"

```csharp
teams.OnMessage(async (context, cancellationToken) =>
{
    // ActionType takes any raw type string, so Action.Compose needs no workaround.
    var action = new CardAction(new CardActionType("Action.Compose"))
    {
        Title = "Notify me now",
        Value = new
        {
            type = "Teams.chatMessage",
            data = new { body = new { contentType = "text", content = "notify" } }
        }
    };

    await context.Send(
        new MessageActivity("Pick a suggestion:")
            .WithSuggestedActions(new SuggestedActions { Actions = { action } }),
        cancellationToken);
});
```

This example show how when each time a message is received, the handler builds a custom card action and sends it back to the user as a suggested action.

- `teams.OnMessage` registers a callback that runs whenever the app receives a message. The callback is asynchronous because it sends a response using `await`.
- `CardActionType("Action.Compose")` supplies the raw action type string.
- `Title` sets the visible label to *Notify me now*. `Value` defines the data submitted when the user selects it, including a text chat message whose content is *notify*.
- `MessageActivity` creates the prompt *Pick a suggestion:*, and `WithSuggestedActions` attaches the action so it appears as a selectable option.
- The supplied `cancellationToken` lets the send operation stop cleanly if the request is cancelled.

The user sees a prompt with a *Notify me now* option. Selecting it submits the configured Teams chat-message payload for the app to process.

::: zone-end

::: zone pivot="typescript"

```typescript
app.on("message", async ({ send }) => {
  // The SDK's CardActionType union does not model Action.Compose, hence the cast.
  const action = {
    type: "Action.Compose",
    title: "Notify me now",
    value: {
      type: "Teams.chatMessage",
      data: { body: { contentType: "text", content: "notify" } },
    },
  } as unknown as CardAction;

  await send(
    new MessageActivityInput("Pick a suggestion:").withSuggestedActions({
      to: [],
      actions: [action],
    })
  );
});
```

This example demonstrates that when a message arrives, it creates a custom suggested action and sends a prompt containing that action back to the user.

- `app.on("message", ...)` registers a callback that runs whenever the app receives a message. The callback is asynchronous because it waits for the response to be sent.
- The action object defines an `Action.Compose` button titled “Notify me now.”
- The `value` property describes a Teams chat message with plain-text content set to “notify.” This payload is submitted when the user selects the action.
- `MessageActivityInput` creates the prompt “Pick a suggestion:”, while `withSuggestedActions` attaches the action. The empty to array leaves recipient targeting unspecified for this response.
- `await send(...)` sends the completed activity and waits for the operation to finish.

The user receives a prompt with a *Notify me now* option. Selecting it submits the configured Teams chat-message payload for the app to process.

::: zone-end

::: zone pivot="python"

```python
if "Action.Compose" not in CardActionType._value2member_map_:
    _compose = str.__new__(CardActionType, "Action.Compose")
    _compose._name_, _compose._value_ = "COMPOSE", "Action.Compose"
    CardActionType._value2member_map_["Action.Compose"] = _compose


@app.on_message
async def handle_message(ctx: ActivityContext[MessageActivity]) -> None:
    action = CardAction(
        type=CardActionType("Action.Compose"),
        title="Notify me now",
        value={
            "type": "Teams.chatMessage",
            "data": {"body": {"contentType": "text", "content": "notify"}},
        },
    )

    await ctx.send(
        MessageActivityInput(text="Pick a suggestion:").with_suggested_actions(
            SuggestedActions(to=[], actions=[action])
        )
    )
```

This examples show how to register a message handler that sends a custom suggested action to the user:

- `CardAction` creates an `Action.Compose` option titled *Notify me now*.
- The `value` dictionary defines a Teams chat message with plain-text content set to “notify.” This data is submitted when the user selects the action.
- `MessageActivityInput` creates the prompt `Pick a suggestion:`, and `with_suggested_actions` attaches the custom action. The empty to list leaves recipient targeting unspecified for the response.
- `await ctx.send(...)` sends the completed activity and waits for the operation to finish.

::: zone-end

The following code snippet shows an example of implementing `Action.Compose`:

```json
{
  "type": "Action.Compose",
  "title": "button title",
  "value": {
      "type": "Teams.chatMessage",
      "data": "<GraphAPI Chat Message Object>"
  }
}
```

The value object must follow the [`chatMessage`](/graph/api/resources/chatmessage?view=graph-rest-1.0&preserve-view=true) object in the Graph API.

### Trigger user action

This action lets a user select an option to trigger an action without posting a user-visible chat message. Use `Action.Submit` for adding suggested action buttons that trigger server-side logic. Set `value` to a structured payload that identifies the action and provides any required data. When the user selects the button, Teams sends an invoke activity named `suggestedActions/submit`, with the payload in `activity.value`. Handle that invoke in the agent or app, validate the payload, run the action, and return the expected invoke response.

Payload (outgoing from agent or app):

```json

{
  "suggestedActions": {
    "actions": [{
      "type": "Action.Submit",
      "title": "Approve",
      "value": {
        "vote": "approve"
      }
    }]
  }
}
```

> [!NOTE]
> The `value` is an object (not a string) that carries the data.

Handler (incoming to agent or app):

The agent or app receives a standard invoke activity:

```typescript
case "suggestedActions/submit":
  const vote = context.activity.value;  // { vote: "approve" }
  // Process the action...
  return { status: 200 };
```

The agent or app can dispatch on `activity.name` and read the structured payload from `activity.value`. This matches how agents and apps handle other named invokes, such as `adaptiveCard/action` and `handoff/action`.

#### Teams SDK implementation

Use the following Teams SDK snippets for creating and handling `Action.Submit` suggested actions.

> [!NOTE]
> The `Action.Submit` APIs are currently marked as experimental in Teams SDK.

::: zone pivot="csharp"

```csharp
teamsApp.OnSuggestedActionSubmit(async (context, cancellationToken) =>
{
    var command = context.Activity.Value is JsonElement value && value.TryGetProperty("command", out var cmd)
        ? cmd.GetString()
        : null;

    if (command == "greet")
    {
        await context.Send("Hello! 👋");
    }
    else
    {
        await context.Send("Unknown command.");
    }
});
```

::: zone-end

::: zone pivot="typescript"

```typescript
app.on('suggested-action.submit', async ({ activity, send }) => {
    const command = activity.value?.command;

    if (command === 'greet') {
        await send('Hello! 👋');
    } else {
        await send('Unknown command.');
    }
});
```

::: zone-end

::: zone pivot="python"

```python
@app.on_suggested_action_submit
async def handle_suggested_action_submit(ctx: ActivityContext[SuggestedActionSubmitInvokeActivity]) -> None:
    command = ctx.activity.value.get("command") if isinstance(ctx.activity.value, dict) else None

    if command == "greet":
        await ctx.send("Hello! 👋")
    else:
        await ctx.send("Unknown command.")
```

::: zone-end

## Best practices and design guidance

Your agent or app should offer context-specific suggestions to the user, rather than generic or fixed ones. Keep actions short, specific, and task-oriented. Prefer clear, one-step labels that describe the outcome, such as *Create task* instead of *Submit*. Repeat an action only when it remains relevant.

Use suggested actions when an agent needs explicit user approval before taking a consequential or visibility-changing step, such as reposting a private targeted message to a public channel. Present clear choices (such as Allow, Share, Edit, or Dismiss) and proceed only after the user confirms, keeping the approval interaction private until then.

Avoid repeating actions that are already available in the response or card unless it is the primary next step for the user.

## Code sample

| Sample name | Description | .NET | TypeScript | Python |
| --- | --- | --- | --- | --- |
| Agent Targeted Messages | This sample demonstrates how to use targeted messaging in Microsoft Teams. Targeted messages are private messages that appear in a channel or group chat but are only visible to a specific user. The sample implements a reminder agent where all agent responses — confirmations, reminder deliveries, active reminder lists, and snooze confirmations — are sent as targeted messages. | [View](https://github.com/OfficeDev/Microsoft-Teams-Samples/tree/main/samples/TeamsSDK/agent-targeted-messages/dotnet/agent-targeted-messages) | [View](https://github.com/OfficeDev/Microsoft-Teams-Samples/tree/main/samples/TeamsSDK/agent-targeted-messages/nodejs/agent-targeted-messages) | [View](https://github.com/OfficeDev/Microsoft-Teams-Samples/tree/main/samples/TeamsSDK/agent-targeted-messages/python/agent-targeted-messages) |

## See also

- [Create prompt starters](prompt-starters.md)
- [Build bots for Teams](../../overview.md)
- [Messages in bot conversations](../../build-conversational-capability.md)
- [Adaptive Cards for bot developers](/adaptive-cards/getting-started/bots)
