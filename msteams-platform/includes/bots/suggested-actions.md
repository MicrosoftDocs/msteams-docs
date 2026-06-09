Suggested actions help users with ideas of what to ask next, based on the previous response or conversation. Your agent or bot should offer context-specific suggestions to the user, rather than generic or fixed ones. You can use your agent's or bot’s large language model (LLM) to generate up to three suggestions along with its responses. Then, you can extract these suggestions and present them as options for the user to choose. You can build the following suggested actions in your agent or bot:

- `imBack`: Use `imBack` to add suggested actions, set `activity.suggestedActions` to a list of card actions (buttons) to show the user.
- `Action.Compose`: Use `Action.Compose` to prefill the compose box with a message (including tags, @mentions, and rich content like emojis, GIFs, and other semantic objects).
- `Action.Submit`: Use `Action.Submit` for suggested action buttons in agent responses for [slash commands](../../agents-in-teams/agent-slash-commands.md) that trigger server-side logic via an invoke activity (no user-visible chat message).

> [!IMPORTANT]
> The bot can parse up to three actions. Even if you include more than three actions, Teams displays only the first three.

When a user selects a button, it remains visible and accessible on the rich cards. Suggested actions are supported in all scopes:

- `personal`: In one-on-one chats, actions are shown as smart replies, so only the actions from the last message appear.
- `team` and `groupChat`: In group chats and channels, actions are always saved with the message.

# [Personal chat](#tab/pc)

:::image type="content" source="../../assets/images/bots/suggested-action-personal-chat.png" alt-text="Image shows suggested actions in a personal chat in a desktop client." border="false" lightbox="../../assets/images/bots/suggested-action-personal-chat.png":::

# [Group chat](#tab/gc)

:::image type="content" source="../../assets/images/bots/suggested-action-gc.png" alt-text="Image shows suggested actions in a group chat in a desktop client." border="false" lightbox="../../assets/images/bots/suggested-action-gc.png":::

# [Channel](#tab/channel)

:::image type="content" source="../../assets/images/bots/suggested-action-channel.png" alt-text="Image shows suggested actions in a channel in a desktop client." border="false" lightbox="../../assets/images/bots/suggested-action-channel.png":::

---

> [!NOTE]
>
> `SuggestedActions` aren't supported for chat bots with attachments for any conversation type.

Here are some examples that show how to implement and experience suggested actions using `imBack`, `Action.Compose`, and `Action.Submit`:

# [`imBack`](#tab/iamback)

To add suggested actions to a message, specify a list of [card action](https://github.com/microsoft/teams.ts/blob/main/packages/api/src/models/card/card-action.ts) objects that represent the buttons to be displayed to the user for the [`suggestedActions`](https://github.com/microsoft/teams.ts/blob/main/packages/api/src/models/suggested-actions.ts) property of the [activity](https://github.com/microsoft/teams.ts/blob/main/packages/api/src/activities/activity.ts) object.

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
  "type": "Action.Compose",
  "title": "button title",
  "value": {
    "type": "Teams.chatMessage",
    "data": {
      "body": {
        "contentType": "html",
        "content": "Hello from Action.Compose"
      }
    }
  }
}
```

The `value.data` object must follow the Microsoft Graph [`chatMessage`](/graph/api/resources/chatmessage?view=graph-rest-1.0&preserve-view=true) schema. Use that reference to add supported message content such as mentions, tags, emojis, gifs, and other rich objects.

> [!NOTE]
> If the message is received in a hub that doesn't support it, the app shows an error message. The bots are aware of the channel to which its posting.

# [`Action.Submit`](#tab/actionsubmit)

Use `Action.Submit` for quick-action (suggested action) buttons that run server-side bot logic without posting a user-visible chat message. The button looks like any other suggested action, but when clicked it sends an invoke activity to your agent or bot, instead of a normal message activity. Include a structured `name` and `value` payload so you can route and dispatch based on the invoke `name` and pass contextual data through your existing invoke pipeline, that includes card invoke and handoff flows, without changing the conversation transcript.

Use `Action.Submit` to add suggested action buttons to [agent responses to slash commands](../../agents-in-teams/agent-slash-commands.md), so users can choose a next step without disrupting the conversation.

**Bot Payload (Outgoing from Bot)**

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

**Bot Handler (Incoming to Bot)**

The agent or bot receives a standard Bot Framework invoke activity:

```json

// In TeamsActivityHandler.onInvokeActivity():
case "suggestedAction/submit":
  const vote = context.activity.value;  // { vote: "approve" }
  // Process the action...
  return { status: 200 };
```

The agent or bot dispatches on `activity.name` and reads the structured payload from `activity.value`. This is identical to how agents or bots handle `adaptiveCard/action`, `handoff/action`, or any other named invoke.

---
