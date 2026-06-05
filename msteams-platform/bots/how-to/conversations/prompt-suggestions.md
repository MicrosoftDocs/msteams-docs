---
title: Add Prompt Suggestions
author: surbhigupta
description: Learn how to create and handle a prompt starter and suggested actions for your Microsoft Teams bot to help your users initiate conversations.
ms.topic: how-to
ms.localizationpriority: medium
ms.author: vikasalmal
ms.date: 06/05/2026
---

# Create prompt suggestions

Prompt suggestions are commands that are presented to the users in the Microsoft Teams chat.

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

Prompt starters are supported in one-on-one chats, group chats, and channels. To enable prompt starters, define the `commands` property in your bot's app manifest. Each command contains four fields: `title`, `description`, `type`, and `prompt`.

* The `title` field is the text shown in the prompt starter. When selected, this text is populated into the compose box.
* The `description` field describes what the users accomplish.
* The `type` field indicates whether the bot command is basic or prompt. Set `type` to **prompt** and provide the text in the prompt field. When selected, the prompt text appears in the compose box instead of the title or description.
* The `prompt` field specifies the text that appears in the compose box for a prompt command. It supports up to 4,000 characters.

>[!NOTE]
>
>If you're building an agent, you must set `type` to **prompt** and provide a valid prompt value. If the `prompt` field is empty, the app manifest fails validation during submission.

## Define `commands` in app manifest

 To create a prompt starter, add it directly in the app manifest file while developing your bot source code. To use this method, follow these points:

* The `command` property supports up to 10 commands.
* You can either create prompt starters that work in all scopes or create different prompt starters for each scope.

#### Manifest example for prompt starters

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

The following image illustrates an example of prompt suggestions:

# [Desktop](#tab/desktop)

:::image type="content" source="~/assets/images/bots/prompt-starter-desktop.png" alt-text="Screenshot that shows the Prompt Starter in desktop." lightbox="~/assets/images/bots/prompt-starter-desktop.png":::

# [Mobile](#tab/mobile)

:::image type="content" source="~/assets/images/bots/prompt-starter-mobile.png" alt-text="Screenshot that shows the Prompt Starter in mobile." lightbox="~/assets/images/bots/prompt-starter-mobile.png":::

---

Prompt starters reappear in the **View Prompts** flyout above the compose box during a conversation. They enable users to review the prompts while interacting with your bot.

# [Personal chat](#tab/pc)

:::image type="content" source="~/assets/images/bots/prompt-starter-desktop-reappear.png" alt-text="Screenshot that shows the Prompt Starter reappear during the conversation." lightbox="~/assets/images/bots/prompt-starter-desktop-reappear.png":::

# [Group chat](#tab/gc)

You must handle menu commands in your bot code as you handle any message from users. You can handle menu commands in your bot code by parsing out the **\@Mention** portion of the message text.

:::image type="content" source="~/assets/images/bots/prompt-starter-group-chat.png" alt-text="Screenshot that shows the Prompt Starter during the conversation in a group chat." lightbox="~/assets/images/bots/prompt-starter-group-chat.png":::

# [Channel](#tab/channel)

:::image type="content" source="~/assets/images/bots/prompt-starter-channel.png" alt-text="Screenshot that shows the Prompt Starter during the conversation in a channel." lightbox="~/assets/images/bots/prompt-starter-channel.png":::

---

## Suggested actions

[!INCLUDE [suggested-actions](~/includes/bots/suggested-actions.md)]

## Code sample

| **Sample name** | **Description** |**.NET** |**Node.js** |
|-----------------|-----------------|----------------|----------------|
| Prompt starters bot | Microsoft Teams Create Commands Menu to implement prompt starters in your bot's app manifest. | [View](https://github.com/OfficeDev/Microsoft-Teams-Samples/tree/main/samples/bot-commands-menu/csharp) | [View](https://github.com/OfficeDev/Microsoft-Teams-Samples/tree/main/samples/TeamsSDK/Archived/bot-commands-menu/nodejs) |

## See also

* [Build bots for Teams](~/bots/what-are-bots.md)
* [App manifest schema for Teams](~/resources/schema/manifest-schema.md)
* [Messages in bot conversations](~/bots/how-to/conversations/conversation-messages.md)
* [Adaptive Cards for bot developers](/adaptive-cards/getting-started/bots)
