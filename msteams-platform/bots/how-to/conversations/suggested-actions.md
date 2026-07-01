---
title: Dynamically Guide Users with Suggested Actions
description: Learn how to create and handle suggested actions for your Microsoft Teams bot to help users continue conversations.
ms.topic: how-to
ms.localizationpriority: medium
zone_pivot_groups: teams-sdk-languages
ms.date: 6/26/2026
---

# Dynamically guide users with suggested actions

Suggested actions are buttons that agents can present to users in chat to provide them with quick, context-sensitive options for responding, confirming, or taking action.

:::image type="content" source="~/assets/images/Cards/suggested-actions.png" alt-text="Bot suggested actions." border="false" lightbox="~/assets/images/Cards/suggested-actions.png":::

Unlike prompt starters, suggested actions can be dynamically generated for each message an agent sends, enabling it to provide actions that fit the context of the conversation.

Suggested actions can be dynamically generated Suggested actions can be generated and placed dynamically during a conversation, meaning that you can use your bot’s large language model (LLM) to generate them along with a response during a conversation turn.

## User experience

Suggested actions help users with ideas of what to ask next, based on the previous response or conversation. Your agent or bot should offer context-specific suggestions to the user, rather than generic or fixed ones. You can use your agent's or bot’s large language model (LLM) to generate up to three suggestions along with its responses. Then, you can extract these suggestions and present them as options for the user to choose. You can build the following suggested actions in your agent or bot:

> [!IMPORTANT]
> The bot can parse up to three actions. Even if you include more than three actions, Teams displays only the first three.

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

Suggested actions are based on [card action types](../../../task-modules-and-cards/cards/cards-actions.md).

- `imBack`: Use `imBack` to add suggested actions, set `activity.suggestedActions` to a list of card actions (buttons) to show the user.
- `Action.Compose`: Use `Action.Compose` to prefill the compose box with a message (including tags, @mentions, and rich content like emojis, GIFs, and other semantic objects).
- `Action.Submit`: Use `Action.Submit` for suggested action buttons in agent responses for [slash commands](~/agents-in-teams/agent-slash-commands.md) that trigger server-side logic via an invoke activity (no user-visible chat message).

Here are some examples that show how to implement and experience suggested actions using `imBack`, `Action.Compose`, and `Action.Submit`:

# [`imBack`](#tab/iamback)

To add suggested actions to a message, specify a list of [card action](/azure/bot-service/rest-api/bot-framework-rest-connector-api-reference) objects that represent the buttons to be displayed to the user for the [`suggestedActions`](/dotnet/api/microsoft.bot.builder.messagefactory.suggestedactions) property of the [activity](/azure/bot-service/rest-api/bot-framework-rest-connector-api-reference) object.

The following is an example to implement suggested actions using `imBack`:

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

# [`Action.Compose`](#tab/actioncompose)

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

# [`Action.Submit`](#tab/actionsubmit)

Use `Action.Submit` for suggested action buttons that run server-side agent or bot logic without posting a user-visible message. When a user selects the button, Teams sends an invoke activity instead of a regular message activity. Include a structured payload in `value` so your app can route and process the action consistently through existing invoke handlers.

Use `Action.Submit` to add suggested action buttons to [agent responses to slash commands](~/agents-in-teams/agent-slash-commands.md), so users can choose a next step without disrupting the conversation.

This pattern is particularly useful for the targeted messages workflow where an agent asks whether a targeted message should be resent as public. For more information, see [Targeted messages in Teams](~/agents-in-teams/targeted-messages.md).

Bot payload (outgoing from bot):

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

Bot handler (incoming to bot):

The agent or bot receives a standard Bot invoke activity:

```json

case "suggestedAction/submit":
  const vote = context.activity.value;  // { vote: "approve" }
  // Process the action...
  return { status: 200 };
```

The agent or bot can dispatch on `activity.name` and read the structured payload from `activity.value`. This matches how agents and bots handle other named invokes, such as `adaptiveCard/action` and `handoff/action`.

## Teams SDK implementation

Use the page pivot to view Teams SDK snippets for creating and handling `Action.Submit` suggested actions.

> [!NOTE]
> The `Action.Submit` APIs are currently marked as experimental in Teams SDK.

::: zone pivot="teams-sdk-csharp"

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

::: zone pivot="teams-sdk-typescript"

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

::: zone pivot="teams-sdk-python"

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

---

## See also

- [Create prompt starters](prompt-starters.md)
- [Build bots for Teams](~/bots/what-are-bots.md)
- [Messages in bot conversations](~/bots/how-to/conversations/conversation-messages.md)
- [Adaptive Cards for bot developers](/adaptive-cards/getting-started/bots)
