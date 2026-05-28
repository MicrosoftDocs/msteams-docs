---
title: Add Prompt Suggestions
author: vikasalmal
description: Learn how to create and handle a prompt starter and suggested actions for your Microsoft Teams bot to help your users initiate conversations.
ms.topic: how-to
ms.localizationpriority: medium
ms.author: vikasalmal
ms.date: 05/17/2026
---

# Create prompt suggestions

Prompt suggestions are prewritten prompts and response buttons that help users start and continue conversations with bots.

Prompt suggestions create an engaging and insightful user experience and help your bot to acquire and retain users. You can use prompt suggestions to help your users initiate conversations with your bot and learn how to interact with it.

There are two types of prompt suggestions that you can use, and both are supported in one-on-one chats, group chats, and channels.

:::row:::
:::column span="2":::

##### [Prompt starters](#prompt-starters)

Prompt starters help users start a conversation with your bot.

:::image type="content" source="~/assets/images/bots/prompt-starter-desktop.png" alt-text="Screenshot that shows the Prompt Starter in desktop." lightbox="~/assets/images/bots/prompt-starter-desktop.png":::

:::column-end:::

:::column span="2":::

##### [Suggested actions](#suggested-actions-1)

Suggested actions help users continue conversations with your bot.

:::image type="content" source="~/assets/images/Cards/suggested-actions.png" alt-text="Bot suggested actions." lightbox="~/assets/images/Cards/suggested-actions.png":::

:::column-end:::

:::row-end:::

## Prompt starters user experience

Prompt starters are prewritten prompts that users can select to insert them into the compose box.

In one-on-one chats, prompt starters appear in the **View Prompts** flyout above the compose box. For bots that don't send [proactive welcome messages](send-proactive-messages.md), Teams also displays prompt starters as cards in the conversation pane until the user sends their first message.

# [Desktop](#tab/desktop)

:::image type="content" source="~/assets/images/bots/prompt-starter-desktop.png" alt-text="Screenshot that shows the prompt starter cards displayed in an empty conversation pane." lightbox="~/assets/images/bots/prompt-starter-desktop.png":::

:::image type="content" source="~/assets/images/bots/prompt-starter-desktop-reappear.png" alt-text="Screenshot that shows use of the View Prompts menu." lightbox="~/assets/images/bots/prompt-starter-desktop-reappear.png":::

# [Mobile](#tab/mobile)

:::image type="content" source="~/assets/images/bots/prompt-starter-mobile.png" alt-text="Screenshot that shows prompt starters cards in an empty conversation pane in mobile." lightbox="~/assets/images/bots/prompt-starter-mobile.png":::

---

In group chats and channels, prompt starters are displayed in an autocomplete menu when a user @mentions the bot.

# [Group chat](#tab/gc)

:::image type="content" source="~/assets/images/bots/prompt-starter-group-chat.png" alt-text="Screenshot that shows the prompt starters autocomplete menu in a group chat." lightbox="~/assets/images/bots/prompt-starter-group-chat.png":::

# [Channel](#tab/channel)

:::image type="content" source="~/assets/images/bots/prompt-starter-channel.png" alt-text="Screenshot that shows the prompt starters autocomplete menu in a channel." lightbox="~/assets/images/bots/prompt-starter-channel.png":::

---

## Define prompt starters

To define prompt starters, set the `bots[].commandLists[].commands` property in your bot's app manifest. Each `commandList` can define a different scope in which its prompts appear, and supports up to 10 commands.

Each command contains four fields: `title`, `description`, `type`, and `prompt`.

- The `title` field is the text shown in the prompt starter. When selected, this text is populated into the compose box.
- The `description` field describes what the users accomplish.
- The `type` field indicates whether the bot command is basic or prompt. Set `type` to **prompt** and provide the text in the prompt field. When selected, the prompt text appears in the compose box instead of the title or description.
- The `prompt` field specifies the text that appears in the compose box for a prompt command. It supports up to 4,000 characters. When `type` is set to `prompt`, you must provide a valid `prompt` value.

The manifest example code for prompt starters is as follows:

```json
{
  ⋮
  "bots":[
    {
      "botId":"[Microsoft App ID for your bot]",
      "scopes": [
        "personal"
      ],
      "commandLists":[
        {
          "scopes":[
            "personal"
          ],
          "commands":[
            {
              "title":"Help",
              "description":"Displays this help message",
            },
            {
              "title":"Search Flights",
              "description":"Search flights from Seattle to Phoenix May 2-5 departing after 3pm",
              "type": "prompt",
              "prompt": "Search flights from Seattle to Phoenix May 2-5 departing after 3pm. Please show me the best options."
            },
            {
              "title":"Search Hotels",
              "description":"Search hotels in Portland tonight",
              "type": "prompt",
              "prompt": "Search hotels in Portland for tonight. Please show me available options with good ratings."
            },
            {
              "title":"Best Time to Fly",
              "description":"Best time to fly to London for a 5 day trip this summer",
              "type": "prompt",
              "prompt": "What is the best time to fly to London for a 5 day trip? I'm looking for good weather and reasonable prices."
            }
          ]
        }
      ]
    }
  ],
  ...
}
```

