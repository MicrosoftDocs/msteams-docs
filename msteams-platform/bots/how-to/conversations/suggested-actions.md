---
title: Dynamically Guide Users with Suggested Actions
description: Learn how to create and handle suggested actions for your Microsoft Teams agents and apps to help users continue conversations.
ms.topic: how-to
ms.localizationpriority: medium
zone_pivot_groups: select-language
ms.date: 07/15/2026
---

<!-- markdownlint-disable MD001 -->

# Dynamically guide users with suggested actions

Suggested actions present context-specific next steps after an agent or app response, so users can refine a request, continue a workflow, or make a choice with one selection. Use suggested actions when the next step depends on the current conversation.

:::image type="content" source="~/assets/images/Cards/suggested-actions.png" alt-text="Suggested action buttons displayed below a agent response in a Teams chat." border="false" lightbox="~/assets/images/Cards/suggested-actions.png":::

To help users start a conversation, see [Create prompt starters](prompt-starters.md).

## Understand suggested actions

Suggested actions give users ideas for what to ask next, based on the previous response or conversation.
Use suggested actions when the agent or app has the conversational context to recommend the next few intents after a response, such as refining a search, creating a task, choosing a status, or continuing a guided workflow.

You can build the following suggested actions in your agent or app:

- `imBack`: Use `imBack` when the selected option should be sent back to the agent or app as a visible user message. Add card actions to the `activity.suggestedActions` collection, and set each action type to `imBack` with a title and value. For example, an agent can present options such as *Show overdue tasks* or *Create a new work item*, and the selected option appears in the conversation.

- `Action.Compose`: Use `Action.Compose` when the app should prefill the compose box so the user can review, edit, and send the message. Return an `Action.Compose` action with a Teams `chatMessage` payload that can include formatted text, @mentions, tags, emojis, GIFs, or other supported rich content. For example, a scheduling assistant can draft a follow-up message with an @mention and proposed next steps, giving the user a chance to adjust it before posting.

- `Action.Submit`: Use `Action.Submit` when the selected option should trigger server-side logic without posting a user-visible chat message. Return an `Action.Submit` action with a structured value object, then handle the `suggestedAction/submit` invoke activity in the agent or app. For example, an approval agent can offer Approve and Reject buttons for a slash-command response and process the decision silently on the server.

### Guidance for approval workflow using `Action.Submit`

Before implementing approval workflow using `Action.Submit`, ensure your agent or app supports [targeted messaging](../../../agents-in-teams/targeted-messages.md) in Teams and runs in a channel, group chat, or meeting chat. The workflow has the following steps:

1. **Capture the request privately**. Treat a slash command or @mention as a targeted message visible only to the user and the agent.
1. **Reply privately**. Send the initial response only to the requesting user.
1. **Include the prompt preview**. Display the original request above the response. Teams adds it to reactive replies; for proactive replies, attach it using the original targeted message ID.
1. **Request approval**. Offer actions such as Allow, Share to channel, Edit prompt, or Dismiss.
1. **Publish** only if approved.

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

Your agent or app should offer context-specific suggestions to the user, rather than generic or fixed ones. Here are some examples that show how to implement and experience suggested actions using `imBack`, `Action.Compose`, and `Action.Submit`:

### Add `imBack` action

To add the `imBack` suggested action to a message, specify a list of [card action](/azure/bot-service/rest-api/bot-framework-rest-connector-api-reference) objects that represent the buttons to be displayed to the user for the [`suggestedActions`](/dotnet/api/microsoft.bot.builder.messagefactory.suggestedactions) property of the [activity](/azure/bot-service/rest-api/bot-framework-rest-connector-api-reference) object.

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

This code snippet example generates two follow-up suggested actions from conversation context. It uses the `followUps` array from `generateFollowUps(...)` and creates each prompt into a clickable suggested action for the user:

- It defines `FOLLOW_UPS_PROMPT`, which instructs the model to create two short prompts.
- It defines `FOLLOW_UPS_SCHEMA`, which forces the model response to contain `prompt1` and `prompt2`.
- It uses `generateFollowUps(history)` to return prompts as a `string[]`.

```typescript
finalMarker.withSuggestedActions({
  to: [recipientId],
  actions: followUps.map((prompt) => ({ type: 'imBack', title: prompt, value: prompt })),
});
```

This code snippet displays for the follow-up prompts as suggested action buttons for the user. For each prompt, it creates a suggested action object.

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

This code snippet example adds the suggested actions as buttons to the Teams reply so the user can click them.

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

The example shows how to attach `suggestedActions` to the agent message and set `inputHint` to `expectingInput` to prompt a user response. The `actions` array defines the available choices, each using `imBack` with a button `title` and a returned `value`. When selected, the value is sent back to the agent or app as the user response, enabling it to route the conversation to the appropriate intent or operation.

### Add `Action.Compose` action

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

