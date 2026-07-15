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

Suggested actions help users continue conversations with your agent by presenting context-specific next steps in the chat.

:::image type="content" source="~/assets/images/Cards/suggested-actions.png" alt-text="Bot suggested actions." border="false" lightbox="~/assets/images/Cards/suggested-actions.png":::

For guidance on commands that help users start a conversation, see [Create prompt starters](prompt-starters.md).

## Supported suggested actions

Suggested actions help users with ideas of what to ask next, based on the previous response or conversation.
Use suggested actions when the agent or app has the conversational context to recommend the next few intents after a response, such as refining a search, creating a task, choosing a status, or continuing a guided workflow.

You can build the following suggested actions in your agent or app:

### imBack

Use `imBack` when the selected option should be sent back to the agent or app as a visible user message. Add card actions to the `activity.suggestedActions` collection, and set each action type to `imBack` with a title and value. For example, an agent can present options such as *Show overdue tasks* or *Create a new work item*, and the selected option appears in the conversation.

### Action.Compose

Use `Action.Compose` when the app should prefill the compose box so the user can review, edit, and send the message. Return an `Action.Compose` action with a Teams `chatMessage` payload that can include formatted text, @mentions, tags, emojis, GIFs, or other supported rich content. For example, a scheduling assistant can draft a follow-up message with an @mention and proposed next steps, giving the user a chance to adjust it before posting.

### Action.Submit

Use `Action.Submit` when the selected option should trigger server-side logic without posting a user-visible chat message. Return an `Action.Submit` action with a structured value object, then handle the `suggestedAction/submit` invoke activity in the agent or app. For example, an approval agent can offer Approve and Reject buttons for a slash-command response and process the decision silently on the server.

> [!IMPORTANT]
> The agent or app can parse up to three actions. Even if you include more than three actions, Teams displays only the first three.

#### Approval workflow using `Action.Submit`

Before implementing approval workflow using `Action.Submit`, ensure your agent or app supports [targeted messaging](../../../agents-in-teams/targeted-messages.md) in Teams and runs in a channel, group chat, or meeting chat. If responses should remain private until approved for sharing, save the original targeted message ID, as it is required later to attach prompt preview metadata to the private or public reply.

This workflow progresses as follows:

1. Capture the request privately. When a user invokes the agent with a slash command or @mention, treat it as a targeted message visible only to the user and the agent.
1. Reply privately first. Send the initial agent response only to the requesting user.
1. Include the prompt preview. Show the original request above the response so the prompt and answer stay together. Attach it automatically for reactive replies, or manually for proactive replies using the original targeted message ID.
1. Ask for approval. Add suggested actions such as Allow, Share to channel, Edit prompt, or Dismiss so the user can choose the next step.
1. Share publicly only if approved. If the user approves, repost the response in the conversation with the prompt preview. If not, keep the exchange private.

## User experience

When a user selects a button, it remains visible and accessible on the rich cards. Suggested actions are supported in all scopes:

- `personal`: In one-on-one chats, actions are shown as smart replies, so only the actions from the last message appear.
- `team` and `groupChat`: In group chats and channels, actions are always saved with the message.

# [Personal chat](#tab/pc)

:::image type="content" source="~/assets/images/bots/suggested-action-personal-chat.png" alt-text="Image shows suggested actions in a personal chat in a desktop client." border="false" lightbox="~/assets/images/bots/suggested-action-personal-chat.png":::

# [Group chat](#tab/gc)

:::image type="content" source="~/assets/images/bots/suggested-action-gc.png" alt-text="Image shows suggested actions in a group chat in a desktop client." border="false" lightbox="~/assets/images/bots/suggested-action-gc.png":::

# [Channel](#tab/channel)

:::image type="content" source="~/assets/images/bots/suggested-action-channel.png" alt-text="Image shows suggested actions in a channel in a desktop client." border="false" lightbox="~/assets/images/bots/suggested-action-channel.png":::

