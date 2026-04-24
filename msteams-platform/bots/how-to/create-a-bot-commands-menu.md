---
title: Create a command menu for your bot
description: Learn how to create and handle a command menu for your Microsoft Teams bot, and best practices. Know how to remove commands from your manifest.
ms.topic: how-to
ms.localizationpriority: medium
ms.author: anclear
ms.owner: ginobuzz
ms.date: 04/24/2026
---

# Create a commands menu

> [!NOTE]
> We’ve enhanced the command menu experience as prompt starters. We recommend you to refer to [prompt starters](~/bots/how-to/conversations/prompt-suggestions.md).

To define a set of core commands that your bot can respond to, you can add a command menu with a dropdown list of commands for your bot. The list of commands is presented to the users in the compose message area when they are in conversation with your bot. Select a command from the list to insert the command string into the compose message box and select **Send**.

# [Desktop](#tab/desktop)

:::image type="content" source="conversations/Media/bot-menu-sample.png" alt-text="Desktop-menu-sample":::

# [Mobile](#tab/mobile)

:::image type="content" source="conversations/Media/mobile-bot-menu-sample.png" alt-text="Mobile-bot-command-menu":::

* * *

## Create a command menu for your bot

> [!NOTE]
> It's recommended that you create a command bot by following the [Teams SDK quickstart](/microsoftteams/platform/teams-sdk/getting-started/quickstart) and reviewing the [code basics](/microsoftteams/platform/teams-sdk/getting-started/code-basics). For more information about Microsoft 365 Agents Toolkit (previously known as Teams Toolkit), see [Agents Toolkit overview for Visual Studio Code](../../toolkit/agents-toolkit-fundamentals.md) and [Agents Toolkit overview for Visual Studio](../../toolkit/toolkit-v4/agents-toolkit-fundamentals-vs.md).

### Create a command menu for your bot using Developer Portal

A prerequisite to create a command menu for your bot is that you must edit an existing app manifest. The steps to add a command menu are the same, whether you create a new manifest or edit an existing one.

To create a command menu for your bot using Developer Portal:

1. Open Teams and select **Apps** from the left pane. In the **Apps** page, search for **Developer Portal**, and then select **Open**.

   :::image type="content" source="../../assets/images/tdp/add-dev-portal.png" alt-text="Screenshot shows how to add Developer Portal in Teams client.":::
  
1. In **Developer Portal**, select the **Apps** tab. If you don't have an existing app package, you can create or import an existing app. For more information, see [Developer Portal for Teams](../../concepts/build-and-test/teams-developer-portal.md).

1. Select **Apps** tab, select **App features** from the left pane, and then select **Bots**.

1. Select **Add a command** under **Commands** section.

   :::image type="content" source="../../assets/images/tdp/add-a-bot-command.png" alt-text="Screenshot shows how to add a command for your bot in Developer Portal.":::

1. Enter the **Command** that appears as the command menu for your bot.

1. Enter the **Description** that appears under the command text in the menu. **Description** must be a brief explanation of the purpose of the command.

1. Select the **Scope** check box and then select **Add**.
   This defines where the command menu must appear.

   :::image type="content" source="../../assets/images/tdp/bot-command.png" alt-text="Screenshot shows how to add a command, description, and scopes for your bot.":::

### Create a command menu for your bot by editing Manifest.json

Another way to create a command menu is to create it directly in the manifest file while developing your bot source code. To use this method, follow these points:

* Each menu supports up to 10 commands.
* Create a single command menu that works in all scopes.
* Create a different command menu for each scope.

#### Manifest example for single menu for both scopes

The manifest example code for single menu for both scopes is as follows:

