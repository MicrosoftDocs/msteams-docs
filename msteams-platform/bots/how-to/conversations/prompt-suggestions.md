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

Prompt suggestions are prewritten prompts that users can select in the Microsoft Teams chat.

Prompt suggestions create an engaging and insightful user experience and help your bot to acquire and retain users by showing them the value of your bot through prompt conversations. You can use prompt suggestions to help your users initiate conversations with your bot and learn how to interact with it.

There are two types of prompt suggestions that you can use:

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

## Prompt starters

>[!NOTE]
>
> Your bot can either use a prompt starter or a welcome message. If your bot uses prompt starters, ensure that your bot doesn't send a welcome message.

Prompt starters appear in the compose box before the user sends a message. When a user selects a prompt starter, the associated text is inserted into the compose box.
Prompt starters are supported in one-on-one chats, group chats, and channels. To enable prompt starters, define the `commands` property in your bot's app manifest. Each command contains four fields: `title`, `description`, `type`, and `prompt`.

* The `title` field is the text shown in the prompt starter. When selected, this text is populated into the compose box.
* The `description` field describes what the users accomplish.
* The `type` field indicates whether the bot command is basic or prompt. Set `type` to **prompt** and provide the text in the prompt field. When selected, the prompt text appears in the compose box instead of the title or description.
* The `prompt` field specifies the text that appears in the compose box for a prompt command. It supports up to 4,000 characters. When `type` is set to `prompt`, you must provide a valid `prompt` value.

The following image illustrates an example of prompt starters:

# [Desktop](#tab/desktop)

:::image type="content" source="~/assets/images/bots/prompt-starter-desktop.png" alt-text="Screenshot that shows the Prompt Starter in desktop." lightbox="~/assets/images/bots/prompt-starter-desktop.png":::

# [Mobile](#tab/mobile)

:::image type="content" source="~/assets/images/bots/prompt-starter-mobile.png" alt-text="Screenshot that shows the Prompt Starter in mobile." lightbox="~/assets/images/bots/prompt-starter-mobile.png":::

---

## Define `commands` in app manifest

 To create a prompt starter, add it directly in the app manifest file while developing your bot source code. To use this method, follow these points:

* The `command` property supports up to 10 commands.
* You can either create prompt starters that work in all scopes or create different prompt starters for each scope.

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

---

> [!NOTE]
> If you remove any commands from your manifest, you must redeploy your app to implement the changes. In general, any changes to the manifest require you to redeploy your app.

After the user begins a conversation, the prompt starters disappear from the conversation pane but remain available in the **View Prompts** flyout above the compose box, enabling users to review the prompts while interacting with your bot.

# [Personal chat](#tab/pc)

:::image type="content" source="~/assets/images/bots/prompt-starter-desktop-reappear.png" alt-text="Screenshot that shows the Prompt Starter reappear during the conversation." lightbox="~/assets/images/bots/prompt-starter-desktop-reappear.png":::

# [Group chat](#tab/gc)

You must handle menu commands in your bot code as you handle any message from users. You can handle menu commands in your bot code by parsing out the **\@Mention** portion of the message text.

:::image type="content" source="~/assets/images/bots/prompt-starter-group-chat.png" alt-text="Screenshot that shows the Prompt Starter during the conversation in a group chat." lightbox="~/assets/images/bots/prompt-starter-group-chat.png":::

# [Channel](#tab/channel)

:::image type="content" source="~/assets/images/bots/prompt-starter-channel.png" alt-text="Screenshot that shows the Prompt Starter during the conversation in a channel." lightbox="~/assets/images/bots/prompt-starter-channel.png":::

---

## Suggested actions

Suggested actions enable bots to present predefined options as buttons in a bot message. Users can select a button to send a predefined response or trigger an action without typing in the compose box.
The buttons are displayed below the bot message and remain available until replaced or removed by the bot. In one-on-one conversations, they are removed after a user selects an option.

Suggested actions help users with ideas of what to ask next, based on the previous response or conversation. Suggested actions can be generated and placed dynamically during a conversation, meaning that you can use your bot’s large language model (LLM) to generate them along with a response during a conversation turn.

Teams supports displaying up to three suggested actions at any given time. Suggested actions cards remain visible and accessible until they are replaced or removed by the bot's actions.

Suggested actions are supported in all scopes:

* `personal`: In one-on-one chats, actions are shown as smart replies, so only the actions from the last message appear.
* `team` and `groupChat`: In group chats and channels, actions are always saved with the message.

# [Personal chat](#tab/pc)

**Desktop**:

:::image type="content" source="../../../assets/images/bots/suggested-action-personal-chat.png" alt-text="Image shows suggested actions in a personal chat in a desktop client." border="false" lightbox="../../../assets/images/bots/suggested-action-personal-chat.png":::

**Mobile**:

:::image type="content" source="../../../assets/images/bots/suggested-action-personal-chat-mobile.png" alt-text="Image shows suggested actions in a personal chat in a mobile client." lightbox="../../../assets/images/bots/suggested-action-personal-chat-mobile-lightbox.png":::

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

> [!NOTE]
>
> `SuggestedActions` aren't supported in bot messages that include attachments, regardless of the conversation type.

You can build the following suggested actions in your agent or bot:

* **imBack**: Use `imBack` to add suggested actions. Set `activity.suggestedActions` to a list of card actions (buttons) to display to the user.

* **Action.Compose**: Use `Action.Compose` to prefill the compose box with a message, including tags, @mentions, and rich content such as emojis, GIFs, and other semantic objects.

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

## Code sample

| **Sample name** | **Description** |**.NET** |**Node.js** |
|-----------------|-----------------|----------------|----------------|
| Prompt starters bot | Microsoft Teams Create Commands Menu to implement prompt starters in your bot's app manifest. | [View](https://github.com/OfficeDev/Microsoft-Teams-Samples/tree/main/samples/bot-commands-menu/csharp) | [View](https://github.com/OfficeDev/Microsoft-Teams-Samples/tree/main/samples/bot-commands-menu/nodejs) |

## See also

* [Build bots for Teams](~/bots/what-are-bots.md)
* [App manifest schema for Teams](~/resources/schema/manifest-schema.md)
* [Messages in bot conversations](~/bots/how-to/conversations/conversation-messages.md)
* [Adaptive Cards for bot developers](/adaptive-cards/getting-started/bots)