---

> [!NOTE]
>
> `SuggestedActions` aren't supported for chat bots with attachments for any conversation type.

## Implement suggested actions

Your agent or app should offer context-specific suggestions to the user, rather than generic or fixed ones. You can use your agent's or bot’s large language model (LLM) to generate up to three suggestions along with its responses. Then, you can extract these suggestions and present them as options for the user to choose.

Here are some examples that show how to implement and experience suggested actions using `imBack`, `Action.Compose`, and `Action.Submit`:

### Add `imBack` action

To add the `imBack` suggested action to a message, specify a list of [card action](/azure/bot-service/rest-api/bot-framework-rest-connector-api-reference) objects that represent the buttons to be displayed to the user for the [`suggestedActions`](/dotnet/api/microsoft.bot.builder.messagefactory.suggestedactions) property of the [activity](/azure/bot-service/rest-api/bot-framework-rest-connector-api-reference) object.

Attach a `suggestedActions` object to the agent's message, and ensure that `inputHint` is set to `expectingInput`. This tells the agent or app that a user response is expected. The `actions` array defines one or more choices shown to the user. Each suggested action includes `imBack` as the `type`, which defines the action behavior; a`title`, which is the label displayed on the button; and a`value`, which is sent back to the bot when the user selects the option. The option selected by the user is sent back to the agent or app with `imBack` as the user response. The agent or app can then use the returned value to continue the conversation by routing the response to the correct intent or operation.

The following is a JSON example to implement suggested actions using `imBack`:

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

In this example, `imBack` is used to offer two suggested actions to the user - *Create a new query identifying overdue tasks* and *Create a new work item for this feature*. These actions are offered in response for the conversation context of tasks planned for the current day. The agent or app would then receive user's input and continue the conversation according to the option they selected such as creating a new query to identify overdue tasks or creating a new work item for a feature.

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

```typescript
finalMarker.withSuggestedActions({
  to: [recipientId],
  actions: followUps.map((prompt) => ({ type: 'imBack', title: prompt, value: prompt })),
});
```

The `finalMarker.withSuggestedActions()` method adds suggested action buttons to the `finalMarker` message. The `to: [recipientId]` property specifies the user who should see these actions. The `followUps.map()` function goes through each item in the `followUps` list and creates a suggested action button for it. Each button uses `type: 'imBack'`, which sends the button’s value back to the agent or bot as though the user typed it. The `value` property contains the text that is sent, while `title: prompt` defines the label displayed on the button.

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
    return [CardAction(type=CardActionType.IM_BACK, title=q, value=q) for q in data.get["followUps", []](:2)]
```

```python
reply.with_suggested_actions(
    SuggestedActions(to=[ctx.activity.from_.id], actions=follow_ups)
)
```

This example demonstrates how to attach suggested actions to an existing reply message in a conversation. It
adds follow-up suggestion buttons to the reply message. It sends those buttons to the current user using their activity ID, and the follow_ups list provides the actions that will appear as clickable options.

::: zone-end

### Add `Action.Compose` action

You can use the `Action.Compose` to insert a message in the compose box, which helps you add a new action type. This action enables you to include semantic objects like tags, mention users in the chat or channel, and other rich objects like emojis and gifs.

The following code snippet shows an example of implementing `Action.Compose`:

```json
{
  Type: “Action.Compose”,
  Title: “button title”,
  Value: {
      type: “Teams.chatMessage”,
      data: <GraphAPI Chat Message Object>
  }
}
```

The value object must follow the [`chatMessage`](/graph/api/resources/chatmessage?view=graph-rest-1.0&preserve-view=true) object in the Graph API.

For more information, see [code sample](https://github.com/OfficeDev/Microsoft-Teams-Samples/blob/35c8a5bab588974c1f082225bccd67b13a31741d/samples/bot-suggested-actions/nodejs/bots/suggestedActionsBot.js#L61).

> [!NOTE]
> If the message is received in a hub that doesn't support it, the app shows an error message. The bots are aware of the channel to which its posting.

### Add `Action.Submit` action

Use `Action.Submit` for suggested action buttons that run server-side agent or bot logic without posting a user-visible message. When a user selects the button, Teams sends an invoke activity instead of a regular message activity. Include a structured payload in `value` so your app can route and process the action consistently through existing invoke handlers.

Use `Action.Submit` to add suggested action buttons to [agent responses to slash commands](~/agents-in-teams/agent-slash-commands.md), so users can choose a next step without disrupting the conversation.

This pattern is particularly useful for the targeted messages workflow where an agent asks whether a targeted message should be resent as public. For more information, see [Targeted messages in Teams](~/agents-in-teams/targeted-messages.md).

Bot payload (outgoing from agent or bot):

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

Bot handler (incoming to agent or bot):

The agent or bot receives a standard Bot invoke activity:

```json