```json
{
  ⋮
  "bots":[
    {
      "botId":"[Microsoft App ID for your bot]",
      "scopes": [
        "personal",
        "team"
      ],
      "commandLists":[
        {
          "scopes":[
            "team",
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

#### Manifest example for the menu for each scope

The manifest example code for the menu for each scope is as follows:

```json
{
  ...
  "bots":[
    {
      "botId":"<Microsoft app ID for your bot>",
      "scopes": [
        "groupChat",
        "team"
      ],
      "commandLists":[
        {
          "scopes":[
            "team"
          ],
          "commands":[
            {
            "title":"help",
            "description":"Displays this help message for channels"
            }
          ]
        },
        {
          "scopes":[
            "groupChat"
          ],
          "commands":[
            {
            "title":"help",
            "description":"Displays this help message for group chat"
            }
          ]
        }
      ]
    }
  ],
  ...
}
```

You must handle menu commands in your bot code as you handle any message from users.

## Handle menu commands in your bot code

In the Teams SDK, incoming messages are routed through an activity handler. You register a message handler using `app.on('message', ...)` (TypeScript), `app.OnMessage(...)` (C#), or `@app.on_message` (Python), and the message text is available via `activity.text`. The SDK's activity router handles message delivery across all scopes (personal, group chat, and channel). However, in group chat and channel conversations, `activity.text` can include the bot `@mention` (for example, `<at>Bot Name</at>`), so strip the bot mention before matching the command text, or use the activity's mention entities or an SDK helper for mention removal where available.

> [!NOTE]
> To handle the commands in code, they are sent to your bot as a regular message. You must handle them as you would handle any other message from your users. The commands in code insert pre-configured text into the text box. The user must then send that text as they do for any other message.

# [C#](#tab/dotnet)

* [Sample code reference](https://github.com/OfficeDev/Microsoft-Teams-Samples/tree/main/samples/TeamsSDK/bot-quickstart/dotnet/bot-quickstart)

In C#, Teams SDK does not feature a method to remove **\@Mention** portion. You can refer to the code snippet below on how to handle commands in your bot.

```csharp
// Handles incoming messages and routes to appropriate functions based on message content
teamsApp.OnMessage(async context =>
{
    // Get message text and normalize it
    var text = (context.Activity.Text ?? "").Trim().ToLower();

    // Handle mention me command - use exact matching to avoid false positives from substrings
    if (text == "mentionme" || text == "mention me")
    {
        await MentionUser(context);
    }
    // Handle whoami command
    else if (text == "whoami")
    {
        await GetSingleMember(context);
    }
    // Handle welcome command
    else if (text == "welcome")
    {
        await SendWelcomeMessage(context);
    }
    // Echo greeting messages
    else if (text == "hi" || text == "hello")
    {
        await EchoMessage(context, text);
    }
    else
    {
        await SendWelcomeMessage(context);
    }
});

```

# [TypeScript](#tab/typescript)

* [Sample code reference](https://github.com/OfficeDev/Microsoft-Teams-Samples/tree/main/samples/TeamsSDK/bot-quickstart/nodejs/bot-quickstart)

You can parse out the **\@Mention** portion of the message text using a static method provided with Teams SDK. It's a method of the `TurnContext` class named `stripMentionsText`.

The TypeScript code to parse out the **\@Mention** portion of the message text is as follows:

```typescript
// Remove mention text from Text property, this function is altering the text on the Activity.
const text = context.activity.stripMentionsText().text.trim().toLowerCase();

```

# [Python](#tab/python)

* [Sample code reference](https://github.com/OfficeDev/Microsoft-Teams-Samples/tree/main/samples/TeamsSDK/bot-quickstart/python/bot-quickstart)

You can parse out the **@Mention** portion of the message text using a static method provided with Teams SDK. It's a method of the `TurnContext` class named `strip_mentions_text`.

The Python code to parse out the **\@Mention** portion of the message text is as follows:

```python
# Remove recipient mention text from Text property, this function is altering the text on the Activity.
text = context.activity.strip_mentions_text().text. Strip().lower()

```

* * *

To enable smooth functioning of your bot code, there are few best practices that you must follow.

## Command menu best practices

Following are the command menu best practices:

* Keep it simple: The bot menu is meant to present the key capabilities of your bot.
* Keep it short: Menu options must not be long and must not be complex natural language statements. They must be simple commands.
* Keep it invokable: Bot menu actions or commands must always be available, regardless of the state of the conversation or the dialog the bot is in.

> [!NOTE]
> If you remove any commands from your manifest, you must redeploy your app to implement the changes. In general, any changes to the manifest require you to redeploy your app.

## Next step

> [!div class="nextstepaction"]
> [Channel and group chat conversations with a bot](conversations/channel-and-group-conversations.md)

## See also

* [Build bots for Teams](../what-are-bots.md)
* [App manifest schema for Teams](/microsoft-365/extensibility/schema/)
* [Messages in bot conversations](conversations/conversation-messages.md)
* [Adaptive Cards for bot developers](/adaptive-cards/getting-started/bots)