For more information, see [code sample](https://github.com/OfficeDev/Microsoft-Teams-Samples/blob/35c8a5bab588974c1f082225bccd67b13a31741d/samples/bot-suggested-actions/nodejs/bots/suggestedActionsBot.js#L61).

### Add `Action.Submit` action

Use `Action.Submit` for suggested action buttons that run the agent's server-side logic without posting a user-visible message. When a user selects the button, Teams sends an invoke activity instead of a regular message activity. Include a structured payload in `value` so your app can route and process the action consistently through existing invoke handlers.

Use `Action.Submit` to add suggested action buttons to [agent responses to slash commands](~/agents-in-teams/agent-slash-commands.md), so users can choose a next step without disrupting the conversation.

This pattern is particularly useful for the targeted messages workflow where an agent asks whether a targeted message should be resent as public. For more information, see [Targeted messages in Teams](~/agents-in-teams/targeted-messages.md).

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
#pragma warning disable ExperimentalTeamsSuggestedAction
using System.Text.Json;
using Microsoft.Teams.Api;
using Microsoft.Teams.Api.Activities;
using CardAction = Microsoft.Teams.Api.Cards.Action;
using CardActionType = Microsoft.Teams.Api.Cards.ActionType;

var reply = new MessageActivity("Approve or reject the request:")
{
    SuggestedActions = new SuggestedActions
    {
        Actions =
        {
            new CardAction(CardActionType.Submit) { Title = "Approve", Value = new { vote = "approve" } },
            new CardAction(CardActionType.Submit) { Title = "Reject", Value = new { vote = "reject" } }
        }
    }
};

await context.Send(reply);

teams.OnSuggestedActionSubmit(async (ctx, cancellationToken) =>
{
    var payload = ctx.Activity.Value is JsonElement value
        ? value.GetRawText()
        : "<none>";
    await ctx.Send($"Got vote: {payload}", cancellationToken);
});
```

::: zone-end

::: zone pivot="typescript"

```typescript
import { MessageActivity, type SuggestedActions } from "@microsoft/teams.api";

const reply = new MessageActivity("Approve or reject the request:");
reply.suggestedActions = {
  to: [],
  actions: [
    { type: "Action.Submit", title: "Approve", value: { vote: "approve" } },
    { type: "Action.Submit", title: "Reject", value: { vote: "reject" } }
  ]
} satisfies SuggestedActions;

await send(reply);

app.on("suggested-action.submit", async ({ send, activity }) => {
  const payload = activity.value != null ? JSON.stringify(activity.value) : "<none>";
  await send(`Got vote: ${payload}`);
});
```

::: zone-end

::: zone pivot="python"

```python
import json
from microsoft_teams.api import MessageActivityInput
from microsoft_teams.api.models.card.card_action import CardAction
from microsoft_teams.api.models.card.card_action_type import CardActionType
from microsoft_teams.api.models.suggested_actions import SuggestedActions

reply = MessageActivityInput(text="Approve or reject the request:").with_suggested_actions(
    SuggestedActions(
        to=[],
        actions=[
            CardAction(type=CardActionType.SUBMIT, title="Approve", value={"vote": "approve"}),
            CardAction(type=CardActionType.SUBMIT, title="Reject", value={"vote": "reject"}),
        ],
    )
)

await ctx.send(reply)

@app.on_suggested_action_submit
async def handle_suggested_action_submit(ctx):
    payload = json.dumps(ctx.activity.value)
    await ctx.send(f"Got vote: {payload}")
```

::: zone-end

## Best practices and design guidance

Use suggested actions when the next step is predictable from the agent's or bot’s latest response and the user benefits from choosing an action instead of typing.

Keep suggestions short, specific, and task oriented. Avoid repeating generic choices across turns unless the context still makes them relevant. Prefer one-step actions that users can understand without extra explanation. Use action labels that describe the result, not the implementation, such as *Create task* instead of *Submit*.

Suggested actions behave differently depending on the conversation scope. When a user selects an action on a rich card, the action remains visible in group chats and channels. In personal chats, however, only the suggested actions from the most recent message are available as smart replies.

Teams displays and processes a maximum of three suggested actions, even if the agent or app sends more. Suggested actions aren't supported for messages that include attachments in any conversation type. Test the experience in each supported scope because action visibility and persistence vary.

Use `imBack` when the user’s choice should become part of the conversation. Use `Action.Compose` when the user should review or personalize content before sending it. Use `Action.Submit` when the action should be handled privately by the agent or app.

If a client or host doesn't support `Action.Compose`, the agent or app displays an error message. Before returning the action, identify the conversation channel and verify that the host supports the action type.

Avoid duplicating actions already available in the response or in a card unless the action is the primary next step. For example, if a card already includes an **Approve** button, don't add Approve again as a suggested action unless it is the most important action for the user to take next.

## See also

- [Create prompt starters](prompt-starters.md)
- [Build bots for Teams](~/bots/what-are-bots.md)
- [Messages in bot conversations](~/bots/how-to/conversations/conversation-messages.md)
- [Adaptive Cards for bot developers](/adaptive-cards/getting-started/bots)
