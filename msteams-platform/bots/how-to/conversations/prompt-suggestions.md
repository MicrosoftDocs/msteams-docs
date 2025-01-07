---
title: Add Prompt Suggestions
author: v-npaladugu
description: Learn how to create and handle a prompt starter and suggested actions for your Microsoft Teams bot to help your users initiate conversations.
ms.topic: how-to
ms.localizationpriority: medium
ms.author: surbhigupta
ms.date: 10/25/2024
---

# Create prompt suggestions

Prompt suggestions are commands that are presented to the users in the Microsoft Teams chat.

Prompt suggestions create an engaging and insightful user experience and help your bot to acquire and retain users by showing them the value of your bot through prompt conversations. You can use prompt suggestions to help your users initiate conversations with your bot and learn how to interact with it.

Following are the two types of prompt suggestions that you can use:

:::row:::
:::column span="2":::

##### [Prompt starters](#prompt-starters)

Prompt starters help users start a conversation with your bot.

:::image type="content" source="~/assets/images/bots/prompt-starter-desktop.png" alt-text="Screenshot that shows the Prompt Starter in desktop." lightbox="~/assets/images/bots/prompt-starter-desktop.png":::

:::column-end:::

:::column span="2":::

##### [Suggested action](#suggested-actions-1)

Suggested actions help users continue conversations with your bot.

:::image type="content" source="~/assets/images/Cards/suggested-actions.png" alt-text="Bot suggested actions." lightbox="~/assets/images/Cards/suggested-actions.png":::

:::column-end:::

:::row-end:::

## Prompt starter

>[!NOTE]
> * Your bot either use a prompt starter or a welcome message. If your bot uses prompt starters, ensure that your bot doesn’t send a welcome message.
>
> * Prompt starters are only supported for one-on-one chat bots.

To enable prompt starters, define the `commands` property in your bot's app manifest. Each command contains a `title` and `description`. The `title` is the prompt and the `description` describes what the users accomplish. When the user selects on a prompt starter, the `title` of the prompt is populated in the compose box. To define `commands` in your app manifest, you can either use **Developer Portal** or add them manually in the app manifest.

# [Developer Portal](#tab/developer-portal)

To create prompt starters using Developer Portal:

1. Open Teams and select **Apps** from the left pane. In the **Apps** page, search for **Developer Portal**, and then select **Open**.

   :::image type="content" source="~/assets/images/tdp/add-dev-portal.png" alt-text="Screenshot shows how to add Developer Portal in Teams client.":::
  
1. In **Developer Portal**, select the **Apps** tab. If you don't have an existing app package, you can create or import an existing app. For more information, see [Developer Portal for Teams](~/concepts/build-and-test/teams-developer-portal.md).

1. Select **Apps** tab, select **App features** from the left pane, and then select **Bots**.

1. Under **Commands**, select **Add a command**.

   :::image type="content" source="~/assets/images/tdp/add-a-bot-command.png" alt-text="Screenshot shows how to add a command for your bot in Developer Portal.":::

1. Enter the values for the following fields:
    
    * **Command**: Appears as the prompt for your bot.
    * **Description**: A brief explanation of the purpose of the command.

1. Select the personal scope and then select **Add**. This defines where the command menu must appear. 

   :::image type="content" source="~/assets/images/tdp/bot-command.png" alt-text="Screenshot shows how to add a command, description, and scopes for your bot.":::

# [Manually in the app manifest](#tab/manually-in-the-app-manifest)