> [!NOTE]
> If you remove any commands from your manifest, you must redeploy your app to implement the changes. In general, any changes to the manifest require you to redeploy your app.

## Suggested actions user experience

Suggested actions are predefined user responses presented to users as buttons with a bot message. Users can select a button to send the response or trigger an action without typing in the compose box.

Suggested actions help users with ideas of what to ask next, based on the previous response or conversation. Suggested actions can be generated and placed dynamically during a conversation, meaning that you can use your bot’s large language model (LLM) to generate them along with a response during a conversation turn.

Suggested actions aren't supported in bot messages that include attachments, regardless of the conversation type.

### User experience

In one-on-one conversations, the buttons are displayed above the compose box, and are removed after the user selects an option.

# [Desktop](#tab/desktop)

-:::image type="content" source="../../../assets/images/bots/suggested-action-personal-chat.png" alt-text="Image shows suggested actions in a personal chat in a desktop client." border="false" lightbox="../../../assets/images/bots/suggested-action-personal-chat.png":::

# [Mobile](#tab/mobile)

-:::image type="content" source="../../../assets/images/bots/suggested-action-personal-chat-mobile.png" alt-text="Image shows suggested actions in a personal chat in a mobile client." lightbox="../../../assets/images/bots/suggested-action-personal-chat-mobile-lightbox.png":::

---

In group chats and channels, the buttons are displayed below the bot message and remain available until replaced or removed by the bot.

# [Group chat](#tab/gc)

**Desktop**:

:::image type="content" source="../../../assets/images/bots/suggested-action-gc.png" alt-text="Image shows suggested actions in a group chat in a desktop client." border="false" lightbox="../../../assets/images/bots/suggested-action-gc.png":::

**Mobile**:

:::image type="content" source="../../../assets/images/bots/suggested-action-gc-mobile.png" alt-text="Image shows suggested actions in a group chat in a mobile client." lightbox="../../../assets/images/bots/suggested-action-gc-mobile-lightbox.png":::

# [Channel](#tab/channel)

**Desktop**:

:::image type="content" source="../../../assets/images/bots/suggested-action-channel.png" alt-text="Image shows suggested actions in a channel in a desktop client." border="false" lightbox="../../../assets/images/bots/suggested-action-channel.png":::

**Mobile**:

:::image type="content" source="../../../assets/images/bots/suggested-action-channel-mobile.png" alt-text="Image shows suggested actions in a channel in a mobile client." lightbox="../../../assets/images/bots/suggested-action-channel-mobile-lightbox.png":::

---

Teams supports displaying up to three suggested actions at any given time. Suggested actions cards remain visible and accessible until the bot removes or replaces them.

You can build the following suggested actions in your agent or bot:

- **imBack**: Use `imBack` to add suggested actions. Set `activity.suggestedActions` to a list of card actions (buttons) to display to the user.

- **Action.Compose**: Use `Action.Compose` to prefill the compose box with a message, including tags, @mentions, and rich content such as emojis, GIFs, and other semantic objects.

## Define suggested actions

Here are some examples that show how to implement and experience suggested actions using `imBack` and `Action.Compose`:

# [`imBack`](#tab/iamback)

To add suggested actions to a message, specify a list of [card action](/azure/bot-service/rest-api/bot-framework-rest-connector-api-reference) objects that represent the buttons to be displayed to the user for the [`suggestedActions`](/dotnet/api/microsoft.bot.builder.messagefactory.suggestedactions) property of the [activity](/azure/bot-service/rest-api/bot-framework-rest-connector-api-reference) object.

The following example implements suggested actions using `imBack`:

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

## Code sample

| **Sample name** | **Description** |**.NET** |**Node.js** |
|-----------------|-----------------|----------------|----------------|
| Prompt starters bot | Microsoft Teams Create Commands Menu to implement prompt starters in your bot's app manifest. | [View](https://github.com/OfficeDev/Microsoft-Teams-Samples/tree/main/samples/bot-commands-menu/csharp) | [View](https://github.com/OfficeDev/Microsoft-Teams-Samples/tree/main/samples/bot-commands-menu/nodejs) |

## Related content

- [Build bots for Teams](~/bots/what-are-bots.md)
- [App manifest schema for Teams](~/resources/schema/manifest-schema.md)
- [Messages in bot conversations](~/bots/how-to/conversations/conversation-messages.md)
- [Adaptive Cards for bot developers](/adaptive-cards/getting-started/bots)