case "suggestedAction/submit":
  const vote = context.activity.value;  // { vote: "approve" }
  // Process the action...
  return { status: 200 };
```

[WIP: Check for Teams SDK code snippets.]

The agent or bot can dispatch on `activity.name` and read the structured payload from `activity.value`. This matches how agents and bots handle other named invokes, such as `adaptiveCard/action` and `handoff/action`.

### Teams SDK implementation

Use the page pivot to view Teams SDK snippets for creating and handling `Action.Submit` suggested actions.

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

### Implement approval workflow using `Action.Submit`

Use this workflow when your agent should reply privately first, keep the original user prompt visible with the response, and allow the user to decide whether to share the response publicly.

Use this workflow when your agent should reply privately first. Use prompt preview to show the user’s original request above the agent’s response in a targeted message. This keeps the prompt and answer connected while the exchange remains private.

1. **Capture the request**: Start when the user invokes the agent with a slash command or @mention in a channel, group chat, or meeting chat. Treat the request as a private targeted interaction by using `IsTargeted == true` in the message event.

1. **Store the original targeted message ID**: Store the original targeted message ID as soon as the request arrives. You need it to attach the preview later. The reply must include a `targetedMessageInfo` entity whose `messageId` points to the original targeted message.

1. **Send the first reply privately**: Send the first response only to the requesting user.

  :::zone pivot="csharp"

  ```C#
  app.OnMessage(async (context, cancellationToken) =>
  {
  await context.Send(
  new MessageActivity("This message is only visible to you!")
  .WithRecipient(context.Activity.From, isTargeted: true),
  cancellationToken
  );
  });

  ```

  :::zone-end

## Best practices and design guidance

Use suggested actions when the next step is predictable from the agent's or bot’s latest response and the user benefits from choosing an action instead of typing.

Keep suggestions short, specific, and task oriented. Limit the experience to the three most useful options, order them by likely user intent, and avoid repeating generic choices across turns unless the context still makes them relevant.

Use `imBack` when the user’s choice should become part of the conversation. Use `Action.Compose` when the user should review or personalize content before sending it. Use `Action.Submit` when the action should be handled privately by the agent or app.

Prefer one-step actions that users can understand without extra explanation.

Use action labels that describe the result, not the implementation, such as *Create task* instead of *Submit*.

Avoid duplicating actions already available in the response or in a card unless the action is the primary next step. For example, if a card already includes an **Approve** button, don't add Approve again as a suggested action unless it is the most important action for the user to take next.

Test the experience in personal chat, group chat, and channel scopes because persistence and visibility differ by scope.

## See also

- [Create prompt starters](prompt-starters.md)
- [Build bots for Teams](~/bots/what-are-bots.md)
- [Messages in bot conversations](~/bots/how-to/conversations/conversation-messages.md)
- [Adaptive Cards for bot developers](/adaptive-cards/getting-started/bots)