Another way to create a prompt starter is to create it directly in the app manifest file while developing your bot source code. To use this method, follow these points:

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
              "description":"Displays this help message"
            },
            {
              "title":"Search Flights",
              "description":"Search flights from Seattle to Phoenix May 2-5 departing after 3pm"
            },
            {
              "title":"Search Hotels",
              "description":"Search hotels in Portland tonight"
            },
            {
              "title":"Best Time to Fly",
              "description":"Best time to fly to London for a 5 day trip this summer"
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

The following illustrates an example of prompt suggestions:

# [Desktop](#tab/desktop)

:::image type="content" source="~/assets/images/bots/prompt-starter-desktop.png" alt-text="Screenshot that shows the Prompt Starter in desktop." lightbox="~/assets/images/bots/prompt-starter-desktop.png":::

# [Mobile](#tab/mobile)

:::image type="content" source="~/assets/images/bots/prompt-starter-mobile.png" alt-text="Screenshot that shows the Prompt Starter in mobile." lightbox="~/assets/images/bots/prompt-starter-mobile.png":::

---

Prompt starters reappear in the **View Prompts** flyout above the compose box during a conversation and enables users to review the prompts while interacting with your bot.

:::image type="content" source="~/assets/images/bots/prompt-starter-desktop-reappear.png" alt-text="Screenshot that shows the Prompt Starter reappear during the conversation." lightbox="~/assets/images/bots/prompt-starter-desktop-reappear.png":::

You must handle menu commands in your bot code as you handle any message from users. You can handle menu commands in your bot code by parsing out the **\@Mention** portion of the message text.

## Handle `commands` in your bot

Bots in a group or channel respond only when they're @mentioned in a message. Every message received by a bot when in a group or channel scope contains its name in the message text. Before handling the command being returned, your message parsing must handle the message received by a bot with its name.

> [!NOTE]
> Handle the commands in code, they are sent to your bot as a regular message. You must handle them as you would handle any other message from your users. The commands in code insert pre-configured text into the text box. The user must then send that text as they do for any other message.

# [C#](#tab/dotnet)

* [SDK reference](/dotnet/api/microsoft.bot.schema.activityextensions.removerecipientmention?view=botbuilder-dotnet-stable#microsoft-bot-schema-activityextensions-removerecipientmention(microsoft-bot-schema-imessageactivity)&preserve-view=true)

* [Sample code reference](https://github.com/OfficeDev/Microsoft-Teams-Samples/blob/main/samples/app-hello-world/csharp/Microsoft.Teams.Samples.HelloWorld.Web/Bots/MessageExtension.cs#L19)

You can parse out the **\@Mention** portion of the message text using a static method provided with the Microsoft Bot Framework. It's a method of the `Activity` class named `RemoveRecipientMention`.

The C# code to parse out the **\@Mention** portion of the message text is as follows:

```csharp
// Remove recipient mention text from Text property.
// Use with caution because this function is altering the text on the Activity.
var modifiedText = turnContext.Activity.RemoveRecipientMention();
```

# [JavaScript](#tab/javascript)

* [SDK reference](/javascript/api/botbuilder-core/turncontext?view=botbuilder-ts-latest#botbuilder-core-turncontext-removementiontext&preserve-view=true)

* [Sample code reference](https://github.com/OfficeDev/Microsoft-Teams-Samples/blob/main/samples/bot-people-picker-adaptive-card/nodejs/bots/teamsBot.js#L21)

You can parse out the **\@Mention** portion of the message text using a static method provided with the Bot Framework. It's a method of the `TurnContext` class named `removeMentionText`.

The JavaScript code to parse out the **\@Mention** portion of the message text is as follows:

```javascript
// Remove mention text from Text property, this function is altering the text on the Activity.
const modifiedText = TurnContext.removeMentionText(turnContext.activity, turnContext.activity.recipient.id);
```

# [Python](#tab/python)

* [SDK reference](/python/api/botbuilder-core/botbuilder.core.turncontext?view=botbuilder-py-latest#botbuilder-core-turncontext-remove-recipient-mention&preserve-view=true)

* [Sample code reference](https://github.com/OfficeDev/Microsoft-Teams-Samples/blob/main/samples/bot-conversation/python/bots/teams_conversation_bot.py#L34)

You can parse out the **@Mention** portion of the message text using a static method provided with the Bot Framework. It's a method of the `TurnContext` class named `remove_recipient_mention`.

The Python code to parse out the **\@Mention** portion of the message text is as follows:

```python
# Remove recipient mention text from Text property, this function is altering the text on the Activity.
modified_text = TurnContext.remove_recipient_mention(turn_context.activity)
```

* * *

## Suggested actions

[!INCLUDE [suggested-actions](~/includes/bots/suggested-actions.md)]

## Code sample

| **Sample name** | **Description** |**.NET** |**Node.js** |
|-----------------|-----------------|----------------|
| Prompt starters bot | This sample code describes the implementation of prompt starters for bot through `commands` property in your bot's app manifest. | [View](https://github.com/OfficeDev/Microsoft-Teams-Samples/tree/main/samples/bot-commands-menu/csharp) | [View](https://github.com/OfficeDev/Microsoft-Teams-Samples/tree/main/samples/bot-commands-menu/nodejs) |

## See also

* [Build bots for Teams](~/bots/what-are-bots.md)
* [App manifest schema for Teams](~/resources/schema/manifest-schema.md)
* [Messages in bot conversations](~/bots/how-to/conversations/conversation-messages.md)
* [Adaptive Cards for bot developers](/adaptive-cards/getting-started/bots)

