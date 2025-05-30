Suggested actions help users with ideas of what to ask next, based on the previous response or conversation. Your bot should offer context-specific suggestions to the user, rather than generic or fixed ones. You can use your bot’s large language model (LLM) to generate up to three suggestions along with its responses. Then, you can extract these suggestions and present them as options for the user to choose.

> [!IMPORTANT]
> The bot can parse up to three actions. Even if you include more than three actions, Teams displays only the first three.

When a user selects a button, it remains visible and accessible on the rich cards. Suggested actions are supported in all scopes:

- `personal`: In one-on-one chats, actions are shown as smart replies, so only the actions from the last message appear.
- `team` and `groupChat`: In group chats and channels, actions are always saved with the message.

# [Group chat](#tab/gc)

**Desktop**:

:::image type="content" source="../../assets/images/bots/suggested-action-gc.png" alt-text="Image shows suggested actions in a group chat in a desktop client." border="false" lightbox="../../assets/images/bots/suggested-action-gc.png":::

**Mobile**:

:::image type="content" source="../../assets/images/bots/suggested-action-gc-mobile-large.png" alt-text="Image shows suggested actions in a group chat in a mobile client." lightbox="../../assets/images/bots/suggested-action-gc-mobile-large.png":::

# [Channel](#tab/channel)

**Desktop**:

:::image type="content" source="../../assets/images/bots/suggested-action-channel.png" alt-text="Image shows suggested actions in a channel in a desktop client." border="false" lightbox="../../assets/images/bots/suggested-action-channel.png":::

**Mobile**:

:::image type="content" source="../../assets/images/bots/suggested-action-channel-mobile-large.png" alt-text="Image shows suggested actions in a channel in a mobile client." lightbox="../../assets/images/bots/suggested-action-channel-mobile-large.png":::

---

> [!NOTE]
>
> `SuggestedActions` aren't supported for chat bots with attachments for any conversation type.

Here are some examples that show how to implement and experience suggested actions using `imBack` and `Action.Compose`:

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

---

<!--
### `imBack`

To add suggested actions to a message, specify a list of [card action](/azure/bot-service/rest-api/bot-framework-rest-connector-api-reference) objects that represent the buttons to be displayed to the user for the [`suggestedActions`](/dotnet/api/microsoft.bot.builder.messagefactory.suggestedactions) property of the [activity](/azure/bot-service/rest-api/bot-framework-rest-connector-api-reference) object.

The following is an example to implement and experience suggested actions:

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

---

### `Action.Compose`

You can use the `Action.Compose` to insert a message in the compose box, which helps you add a new action type. This action enables you to include semantic objects like tags, mention users in the chat or channel, and other rich objects like emojis and gifs.

The value object must follow the [`chatMessage`](/graph/api/resources/chatmessage?view=graph-rest-1.0&preserve-view=true) object in the Graph API. The following code snippet shows an example of implementing `Action.Compose`:

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

A modified version for other hubs can be shown as this example:

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

It can show an error message, if unsupported. Bots are aware of the channel to which they post.

The following illustrates an example of `Actions.Compose` action:

# [Desktop](#tab/desktop)

:::image type="content" source="~/assets/images/Cards/actions-compose.png" alt-text="Screenshot that shows the Actions.Compose suggested action in desktop." lightbox="~/assets/images/Cards/suggested-actions.png":::

# [Mobile](#tab/mobile)

:::image type="content" source="../../assets/images/Cards/prompt-suggestion-mobile.png" alt-text="Screenshot shows the Actions.Compose suggested action in mobile."lightbox="../../assets/images/Cards/prompt-suggestion-mobile - large.png":::

---

> [!NOTE]
> If the message is received in a hub that doesn't support it, the app shows an error message. The bots are aware of the channel to which its posting.
-->