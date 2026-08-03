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

Suggested actions are useful for requesting user approval or input, guiding users through multi-step workflows, and surfacing agent functionality in the flow of a conversation. The buttons can be configured to send a predetermined chat response on the user's behalf or trigger server-side logic without posting a chat message.

Agents can dynamically provide up to three suggested action buttons with each chat message they send.

To help users start a conversation, see [Create prompt starters](prompt-starters.md).

## User experience

When a user selects a button, it remains visible and accessible on rich cards. Suggested actions are supported in personal chats, group chats, and channels.

# [Personal chat](#tab/pc)

:::image type="content" source="../../../assets/images/agents-in-teams/suggested-actions/im-back-personal.png" alt-text="Suggested actions displayed in a personal chat on a desktop client." border="false" lightbox="../../../assets/images/agents-in-teams/suggested-actions/im-back-personal.png":::

# [Group chat](#tab/gc)

:::image type="content" source="../../../assets/images/agents-in-teams/suggested-actions/im-back-group.png" alt-text="Suggested actions displayed in a group chat on a desktop client." border="false" lightbox="../../../assets/images/agents-in-teams/suggested-actions/im-back-group.png":::

# [Channel](#tab/channel)

:::image type="content" source="../../../assets/images/agents-in-teams/suggested-actions/im-back-channel.png" alt-text="Suggested actions displayed in a channel on a desktop client." border="false" lightbox="../../../assets/images/agents-in-teams/suggested-actions/im-back-channel.png":::

---

## Implement suggested actions

Suggested action types define how a user’s selection is handled. You can use suggested actions buttons to present context-specific next steps to post a message to chat, to use prefilled response to draft a message, and to trigger a user action. You can build the following suggested actions in your agent or app:

**Send predefined message**: Use `imBack` when the selected option should be sent back to the agent or app as a visible user message. Add card actions to the `activity.suggestedActions` collection, and set each action type to `imBack` with a title and value. For example, an agent can present options such as *Show overdue tasks* or *Create a new work item*, and the selected option appears in the conversation.

**Send prefilled response**: Use `Action.Compose` when the agent or app should prefill the compose box so the user can review, edit, and send the message. Return an `Action.Compose` action with a Teams `chatMessage` payload that can include formatted text, @mentions, tags, emojis, GIFs, or other supported rich content. For example, a scheduling assistant can draft a follow-up message with an @mention and proposed next steps, giving the user a chance to adjust it before posting.

**Trigger user action**: Use `Action.Submit` when the selected option should trigger server-side logic without posting a user-visible chat message. For example, an approval agent can offer Approve and Reject buttons for a slash-command response and process the decision silently on the server.

Implement each suggested action by first confirming the intended user outcome, then validating its behavior in the supported conversation scopes, and finally adding the corresponding payload and handler.
Here are some examples that show how to implement and experience suggested actions using `imBack`, `Action.Compose`, and `Action.Submit`:

### Send predefined message

To add the `imBack` suggested action to a message, specify a list of [card action](/azure/bot-service/rest-api/bot-framework-rest-connector-api-reference) objects that represent the buttons to be displayed to the user for the [`suggestedActions`](/dotnet/api/microsoft.bot.builder.messagefactory.suggestedactions) property of the [activity](/azure/bot-service/rest-api/bot-framework-rest-connector-api-reference) object.

#### Teams SDK implementation

Use the following Teams SDK snippets for creating and handling `imBack` suggested actions.

> [!NOTE]
> Microsoft Teams SDK for C# does not currently support `imBack` suggested actions.

::: zone pivot="typescript"

```typescript
const FOLLOW_UPS_PROMPT =
  'Produce 2 specific prompts the user might want to ask next, based on the conversation so far. ' +
  'Each must be phrased in the first person and stay under 8 words.';

const FOLLOW_UPS_SCHEMA = {
  type: 'object',
  properties: { prompt1: { type: 'string' }, prompt2: { type: 'string' } },
  required: ['prompt1', 'prompt2'],
  additionalProperties: false,
} as const;

async function generateFollowUps(history: ChatCompletionMessageParam[]): Promise<string[]> {
  try {
    const completion = await client.chat.completions.create({
      model: deployment,
      messages: [...history, { role: 'system', content: FOLLOW_UPS_PROMPT }],
      response_format: {
        type: 'json_schema',
        json_schema: { name: 'follow_ups', strict: true, schema: FOLLOW_UPS_SCHEMA },
      },
    });
    const parsed = JSON.parse(completion.choices[0]?.message?.content ?? '{}');
    return [parsed.prompt1, parsed.prompt2].filter((s): s is string => typeof s === 'string' && s.length > 0);
  } catch {
    return []; // degrade silently — the main reply still ships
  }
}
```

This code snippet example generates two follow-up suggested actions from conversation context.

- It defines `FOLLOW_UPS_PROMPT`, which instructs the model to create two short prompts.
- It defines `FOLLOW_UPS_SCHEMA`, which forces the model response to contain `prompt1` and `prompt2`.
- It uses `generateFollowUps(history)` to return prompts as a `string[]`.

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

import json

from microsoft_teams.api import CardAction, CardActionType, SuggestedActions

_FOLLOW_UPS_PROMPT = (
    "Based on the conversation so far, suggest exactly 2 short follow-up questions the user might want to ask next. "
    'Respond with JSON: {"followUps": ["question 1", "question 2"]}. Keep each question under 60 characters.'
)

async def _generate_follow_ups(last_user_text: str, last_ai_text: str) -> list[CardAction]:
    completion = await openai_client.chat.completions.create(
        model=getenv("AZURE_OPENAI_MODEL", ""),
        messages=[
            {"role": "user", "content": last_user_text},
            {"role": "assistant", "content": last_ai_text},
            {"role": "system", "content": _FOLLOW_UPS_PROMPT},
        ],
        response_format=_FOLLOW_UPS_SCHEMA,  # strict json_schema
    )
    data = json.loads(completion.choices[0].message.content or "{}")
    return [CardAction(type=CardActionType.IM_BACK, title=q, value=q) for q in data.get("followUps", [])[:2]]
```

This code snippet example generates two follow-up suggested actions from conversation context. It creates the follow-up question buttons for those actions:

- `_FOLLOW_UPS_PROMPT` instructs the model to suggest two concise follow-up questions.
- `_generate_follow_ups` accepts the last user message and last assistant message.
- `CardActionType.IM_BACK` is used to convert each suggestion into a `CardAction` that lets the user send the selected question back into the chat.

```python
reply.with_suggested_actions(
    SuggestedActions(to=[ctx.activity.from_.id], actions=follow_ups)
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

### Send prefilled response

Use `Action.Compose` to prefill the compose box with a message that the user can review, edit, and send. The chatMessage payload can include formatted text, @mentions, tags, emojis, GIFs, and other supported rich content.

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

Use `Action.Submit` for adding suggested action buttons that trigger server-side logic without posting a user-visible chat message. Set `value` to a structured payload that identifies the action and provides any required data. When the user selects the button, Teams sends an invoke activity named `suggestedActions/submit`, with the payload in `activity.value`. Handle that invoke in the agent or app, validate the payload, run the action, and return the expected invoke response.

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

### Teams SDK implementation

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

Suggested actions behavior varies by conversation scope. Selected actions on rich cards remain visible in group chats and channels, while personal chats show smart replies only from the latest message.

Teams displays and processes up to three suggested actions. They are not supported in messages with attachments. Test each supported scope for visibility and persistence.

Before returning `Action.Compose`, verify that the conversation channel and host support it; unsupported hosts display an error.

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
